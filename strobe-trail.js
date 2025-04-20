/**
 * strobe-trail.js
 * Система для создания одноразовых плавных вспышек на следе фишки
 * с тонкими линиями контура
 */

const StrobeTrail = (function() {
    // Настройки эффекта
    const settings = {
        flashDuration: 600,       // Длительность вспышки (мс)
        maxTrailLength: 50,       // Увеличиваем максимальную длину следа с 20 до 50
        initialColor: 'rgba(255, 255, 255, 0.9)',  // Начальный цвет (белый, немного прозрачнее)
        fadeColor: 'rgba(144, 238, 144, 0.5)',     // Цвет затухания (нежно-зеленый, более прозрачный)
        historyFlashDelay: 1000,  // Интервал между вспышками истории (1 секунда)
        historyFlashEnabled: true, // Включить вспышки истории
        fadeInDuration: 200,      // Длительность появления вспышки (мс)
        fadeOutDuration: 400,     // Длительность исчезновения вспышки (мс)
        singleFlash: true,        // Одноразовая вспышка (без мерцания)
        borderWidth: 2,           // Толщина линии контура (пикселей) - уменьшена
        glowIntensity: 0.7        // Интенсивность свечения (0.0 - 1.0) - уменьшена
    };

    // Состояние системы
    const state = {
        trail: [],                // Массив клеток в следе (история перемещений)
        activeFlashes: new Set(), // Активные вспышки
        isActive: true,           // Флаг активности системы
        lastPosition: 0,          // Последняя позиция фишки
        processingMove: false     // Флаг обработки перемещения (для предотвращения двойных вспышек)
    };

    // Инициализация системы
    function init() {
        console.log('Инициализация системы одноразовых вспышек следа');
        
        // Добавляем стили для вспышек
        addStyles();
        
        // Создаем контейнер для вспышек, если его еще нет
        createFlashContainer();
        
        // Начинаем отслеживать перемещения фишки
        trackPlayerMovement();
    }

    // Добавление стилей для вспышек
    function addStyles() {
        // Удаляем старые стили, если они есть
        const oldStyle = document.getElementById('strobe-trail-styles');
        if (oldStyle) {
            oldStyle.remove();
        }
        
        // Вычисляем интенсивность свечения на основе настроек
        const glowBase = Math.round(15 * settings.glowIntensity);
        const glowMid = Math.round(30 * settings.glowIntensity);
        const glowMax = Math.round(45 * settings.glowIntensity);
        
        const style = document.createElement('style');
        style.id = 'strobe-trail-styles';
        style.textContent = `
            .strobe-flash-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1000;
            }
            
            .strobe-cell-flash {
                position: absolute;
                box-sizing: border-box;
                border: ${settings.borderWidth}px solid ${settings.initialColor};
                box-shadow: 
                    0 0 ${glowBase}px ${settings.initialColor},
                    0 0 ${glowMid}px ${settings.initialColor},
                    0 0 ${glowMax}px ${settings.initialColor};
                opacity: 0;
                transition: opacity ${settings.fadeInDuration}ms ease-in-out, 
                            box-shadow ${settings.fadeInDuration}ms ease-in-out,
                            border-color ${settings.fadeInDuration}ms ease-in-out;
                pointer-events: none;
            }
            
            .strobe-cell-flash.active {
                opacity: 1;
            }
            
            .strobe-cell-flash.fade-out {
                opacity: 0;
                border-color: ${settings.fadeColor};
                box-shadow: 
                    0 0 ${Math.round(glowBase * 0.7)}px ${settings.fadeColor},
                    0 0 ${Math.round(glowMid * 0.7)}px ${settings.fadeColor},
                    0 0 ${Math.round(glowMax * 0.7)}px ${settings.fadeColor};
                transition: opacity ${settings.fadeOutDuration}ms ease-in-out, 
                            box-shadow ${settings.fadeOutDuration}ms ease-in-out,
                            border-color ${settings.fadeOutDuration}ms ease-in-out;
            }
            
            .strobe-cell-flash.history {
                border-color: rgba(255, 255, 255, 0.6);
                box-shadow: 
                    0 0 ${Math.round(glowBase * 0.6)}px rgba(255, 255, 255, 0.6),
                    0 0 ${Math.round(glowMid * 0.6)}px rgba(255, 255, 255, 0.4),
                    0 0 ${Math.round(glowMax * 0.6)}px rgba(255, 255, 255, 0.2);
            }
            
            /* Плавный переход между вспышками истории */
            .history-flash-transition {
                position: absolute;
                background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
                pointer-events: none;
                opacity: 0;
                transition: opacity 400ms ease-in-out;
                z-index: 999;
            }
            
            .history-flash-transition.active {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    // Создание контейнера для вспышек
    function createFlashContainer() {
        const boardContainer = document.querySelector('.board-container');
        if (!boardContainer) {
            console.error('Не найден контейнер игровой доски');
            return;
        }
        
        // Проверяем, существует ли уже контейнер
        let container = document.querySelector('.strobe-flash-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'strobe-flash-container';
            boardContainer.appendChild(container);
        }
    }

    // Отслеживание перемещений фишки
    function trackPlayerMovement() {
        // Устанавливаем интервал для проверки позиции фишки
        setInterval(function() {
            if (!state.isActive || state.processingMove) return;
            
            // Получаем текущую позицию из глобальной переменной
            const currentPosition = window.currentPosition;
            
            // Если позиция изменилась и больше 0
            if (currentPosition !== state.lastPosition && currentPosition > 0) {
                // Устанавливаем флаг обработки перемещения
                state.processingMove = true;
                
                console.log(`StrobeTrail: Фишка переместилась с ${state.lastPosition} на ${currentPosition}`);
                
                // Добавляем предыдущую позицию в след (если она была)
                if (state.lastPosition > 0) {
                    // Добавляем в след клетку, которую покидает фишка
                    addToTrail(state.lastPosition);
                    
                    // Вспышка истории хода с небольшой задержкой
                    if (settings.historyFlashEnabled) {
                        // Задержка перед началом вспышек истории
                        setTimeout(() => {
                            flashHistory();
                            // Сбрасываем флаг обработки перемещения после завершения вспышек истории
                            setTimeout(() => {
                                state.processingMove = false;
                            }, state.trail.length * settings.historyFlashDelay + 500);
                        }, 500); // Задержка 500 мс перед началом вспышек истории
                    } else {
                        // Если вспышки истории отключены, сразу сбрасываем флаг
                        setTimeout(() => {
                            state.processingMove = false;
                        }, 500);
                    }
                } else {
                    // Если это первое перемещение, сразу сбрасываем флаг
                    state.processingMove = false;
                }
                
                // Обновляем последнюю позицию
                state.lastPosition = currentPosition;
            }
        }, 100); // Проверяем каждые 100 мс
    }

    // Вспышка всей истории хода
    function flashHistory() {
        // Копируем массив следа, чтобы не изменять оригинал
        const history = [...state.trail];
        
        // Если история пуста, ничего не делаем
        if (history.length === 0) {
            console.log("История следа пуста, нечего подсвечивать");
            return;
        }
        
        console.log(`Запускаем вспышки для ${history.length} клеток в истории`);
        
        // Запускаем вспышки для каждой клетки в истории с задержкой
        history.forEach((cellNumber, index) => {
            setTimeout(() => {
                flashCell(cellNumber, true);
                console.log(`Вспышка истории для клетки ${cellNumber} (${index + 1}/${history.length})`);
                
                // Создаем эффект перехода между клетками, если есть следующая клетка
                if (index < history.length - 1) {
                    createTransitionEffect(cellNumber, history[index + 1]);
                }
            }, index * settings.historyFlashDelay);
        });
        
        // Сбрасываем флаг обработки перемещения после завершения всех вспышек
        setTimeout(() => {
            state.processingMove = false;
            console.log("Завершены все вспышки истории");
        }, history.length * settings.historyFlashDelay + 500);
    }

    // Создание эффекта перехода между клетками
    function createTransitionEffect(fromCell, toCell) {
        // Получаем координаты клеток
        const fromCoords = getCellCoordinates(fromCell);
        const toCoords = getCellCoordinates(toCell);
        
        if (!fromCoords || !toCoords) return;
        
        // Создаем элемент перехода
        const container = document.querySelector('.strobe-flash-container');
        if (!container) return;
        
        const transition = document.createElement('div');
        transition.className = 'history-flash-transition';
        
        // Устанавливаем размер и позицию
        transition.style.width = '5%';
        transition.style.height = '5%';
        transition.style.left = `${fromCoords.left}%`;
        transition.style.top = `${fromCoords.top}%`;
        
        // Добавляем в контейнер
        container.appendChild(transition);
        
        // Запускаем анимацию перехода
        setTimeout(() => {
            transition.classList.add('active');
            
            // Анимируем перемещение от одной клетки к другой
            const duration = settings.historyFlashDelay * 0.8; // 80% от интервала между вспышками
            const steps = 20; // Количество шагов анимации
            const stepDuration = duration / steps;
            
            let step = 0;
            const interval = setInterval(() => {
                step++;
                
                if (step >= steps) {
                    clearInterval(interval);
                    
                    // Удаляем элемент перехода
                    setTimeout(() => {
                        transition.classList.remove('active');
                        setTimeout(() => {
                            transition.remove();
                        }, 400);
                    }, 100);
                    return;
                }
                
                // Вычисляем промежуточную позицию
                const progress = step / steps;
                const left = fromCoords.left + (toCoords.left - fromCoords.left) * progress;
                const top = fromCoords.top + (toCoords.top - fromCoords.top) * progress;
                
                // Обновляем позицию
                transition.style.left = `${left}%`;
                transition.style.top = `${top}%`;
            }, stepDuration);
        }, 10);
    }

    // Получение координат клетки
    function getCellCoordinates(cellNumber) {
        // Вычисляем координаты
        const row = 7 - Math.floor((cellNumber - 1) / 9);
        const col = ((7 - row) % 2 === 0) ? 
            (cellNumber - 1) % 9 : 
            8 - ((cellNumber - 1) % 9);
        
        const left = col * 11.1 + 5.55;
        const top = row * 12.5 + 6.25;
        
        return { left, top };
    }

    // Создание элемента вспышки
    function createFlashElement(cellNumber, isHistory = false) {
        const container = document.querySelector('.strobe-flash-container');
        if (!container) return null;
        
        // Получаем координаты клетки
        const coords = getCellCoordinates(cellNumber);
        if (!coords) return null;
        
        // Создаем элемент вспышки
        const flash = document.createElement('div');
        flash.className = `strobe-cell-flash ${isHistory ? 'history' : ''}`;
        
        // Устанавливаем размер и позицию
        flash.style.width = '11.1%';
        flash.style.height = '12.5%';
        flash.style.left = `${coords.left - 5.55}%`;
        flash.style.top = `${coords.top - 6.25}%`;
        
        // Добавляем в контейнер
        container.appendChild(flash);
        return flash;
    }

    // Запуск одиночной вспышки для клетки с плавным появлением и исчезновением
    function flashCell(cellNumber, isHistory = false) {
        if (!state.isActive) return;
        
        // Создаем уникальный идентификатор для вспышки
        const flashId = `${cellNumber}-${isHistory ? 'history' : 'current'}-${Date.now()}`;
        
        // Создаем элемент вспышки
        const flashElement = createFlashElement(cellNumber, isHistory);
        if (!flashElement) return;
        
        // Добавляем в список активных вспышек
        state.activeFlashes.add(flashId);
        
        // Запускаем плавное появление вспышки
        setTimeout(() => {
            flashElement.classList.add('active');
            
            // Запускаем плавное исчезновение вспышки через заданное время
            setTimeout(() => {
                flashElement.classList.add('fade-out');
                flashElement.classList.remove('active');
                
                // Удаляем элемент после завершения анимации исчезновения
                setTimeout(() => {
                    flashElement.remove();
                    state.activeFlashes.delete(flashId);
                }, settings.fadeOutDuration + 50);
            }, settings.flashDuration);
        }, 10); // Небольшая задержка для корректной работы CSS-переходов
    }

    // Добавление клетки в след
    function addToTrail(cellNumber) {
        if (!state.isActive) return;
        
        // Проверяем, есть ли уже эта клетка в следе
        const index = state.trail.indexOf(cellNumber);
        if (index !== -1) {
            // Если клетка уже в следе, удаляем ее с текущей позиции
            state.trail.splice(index, 1);
        }
        
        // Добавляем клетку в начало следа
        state.trail.unshift(cellNumber);
        
        // Ограничиваем длину следа
        if (state.trail.length > settings.maxTrailLength) {
            state.trail = state.trail.slice(0, settings.maxTrailLength);
        }
        
        console.log(`След обновлен, текущая длина: ${state.trail.length}, максимальная: ${settings.maxTrailLength}`);
        
        // Запускаем вспышку для этой клетки
        flashCell(cellNumber);
    }

    // Очистка всех вспышек
    function clearAllFlashes() {
        const flashes = document.querySelectorAll('.strobe-cell-flash');
        flashes.forEach(flash => {
            flash.classList.add('fade-out');
            flash.classList.remove('active');
            
            // Удаляем элемент после завершения анимации исчезновения
            setTimeout(() => {
                flash.remove();
            }, settings.fadeOutDuration + 50);
        });
        
        // Также удаляем все переходы
        const transitions = document.querySelectorAll('.history-flash-transition');
        transitions.forEach(transition => transition.remove());
        
        state.activeFlashes.clear();
    }

    // Сброс следа
    function resetTrail() {
        state.trail = [];
        clearAllFlashes();
    }

    // Включение/выключение системы
    function setActive(active) {
        state.isActive = active;
        
        if (!active) {
            clearAllFlashes();
        }
    }

    // Изменение настроек
    function updateSettings(newSettings) {
        Object.assign(settings, newSettings);
        
        // Обновляем стили, если изменились параметры анимации
        addStyles();
    }

    // Ручная вспышка истории
    function manualFlashHistory() {
        if (settings.historyFlashEnabled) {
            flashHistory();
        }
    }

    // Публичный API
    return {
        init,
        addToTrail,
        clearAllFlashes,
        resetTrail,
        setActive,
        updateSettings,
        flashHistory: manualFlashHistory,
        getTrail: () => [...state.trail],
        isActive: () => state.isActive
    };
})();

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    StrobeTrail.init();
    
    // Настраиваем параметры для одноразовых плавных вспышек с тонкими линиями
    window.configureStrobeTrail({
        flashDuration: 600,       // Длительность вспышки
        historyFlashDelay: 1000,  // Интервал между вспышками истории (1 секунда)
        fadeInDuration: 200,      // Длительность появления вспышки
        fadeOutDuration: 400,     // Длительность исчезновения вспышки
        initialColor: 'rgba(255, 255, 255, 0.9)',  // Начальный цвет (белый, немного прозрачнее)
        fadeColor: 'rgba(144, 238, 144, 0.5)',     // Цвет затухания (нежно-зеленый, более прозрачный)
        singleFlash: true,        // Одноразовая вспышка (без мерцания)
        borderWidth: 2,           // Толщина линии контура (пикселей) - уменьшена
        glowIntensity: 0.7,       // Интенсивность свечения (0.0 - 1.0) - уменьшена
        maxTrailLength: 50        // Увеличиваем максимальную длину следа
    });
    
    // Добавляем горячие клавиши для тестирования
    document.addEventListener('keydown', function(e) {
        // Клавиша 'f' - вспышка случайной клетки
        if (e.key === 'f') {
            const randomCell = Math.floor(Math.random() * 72) + 1;
            StrobeTrail.addToTrail(randomCell);
            console.log(`Вспышка для клетки ${randomCell}`);
        }
        
        // Клавиша 'h' - вспышка истории
        if (e.key === 'h') {
            StrobeTrail.flashHistory();
            console.log('Вспышка истории хода');
        }
        
        // Клавиша 'c' - очистка всех вспышек
        if (e.key === 'c') {
            StrobeTrail.clearAllFlashes();
            console.log('Все вспышки очищены');
        }
        
        // Клавиша 'r' - сброс следа
        if (e.key === 'r') {
            StrobeTrail.resetTrail();
            console.log('След сброшен');
        }
        
        // Клавиша 't' - включение/выключение системы
        if (e.key === 't') {
            const isActive = StrobeTrail.isActive();
            StrobeTrail.setActive(!isActive);
            console.log(`Система ${!isActive ? 'включена' : 'выключена'}`);
        }
    });
});

// Экспортируем функцию для ручного создания вспышки
window.createStrobeFlash = function(cellNumber) {
    StrobeTrail.addToTrail(cellNumber);
};

// Экспортируем функцию для вспышки истории
window.flashStrobeHistory = function() {
    StrobeTrail.flashHistory();
};

// Экспортируем функцию для очистки всех вспышек
window.clearStrobeFlashes = function() {
    StrobeTrail.clearAllFlashes();
};

// Экспортируем функцию для изменения настроек
window.configureStrobeTrail = function(settings) {
    StrobeTrail.updateSettings(settings);
}; 