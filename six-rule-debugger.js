/**
 * Отладчик правила шестерок (ФИНАЛЬНАЯ ВЕРСИЯ)
 * Этот файл помогает диагностировать проблемы с правилом шестерок
 */
(function() {
    console.log("[SIX-RULE-DEBUG] Инициализация отладчика правила шестерок (ФИНАЛЬНАЯ ВЕРСИЯ)");
    
    // Функция для добавления панели отладки
    function addDebugPanel() {
        console.log("[SIX-RULE-DEBUG] Добавление панели отладки");
        
        // Создаем панель отладки
        const debugPanel = document.createElement('div');
        debugPanel.className = 'six-rule-debug-panel';
        debugPanel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 12px;
            z-index: 9999;
            max-width: 300px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        `;
        
        // Заголовок
        debugPanel.innerHTML = '<h3 style="margin: 0 0 5px 0; color: #4CAF50;">Отладка правила шестерок</h3>';
        
        // Блок для информации о состоянии
        const stateInfo = document.createElement('div');
        stateInfo.id = 'six-rule-state';
        stateInfo.style.cssText = `
            margin-bottom: 10px;
            border-bottom: 1px solid #444;
            padding-bottom: 5px;
        `;
        
        // Кнопки отладки
        const buttonsContainer = document.createElement('div');
        buttonsContainer.style.display = 'flex';
        buttonsContainer.style.flexDirection = 'column';
        buttonsContainer.style.gap = '5px';
        
        // Кнопка для ручной активации правила шестерок
        const activateButton = document.createElement('button');
        activateButton.innerText = 'Переустановить правило шестерок';
        activateButton.style.cssText = `
            padding: 5px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        `;
        activateButton.addEventListener('click', function() {
            if (window.sixRuleModule && typeof window.sixRuleModule.reinstall === 'function') {
                window.sixRuleModule.reinstall();
                updateDebugInfo("Правило шестерок переустановлено вручную");
            } else {
                updateDebugInfo("Модуль правила шестерок не найден!");
            }
        });
        
        // Кнопка для симуляции броска шестерки
        const simulateSixButton = document.createElement('button');
        simulateSixButton.innerText = 'Симулировать бросок 6';
        simulateSixButton.style.cssText = `
            padding: 5px;
            background-color: #2196F3;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        `;
        simulateSixButton.addEventListener('click', function() {
            // Пробуем найти оригинальный rollDice
            if (typeof window.rollDice === 'function') {
                // Сохраняем оригинальную функцию
                const originalRollDice = window.rollDice;
                
                // Временно подменяем rollDice для фиксированного возврата 6
                window.rollDice = function() {
                    console.log("[SIX-RULE-DEBUG] Симуляция броска 6");
                    
                    // Отключаем кубик во время анимации
                    const dice = document.getElementById('game-dice');
                    if (dice) {
                        dice.style.pointerEvents = 'none';
                    }
                    
                    // Фиксированное значение кубика - 6
                    const diceValue = 6;
                    
                    // Показываем результат после короткой задержки
                    setTimeout(() => {
                        console.log(`[SIX-RULE-DEBUG] Симуляция: выпало число 6`);
                        
                        // Обновляем отображение кубика
                        if (dice) {
                            dice.innerHTML = `<span>6</span>`;
                            dice.style.pointerEvents = 'auto';
                        }
                        
                        // Отправляем событие о броске кубика
                        document.dispatchEvent(new CustomEvent('diceRoll', {
                            detail: {
                                result: 6,
                                isFirstRoll: false,
                                isSimulated: true
                            }
                        }));
                        
                        // Получаем текущую функцию processGameLogic
                        if (typeof window.processGameLogic === 'function') {
                            // Вызываем текущую функцию processGameLogic
                            window.processGameLogic(6);
                        }
                        
                        // Восстанавливаем оригинальную функцию
                        window.rollDice = originalRollDice;
                        
                    }, 500); // Задержка для анимации кубика
                };
                
                // Вызываем модифицированную функцию
                window.rollDice();
                updateDebugInfo("Симулирован бросок 6");
            } else {
                updateDebugInfo("Не удалось найти функцию rollDice");
            }
        });
        
        // Кнопка для проверки состояния
        const checkStateButton = document.createElement('button');
        checkStateButton.innerText = 'Проверить состояние';
        checkStateButton.style.cssText = `
            padding: 5px;
            background-color: #FF9800;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        `;
        checkStateButton.addEventListener('click', function() {
            updateDebugInfo("Проверка состояния выполнена");
        });
        
        // Кнопка для отображения или скрытия панели отладки
        const toggleDebugPanelButton = document.createElement('button');
        toggleDebugPanelButton.innerText = 'Скрыть панель отладки';
        toggleDebugPanelButton.style.cssText = `
            padding: 5px;
            background-color: #9C27B0;
            color: white;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            margin-top: 10px;
        `;
        toggleDebugPanelButton.addEventListener('click', function() {
            const contentArea = document.querySelector('.six-rule-debug-content');
            if (contentArea.style.display === 'none') {
                contentArea.style.display = 'block';
                toggleDebugPanelButton.innerText = 'Скрыть панель отладки';
            } else {
                contentArea.style.display = 'none';
                toggleDebugPanelButton.innerText = 'Показать панель отладки';
            }
        });
        
        // Создаем контейнер для содержимого, которое можно скрыть
        const contentArea = document.createElement('div');
        contentArea.className = 'six-rule-debug-content';
        
        // Добавляем элементы в панель
        contentArea.appendChild(stateInfo);
        contentArea.appendChild(buttonsContainer);
        
        // Добавляем контейнер и кнопку переключения в панель
        debugPanel.appendChild(contentArea);
        debugPanel.appendChild(toggleDebugPanelButton);
        
        // Добавляем кнопки в контейнер кнопок
        buttonsContainer.appendChild(activateButton);
        buttonsContainer.appendChild(simulateSixButton);
        buttonsContainer.appendChild(checkStateButton);
        
        // Добавляем панель на страницу
        document.body.appendChild(debugPanel);
        
        // Обновляем отладочную информацию
        updateDebugInfo("Панель отладки инициализирована");
    }
    
    // Функция для обновления отладочной информации
    function updateDebugInfo(message) {
        const stateInfo = document.getElementById('six-rule-state');
        if (!stateInfo) return;
        
        // Проверяем наличие модуля правила шестерок
        let moduleExists = !!window.sixRuleModule;
        let moduleState = moduleExists && typeof window.sixRuleModule.getState === 'function' 
            ? window.sixRuleModule.getState() 
            : null;
        
        // Формируем HTML для отображения состояния
        let html = `<p style="margin: 2px 0;"><b>Статус:</b> ${message}</p>`;
        html += `<p style="margin: 2px 0;"><b>Модуль:</b> ${moduleExists ? 'Найден' : 'НЕ НАЙДЕН'}</p>`;
        
        // Информация о текущей позиции игрока
        html += `<p style="margin: 2px 0;"><b>Текущая позиция:</b> ${window.currentPosition || 'Н/Д'}</p>`;
        html += `<p style="margin: 2px 0;"><b>Игра началась:</b> ${moduleState?.isGameStarted ? 'Да' : 'Нет'}</p>`;
        
        if (moduleState) {
            html += `<p style="margin: 2px 0;"><b>Последовательных шестерок:</b> ${moduleState.consecutiveSixes}</p>`;
            html += `<p style="margin: 2px 0;"><b>Накопленных очков:</b> ${moduleState.accumulatedSixes}</p>`;
            html += `<p style="margin: 2px 0;"><b>Последний бросок:</b> ${moduleState.lastRoll}</p>`;
            html += `<p style="margin: 2px 0;"><b>Исходная позиция:</b> ${moduleState.positionBeforeSixes}</p>`;
        }
        
        // Проверяем перехват функций
        const rollDiceMatch = window.rollDice.toString().includes('[SIX-RULE]');
        const processGameLogicMatch = window.processGameLogic.toString().includes('[SIX-RULE]'); 
        
        html += `<p style="margin: 2px 0;"><b>rollDice перехвачен:</b> <span style="color:${rollDiceMatch ? '#4CAF50' : '#FF5722'}">${rollDiceMatch ? 'Да' : 'Нет'}</span></p>`;
        html += `<p style="margin: 2px 0;"><b>processGameLogic перехвачен:</b> <span style="color:${processGameLogicMatch ? '#4CAF50' : '#FF5722'}">${processGameLogicMatch ? 'Да' : 'Нет'}</span></p>`;
        
        stateInfo.innerHTML = html;
    }
    
    // Отслеживаем события броска кубика
    document.addEventListener('diceRoll', function(e) {
        console.log("[SIX-RULE-DEBUG] Перехвачено событие diceRoll:", e.detail);
        updateDebugInfo(`Выпало: ${e.detail.result}, Шестерок подряд: ${e.detail.consecutiveSixes || 0}`);
    });
    
    // Инициализация отладчика при загрузке страницы
    document.addEventListener('DOMContentLoaded', function() {
        console.log("[SIX-RULE-DEBUG] DOM загружен для отладчика правила шестерок");
        
        // Добавляем панель отладки с небольшой задержкой
        setTimeout(addDebugPanel, 2500);
        
        // Периодически обновляем информацию
        setInterval(function() {
            updateDebugInfo("Автоматическое обновление");
        }, 3000);
    });
})(); 