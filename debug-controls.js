/**
 * Модуль для отладочных кнопок и функций
 */
(function() {
    // Запустим инициализацию кнопок только когда DOM будет полностью загружен
    document.addEventListener('DOMContentLoaded', function() {
        console.log("Инициализация дебаг-панели...");
        
        // Добавляем обработчик клика на существующую кнопку, либо создаем её
        const setupTestCell68Button = () => {
            const testCell68Btn = document.getElementById('test-cell68-btn');
            if (!testCell68Btn) return false;
            
            testCell68Btn.addEventListener('click', function() {
                console.log("Запущен тест эффекта клетки 68");
                
                // Сохраняем старую позицию
                const oldPosition = window.currentPosition || 1;
                testCell68Btn.dataset.oldPosition = oldPosition;
                
                // Показываем сообщение
                showMessage('ТЕСТИРОВАНИЕ КЛЕТКИ 68<br>Запуск эффекта Божественного откровения');
                
                // Устанавливаем новую позицию
                window.currentPosition = 68;
                
                // Обновляем визуальное положение фишки
                movePlayerTokenToCell68();
                
                // Активируем эффект ОМ с гарантированной задержкой, чтобы все скрипты успели отработать
                setTimeout(() => {
                    activateAllEffects();
                    
                    // Еще раз активируем с задержкой для надежности
                    setTimeout(activateAllEffects, 500);
                }, 100);
            });
            
            return true;
        };
        
        // Добавляем обработчик для кнопки сброса
        const setupResetButton = () => {
            const resetPosBtn = document.getElementById('reset-pos-btn');
            if (!resetPosBtn) return false;
            
            resetPosBtn.addEventListener('click', function() {
                const oldPosition = parseInt(document.getElementById('test-cell68-btn')?.dataset.oldPosition || 1);
                console.log("Возвращаем фишку на прежнюю позицию:", oldPosition);
                
                // Показываем сообщение
                showMessage('Возврат к исходной позиции');
                
                // Возвращаем старую позицию
                window.currentPosition = oldPosition;
                
                // Перемещаем фишку
                if (typeof window.movePlayer === 'function') {
                    window.movePlayer(oldPosition);
                }
                
                // Очищаем эффекты
                cleanupAllEffects();
            });
            
            return true;
        };
        
        // Вспомогательная функция для отображения сообщения
        function showMessage(html) {
            // Удаляем старое сообщение если есть
            const oldMessage = document.querySelector('.debug-message');
            if (oldMessage) oldMessage.remove();
            
            // Создаем новое сообщение
            const messageEl = document.createElement('div');
            messageEl.className = 'debug-message';
            messageEl.style.position = 'fixed';
            messageEl.style.top = '50%';
            messageEl.style.left = '50%';
            messageEl.style.transform = 'translate(-50%, -50%)';
            messageEl.style.background = 'rgba(0, 0, 0, 0.8)';
            messageEl.style.color = '#FFD700';
            messageEl.style.padding = '20px';
            messageEl.style.borderRadius = '10px';
            messageEl.style.zIndex = '10000';
            messageEl.style.fontWeight = 'bold';
            messageEl.style.textAlign = 'center';
            messageEl.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
            messageEl.innerHTML = html;
            document.body.appendChild(messageEl);
            
            // Удаляем сообщение через 3 секунды
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 3000);
        }
        
        // Вспомогательная функция для перемещения фишки на клетку 68
        function movePlayerTokenToCell68() {
            // Пробуем через стандартную функцию
            if (typeof window.movePlayer === 'function') {
                window.movePlayer(68);
            }
            
            // Для надежности также пробуем прямое перемещение фишки
            const playerToken = document.querySelector('.player-token, .game-token, .player-piece');
            if (playerToken) {
                playerToken.style.left = '77.7%';
                playerToken.style.top = '37.5%';
                playerToken.style.transform = 'translate(-50%, -50%)';
                
                // Добавляем золотое свечение к фишке
                playerToken.style.filter = 'drop-shadow(0 0 10px gold)';
                playerToken.style.zIndex = '9999';
            }
            
            // Обновляем информацию о текущей клетке в интерфейсе
            const cellInfoElements = document.querySelectorAll('.current-cell-number, .position-display, .cell-info');
            cellInfoElements.forEach(element => {
                if (element) element.textContent = '68';
            });
        }
        
        // Вспомогательная функция для активации всех эффектов
        function activateAllEffects() {
            console.log("Активируем все эффекты для клетки 68");
            
            // Форсируем установку глобальной переменной для неперехваченных проверок
            window.currentPosition = 68;
            
            // Вызываем все возможные функции активации
            if (typeof window.activateOMPreset === 'function') {
                console.log("Вызываем activateOMPreset");
                window.activateOMPreset();
            }
            
            if (typeof window.createGoldenEffect68 === 'function') {
                console.log("Вызываем createGoldenEffect68");
                window.createGoldenEffect68();
            }
            
            // Проверяем функцию из end-game-handler.js
            if (typeof window.checkGameEnd === 'function') {
                console.log("Вызываем checkGameEnd");
                window.checkGameEnd();
            }
            
            // Добавляем золотое свечение к игровой доске если оно не добавлено
            const gameBoard = document.querySelector('.game-board, .board-container img');
            if (gameBoard && !gameBoard.classList.contains('golden-glow')) {
                gameBoard.classList.add('golden-glow');
            }
            
            // Устанавливаем флаг завершения
            window.gameFinished = true;
            
            // Применяем золотой класс для body
            document.body.classList.add('om-preset-active');
            
            // Запускаем эффект водных кругов вручную
            createManualWaterRipple();
        }
        
        // Вспомогательная функция создания водных кругов (если основные функции не сработали)
        function createManualWaterRipple() {
            const boardContainer = document.querySelector('.board-container, .game-container');
            if (!boardContainer) return;
            
            // Создаем 8 волн с задержкой
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    // Создаем элемент волны
                    const wave = document.createElement('div');
                    wave.className = 'water-ripple-wave';
                    wave.style.left = '77.7%';
                    wave.style.top = '37.5%';
                    
                    boardContainer.appendChild(wave);
                    
                    // Удаляем волну после анимации
                    setTimeout(() => {
                        if (wave.parentNode) {
                            wave.parentNode.removeChild(wave);
                        }
                    }, 2000);
                }, i * 200);
            }
            
            // Создаем золотые частицы
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.className = 'golden-particle';
                    
                    // Случайное направление
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 100 + Math.random() * 200;
                    const tx = Math.cos(angle) * distance;
                    const ty = Math.sin(angle) * distance;
                    
                    particle.style.setProperty('--tx', tx + 'px');
                    particle.style.setProperty('--ty', ty + 'px');
                    
                    particle.style.left = '77.7%';
                    particle.style.top = '37.5%';
                    
                    boardContainer.appendChild(particle);
                    
                    // Удаляем частицу после анимации
                    setTimeout(() => {
                        if (particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                    }, 2000);
                }, Math.random() * 2000);
            }
        }
        
        // Вспомогательная функция очистки всех эффектов
        function cleanupAllEffects() {
            console.log("Очищаем все эффекты");
            
            // Сбрасываем флаг завершения
            window.gameFinished = false;
            
            // Удаляем классы с body
            document.body.classList.remove('om-preset-active');
            
            // Удаляем золотое свечение с игровой доски
            const gameBoard = document.querySelector('.game-board, .board-container img');
            if (gameBoard) {
                gameBoard.classList.remove('golden-glow');
                gameBoard.style.filter = '';
            }
            
            // Удаляем все водные круги
            const ripples = document.querySelectorAll('.water-ripple-wave');
            ripples.forEach(ripple => ripple.remove());
            
            // Удаляем все золотые частицы
            const particles = document.querySelectorAll('.golden-particle');
            particles.forEach(particle => particle.remove());
            
            // Удаляем центральное свечение
            const centerGlow = document.querySelector('.cell68-center-glow');
            if (centerGlow) centerGlow.remove();
            
            // Сбрасываем стиль фишки
            const playerToken = document.querySelector('.player-token, .game-token, .player-piece');
            if (playerToken) {
                playerToken.style.filter = '';
            }
            
            // Вызываем функцию очистки если она есть
            if (typeof window.cleanupOMEffects === 'function') {
                window.cleanupOMEffects();
            }
        }
        
        // Проверяем инициализацию каждые 100 мс, чтобы убедиться, что кнопки настроены
        const initInterval = setInterval(() => {
            const button1Ready = setupTestCell68Button();
            const button2Ready = setupResetButton();
            
            // Если обе кнопки готовы, останавливаем интервал
            if (button1Ready && button2Ready) {
                console.log("Дебаг-панель успешно инициализирована");
                clearInterval(initInterval);
            }
        }, 100);
    });
})();

// Глобальная функция для активации режима разработчика
window.activateDevMode = function() {
    document.body.classList.add('dev-mode');
    
    const debugPanel = document.getElementById('debug-controls');
    if (debugPanel) {
        debugPanel.style.display = 'block';
    }
    
    console.log("Режим разработчика активирован. Дебаг-панель видима.");
    return "Режим разработчика активирован. Используйте кнопки тестирования или window.deactivateDevMode() для выключения.";
};

// Глобальная функция для деактивации режима разработчика
window.deactivateDevMode = function() {
    document.body.classList.remove('dev-mode');
    
    const debugPanel = document.getElementById('debug-controls');
    if (debugPanel) {
        debugPanel.style.display = 'none';
    }
    
    console.log("Режим разработчика деактивирован.");
    return "Режим разработчика деактивирован. Используйте window.activateDevMode() для включения.";
};

// Добавляем подсказку в консоль
console.log("Для активации режима разработчика введите в консоли: activateDevMode()"); 