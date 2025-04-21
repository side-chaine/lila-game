/**
 * Специальный модуль только для обработки стрелы 54 -> 68
 * Максимально простая реализация без зависимостей от других скриптов
 */
(function() {
    console.log("Инициализация модуля стрелы 54 -> 68");
    
    // Глобальные переменные для отслеживания состояния
    window.isOnCell54 = false;
    window.isMovingToCell68 = false;
    
    // Перехватываем оригинальную функцию movePlayer
    if (typeof window.movePlayer === 'function') {
        const originalMovePlayer = window.movePlayer;
        
        window.movePlayer = function(newPosition) {
            console.log("Перехват movePlayer, новая позиция:", newPosition);
            
            // Если игра уже завершена (проверка из end-game-handler)
            if (window.gameFinished) {
                console.log("Игра завершена, движение заблокировано");
                return false;
            }
            
            // Проверяем, не перемещаемся ли мы на клетку 54
            if (newPosition === 54) {
                console.log("Игрок попал на клетку 54 - активируем стрелу на 68");
                
                // Вызываем оригинальную функцию для отображения на клетке 54
                const result = originalMovePlayer.call(this, newPosition);
                
                // Запоминаем, что мы на клетке 54
                window.isOnCell54 = true;
                window.currentPosition = 54;
                
                // Запускаем перемещение к клетке 68 с задержкой для анимации
                setTimeout(function() {
                    console.log("Запускаем перемещение на клетку 68");
                    
                    // Запоминаем, что мы в процессе перемещения на клетку 68
                    window.isMovingToCell68 = true;
                    
                    // Показываем анимацию стрелы
                    if (typeof window.showArrowAnimation === 'function') {
                        console.log("Запускаем анимацию стрелы 54 -> 68");
                        window.showArrowAnimation(54, 68);
                    }
                    
                    // Перемещаем фишку на клетку 68 с задержкой после анимации стрелы
                    setTimeout(function() {
                        // Сбрасываем флаг клетки 54
                        window.isOnCell54 = false;
                        
                        // Обновляем положение фишки
                        moveTokenToCell68();
                        
                        // Вызываем оригинальную функцию для перемещения на клетку 68
                        originalMovePlayer.call(this, 68);
                        
                        // Устанавливаем текущую позицию для других скриптов
                        window.currentPosition = 68;
                        
                        // Показываем сообщение о перемещении
                        showMessage("Вы попали на стрелу! Перемещение с клетки 54 на клетку 68.");
                        
                        // Сообщаем другим скриптам о перемещении
                        notifyPositionChange(68);
                        
                        // Сбрасываем флаг перемещения на клетку 68
                        window.isMovingToCell68 = false;
                    }, 1200); // Ждем завершения анимации стрелы
                }, 500); // Задержка начала перемещения
                
                return result;
            }
            
            // Специальный случай - перемещение с клетки 66 на клетку 68 при выпадении 2
            if (window.currentPosition === 66 && newPosition === 68) {
                console.log("Перемещение с клетки 66 на клетку 68 при выпадении 2");
                
                // Обновляем положение фишки
                moveTokenToCell68();
                
                // Запоминаем новую позицию
                window.currentPosition = 68;
                
                // Уведомляем другие модули о изменении позиции
                notifyPositionChange(68);
                
                // Вызываем проверку завершения игры с задержкой
                setTimeout(function() {
                    if (typeof window.checkGameEnd === 'function') {
                        window.checkGameEnd();
                    }
                }, 500);
                
                return true;
            }
            
            // Если это клетка 68 и мы уже в процессе перемещения туда, просто обновляем переменные
            if (newPosition === 68 && window.isMovingToCell68) {
                console.log("Уже в процессе перемещения на клетку 68");
                window.currentPosition = 68;
                return true;
            }
            
            // Используем обработчик end-game-handler, если он доступен
            if (newPosition === 68 && typeof window.endGameMoveWrapper === 'function' && !window.specialDirectMove) {
                console.log("Используем обработчик end-game-handler для клетки 68");
                
                // Устанавливаем флаг для предотвращения рекурсии
                window.specialDirectMove = true;
                try {
                    // Вызываем обработчик
                    const result = window.endGameMoveWrapper.apply(this, arguments);
                    return result;
                } finally {
                    // Сбрасываем флаг независимо от результата
                    window.specialDirectMove = false;
                }
            }
            
            // Для всех остальных случаев вызываем оригинальную функцию
            return originalMovePlayer.apply(this, arguments);
        };
    }
    
    // Функция для визуального перемещения фишки на клетку 68
    function moveTokenToCell68() {
        // Устанавливаем флаг, что происходит перемещение по стреле
        window.isMovingToCell68 = true;
        
        // Показываем сообщение в матричном комментарии если он доступен
        if (window.MatrixComments && typeof window.MatrixComments.showMessage === 'function') {
            window.MatrixComments.showMessage('Активирована стрела восхождения. Ваше сознание устремляется к плану Абсолюта...', 'Система');
        }
        
        // Пример координат клетки 68 (может потребоваться корректировка)
        const cell68X = 77.7; // Процент от ширины
        const cell68Y = 37.5; // Процент от высоты
        
        // Создаем вспышку на клетке 54 перед началом движения
        if (typeof window.createStrobeFlash === 'function') {
            window.createStrobeFlash(54);
        }
        
        // Получаем фишку
        const playerToken = document.querySelector('.player-token, .player');
        if (!playerToken) {
            console.error("Фишка игрока не найдена");
            return;
        }
        
        // Сохраняем текущее положение фишки
        const startX = parseFloat(playerToken.style.left) || 0;
        const startY = parseFloat(playerToken.style.top) || 0;
        
        // Изменяем внешний вид фишки
        playerToken.classList.add('ascending-token');
        
        // Создаем эффект световой вспышки на фишке
        const flashEffect = document.createElement('div');
        flashEffect.className = 'token-flash-effect';
        document.querySelector('.board-container').appendChild(flashEffect);
        
        // Анимация движения от клетки 54 к клетке 68
        const animationDuration = 3000; // 3 секунды
        const startTime = Date.now();
        
        function animateToken() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);
            
            // Используем функцию плавности для более естественного движения
            const easedProgress = easeInOutCubic(progress);
            
            // Рассчитываем текущую позицию
            const currentX = startX + (cell68X - startX) * easedProgress;
            const currentY = startY + (cell68Y - startY) * easedProgress;
            
            // Обновляем положение фишки
            playerToken.style.left = `${currentX}%`;
            playerToken.style.top = `${currentY}%`;
            
            // Обновляем положение светового эффекта
            flashEffect.style.left = `${currentX}%`;
            flashEffect.style.top = `${currentY}%`;
            
            // Создаем случайные искры на пути
            if (Math.random() < 0.3) {
                createPathSpark(currentX, currentY);
            }
            
            // Продолжаем анимацию, если она не завершена
            if (progress < 1) {
                requestAnimationFrame(animateToken);
            } else {
                // Анимация завершена
                setTimeout(() => {
                    // Удаляем эффект вспышки
                    flashEffect.remove();
                    
                    // Показываем сообщение в матричном комментарии если он доступен
                    if (window.MatrixComments && typeof window.MatrixComments.showMessage === 'function') {
                        window.MatrixComments.showMessage('Вы достигли клетки 68 - План Абсолюта!', 'Система');
                    }
                    
                    // Создаем вспышку на клетке 68
                    if (typeof window.createStrobeFlash === 'function') {
                        window.createStrobeFlash(68);
                    }
                    
                    // Обновляем позицию в игре
                    window.currentPosition = 68;
                    
                    // Отмечаем, что перемещение завершено
                    window.isMovingToCell68 = false;
                    
                    // Создаем индикатор на клетке 68
                    createVisibleCell68Indicator();
                    
                    // Вызываем эффект завершения если доступен
                    if (typeof window.activateOMPreset === 'function') {
                        window.activateOMPreset();
                    }
                    
                    // Создаем событие изменения позиции
                    notifyPositionChange(68);
                    
                    // Добавляем специальные стили для клетки 68
                    addCell68Styles();
                }, 500);
            }
        }
        
        // Запускаем анимацию
        animateToken();
    }
    
    // Функция для создания видимого индикатора на клетке 68
    function createVisibleCell68Indicator() {
        const gameBoard = document.querySelector('.game-board, .board-container');
        if (!gameBoard) return;
        
        // Удаляем существующий индикатор, если он есть
        const existingDot = document.querySelector('.cell68-indicator');
        if (existingDot) {
            existingDot.remove();
        }
        
        // Создаем новый индикатор
        const dot = document.createElement('div');
        dot.className = 'cell68-indicator';
        dot.style.cssText = `
            position: absolute;
            left: 77.7%;
            top: 37.5%;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: rgb(144, 238, 144);
            box-shadow: 0 0 20px rgb(144, 238, 144), 0 0 35px rgb(144, 238, 144), 0 0 50px rgb(144, 238, 144);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            animation: cell68IndicatorPulse 2s infinite alternate;
        `;
        
        // Добавляем стиль анимации, если его еще нет
        if (!document.querySelector('#cell68-indicator-style')) {
            const style = document.createElement('style');
            style.id = 'cell68-indicator-style';
            style.textContent = `
                @keyframes cell68IndicatorPulse {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
                    100% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Добавляем CSS для клетки 68
        addCell68Styles();
        
        // Добавляем индикатор на доску
        gameBoard.appendChild(dot);
    }
    
    // Функция для добавления стилей для клетки 68
    function addCell68Styles() {
        if (document.querySelector('#arrow54to68-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'arrow54to68-styles';
        style.textContent = `
            .cell68-indicator {
                position: absolute;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: rgb(144, 238, 144);
                box-shadow: 0 0 20px rgb(144, 238, 144), 0 0 35px rgb(144, 238, 144), 0 0 50px rgb(144, 238, 144);
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 999;
                opacity: 1;
                transition: none;
                animation: cell68IndicatorPulse 2s infinite alternate;
            }
            
            @keyframes cell68IndicatorPulse {
                0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
                100% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
            }
            
            .water-ripple-wave {
                position: absolute;
                border-radius: 50%;
                border: 2px solid rgba(144, 238, 144, 0.8);
                pointer-events: none;
                z-index: 998;
                transform: translate(-50%, -50%);
                animation: water-wave 2s linear infinite;
            }
            
            @keyframes water-wave {
                0% {
                    width: 10px;
                    height: 10px;
                    opacity: 0.8;
                }
                100% {
                    width: 120px;
                    height: 120px;
                    opacity: 0;
                }
            }
            
            .game-message {
                position: absolute;
                left: 50%;
                bottom: 20%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.7);
                color: #fff;
                padding: 10px 20px;
                border-radius: 5px;
                font-weight: bold;
                z-index: 9999;
                text-align: center;
                animation: messageAppear 0.5s ease-in-out;
            }
            
            @keyframes messageAppear {
                0% { opacity: 0; transform: translate(-50%, 20px); }
                100% { opacity: 1; transform: translate(-50%, 0); }
            }
        `;
        
        document.head.appendChild(style);
        console.log("Добавлены стили для клетки 68");
    }
    
    // Функция для отправки уведомления о смене позиции
    function notifyPositionChange(newPosition) {
        // Создаем и отправляем событие positionChanged
        const event = new CustomEvent('positionChanged', {
            detail: { position: newPosition }
        });
        document.dispatchEvent(event);
        
        // Создаем и отправляем событие gamePositionChanged
        const gameEvent = new CustomEvent('gamePositionChanged', {
            detail: { from: 54, to: newPosition }
        });
        document.dispatchEvent(gameEvent);
    }
    
    // Функция для отображения сообщения
    function showMessage(text) {
        // Проверяем, есть ли элемент сообщения
        let messageElement = document.querySelector('.game-message');
        
        if (!messageElement) {
            // Создаем новый элемент сообщения
            messageElement = document.createElement('div');
            messageElement.className = 'game-message';
            messageElement.style.cssText = `
                position: absolute;
                left: 50%;
                bottom: 20%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.7);
                color: #fff;
                padding: 10px 20px;
                border-radius: 5px;
                font-weight: bold;
                z-index: 9999;
                text-align: center;
            `;
            document.body.appendChild(messageElement);
        }
        
        // Обновляем текст сообщения
        messageElement.textContent = text;
        
        // Удаляем сообщение через 5 секунд
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.parentNode.removeChild(messageElement);
            }
        }, 5000);
    }
    
    // Перехватываем функцию activateArrow, если она существует
    if (window.activateArrow) {
        console.log("Перехватываем функцию activateArrow");
        const originalActivateArrow = window.activateArrow;
        
        window.activateArrow = function(from, to) {
            // Если это стрела 54 -> 68, обрабатываем её особым образом
            if (from === 54 && to === 68) {
                console.log("Активирована стрела 54 -> 68");
                
                // Устанавливаем текущую позицию
                window.currentPosition = 68;
                
                // Обновляем положение фишки
                moveTokenToCell68();
                
                // Показываем сообщение
                showMessage("Вы перемещаетесь по стреле с клетки 54 на клетку 68!");
                
                // Уведомляем о смене позиции
                notifyPositionChange(68);
                
                return true;
            }
            
            // Для других стрел используем оригинальную функцию
            return originalActivateArrow.apply(this, arguments);
        };
    }
    
    // Инициализация при загрузке страницы
    document.addEventListener('DOMContentLoaded', function() {
        console.log("Модуль стрелы 54 -> 68 инициализирован");
        
        // Инициализируем стили
        addCell68Styles();
    });
    
    // Экспортируем функции, которые могут быть полезны другим модулям
    window.arrow54to68 = {
        moveTokenToCell68: moveTokenToCell68,
        createVisibleCell68Indicator: createVisibleCell68Indicator,
        notifyPositionChange: notifyPositionChange,
        showMessage: showMessage
    };

    // Функция для создания искры на пути
    function createPathSpark(x, y) {
        const spark = document.createElement('div');
        spark.className = 'path-spark';
        
        // Случайное смещение от основного пути
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        
        spark.style.cssText = `
            position: absolute;
            left: calc(${x}% + ${offsetX}px);
            top: calc(${y}% + ${offsetY}px);
            width: ${3 + Math.random() * 6}px;
            height: ${3 + Math.random() * 6}px;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            filter: blur(1px) drop-shadow(0 0 2px white);
            z-index: 1000;
            pointer-events: none;
            animation: sparkFade 1s forwards;
        `;
        
        document.querySelector('.board-container').appendChild(spark);
        
        // Удаляем искру после анимации
        setTimeout(() => {
            spark.remove();
        }, 1000);
    }
    
    // Функция плавности для анимации
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
})(); 