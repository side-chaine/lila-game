/**
 * Matrix Comment System
 * This script creates a visual effect similar to the Matrix movie for comments
 * Uses the line-art color scheme for regular display and can switch to classic green
 */

(function() {
    // Configuration settings
    const config = {
        typingSpeed: { min: 10, max: 50 },      // Characters per second
        glowProbability: 0.05,                  // Probability of glow effect
        scramblingProbability: 0.02,            // Probability of scrambling effect
        greenModeProbability: 0.1,              // Probability of randomly triggering green mode
        greenModeKeyword: 'нео',                // Keyword to trigger green mode
        defaultDelayBetweenMessages: 1000,      // Default delay between messages (ms)
        characterSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>/?АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя',
        // Новые настройки для исчезновения символов
        disappearProbability: 0.15,             // Вероятность исчезновения символа
        maxDisappearDuration: 150,              // Максимальная длительность исчезновения (мс)
        maxMessages: 2,                         // Максимальное количество сообщений в контейнере
    };

    // State for the matrix effect
    const state = {
        isGreenMode: false,
        container: null,
        textArea: null,
        messages: [],
        isTyping: false,
        currentColorScheme: 0,
        charIndex: 0,                           // Для отслеживания индекса символа
        originalMessage: null,                  // Для хранения оригинального сообщения
        originalUpdateMessage: null,            // Для хранения оригинальной функции обновления сообщений
        isInitialized: false,                   // Флаг инициализации
        startMessage: 'Бросьте кубик, чтобы начать игру',  // Исходное сообщение
        initialized: false,                     // Added for the new initMatrixComments function
    };

    // Track if we've already shown the welcome message
    let welcomeMessageShown = false;

    /**
     * Initialize the matrix-style comments system
     */
    function initMatrixComments() {
        // If already initialized and message element exists, just return
        if (state.initialized && document.querySelector('.matrix-message-container')) {
            // Check if the original message element is properly hidden and tagged
            const messageElement = document.querySelector('.message');
            if (messageElement && (!messageElement.classList.contains('matrix-active') || messageElement.style.display !== 'none')) {
                console.log("Обновление стиля исходного элемента сообщения");
                messageElement.classList.add('matrix-active');
                messageElement.style.display = 'none';
            }
            return;
        }
        
        console.log("Инициализация системы матричных комментариев...");
        
        // Create matrix message container
        const matrixContainer = document.createElement('div');
        matrixContainer.className = 'matrix-message-container';
        matrixContainer.style.cssText = `
            position: relative;
            top: auto;
            bottom: 0;
            width: 100%;
            max-width: 768px;
            min-height: 40px;
            height: auto;
            padding: 10px 15px;
            margin: 10px auto 0;
            background-color: rgba(0, 20, 0, 0.85);
            color: #00ff00;
            font-family: 'Courier New', monospace;
            border: 1px solid #00ff00;
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
            z-index: 1000;
            overflow: hidden;
            display: flex;
            align-items: center;
        `;
        
        // Get existing message element
        const messageElement = document.querySelector('.message');
        if (messageElement) {
            // Save original message for reference
            if (!state.originalMessage && messageElement.innerHTML) {
                state.originalMessage = messageElement.innerHTML;
                state.startMessage = messageElement.textContent || messageElement.innerText;
            }
            
            // Add our custom class to the message element for tracking
            messageElement.classList.add('matrix-active');
            
            // Replace or insert our matrix container
            if (messageElement.parentNode) {
                messageElement.parentNode.insertBefore(matrixContainer, messageElement.nextSibling);
                
                // Hide the original message element
                messageElement.style.display = 'none';
            } else {
                console.warn("Родительский узел элемента сообщения не найден");
                
                // Fallback: Add to the body
                document.body.insertBefore(matrixContainer, document.body.firstChild);
            }
        } else {
            console.warn("Элемент сообщения не найден");
            
            // Fallback: Add to the body
            document.body.insertBefore(matrixContainer, document.body.firstChild);
        }
        
        // Store reference to container
        state.container = matrixContainer;
        
        // Create text area for messages
        const textArea = document.createElement('div');
        textArea.className = 'matrix-text-area';
        textArea.style.cssText = `
            white-space: nowrap;
            overflow: hidden;
            width: 100%;
        `;
        matrixContainer.appendChild(textArea);
        state.textArea = textArea;
        
        // Add blinking animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            .matrix-message-container {
                transition: background-color 0.5s;
            }
            .matrix-message-container.green-mode {
                background-color: rgba(0, 40, 0, 0.9);
                box-shadow: 0 0 15px rgba(0, 255, 0, 0.7);
            }
        `;
        document.head.appendChild(style);
        
        // Show welcome message
        showMatrixMessage('Игра Лила приветствует вас! Бросайте кубик и сосредоточьтесь на выпадении 6 для начала духовного пути.');
        
        // Set up hooks and listeners
        interceptUpdateMessageFunction();
        interceptDirectMessageUpdates();
        setupGameEventListeners();
        
        // Mark as initialized
        state.initialized = true;
        state.isInitialized = true;
        
        console.log("Система матричных комментариев инициализирована");
        
        // Ensure this initialization persists
        ensureMatrixPersistence();
    }

    /**
     * Ensure matrix comment system persists throughout the game
     */
    function ensureMatrixPersistence() {
        // Check every second if our matrix container is still active
        setInterval(() => {
            const messageElement = document.querySelector('.message');
            const matrixContainer = document.querySelector('.matrix-message-container');
            
            if (!matrixContainer) {
                console.log("Контейнер матричных комментариев исчез, восстанавливаем...");
                initMatrixComments();
            } else if (messageElement && !messageElement.classList.contains('matrix-active')) {
                console.log("Стиль матричных комментариев был сброшен, восстанавливаем...");
                messageElement.classList.add('matrix-active');
                messageElement.style.display = 'none';
            }
            
            // Ensure container is positioned correctly
            if (matrixContainer && matrixContainer.style.position !== 'relative') {
                console.log("Исправляем позиционирование контейнера матричных комментариев");
                matrixContainer.style.position = 'relative';
                matrixContainer.style.top = 'auto';
                matrixContainer.style.margin = '10px auto 0';
                
                // Make sure it's after the message element
                const messageElement = document.querySelector('.message');
                if (messageElement && messageElement.parentNode && matrixContainer.parentNode !== messageElement.parentNode) {
                    messageElement.parentNode.insertBefore(matrixContainer, messageElement.nextSibling);
                }
            }
        }, 1000);
    }

    /**
     * Intercept the updateMessage function from script.js to display all game messages in matrix style
     */
    function interceptUpdateMessageFunction() {
        // Only intercept if it hasn't been intercepted yet
        if (state.originalUpdateMessage) return;
        
        // Check if the updateMessage function exists in the global scope
        if (typeof window.updateMessage === 'function') {
            // Save the original function
            state.originalUpdateMessage = window.updateMessage;
            
            // Replace it with our version
            window.updateMessage = function(text) {
                console.log("Перехват сообщения:", text);
                
                // Call original function to maintain any side effects
                state.originalUpdateMessage.apply(this, arguments);
                
                // Ensure matrix style is active
                const messageElement = document.querySelector('.message');
                if (messageElement && !messageElement.classList.contains('matrix-active')) {
                    console.log("Восстановление матричного комментатора после перезаписи");
                    initMatrixComments();
                }
                
                // Show in matrix style if it's not empty
                if (text && typeof text === 'string' && text.trim() !== '') {
                    // Process the message with our custom handler
                    interceptAndProcessMessage(text);
                }
                
                // Return to support chaining
                return text;
            };
            
            console.log("Функция обновления сообщений перехвачена");
        } else {
            console.warn("Функция updateMessage не найдена в глобальной области видимости");
            
            // Try to find alternative message update functions
            if (typeof window.showMessage === 'function') {
                state.originalUpdateMessage = window.showMessage;
                window.showMessage = function(text) {
                    state.originalUpdateMessage.apply(this, arguments);
                    interceptAndProcessMessage(text);
                    return text;
                };
                console.log("Альтернативная функция showMessage перехвачена");
            }
        }
        
        // Also intercept direct message element updates in processGameLogic
        interceptDirectMessageUpdates();
    }
    
    /**
     * Intercept direct updates to the message element that bypass updateMessage function
     */
    function interceptDirectMessageUpdates() {
        // Save reference to the original processGameLogic if it exists
        if (typeof window.processGameLogic === 'function') {
            const originalProcessGameLogic = window.processGameLogic;
            
            window.processGameLogic = function(diceValue) {
                // Run the original function first
                const result = originalProcessGameLogic.apply(this, arguments);
                
                // After the original function completes, check if the message element was changed
                // and ensure matrix styling is still active
                setTimeout(() => {
                    const messageElement = document.querySelector('.message');
                    if (messageElement) {
                        // If matrix styling was removed, restore it
                        if (!messageElement.classList.contains('matrix-active')) {
                            console.log("Восстановление матричного комментатора после processGameLogic");
                            initMatrixComments();
                            
                            // Get the current message text and show it in matrix style
                            const currentText = messageElement.textContent;
                            if (currentText && currentText.trim() !== '') {
                                showMatrixMessage(currentText, 'Игра');
                            }
                        }
                    }
                }, 100); // Small delay to ensure we run after any DOM updates
                
                return result;
            };
            
            console.log("Функция processGameLogic перехвачена для поддержки матричных комментариев");
        }
        
        // Set up MutationObserver to watch for changes to the message element
        setupMessageMutationObserver();
    }

    /**
     * Set up a MutationObserver to watch for changes to the message element
     * This provides a robust fallback for cases where other interception methods fail
     */
    function setupMessageMutationObserver() {
        const messageElement = document.querySelector('.message');
        if (!messageElement) {
            console.warn("Невозможно установить MutationObserver: элемент сообщения не найден");
            return;
        }
        
        // Create observer instance
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList' || mutation.type === 'characterData' || mutation.type === 'attributes') {
                    // If the message element lost its matrix-active class or became visible
                    if (!messageElement.classList.contains('matrix-active') || 
                        messageElement.style.display !== 'none') {
                        
                        console.log("MutationObserver: изменение обнаружено, восстановление матричных комментариев");
                        
                        // Re-hide the original message element
                        messageElement.style.display = 'none';
                        messageElement.classList.add('matrix-active');
                        
                        // Get the new text content and display it in matrix style
                        const text = messageElement.textContent || messageElement.innerText;
                        if (text && text.trim() !== '') {
                            showMatrixMessage(text, 'Игра');
                        }
                    }
                }
            }
        });
        
        // Start observing with all mutations
        observer.observe(messageElement, {
            childList: true,
            characterData: true,
            attributes: true,
            subtree: true
        });
        
        console.log("MutationObserver успешно установлен для элемента сообщений");
    }

    /**
     * Update the color scheme based on grid system if available
     */
    function updateColorScheme() {
        // Try to get current color scheme from the grid system
        if (window.GridSystem && typeof window.GridSystem.getCurrentColorScheme === 'function') {
            state.currentColorScheme = window.GridSystem.getCurrentColorScheme();
            console.log(`Matrix comments using color scheme: ${state.currentColorScheme}`);
        }
    }

    /**
     * Display the next message in the queue with matrix effect
     */
    function displayNextMessage() {
        if (state.messages.length === 0 || state.isTyping) return;
        
        state.isTyping = true;
        const message = state.messages.shift();
        
        // Сбрасываем индекс символа для нового сообщения
        state.charIndex = 0;
        
        // Check if this message should trigger green mode
        if (message.text.toLowerCase().includes(config.greenModeKeyword) || Math.random() < config.greenModeProbability) {
            activateGreenMode();
        }
        
        // Clear previous messages instead of limiting them
        clearMatrixMessages();
        
        // Create message container
        const messageElement = document.createElement('div');
        messageElement.classList.add('matrix-message');
        state.textArea.appendChild(messageElement);
        
        // Create content container
        const contentElement = document.createElement('div');
        contentElement.classList.add('matrix-message-content');
        messageElement.appendChild(contentElement);
        
        // Type out the message
        typeMessage(message.text, contentElement, () => {
            state.isTyping = false;
            
            // Schedule next message
            const delay = message.delay || config.defaultDelayBetweenMessages;
            setTimeout(displayNextMessage, delay);
        });
    }

    /**
     * Type out a message with matrix effect
     * @param {string} text - Text to type
     * @param {HTMLElement} container - Container element
     * @param {Function} callback - Callback function when done
     */
    function typeMessage(text, container, callback) {
        if (!text.length) {
            // When text is done, add the dots and cursor
            addDotsAndCursor(container);
            callback();
            return;
        }
        
        const char = text.charAt(0);
        const charElement = document.createElement('span');
        charElement.classList.add('matrix-char');
        
        // Handle spaces properly
        if (char === ' ') {
            charElement.innerHTML = '&nbsp;';
            charElement.style.marginRight = '4px';
        } else {
            charElement.textContent = char;
        }
        
        // Устанавливаем индекс символа для стилизации
        charElement.style.setProperty('--char-index', state.charIndex++);
        
        // Insert char
        container.appendChild(charElement);
        
        // Apply random effects
        if (Math.random() < config.glowProbability) {
            charElement.classList.add('glow');
        }
        
        if (Math.random() < config.scramblingProbability) {
            applyScrambleEffect(charElement);
        }
        
        // Новый эффект случайного исчезновения символов
        if (Math.random() < config.disappearProbability) {
            applyDisappearEffect(charElement);
        }
        
        // Calculate random typing speed
        const typingDelay = Math.floor(Math.random() * 
            (config.typingSpeed.max - config.typingSpeed.min) + 
            config.typingSpeed.min);
        
        // Continue with the rest of the text
        setTimeout(() => {
            typeMessage(text.substring(1), container, callback);
        }, typingDelay);
    }
    
    /**
     * Add the dots (...) and cursor at the end of the message
     * @param {HTMLElement} container - Container element
     */
    function addDotsAndCursor(container) {
        // Add the dots
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            dot.classList.add('matrix-char', 'matrix-dot');
            dot.textContent = '.';
            dot.style.setProperty('--char-index', state.charIndex++);
            container.appendChild(dot);
        }
        
        // Add the cursor
        const cursor = document.createElement('span');
        cursor.className = 'matrix-cursor';
        cursor.innerHTML = '&#9608;'; // Block character
        cursor.style.cssText = `
            display: inline-block;
            color: #00ff00;
            font-weight: bold;
            animation: blink 1s step-end infinite;
            margin-left: 2px;
        `;
        container.appendChild(cursor);
    }

    /**
     * Apply scrambling effect to a character
     * @param {HTMLElement} element - Character element
     */
    function applyScrambleEffect(element) {
        element.classList.add('scrambling');
        
        // Generate random characters
        const generateRandomChar = () => {
            const randomIndex = Math.floor(Math.random() * config.characterSet.length);
            return config.characterSet.charAt(randomIndex);
        };
        
        // Set scramble data attribute
        const updateScramble = () => {
            element.setAttribute('data-scramble', generateRandomChar());
        };
        
        // Run scramble effect for a short period
        const intervalId = setInterval(updateScramble, 100);
        setTimeout(() => {
            clearInterval(intervalId);
            element.classList.remove('scrambling');
        }, 500 + Math.random() * 1000);
    }

    /**
     * Apply disappear effect to a character - makes it briefly disappear
     * @param {HTMLElement} element - Character element
     */
    function applyDisappearEffect(element) {
        element.classList.add('disappearing');
        
        // Set a random duration for disappearance
        const disappearDuration = Math.floor(Math.random() * config.maxDisappearDuration) + 50;
        
        // Apply and remove the effect
        setTimeout(() => {
            element.style.opacity = '0';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.classList.remove('disappearing');
            }, disappearDuration);
        }, Math.random() * 5000); // Random delay before disappearing
    }

    /**
     * Activate the classic green Matrix mode
     */
    function activateGreenMode() {
        state.isGreenMode = true;
        state.container.classList.add('matrix-green-mode');
        
        // Set a timeout to return to normal mode
        setTimeout(() => {
            state.isGreenMode = false;
            state.container.classList.remove('matrix-green-mode');
        }, 10000 + Math.random() * 5000); // Between 10-15 seconds
    }

    /**
     * Add a new message to the queue
     * @param {Object} message - Message object with text and optional author and delay
     */
    function addMatrixMessage(message) {
        state.messages.push(message);
        
        // If not currently typing, start the process
        if (!state.isTyping) {
            displayNextMessage();
        }
    }

    /**
     * Clear all matrix messages
     */
    function clearMatrixMessages() {
        if (!state.textArea) return;
        
        // Remove all message elements
        while (state.textArea.firstChild) {
            state.textArea.removeChild(state.textArea.firstChild);
        }
        
        // Clear message queue
        state.messages = [];
        state.isTyping = false;
    }

    /**
     * Restore the original game message
     */
    function restoreOriginalMessage() {
        if (state.originalMessage) {
            const messageElement = document.querySelector('.message');
            if (messageElement) {
                messageElement.innerHTML = state.originalMessage;
                messageElement.classList.remove('matrix-active');
            }
        }
    }

    /**
     * Обрабатывает текст сообщения и оборачивает номера клеток и важные фразы в специальные span-элементы
     * @param {string} text - Исходный текст сообщения
     * @returns {string} - Обработанный HTML с неразрывными элементами
     */
    function processMessageText(text) {
        if (!text) return '';
        
        // Если текст уже содержит HTML-разметку, обрабатываем его особым образом
        if (/<[a-z][\s\S]*>/i.test(text)) {
            // Обработка ссылок на клетки (формат "клетка X", "клетки X")
            text = text.replace(/(\s|^)(клетк[аиеу])\s+(\d+)(\s|$|\.|\,|\!|\?)/gi, 
                function(match, before, word, number, after) {
                    return `${before}<span class="cell-ref">${word} <span class="cell-number">${number}</span></span>${after}`;
                });
            
            // Обработка ссылок на поля (формат "поле X", "поля X")
            text = text.replace(/(\s|^)(пол[еяю])\s+(\d+)(\s|$|\.|\,|\!|\?)/gi, 
                function(match, before, word, number, after) {
                    return `${before}<span class="cell-ref">${word} <span class="cell-number">${number}</span></span>${after}`;
                });
            
            // Обработка комбинаций ходов (например, "6-5", "6-5-4")
            text = text.replace(/(\s|^|:)(\d+(?:-\d+)+)(\s|$|\.|\,|\!|\?)/g, 
                function(match, before, combo, after) {
                    return `${before}<span class="move-combination">${combo}</span>${after}`;
                });
            
            // Выделение сообщений о стрелах и змеях
            text = text.replace(/(стрел[аеуы]|змея|змеи)(\s*\!)?/gi, 
                function(match) {
                    return `<span class="special-move">${match}</span>`;
                });
            
            // Выделение направлений (вверх, вниз, подъем, спуск)
            text = text.replace(/(подъ[её]м|спуск|вверх|вниз)/gi, 
                function(match) {
                    return `<span class="direction-text">${match}</span>`;
                });
            
            // Выделение слов "перемещение" и "ход"
            text = text.replace(/(перемещение|ход)/gi, 
                function(match) {
                    return `<span class="matrix-no-break">${match}</span>`;
                });
            
            // Обработка слов, связанных с кубиком (бросок, выпало и т.д.)
            text = text.replace(/(выпало|бросок|кубик[а-я]*)\s+(\d+)/gi,
                function(match, word, number) {
                    return `<span class="matrix-no-break">${word} <span class="dice-value">${number}</span></span>`;
                });
            
            return text;
        } else {
            // Для простого текста без HTML, просто возвращаем его
            return text;
        }
    }

    /**
     * Show a message in the matrix style
     * @param {string} text - The message text
     * @param {string|null} author - Optional author
     */
    function showMatrixMessage(text, author = null) {
        // Clear the text area if this is a system reset message
        if (text.includes('Система') && text.includes('активирована')) {
            clearMatrixMessages();
        }
        
        // Определяем, содержит ли текст HTML-разметку
        const containsHtml = /<[a-z][\s\S]*>/i.test(text);
        
        // Process text to add spaces between words if needed
        const processedText = text.replace(/_/g, ' ');
        
        // Дополнительно обрабатываем текст, чтобы избежать разрывов слов
        const enhancedText = processMessageText(processedText);
        
        if (containsHtml || /<[a-z][\s\S]*>/i.test(enhancedText)) {
            // Если текст содержит HTML, используем другой подход для отображения
            // Создаем контейнер и добавляем его в DOM
            if (state.textArea) {
                // Проверяем, не является ли сообщение просто обновлением последнего
                // Если это продолжение предыдущего сообщения о броске кубика или ходе,
                // обновляем существующее сообщение вместо создания нового
                let shouldUpdate = false;
                let lastMessageContent = null;
                
                if (state.textArea.lastChild && 
                    state.textArea.lastChild.classList.contains('matrix-message')) {
                    const lastMessage = state.textArea.lastChild;
                    lastMessageContent = lastMessage.querySelector('.matrix-message-content');
                    
                    // Проверяем, является ли это продолжением сообщения о броске кубика или ходе
                    if (lastMessageContent && 
                        ((lastMessageContent.textContent.includes('Выпало') && enhancedText.includes('ходим')) ||
                         (lastMessageContent.textContent.includes('ходим') && enhancedText.includes('Ход завершен')))) {
                        shouldUpdate = true;
                    }
                }
                
                if (shouldUpdate && lastMessageContent) {
                    // Обновляем существующее сообщение
                    lastMessageContent.innerHTML = enhancedText;
                    
                    // Добавляем эффект мерцающего курсора
                    const cursor = document.createElement('span');
                    cursor.className = 'matrix-cursor';
                    lastMessageContent.appendChild(cursor);
                } else {
                    // Если не обновляем существующее, то создаем новое сообщение
                    // Очищаем предыдущие сообщения, если комментатор переполнен
                    if (state.textArea.children.length > config.maxMessages) {
                        // Удаляем самое старое сообщение
                        if (state.textArea.firstChild) {
                            state.textArea.removeChild(state.textArea.firstChild);
                        }
                    }
                    
                    // Создаем контейнер сообщения
                    const messageElement = document.createElement('div');
                    messageElement.classList.add('matrix-message');
                    state.textArea.appendChild(messageElement);
                    
                    // Создаем контейнер содержимого
                    const contentElement = document.createElement('div');
                    contentElement.classList.add('matrix-message-content');
                    messageElement.appendChild(contentElement);
                    
                    // Устанавливаем HTML-содержимое напрямую
                    contentElement.innerHTML = enhancedText;
                    
                    // Добавляем эффект мерцающего курсора
                    const cursor = document.createElement('span');
                    cursor.className = 'matrix-cursor';
                    contentElement.appendChild(cursor);
                    
                    // Прокручиваем до последнего сообщения
                    state.container.scrollTop = state.container.scrollHeight;
                }
            }
        } else {
            // Стандартный подход для текста без HTML
            // Create the message object
            const message = {
                text: enhancedText,
                author: null, // Always set author to null to remove "System" label
                delay: config.defaultDelayBetweenMessages
            };
            
            // Add to message queue
            state.messages.push(message);
            
            // If we're not currently typing a message, start
            if (!state.isTyping) {
                displayNextMessage();
            }
        }
    }

    /**
     * Extract dice value from a string
     * @param {string} text - Text containing dice information
     * @returns {number|null} - Dice value or null if not found
     */
    function extractDiceValue(text) {
        const russianMatch = text.match(/выпало\s*(\d+)/i);
        const englishMatch = text.match(/rolled\s*(\d+)/i);
        const numberMatch = text.match(/\b(\d+)\b/);
        
        if (russianMatch && russianMatch[1]) {
            return parseInt(russianMatch[1]);
        } else if (englishMatch && englishMatch[1]) {
            return parseInt(englishMatch[1]);
        } else if (numberMatch && numberMatch[1]) {
            return parseInt(numberMatch[1]);
        }
        
        return null;
    }
    
    /**
     * Process dice roll event
     * @param {Object} detail - Event detail
     */
    function processDiceRoll(detail) {
        const diceValue = detail?.value || detail?.diceValue || null;
        
        if (diceValue) {
            // Коллекция фраз для ожидания 6-ки
            const waitingSixPhrases = [
                "Бросай снова, ждем шестерку!...",
                "Как говорил Тарантино: «Удача приходит к тем, кто бросает кубики до шестерки»",
                "Эй, игрок! Судьба ждет шестерку, чтобы запустить твое приключение",
                "Шестерка, где ты? Выходи, не стесняйся...",
                "Продолжай бросать! Шестерка уже разминается за кулисами",
                "Жизнь как кубик — иногда нужно несколько попыток, чтобы получить шестерку",
                "В этой игре, как в фильмах Тарантино — самое интересное начинается только после драматичного вступления",
                "Бросай с чувством, с толком, с расстановкой! Шестерка любит уверенных игроков",
                "Каждый бросок приближает тебя к шестерке... возможно",
                "Так близко к началу приключения, осталось только выбросить заветную шестерку!",
                "Давай, давай, шестерка! Мама нуждается в новой игре!",
                "Кубик, кубик на столе, кто выбросит шестерку всех скорее?",
                "Шестерка — это не просто число, это пропуск в мир игры!",
                "Терпение, игрок. Каждый мастер начинал с ожидания своей шестерки",
                "Говорят, если три раза произнести «шестерка» перед броском..."
            ];
            
            // Get current position
            const currentPosition = window.currentPosition || 0;
            const cellOrField = Math.random() > 0.5 ? "клетке" : "поле";
            let message = `Выпало ${diceValue}. `;
            
            // Получаем состояние обработчика последовательности шестерок, если он доступен
            let sixesState = null;
            if (window.DiceSequenceHandler && typeof window.DiceSequenceHandler.getState === 'function') {
                sixesState = window.DiceSequenceHandler.getState();
            }
            
            // Проверяем, началась ли игра (через несколько проверок для надежности)
            const gameStarted = window.gameStarted || 
                                currentPosition > 1 || 
                                currentPosition === 6;
            
            // If game hasn't started yet
            if (!gameStarted) {
                if (diceValue === 6) {
                    message += "Выпала 6! Игра начинается!";
                } else {
                    // Выбираем случайную фразу для ожидания 6-ки
                    const randomIndex = Math.floor(Math.random() * waitingSixPhrases.length);
                    message += waitingSixPhrases[randomIndex];
                }
            } 
            // Случай когда выпала шестерка и это уже не первый бросок
            else if (diceValue === 6 && gameStarted) {
                // Если у нас есть информация о последовательности шестерок
                if (sixesState && sixesState.diceSequence) {
                    const sixCount = sixesState.diceSequence.length;
                    
                    if (sixCount === 1) {
                        message += "Выпала шестерка! Бросайте снова.";
                    } else if (sixCount === 2) {
                        message += "Выпала вторая шестерка подряд! Бросайте снова.";
                    } else if (sixCount === 3 && !sixesState.sixesBurned) {
                        message += "Три шестерки подряд! Осторожно, они сейчас сгорят!";
                    } else if (sixesState.sixesBurned) {
                        message += "Еще одна шестерка! Ваши шестерки возрождаются!";
                    }
                } else {
                    message += "Выпала шестерка! Бросайте снова.";
                }
            }
            // Special case for cell 67 - need to roll 5 to reach cell 72
            else if (currentPosition === 67) {
                if (diceValue > 5) {
                    message += `Перебор! Вам нужно выбросить точно 5, чтобы попасть на клетку 72.`;
                } else if (diceValue < 5) {
                    message += `Перемещение с ${cellOrField} ${currentPosition} на ${cellOrField} ${currentPosition + diceValue}.`;
                } else {
                    message += `Отлично! Вы переместились с ${cellOrField} ${currentPosition} на ${cellOrField} 72.`;
                }
            }
            // Special case for cell 68 - need to roll 4 to reach cell 72
            else if (currentPosition === 68) {
                if (diceValue > 4) {
                    message += `Перебор! Вам нужно выбросить точно 4, чтобы попасть на клетку 72.`;
                } else if (diceValue < 4) {
                    message += `Перемещение с ${cellOrField} ${currentPosition} на ${cellOrField} ${currentPosition + diceValue}.`;
                } else {
                    message += `Отлично! Вы переместились с ${cellOrField} ${currentPosition} на ${cellOrField} 72.`;
                }
            }
            // Special case for cell 69 - need to roll 3 to reach cell 72
            else if (currentPosition === 69) {
                if (diceValue > 3) {
                    message += `Перебор! Вам нужно выбросить точно 3, чтобы попасть на клетку 72.`;
                } else if (diceValue < 3) {
                    message += `Перемещение с ${cellOrField} ${currentPosition} на ${cellOrField} ${currentPosition + diceValue}.`;
                } else {
                    message += `Отлично! Вы переместились с ${cellOrField} ${currentPosition} на ${cellOrField} 72.`;
                }
            }
            // Special case for cell 70 - need to roll 2 to reach cell 72
            else if (currentPosition === 70) {
                if (diceValue > 2) {
                    message += `Перебор! Вам нужно выбросить точно 2, чтобы попасть на клетку 72.`;
                } else if (diceValue < 2) {
                    message += `Перемещение с ${cellOrField} ${currentPosition} на ${cellOrField} ${currentPosition + diceValue}.`;
                } else {
                    message += `Отлично! Вы переместились с ${cellOrField} ${currentPosition} на ${cellOrField} 72.`;
                }
            }
            // Special case for cell 71 - need to roll 1 to reach cell 72
            else if (currentPosition === 71) {
                if (diceValue > 1) {
                    message += `Перебор! Вам нужно выбросить точно 1, чтобы попасть на клетку 72.`;
                } else {
                    message += `Отлично! Вы переместились с ${cellOrField} ${currentPosition} на ${cellOrField} 72.`;
                }
            }
            // End game special case - approaching cell 72
            else if (currentPosition + diceValue > 72) {
                const neededValue = 72 - currentPosition;
                message += `Перебор! Вам нужно выбросить точно ${neededValue} для достижения финальной клетки.`;
            }
            // Отображение сообщения о результатах броска после накопленных шестерок
            else if (sixesState && sixesState.diceSequence.length > 0 && diceValue !== 6) {
                if (sixesState.sixesBurned) {
                    message += `Шестерки сгорели! Вы перемещаетесь на ${diceValue} шагов.`;
                } else {
                    // Формируем сообщение о ходе на все накопленные шестерки и текущее значение
                    const allSixes = sixesState.diceSequence.slice(0, -1).map(() => 6).join("-");
                    message += `Вы ходите на ${allSixes}-${diceValue} шагов!`;
                }
            }
            // Normal movement
            else {
                const nextPosition = currentPosition + diceValue;
                
                // Check if next position is a snake start
                const snakeEnd = getSnakeEnd(nextPosition);
                if (snakeEnd) {
                    message += `Перемещение с ${cellOrField} ${currentPosition} на ${cellOrField} ${nextPosition}.`;
                    // Snake event will be handled by position change listener
                } 
                // Check if next position is an arrow start
                else {
                    const arrowEnd = getArrowEnd(nextPosition);
                    if (arrowEnd) {
                        message += `Перемещение с ${cellOrField} ${currentPosition} на ${cellOrField} ${nextPosition}.`;
                        // Arrow event will be handled by position change listener
                    } else {
                        // Normal movement
                        message += `Перемещение с ${cellOrField} ${currentPosition} на ${cellOrField} ${nextPosition}.`;
                    }
                }
            }
            
            showMatrixMessage(message);
        }
    }

    /**
     * Get end position of a snake if starting from the given position
     * @param {number} position - Starting position
     * @returns {number|null} - End position or null
     */
    function getSnakeEnd(position) {
        const snakes = [
            { from: 12, to: 8 },
            { from: 16, to: 4 },
            { from: 24, to: 7 },
            { from: 29, to: 6 },
            { from: 44, to: 9 },
            { from: 52, to: 35 },
            { from: 55, to: 3 },
            { from: 61, to: 13 },
            { from: 63, to: 2 },
            { from: 72, to: 51 }
        ];
        
        const snake = snakes.find(s => s.from === position);
        return snake ? snake.to : null;
    }

    /**
     * Get end position of an arrow if starting from the given position
     * @param {number} position - Starting position
     * @returns {number|null} - End position or null
     */
    function getArrowEnd(position) {
        const arrows = [
            { from: 10, to: 23 },
            { from: 17, to: 69 },
            { from: 20, to: 32 },
            { from: 22, to: 60 },
            { from: 27, to: 41 },
            { from: 28, to: 50 },
            { from: 37, to: 66 },
            { from: 45, to: 67 },
            { from: 46, to: 62 },
            { from: 54, to: 68 }
        ];
        
        const arrow = arrows.find(a => a.from === position);
        return arrow ? arrow.to : null;
    }

    /**
     * Process position change event
     * @param {Object} detail - Event detail
     */
    function processPositionChange(detail) {
        const from = detail?.from || window.previousPosition || 0;
        const to = detail?.to || detail?.position || 0;
        
        console.log("Matrix commentator: processPositionChange", from, "→", to, "welcomeMessageShown:", welcomeMessageShown);
        
        // Store this for future reference
        window.previousPosition = from;
        
        // Special message for cell 6 when game starts - only if we haven't shown it yet
        if (to === 6 && !welcomeMessageShown) {
            console.log("Matrix commentator: Showing welcome message for cell 6");
            welcomeMessageShown = true;
            showMatrixMessage('Поздравляем! Игра началась - вы на клетке 6 - бросайте кубик');
            return;
        }
        
        // Special message for cell 51 (Karma Field)
        if (to === 51) {
            showMatrixMessage('Вы попали на клетку 51 - Поле кармы');
            return;
        }
        
        if (from && to && from !== to) {
            const cellOrField1 = Math.random() > 0.5 ? "клетки" : "поля";
            const cellOrField2 = Math.random() > 0.5 ? "клетку" : "поле";
            
            // Check if this is a snake movement
            if (isSnakeMove(from, to)) {
                showMatrixMessage(`Змея! Перемещение с ${cellOrField1} ${from} на ${cellOrField2} ${to}.`);
                return;
            }
            
            // Check if this is an arrow movement
            if (isArrowMove(from, to)) {
                showMatrixMessage(`Стрела! Перемещение с ${cellOrField1} ${from} на ${cellOrField2} ${to}.`);
                return;
            }
            
            // Normal movement - only show if not already handled by dice roll
            const moveValue = to - from;
            if (moveValue > 0 && moveValue !== 6) { // Don't duplicate initial 6 message
                showMatrixMessage(`Перемещение с ${cellOrField1} ${from} на ${cellOrField2} ${to}.`);
            }
        }
    }

    /**
     * Check if this is an arrow move
     * @param {number} from - Source position
     * @param {number} to - Target position
     * @returns {boolean} True if arrow move
     */
    function isArrowMove(from, to) {
        // List of all arrows in the game
        const arrows = [
            { from: 10, to: 23 },
            { from: 17, to: 69 },
            { from: 20, to: 32 },
            { from: 22, to: 60 },
            { from: 27, to: 41 },
            { from: 28, to: 50 },
            { from: 37, to: 66 },
            { from: 45, to: 67 },
            { from: 46, to: 62 },
            { from: 54, to: 68 }
        ];
        
        return arrows.some(arrow => arrow.from === from && arrow.to === to);
    }

    /**
     * Check if this is a snake move
     * @param {number} from - Source position
     * @param {number} to - Target position
     * @returns {boolean} True if snake move
     */
    function isSnakeMove(from, to) {
        // List of all snakes in the game
        const snakes = [
            { from: 12, to: 8 },
            { from: 16, to: 4 },
            { from: 24, to: 7 },
            { from: 29, to: 6 },
            { from: 44, to: 9 },
            { from: 52, to: 35 },
            { from: 55, to: 3 },
            { from: 61, to: 13 },
            { from: 63, to: 2 },
            { from: 72, to: 51 }
        ];
        
        return snakes.some(snake => snake.from === from && snake.to === to);
    }

    /**
     * Set up event listeners for game events
     */
    function setupGameEventListeners() {
        // Listen for position changes
        document.addEventListener('gamePositionChanged', function(e) {
            console.log("Matrix commentator: gamePositionChanged event received", e.detail);
            
            const to = e.detail?.to || e.detail?.position || 0;
            console.log("Matrix commentator: position =", to, "welcomeMessageShown:", welcomeMessageShown);
            
            // Force message for cell 6 if we haven't shown it yet
            if (to === 6 && !welcomeMessageShown) {
                console.log("Matrix commentator: Force showing welcome message for cell 6");
                welcomeMessageShown = true;
                showMatrixMessage('Поздравляем! Игра началась - вы на клетке 6 - бросайте кубик');
                return;
            }
            
            processPositionChange(e.detail);
            
            // Special cases
            if (e.detail) {
                if (e.detail.position === 68 || e.detail.to === 68) {
                    activateGreenMode();
                    showMatrixMessage('Достигнут План Абсолюта. Поздравляем с завершением духовного пути!');
                } else if (e.detail.position === 54 || e.detail.to === 54) {
                    showMatrixMessage('Активирована стрела восхождения. Перемещение на План Абсолюта...');
                } else if ((e.detail.position === 6 || e.detail.to === 6) && !welcomeMessageShown) {
                    // Only if welcome message hasn't been shown yet - removed the from===0 condition
                    console.log("Matrix commentator: Delayed welcome message for cell 6");
                    welcomeMessageShown = true;
                    setTimeout(() => {
                        showMatrixMessage('Поздравляем! Игра началась - вы на клетке 6 - бросайте кубик');
                    }, 500);
                } else if (e.detail.position === 51 || e.detail.to === 51) {
                    // Special message for Karma Field
                    setTimeout(() => {
                        showMatrixMessage('Вы попали на клетку 51 - Поле кармы');
                    }, 500);
                } else if (e.detail.position === 67 || e.detail.to === 67) {
                    setTimeout(() => {
                        showMatrixMessage('Вы на клетке 67. Вам нужно выбросить 5, чтобы попасть на клетку 72');
                    }, 500);
                } else if (e.detail.position === 68 || e.detail.to === 68) {
                    setTimeout(() => {
                        showMatrixMessage('Вы на клетке 68. Вам нужно выбросить 4, чтобы попасть на клетку 72');
                    }, 500);
                } else if (e.detail.position === 69 || e.detail.to === 69) {
                    setTimeout(() => {
                        showMatrixMessage('Вы на клетке 69. Вам нужно выбросить 3, чтобы попасть на клетку 72');
                    }, 500);
                } else if (e.detail.position === 70 || e.detail.to === 70) {
                    setTimeout(() => {
                        showMatrixMessage('Вы на клетке 70. Вам нужно выбросить 2, чтобы попасть на клетку 72');
                    }, 500);
                } else if (e.detail.position === 71 || e.detail.to === 71) {
                    setTimeout(() => {
                        showMatrixMessage('Вы на клетке 71. Вам нужно выбросить 1, чтобы попасть на клетку 72');
                    }, 500);
                }
            }
        });
        
        // Listen for dice rolls
        document.addEventListener('diceRolled', function(e) {
            console.log("Matrix commentator: diceRolled event received", e.detail);
            processDiceRoll(e.detail);
        });
        
        // Also listen for the diceRoll event (for compatibility with message-fix.js)
        document.addEventListener('diceRoll', function(e) {
            console.log("Matrix commentator: diceRoll event received", e.detail);
            processDiceRoll(e.detail);
        });
        
        // Listen for snake and arrow activations
        document.addEventListener('snakeActivated', function(e) {
            if (e.detail) {
                const from = e.detail.from;
                const to = e.detail.to;
                showMatrixMessage(`Змея! Перемещение с клетки ${from} на клетку ${to}.`);
            }
        });
        
        document.addEventListener('arrowActivated', function(e) {
            if (e.detail) {
                const from = e.detail.from;
                const to = e.detail.to;
                showMatrixMessage(`Стрела! Перемещение с клетки ${from} на клетку ${to}.`);
            }
        });
        
        // Observe the message element for direct DOM changes
        const messageElement = document.querySelector('.message');
        if (messageElement) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' || mutation.type === 'characterData') {
                        // If matrix active flag is missing, restore it
                        if (!messageElement.classList.contains('matrix-active')) {
                            console.log("Восстановление матричного комментатора после изменения DOM");
                            initMatrixComments();
                            
                            // Get current text and show in matrix style
                            const newText = messageElement.textContent;
                            if (newText && newText.trim() !== '') {
                                interceptAndProcessMessage(newText);
                            }
                        }
                    }
                });
            });
            
            // Start observing with proper configuration
            observer.observe(messageElement, {
                childList: true,
                characterData: true,
                subtree: true
            });
            
            console.log("Наблюдатель за изменениями сообщений установлен");
        }
        
        // Directly listen for game events by intercepting specific function calls
        interceptGameEvents();
        
        console.log("Обработчики событий для матричных комментариев установлены");
    }

    /**
     * Intercept game events by hooking into specific functions
     */
    function interceptGameEvents() {
        // Intercept the showSnakeAnimation function if available
        if (typeof window.showSnakeAnimation === 'function') {
            const originalShowSnakeAnimation = window.showSnakeAnimation;
            window.showSnakeAnimation = function(startPosition, endPosition) {
                console.log("Matrix commentator: Intercepted snake animation", startPosition, endPosition);
                showMatrixMessage(`Змея! Перемещение с клетки ${startPosition} на клетку ${endPosition}.`);
                return originalShowSnakeAnimation.apply(this, arguments);
            };
        }
        
        // Intercept the showArrowAnimation function if available
        if (typeof window.showArrowAnimation === 'function') {
            const originalShowArrowAnimation = window.showArrowAnimation;
            window.showArrowAnimation = function(startPosition, endPosition) {
                console.log("Matrix commentator: Intercepted arrow animation", startPosition, endPosition);
                showMatrixMessage(`Стрела! Перемещение с клетки ${startPosition} на клетку ${endPosition}.`);
                return originalShowArrowAnimation.apply(this, arguments);
            };
        }
        
        // Backup method: Monitor DOM elements for snake/arrow animations
        setInterval(function() {
            // Check for active snake animations
            const snakeElements = document.querySelectorAll('.snake-effect, .snake-portal');
            if (snakeElements.length > 0) {
                console.log("Matrix commentator: Snake animation detected via DOM");
                const currentPos = window.currentPosition || 0;
                const prevPos = window.previousPosition || 0;
                
                // If we detected a snake but haven't commented on it
                if (isSnakeMove(prevPos, currentPos)) {
                    showMatrixMessage(`Змея! Перемещение с клетки ${prevPos} на клетку ${currentPos}.`);
                }
            }
            
            // Check for active arrow animations
            const arrowElements = document.querySelectorAll('.arrow-effect, .ladder-effect');
            if (arrowElements.length > 0) {
                console.log("Matrix commentator: Arrow animation detected via DOM");
                const currentPos = window.currentPosition || 0;
                const prevPos = window.previousPosition || 0;
                
                // If we detected an arrow but haven't commented on it
                if (isArrowMove(prevPos, currentPos)) {
                    showMatrixMessage(`Стрела! Перемещение с клетки ${prevPos} на клетку ${currentPos}.`);
                }
            }
        }, 500);
        
        // Another backup: direct interception of event dispatches
        const originalDispatchEvent = EventTarget.prototype.dispatchEvent;
        EventTarget.prototype.dispatchEvent = function(event) {
            // Check for events related to snake/arrow animations
            if (event.type === 'animationstart' || event.type === 'animationend') {
                const target = event.target;
                if (target) {
                    if (target.classList.contains('snake-effect') || target.classList.contains('snake-portal')) {
                        console.log("Matrix commentator: Snake animation event detected", event);
                        // Process snake event if needed
                    } else if (target.classList.contains('arrow-effect') || target.classList.contains('ladder-effect')) {
                        console.log("Matrix commentator: Arrow animation event detected", event);
                        // Process arrow event if needed
                    }
                }
            }
            
            return originalDispatchEvent.apply(this, arguments);
        };
    }

    /**
     * Function to intercept and process game message texts
     * @param {string} text - Original message text
     */
    function interceptAndProcessMessage(text) {
        // Check if this is a dice roll message
        const diceMatch = text.match(/Выпало (\d+)/i);
        if (diceMatch) {
            const diceValue = parseInt(diceMatch[1]);
            processDiceRoll({ value: diceValue });
            return;
        }
        
        // Check if this is a snake movement message
        if (text.includes('змея') || text.includes('Змея')) {
            const positions = extractPositionsFromText(text);
            if (positions.from && positions.to) {
                showMatrixMessage(`Змея! Перемещение с клетки ${positions.from} на клетку ${positions.to}.`);
                return;
            }
        }
        
        // Check if this is an arrow movement message
        if (text.includes('стрела') || text.includes('Стрела')) {
            const positions = extractPositionsFromText(text);
            if (positions.from && positions.to) {
                showMatrixMessage(`Стрела! Перемещение с клетки ${positions.from} на клетку ${positions.to}.`);
                return;
            }
        }
        
        // Check for cell 6 specific message - only for first visit and if welcome message hasn't been shown yet
        if (text.includes('клетку 6') || text.includes('клетке 6') || text.includes('поле 6')) {
            if (window.currentPosition === 6 && window.previousPosition === 0 && !welcomeMessageShown) {
                welcomeMessageShown = true;
                showMatrixMessage('Поздравляем! Игра началась - вы на клетке 6 - бросайте кубик');
                return;
            }
        }
        
        // Check for cell 51 (Karma Field) message
        if (text.includes('клетку 51') || text.includes('клетке 51') || text.includes('поле 51')) {
            showMatrixMessage('Вы попали на клетку 51 - Поле кармы');
            return;
        }
        
        // If no special case detected, show the message as is
        showMatrixMessage(text);
    }

    /**
     * Helper function to extract positions from text
     * @param {string} text - Text to extract from
     * @returns {Object} Object with from and to positions
     */
    function extractPositionsFromText(text) {
        const result = { from: null, to: null };
        
        // Try to find positions with format "from XX to YY"
        const regex = /с (?:клетки|поля) (\d+) (?:на|в) (?:клетку|поле) (\d+)/i;
        const match = text.match(regex);
        
        if (match) {
            result.from = parseInt(match[1]);
            result.to = parseInt(match[2]);
        }
        
        return result;
    }

    // Initialize when the DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Make sure styles are loaded
        if (!document.getElementById('matrix-comment-styles')) {
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = 'matrix-comment.css';
            linkElement.id = 'matrix-comment-styles';
            document.head.appendChild(linkElement);
            console.log("Стили для матричных комментариев загружены");
        }
        
        // Добавляем стиль для анимации искр
        if (!document.getElementById('spark-animation-style')) {
            const style = document.createElement('style');
            style.id = 'spark-animation-style';
            style.textContent = `
                @keyframes sparkFade {
                    0% { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(0); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Наблюдатель за изменениями в DOM для обнаружения обновлений сообщений
        const setupMessageObserver = () => {
            const messageElement = document.querySelector('.message');
            if (!messageElement) return;
            
            // Создаем наблюдатель за изменениями
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' || mutation.type === 'characterData') {
                        // Если сообщение было изменено и матричный комментатор инициализирован
                        if (state.isInitialized && messageElement && !messageElement.classList.contains('matrix-active')) {
                            // Восстанавливаем матричный комментатор
                            initMatrixComments();
                            
                            // Обрабатываем новое сообщение
                            const newText = messageElement.textContent;
                            if (newText && newText !== state.startMessage) {
                                showMatrixMessage(newText, 'Игра');
                            }
                        }
                    }
                });
            });
            
            // Настраиваем наблюдатель
            observer.observe(messageElement, {
                childList: true,
                characterData: true,
                subtree: true
            });
        };
        
        // Initialize the matrix comment system
        setTimeout(() => {
            console.log("Инициализация системы матричных комментариев...");
            initMatrixComments();
            
            // Setup DOM observer
            setupMessageObserver();
            
            // Set up event listeners for game events
            setupGameEventListeners();
        }, 100); // Reduce timeout from 1000 to 100 for faster initialization
        
        // Reset welcome message flag when page loads
        welcomeMessageShown = false;
    });

    // Expose functions to global scope for other modules to use
    window.MatrixComments = {
        showMatrixMessage: showMatrixMessage,
        processPositionChange: processPositionChange,
        processDiceRoll: processDiceRoll,
        init: initMatrixComments
    };

    // Add an additional hook to watch game-related functions
    if (typeof window.movePlayer === 'function') {
        const originalMovePlayer = window.movePlayer;
        window.movePlayer = function(position) {
            console.log("Matrix commentator: movePlayer intercepted", position);
            if (position === 6 && !welcomeMessageShown) {
                console.log("Matrix commentator: movePlayer detected cell 6, showing welcome message");
                welcomeMessageShown = true;
                setTimeout(() => {
                    showMatrixMessage('Поздравляем! Игра началась - вы на клетке 6 - бросайте кубик');
                }, 700);
            }
            return originalMovePlayer.apply(this, arguments);
        };
    }
})(); 