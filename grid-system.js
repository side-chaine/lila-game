// Единая система управления сеткой и визуальными эффектами
const GridSystem = (function() {
    // Приватные переменные
    const state = {
        activeCell: null,
        visitedCells: new Set(),
        pathCells: new Set(),
        colorScheme: 0,
        animationMode: 'cell' // 'vertical', 'horizontal', 'cell'
    };
    
    // Цветовые схемы для фона
    const colorSchemes = [
        { name: 'gentle-green', color: '144, 238, 144', glow: '0.5' },  // Нежно-зеленый
        { name: 'lavender', color: '230, 230, 250', glow: '0.5' },      // Лавандовый
        { name: 'sky-blue', color: '135, 206, 235', glow: '0.5' },      // Небесно-голубой
        { name: 'soft-pink', color: '255, 182, 193', glow: '0.5' },     // Нежно-розовый
        { name: 'soft-gold', color: '250, 214, 165', glow: '0.5' },     // Нежно-золотой
        { name: 'teal', color: '0, 128, 128', glow: '0.5' },            // Бирюзовый
        { name: 'soft-purple', color: '216, 191, 216', glow: '0.5' }    // Нежно-фиолетовый
    ];
    
    // Акцентные цвета для выделения
    const accentColors = [
        { name: 'bright-green', color: '0, 255, 0', glow: '0.8' },      // Яркий зеленый
        { name: 'bright-blue', color: '0, 191, 255', glow: '0.8' },     // Яркий голубой
        { name: 'bright-purple', color: '138, 43, 226', glow: '0.8' },  // Яркий фиолетовый
        { name: 'bright-gold', color: '255, 215, 0', glow: '0.8' },     // Яркий золотой
        { name: 'bright-red', color: '255, 69, 0', glow: '0.8' }        // Яркий красный
    ];
    
    // Настройки анимации
    const animationPresets = {
        'gentle': { duration: 6, intensity: 0.7, opacity: 0.6 },
        'medium': { duration: 4, intensity: 1.0, opacity: 0.8 },
        'dynamic': { duration: 2, intensity: 1.3, opacity: 1.0 }
    };
    
    // Инициализация системы
    function init() {
        console.log('Инициализация единой системы сетки');
        
        // Устанавливаем начальную цветовую схему и анимацию
        applyColorScheme(2); // 2 = sky-blue (небесно-голубой)
        applyAnimationPreset('medium'); // средняя скорость и интенсивность
        setAnimationMode('horizontal'); // горизонтальные линии
        
        // Создаем линии сетки, если их еще нет
        createGridLines();
        
        // Запускаем плавное переливание цветов (отключаем автоматическое переливание)
        // startColorTransition();
    }
    
    // Создание линий сетки
    function createGridLines() {
        const gridContainer = document.querySelector('.grid-container');
        if (!gridContainer) {
            console.error('Контейнер сетки не найден');
            return;
        }
        
        // Очищаем существующие линии
        gridContainer.innerHTML = '';
        
        // Устанавливаем стиль контейнера
        gridContainer.style.position = 'absolute';
        gridContainer.style.top = '0';
        gridContainer.style.left = '0';
        gridContainer.style.width = '100%';
        gridContainer.style.height = '100%';
        gridContainer.style.zIndex = '10';
        
        // Создаем вертикальные линии
        for (let i = 0; i <= 9; i++) {
            const line = document.createElement('div');
            line.className = 'grid-line vertical';
            line.style.left = `${i * 11.1}%`;
            gridContainer.appendChild(line);
        }
        
        // Создаем горизонтальные линии
        for (let i = 0; i <= 8; i++) {
            const line = document.createElement('div');
            line.className = 'grid-line horizontal';
            line.style.top = `${i * 12.5}%`;
            gridContainer.appendChild(line);
        }
        
        console.log('Линии сетки созданы');
    }
    
    // Применение цветовой схемы
    function applyColorScheme(schemeIndex) {
        const scheme = colorSchemes[schemeIndex];
        document.documentElement.style.setProperty('--line-color-rgb', scheme.color);
        document.documentElement.style.setProperty('--line-glow', `rgba(${scheme.color}, ${scheme.glow})`);
        
        state.colorScheme = schemeIndex;
        console.log(`Применена цветовая схема: ${scheme.name}`);
    }
    
    // Применение пресета анимации
    function applyAnimationPreset(presetName) {
        const preset = animationPresets[presetName];
        if (!preset) {
            console.error(`Пресет анимации "${presetName}" не найден`);
            return;
        }
        
        document.documentElement.style.setProperty('--animation-duration', `${preset.duration}s`);
        document.documentElement.style.setProperty('--animation-intensity', preset.intensity);
        document.documentElement.style.setProperty('--line-opacity', preset.opacity);
        
        console.log(`Применен пресет анимации: ${presetName}`);
    }
    
    // Запуск плавного переливания цветов
    function startColorTransition() {
        let currentIndex = 0;
        
        // Функция для плавного перехода между цветами
        function transitionToNextColor() {
            const nextIndex = (currentIndex + 1) % colorSchemes.length;
            const currentScheme = colorSchemes[currentIndex];
            const nextScheme = colorSchemes[nextIndex];
            
            // Разбиваем RGB на компоненты
            const currentRGB = currentScheme.color.split(',').map(Number);
            const nextRGB = nextScheme.color.split(',').map(Number);
            
            // Создаем 100 промежуточных кадров для плавного перехода
            const frames = 100;
            let frame = 0;
            
            function animateTransition() {
                if (frame >= frames) {
                    currentIndex = nextIndex;
                    // Планируем следующий переход через 10 секунд
                    setTimeout(transitionToNextColor, 10000);
                    return;
                }
                
                // Вычисляем промежуточный цвет
                const progress = frame / frames;
                const r = Math.round(currentRGB[0] + (nextRGB[0] - currentRGB[0]) * progress);
                const g = Math.round(currentRGB[1] + (nextRGB[1] - currentRGB[1]) * progress);
                const b = Math.round(currentRGB[2] + (nextRGB[2] - currentRGB[2]) * progress);
                
                // Применяем промежуточный цвет
                document.documentElement.style.setProperty('--line-color-rgb', `${r}, ${g}, ${b}`);
                document.documentElement.style.setProperty('--line-glow', `rgba(${r}, ${g}, ${b}, ${currentScheme.glow})`);
                
                frame++;
                requestAnimationFrame(animateTransition);
            }
            
            animateTransition();
        }
        
        // Запускаем первый переход через 5 секунд после загрузки
        setTimeout(transitionToNextColor, 5000);
    }
    
    // Изменение режима анимации
    function setAnimationMode(mode) {
        if (!['vertical', 'horizontal', 'cell'].includes(mode)) {
            console.error(`Неизвестный режим анимации: ${mode}`);
            return;
        }
        
        state.animationMode = mode;
        
        // Применяем соответствующие классы к линиям
        const verticals = document.querySelectorAll('.grid-line.vertical');
        const horizontals = document.querySelectorAll('.grid-line.horizontal');
        
        if (mode === 'vertical') {
            verticals.forEach(line => line.classList.add('active-line'));
            horizontals.forEach(line => line.classList.remove('active-line'));
        } else if (mode === 'horizontal') {
            verticals.forEach(line => line.classList.remove('active-line'));
            horizontals.forEach(line => line.classList.add('active-line'));
        } else { // cell
            verticals.forEach(line => line.classList.add('active-line'));
            horizontals.forEach(line => line.classList.add('active-line'));
        }
        
        console.log(`Режим анимации изменен на: ${mode}`);
    }
    
    // Подсветка клетки
    function highlightCell(cellNumber, type = 'active') {
        if (cellNumber < 1 || cellNumber > 72) {
            console.error(`Неверный номер клетки: ${cellNumber}`);
            return;
        }
        
        // Вычисляем координаты клетки
        const row = 7 - Math.floor((cellNumber - 1) / 9);
        const col = ((7 - row) % 2 === 0) ? 
            (cellNumber - 1) % 9 : 
            8 - ((cellNumber - 1) % 9);
        
        // Находим линии, образующие клетку
        const topLine = document.querySelector(`.grid-line.horizontal[style*="top: ${row * 12.5}%"]`);
        const bottomLine = document.querySelector(`.grid-line.horizontal[style*="top: ${(row + 1) * 12.5}%"]`);
        const leftLine = document.querySelector(`.grid-line.vertical[style*="left: ${col * 11.1}%"]`);
        const rightLine = document.querySelector(`.grid-line.vertical[style*="left: ${(col + 1) * 11.1}%"]`);
        
        // Удаляем предыдущие классы активности
        if (type === 'active' && state.activeCell) {
            const lines = getCellLines(state.activeCell);
            lines.forEach(line => line && line.classList.remove('active'));
        }
        
        // Добавляем соответствующий класс
        [topLine, bottomLine, leftLine, rightLine].forEach(line => {
            if (line) {
                line.classList.add(type);
            }
        });
        
        // Обновляем состояние
        if (type === 'active') {
            state.activeCell = cellNumber;
        } else if (type === 'visited') {
            state.visitedCells.add(cellNumber);
        } else if (type === 'path') {
            state.pathCells.add(cellNumber);
        }
        
        console.log(`Клетка ${cellNumber} подсвечена как ${type}`);
    }
    
    // Получение линий клетки
    function getCellLines(cellNumber) {
        const row = 7 - Math.floor((cellNumber - 1) / 9);
        const col = ((7 - row) % 2 === 0) ? 
            (cellNumber - 1) % 9 : 
            8 - ((cellNumber - 1) % 9);
        
        return [
            document.querySelector(`.grid-line.horizontal[style*="top: ${row * 12.5}%"]`),
            document.querySelector(`.grid-line.horizontal[style*="top: ${(row + 1) * 12.5}%"]`),
            document.querySelector(`.grid-line.vertical[style*="left: ${col * 11.1}%"]`),
            document.querySelector(`.grid-line.vertical[style*="left: ${(col + 1) * 11.1}%"]`)
        ];
    }
    
    // Очистка всех эффектов
    function clearEffects() {
        document.querySelectorAll('.grid-line').forEach(line => {
            line.classList.remove('active', 'visited', 'path');
        });
        
        state.activeCell = null;
        state.visitedCells.clear();
        state.pathCells.clear();
        
        console.log('Все эффекты сетки очищены');
    }
    
    // Публичный API
    return {
        init,
        setColor: applyColorScheme,
        highlightCell,
        clearEffects,
        setAnimationParams: function(params) {
            if (params.duration) {
                document.documentElement.style.setProperty('--animation-duration', `${params.duration}s`);
            }
            
            if (params.intensity) {
                document.documentElement.style.setProperty('--animation-intensity', params.intensity);
            }
            
            if (params.opacity) {
                document.documentElement.style.setProperty('--line-opacity', params.opacity);
            }
            
            console.log('Параметры анимации обновлены');
        },
        
        // Новые методы для управления пресетом ФОН
        setAnimationPreset: applyAnimationPreset,
        setAnimationMode: setAnimationMode,
        
        // Дополнительные методы
        highlightPath: function(cellNumbers) {
            cellNumbers.forEach(cell => highlightCell(cell, 'path'));
        },
        
        markVisited: function(cellNumber) {
            highlightCell(cellNumber, 'visited');
        },
        
        nextColorScheme: function() {
            const nextScheme = (state.colorScheme + 1) % colorSchemes.length;
            applyColorScheme(nextScheme);
            return colorSchemes[nextScheme].name;
        },
        
        // Метод для применения акцентного цвета к конкретной клетке
        highlightWithAccent: function(cellNumber, accentIndex) {
            if (accentIndex < 0 || accentIndex >= accentColors.length) {
                console.error(`Неверный индекс акцентного цвета: ${accentIndex}`);
                return;
            }
            
            const accent = accentColors[accentIndex];
            const lines = getCellLines(cellNumber);
            
            lines.forEach(line => {
                if (line) {
                    line.style.setProperty('--line-color-rgb', accent.color);
                    line.style.setProperty('--line-glow', `rgba(${accent.color}, ${accent.glow})`);
                    line.classList.add('accent');
                }
            });
            
            console.log(`Клетка ${cellNumber} подсвечена акцентным цветом: ${accent.name}`);
        },
        
        // Метод для сохранения текущих настроек
        saveCurrentSettings: function() {
            const settings = {
                colorScheme: state.colorScheme,
                animationMode: state.animationMode,
                // Получаем текущие значения CSS-переменных
                duration: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--animation-duration')),
                intensity: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--animation-intensity')),
                opacity: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--line-opacity'))
            };
            
            // Определяем, какой пресет ближе всего к текущим настройкам
            let closestPreset = 'custom';
            for (const [presetName, preset] of Object.entries(animationPresets)) {
                if (Math.abs(preset.duration - settings.duration) < 0.5 &&
                    Math.abs(preset.intensity - settings.intensity) < 0.2 &&
                    Math.abs(preset.opacity - settings.opacity) < 0.2) {
                    closestPreset = presetName;
                    break;
                }
            }
            
            settings.presetName = closestPreset;
            
            console.log('Текущие настройки:', {
                colorScheme: colorSchemes[settings.colorScheme].name,
                animationMode: settings.animationMode,
                preset: settings.presetName,
                duration: settings.duration + 's',
                intensity: settings.intensity,
                opacity: settings.opacity
            });
            
            return settings;
        },
        
        // Метод для применения сохраненных настроек
        applySavedSettings: function(settings) {
            if (settings.colorScheme !== undefined) {
                applyColorScheme(settings.colorScheme);
            }
            
            if (settings.animationMode) {
                setAnimationMode(settings.animationMode);
            }
            
            if (settings.presetName && settings.presetName !== 'custom') {
                applyAnimationPreset(settings.presetName);
            } else {
                // Применяем пользовательские настройки
                document.documentElement.style.setProperty('--animation-duration', `${settings.duration}s`);
                document.documentElement.style.setProperty('--animation-intensity', settings.intensity);
                document.documentElement.style.setProperty('--line-opacity', settings.opacity);
            }
            
            console.log('Применены сохраненные настройки');
        }
    };
})();

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем систему
    GridSystem.init();
    
    // Загружаем сохраненные настройки, если они есть
    const savedSettings = localStorage.getItem('gridSystemSettings');
    if (savedSettings) {
        setTimeout(() => {
            GridSystem.applySavedSettings(JSON.parse(savedSettings));
            console.log('Автоматически загружены сохраненные настройки');
        }, 500); // Небольшая задержка для надежности
    }
    
    // Добавляем горячие клавиши для тестирования
    document.addEventListener('keydown', function(e) {
        // Клавиша 'c' - смена цветовой схемы
        if (e.key === 'c') {
            const schemeName = GridSystem.nextColorScheme();
            console.log(`Цветовая схема изменена на: ${schemeName}`);
        }
        
        // Клавиши 1-3 для переключения режимов анимации
        if (e.key === '1') {
            GridSystem.setAnimationMode('vertical');
        } else if (e.key === '2') {
            GridSystem.setAnimationMode('horizontal');
        } else if (e.key === '3') {
            GridSystem.setAnimationMode('cell');
        }
        
        // Клавиши для переключения пресетов анимации
        if (e.key === 'g') {
            GridSystem.setAnimationPreset('gentle');
        } else if (e.key === 'm') {
            GridSystem.setAnimationPreset('medium');
        } else if (e.key === 'd') {
            GridSystem.setAnimationPreset('dynamic');
        }
        
        // Клавиша 'h' - подсветка случайной клетки
        if (e.key === 'h') {
            const randomCell = Math.floor(Math.random() * 72) + 1;
            GridSystem.highlightCell(randomCell);
            console.log(`Подсвечена случайная клетка: ${randomCell}`);
        }
        
        // Клавиша 'a' - подсветка случайной клетки акцентным цветом
        if (e.key === 'a') {
            const randomCell = Math.floor(Math.random() * 72) + 1;
            const randomAccent = Math.floor(Math.random() * 5);
            GridSystem.highlightWithAccent(randomCell, randomAccent);
        }
        
        // Клавиша 'p' - создание случайного пути
        if (e.key === 'p') {
            const pathLength = Math.floor(Math.random() * 5) + 3;
            const path = [];
            for (let i = 0; i < pathLength; i++) {
                path.push(Math.floor(Math.random() * 72) + 1);
            }
            GridSystem.highlightPath(path);
            console.log(`Создан случайный путь: ${path.join(', ')}`);
        }
        
        // Клавиша 'x' - очистка всех эффектов
        if (e.key === 'x') {
            GridSystem.clearEffects();
        }
        
        // Клавиша 's' - сохранение текущих настроек
        if (e.key === 's') {
            const settings = GridSystem.saveCurrentSettings();
            localStorage.setItem('gridSystemSettings', JSON.stringify(settings));
            console.log('Настройки сохранены в localStorage');
        }
        
        // Клавиша 'l' - загрузка сохраненных настроек
        if (e.key === 'l') {
            const savedSettings = localStorage.getItem('gridSystemSettings');
            if (savedSettings) {
                GridSystem.applySavedSettings(JSON.parse(savedSettings));
                console.log('Настройки загружены из localStorage');
            } else {
                console.log('Сохраненные настройки не найдены');
            }
        }
    });
}); 