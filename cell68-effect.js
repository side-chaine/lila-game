/**
 * Эффект клетки 68 (План Абсолюта) - Божественное откровение
 * Создает плавный переход к золотому свечению с магическими частицами
 */
(function() {
    console.log("Инициализация улучшенного эффекта клетки 68...");
    
    // Настройки эффекта
    const settings = {
        // Параметры плавного перехода
        initialParticleDelay: 50,      // Почти мгновенное появление начальных частиц
        fullEffectDelay: 2000,         // 2 секунды до начала трансформации
        transitionDuration: 3000,      // 3 секунды на переход к полному эффекту
        
        // Магические частицы
        particleCount: 40,             // Увеличено количество частиц
        particleOpacity: 0.8,          // Непрозрачность частиц
        particleSizeRange: [3, 12],    // Диапазон размеров частиц
        
        // Золотое свечение - улучшенные параметры
        maxBrightness: 190,            // Повышенная яркость пресета ОМ
        saturation: 600,               // Насыщенность золотого цвета
        hueRotate: 15,                 // Тон золотого цвета (больше желтого)
        sepia: 100,                    // Сепия для золотистого оттенка
        pulseDuration: 6000            // Длительность цикла пульсации (медленнее)
    };
    
    // Сохраняем ссылки на созданные элементы и таймеры
    let createdElements = [];
    let timers = [];
    
    /**
     * Главная функция активации эффекта
     */
    function activateOMPreset() {
        // Предотвращаем повторную активацию
        if (document.body.classList.contains('om-preset-active')) {
            console.log("Пресет ОМ уже активен, пропускаем повторную активацию");
            return false;
        }
        
        console.log("АКТИВАЦИЯ ПРЕСЕТА ОМ - НАЧАЛО ИНИЦИАЛИЗАЦИИ!");
        
        try {
            // Очищаем предыдущие эффекты
            cleanupEffects();
            
            // Деактивируем Mr. Transparent если активен
            forceDeactivateMrTransparent();
            
            // Отмечаем начало активации
            document.body.classList.add('om-preset-initializing');
            
            // 1. НЕМЕДЛЕННО: Создаем первые магические частицы
            setTimeout(() => {
                createInitialMagicalParticles();
            }, settings.initialParticleDelay);
            
            // 2. Через 2 секунды: Начинаем плавный переход к полному эффекту
            const transitionTimer = setTimeout(() => {
                startTransitionToFullEffect();
                
                // Отмечаем что начался переход
                document.body.classList.add('om-preset-transitioning');
            }, settings.fullEffectDelay);
            timers.push(transitionTimer);
            
            // 3. После завершения перехода: Активируем полный эффект
            const fullEffectTimer = setTimeout(() => {
                activateFullOMEffect();
                
                // Удаляем класс перехода и добавляем класс активного пресета
                document.body.classList.remove('om-preset-transitioning');
                document.body.classList.add('om-preset-active');
                
                // Обновляем текст в блоке описания
                updateDescriptionText();
            }, settings.fullEffectDelay + settings.transitionDuration);
            timers.push(fullEffectTimer);
            
            // Добавляем стили анимации
            addAnimationStyles();
            
            return true;
        } catch (error) {
            console.error("Ошибка при активации пресета ОМ:", error);
            return false;
        }
    }
    
    /**
     * Создает начальные магические частицы сразу после попадания на клетку
     */
    function createInitialMagicalParticles() {
        try {
            console.log("Создаем начальные магические частицы...");
            
            const gameBoard = document.querySelector('.game-board');
            if (!gameBoard) return;
            
            const boardContainer = gameBoard.parentElement;
            if (!boardContainer) return;
            
            // Создаем контейнер для частиц, чтобы легче было управлять
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'om-particles-container';
            particlesContainer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 20;
            `;
            boardContainer.appendChild(particlesContainer);
            createdElements.push(particlesContainer);
            
            // Создаем несколько начальных частиц
            const initialParticleCount = Math.floor(settings.particleCount / 2);
            
            for (let i = 0; i < initialParticleCount; i++) {
                createMagicalParticle(particlesContainer, true);
            }
            
            console.log("Начальные магические частицы созданы");
        } catch (error) {
            console.error("Ошибка при создании начальных частиц:", error);
        }
    }
    
    /**
     * Начинает плавный переход к полному эффекту ОМ
     */
    function startTransitionToFullEffect() {
        try {
            console.log("Начинаем плавный переход к полному эффекту...");
            
            // Находим игровую доску
            const gameBoard = document.querySelector('.game-board');
            if (!gameBoard) return;
            
            // Плавно применяем начальные фильтры
            gameBoard.style.transition = `filter ${settings.transitionDuration}ms ease-in-out`;
            gameBoard.style.filter = `
                sepia(${settings.sepia * 0.7}%) 
                saturate(${settings.saturation * 0.6}%) 
                hue-rotate(${settings.hueRotate * 0.7}deg) 
                brightness(${settings.maxBrightness * 0.7}%)
            `;
            
            console.log("Переход к полному эффекту запущен");
        } catch (error) {
            console.error("Ошибка при запуске перехода к эффекту:", error);
        }
    }
    
    /**
     * Активирует полный эффект ОМ
     */
    function activateFullOMEffect() {
        try {
            console.log("Активация ПОЛНОГО эффекта ОМ...");
            
            // Находим игровую доску
            const gameBoard = document.querySelector('.game-board');
            if (!gameBoard) return;
            
            // Создаем дополнительный контейнер для усиления эффекта золотого свечения
            const glowOverlay = document.createElement('div');
            glowOverlay.className = 'om-glow-overlay';
            glowOverlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 5;
                background: radial-gradient(circle at center, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.1) 30%, transparent 70%);
                animation: goldenPulse 6s infinite alternate;
            `;
            gameBoard.parentElement.appendChild(glowOverlay);
            createdElements.push(glowOverlay);
            
            // Добавляем финальные частицы
            const particlesContainer = document.querySelector('.om-particles-container');
            if (particlesContainer) {
                // Добавляем еще частиц для финального эффекта
                for (let i = 0; i < settings.particleCount; i++) {
                    createMagicalParticle(particlesContainer, false);
                }
            }
            
            // Применяем финальные фильтры к игровой доске с полной силой
            gameBoard.style.animation = 'none'; // Сбрасываем текущую анимацию
            setTimeout(() => {
                // Устанавливаем новую анимацию после небольшой задержки
                gameBoard.style.animation = 'pulseGoldenEffect 6s infinite alternate';
            }, 50);
            
            // Отключаем переходы для мгновенного применения финальных фильтров
            gameBoard.style.transition = 'none';
            gameBoard.style.filter = `
                sepia(${settings.sepia}%) 
                saturate(${settings.saturation}%) 
                hue-rotate(${settings.hueRotate}deg) 
                brightness(${settings.maxBrightness}%)
            `;
            
            // Добавляем пульсирующий эффект
            addPulsingEffect();
            
            console.log("Полный эффект ОМ активирован!");
        } catch (error) {
            console.error("Ошибка при активации полного эффекта:", error);
        }
    }
    
    /**
     * Создает магическую частицу внутри указанного контейнера
     */
    function createMagicalParticle(container, isInitial) {
        // Размер частицы
        const minSize = settings.particleSizeRange[0];
        const maxSize = settings.particleSizeRange[1];
        const size = minSize + Math.random() * (maxSize - minSize);
        
        // Положение частицы
        const x = 10 + Math.random() * 80; // в процентах, от 10% до 90%
        const y = 10 + Math.random() * 80; // в процентах, от 10% до 90%
        
        // Создаем частицу
        const particle = document.createElement('div');
        particle.className = 'magical-particle';
        
        // Базовые стили частицы
        particle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(255, 215, 0, ${settings.particleOpacity});
            border-radius: 50%;
            filter: blur(1px);
            pointer-events: none;
            box-shadow: 0 0 ${size*1.5}px rgba(255, 215, 0, 0.8);
            z-index: 25;
        `;
        
        // Добавляем анимацию
        if (isInitial) {
            // Начальные частицы появляются с эффектом и двигаются медленно
            particle.style.animation = `fadeIn 1s ease-in-out, goldenFloat ${5 + Math.random() * 8}s infinite ease-in-out alternate`;
            particle.style.opacity = '0';
            setTimeout(() => {
                particle.style.opacity = settings.particleOpacity.toString();
            }, 100);
        } else {
            // Финальные частицы пульсируют и мерцают
            particle.style.animation = `goldenGlow ${3 + Math.random() * 4}s infinite alternate`;
        }
        
        container.appendChild(particle);
        createdElements.push(particle);
        
        return particle;
    }
    
    /**
     * Добавляет пульсирующий эффект к финальному состоянию
     */
    function addPulsingEffect() {
        // Создаем глобальный пульсирующий эффект
        document.body.classList.add('om-pulsing');
        
        // Находим блок описания и применяем к нему эффекты
        const descriptionBox = document.querySelector('.cell-description-box');
        if (descriptionBox) {
            descriptionBox.classList.add('om-description');
        }
    }
    
    /**
     * Обновляет текст в блоке описания
     */
    function updateDescriptionText() {
        const descriptionBox = document.querySelector('.cell-description-box');
        if (!descriptionBox) return;
        
        const boxTitle = descriptionBox.querySelector('.box-title');
        const boxText = descriptionBox.querySelector('.box-text');
        
        if (boxTitle) {
            boxTitle.textContent = 'БОЖЕСТВЕННОЕ ОТКРОВЕНИЕ';
            boxTitle.classList.add('golden-text');
        }
        
        if (boxText) {
            boxText.innerHTML = 'Вы достигли Плана Абсолюта (68). Это высшая точка духовного развития, где происходит осознание единства всего сущего и слияние с Божественным.';
            boxText.classList.add('golden-text');
        }
        
        descriptionBox.classList.add('om-description');
    }
    
    /**
     * Принудительно деактивирует режим Mr. Transparent если он активен
     */
    function forceDeactivateMrTransparent() {
        console.log("Деактивируем эффект Mr. Transparent - ФИНАЛЬНАЯ ВЕРСИЯ...");
        
        // Находим игровую доску
        const gameBoard = document.querySelector('.game-board');
        if (!gameBoard) return;
        
        // Сбрасываем эффект прозрачности, но сохраняем фон
        gameBoard.style.opacity = '1';
        
        console.log("Восстановлена яркость игровой доски с сохранением космического фона");
    }
    
    /**
     * Очищает созданные эффекты
     */
    function cleanupEffects() {
        console.log("Очищаем предыдущие эффекты...");
        
        // Останавливаем все таймеры
        timers.forEach(timer => clearTimeout(timer));
        timers = [];
        
        // Удаляем созданные элементы
        createdElements.forEach(element => {
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        createdElements = [];
        
        console.log("Предыдущие эффекты очищены");
    }
    
    /**
     * Добавляет стили анимации в документ
     */
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Анимация для пульсации золотого эффекта */
            @keyframes pulseGoldenEffect {
                0% { 
                    filter: sepia(${settings.sepia}%) 
                           saturate(${settings.saturation * 0.8}%) 
                           hue-rotate(${settings.hueRotate}deg) 
                           brightness(${settings.maxBrightness * 0.85}%);
                }
                50% { 
                    filter: sepia(${settings.sepia}%) 
                           saturate(${settings.saturation}%) 
                           hue-rotate(${settings.hueRotate}deg) 
                           brightness(${settings.maxBrightness}%);
                }
                100% { 
                    filter: sepia(${settings.sepia}%) 
                           saturate(${settings.saturation * 0.8}%) 
                           hue-rotate(${settings.hueRotate}deg) 
                           brightness(${settings.maxBrightness * 0.85}%);
                }
            }
            
            /* Анимация для плавания частиц */
            @keyframes goldenFloat {
                0% { transform: translate(0, 0); }
                25% { transform: translate(-10px, 10px); }
                50% { transform: translate(10px, -5px); }
                75% { transform: translate(-5px, -10px); }
                100% { transform: translate(0, 0); }
            }
            
            /* Анимация для свечения частиц */
            @keyframes goldenGlow {
                0% { opacity: ${settings.particleOpacity * 0.7}; filter: brightness(0.9) blur(1px); }
                100% { opacity: ${settings.particleOpacity * 1.1}; filter: brightness(1.3) blur(2px); }
            }
            
            /* Анимация для появления элементов */
            @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: ${settings.particleOpacity}; }
            }
            
            /* Анимация для пульсации золотого свечения в фоне */
            @keyframes goldenPulse {
                0% { opacity: 0.15; }
                100% { opacity: 0.3; }
            }
            
            /* Золотой текст в описании */
            .golden-text {
                color: #FFD700 !important;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.7) !important;
            }
        `;
        
        document.head.appendChild(style);
        createdElements.push(style);
    }
    
    // Настраиваем наблюдение за перемещением на клетку 68
    function setupCellObserver() {
        try {
            console.log("Настраиваем отслеживание клетки 68");
            
            // Экспортируем функцию активации в глобальное пространство имен
            window.activateOMPreset = activateOMPreset;
            console.log("Функция activateOMPreset доступна глобально:", typeof window.activateOMPreset === 'function');
            
            // Используем MutationObserver для отслеживания изменений
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && 
                        mutation.target.classList.contains('player-token') && 
                        mutation.target.getAttribute('data-current-position') === '68') {
                        console.log("Обнаружено перемещение на клетку 68!");
                        activateOMPreset();
                    }
                });
            });
            
            // Наблюдаем за всем документом для отлова изменений
            observer.observe(document.body, { 
                attributes: true, 
                attributeFilter: ['data-current-position'],
                childList: true, 
                subtree: true 
            });
        } catch (e) {
            console.error("Ошибка при настройке наблюдателя:", e);
        }
    }
    
    // Слушаем событие загрузки DOM
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOM загружен - модуль cell68-effect готов к использованию");
        setupCellObserver();
    });
    
    // Инициализация модуля
    setupCellObserver();
    console.log("Инициализация улучшенного модуля эффекта клетки 68");
})(); 