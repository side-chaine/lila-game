/**
 * Модуль для обработки завершения игры при попадании на клетку 68
 */
(function() {
    // Объявляем глобальную переменную для отслеживания состояния игры
    window.gameFinished = false;
    
    // Функция для проверки завершения игры
    function checkGameEnd() {
        // Проверяем флаг specialDirectMove для предотвращения рекурсии
        if (window.specialDirectMove) {
            console.log("checkGameEnd: Пропускаем проверку из-за флага specialDirectMove");
            return false;
        }
        
        // Получаем текущую позицию из глобальной переменной
        const currentPosition = window.currentPosition;
        
        // Если мы достигли клетки 68 и игра еще не помечена как завершенная
        if (currentPosition === 68 && !window.gameFinished) {
            console.log("Достигнута клетка 68 - завершение игры!");
            
            // Убедимся, что фишка визуально находится на клетке 68
            ensureTokenVisuallyAt68();
            
            // Отложенная активация для надежности
            setTimeout(function() {
                // Помечаем игру как завершенную
                window.gameFinished = true;
                
                // Показываем сообщение в матричном комментарии если он доступен
                if (window.MatrixComments && typeof window.MatrixComments.showMessage === 'function') {
                    window.MatrixComments.activateGreenMode();
                    window.MatrixComments.showMessage('Игра завершена! Вы достигли Плана Абсолюта - высшей точки духовного пути.', 'Система');
                }
                
                // Отключаем кубик
                disableDice();
                
                // Запускаем специальный эффект для клетки 68
                // Сначала проверяем функцию activateOMPreset (из cell68-effect.js)
                if (typeof window.activateOMPreset === 'function') {
                    console.log("Запускаем пресет ОМ через activateOMPreset");
                    window.activateOMPreset();
                } 
                // Затем проверяем createGoldenEffect68 (из script.js)
                else if (typeof window.createGoldenEffect68 === 'function') {
                    console.log("Запускаем золотой эффект через createGoldenEffect68");
                    window.createGoldenEffect68();
                }
                // Наконец, проверяем createCell68Effect (обратная совместимость)
                else if (typeof window.createCell68Effect === 'function') {
                    console.log("Запускаем эффект клетки 68 через createCell68Effect");
                    window.createCell68Effect();
                }
            }, 500);
            
            return true;
        }
        
        // Если мы на клетке 54 и движемся на клетку 68, ничего не делаем здесь
        // Это будет обрабатывать модуль arrow54to68.js
        if (window.isOnCell54 || window.isMovingToCell68) {
            console.log("Перемещение с клетки 54 на 68 обрабатывается специальным модулем");
            return false;
        }
        
        return false;
    }
    
    // Функция, гарантирующая, что фишка визуально находится на клетке 68
    function ensureTokenVisuallyAt68() {
        console.log("Гарантируем, что фишка визуально находится на клетке 68");
        
        // Показываем сообщение в матричном комментарии если он доступен
        if (window.MatrixComments && typeof window.MatrixComments.showMessage === 'function') {
            window.MatrixComments.showMessage('Перемещение на План Абсолюта...', 'Система');
        }
        
        // Координаты клетки 68
        const coords = getCellCoordinates(68);
        const cell68X = coords.x;
        const cell68Y = coords.y;
        
        // Получаем все возможные элементы, которые могут представлять фишку
        const playerToken = document.querySelector('.player-token');
        const trailDot = document.querySelector('.trail-dot');
        const simpleTrailDot = document.querySelector('.simple-trail-dot');
        const activeMarker = document.querySelector('.active-cell-marker');
        
        // Обновляем позицию всех элементов
        [playerToken, trailDot, simpleTrailDot, activeMarker].forEach(element => {
            if (element) {
                element.style.left = `${cell68X}%`;
                element.style.top = `${cell68Y}%`;
                console.log(`Перемещен элемент ${element.className} на клетку 68`);
            }
        });
        
        // Перемещаем все точки следа
        const allTrailDots = document.querySelectorAll('.trail-dot, .simple-trail-dot, .forced-trail-dot, .cell-trail');
        allTrailDots.forEach(dot => {
            dot.style.left = `${cell68X}%`;
            dot.style.top = `${cell68Y}%`;
        });
        
        // Если существуют специальные функции для перемещения следа, вызываем их
        if (typeof window.moveTrailDot === 'function') {
            window.moveTrailDot(68);
        }
        
        // Если есть функция movePlayerTo, используем ее
        if (typeof window.movePlayerTo === 'function') {
            window.movePlayerTo(68);
        }
        
        // Создаем видимый индикатор на клетке 68, если его нет
        if (!document.querySelector('.cell68-indicator')) {
            createVisibleCell68Indicator();
        }
    }
    
    // Функция для создания видимого индикатора на клетке 68
    function createVisibleCell68Indicator() {
        const gameBoard = document.querySelector('.game-board, .board-container');
        if (!gameBoard) return;
        
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
        
        // Добавляем индикатор на доску
        gameBoard.appendChild(dot);
    }
    
    // Функция для получения координат клетки
    function getCellCoordinates(cellNumber) {
        // Пытаемся получить координаты из глобальной переменной cellPositions
        if (window.cellPositions && window.cellPositions[cellNumber]) {
            return window.cellPositions[cellNumber];
        }
        
        // Определение координат для клетки 68 (План Абсолюта)
        // Примерные координаты, которые могут потребовать настройки
        return { x: 77.7, y: 37.5 };
    }
    
    // Функция для отключения кубика
    function disableDice() {
        const dice = document.getElementById('game-dice');
        if (!dice) return;
        
        // Сохраняем оригинальный обработчик клика
        if (dice.onclick) {
            window.originalDiceHandler = dice.onclick;
        }
        
        // Отключаем обработчик
        dice.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("Игра завершена, кубик неактивен");
            return false;
        };
        
        // Меняем внешний вид на "click"
        dice.innerHTML = '<span class="click-text">click</span>';
        dice.className = 'text-dice click-invite';
    }
    
    // Функция для периодической проверки
    function setupPeriodicCheck() {
        // Проверяем каждую секунду
        setInterval(checkGameEnd, 1000);
        
        // Также слушаем события изменения позиции
        document.addEventListener('positionChanged', function(e) {
            if (e.detail && e.detail.position === 68) {
                console.log("Событие positionChanged: позиция = 68");
                // Добавим задержку для надежности
                setTimeout(checkGameEnd, 200);
            }
        });
        
        document.addEventListener('gamePositionChanged', function(e) {
            if (e.detail && (e.detail.position === 68 || e.detail.to === 68)) {
                console.log("Событие gamePositionChanged: перемещение на позицию 68");
                // Добавим задержку для надежности
                setTimeout(checkGameEnd, 200);
            }
        });
    }
    
    // Инициализация при загрузке страницы
    document.addEventListener('DOMContentLoaded', function() {
        console.log("Инициализация обработчика завершения игры");
        
        // Настраиваем периодическую проверку
        setupPeriodicCheck();
        
        // Также проверяем сразу после загрузки
        setTimeout(checkGameEnd, 2000);
    });
    
    // Перехватываем функцию movement кубика - но только если наш новый модуль не активен
    if (typeof window.movePlayer === 'function') {
        const originalMovePlayer = window.movePlayer;
        
        // Создаем функцию-обертку, которая не будет конфликтовать с arrow54to68.js
        const endGameWrapper = function() {
            // Проверяем специальный флаг для предотвращения рекурсии
            if (window.specialDirectMove) {
                console.log("Особый прямой переход - пропускаем дополнительные проверки");
                return originalMovePlayer.apply(this, arguments);
            }
            
            // Проверяем состояние игры
            const newPosition = arguments[0];
            console.log("End-game-handler обрабатывает позицию:", newPosition);
            
            // Если игра завершена, блокируем движение
            if (window.gameFinished) {
                console.log("Игра завершена, движение заблокировано");
                return false;
            }
            
            // Если мы в процессе перемещения по стреле 54->68, не вмешиваемся
            if (window.isOnCell54 || window.isMovingToCell68) {
                console.log("Обработка перемещения по стреле 54->68, end-game-handler не вмешивается");
                return originalMovePlayer.apply(this, arguments);
            }

            // Особый случай - если это перемещение с клетки 66 на 68
            if (newPosition === 68 && window.currentPosition === 66) {
                console.log("Обнаружен переход с клетки 66 на 68");
                
                // Обновляем положение фишки
                ensureTokenVisuallyAt68();
                
                // Устанавливаем позицию
                window.currentPosition = 68;
                
                // Запускаем завершение игры с задержкой
                setTimeout(function() {
                    checkGameEnd();
                }, 500);
                
                return true;
            }
            
            // Получаем результат выполнения оригинальной функции
            const result = originalMovePlayer.apply(this, arguments);
            
            // Проверяем, не завершилась ли игра после хода
            setTimeout(function() {
                checkGameEnd();
            }, 100);
            
            return result;
        };
        
        // Не заменяем movePlayer напрямую, а добавляем проверку gameFinished к существующему обработчику
        if (!window.endGameHandlerInstalled) {
            window.endGameHandlerInstalled = true;
            
            // Копируем свойства из originalMovePlayer в нашу обертку
            for (const prop in originalMovePlayer) {
                if (originalMovePlayer.hasOwnProperty(prop)) {
                    endGameWrapper[prop] = originalMovePlayer[prop];
                }
            }
            
            // Устанавливаем нашу обертку как общий обработчик для конца игры
            window.endGameMoveWrapper = endGameWrapper;
            
            // Если arrow54to68.js еще не загружен, заменяем movePlayer на нашу версию
            if (!window.arrow54to68) {
                console.log("Устанавливаем обработчик завершения игры");
                window.movePlayer = endGameWrapper;
            } else {
                console.log("Модуль arrow54to68.js уже загружен, не заменяем movePlayer");
            }
        }
    }
})(); 