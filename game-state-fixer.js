/**
 * Исправление ошибки определения состояния игры
 * Этот скрипт устанавливает обработчики, которые позволяют корректно отслеживать
 * состояние игры и предотвращают появление сообщения "нужна 6 чтобы начать игру"
 * после того как игра уже началась
 */
(function() {
    console.log(">>> Инициализация модуля исправления состояния игры");
    
    // Устанавливаем глобальное состояние игры
    window.gameState = {
        started: false,
        currentPosition: 1,
        previousPositions: []
    };
    
    // Функция определения состояния игры
    function isGameStarted() {
        // Проверяем различные признаки того, что игра началась
        return window.gameState.started || 
               window.gameStarted === true || 
               window.currentPosition > 1 || 
               window.currentPosition === 6;
    }
    
    // Устанавливаем интервал, который будет периодически проверять состояние игры
    setInterval(function() {
        // Проверяем текущую позицию
        const currentPos = window.currentPosition || 1;
        
        // Если позиция изменилась, обновляем историю
        if (currentPos !== window.gameState.currentPosition) {
            window.gameState.previousPositions.push(window.gameState.currentPosition);
            window.gameState.currentPosition = currentPos;
            
            // Если позиция > 1 или равна 6, игра определенно началась
            if (currentPos > 1 || currentPos === 6) {
                window.gameState.started = true;
                window.gameStarted = true; // Устанавливаем глобальную переменную
                console.log(`>>> Состояние игры обновлено - ИГРА НАЧАЛАСЬ, позиция: ${currentPos}`);
            }
        }
        
        // Проверяем значение gameStarted
        if (typeof window.gameStarted !== 'undefined' && window.gameStarted === true) {
            window.gameState.started = true;
        }
    }, 500);
    
    // Перехватываем функцию rollDice
    document.addEventListener('DOMContentLoaded', function() {
        // Ждем некоторое время, чтобы убедиться, что все скрипты загружены
        setTimeout(function() {
            if (typeof window.rollDice === 'function') {
                const originalRollDice = window.rollDice;
                
                window.rollDice = function() {
                    // Добавляем проверку перед вызовом оригинальной функции
                    if (isGameStarted()) {
                        console.log(">>> Бросок кубика - ИГРА УЖЕ НАЧАЛАСЬ");
                        // Устанавливаем флаги перед броском кубика
                        window.gameStarted = true;
                        window.gameState.started = true;
                    }
                    
                    // Вызываем оригинальную функцию
                    originalRollDice.apply(this, arguments);
                };
                
                console.log(">>> Функция rollDice успешно перехвачена");
            }
        }, 1000);
    });
    
    // Экспортируем функцию для внешнего использования
    window.isGameStarted = isGameStarted;
})(); 