/**
 * Модуль правила шестерок (ФИНАЛЬНАЯ ВЕРСИЯ)
 * Реализует специальное правило для последовательных шестерок в игре:
 * - Когда выпадает 6, игрок получает дополнительный ход
 * - Накапливаются шестерки для будущего перемещения
 * - Если выпадают три шестерки подряд, игрок теряет накопленные ходы и возвращается на исходную позицию
 */
(function() {
    console.log("[SIX-RULE] Инициализация модуля правила шестерок (ФИНАЛЬНАЯ ВЕРСИЯ)");
    
    // Переменные для отслеживания шестерок
    let consecutiveSixes = 0;    // Счетчик последовательных шестерок
    let positionBeforeSixes = 0; // Позиция до начала серии шестерок
    let accumulatedSixes = 0;    // Накопленные шестерки для движения
    let lastRoll = 0;
    let lastRollWasSix = false;
    let isSpecialMovePending = false; // Флаг ожидания специального хода
    let installAttempts = 0;     // Счетчик попыток установки

    // Статус перехвата функций
    let functionsIntercepted = {
        rollDice: false,
        processGameLogic: false,
        movePlayer: false
    };
    
    // Оригинальные функции, которые будут перехвачены
    let originalRollDice;
    let originalProcessGameLogic;
    let originalMovePlayer;
    
    // Заменяем стандартные функции игры своими с задержкой, чтобы убедиться,
    // что мы перехватываем функции после всех других модулей
    function installLate() {
        installAttempts++;
        console.log(`[SIX-RULE] Запуск отложенной установки перехватчиков... (попытка ${installAttempts})`);
        
        // Сохраняем оригинальные функции
        if (typeof window.rollDice === 'function' && !functionsIntercepted.rollDice) {
            originalRollDice = window.rollDice;
            window.rollDice = enhancedRollDice;
            functionsIntercepted.rollDice = true;
            console.log("[SIX-RULE] Функция rollDice успешно перехвачена (ФИНАЛЬНАЯ ВЕРСИЯ)");
        } else if (!functionsIntercepted.rollDice) {
            console.warn("[SIX-RULE] Не удалось перехватить функцию rollDice");
        }
        
        if (typeof window.processGameLogic === 'function' && !functionsIntercepted.processGameLogic) {
            originalProcessGameLogic = window.processGameLogic;
            window.processGameLogic = enhancedProcessGameLogic;
            functionsIntercepted.processGameLogic = true;
            console.log("[SIX-RULE] Функция processGameLogic успешно перехвачена (ФИНАЛЬНАЯ ВЕРСИЯ)");
        } else if (!functionsIntercepted.processGameLogic) {
            console.warn("[SIX-RULE] Не удалось перехватить функцию processGameLogic");
        }
        
        if (typeof window.movePlayer === 'function' && !functionsIntercepted.movePlayer) {
            originalMovePlayer = window.movePlayer;
            window.movePlayer = enhancedMovePlayer;
            functionsIntercepted.movePlayer = true;
            console.log("[SIX-RULE] Функция movePlayer успешно перехвачена (ФИНАЛЬНАЯ ВЕРСИЯ)");
        } else if (!functionsIntercepted.movePlayer) {
            console.warn("[SIX-RULE] Не удалось перехватить функцию movePlayer");
        }
        
        // Также повторно привязываем обработчик кликов к кубику для гарантии
        const dice = document.getElementById('game-dice');
        if (dice) {
            dice.addEventListener('click', function(e) {
                console.log("[SIX-RULE] Перехвачен клик по кубику");
                e.preventDefault();
                e.stopPropagation();
                enhancedRollDice();
                return false;
            }, true);
            console.log("[SIX-RULE] Обработчик кликов на кубик установлен (ФИНАЛЬНАЯ ВЕРСИЯ)");
        }

        // Добавим индикатор в UI для подтверждения работы модуля
        updateDebugInfo();
    }
    
    // Добавляем функцию для обновления информации в отладочной панели
    function updateDebugInfo() {
        const debugPanel = document.querySelector('.debug-panel');
        if (debugPanel) {
            const sixRuleInfo = document.createElement('div');
            sixRuleInfo.className = 'six-rule-info';
            sixRuleInfo.style.color = 'lime';
            sixRuleInfo.style.fontFamily = 'monospace';
            sixRuleInfo.style.margin = '5px 0';
            sixRuleInfo.textContent = 'ПРАВИЛО ШЕСТЕРОК АКТИВНО';
            
            // Удаляем старые сообщения перед добавлением нового
            const oldInfo = debugPanel.querySelector('.six-rule-info');
            if (oldInfo) {
                oldInfo.remove();
            }
            
            debugPanel.appendChild(sixRuleInfo);
        }
    }
    
    // Функция для проверки, началась ли игра
    function isGameStarted() {
        return window.gameStarted || 
               window.currentPosition > 1 || 
               window.currentPosition === 6 ||
               (window.gameState && window.gameState.started);
    }
    
    // Отправка события о выпадении шестерки для матричного комментатора
    function notifySixRolled(consecutiveCount, accumulated) {
        // Создаем событие для матричного комментатора
        document.dispatchEvent(new CustomEvent('sixRolled', {
            detail: {
                count: consecutiveCount,
                accumulated: accumulated,
                isThreeSixes: consecutiveCount === 3
            }
        }));
        
        console.log(`[SIX-RULE] Отправлено событие о выпадении шестерки (${consecutiveCount}, накоплено: ${accumulated})`);
    }
    
    // Улучшенная функция перемещения игрока
    function enhancedMovePlayer(position) {
        console.log(`[SIX-RULE] enhancedMovePlayer: Перемещение на позицию ${position}, isSpecialMovePending=${isSpecialMovePending}`);
        
        // Если не ожидается специальное перемещение из-за шестерок, используем оригинальную функцию
        if (!isSpecialMovePending) {
            if (originalMovePlayer) {
                originalMovePlayer(position);
            } else {
                console.error("[SIX-RULE] Оригинальная функция movePlayer недоступна!");
            }
        } else {
            console.log(`[SIX-RULE] Ожидается специальное перемещение, пропускаем стандартное`);
        }
    }
    
    // Улучшенная функция броска кубика
    function enhancedRollDice() {
        console.log("[SIX-RULE] Запущен enhancedRollDice (ФИНАЛЬНАЯ ВЕРСИЯ)");
        
        // Отключаем кубик во время анимации
        const dice = document.getElementById('game-dice');
        if (dice) {
            dice.style.pointerEvents = 'none';
        }
        
        // Получаем случайное значение кубика (1-6)
        const diceValue = Math.floor(Math.random() * 6) + 1;
        lastRoll = diceValue;
        lastRollWasSix = (diceValue === 6);
        
        console.log(`[SIX-RULE] Выпало число: ${diceValue} (правило шестерок активно)`);
        
        // Показываем результат после короткой задержки
        setTimeout(() => {
            // Обновляем отображение кубика
            if (dice) {
                dice.innerHTML = `<span>${diceValue}</span>`;
                
                // Если не выпала 6 или у нас уже 3 шестерки подряд, включаем кубик обратно
                if (diceValue !== 6 || consecutiveSixes >= 3) {
                    dice.style.pointerEvents = 'auto';
                }
            }
            
            // Отправляем событие о броске кубика
            document.dispatchEvent(new CustomEvent('diceRoll', {
                detail: {
                    result: diceValue,
                    isFirstRoll: !isGameStarted(),
                    consecutiveSixes,
                    accumulatedSixes
                }
            }));
            
            // Обрабатываем логику игры с выпавшим значением
            enhancedProcessGameLogic(diceValue);
            
        }, 500); // Задержка для анимации кубика
    }
    
    // Улучшенная функция обработки логики игры
    function enhancedProcessGameLogic(diceValue) {
        console.log(`[SIX-RULE] enhancedProcessGameLogic: получено значение ${diceValue}`);
        
        // Проверяем, началась ли игра
        const gameStarted = isGameStarted();
        
        // Если игра еще не началась, используем стандартную логику
        if (!gameStarted) {
            console.log("[SIX-RULE] Игра еще не началась, обрабатываем первую шестерку");
            
            if (diceValue === 6) {
                console.log("[SIX-RULE] Выпала первая шестерка! Игра начинается");
                window.gameStarted = true;
                if (window.gameState) {
                    window.gameState.started = true;
                }
                
                // Перемещаем игрока на позицию 6
                window.currentPosition = 6;
                if (typeof originalMovePlayer === 'function') {
                    originalMovePlayer(6);
                } else {
                    console.error("[SIX-RULE] Оригинальная функция movePlayer недоступна при старте игры!");
                }
                
                // Обновляем сообщение
                const messageElement = document.querySelector('.message');
                if (messageElement) {
                    messageElement.innerHTML = `<span style="color:#4CAF50; font-weight:bold;">ПРАВИЛО ШЕСТЁРОК:</span> Выпала шестерка! Игра началась! Вы находитесь на клетке 6.`;
                }
                
                return;
            } else {
                // Если выпало не 6, показываем соответствующее сообщение
                const messageElement = document.querySelector('.message');
                if (messageElement) {
                    messageElement.textContent = `Выпало ${diceValue}. Для начала игры необходима шестерка.`;
                }
                return;
            }
        }
        
        // Проверяем, выпала ли шестерка
        if (diceValue === 6) {
            console.log("[SIX-RULE] Выпала шестерка в игре!");
            
            // Если это первая шестерка в серии, сохраняем текущую позицию
            if (consecutiveSixes === 0) {
                positionBeforeSixes = window.currentPosition;
                console.log(`[SIX-RULE] Первая шестерка в серии. Сохраняем позицию: ${positionBeforeSixes}`);
            }
            
            // Увеличиваем счетчик последовательных шестерок
            consecutiveSixes++;
            // Добавляем в накопленные шестерки
            accumulatedSixes += diceValue;
            
            console.log(`[SIX-RULE] Выпала шестерка #${consecutiveSixes}. Накоплено: ${accumulatedSixes}`);
            
            // Обновляем сообщение для игрока
            const messageElement = document.querySelector('.message');
            
            // Проверяем, не выпали ли три шестерки подряд
            if (consecutiveSixes === 3) {
                console.log("[SIX-RULE] Три шестерки подряд! Возвращаемся на исходную позицию.");
                
                // Отправляем уведомление о шестерке для матричного комментатора
                notifySixRolled(consecutiveSixes, accumulatedSixes);
                
                // Игрок теряет накопленные шестерки и возвращается на позицию до серии шестерок
                if (messageElement) {
                    messageElement.innerHTML = `<span style="color:#FF4500; font-weight:bold;">ПРАВИЛО ШЕСТЁРОК:</span> Выпало три шестерки подряд! Вы теряете накопленные ходы (${accumulatedSixes}) и возвращаетесь на клетку ${positionBeforeSixes}.`;
                }
                
                // Возвращаем игрока на позицию до начала серии шестерок
                window.currentPosition = positionBeforeSixes;
                if (typeof originalMovePlayer === 'function') {
                    isSpecialMovePending = true; // Устанавливаем флаг специального перемещения
                    originalMovePlayer(positionBeforeSixes);
                    setTimeout(() => {
                        isSpecialMovePending = false; // Сбрасываем флаг
                    }, 100);
                } else {
                    console.error("[SIX-RULE] Оригинальная функция movePlayer недоступна при трёх шестерках!");
                }
                
                // Сбрасываем счетчики
                consecutiveSixes = 0;
                accumulatedSixes = 0;
                
                // Включаем кубик обратно
                const dice = document.getElementById('game-dice');
                if (dice) {
                    dice.style.pointerEvents = 'auto';
                }
                
                return;
            }
            
            // Отправляем уведомление о шестерке для матричного комментатора
            notifySixRolled(consecutiveSixes, accumulatedSixes);
            
            // Сообщение о выпадении шестерки
            if (messageElement) {
                messageElement.innerHTML = `<span style="color:#4CAF50; font-weight:bold;">ПРАВИЛО ШЕСТЁРОК:</span> Выпала шестерка! Вы накопили ${accumulatedSixes} очков. Бросайте кубик снова!`;
            }
            
            // При выпадении шестерки игрок бросает кубик снова, кубик остается активным
            const dice = document.getElementById('game-dice');
            if (dice) {
                dice.style.pointerEvents = 'auto';
            }
            
            // ВАЖНО: НЕ ВЫЗЫВАЕМ ОРИГИНАЛЬНУЮ ФУНКЦИЮ, так как при шестерке фишка не должна двигаться
            return;
        }
        
        // Если выпало не 6, используем накопленные шестерки и стандартную логику
        let moveAmount = diceValue;
        
        // Если были накопленные шестерки, добавляем их к ходу
        if (accumulatedSixes > 0) {
            moveAmount += accumulatedSixes;
            
            console.log(`[SIX-RULE] Используем накопленные шестерки: ${accumulatedSixes} + ${diceValue} = ${moveAmount}`);
            
            const messageElement = document.querySelector('.message');
            if (messageElement) {
                messageElement.innerHTML = `<span style="color:#2196F3; font-weight:bold;">ПРАВИЛО ШЕСТЁРОК:</span> Выпало ${diceValue}. С учетом накопленных шестерок (${accumulatedSixes}) вы передвигаетесь на ${moveAmount} клеток.`;
            }
        }
        
        // Сбрасываем счетчики шестерок
        consecutiveSixes = 0;
        const prevAccumulatedSixes = accumulatedSixes;
        accumulatedSixes = 0;
        
        // Базовая логика обработки хода
        let newPosition = window.currentPosition + moveAmount;
        
        // ПРАВИЛО: Если игрок на клетках 69-71 и бросает слишком много для клетки 72
        if (window.currentPosition >= 69 && window.currentPosition < 72 && newPosition > 72) {
            console.log(`[SIX-RULE] Новая позиция ${newPosition} превышает 72, игрок остается на клетке ${window.currentPosition}`);
            
            const messageElement = document.querySelector('.message');
            if (messageElement) {
                if (prevAccumulatedSixes > 0) {
                    messageElement.innerHTML = `<span style="color:#FF6347; font-weight:bold;">ПРАВИЛО ШЕСТЁРОК:</span> Выпало ${diceValue} + накопленные ${prevAccumulatedSixes}. Чтобы попасть на клетку 72, нужно выбросить ровно ${72 - window.currentPosition}. Вы остаетесь на клетке ${window.currentPosition}.`;
                } else {
                    messageElement.textContent = `Выпало ${diceValue}. Чтобы попасть на клетку 72, нужно выбросить ровно ${72 - window.currentPosition}. Вы остаетесь на клетке ${window.currentPosition}.`;
                }
            }
            
            return;
        }
        
        // Перемещаем игрока на новую позицию
        console.log(`[SIX-RULE] Перемещаем игрока с ${window.currentPosition} на ${newPosition}`);
        
        // Вызываем оригинальную функцию обработки логики с измененным значением движения
        if (originalProcessGameLogic) {
            originalProcessGameLogic(moveAmount);
        } else {
            console.error("[SIX-RULE] Оригинальная функция processGameLogic недоступна при обычном ходе!");
            // Резервный вариант для обработки хода, если оригинальная функция недоступна
            window.currentPosition = newPosition;
            if (typeof originalMovePlayer === 'function') {
                originalMovePlayer(newPosition);
            }
        }
    }
    
    // Функция для отслеживания нажатия пробела
    function setupSpacebarHandler() {
        document.addEventListener('keydown', function(e) {
            if (e.code === 'Space' || e.keyCode === 32) {
                console.log("[SIX-RULE] Перехвачено нажатие пробела");
                
                // Имитируем нажатие на кубик
                const dice = document.getElementById('game-dice');
                if (dice && dice.style.pointerEvents !== 'none') {
                    enhancedRollDice();
                }
            }
        });
        console.log("[SIX-RULE] Обработчик нажатия пробела установлен");
    }
    
    // Экспортируем функции для внешнего использования и отладки
    window.sixRuleModule = {
        getState: function() {
            return {
                consecutiveSixes,
                positionBeforeSixes,
                accumulatedSixes,
                lastRoll,
                lastRollWasSix,
                isGameStarted: isGameStarted(),
                functionsIntercepted
            };
        },
        reinstall: installLate
    };
    
    // Настраиваем периодическую проверку целостности перехвата
    const integrityInterval = setInterval(function() {
        // Проверяем, не перезаписал ли кто-то наши функции
        if (functionsIntercepted.rollDice && window.rollDice !== enhancedRollDice) {
            console.warn("[SIX-RULE] Функция rollDice была перезаписана, восстанавливаем перехват");
            originalRollDice = window.rollDice;
            window.rollDice = enhancedRollDice;
        }
        
        if (functionsIntercepted.processGameLogic && window.processGameLogic !== enhancedProcessGameLogic) {
            console.warn("[SIX-RULE] Функция processGameLogic была перезаписана, восстанавливаем перехват");
            originalProcessGameLogic = window.processGameLogic;
            window.processGameLogic = enhancedProcessGameLogic;
        }
        
        if (functionsIntercepted.movePlayer && window.movePlayer !== enhancedMovePlayer) {
            console.warn("[SIX-RULE] Функция movePlayer была перезаписана, восстанавливаем перехват");
            originalMovePlayer = window.movePlayer;
            window.movePlayer = enhancedMovePlayer;
        }
        
        // Если все функции перехвачены и проверка работала более 10 секунд, останавливаем интервал
        if (installAttempts > 3 && 
            functionsIntercepted.rollDice && 
            functionsIntercepted.processGameLogic && 
            functionsIntercepted.movePlayer) {
            console.log("[SIX-RULE] Интервал проверки целостности перехватов остановлен");
            clearInterval(integrityInterval);
        }
    }, 2000);
    
    // Запускаем установку перехватчиков с задержкой
    setTimeout(installLate, 1000);
    
    // Повторно пытаемся установить перехватчики через 3 секунды для надежности
    setTimeout(installLate, 3000);
    
    // Устанавливаем обработчик пробела
    setupSpacebarHandler();
    
    console.log("[SIX-RULE] Модуль правила шестерок инициализирован, установка перехватчиков через 1 секунду");
})(); 