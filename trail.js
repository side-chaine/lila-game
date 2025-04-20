/**
 * Модуль для работы с визуальным следом фишки
 */
(function() {
    console.log("Инициализация модуля следа фишки");
    
    // Глобальная переменная
    window.trailDot = null;
    
    // Настройки
    const settings = {
        dotCount: 5,            // Количество точек следа
        flashDuration: 300,     // Длительность вспышки одной точки (мс)
        delayBetweenDots: 600,  // Задержка между точками (мс)
        pathInterval: 60000,    // Интервал между анимациями пути (1 минута)
        colorChangeInterval: 60000, // Интервал смены цветов (1 минута)
        startPosition: 6,       // Начальная позиция (клетка 6)
        dotSize: 12,            // Базовый размер точки (пикселей) - увеличен
        brightness: 1.0         // Уровень яркости (0.0 - 1.0) - максимальная яркость
    };
    
    // Состояние
    const state = {
        dots: [],              // Массив элементов точек
        isAnimating: false,    // Флаг анимации
        colorChangeId: null,   // ID интервала смены цветов
        colorScheme: 0         // Текущая цветовая схема (0-4)
    };
    
    // Цветовые схемы (базовые цвета для разных схем)
    const colorSchemes = [
        { // Нежно-зеленая схема (основная)
            color: 'rgba(144, 238, 144, 0.9)'
        },
        { // Яркая фиолетовая схема
            color: 'rgba(140, 0, 255, 0.9)'
        },
        { // Яркая бирюзовая схема
            color: 'rgba(0, 255, 200, 0.9)'
        },
        { // Яркая золотая схема
            color: 'rgba(255, 215, 0, 0.9)'
        },
        { // Яркая розовая схема
            color: 'rgba(255, 50, 150, 0.9)'
        }
    ];
    
    // Создаем точки следа при загрузке страницы
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Инициализация упрощенной системы следа');
        
        try {
            // Находим контейнер игровой доски
            const boardContainer = document.querySelector('.board-container');
            if (!boardContainer) {
                console.error('Не найден контейнер игровой доски');
                return;
            }
            
            // Создаем точки следа
            for (let i = 0; i < settings.dotCount; i++) {
                const dot = document.createElement('div');
                dot.className = 'trail-dot';
                dot.style.width = `${settings.dotSize}px`;
                dot.style.height = `${settings.dotSize}px`;
                dot.style.opacity = '0';
                dot.style.zIndex = '10'; // Уменьшаем z-index, чтобы не перекрывать важные элементы
                
                boardContainer.appendChild(dot);
                state.dots.push(dot);
            }
            
            // Запускаем интервал для смены цветов
            state.colorChangeId = setInterval(changeColorScheme, settings.colorChangeInterval);
            
            console.log('Система следа инициализирована');
        } catch (error) {
            console.error('Ошибка при инициализации системы следа:', error);
        }
    });
    
    // Обновляем функцию для смены цветовой схемы с прямым управлением стилями
    function changeColorScheme() {
        try {
            // Переключаемся на следующую схему
            state.colorScheme = (state.colorScheme + 1) % colorSchemes.length;
            console.log(`Смена цветовой схемы на: ${state.colorScheme + 1}`);
            
            // Получаем текущую схему
            const scheme = colorSchemes[state.colorScheme];
            const color = scheme.color.replace('rgba', 'rgb').replace(/,[^,]+\)/, ')'); // Преобразуем в RGB без прозрачности
            
            // Обновляем цвета точек с принудительным применением
            state.dots.forEach(dot => {
                // Устанавливаем стили напрямую
                dot.style.cssText = `
                    position: absolute !important;
                    width: ${settings.dotSize}px !important;
                    height: ${settings.dotSize}px !important;
                    border-radius: 50% !important;
                    background-color: ${color} !important;
                    box-shadow: 
                        0 0 20px ${color} !important,
                        0 0 35px ${color} !important,
                        0 0 50px ${color} !important;
                    transform: translate(-50%, -50%) !important;
                    pointer-events: none !important;
                    z-index: 999 !important;
                    opacity: 1 !important;
                `;
                
                // Добавляем класс для анимации
                dot.classList.add('animated-dot');
            });
            
            // Обновляем также стиль для simple-trail-dot если он существует
            const simpleDot = document.querySelector('.simple-trail-dot');
            if (simpleDot) {
                simpleDot.style.cssText = `
                    position: absolute !important;
                    width: 20px !important;
                    height: 20px !important;
                    border-radius: 50% !important;
                    background-color: ${color} !important;
                    box-shadow: 
                        0 0 20px ${color} !important,
                        0 0 35px ${color} !important,
                        0 0 50px ${color} !important;
                    transform: translate(-50%, -50%) !important;
                    pointer-events: none !important;
                    z-index: 999 !important;
                    opacity: 1 !important;
                    animation: dotPulseStrong 2s infinite alternate !important;
                `;
            }
        } catch (error) {
            console.error('Ошибка при смене цветовой схемы:', error);
        }
    }
    
    // Экспортируем функцию для ручной смены цветовой схемы
    window.changeTrailColors = function(schemeIndex) {
        try {
            if (schemeIndex !== undefined && schemeIndex >= 0 && schemeIndex < colorSchemes.length) {
                state.colorScheme = schemeIndex;
            } else {
                state.colorScheme = (state.colorScheme + 1) % colorSchemes.length;
            }
            console.log(`Цветовая схема изменена на: ${state.colorScheme + 1}`);
            
            // Обновляем цвета точек
            changeColorScheme();
        } catch (error) {
            console.error('Ошибка при ручной смене цветовой схемы:', error);
        }
    };
    
    // Добавляем функцию для ручного управления настройками
    window.configureTrailEffect = function(options) {
        try {
            Object.assign(settings, options);
            console.log('Настройки эффекта следа обновлены:', settings);
            
            // Если изменилась яркость, применяем ее
            if (options.brightness !== undefined) {
                console.log(`Яркость изменена на: ${options.brightness * 100}%`);
                changeColorScheme(); // Обновляем цвета с новой яркостью
            }
        } catch (error) {
            console.error('Ошибка при обновлении настроек:', error);
        }
    };

    // Обновляем функцию moveTrailDot для гарантированного отображения зеленого следа
    window.moveTrailDot = function(cellNumber) {
        const trailDot = window.trailDot;
        if (!trailDot) {
            console.error('Точка следа не найдена, создаем новую');
            createNewGreenDot(cellNumber);
            return;
        }
        
        // Вычисляем координаты
        const row = 7 - Math.floor((cellNumber - 1) / 9);
        const col = ((7 - row) % 2 === 0) ? 
            (cellNumber - 1) % 9 : 
            8 - ((cellNumber - 1) % 9);
        
        const left = col * 11.1 + 5.55;
        const top = row * 12.5 + 6.25;
        
        // Устанавливаем позицию маркера с принудительным применением стилей
        trailDot.style.cssText = `
            position: absolute !important;
            left: ${left}% !important;
            top: ${top}% !important;
            width: 20px !important;
            height: 20px !important;
            border-radius: 50% !important;
            background-color: rgb(144, 238, 144) !important;
            box-shadow: 
                0 0 20px rgb(144, 238, 144) !important,
                0 0 35px rgb(144, 238, 144) !important,
                0 0 50px rgb(144, 238, 144) !important;
            transform: translate(-50%, -50%) !important;
            pointer-events: none !important;
            z-index: 999 !important;
            opacity: 1 !important;
            transition: none !important;
        `;
        
        // Добавляем класс для дополнительной надежности
        trailDot.classList.add('forced-green-dot');
        
        // Также добавляем клетку в историю следа, если доступно
        if (window.StrobeTrail && window.StrobeTrail.addToTrail) {
            window.StrobeTrail.addToTrail(cellNumber);
        }
        
        console.log(`Маркер следа перемещен в позицию ${cellNumber} (${left}%, ${top}%) с зелеными стилями`);
    };

    // Функция для создания новой зеленой точки
    function createNewGreenDot(cellNumber) {
        const boardContainer = document.querySelector('.board-container');
        if (!boardContainer) {
            console.error('Контейнер игровой доски не найден');
            return;
        }
        
        // Вычисляем координаты
        const row = 7 - Math.floor((cellNumber - 1) / 9);
        const col = ((7 - row) % 2 === 0) ? 
            (cellNumber - 1) % 9 : 
            8 - ((cellNumber - 1) % 9);
        
        const left = col * 11.1 + 5.55;
        const top = row * 12.5 + 6.25;
        
        // Создаем новую точку
        const newDot = document.createElement('div');
        newDot.className = 'forced-trail-dot forced-green-dot';
        newDot.style.cssText = `
            position: absolute !important;
            left: ${left}% !important;
            top: ${top}% !important;
            width: 20px !important;
            height: 20px !important;
            border-radius: 50% !important;
            background-color: rgb(144, 238, 144) !important;
            box-shadow: 
                0 0 20px rgb(144, 238, 144) !important,
                0 0 35px rgb(144, 238, 144) !important,
                0 0 50px rgb(144, 238, 144) !important;
            transform: translate(-50%, -50%) !important;
            pointer-events: none !important;
            z-index: 999 !important;
            opacity: 1 !important;
            animation: dotPulseStrong 2s infinite alternate !important;
        `;
        
        boardContainer.appendChild(newDot);
        window.trailDot = newDot;
        
        console.log(`Создана новая зеленая точка следа в позиции ${cellNumber}`);
    }
    
    // Специальная функция для клетки 68
    window.moveToCell68 = function() {
        console.log("Запущена специальная функция перемещения на клетку 68");
        
        // Координаты клетки 68
        const cell68X = 77.7; // Процент от ширины
        const cell68Y = 37.5; // Процент от высоты
        
        const boardContainer = document.querySelector('.board-container');
        if (!boardContainer) {
            console.error('Контейнер игровой доски не найден');
            return;
        }
        
        // Удаляем существующую cell68-dot если она уже есть
        const existingDot = document.querySelector('.cell68-dot');
        if (existingDot) {
            existingDot.remove();
        }
        
        // Создаем точку клетки 68
        const cell68Dot = document.createElement('div');
        cell68Dot.className = 'cell68-dot';
        cell68Dot.style.left = `${cell68X}%`;
        cell68Dot.style.top = `${cell68Y}%`;
        boardContainer.appendChild(cell68Dot);
        
        // Также обновляем существующие точки следа
        const trailDots = document.querySelectorAll('.trail-dot, .simple-trail-dot, .forced-trail-dot');
        trailDots.forEach(dot => {
            if (dot) {
                dot.style.left = `${cell68X}%`;
                dot.style.top = `${cell68Y}%`;
                console.log('Перемещена точка следа на клетку 68');
            }
        });
        
        // Также перемещаем player-token если он есть
        const playerToken = document.querySelector('.player-token');
        if (playerToken) {
            playerToken.style.left = `${cell68X}%`;
            playerToken.style.top = `${cell68Y}%`;
            console.log('Перемещен player-token на клетку 68');
        }
        
        // Вызываем стандартную функцию moveTrailDot
        if (window.moveTrailDot) {
            window.moveTrailDot(68);
        }
        
        // Обновляем текущую позицию
        window.currentPosition = 68;
        
        // Генерируем событие изменения позиции
        const event = new CustomEvent('positionChanged', {
            detail: { position: 68 }
        });
        document.dispatchEvent(event);
        
        // Добавляем эффект ряби на воде
        createWaterRippleEffect(cell68X, cell68Y);
        
        return true;
    };
    
    // Функция для создания эффекта ряби на воде
    function createWaterRippleEffect(x, y) {
        const boardContainer = document.querySelector('.board-container');
        if (!boardContainer) return;
        
        // Создаем 3 волны с разной задержкой
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const ripple = document.createElement('div');
                ripple.className = 'water-ripple-wave';
                ripple.style.left = `${x}%`;
                ripple.style.top = `${y}%`;
                boardContainer.appendChild(ripple);
                
                // Удаляем волну после завершения анимации
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 2000);
            }, i * 700); // Задержка между волнами
        }
    }
})(); 