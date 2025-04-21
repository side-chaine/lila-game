/**
 * Улучшенный модуль сообщений для игры Лила
 * Решает проблему с конфликтами сообщений и корректно обрабатывает ожидание 6-ки
 */
(function() {
    console.log(">>> Инициализация улучшенного модуля сообщений");
    
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
    
    // Отслеживаем количество неудачных бросков для разных фраз
    let failedRollCount = 0;
    
    // Определение состояния игры
    function isGameStarted() {
        // Используем функцию из game-state-fixer.js если она доступна
        if (typeof window.isGameStarted === 'function') {
            return window.isGameStarted();
        }
        
        // Иначе используем собственную логику определения
        return window.gameStarted === true || 
               window.gameState?.started === true || 
               window.currentPosition > 1 || 
               window.currentPosition === 6;
    }
    
    // Отправка события о броске кубика для других модулей
    function dispatchDiceRollEvent(diceValue) {
        console.log(`message-fix: Отправляем событие о броске кубика: ${diceValue}`);
        
        // Создаем и запускаем событие diceRoll для взаимодействия с матричным комментатором
        const diceRollEvent = new CustomEvent('diceRoll', {
            detail: {
                result: diceValue,
                isFirstRoll: !isGameStarted()
            }
        });
        document.dispatchEvent(diceRollEvent);
        
        // Также отправляем событие diceRolled для совместимости
        const diceRolledEvent = new CustomEvent('diceRolled', {
            detail: {
                value: diceValue,
                isFirstRoll: !isGameStarted()
            }
        });
        document.dispatchEvent(diceRolledEvent);
    }
    
    // Инициализация при загрузке DOM
    document.addEventListener('DOMContentLoaded', function() {
        console.log("Подготовка к перехвату функции processGameLogic...");
        
        // Настраиваем текст первоначального сообщения
        const messageElement = document.querySelector('.message');
        if (messageElement && messageElement.textContent.includes('Бросьте кубик')) {
            messageElement.innerHTML = '<span style="color:#3498db">Бросайте кубик и ждите шестерку для начала приключения!</span>';
        }
        
        // Небольшая задержка, чтобы убедиться, что все скрипты загружены
        setTimeout(function() {
            // Сохраняем оригинальную функцию обработки броска кубика
            let originalProcessGameLogic;
            let matrixInterceptorAlreadyRan = false;
            
            if (typeof window.processGameLogic === 'function') {
                originalProcessGameLogic = window.processGameLogic;
                
                window.processGameLogic = function(diceValue) {
                    console.log(`message-fix: Выпало ${diceValue}, проверяем состояние игры...`);
                    
                    // Отправляем событие о броске кубика для других модулей
                    dispatchDiceRollEvent(diceValue);
                    
                    // Определяем, началась ли игра
                    const gameStarted = isGameStarted();
                    
                    console.log(`message-fix: Состояние игры - ${gameStarted ? 'НАЧАЛАСЬ' : 'НЕ НАЧАЛАСЬ'}, позиция: ${window.currentPosition || 1}`);
                    
                    // Если игра не началась и выпало не 6, показываем случайную фразу
                    if (!gameStarted && diceValue !== 6) {
                        // Увеличиваем счетчик неудачных бросков
                        failedRollCount++;
                        
                        // Выбираем случайную фразу
                        const randomIndex = Math.floor(Math.random() * waitingSixPhrases.length);
                        const phrase = waitingSixPhrases[randomIndex];
                        
                        // Показываем стилизованное сообщение
                        const messageElement = document.querySelector('.message');
                        if (messageElement) {
                            // Выпадающий номер и основная фраза
                            const messageText = `Выпало ${diceValue}. ${phrase}`;
                            
                            // Обновляем содержимое сообщения
                            messageElement.innerHTML = `<span style="color:#f1c40f">Выпало ${diceValue}.</span> ${phrase}`;
                            
                            // Если было много неудачных бросков, добавляем подбадривание
                            if (failedRollCount > 3 && failedRollCount % 3 === 0) {
                                messageElement.innerHTML += `<br><span style="font-size:0.9em; color:#3498db">Не сдавайся! Шестерка уже близко!</span>`;
                            }
                            
                            // Вызываем перехватчик сообщений матричного комментатора
                            if (typeof window.interceptAndProcessMessage === 'function') {
                                window.interceptAndProcessMessage(messageText);
                            }
                        }
                        
                        console.log(`message-fix: Показано сообщение для неудачного броска #${failedRollCount}`);
                        matrixInterceptorAlreadyRan = true;
                    }
                    
                    // Если выпала 6 и игра не началась, выводим радостное сообщение
                    if (!gameStarted && diceValue === 6) {
                        const messageElement = document.querySelector('.message');
                        if (messageElement) {
                            const messageText = `Выпало ${diceValue}! Поздравляем! Игра началась!`;
                            messageElement.innerHTML = `<span style="color:#2ecc71">${messageText}</span>`;
                            
                            // Вызываем перехватчик сообщений матричного комментатора
                            if (typeof window.interceptAndProcessMessage === 'function') {
                                window.interceptAndProcessMessage(messageText);
                            }
                        }
                        
                        // Сбрасываем счетчик неудачных бросков
                        failedRollCount = 0;
                        
                        // Отмечаем, что игра началась
                        window.gameStarted = true;
                        if (window.gameState) {
                            window.gameState.started = true;
                        }
                        
                        console.log(`message-fix: Выпала шестерка, игра начинается!`);
                        matrixInterceptorAlreadyRan = true;
                    }
                    
                    // Если игра началась или выпало 6, передаем управление оригинальной функции
                    if (originalProcessGameLogic && (!matrixInterceptorAlreadyRan || gameStarted || diceValue === 6)) {
                        return originalProcessGameLogic(diceValue);
                    }
                };
                
                console.log(">>> Функция processGameLogic успешно перехвачена");
            } else {
                console.warn("Функция processGameLogic не найдена");
            }
            
            // Дополнительно перехватываем функцию броска кубика
            if (typeof window.rollDice === 'function') {
                const originalRollDice = window.rollDice;
                
                window.rollDice = function() {
                    console.log("message-fix: Перехват броска кубика");
                    
                    // Проверяем и обновляем состояние игры перед броском
                    const gameStarted = isGameStarted();
                    
                    // Если игра уже началась, убеждаемся, что все переменные состояния установлены
                    if (gameStarted) {
                        window.gameStarted = true;
                        if (window.gameState) {
                            window.gameState.started = true;
                        }
                    }
                    
                    // Вызываем оригинальную функцию
                    originalRollDice.apply(this, arguments);
                };
                
                console.log(">>> Функция rollDice успешно перехвачена");
            }
            
            // Экспортируем функцию для внешнего использования
            window.interceptAndProcessMessage = function(text) {
                if (typeof window.MatrixComments !== 'undefined' && 
                    typeof window.MatrixComments.showMatrixMessage === 'function') {
                    window.MatrixComments.showMatrixMessage(text, 'Игра');
                    return true;
                }
                return false;
            };
            
        }, 800); // Увеличиваем задержку для гарантии загрузки всех скриптов
    });
})(); 