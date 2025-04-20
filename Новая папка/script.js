// Глобальные переменные
const cellPositions = {
    // Координаты для каждой клетки (1-72)
    1: { x: 11.1, y: 87.5 },
    2: { x: 22.2, y: 87.5 },
    3: { x: 33.3, y: 87.5 },
    // ... добавьте остальные позиции
};

// Обновленные специальные перемещения
const specialMoves = {
    // Стрелы (взлеты)
    10: 23,
    17: 69,
    20: 32,
    22: 60,
    27: 41,
    28: 50,
    37: 66,
    45: 67,
    46: 62,
    54: 68,
    
    // Змеи (падения)
    72: 51,
    55: 3,
    52: 35,
    16: 4,
    24: 7,
    61: 13,
    12: 8,  // Эта змея должна сработать в вашем примере
    29: 6,
    44: 9,
    63: 2
};

// Координаты путей для змей (примерные координаты, нужно будет подстроить)
const snakePaths = {
    // Верхняя змея (начинается в клетке 72)
    snake1: "M 88,12 C 88,12 85,13 82,15 C 79,17 77,19 75,22 C 73,25 71,28 69,30 C 67,32 65,34 63,35 C 61,36 59,37 57,38",
    
    // Остальные змеи пока закомментируем
    // snake2: "...",
    // snake3: "...",
    // snake4: "..."
};

// Обновляем объект с названиями клеток в соответствии с изображением
const cellNames = {
    1: "Рождение",
    2: "Иллюзия",
    3: "Тень",
    4: "Поле дхармы",
    5: "Сердечный огонь",
    6: "Изначальный звук",
    7: "Прозрение",
    8: "Отличие",
    9: "Чувственный план",
    10: "Очищение",
    11: "Исцеление",
    12: "Пробуждение",
    13: "Поле мудрости",
    14: "Поле дхармы",
    15: "Поле знания",
    16: "Поле дхармы",
    17: "Осознание",
    18: "Поле мудрости",
    19: "Поле знания",
    20: "Блаженство",
    21: "Искупление",
    22: "Поле дхармы",
    23: "Поле кармы",
    24: "Поле дхармы",
    25: "Поле мудрости",
    26: "Печаль",
    27: "Поле знания",
    28: "Хоровод мыслеформ",
    29: "Поле дхармы",
    30: "Поле кармы",
    31: "Поле дхармы",
    32: "Поле мудрости",
    33: "Тень",
    34: "Иллюзия",
    35: "Поле знания",
    36: "Поле дхармы",
    37: "Поле кармы",
    38: "Поле дхармы",
    39: "Поле мудрости",
    40: "Зеркало",
    41: "Человеческий план",
    42: "Поле Атма",
    43: "Поле дхармы",
    44: "Поле кармы",
    45: "Поле дхармы",
    46: "Разделение",
    47: "Поле мудрости",
    48: "Осознание пути",
    49: "Поле знания",
    50: "Поле дхармы",
    51: "Поле кармы",
    52: "Поле дхармы",
    53: "Поле мудрости",
    54: "Поле знания",
    55: "Знание",
    56: "Поле дхармы",
    57: "Поле кармы",
    58: "Поле дхармы",
    59: "Поле мудрости",
    60: "Поле знания",
    61: "Поле интуиции",
    62: "Счастье",
    63: "Поле дхармы",
    64: "Эмоциональный план",
    65: "Поле внутреннего пространства",
    66: "Поле блаженства",
    67: "Поле очищения света",
    68: "Божественное откровение",
    69: "Поле дхармы",
    70: "Сатья юга",
    71: "Разделение",
    72: "Тамас юга"
};

// Обновляем глобальные переменные для управления игрой
let gameStarted = false; // Флаг, показывающий начата ли игра (выпала ли первая шестерка)
let firstSixRolled = false; // Флаг, показывающий, что первая шестерка уже выпала

// Добавляем функцию для работы с фоновой музыкой
let backgroundMusic; // Глобальная переменная для хранения элемента аудио

// Добавляем глобальную переменную для отслеживания состояния рождения
let birthState = true; // Изначально находимся в состоянии рождения

// Константа со списком чакр и их цветов
const chakraCells = {
    5: { name: "Сердечный огонь", color: "#FF0000" }, // Красный - Муладхара
    14: { name: "Поле дхармы", color: "#FF7F00" },    // Оранжевый - Свадхистхана
    23: { name: "Поле кармы", color: "#FFFF00" },     // Желтый - Манипура
    32: { name: "Поле мудрости", color: "#00FF00" },  // Зеленый - Анахата
    41: { name: "Человеческий план", color: "#00BFFF" }, // Голубой - Вишудха
    50: { name: "Поле дхармы", color: "#4B0082" },    // Индиго - Аджна
    59: { name: "Поле мудрости", color: "#8A2BE2" }   // Фиолетовый - Сахасрара
};

// Добавляем переменную для отслеживания первого клика
let isFirstClick = true;

// Добавляем полный объект с описаниями клеток (1-72)
const cellDescriptions = {
    // Клетки 1-40
    1: {
        title: "Рождение (джанма)",
        text: "Рождение — это вход в кармическую игру, где игрок принимает законы кармы и начинает путь к Космическому Сознанию. Оно повторяет изначальный процесс творения, открывая бесконечное путешествие."
    },
    2: {
        title: "Майя",
        text: "Майя — это иллюзия множественности, скрывающая единство сознания и создающая чувство отдельного \"я\". Осознание игры как проявления божественной силы помогает преодолеть неведение."
    },
    3: {
        title: "Гнев (кродха)",
        text: "Гнев возникает, когда эго сталкивается с отвергнутыми аспектами личности, разрушая добрые качества. Он возвращает игрока к первой чакре, но безличный гнев может очищать."
    },
    4: {
        title: "Жадность (лобха)",
        text: "Жадность — это стремление к материальным благам из-за чувства пустоты, что делает игрока близоруким. Она открывает путь к проблемам первой чакры, но жажда духовного опыта может стать достоинством."
    },
    5: {
        title: "Физический план (бху-лока)",
        text: "Физический план — это мир материи и базовых потребностей, связанный с первой чакрой. Здесь игрок сосредоточен на выживании, а семь змей подчёркивают важность этого уровня."
    },
    6: {
        title: "Заблуждение (моха)",
        text: "Заблуждение — это привязанность к миру явлений, затуманивающая ум из-за отсутствия религиозности. Осознание игры как иллюзии устраняет негативную карму."
    },
    7: {
        title: "Тщеславие (мада)",
        text: "Тщеславие — это самообман и ложная гордость, вызванные плохой компанией. Поиск хорошего окружения помогает остановить создание плохой кармы."
    },
    8: {
        title: "Алчность (матсара)",
        text: "Алчность — это жадность с завистью, порождающая ненависть к другим и жажду их благ. Она усиливает проблемы первой чакры."
    },
    9: {
        title: "Чувственный план (кама-лока)",
        text: "Чувственный план — это мир желаний, завершающий первый ряд и ведущий ко второму уровню. Желание — первая стадия эволюции."
    },
    10: {
        title: "Очищение (тапа)",
        text: "Очищение — это стрела, поднимающая игрока ко второму уровню через контроль чувств и образа жизни. Оно повышает вибрации и открывает путь к небесам."
    },
    11: {
        title: "Развлечения (гандхарвы)",
        text: "Развлечения — это отражение внутренней радости и гармонии после очищения. Они вдохновляют на творчество и оживляют жизнь."
    },
    12: {
        title: "Зависть (ирасъя)",
        text: "Зависть — это змея, возвращающая игрока к жадности из-за неуверенности. Она очищает мышление через падение."
    },
    13: {
        title: "Ничтожность (антарикша)",
        text: "Ничтожность — это состояние пустоты и потери смысла из-за недостатка энергии. Оно временно и связано со второй чакрой."
    },
    14: {
        title: "Астральный план (бхувар-лока)",
        text: "Астральный план — это мир снов и фантазий, связанный со второй чакрой. Здесь игрок осознаёт многообразие возможностей, но рискует истощить энергию."
    },
    15: {
        title: "План фантазии (нага-лока)",
        text: "План фантазии — это мир воображения, где игрок исследует бесконечные возможности. Он вдохновляет на творчество, но может увести от реальности."
    },
    16: {
        title: "Ревность (двеша)",
        text: "Ревность — это змея, возвращающая игрока к жадности из-за подозрительности. Она разрушает уверенность и тянет вниз."
    },
    17: {
        title: "Сострадание (дайя)",
        text: "Сострадание — это стрела, поднимающая игрока к плану Абсолюта через разрушение эго. Оно открывает сердце к божественной любви."
    },
    18: {
        title: "План радости (харша-лока)",
        text: "План радости — это удовлетворение после преодоления второй чакры. Игрок готов к карма-йоге, испытывая вечную радость."
    },
    19: {
        title: "План кармы (карма-лока)",
        text: "План кармы — это мир действия, связанный с третьей чакрой. Здесь игрок осознаёт закон причины и следствия."
    },
    20: {
        title: "Благотворительность (дана)",
        text: "Благотворительность — это стрела, очищающая карму и ведущая к высшим планам. Добрые дела способствуют духовному росту."
    },
    21: {
        title: "Искупление (праяшчитта)",
        text: "Искупление — это очищение от прошлых ошибок, необходимое для духовного прогресса. Оно учит прощению себя и других."
    },
    22: {
        title: "Дхарма",
        text: "Дхарма — это жизнь в гармонии с космическими законами, основа праведности. Она ведёт к освобождению."
    },
    23: {
        title: "Неведение (авидья)",
        text: "Неведение — это отсутствие знания о своей природе, ведущее к страданиям. Его преодоление открывает истину."
    },
    24: {
        title: "Правильное знание (видья)",
        text: "Правильное знание — это понимание своей божественной природы, освобождающее от иллюзий. Оно рассеивает тьму неведения."
    },
    25: {
        title: "План равновесия (сама-лока)",
        text: "План равновесия — это гармония между материальным и духовным. Здесь игрок обретает внутренний покой."
    },
    26: {
        title: "План жидкостей (джала-лока)",
        text: "План жидкостей — это мир эмоций, связанный с водой. Игрок учится управлять чувствами."
    },
    27: {
        title: "План воздуха (вайю-лока)",
        text: "План воздуха — это мир движения и перемен. Игрок принимает непостоянство как часть жизни."
    },
    28: {
        title: "План огня (агни-лока)",
        text: "План огня — это мир трансформации, где огонь сжигает старое. Игрок проходит испытания для роста."
    },
    29: {
        title: "План земли (притхиви-лока)",
        text: "План земли — это мир материальной реальности. Игрок учится ценить её как часть пути."
    },
    30: {
        title: "План эфира (акаша-лока)",
        text: "План эфира — это мир пространства и бесконечности. Игрок осознаёт единство всего сущего."
    },
    31: {
        title: "План звука (шабда-лока)",
        text: "План звука — это мир вибраций и мантр, источник творения. Игрок использует звук для роста."
    },
    32: {
        title: "План света (джьоти-лока)",
        text: "План света — это мир просветления, рассеивающий неведение. Игрок приближается к своей природе."
    },
    33: {
        title: "План тьмы (тамас-лока)",
        text: "План тьмы — это мир неведения и инерции. Игрок должен преодолеть тьму для прогресса."
    },
    34: {
        title: "План инерции (тамогуна)",
        text: "План инерции — это состояние пассивности, тормозящее развитие. Игрок активизирует энергию для движения."
    },
    35: {
        title: "План активности (раджогуна)",
        text: "План активности — это мир действия и страсти. Игрок ищет баланс между движением и покоем."
    },
    36: {
        title: "План гармонии (саттвагуна)",
        text: "План гармонии — это состояние чистоты и равновесия. Оно ведёт к мудрости и спокойствию."
    },
    37: {
        title: "План знания (джняна-лока)",
        text: "План знания — это мир мудрости, освобождающий от иллюзий. Игрок различает истину и ложь."
    },
    38: {
        title: "План невежества (аджняна-лока)",
        text: "План невежества — это мир заблуждений, мешающий видеть реальность. Игрок преодолевает его через самопознание."
    },
    39: {
        title: "План эго (ахамкара)",
        text: "План эго — это мир отделённости, создающий иллюзию \"я\". Игрок учится превосходить эго для единства."
    },
    40: {
        title: "План ума (манас-лока)",
        text: "План ума — это мир мыслей, который может быть препятствием. Игрок контролирует ум через медитацию."
    },
    
    // Клетки 41-72 (уже добавлены)
    41: {
        title: "План интеллекта (буддхи-лока)",
        text: "План интеллекта — это мир различения и мудрости. Он помогает принимать верные решения."
    },
    // ... остальные ячейки уже добавлены
    
    // Добавляем остальные клетки (42-72)
    42: {
        title: "План сознания (читта-лока)",
        text: "План сознания — это мир чистого бытия. Игрок очищает сознание для ясности."
    },
    43: {
        title: "План блаженства (ананда-лока)",
        text: "План блаженства — это мир высшей радости, сущность сознания. Игрок переживает чистое бытие."
    },
    44: {
        title: "План страдания (дукха-лока)",
        text: "План страдания — это мир боли, учащий смирению. Игрок принимает страдание как часть пути."
    },
    45: {
        title: "План милосердия (каруна-лока)",
        text: "План милосердия — это мир сострадания и доброты. Оно исцеляет и возвышает игрока."
    },
    46: {
        title: "План преданности (бхакти-лока)",
        text: "План преданности — это мир любви к Божественному. Бхакти ведёт к единению с Богом."
    },
    47: {
        title: "План действия (карма-лока)",
        text: "План действия — это мир кармы и её последствий. Игрок учится действовать бескорыстно."
    },
    48: {
        title: "План бездействия (нишкарма-лока)",
        text: "План бездействия — это состояние покоя, свобода от кармы. Игрок стремится выйти за пределы действия."
    },
    49: {
        title: "План освобождения (мокша-лока)",
        text: "План освобождения — это конечная цель, свобода от перерождений. Игрок осознаёт свою природу."
    },
    50: {
        title: "План Космического Сознания (Вайкунтха-лока)",
        text: "План Космического Сознания — это обитель Вишну, место освобождения. Игрок сливается с Истиной."
    },
    51: {
        title: "План Абсолюта (Брахма-лока)",
        text: "План Абсолюта — это обитель Брахмы, где игрок понимает законы творения. Он продолжает игру для мокши."
    },
    52: {
        title: "Саттвагуна",
        text: "Саттвагуна — это качество чистоты, ведущее к мудрости. Оно помогает приблизиться к освобождению."
    },
    53: {
        title: "Раджогуна",
        text: "Раджогуна — это качество активности, побуждающее к действию. Игрок уравновешивает его для прогресса."
    },
    54: {
        title: "Тамогуна",
        text: "Тамогуна — это качество инерции, ведущее к неведению. Игрок преодолевает его для движения вперёд."
    },
    55: {
        title: "План изначальных вибраций (Омкара)",
        text: "План изначальных вибраций — это мир звука Ом, источника творения. Игрок осознаёт единство через вибрации."
    },
    56: {
        title: "План газов (вайю-лока)",
        text: "План газов — это мир воздуха, где игрок становится потоком энергии. Он свободен от тяжести."
    },
    57: {
        title: "План сияния (теджа-лока)",
        text: "План сияния — это мир света, где игрок освещает мир. Он становится просветлённым."
    },
    58: {
        title: "План реальности (сатья-лока)",
        text: "План реальности — это высший мир истины, где игрок достигает гармонии. Он близок к освобождению."
    },
    59: {
        title: "Позитивный интеллект (субуддхи)",
        text: "Позитивный интеллект — это правильное понимание, видящее Божественное во всём. Он помогает достичь цели."
    },
    60: {
        title: "Негативный интеллект (дурбуддхи)",
        text: "Негативный интеллект — это сомнения, ведущие к падению в ничтожность. Игрок преодолевает его через Дхарму."
    },
    61: {
        title: "Счастье (сукха)",
        text: "Счастье — это состояние равновесия, близкое к цели. Оно может стать ловушкой, если игрок забудет о карме."
    },
    62: {
        title: "Тамас",
        text: "Тамас — это змея тьмы, возвращающая игрока в иллюзию из-за бездействия. Она учит важности кармы."
    },
    63: {
        title: "Феноменальный план (пракрити-лока)",
        text: "Феноменальный план — это мир проявленной природы. Игрок осознаёт двойственность пракрити."
    },
    64: {
        title: "План внутреннего пространства (уранта-лока)",
        text: "План внутреннего пространства — это мир бесконечности внутри \"Я\". Игрок видит иллюзорность границ."
    },
    65: {
        title: "План блаженства (ананда-лока)",
        text: "План блаженства — это мир высшей радости, сущность сознания. Игрок переживает чистое бытие."
    },
    66: {
        title: "План космического блага (Рудра-лока)",
        text: "План космического блага — это обитель Шивы, разрушающего эго. Игрок осознаёт благо для всех."
    },
    67: {
        title: "Космическое Сознание (Вайкунтха-лока)",
        text: "Космическое Сознание — это обитель Вишну, цель игры. Игрок сливается с Истиной."
    },
    68: {
        title: "План Абсолюта (Брахма-лока)",
        text: "План Абсолюта — это обитель Брахмы, где игрок понимает творение. Он продолжает игру для освобождения."
    },
    69: {
        title: "Саттвагуна",
        text: "Саттвагуна — это чистота, ведущая к мудрости. Она основа медитации и освобождения."
    },
    70: {
        title: "Раджогуна",
        text: "Раджогуна — это активность, порождающая страдание. Игрок уравновешивает её для прогресса."
    },
    71: {
        title: "Тамогуна",
        text: "Тамогуна — это инерция, скрывающая истину. Игрок преодолевает её для нового пути."
    },
    72: {
        title: "Тамогуна",
        text: "Тамогуна — это последняя клетка, возвращающая игрока к земле. Она символизирует цикл творения."
    }
};

// Добавляем определения стрел и змей, если их еще нет
const arrowPositions = {
    10: 23,  // Очищение → Поле кармы
    17: 69,  // Осознание → Поле дхармы
    20: 32,  // Блаженство → Поле мудрости
    22: 60,  // Поле дхармы → Поле знания
    27: 41,  // Поле знания → Человеческий план
    28: 50,  // Хоровод мыслеформ → Поле дхармы
    37: 66,  // Поле кармы → Поле блаженства
    45: 67,  // Поле дхармы → Поле очищения света
    46: 62,  // Разделение → Счастье
    54: 68   // Поле знания → Божественное откровение
};

const snakePositions = {
    12: 8,   // Пробуждение → Отличие
    16: 4,   // Поле дхармы → Поле дхармы
    24: 7,   // Поле дхармы → Прозрение
    29: 6,   // Поле дхармы → Изначальный звук
    44: 9,   // Поле кармы → Чувственный план
    52: 35,  // Поле дхармы → Поле знания
    55: 3,   // Знание → Тень
    61: 13,  // Поле интуиции → Поле мудрости
    63: 2,   // Поле дхармы → Иллюзия
    72: 51   // Тамас юга → Поле кармы
};

// Вспомогательная функция для создания золотой фишки
function createGoldenCell(position) {
    console.log(`Создаем золотую фишку на позиции ${position}`);
    
    // Удаляем существующую фишку, если она есть
    const existingCell = document.querySelector('.golden-cell');
    if (existingCell) {
        existingCell.remove();
    }
    
    // Создаем новую фишку
    const goldenCell = document.createElement('div');
    goldenCell.className = 'golden-cell';
    goldenCell.setAttribute('data-number', position);
    
    // Добавляем фишку на доску
    const boardContainer = document.querySelector('.board-container');
    if (boardContainer) {
        boardContainer.appendChild(goldenCell);
        
        // Позиционируем фишку
        const gridSize = 9; // 9x8 сетка
        const row = Math.floor((position - 1) / gridSize);
        const col = (position - 1) % gridSize;
        
        // Расчет позиции в процентах
        const left = (col * 11.1) + 5.55; // 100% / 9 ≈ 11.1%
        const top = (7 - row) * 12.5 + 6.25; // 100% / 8 = 12.5%
        
        goldenCell.style.left = `${left}%`;
        goldenCell.style.top = `${top}%`;
    } else {
        console.error("Контейнер доски не найден!");
    }
}

// Функция для обработки хода с проверкой специальных перемещений
function handleGameMove(currentPosition, newPosition, diceResult) {
    console.log(`Обработка хода: ${currentPosition} -> ${newPosition}`);
    
    // Сначала перемещаем фишку на новую позицию
    const moveToPosition = (position) => {
        console.log(`Перемещение фишки: ${currentPosition} -> ${position}`);
        createGoldenCell(position);
        showMovementAnimation(currentPosition, position);
        
        // Обновляем сообщение
        const message = document.querySelector('.message');
        if (message) {
            message.textContent = `Вы переместились на клетку ${position}.`;
        }
        
        // Обновляем БОК с описанием новой позиции
        if (cellDescriptions[position]) {
            updateBoxContent(
                cellDescriptions[position].title,
                cellDescriptions[position].text
            );
        } else {
            updateBoxContent(
                `Клетка ${position}`,
                `Вы находитесь на клетке ${position}.`
            );
        }
    };
    
    // Перемещаем фишку на новую позицию (результат броска кубика)
    moveToPosition(newPosition);
    
    // Проверяем наличие стрелы на новой позиции
    if (arrowPositions[newPosition]) {
        const arrowTarget = arrowPositions[newPosition];
        console.log(`СТРЕЛА: ${newPosition} -> ${arrowTarget}`);
        
        // Обновляем сообщение о стреле
        const message = document.querySelector('.message');
        if (message) {
            message.textContent = `Стрела! Вы поднимаетесь с клетки ${newPosition} на клетку ${arrowTarget}.`;
        }
        
        // Обновляем БОК с информацией о стреле
        if (cellDescriptions[newPosition]) {
            updateBoxContent(
                cellDescriptions[newPosition].title,
                `${cellDescriptions[newPosition].text} Здесь находится стрела, которая поднимает вас на клетку ${arrowTarget}.`
            );
        } else {
            updateBoxContent(
                `Клетка ${newPosition} (Стрела)`,
                `Вы попали на стрелу, которая поднимает вас на клетку ${arrowTarget}.`
            );
        }
        
        // Пытаемся воспроизвести звук стрелы
        try {
            playSound('up1');
        } catch (e) {
            console.warn("Ошибка воспроизведения звука стрелы:", e);
        }
        
        // Показываем анимацию стрелы
        showArrowAnimation(newPosition, arrowTarget);
        
        // После задержки перемещаем фишку на целевую позицию стрелы
        setTimeout(() => {
            // Перемещаем фишку на целевую позицию
            moveToPosition(arrowTarget);
        }, 1500);
        
        return;
    }
    
    // Проверяем наличие змеи на новой позиции
    if (snakePositions[newPosition]) {
        const snakeTarget = snakePositions[newPosition];
        console.log(`ЗМЕЯ: ${newPosition} -> ${snakeTarget}`);
        
        // Обновляем сообщение о змее
        const message = document.querySelector('.message');
        if (message) {
            message.textContent = `Змея! Вы спускаетесь с клетки ${newPosition} на клетку ${snakeTarget}.`;
        }
        
        // Обновляем БОК с информацией о змее
        if (cellDescriptions[newPosition]) {
            updateBoxContent(
                cellDescriptions[newPosition].title,
                `${cellDescriptions[newPosition].text} Здесь находится змея, которая спускает вас на клетку ${snakeTarget}.`
            );
        } else {
            updateBoxContent(
                `Клетка ${newPosition} (Змея)`,
                `Вы попали на змею, которая спускает вас на клетку ${snakeTarget}.`
            );
        }
        
        // Пытаемся воспроизвести звук змеи
        try {
            playSound('snake1');
        } catch (e) {
            console.warn("Ошибка воспроизведения звука змеи:", e);
        }
        
        // Показываем анимацию змеи
        showSnakeAnimation(newPosition, snakeTarget);
        
        // После задержки перемещаем фишку на целевую позицию змеи
        setTimeout(() => {
            // Перемещаем фишку на целевую позицию
            moveToPosition(snakeTarget);
        }, 1500);
        
        return;
    }
    
    // Обычное перемещение без специальных эффектов - уже обработано в moveToPosition
}

// Вспомогательные функции для отображения анимаций
function showMovementAnimation(from, to) {
    console.log(`Анимация перемещения: ${from} -> ${to}`);
    // Базовая реализация - можно доработать позже
}

function showArrowAnimation(from, to) {
    console.log(`Анимация стрелы: ${from} -> ${to}`);
    // Простая реализация без реальной анимации, т.к. у нас проблемы с поиском ячеек
}

function showSnakeAnimation(from, to) {
    console.log(`Анимация змеи: ${from} -> ${to}`);
    // Простая реализация без реальной анимации, т.к. у нас проблемы с поиском ячеек
}

// Функция для воспроизведения звуков
function playSound(soundId) {
    console.log(`Попытка воспроизвести звук: ${soundId}`);
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => {
            console.warn(`Ошибка воспроизведения звука ${soundId}:`, e);
        });
    } else {
        console.warn(`Звуковой элемент с ID ${soundId} не найден`);
    }
}

// Теперь давайте добавим или обновим функции для анимации змей и стрел

// Анимация для змей
function showSnakeAnimation(startPosition, endPosition) {
    console.log(`Показываем анимацию змеи: ${startPosition} → ${endPosition}`);
    
    // Получаем клетки
    const startCell = document.querySelector(`.cell[data-number="${startPosition}"]`);
    const endCell = document.querySelector(`.cell[data-number="${endPosition}"]`);
    
    if (!startCell || !endCell) {
        console.error("Не удалось найти клетки для анимации змеи");
        return;
    }
    
    // Получаем координаты клеток
    const boardContainer = document.querySelector('.board-container');
    const boardRect = boardContainer.getBoundingClientRect();
    
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();
    
    // Создаем анимацию змеи
    const snakeEffect = document.createElement('div');
    snakeEffect.className = 'snake-effect';
    
    // Рассчитываем позицию и размер
    const startX = (startRect.left + startRect.width/2 - boardRect.left) / boardRect.width * 100;
    const startY = (startRect.top + startRect.height/2 - boardRect.top) / boardRect.height * 100;
    const endX = (endRect.left + endRect.width/2 - boardRect.left) / boardRect.width * 100;
    const endY = (endRect.top + endRect.height/2 - boardRect.top) / boardRect.height * 100;
    
    // Устанавливаем стиль для эффекта змеи
    snakeEffect.style.left = `${startX}%`;
    snakeEffect.style.top = `${startY}%`;
    snakeEffect.style.animation = `snakeMove 2s forwards`;
    
    // Добавляем CSS-переменные для анимации
    snakeEffect.style.setProperty('--end-x', `${endX}%`);
    snakeEffect.style.setProperty('--end-y', `${endY}%`);
    
    // Добавляем эффект в DOM
    boardContainer.appendChild(snakeEffect);
    
    // Удаляем эффект после завершения анимации
    setTimeout(() => {
        if (snakeEffect.parentNode) {
            snakeEffect.remove();
        }
    }, 2000);
}

// Анимация для стрел
function showArrowAnimation(startPosition, endPosition) {
    console.log(`Показываем анимацию стрелы: ${startPosition} → ${endPosition}`);
    
    // Получаем клетки
    const startCell = document.querySelector(`.cell[data-number="${startPosition}"]`);
    const endCell = document.querySelector(`.cell[data-number="${endPosition}"]`);
    
    if (!startCell || !endCell) {
        console.error("Не удалось найти клетки для анимации стрелы");
        return;
    }
    
    // Получаем координаты клеток
    const boardContainer = document.querySelector('.board-container');
    const boardRect = boardContainer.getBoundingClientRect();
    
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();
    
    // Создаем анимацию стрелы
    const arrowEffect = document.createElement('div');
    arrowEffect.className = 'arrow-effect';
    
    // Рассчитываем позицию и размер
    const startX = (startRect.left + startRect.width/2 - boardRect.left) / boardRect.width * 100;
    const startY = (startRect.top + startRect.height/2 - boardRect.top) / boardRect.height * 100;
    const endX = (endRect.left + endRect.width/2 - boardRect.left) / boardRect.width * 100;
    const endY = (endRect.top + endRect.height/2 - boardRect.top) / boardRect.height * 100;
    
    // Устанавливаем стиль для эффекта стрелы
    arrowEffect.style.left = `${startX}%`;
    arrowEffect.style.top = `${startY}%`;
    arrowEffect.style.animation = `arrowMove 1.5s forwards`;
    
    // Добавляем CSS-переменные для анимации
    arrowEffect.style.setProperty('--end-x', `${endX}%`);
    arrowEffect.style.setProperty('--end-y', `${endY}%`);
    
    // Добавляем эффект в DOM
    boardContainer.appendChild(arrowEffect);
    
    // Удаляем эффект после завершения анимации
    setTimeout(() => {
        if (arrowEffect.parentNode) {
            arrowEffect.remove();
        }
    }, 1500);
}

// Добавляем функцию анимации движения фишки
function showMovementAnimation(startPosition, endPosition) {
    console.log(`Показываем анимацию перемещения: ${startPosition} → ${endPosition}`);
    // Здесь можно добавить логику анимации движения, если нужно
    // В текущей реализации мы просто создаем новую фишку в конечной позиции
}

// Обновляем функцию инициализации игры
document.addEventListener('DOMContentLoaded', () => {
    createGridWithWhitePreset();
    validateSpecialMoves();
    
    // Инициализируем фоновую музыку
    initBackgroundMusic();
    
    // Создаем начальную фишку на клетке "Рождение"
    createBirthCell(1);
    
    // Инициализируем текстовый кубик
    const dice = document.getElementById('game-dice');
    if (dice) {
        dice.addEventListener('click', forceRollDice);
        console.log("Кубик инициализирован с ID:", dice.id);
    } else {
        console.error("Кубик с id='game-dice' не найден!");
    }
    
    // Выводим информацию о специальных перемещениях
    logSpecialMoves();
    
    // Автоматически добавляем сообщение о начале игры
    const message = document.querySelector('.message');
    if (message) {
        message.textContent = "Вы находитесь в состоянии Рождения. Бросайте кубик и ждите 6, чтобы начать путешествие.";
        message.style.color = '#8a2be2'; // Фиолетовый цвет для духовности
        
        setTimeout(() => {
            message.style.color = '';
        }, 5000);
    }
});

// Создание вертикальных линий
function createVerticalLines() {
    const gridContainer = document.querySelector('.grid-container');
    if (!gridContainer) return;
    
    // Вертикальные линии (добавляем крайние позиции)
    const verticalPositions = [0, 10.9, 22.0, 33.1, 44.2, 55.3, 66.4, 77.5, 88.6, 100];
    
    // Горизонтальные позиции (добавляем крайние позиции)
    const horizontalPositions = [0, 12.5, 25.0, 37.5, 50.0, 62.5, 75.0, 87.5, 100];
    
    // Создаем вертикальные линии
    verticalPositions.forEach(xPosition => {
        const line = document.createElement('div');
        line.className = 'grid-line vertical';
        line.style.left = `${xPosition}%`;
        gridContainer.appendChild(line);
    });

    // Создаем горизонтальные линии
    horizontalPositions.forEach(yPosition => {
        const line = document.createElement('div');
        line.className = 'grid-line horizontal';
        line.style.top = `${yPosition}%`;
        gridContainer.appendChild(line);
    });
}

// Функция для создания контуров номеров первой строки
function createNumberOutlines() {
    const numbersContainer = document.createElement('div');
    numbersContainer.className = 'numbers-outline-container';
    document.querySelector('.board-container').appendChild(numbersContainer);

    // Создаем контуры только для первой строки (1-9)
    const numbers = [
        { num: '1', x: 5.55, y: 87.5 },
        { num: '2', x: 16.65, y: 87.5 },
        { num: '3', x: 27.75, y: 87.5 },
        { num: '4', x: 38.85, y: 87.5 },
        { num: '5', x: 49.95, y: 87.5 },
        { num: '6', x: 61.05, y: 87.5 },
        { num: '7', x: 72.15, y: 87.5 },
        { num: '8', x: 83.25, y: 87.5 },
        { num: '9', x: 94.35, y: 87.5 }
    ];

    numbers.forEach(({num, x, y}) => {
        const outline = document.createElement('div');
        outline.className = 'number-outline';
        outline.textContent = num;
        outline.style.left = `${x}%`;
        outline.style.top = `${y}%`;
        numbersContainer.appendChild(outline);
    });
}

// Функция для создания подсвечивающих линий клетки
function createCellHighlights() {
    const boardContainer = document.querySelector('.board-container');
    
    // Создаем 4 линии (верх, низ, лево, право)
    for (let i = 0; i < 4; i++) {
        const line = document.createElement('div');
        line.className = `cell-highlight ${i < 2 ? 'horizontal' : 'vertical'}`;
        boardContainer.appendChild(line);
    }
}

// Функция для создания эффекта расходящихся квадратов
function createRippleEffect(cellNumber) {
    // Получаем координаты клетки в сетке
    const row = 7 - Math.floor((cellNumber - 1) / 9);
    const col = ((7 - row) % 2 === 0) ? 
        (cellNumber - 1) % 9 : 
        8 - ((cellNumber - 1) % 9);
    
    // Максимальный радиус распространения (меньше чем раньше)
    const maxRadius = 3;
    
    // Создаем анимацию для каждого уровня квадрата
    for (let radius = 1; radius <= maxRadius; radius++) {
        setTimeout(() => {
            // Получаем клетки текущего квадрата
            for (let offset = -radius; offset <= radius; offset++) {
                // Верхняя и нижняя грани квадрата
                if (row - radius >= 0 && row - radius < 8) {
                    highlightCell(row - radius, col + offset, radius);
                }
                if (row + radius >= 0 && row + radius < 8) {
                    highlightCell(row + radius, col + offset, radius);
                }
                
                // Левая и правая грани квадрата (исключая углы)
                if (offset !== -radius && offset !== radius) {
                    if (col - radius >= 0 && col - radius < 9) {
                        highlightCell(row + offset, col - radius, radius);
                    }
                    if (col + radius >= 0 && col + radius < 9) {
                        highlightCell(row + offset, col + radius, radius);
                    }
                }
            }
        }, radius * 100); // Уменьшили задержку для более быстрого эффекта
    }
}

// Функция подсветки отдельной клетки
function highlightCell(row, col, radius) {
    if (row >= 0 && row < 8 && col >= 0 && col < 9) {
        const verticalLines = document.querySelectorAll('.grid-line.vertical');
        const horizontalLines = document.querySelectorAll('.grid-line.horizontal');
        
        // Подсвечиваем линии вокруг клетки
        if (verticalLines[col]) {
            addRippleEffect(verticalLines[col], radius);
        }
        if (verticalLines[col + 1]) {
            addRippleEffect(verticalLines[col + 1], radius);
        }
        if (horizontalLines[row]) {
            addRippleEffect(horizontalLines[row], radius);
        }
        if (horizontalLines[row + 1]) {
            addRippleEffect(horizontalLines[row + 1], radius);
        }
    }
}

// Функция добавления эффекта волны
function addRippleEffect(element, radius) {
    const intensity = 1 - (radius * 0.2); // Уменьшаем интенсивность с расстоянием
    element.style.setProperty('--ripple-intensity', intensity);
    element.classList.add('ripple-effect');
    
    setTimeout(() => {
        element.classList.remove('ripple-effect');
    }, 800);
}

// Обновляем стили для эффекта волны
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 223, 0, calc(0.7 * var(--ripple-intensity))),
            transparent
        ) !important;
        box-shadow: 
            0 0 15px rgba(255, 223, 0, calc(0.5 * var(--ripple-intensity))),
            0 0 30px rgba(255, 223, 0, calc(0.3 * var(--ripple-intensity))) !important;
        animation: rippleAnimation 0.8s ease-out !important;
    }

    @keyframes rippleAnimation {
        0% {
            opacity: var(--ripple-intensity);
            filter: brightness(1.5);
        }
        100% {
            opacity: 0;
            filter: brightness(1);
        }
    }
`;
document.head.appendChild(style);

// Функция для создания сетки с белым пресетом
function createGridWithWhitePreset() {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    document.querySelector('.board-container').appendChild(gridContainer);

    // Создаем вертикальные линии
    const verticalPositions = [0, 11.1, 22.2, 33.3, 44.4, 55.5, 66.6, 77.7, 88.8, 100];
    verticalPositions.forEach(xPosition => {
        const line = document.createElement('div');
        line.className = 'grid-line vertical white';
        line.style.left = `${xPosition}%`;
        gridContainer.appendChild(line);
    });

    // Создаем горизонтальные линии
    const horizontalPositions = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
    horizontalPositions.forEach(yPosition => {
        const line = document.createElement('div');
        line.className = 'grid-line horizontal white';
        line.style.top = `${yPosition}%`;
        gridContainer.appendChild(line);
    });
}

// Обновляем функцию позиционирования фишки для корректной работы с большой фишкой
function positionGoldenCell(cellNumber) {
    const goldenCell = document.querySelector('.golden-cell');
    
    if (!goldenCell) return;
    
    if (cellNumber < 1 || cellNumber > 72) {
        console.error('Недопустимый номер клетки:', cellNumber);
        return;
    }
    
    // Вычисляем строку и столбец
    const row = 7 - Math.floor((cellNumber - 1) / 9);
    let col = ((7 - row) % 2 === 0) ? 
        (cellNumber - 1) % 9 : 
        8 - ((cellNumber - 1) % 9);
    
    // Вычисляем проценты для позиционирования (центр клетки)
    const left = col * 11.1 + 5.55; // Добавляем половину ширины клетки для центрирования
    const top = row * 12.5 + 6.25;  // Добавляем половину высоты клетки для центрирования
    
    // Плавное перемещение фишки
    goldenCell.style.transition = 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)'; // Более плавное движение
    goldenCell.style.left = `${left}%`;
    goldenCell.style.top = `${top}%`;
    
    // Обновляем номер на фишке
    goldenCell.textContent = cellNumber;
    
    // Сохраняем номер клетки в атрибуте
    goldenCell.setAttribute('data-number', cellNumber);
}

// Обновляем функцию создания фишки для более эффектного появления
function createGoldenCell(position) {
    // Удаляем существующую фишку, если она есть
    const existingCell = document.querySelector('.golden-cell');
    if (existingCell) {
        existingCell.remove();
    }

    const goldenCell = document.createElement('div');
    goldenCell.className = 'golden-cell';
    goldenCell.textContent = position; // Добавляем номер прямо в фишку
    goldenCell.style.opacity = '0';
    goldenCell.style.transform = 'translate(-50%, -50%) scale(0)';
    goldenCell.setAttribute('data-number', position);
    
    document.querySelector('.board-container').appendChild(goldenCell);

    // Анимация появления с задержкой
    setTimeout(() => {
        goldenCell.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'; // Эффект "отскока"
        goldenCell.style.opacity = '1';
        goldenCell.style.transform = 'translate(-50%, -50%) scale(1)';
        
        // Создаем эффект вспышки при появлении
        createOmEffect(position);
        
        setTimeout(() => {
            positionGoldenCell(position);
        }, 500);
    }, 100);
}

// Обновляем функцию создания эффекта Ом для более яркого эффекта
function createOmEffect(cellNumber) {
    const boardContainer = document.querySelector('.board-container');
    
    // Создаем несколько эффектов Ом с разными размерами и задержками
    for (let i = 0; i < 3; i++) {
        const effect = document.createElement('div');
        effect.className = 'om-effect';
        
        // Вычисляем позицию эффекта (так же как для фишки)
        const row = 7 - Math.floor((cellNumber - 1) / 9);
        let col = ((7 - row) % 2 === 0) ? 
            (cellNumber - 1) % 9 : 
            8 - ((cellNumber - 1) % 9);
        
        const left = col * 11.1 + 5.55;
        const top = row * 12.5 + 6.25;
        effect.style.left = `${left}%`;
        effect.style.top = `${top}%`;
        effect.style.animationDelay = `${i * 0.2}s`; // Задержка для каждого следующего эффекта
        
        boardContainer.appendChild(effect);
        
        // Удаляем эффект после завершения анимации
        setTimeout(() => effect.remove(), 1500 + i * 200);
    }
}

// Функция для создания эффекта стрелы (подъема)
function createArrowEffect(from, to) {
    const boardContainer = document.querySelector('.board-container');
    
    // Вычисляем позицию стартовой клетки
    const fromRow = 7 - Math.floor((from - 1) / 9);
    const fromCol = ((7 - fromRow) % 2 === 0) ? 
        (from - 1) % 9 : 
        8 - ((from - 1) % 9);
    
    const left = fromCol * 11.1 + 5.55;
    const top = fromRow * 12.5 + 6.25;
    
    // Создаем несколько волн света
    for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.className = 'light-wave';
        
        wave.style.left = `${left}%`;
        wave.style.top = `${top}%`;
        wave.style.animationDelay = `${i * 0.2}s`;
        
        boardContainer.appendChild(wave);
        
        // Удаляем волну после завершения анимации
        setTimeout(() => wave.remove(), 1500);
    }
}

// Функция для создания эффекта змеи (падения)
function createSnakeEffect(from, to) {
    const boardContainer = document.querySelector('.board-container');
    
    // Вычисляем позицию стартовой клетки
    const fromRow = 7 - Math.floor((from - 1) / 9);
    const fromCol = ((7 - fromRow) % 2 === 0) ? 
        (from - 1) % 9 : 
        8 - ((from - 1) % 9);
    
    const left = fromCol * 11.1 + 5.55;
    const top = fromRow * 12.5 + 6.25;
    
    // Создаем портал змеи
    const portal = document.createElement('div');
    portal.className = 'snake-portal';
    
    portal.style.left = `${left}%`;
    portal.style.top = `${top}%`;
    
    boardContainer.appendChild(portal);
    
    // Создаем волны темной энергии
    for (let i = 0; i < 3; i++) {
        const darkWave = document.createElement('div');
        darkWave.className = 'dark-energy';
        
        darkWave.style.left = `${left}%`;
        darkWave.style.top = `${top}%`;
        darkWave.style.animationDelay = `${i * 0.2}s`;
        
        boardContainer.appendChild(darkWave);
        
        // Удаляем волну после завершения анимации
        setTimeout(() => darkWave.remove(), 1500);
    }
    
    // Удаляем портал после завершения анимации
    setTimeout(() => portal.remove(), 1500);
}

// Обновляем функцию перемещения фишки
function moveGoldenCell(from, to) {
    const goldenCell = document.querySelector('.golden-cell');
    if (!goldenCell) return;

    console.log(`Перемещение фишки: ${from} -> ${to}`);
    
    // Перемещаем фишку на новую позицию
    positionGoldenCell(to);
    createOmEffect(to);
    
    // ПРОВЕРЯЕМ наличие специального перемещения сразу после хода
    if (specialMoves[to]) {
        // Получаем конечную позицию
        const specialDestination = specialMoves[to];
        const isCellSnake = specialDestination < to;
        const specialType = isCellSnake ? "змея" : "стрела";
        
        console.log(`СПЕЦИАЛЬНОЕ ПЕРЕМЕЩЕНИЕ (${specialType}): с клетки ${to} на клетку ${specialDestination}`);
        
        // Добавляем эффекты в зависимости от типа специального перемещения
        if (isCellSnake) {
            // Эффект змеи (падения)
            goldenCell.classList.add('snake-effect');
            createSnakeEffect(to, specialDestination);
        } else {
            // Эффект стрелы (подъема)
            goldenCell.classList.add('ladder-effect');
            createArrowEffect(to, specialDestination);
        }
        
        // Добавляем небольшую задержку перед специальным перемещением
        setTimeout(() => {
            // Перемещаем фишку по специальному маршруту
            positionGoldenCell(specialDestination);
            createOmEffect(specialDestination);
            
            // Обновляем атрибут с номером текущей клетки
            goldenCell.setAttribute('data-number', specialDestination.toString());
            
            // Обновляем сообщение
            const message = document.querySelector('.message');
            if (isCellSnake) {
                message.textContent = `Ой! Змея! Перемещение с клетки ${to} на клетку ${specialDestination}`;
                message.style.color = '#ff4444';
            } else {
                message.textContent = `Ура! Стрела! Перемещение с клетки ${to} на клетку ${specialDestination}`;
                message.style.color = '#44ff44';
            }
            
            // Возвращаем обычный цвет сообщению через некоторое время
            setTimeout(() => {
                message.style.color = '';
            }, 2000);
            
            // Удаляем классы эффектов
            goldenCell.classList.remove('snake-effect', 'ladder-effect');
        }, 1000);
    } else {
        // Обычный ход - сохраняем текущую позицию
        goldenCell.setAttribute('data-number', to.toString());
    }
}

// Исправляем функцию броска кубика, чтобы корректно отображать и регистрировать значения
function forceRollDice() {
    console.log("Бросаем кубик...");
    
    // Находим текстовый кубик
    const dice = document.getElementById('game-dice');
    
    if (!dice) {
        console.error("Кубик не найден!");
        return;
    }
    
    // Если кубик в режиме перезапуска и игрок на финальной клетке 68
    if (dice.classList.contains('restart-dice') && window.playerReachedFinal) {
        console.log("Перезапускаем игру после достижения финальной клетки");
        restartGame();
        return;
    }
    
    // Блокируем повторные клики во время анимации
    if (dice.classList.contains('rolling')) {
        return;
    }
    
    // Добавляем классы для анимации
    dice.classList.add('rolling', 'dice-glow');
    
    // Если это первый клик, меняем "Click" на число
    if (isFirstClick) {
        // Удаляем класс приглашения
        dice.classList.remove('click-invite');
        isFirstClick = false;
    }
    
    // Генерируем случайное число от 1 до 6
    const result = Math.floor(Math.random() * 6) + 1;
    console.log("Выпало число:", result);
    
    // Обновляем текст на кубике и обрабатываем результат через 0.5 секунды
    setTimeout(() => {
        // Если кубик не в режиме перезапуска, обновляем текст
        if (!dice.classList.contains('restart-dice')) {
            // Находим текстовый элемент в кубике (может быть click-text или dice-number)
            const textElement = dice.querySelector('.click-text, .dice-number');
            
            // Если текстовый элемент - это приглашение click, меняем его на dice-number
            if (textElement && textElement.classList.contains('click-text')) {
                textElement.classList.remove('click-text');
                textElement.classList.add('dice-number');
            }
            
            // Обновляем текст
            if (textElement) {
                textElement.textContent = result;
            }
        }
        
        // Удаляем классы анимации
        dice.classList.remove('rolling', 'dice-glow');
        
        // Обрабатываем результат броска
        processGameLogic(result);
    }, 500);
}

// Обновляем функцию для обработки специальных перемещений
function handleGameMove(from, to, diceResult) {
    const message = document.querySelector('.message');
    
    console.log(`Исходная позиция: ${from}, новая позиция по кубику: ${to}`);
    
    // Если новая позиция превышает 72, устанавливаем позицию на 72
    if (to > 72) {
        console.log(`Позиция ${to} больше 72, ставим на последнюю клетку`);
        to = 72;
    }
    
    // Перемещаем фишку на новую позицию
    moveGoldenCell(from, to);
    
    // Обновляем описание клетки в БОК
    if (cellDescriptions[to]) {
        updateBoxContent(cellDescriptions[to].title, cellDescriptions[to].text);
    } else {
        // Если описание для клетки отсутствует, используем общее описание
        updateBoxContent(
            `Клетка ${to}`, 
            `Вы находитесь на клетке ${to}. Продолжайте свой духовный путь.`
        );
    }
    
    // Проверяем, попали ли мы на клетку с чакрой
    if (chakraCells[to]) {
        const chakraInfo = chakraCells[to];
        console.log(`ЧАКРА! Попадание на клетку ${to} - ${chakraInfo.name}`);
        
        // Отображаем сообщение о чакре
        message.textContent = `Вы активировали чакру на клетке ${to} - ${chakraInfo.name}!`;
        message.style.color = chakraInfo.color;
        
        // Создаем эффект чакры
        createChakraEffect(to);
        
        // Через 3 секунды возвращаем обычный цвет сообщения
        setTimeout(() => {
            message.style.color = '';
        }, 3000);
    }
    
    // Проверяем специальные клетки (стрелы и змеи)
    if (specialMoves[to]) {
        const specialPosition = specialMoves[to];
        
        // Добавляем небольшую задержку перед специальным перемещением
        setTimeout(() => {
            console.log(`Специальное перемещение с клетки ${to} на клетку ${specialPosition}`);
            
            // Определяем тип перемещения
            const isSnake = specialPosition < to;
            
            // Отображаем соответствующее сообщение
            if (isSnake) {
                message.textContent = `Змея! Вы спускаетесь с клетки ${to} на клетку ${specialPosition}.`;
                message.style.color = '#ff4444'; // Красный цвет для змеи
                
                // Воспроизводим звук змеи
                playSound('snake'); 
            } else {
                message.textContent = `Стрела! Вы поднимаетесь с клетки ${to} на клетку ${specialPosition}.`;
                message.style.color = '#44ff44'; // Зеленый цвет для стрелы
                
                // Воспроизводим звук стрелы
                playSound('ladder');
            }
            
            // Перемещаем фишку по особому маршруту
            moveGoldenCell(to, specialPosition);
            
            // Обновляем описание для новой позиции после специального перемещения
            if (cellDescriptions[specialPosition]) {
                updateBoxContent(cellDescriptions[specialPosition].title, cellDescriptions[specialPosition].text);
            } else {
                updateBoxContent(
                    `Клетка ${specialPosition}`, 
                    `Вы находитесь на клетке ${specialPosition}. Продолжайте свой духовный путь.`
                );
            }
            
            // Через 3 секунды возвращаем обычный цвет сообщения
            setTimeout(() => {
                message.style.color = '';
            }, 3000);
            
            // Если в новой позиции есть чакра, активируем её
            if (chakraCells[specialPosition]) {
                setTimeout(() => {
                    createChakraEffect(specialPosition);
                }, 1000);
            }
        }, 1500);
    }
}

// Функция для создания эффекта чакры
function createChakraEffect(cellNumber) {
    const boardContainer = document.querySelector('.board-container');
    if (!boardContainer) return;
    
    // Удаляем предыдущие эффекты, если они есть
    const existingEffects = document.querySelectorAll('.chakra-glow');
    existingEffects.forEach(effect => effect.remove());
    
    console.log(`Создаем эффект чакры для клетки ${cellNumber} в стиле Ом`);
    
    // Вычисляем позицию клетки
    const row = 7 - Math.floor((cellNumber - 1) / 9);
    let col = ((7 - row) % 2 === 0) ? 
        (cellNumber - 1) % 9 : 
        8 - ((cellNumber - 1) % 9);
    
    const left = col * 11.1 + 5.55;
    const top = row * 12.5 + 6.25;
    
    // Создаем эффект свечения чакры в стиле Ом
    const chakraGlow = document.createElement('div');
    chakraGlow.className = `chakra-glow chakra-${cellNumber} chakra-pulse`;
    
    // Устанавливаем начальную позицию в центре клетки
    chakraGlow.style.transformOrigin = `${left}% ${top}%`;
    
    boardContainer.appendChild(chakraGlow);
    
    // Создаем расширенный эффект с частицами в стиле Ом
    createEnhancedChakraParticles(left, top, cellNumber);
    
    // Добавляем звуковой эффект при активации чакры
    playChakraSound(cellNumber);
    
    // Добавляем временный эффект размытия для всей доски
    addTemporaryBoardEffect(cellNumber);
    
    // Таймер для повторения эффекта через 30 секунд
    scheduleChakraRepeat(cellNumber);
}

// Функция для создания улучшенных частиц чакры в стиле Ом
function createEnhancedChakraParticles(centerX, centerY, cellNumber) {
    const boardContainer = document.querySelector('.board-container');
    if (!boardContainer) return;
    
    // Устанавливаем цвета в соответствии с традиционными цветами чакр
    let primaryColor, secondaryColor, tertiaryColor;
    
    switch(parseInt(cellNumber)) {
        case 5: // Муладхара (красная)
            primaryColor = "#FF0000";
            secondaryColor = "#FF5555";
            tertiaryColor = "#8B0000";
            break;
        case 14: // Свадхистхана (оранжевая)
            primaryColor = "#FF8C00";
            secondaryColor = "#FFA54F";
            tertiaryColor = "#CD5C00";
            break;
        case 23: // Манипура (желтая)
            primaryColor = "#FFD700";
            secondaryColor = "#FFEC8B";
            tertiaryColor = "#CCCC00";
            break;
        case 32: // Анахата (зеленая)
            primaryColor = "#2ECC71";
            secondaryColor = "#7FFFD4";
            tertiaryColor = "#27AE60";
            break;
        case 41: // Вишудха (голубая)
            primaryColor = "#3498DB";
            secondaryColor = "#87CEFA";
            tertiaryColor = "#2980B9";
            break;
        case 50: // Аджна (индиго)
            primaryColor = "#5D3FD3";
            secondaryColor = "#9370DB";
            tertiaryColor = "#4B0082";
            break;
        case 59: // Сахасрара (фиолетовая/пурпурная)
            primaryColor = "#AD44E9";
            secondaryColor = "#DA70D6";
            tertiaryColor = "#8A2BE2";
            break;
        default:
            primaryColor = "#FFD700"; // Золотой по умолчанию
            secondaryColor = "#FFEC8B";
            tertiaryColor = "#DAA520";
    }
    
    // Создаем центральную вспышку
    const centralGlow = document.createElement('div');
    centralGlow.className = 'central-chakra-glow';
    centralGlow.style.left = `${centerX}%`;
    centralGlow.style.top = `${centerY}%`;
    centralGlow.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    centralGlow.style.boxShadow = `0 0 15px ${primaryColor}, 0 0 30px ${secondaryColor}, 0 0 45px ${tertiaryColor}`;
    
    boardContainer.appendChild(centralGlow);
    
    // Создаем множество внутренних частиц (быстрые, ближе к центру)
    for (let i = 0; i < 18; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'chakra-particle chakra-particle-inner';
            
            // Создаем цветок из частиц (геометрически правильный узор)
            const numberOfPetals = 6;
            const angle = (i % numberOfPetals) * (2 * Math.PI / numberOfPetals) + (Math.random() * 0.2);
            const distance = Math.random() * 5 + (i / 18) * 8; // Меньшее расстояние для внутренних частиц
            
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            
            // Размер и цвет в зависимости от положения
            const size = 5 + Math.random() * 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Выбираем цвет на основе положения в цветке
            const colorIndex = i % 3;
            let particleColor;
            if (colorIndex === 0) particleColor = primaryColor;
            else if (colorIndex === 1) particleColor = secondaryColor;
            else particleColor = tertiaryColor;
            
            particle.style.backgroundColor = particleColor;
            particle.style.boxShadow = `0 0 5px ${particleColor}, 0 0 10px ${particleColor}`;
            
            boardContainer.appendChild(particle);
            
            // Удаляем частицу после завершения анимации
            setTimeout(() => particle.remove(), 4000);
        }, i * 80);
    }
    
    // Создаем множество внешних частиц (медленные, дальше от центра)
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'chakra-particle chakra-particle-outer';
            
            // Создаем внешний ореол из частиц
            const angle = i * (2 * Math.PI / 12) + (Math.random() * 0.3);
            const distance = 15 + Math.random() * 10; // Большее расстояние для внешних частиц
            
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            
            // Размер и цвет в зависимости от положения
            const size = 7 + Math.random() * 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Внешние частицы более прозрачные
            const colorIndex = i % 3;
            let particleColor;
            if (colorIndex === 0) particleColor = primaryColor;
            else if (colorIndex === 1) particleColor = secondaryColor;
            else particleColor = tertiaryColor;
            
            particle.style.backgroundColor = particleColor;
            particle.style.boxShadow = `0 0 8px ${particleColor}, 0 0 16px ${secondaryColor}`;
            
            boardContainer.appendChild(particle);
            
            // Удаляем частицу после завершения анимации
            setTimeout(() => particle.remove(), 6000);
        }, 500 + i * 120); // Начинаем создание внешних частиц с задержкой
    }
}

// Функция для временного эффекта на игровой доске
function addTemporaryBoardEffect(cellNumber) {
    const gameBoard = document.querySelector('.game-board');
    if (!gameBoard) return;
    
    // Определяем фильтр на основе цвета чакры
    let hueRotate, saturation;
    
    switch(parseInt(cellNumber)) {
        case 5: // Красный
            hueRotate = '0deg';
            saturation = '250%';
            break;
        case 14: // Оранжевый
            hueRotate = '30deg';
            saturation = '250%';
            break;
        case 23: // Желтый
            hueRotate = '60deg';
            saturation = '250%';
            break;
        case 32: // Зеленый
            hueRotate = '120deg';
            saturation = '250%';
            break;
        case 41: // Голубой
            hueRotate = '180deg';
            saturation = '250%';
            break;
        case 50: // Индиго
            hueRotate = '240deg';
            saturation = '250%';
            break;
        case 59: // Фиолетовый
            hueRotate = '270deg';
            saturation = '250%';
            break;
        default:
            hueRotate = '45deg';
            saturation = '200%';
    }
    
    // Запоминаем оригинальный фильтр
    const originalFilter = gameBoard.style.filter;
    
    // Плавно применяем новый фильтр
    gameBoard.style.transition = 'filter 2s ease-in-out';
    gameBoard.style.filter = `brightness(120%) contrast(110%) saturate(${saturation}) hue-rotate(${hueRotate})`;
    
    // Через некоторое время возвращаем оригинальный фильтр
    setTimeout(() => {
        gameBoard.style.filter = originalFilter;
        // Через 2 секунды убираем переход для мгновенных изменений в будущем
        setTimeout(() => {
            gameBoard.style.transition = '';
        }, 2000);
    }, 8000);
}

// Функция для воспроизведения звука чакры
function playChakraSound(cellNumber) {
    try {
        // Выбор звука в зависимости от номера чакры
        const chakraSound = new Audio('sounds/chakra.mp3');
        chakraSound.volume = 0.3;
        
        // Пробуем воспроизвести звук, но игнорируем ошибки
        chakraSound.play().catch(() => {
            // Тихо игнорируем ошибку автовоспроизведения
        });
    } catch (e) {
        // Игнорируем ошибки, если звук не доступен
    }
}

// Функция для создания частиц света с более точными цветами
function createChakraParticles(centerX, centerY, cellNumber) {
    const boardContainer = document.querySelector('.board-container');
    if (!boardContainer) return;
    
    // Устанавливаем цвета в соответствии с традиционными цветами чакр
    let primaryColor, secondaryColor;
    
    switch(parseInt(cellNumber)) {
        case 5: // Муладхара (красная)
            primaryColor = "#FF0000";
            secondaryColor = "#8B0000";
            break;
        case 14: // Свадхистхана (оранжевая)
            primaryColor = "#FF8C00";
            secondaryColor = "#CD5C00";
            break;
        case 23: // Манипура (желтая)
            primaryColor = "#FFD700";
            secondaryColor = "#CCCC00";
            break;
        case 32: // Анахата (зеленая)
            primaryColor = "#2ECC71";
            secondaryColor = "#27AE60";
            break;
        case 41: // Вишудха (голубая)
            primaryColor = "#3498DB";
            secondaryColor = "#2980B9";
            break;
        case 50: // Аджна (индиго)
            primaryColor = "#5D3FD3";
            secondaryColor = "#4B0082";
            break;
        case 59: // Сахасрара (фиолетовая/пурпурная)
            primaryColor = "#AD44E9";
            secondaryColor = "#8A2BE2";
            break;
        default:
            primaryColor = "#FFD700"; // Золотой по умолчанию
            secondaryColor = "#DAA520";
    }
    
    // Создаем множество частиц с разными задержками
    for (let i = 0; i < 24; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'chakra-particle';
            
            // Создаем более интересный узор - частицы распространяются в виде лепестков
            const numberOfPetals = 6;
            const angle = (i % numberOfPetals) * (2 * Math.PI / numberOfPetals) + (Math.random() * 0.3);
            const distance = Math.random() * 10 + (i / 24) * 15; // Увеличиваем расстояние для внешних частиц
            
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            
            // Чередуем основной и вторичный цвета для более интересного эффекта
            const particleColor = i % 2 === 0 ? primaryColor : secondaryColor;
            const size = 4 + Math.random() * 4; // Различные размеры частиц
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = particleColor;
            particle.style.boxShadow = `0 0 5px ${primaryColor}, 0 0 10px ${secondaryColor}`;
            
            // Добавляем уникальную анимацию для каждой частицы
            particle.style.animationDuration = `${2 + Math.random() * 2}s`;
            
            boardContainer.appendChild(particle);
            
            // Удаляем частицу после завершения анимации
            setTimeout(() => particle.remove(), 3000);
        }, i * 100); // Равномерно распределяем создание частиц
    }
    
    // Создаем центральную вспышку
    const centralGlow = document.createElement('div');
    centralGlow.className = 'central-chakra-glow';
    centralGlow.style.left = `${centerX}%`;
    centralGlow.style.top = `${centerY}%`;
    centralGlow.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    centralGlow.style.boxShadow = `0 0 15px ${primaryColor}, 0 0 30px ${secondaryColor}`;
    
    boardContainer.appendChild(centralGlow);
    
    // Удаляем центральную вспышку после завершения анимации
    setTimeout(() => centralGlow.remove(), 2000);
}

// Функция для планирования повторения эффекта чакры
function scheduleChakraRepeat(cellNumber) {
    // Через 10 секунд запускаем анимацию исчезновения
    setTimeout(() => {
        const chakraGlow = document.querySelector(`.chakra-glow.chakra-${cellNumber}`);
        if (chakraGlow) {
            chakraGlow.style.animation = 'chakraFadeOut 2s ease-in-out forwards';
            
            // После завершения анимации исчезновения удаляем элемент
            setTimeout(() => {
                if (chakraGlow && chakraGlow.parentNode) {
                    chakraGlow.remove();
                }
            }, 2000);
        }
    }, 10000);
    
    // Через 30 секунд повторяем эффект
    setTimeout(() => {
        // Проверяем, что фишка все еще на этой клетке
        const goldenCell = document.querySelector('.golden-cell');
        if (goldenCell && parseInt(goldenCell.getAttribute('data-number')) === cellNumber) {
            createChakraEffect(cellNumber);
        }
    }, 30000);
}

// Добавляем проверку чакр в processGameLogic
function processGameLogic(result) {
    const message = document.querySelector('.message');
    
    console.log("processGameLogic: получено значение кубика:", result);
    
    if (!gameStarted) {
        console.log("Игра еще не началась, проверяем выпала ли 6...");
        
        // Игра ещё не началась, проверяем выпала ли 6
        if (result === 6) {
            gameStarted = true;
            firstSixRolled = true;
            
            console.log("Выпала 6! Игра начинается!");
            
            // Обновляем сообщение
            if (message) {
                message.textContent = "Выпала 6! Ваше путешествие начинается!";
                message.style.color = 'green';
                
                setTimeout(() => {
                    message.style.color = '';
                }, 3000);
            }
            
            // Обновляем БОК с описанием для клетки 6
            if (cellDescriptions[6]) {
                updateBoxContent(cellDescriptions[6].title, cellDescriptions[6].text);
            } else {
                updateBoxContent(
                    "Начало пути", 
                    "Вы покидаете состояние Рождения и начинаете свое духовное путешествие с клетки 6."
                );
            }
            
            // Заменяем фишку рождения на игровую фишку
            const birthCell = document.querySelector('.birth-cell');
            if (birthCell) {
                // Создаем анимацию трансформации
                createBirthTransformation();
                
                // Через 2 секунды создаем золотую фишку на клетке 6
                setTimeout(() => {
                    createGoldenCell(6);
                    
                    // Создаем эффект победной анимации
                    createVictoryEffect(6);
                    
                    // Начинаем фоновую музыку
                    playBackgroundMusic();
                    
                    // Выключаем состояние рождения
                    birthState = false;
                }, 2000);
            }
        } else {
            // Не выпала 6, остаемся в состоянии рождения
            console.log("Выпало " + result + ", нужна 6 чтобы начать игру");
            
            // Обновляем сообщение
            if (message) {
                message.textContent = `Выпало ${result}. Чтобы начать игру, нужно выбросить 6.`;
            }
            
            // Обновляем БОК с информацией о состоянии Рождения (клетка 1)
            if (cellDescriptions[1]) {
                updateBoxContent(
                    cellDescriptions[1].title, 
                    `Выпало ${result}. ${cellDescriptions[1].text} Продолжайте бросать кубик, пока не выпадет 6.`
                );
            } else {
                updateBoxContent(
                    "Состояние Рождения", 
                    `Выпало ${result}. Вы всё еще находитесь в состоянии Рождения. Продолжайте бросать кубик, пока не выпадет 6, чтобы начать ваш путь.`
                );
            }
            
            // Добавляем эффект "волнения" фишки при неудачном броске
            createBirthPulse();
        }
    } else {
        // Обычный ход - в этой части удаляем все проверки связанные с клеткой 68
        console.log("Игра уже началась, обрабатываем обычный ход...");
        
        const goldenCell = document.querySelector('.golden-cell');
        if (!goldenCell) {
            console.error("ОШИБКА: Фишка не найдена!");
            return;
        }
        
        const currentPosition = parseInt(goldenCell.getAttribute('data-number'));
        const newPosition = currentPosition + result;
        
        console.log(`Текущая позиция: ${currentPosition}, новая позиция: ${newPosition}`);
        
        // Обновляем БОК с информацией о ходе
        updateBoxContent(
            "Перемещение", 
            `Вы бросили ${result} и перемещаетесь с клетки ${currentPosition} на клетку ${newPosition}.`
        );
        
        // Обработка хода с проверкой специальных перемещений и обновлением БОК
        handleGameMove(currentPosition, newPosition, result);
    }
}

// Функция для создания эффекта неудачного броска (перелета)
function createInvalidMoveEffect(cellNumber) {
    const boardContainer = document.querySelector('.board-container');
    
    // Добавляем красную волну вокруг фишки
    const wave = document.createElement('div');
    wave.className = 'invalid-move-wave';
    
    // Вычисляем позицию эффекта
    const row = 7 - Math.floor((cellNumber - 1) / 9);
    let col = ((7 - row) % 2 === 0) ? 
        (cellNumber - 1) % 9 : 
        8 - ((cellNumber - 1) % 9);
    
    const left = col * 11.1 + 5.55;
    const top = row * 12.5 + 6.25;
    
    wave.style.left = `${left}%`;
    wave.style.top = `${top}%`;
    
    boardContainer.appendChild(wave);
    
    // Временно добавляем красную пульсацию к фишке
    const goldenCell = document.querySelector('.golden-cell');
    if (goldenCell) {
        goldenCell.classList.add('invalid-move');
        setTimeout(() => goldenCell.classList.remove('invalid-move'), 1500);
    }
}

// Более надежная функция победы с проверкой наличия звука
function celebrateVictory() {
    // Создаем эффект победы
    const boardContainer = document.querySelector('.board-container');
    if (boardContainer) {
        // Добавляем эффект сияния вокруг клетки 68
        const victoryGlow = document.createElement('div');
        victoryGlow.className = 'victory-glow';
        
        // Находим позицию клетки 68
        const position = 68;
        const row = 7 - Math.floor((position - 1) / 9);
        let col = ((7 - row) % 2 === 0) ? 
            (position - 1) % 9 : 
            8 - ((position - 1) % 9);

        const left = col * 11.1 + 5.55;
        const top = row * 12.5 + 6.25;
        
        victoryGlow.style.left = `${left}%`;
        victoryGlow.style.top = `${top}%`;
        
        boardContainer.appendChild(victoryGlow);
        
        // Создаем много частиц для эффекта фейерверка
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'victory-particle';
                
                // Случайное положение в пределах игрового поля
                const randomLeft = Math.random() * 100;
                const randomTop = Math.random() * 100;
                
                particle.style.left = `${randomLeft}%`;
                particle.style.top = `${randomTop}%`;
                
                // Случайный цвет
                const hue = Math.floor(Math.random() * 360);
                particle.style.backgroundColor = `hsl(${hue}, 100%, 60%)`;
                
                // Случайный размер
                const size = 3 + Math.random() * 8;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                boardContainer.appendChild(particle);
                
                // Удаляем частицу после анимации
                setTimeout(() => particle.remove(), 2000);
            }, i * 50); // Запускаем с небольшой задержкой для непрерывного эффекта
        }
        
        // ИСПРАВЛЕНИЕ: Проверяем существование файла перед воспроизведением
        const checkAudioExists = (url) => {
            return new Promise((resolve) => {
                const xhr = new XMLHttpRequest();
                xhr.open('HEAD', url, true);
                xhr.onload = () => {
                    resolve(xhr.status < 400);
                };
                xhr.onerror = () => {
                    resolve(false);
                };
                xhr.send();
            });
        };
        
        // Пытаемся воспроизвести звук, но не выводим ошибки в консоль
        checkAudioExists('victory-sound.mp3').then(exists => {
            if (exists) {
                const victorySound = new Audio('victory-sound.mp3');
                victorySound.volume = 0.5;
                victorySound.play().catch(() => {
                    // Тихо пропускаем ошибку
                });
            } else {
                console.log("Звук победы отсутствует - используем визуальные эффекты");
            }
        });
    }
}

// Обновляем функцию сообщения, учитывая новые правила
function updateMessage(diceResult) {
    const message = document.querySelector('.message');
    const goldenCell = document.querySelector('.golden-cell');
    
    // Обновляем сообщение только для стандартных случаев
    // В специальных случаях сообщения формируются непосредственно в handleDiceResult
    if (!gameStarted) {
        if (diceResult === 6) {
            // Не обновляем сообщение здесь, это делается в handleDiceResult
        } else {
            message.textContent = `Выпало ${diceResult}. Бросайте кубик, пока не выпадет 6, чтобы войти в игру.`;
        }
    } else if (goldenCell) {
        const currentPosition = parseInt(goldenCell.getAttribute('data-number'));
        const newPosition = currentPosition + diceResult;
        
        if (newPosition <= 68) {
            message.textContent = `Выпало ${diceResult}! Ход с клетки ${currentPosition} на клетку ${newPosition}`;
        } else {
            message.textContent = `Выпало ${diceResult}, но это слишком много! Для победы нужно ровное попадание на клетку 68.`;
        }
    }
}

// Функция для проверки и вывода всех специальных перемещений
function logSpecialMoves() {
    console.log("=== НАСТРОЙКИ СПЕЦИАЛЬНЫХ ПЕРЕМЕЩЕНИЙ ===");
    
    // Выводим все стрелы (лестницы, ведущие вверх)
    console.log("СТРЕЛЫ (вверх):");
    Object.entries(specialMoves).forEach(([from, to]) => {
        if (parseInt(from) < parseInt(to)) {
            console.log(`  Клетка ${from} → Клетка ${to}`);
        }
    });
    
    // Выводим все змеи (ведущие вниз)
    console.log("ЗМЕИ (вниз):");
    Object.entries(specialMoves).forEach(([from, to]) => {
        if (parseInt(from) > parseInt(to)) {
            console.log(`  Клетка ${from} → Клетка ${to}`);
        }
    });
    
    console.log("=====================================");
}

// Добавим функцию для проверки корректности специальных перемещений
function validateSpecialMoves() {
    console.log("=== ПРОВЕРКА СПЕЦИАЛЬНЫХ ПЕРЕМЕЩЕНИЙ ===");
    
    // Проверяем стрелы (лестницы, ведущие вверх)
    console.log("СТРЕЛЫ (проверка):");
    Object.entries(specialMoves).forEach(([from, to]) => {
        if (parseInt(from) < parseInt(to)) {
            console.log(`  Клетка ${from} → Клетка ${to} (${cellNames[from]} → ${cellNames[to]})`);
        }
    });
    
    // Проверяем стрелу из клетки 20
    if (specialMoves[20]) {
        console.log(`  ОСОБОЕ ВНИМАНИЕ: Клетка 20 → Клетка ${specialMoves[20]} (${cellNames[20]} → ${cellNames[specialMoves[20]]})`);
    } else {
        console.error("  ОШИБКА: Клетка 20 не имеет специального перемещения!");
    }
    
    // Проверяем все змеи
    console.log("ЗМЕИ (проверка):");
    Object.entries(specialMoves).forEach(([from, to]) => {
        if (parseInt(from) > parseInt(to)) {
            console.log(`  Клетка ${from} → Клетка ${to} (${cellNames[from]} → ${cellNames[to]})`);
        }
    });
    
    console.log("======================================");
}

// Инициализация фоновой музыки
function initBackgroundMusic() {
    // Проверяем, существует ли уже элемент audio
    backgroundMusic = document.getElementById('background-music');
    
    // Если элемент отсутствует, создаем его
    if (!backgroundMusic) {
        backgroundMusic = document.createElement('audio');
        backgroundMusic.id = 'background-music';
        
        // ИСПРАВЛЯЕМ! Добавляем расширение файла
        backgroundMusic.src = 'background-music.mp3'; // Расширение .mp3
        
        // На случай, если не .mp3, добавим дополнительные источники
        const sourceMP3 = document.createElement('source');
        sourceMP3.src = 'background-music.mp3';
        sourceMP3.type = 'audio/mpeg';
        
        const sourceOGG = document.createElement('source');
        sourceOGG.src = 'background-music.ogg';
        sourceOGG.type = 'audio/ogg';
        
        const sourceWAV = document.createElement('source');
        sourceWAV.src = 'background-music.wav';
        sourceWAV.type = 'audio/wav';
        
        backgroundMusic.appendChild(sourceMP3);
        backgroundMusic.appendChild(sourceOGG);
        backgroundMusic.appendChild(sourceWAV);
        
        backgroundMusic.loop = true; // Зацикливаем музыку
        backgroundMusic.volume = 0.5; // Устанавливаем громкость на 50%
        document.body.appendChild(backgroundMusic);
        
        console.log("Фоновая музыка инициализирована");
    }
}

// Улучшаем функцию воспроизведения музыки с более детальной обработкой ошибок
function playBackgroundMusic() {
    if (backgroundMusic) {
        try {
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log("Фоновая музыка запущена успешно");
                    })
                    .catch(error => {
                        console.warn("Проблема с воспроизведением музыки:", error.message);
                        
                        // Автоматическая попытка повторного воспроизведения через 1 секунду
                        setTimeout(() => {
                            console.log("Повторная попытка воспроизведения...");
                            backgroundMusic.play()
                                .catch(e => console.error("Повторная попытка не удалась:", e.message));
                        }, 1000);
                    });
            }
        } catch (error) {
            console.error("Ошибка при воспроизведении музыки:", error.message);
        }
    } else {
        console.warn("Элемент фоновой музыки не найден");
    }
}

// Пауза фоновой музыки
function pauseBackgroundMusic() {
    if (backgroundMusic && !backgroundMusic.paused) {
        backgroundMusic.pause();
        console.log("Фоновая музыка приостановлена");
    }
}

// Создаем специальную фишку для состояния "Рождение"
function createBirthCell(position) {
    // Удаляем существующую фишку, если она есть
    const existingCell = document.querySelector('.golden-cell, .birth-cell');
    if (existingCell) {
        existingCell.remove();
    }

    const birthCell = document.createElement('div');
    birthCell.className = 'birth-cell';
    birthCell.setAttribute('data-number', position);
    
    document.querySelector('.board-container').appendChild(birthCell);

    // Позиционируем фишку на клетке "Рождение"
    const row = 7 - Math.floor((position - 1) / 9);
    let col = ((7 - row) % 2 === 0) ? 
        (position - 1) % 9 : 
        8 - ((position - 1) % 9);

    const left = col * 11.1 + 5.55;
    const top = row * 12.5 + 6.25;
    
    birthCell.style.left = `${left}%`;
    birthCell.style.top = `${top}%`;
    
    // Создаем эффект ауры вокруг фишки рождения
    createBirthAura(position);
}

// Создаем эффект ауры для фишки в состоянии "Рождение"
function createBirthAura(position) {
    const boardContainer = document.querySelector('.board-container');
    if (!boardContainer) return;
    
    // Создаем 3 слоя ауры разного размера и скорости
    for (let i = 0; i < 3; i++) {
        const aura = document.createElement('div');
        aura.className = 'birth-aura';
        aura.style.animationDuration = `${3 + i}s`; // Разная скорость для каждого слоя
        
        // Вычисляем позицию (так же как для фишки)
        const row = 7 - Math.floor((position - 1) / 9);
        let col = ((7 - row) % 2 === 0) ? 
            (position - 1) % 9 : 
            8 - ((position - 1) % 9);

        const left = col * 11.1 + 5.55;
        const top = row * 12.5 + 6.25;
        
        aura.style.left = `${left}%`;
        aura.style.top = `${top}%`;
        aura.style.width = `${40 + i * 15}px`; // Разный размер для каждого слоя
        aura.style.height = `${40 + i * 15}px`;
        
        boardContainer.appendChild(aura);
    }
    
    // Создаем частицы энергии, которые плавают вокруг фишки
    createBirthParticles(position);
}

// Оптимизация создания частиц для эффекта рождения
function createBirthParticles(position) {
    const boardContainer = document.querySelector('.board-container');
    if (!boardContainer) return;
    
    // Вычисляем базовую позицию (центр клетки)
    const row = 7 - Math.floor((position - 1) / 9);
    let col = ((7 - row) % 2 === 0) ? 
        (position - 1) % 9 : 
        8 - ((position - 1) % 9);

    const centerX = col * 11.1 + 5.55;
    const centerY = row * 12.5 + 6.25;
    
    // ОПТИМИЗАЦИЯ: Уменьшаем количество частиц и создаем их только один раз
    // Создаем 6-8 частиц (вместо 8-12)
    const particleCount = 6 + Math.floor(Math.random() * 3);
    
    // Счетчик для отслеживания активных частиц
    let activeParticlesCount = 0;
    
    // Максимальное количество активных частиц
    const MAX_ACTIVE_PARTICLES = 12;
    
    // Создаем начальные частицы
    for (let i = 0; i < particleCount; i++) {
        if (activeParticlesCount >= MAX_ACTIVE_PARTICLES) break;
        
        activeParticlesCount++;
        
        setTimeout(() => {
            // Только если мы все еще в состоянии рождения
            if (birthState) {
                const particle = document.createElement('div');
                particle.className = 'birth-particle';
                
                // Рассчитываем случайное начальное положение в пределах 3% от центра
                const offsetX = (Math.random() - 0.5) * 6;
                const offsetY = (Math.random() - 0.5) * 6;
                
                particle.style.left = `${centerX + offsetX}%`;
                particle.style.top = `${centerY + offsetY}%`;
                
                // Случайный цвет из духовной палитры
                const hue = 240 + Math.floor(Math.random() * 120); // Сине-фиолетовая гамма
                particle.style.backgroundColor = `hsla(${hue}, 100%, 70%, 0.7)`;
                
                // Случайный размер
                const size = 3 + Math.random() * 4;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Добавляем случайную анимацию
                particle.style.animationDuration = `${2 + Math.random() * 3}s`;
                particle.style.animationDelay = `${Math.random() * 2}s`;
                
                boardContainer.appendChild(particle);
                
                // Удаляем частицу после завершения анимации
                setTimeout(() => {
                    if (particle && particle.parentNode) {
                        particle.remove();
                        activeParticlesCount--;
                        
                        // ОПТИМИЗАЦИЯ: Создаем новую частицу только если общее число не превышает лимит
                        // и только с 50% вероятностью (для разнообразия эффекта)
                        if (birthState && activeParticlesCount < MAX_ACTIVE_PARTICLES && Math.random() > 0.5) {
                            // Создаем ОДНУ новую частицу вместо вызова createBirthParticles
                            createSingleBirthParticle(centerX, centerY, boardContainer);
                            activeParticlesCount++;
                        }
                    }
                }, 5000);
            }
        }, i * 100);
    }
}

// Новая функция для создания одной частицы (без рекурсии)
function createSingleBirthParticle(centerX, centerY, container) {
    if (!birthState || !container) return;
    
    const particle = document.createElement('div');
    particle.className = 'birth-particle';
    
    // Рассчитываем случайное начальное положение
    const offsetX = (Math.random() - 0.5) * 6;
    const offsetY = (Math.random() - 0.5) * 6;
    
    particle.style.left = `${centerX + offsetX}%`;
    particle.style.top = `${centerY + offsetY}%`;
    
    // Случайный цвет 
    const hue = 240 + Math.floor(Math.random() * 120);
    particle.style.backgroundColor = `hsla(${hue}, 100%, 70%, 0.7)`;
    
    // Случайный размер
    const size = 3 + Math.random() * 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Анимация
    particle.style.animationDuration = `${2 + Math.random() * 3}s`;
    
    container.appendChild(particle);
    
    // Удаляем частицу после анимации
    setTimeout(() => {
        if (particle && particle.parentNode) {
            particle.remove();
        }
    }, 5000);
}

// Создаем эффект трансформации при переходе от рождения к игре
function createBirthTransformation() {
    const birthCell = document.querySelector('.birth-cell');
    if (!birthCell) return;
    
    // Добавляем класс для анимации трансформации
    birthCell.classList.add('birth-transformation');
    
    // Создаем вспышку света
    const boardContainer = document.querySelector('.board-container');
    if (boardContainer) {
        const flash = document.createElement('div');
        flash.className = 'birth-flash';
        boardContainer.appendChild(flash);
        
        // Удаляем вспышку после анимации
        setTimeout(() => flash.remove(), 2000);
    }
    
    // Удаляем фишку рождения после анимации
    setTimeout(() => birthCell.remove(), 2000);
}

// Эффект пульсации при неудачном броске
function createBirthPulse() {
    const birthCell = document.querySelector('.birth-cell');
    if (!birthCell) return;
    
    // Добавляем класс для анимации пульсации
    birthCell.classList.add('birth-pulse');
    
    // Удаляем класс через некоторое время
    setTimeout(() => birthCell.classList.remove('birth-pulse'), 1000);
}

// Функция для обновления содержимого БОК
function updateBoxContent(title, text) {
    const boxTitle = document.querySelector('.box-title');
    const boxText = document.querySelector('.box-text');
    
    if (boxTitle && boxText) {
        // Добавляем класс для анимации обновления
        const boxContent = document.querySelector('.box-content');
        if (boxContent) {
            boxContent.style.animation = 'none';
            void boxContent.offsetWidth; // Перезапускаем анимацию
            boxContent.style.animation = 'fadeIn 1s ease-in-out';
        }
        
        // Обновляем содержимое
        boxTitle.textContent = title;
        boxText.textContent = text;
    }
}

// Инициализация БОК при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Обновляем БОК с описанием для клетки 1 (Рождение)
    if (cellDescriptions[1]) {
        updateBoxContent(cellDescriptions[1].title, cellDescriptions[1].text);
    } else {
        updateBoxContent(
            "Добро пожаловать!", 
            "Приветствую вас на пути духовного познания! Бросьте кубик, чтобы начать игру. Для старта необходимо выбросить 6 - тогда ваше путешествие начнется."
        );
    }
    
    // Добавляем пульсацию заголовка
    setTimeout(() => {
        const boxTitle = document.querySelector('.box-title');
        if (boxTitle) {
            boxTitle.style.animation = 'titlePulse 3s infinite';
        }
    }, 1000);
});

// Функция для обновления содержимого БОК при попадании на клетку
function updateCellDescription(cellNumber) {
    // Проверяем, есть ли описание для данной клетки
    if (cellDescriptions[cellNumber]) {
        // Обновляем содержимое БОК
        updateBoxContent(
            cellDescriptions[cellNumber].title,
            cellDescriptions[cellNumber].text
        );
    } else {
        // Если описание не найдено, показываем стандартное сообщение
        updateBoxContent(
            `Клетка ${cellNumber}`,
            `Вы находитесь на клетке ${cellNumber}. Продолжайте свой духовный путь.`
        );
    }
}

// В функцию, которая перемещает фишку на новую позицию, нужно добавить:
function movePlayer(newPosition) {
    // ... существующий код перемещения ...
    
    // Обновляем БОК с описанием текущей клетки
    updateCellDescription(newPosition);
    
    // ... остальной код ...
}

// Функция для создания эффекта достижения клетки 68 (План Абсолюта)
function createAbsoluteEffect() {
    console.log("Запускаем золотой эффект пресета Ом для клетки 68!");
    
    // Получаем игровую доску
    const gameBoard = document.querySelector('.game-board');
    if (!gameBoard) {
        console.error("Не найден элемент игровой доски (.game-board)");
        return;
    }
    
    // Применяем золотой эффект фильтра к игровому полю
    gameBoard.style.filter = "sepia(100%) saturate(400%) hue-rotate(10deg) brightness(150%)";
    gameBoard.style.animation = "pulseYellow 4s infinite";
    
    // Также применяем золотистое сияние к боковому блоку (БОК)
    const sideBox = document.querySelector('.cell-description-box');
    if (sideBox) {
        sideBox.style.filter = "sepia(100%) saturate(400%) hue-rotate(10deg) brightness(150%)";
        sideBox.style.animation = "pulseYellow 4s infinite";
        sideBox.style.boxShadow = "0 0 30px rgba(255, 215, 0, 0.7)";
        
        // Обновляем содержимое бокового блока
        const boxTitle = sideBox.querySelector('.box-title');
        const boxText = sideBox.querySelector('.box-text');
        
        if (boxTitle) {
            boxTitle.textContent = "План Абсолюта (Брахма-лока)";
            boxTitle.style.color = "gold";
            boxTitle.style.textShadow = "0 0 10px rgba(255, 215, 0, 0.7)";
        }
        
        if (boxText) {
            boxText.innerHTML = "План Абсолюта — это обитель Брахмы, где игрок понимает творение. Он продолжает игру для мокши.<br><br>Нажмите на кубик, чтобы начать новое путешествие.";
            boxText.style.color = "gold";
            boxText.style.textShadow = "0 0 5px rgba(255, 215, 0, 0.5)";
        }
    }
    
    // Добавляем стиль анимации, если его еще нет
    if (!document.getElementById('gold-animation-style')) {
        const style = document.createElement('style');
        style.id = 'gold-animation-style';
        style.textContent = `
            @keyframes pulseYellow {
                0% { filter: sepia(100%) saturate(400%) hue-rotate(10deg) brightness(150%); }
                50% { filter: sepia(100%) saturate(600%) hue-rotate(10deg) brightness(200%); }
                100% { filter: sepia(100%) saturate(400%) hue-rotate(10deg) brightness(150%); }
            }
            
            @keyframes overlayPulse {
                0% {
                    opacity: 0.4;
                    box-shadow: 0 0 30px 15px rgba(255,215,0,0.5), inset 0 0 30px 15px rgba(255,215,0,0.5);
                }
                50% {
                    opacity: 0.7;
                    box-shadow: 0 0 50px 25px rgba(255,215,0,0.7), inset 0 0 50px 25px rgba(255,215,0,0.7);
                }
                100% {
                    opacity: 0.4;
                    box-shadow: 0 0 30px 15px rgba(255,215,0,0.5), inset 0 0 30px 15px rgba(255,215,0,0.5);
                }
            }
            
            @keyframes messageGlow {
                0% {
                    color: gold;
                    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                }
                50% {
                    color: #FFF8DC;
                    text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.6);
                }
                100% {
                    color: gold;
                    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Создаем оверлей для золотого сияния
    const boardContainer = document.querySelector('.board-container');
    if (boardContainer) {
        // Удаляем существующий оверлей, если он есть
        const existingOverlay = document.querySelector('.gold-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        
        // Создаем новый оверлей
        const overlay = document.createElement('div');
        overlay.className = 'gold-overlay';
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,223,0,0.4) 30%, rgba(255,255,224,0.2) 60%, rgba(255,255,255,0) 80%)';
        overlay.style.zIndex = '90';
        overlay.style.pointerEvents = 'none';
        overlay.style.animation = 'overlayPulse 4s infinite alternate';
        
        boardContainer.appendChild(overlay);
    }
    
    // Обновляем сообщение и добавляем анимацию
    const messageElement = document.querySelector('.message');
    if (messageElement) {
        messageElement.textContent = "Поздравляем! Вы достигли Божественного Откровения, высшей цели духовного пути!";
        messageElement.style.animation = "messageGlow 3s infinite";
        messageElement.style.fontWeight = 'bold';
        messageElement.style.fontSize = '18px';
    }
    
    // Обновляем кубик с золотистым текстом "click"
    updateDiceForRestart();
    
    // Устанавливаем флаг, что игрок достиг финальной клетки
    window.playerReachedFinal = true;
}

// Новая функция для обновления кубика при достижении финальной клетки
function updateDiceForRestart() {
    console.log("Обновляем кубик для перезапуска игры");
    
    const dice = document.getElementById('game-dice');
    if (!dice) {
        console.error("Элемент кубика не найден");
        return;
    }
    
    // Очищаем содержимое кубика
    dice.innerHTML = '';
    
    // Создаем обычный элемент текста с "click" (БЕЗ золотистого стиля)
    const clickText = document.createElement('span');
    clickText.className = 'click-text'; // Убираем golden-click класс
    clickText.textContent = 'click';
    dice.appendChild(clickText);
    
    // Помечаем кубик для перезапуска, но сохраняем первоначальные классы
    dice.className = 'text-dice click-invite restart-dice';
    
    // Переопределяем обработчик клика для кубика
    dice.onclick = function() {
        console.log("Кубик нажат: перезапуск игры");
        restartGame();
    };
}

// Функция для перезапуска игры
function restartGame() {
    console.log("Перезапуск игры...");
    
    // Сбрасываем флаг финальной клетки
    window.playerReachedFinal = false;
    
    // Удаляем золотую фишку (если она есть)
    const goldenCell = document.querySelector('.golden-cell');
    if (goldenCell) {
        goldenCell.remove();
    }
    
    // Удаляем золотой оверлей
    const goldOverlay = document.querySelector('.gold-overlay');
    if (goldOverlay) {
        goldOverlay.remove();
    }
    
    // Сбрасываем стили игровой доски
    const gameBoard = document.querySelector('.game-board');
    if (gameBoard) {
        gameBoard.style.filter = '';
        gameBoard.style.animation = '';
    }
    
    // Сбрасываем стили бокового блока
    const sideBox = document.querySelector('.cell-description-box');
    if (sideBox) {
        sideBox.style.filter = '';
        sideBox.style.animation = '';
        sideBox.style.boxShadow = '';
        
        // Восстанавливаем содержимое бокового блока
        const boxTitle = sideBox.querySelector('.box-title');
        const boxText = sideBox.querySelector('.box-text');
        
        if (boxTitle) {
            boxTitle.textContent = "Добро пожаловать!";
            boxTitle.style.color = '';
            boxTitle.style.textShadow = '';
        }
        
        if (boxText) {
            boxText.innerHTML = "Приветствую вас на пути духовного познания! Бросьте кубик, чтобы начать игру. Для старта необходимо выбросить 6 - тогда ваше путешествие начнется.";
            boxText.style.color = '';
            boxText.style.textShadow = '';
        }
    }
    
    // Сбрасываем стили сообщения
    const messageElement = document.querySelector('.message');
    if (messageElement) {
        messageElement.textContent = "Бросьте кубик, чтобы начать игру";
        messageElement.style.animation = '';
        messageElement.style.color = '';
        messageElement.style.fontWeight = '';
        messageElement.style.fontSize = '';
        messageElement.style.textShadow = '';
    }
    
    // Восстанавливаем исходное состояние кубика с обычным стилем
    const dice = document.getElementById('game-dice');
    if (dice) {
        dice.innerHTML = '<span class="click-text">click</span>';
        
        // Восстанавливаем стандартные классы кубика
        dice.className = 'text-dice click-invite';
        
        // Восстанавливаем оригинальный обработчик клика
        dice.onclick = window.originalDiceClickHandler || function() {
            // Если нет оригинального обработчика, используем стандартную логику
            if (typeof window.rollDice === 'function') {
                window.rollDice();
            } else if (typeof window.forceRollDice === 'function') {
                window.forceRollDice();
            }
        };
    }
    
    // Сбрасываем позицию игрока
    window.currentPosition = 0;
    
    // Создаем начальную фишку на клетке "Рождение" (1)
    if (typeof window.createInitialPlayerToken === 'function') {
        window.createInitialPlayerToken();
    } else if (typeof window.createBirthCell === 'function') {
        window.createBirthCell(1);
    }
    
    // Сбрасываем флаги игры
    window.gameStarted = false;
    window.firstSixRolled = false;
    window.isFirstClick = true;
    
    console.log("Игра перезапущена. Готова к новому старту.");
}

// Переопределяем функцию для совместимости со старым кодом
function createAbsoluteEffect() {
    console.log("Создание эффекта абсолютного плана через переопределенную функцию");
    createGoldenEffect68();
}

// Функция для прямой интеграции с обработчиком перемещения игрока
function setupGoldenEffectTrigger() {
    console.log("Настраиваем триггер для золотого эффекта при достижении клетки 68");
    
    // 1. Сохраняем оригинальный обработчик клика на кубик
    const dice = document.getElementById('game-dice');
    if (dice && dice.onclick) {
        window.originalDiceClickHandler = dice.onclick;
    }
    
    // 2. Модифицируем существующую функцию перемещения (если она существует)
    if (typeof window.movePlayer === 'function') {
        const originalMovePlayer = window.movePlayer;
        window.movePlayer = function(steps) {
            const result = originalMovePlayer.apply(this, arguments);
            
            // Проверяем, достигли ли мы клетки 68
            if (window.currentPosition === 68) {
                console.log("Модифицированная movePlayer: игрок достиг клетки 68");
                setTimeout(createGoldenEffect68, 500);
            }
            
            return result;
        };
    }
    
    // 3. Перехватываем также другие известные функции перемещения
    if (typeof window.moveGoldenCell === 'function') {
        const originalMoveGolden = window.moveGoldenCell;
        window.moveGoldenCell = function(from, to) {
            const result = originalMoveGolden.apply(this, arguments);
            
            if (to === 68) {
                console.log("Модифицированная moveGoldenCell: фишка достигла клетки 68");
                setTimeout(createGoldenEffect68, 500);
            }
            
            return result;
        };
    }
    
    // 4. Регулярная проверка текущей позиции (как запасной вариант)
    const checkInterval = setInterval(function() {
        if (window.currentPosition === 68 && !window.playerReachedFinal) {
            console.log("Интервал обнаружил: игрок на клетке 68");
            createGoldenEffect68();
        }
    }, 1000);
}

// Запускаем настройку при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM загружен. Настраиваем золотой эффект клетки 68");
    
    // Удаляем тестовую кнопку, если она существует
    const testButton = document.getElementById('test-button-68');
    if (testButton) {
        console.log("Удаляем тестовую кнопку");
        testButton.remove();
    }
    
    // Настраиваем только триггер для эффекта
    setupGoldenEffectTrigger();
});

// Полностью удаляем функцию createTestButton68, так как она больше не нужна
// function createTestButton68() { ... } - удалена

// Функция для создания эффекта достижения клетки 68 (План Абсолюта)
function createGoldenEffect68() {
    console.log("Запускаем золотой эффект для клетки 68!");
    
    // Проверяем, не запущен ли уже эффект
    if (window.goldenEffectActive) {
        console.log("Золотой эффект уже активирован, пропускаем повторный запуск");
        return;
    }
    
    // Устанавливаем флаги, что игрок достиг финала
    window.playerReachedFinal = true;
    window.goldenEffectActive = true;
    
    // Получаем игровую доску
    const gameBoard = document.querySelector('.game-board');
    if (!gameBoard) {
        console.error("Не найден элемент игровой доски (.game-board)");
        return;
    }
    
    // Применяем золотой эффект фильтра к игровому полю
    gameBoard.style.filter = "sepia(100%) saturate(400%) hue-rotate(10deg) brightness(150%)";
    gameBoard.style.animation = "pulseGold 4s infinite";
    
    // Применяем золотистое сияние к боковому блоку (БОК)
    const sideBox = document.querySelector('.cell-description-box');
    if (sideBox) {
        sideBox.style.filter = "sepia(100%) saturate(400%) hue-rotate(10deg) brightness(150%)";
        sideBox.style.animation = "pulseGold 4s infinite";
        sideBox.style.boxShadow = "0 0 30px rgba(255, 215, 0, 0.7)";
        
        // Обновляем содержимое бокового блока
        const boxTitle = sideBox.querySelector('.box-title');
        const boxText = sideBox.querySelector('.box-text');
        
        if (boxTitle) {
            boxTitle.textContent = "План Абсолюта (Брахма-лока)";
            boxTitle.style.color = "gold";
            boxTitle.style.textShadow = "0 0 10px rgba(255, 215, 0, 0.7)";
        }
        
        if (boxText) {
            boxText.innerHTML = "План Абсолюта — это обитель Брахмы, где игрок осознаёт смысл творения. Вы достигли просветления.";
            boxText.style.color = "gold";
            boxText.style.textShadow = "0 0 5px rgba(255, 215, 0, 0.5)";
        }
    }
    
    // Создаем золотой оверлей поверх игрового поля
    const boardContainer = document.querySelector('.board-container');
    if (boardContainer) {
        // Проверяем, нет ли уже оверлея
        let overlay = document.querySelector('.gold-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'gold-overlay';
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.background = 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,223,0,0.2) 30%, rgba(255,255,224,0.1) 60%, rgba(255,255,255,0) 80%)';
            overlay.style.zIndex = '90';
            overlay.style.pointerEvents = 'none';
            overlay.style.animation = 'overlayPulse 4s infinite alternate';
            
            boardContainer.appendChild(overlay);
        }
    }
    
    // Обновляем сообщение и добавляем анимацию
    const messageElement = document.querySelector('.message');
    if (messageElement) {
        messageElement.textContent = "Поздравляем! Вы достигли Плана Абсолюта, высшей цели духовного пути!";
        messageElement.style.animation = "messageGlow 3s infinite";
        messageElement.style.fontWeight = 'bold';
        messageElement.style.fontSize = '18px';
        messageElement.style.color = 'gold';
        messageElement.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.7)';
        messageElement.style.padding = '10px';
        messageElement.style.marginTop = '30px';
    }
    
    // Обновляем кубик с золотистым текстом "click"
    const dice = document.getElementById('game-dice');
    if (dice) {
        dice.innerHTML = '<span class="click-text golden-click">click</span>';
        dice.className = 'text-dice click-invite golden-dice';
        
        // Отключаем обработчик клика для кубика на время показа эффекта
        const oldClickHandler = dice.onclick;
        dice.onclick = null;
        
        // Сохраняем флаг, что эффект уже активирован
        window.goldenEffectActive = true;
    }
    
    // Добавляем золотые частицы для эффекта
    createGoldenParticles();
    
    // Устанавливаем таймер для появления кнопки перезапуска через 3 секунды
    setTimeout(() => {
        addRestartButton();
    }, 3000);
}

// Функция для создания и показа кнопки перезапуска
function showRestartButton() {
    // Проверяем, не существует ли уже кнопка
    if (document.querySelector('.restart-button')) return;
    
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    
    // Создаем кнопку
    const restartButton = document.createElement('button');
    restartButton.className = 'restart-button';
    restartButton.textContent = 'Начать новое путешествие';
    
    // Добавляем обработчик клика
    restartButton.addEventListener('click', restartGame);
    
    // Первоначально делаем кнопку невидимой для анимации появления
    restartButton.style.opacity = '0';
    restartButton.style.transform = 'scale(0.8)';
    
    // Добавляем кнопку на страницу
    mainContent.appendChild(restartButton);
    
    // Анимируем появление кнопки
    setTimeout(() => {
        restartButton.style.opacity = '1';
        restartButton.style.transform = 'scale(1)';
    }, 100);
}

// Функция перезапуска игры
function restartGame() {
    console.log("Перезапуск игры...");
    
    // Удаляем эффекты золотого свечения
    const gameBoard = document.querySelector('.game-board');
    if (gameBoard) {
        gameBoard.style.filter = '';
        gameBoard.style.animation = '';
    }
    
    // Удаляем золотой оверлей
    const goldOverlay = document.querySelector('.gold-overlay');
    if (goldOverlay) {
        goldOverlay.remove();
    }
    
    // Сбрасываем стили бокового блока
    const sideBox = document.querySelector('.cell-description-box');
    if (sideBox) {
        sideBox.style.filter = '';
        sideBox.style.animation = '';
        sideBox.style.boxShadow = '';
        
        // Восстанавливаем содержимое бокового блока
        const boxTitle = sideBox.querySelector('.box-title');
        const boxText = sideBox.querySelector('.box-text');
        
        if (boxTitle) {
            boxTitle.textContent = "Добро пожаловать!";
            boxTitle.style.color = '';
            boxTitle.style.textShadow = '';
        }
        
        if (boxText) {
            boxText.innerHTML = "Приветствую вас на пути духовного познания! Бросьте кубик, чтобы начать игру. Для старта необходимо выбросить 6 - тогда ваше путешествие начнется.";
            boxText.style.color = '';
            boxText.style.textShadow = '';
        }
    }
    
    // Удаляем кнопку перезапуска
    const restartButton = document.querySelector('.restart-button');
    if (restartButton) {
        restartButton.remove();
    }
    
    // Восстанавливаем сообщение
    const messageElement = document.querySelector('.message');
    if (messageElement) {
        messageElement.textContent = "Бросьте кубик, чтобы начать игру";
        messageElement.style = ''; // Удаляем все стили
    }
    
    // Восстанавливаем кубик
    const dice = document.getElementById('game-dice');
    if (dice) {
        dice.innerHTML = '<span class="click-text">click</span>';
        dice.className = 'text-dice click-invite';
        
        // Восстанавливаем стандартный обработчик клика
        if (typeof window.rollDice === 'function') {
            dice.onclick = window.rollDice;
        }
    }
    
    // Удаляем золотую фишку, если она есть
    const goldenCell = document.querySelector('.golden-cell');
    if (goldenCell) {
        goldenCell.remove();
    }
    
    // Сбрасываем позицию игрока и флаги
    window.currentPosition = 0;
    window.gameStarted = false;
    window.firstSixRolled = false;
    window.goldenEffectActive = false;
    
    // Перезагружаем страницу для полного сброса игры
    // Это самый надежный способ перезапустить игру без нарушения логики
    window.location.reload();
}

// Функция для создания золотых частиц
function createGoldenParticles() {
    const boardContainer = document.querySelector('.board-container');
    if (!boardContainer) return;
    
    // Создаем 20 золотых частиц
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'golden-particle';
            
            // Случайное положение
            const left = 30 + Math.random() * 40; // 30-70%
            const top = 30 + Math.random() * 40;  // 30-70%
            
            particle.style.position = 'absolute';
            particle.style.left = `${left}%`;
            particle.style.top = `${top}%`;
            particle.style.width = '5px';
            particle.style.height = '5px';
            particle.style.borderRadius = '50%';
            particle.style.backgroundColor = 'gold';
            particle.style.boxShadow = '0 0 10px gold';
            particle.style.zIndex = '95';
            particle.style.opacity = '0';
            particle.style.animation = `particleRise 4s ease-out forwards`;
            particle.style.animationDelay = `${i * 0.2}s`;
            
            boardContainer.appendChild(particle);
            
            // Удаляем частицу после анимации
            setTimeout(() => {
                particle.remove();
            }, 4000 + i * 200);
        }, i * 100);
    }
}

// Вызываем функцию при достижении клетки 68
function setupGoldenEffectTrigger() {
    // Найдем место, где игрок перемещается на новую клетку
    const originalHandleGameMove = window.handleGameMove;
    if (typeof originalHandleGameMove === 'function') {
        window.handleGameMove = function(from, to, steps) {
            // Вызываем оригинальную функцию
            const result = originalHandleGameMove.apply(this, arguments);
            
            // Проверяем, достиг ли игрок клетки 68
            if (to === 68) {
                console.log("Игрок достиг клетки 68!");
                setTimeout(createGoldenEffect68, 500);
            }
            
            return result;
        };
    }
    
    // Также можно проверять в функции processGameLogic
    const originalProcessGameLogic = window.processGameLogic;
    if (typeof originalProcessGameLogic === 'function') {
        window.processGameLogic = function(result) {
            // Вызываем оригинальную функцию
            originalProcessGameLogic.apply(this, arguments);
            
            // Проверяем текущую позицию
            const goldenCell = document.querySelector('.golden-cell');
            if (goldenCell && goldenCell.getAttribute('data-number') === '68') {
                console.log("Игрок достиг клетки 68 через processGameLogic!");
                setTimeout(createGoldenEffect68, 500);
            }
        };
    }
}

// Запускаем настройку триггера при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    setupGoldenEffectTrigger();
});

// Обновляем функцию специальных перемещений, чтобы запускать финальный сценарий при попадании на клетку 68
function checkSpecialMove(position) {
    console.log(`Проверяем специальные перемещения для клетки ${position}`);
    
    // Получаем специальное перемещение для этой клетки
    const specialMove = specialMoves[position];
    
    if (specialMove) {
        console.log(`Обнаружено специальное перемещение: ${position} -> ${specialMove}`);
        
        // Задержка перед перемещением
        setTimeout(() => {
            const oldPosition = position;
            const newPosition = specialMove;
            
            // Обновляем сообщение пользователю
            const messageElement = document.querySelector('.message');
            if (messageElement) {
                // Определяем тип перемещения (змея или стрела)
                const moveType = isSnake(oldPosition, newPosition) ? 'змея' : 'стрела';
                
                if (moveType === 'змея') {
                    messageElement.textContent = `Вы попали на змею! Спускаетесь с клетки ${oldPosition} на клетку ${newPosition}.`;
                    messageElement.style.color = '#FF6347'; // Tomato
                    // Воспроизводим звук змеи
                    playSoundEffect('snake');
                } else {
                    messageElement.textContent = `Стрела! Вы поднимаетесь с клетки ${oldPosition} на клетку ${newPosition}.`;
                    messageElement.style.color = '#4CAF50'; // Green
                    // Воспроизводим звук стрелы
                    playSoundEffect('up');
                }
                
                setTimeout(() => {
                    messageElement.style.color = '';
                }, 2000);
            }
            
            // Обновляем позицию
            window.currentPosition = newPosition;
            console.log(`Новая позиция после специального перемещения: ${window.currentPosition}`);
            positionGoldenCell(newPosition);
            
            // Проверяем, достигли ли мы клетки 68 (План Абсолюта)
            if (newPosition === 68) {
                console.log("Достигнута финальная клетка 68 (План Абсолюта) через стрелу!");
                // Важно: используем небольшую задержку, чтобы визуальные эффекты 
                // появились ПОСЛЕ перемещения фишки
                setTimeout(() => {
                    createGoldenEffect68();
                }, 1000);
            }
            
            // Обновляем описание клетки
            updateCellDescription(newPosition);
            
        }, 1500);
        
        return true;
    }
    
    return false;
}

// Функция для определения типа перемещения
function isSnake(from, to) {
    // Если перемещение вниз (номер клетки уменьшается), это змея
    return to < from;
}

// Также обновляем функцию создания золотого эффекта, чтобы она добавляла кнопку перезапуска
function createGoldenEffect68() {
    console.log("Запускаем золотой эффект для клетки 68!");
    
    // Проверяем, не запущен ли уже эффект
    if (window.goldenEffectActive) {
        console.log("Золотой эффект уже активирован, пропускаем повторный запуск");
        return;
    }
    
    // Устанавливаем флаги, что игрок достиг финала
    window.playerReachedFinal = true;
    window.goldenEffectActive = true;
    
    // Получаем игровую доску
    const gameBoard = document.querySelector('.game-board');
    if (!gameBoard) {
        console.error("Не найден элемент игровой доски (.game-board)");
        return;
    }
    
    // Применяем золотой эффект фильтра к игровому полю
    gameBoard.style.filter = "sepia(100%) saturate(400%) hue-rotate(10deg) brightness(150%)";
    gameBoard.style.animation = "pulseGold 4s infinite";
    
    // Применяем золотистое сияние к боковому блоку (БОК)
    const sideBox = document.querySelector('.cell-description-box');
    if (sideBox) {
        sideBox.style.filter = "sepia(100%) saturate(400%) hue-rotate(10deg) brightness(150%)";
        sideBox.style.animation = "pulseGold 4s infinite";
        sideBox.style.boxShadow = "0 0 30px rgba(255, 215, 0, 0.7)";
        
        // Обновляем содержимое бокового блока
        const boxTitle = sideBox.querySelector('.box-title');
        const boxText = sideBox.querySelector('.box-text');
        
        if (boxTitle) {
            boxTitle.textContent = "План Абсолюта (Брахма-лока)";
            boxTitle.style.color = "gold";
            boxTitle.style.textShadow = "0 0 10px rgba(255, 215, 0, 0.7)";
        }
        
        if (boxText) {
            boxText.innerHTML = "План Абсолюта — это обитель Брахмы, где игрок осознаёт смысл творения. Вы достигли просветления.";
            boxText.style.color = "gold";
            boxText.style.textShadow = "0 0 5px rgba(255, 215, 0, 0.5)";
        }
    }
    
    // Создаем золотой оверлей поверх игрового поля
    const boardContainer = document.querySelector('.board-container');
    if (boardContainer) {
        // Проверяем, нет ли уже оверлея
        let overlay = document.querySelector('.gold-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'gold-overlay';
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.background = 'radial-gradient(circle, rgba(255,215,0,0.3) 0%, rgba(255,223,0,0.2) 30%, rgba(255,255,224,0.1) 60%, rgba(255,255,255,0) 80%)';
            overlay.style.zIndex = '90';
            overlay.style.pointerEvents = 'none';
            overlay.style.animation = 'overlayPulse 4s infinite alternate';
            
            boardContainer.appendChild(overlay);
        }
    }
    
    // Обновляем сообщение и добавляем анимацию
    const messageElement = document.querySelector('.message');
    if (messageElement) {
        messageElement.textContent = "Поздравляем! Вы достигли Плана Абсолюта, высшей цели духовного пути!";
        messageElement.style.animation = "messageGlow 3s infinite";
        messageElement.style.fontWeight = 'bold';
        messageElement.style.fontSize = '18px';
        messageElement.style.color = 'gold';
        messageElement.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.7)';
        messageElement.style.padding = '10px';
        messageElement.style.marginTop = '30px';
    }
    
    // Обновляем кубик с золотистым текстом "click"
    const dice = document.getElementById('game-dice');
    if (dice) {
        dice.innerHTML = '<span class="click-text golden-click">click</span>';
        dice.className = 'text-dice click-invite golden-dice';
        
        // Отключаем обработчик клика для кубика на время показа эффекта
        const oldClickHandler = dice.onclick;
        dice.onclick = null;
        
        // Сохраняем флаг, что эффект уже активирован
        window.goldenEffectActive = true;
    }
    
    // Добавляем золотые частицы для эффекта
    createGoldenParticles();
    
    // Устанавливаем таймер для появления кнопки перезапуска через 3 секунды
    setTimeout(() => {
        addRestartButton();
    }, 3000);
}

// Функция для добавления кнопки перезапуска
function addRestartButton() {
    console.log("Добавляем кнопку перезапуска игры");
    
    // Удаляем существующую кнопку, если она есть
    const existingButton = document.querySelector('.restart-button');
    if (existingButton) {
        existingButton.remove();
    }
    
    // Создаем новую кнопку
    const restartButton = document.createElement('button');
    restartButton.className = 'restart-button';
    restartButton.textContent = 'Играть снова';
    
    // Добавляем обработчик клика
    restartButton.addEventListener('click', function() {
        console.log("Нажата кнопка перезапуска игры");
        restartGame();
    });
    
    // Добавляем кнопку в board-container, чтобы она была позиционирована относительно игрового поля
    const boardContainer = document.querySelector('.board-container');
    if (boardContainer) {
        boardContainer.appendChild(restartButton);
        
        // Делаем анимацию появления кнопки
        setTimeout(() => {
            restartButton.style.opacity = '1';
            restartButton.style.transform = 'scale(1)';
        }, 100);
    } else {
        // Если board-container не найден, добавляем в main-content как запасной вариант
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.appendChild(restartButton);
        } else {
            console.error('Не найдено подходящего контейнера для кнопки перезапуска');
        }
    }
}

// Добавляем обработчик клавиши пробел для броска кубика
document.addEventListener('keydown', function(event) {
    // Проверяем, является ли нажатая клавиша пробелом (код 32)
    if (event.keyCode === 32 || event.key === ' ' || event.key === 'Spacebar') {
        console.log("Пробел нажат - имитируем нажатие на кубик");
        
        // Проверяем, завершена ли игра (достигнута клетка 68)
        if (window.playerReachedFinal || window.goldenEffectActive) {
            console.log("Игра завершена - имитируем нажатие на кнопку перезапуска");
            restartGame();
            return;
        }
        
        // Находим кубик
        const dice = document.getElementById('game-dice');
        if (dice) {
            // Добавляем визуальный эффект нажатия
            dice.classList.add('dice-pressed');
            
            // Удаляем класс через короткое время для эффекта анимации
            setTimeout(() => {
                dice.classList.remove('dice-pressed');
            }, 150);
            
            // Имитируем клик по кубику
            if (typeof dice.onclick === 'function') {
                dice.onclick();
            } else if (typeof window.rollDice === 'function') {
                window.rollDice();
            } else if (typeof window.forceRollDice === 'function') {
                window.forceRollDice();
            }
        }
        
        // Предотвращаем прокрутку страницы при нажатии пробела
        event.preventDefault();
    }
});

// Добавляем класс для визуального эффекта нажатия кубика
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем стили для эффекта нажатия кубика
    const style = document.createElement('style');
    style.textContent = `
        .dice-pressed {
            transform: scale(0.95);
            box-shadow: 0 0 8px rgba(138, 43, 226, 0.4) !important;
            transition: all 0.15s ease-in-out;
        }
    `;
    document.head.appendChild(style);
});

// Добавляем универсальный наблюдатель за изменением положения фишки
function setupPositionWatcher() {
    console.log("Настраиваем универсальный наблюдатель за положением фишки");
    
    // Сохраняем оригинальную функцию позиционирования
    const originalPositionFunction = window.positionGoldenCell;
    
    if (typeof originalPositionFunction === 'function') {
        // Заменяем функцию позиционирования
        window.positionGoldenCell = function(position) {
            // Вызываем оригинальную функцию
            const result = originalPositionFunction.apply(this, arguments);
            
            // Проверяем, не достигли ли мы клетки 68
            if (position === 68 && !window.playerReachedFinal && !window.goldenEffectActive) {
                console.log("⭐⭐⭐ Обнаружено достижение клетки 68 через наблюдатель позиции! ⭐⭐⭐");
                
                // Устанавливаем флаг, чтобы избежать повторного запуска эффекта
                window.playerReachedFinal = true;
                
                // Запускаем эффект с задержкой
                setTimeout(() => {
                    createGoldenEffect68();
                }, 1000);
            }
            
            return result;
        };
    }
    
    // Перехватываем также любые другие функции, которые могут обрабатывать движение
    // Например, функция handleSpecialMove, если такая существует
    if (typeof window.handleSpecialMove === 'function') {
        const originalSpecialMoveHandler = window.handleSpecialMove;
        
        window.handleSpecialMove = function(from, to) {
            // Вызываем оригинальную функцию
            const result = originalSpecialMoveHandler.apply(this, arguments);
            
            // Проверяем финальную клетку
            if (to === 68 && !window.playerReachedFinal && !window.goldenEffectActive) {
                console.log("⭐⭐⭐ Обнаружено достижение клетки 68 через специальное перемещение! ⭐⭐⭐");
                
                // Устанавливаем флаг, чтобы избежать повторного запуска эффекта
                window.playerReachedFinal = true;
                
                // Запускаем эффект с задержкой
                setTimeout(() => {
                    createGoldenEffect68();
                }, 1000);
            }
            
            return result;
        };
    }
}

// Вызываем настройку наблюдателя позиции при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Существующий код инициализации
    setupGoldenEffectTrigger();
    
    // Добавляем наш новый наблюдатель
    setupPositionWatcher();
});

// Функция для инициализации космического фона
function initSpaceBackground() {
    // Создаем звездное небо
    createStars();
    
    // Запускаем планеты чаще
    createPlanetSequence();
    
    // Запускаем туманности вместо черных дыр
    createNebulaeInterval();
    
    // Запускаем быстрые кометы
    createCometsInterval();
}

// Создаем звезды на заднем плане с улучшенными эффектами
function createStars() {
    // Очищаем существующие звезды
    document.querySelectorAll('.star').forEach(star => star.remove());
    
    // Создаем новые звезды с разным мерцанием
    for (let i = 0; i < 120; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Случайное положение
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Случайный размер (с редкими крупными звездами)
        let size;
        const sizeRandom = Math.random();
        if (sizeRandom > 0.98) { // Очень крупные звезды (2%)
            size = 3 + Math.random() * 2;
        } else if (sizeRandom > 0.9) { // Крупные звезды (8%)
            size = 2 + Math.random() * 1;
        } else { // Обычные звезды (90%)
            size = 1 + Math.random() * 1;
        }
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Параметры мерцания
        const twinkleDuration = 2 + Math.random() * 5;
        star.style.setProperty('--twinkle-duration', `${twinkleDuration}s`);
        
        // Яркость (с разной интенсивностью мерцания)
        const minOpacity = 0.1 + Math.random() * 0.3;
        const maxOpacity = 0.6 + Math.random() * 0.4;
        star.style.setProperty('--min-opacity', minOpacity);
        star.style.setProperty('--max-opacity', maxOpacity);
        
        // Свечение (ярче для крупных звезд)
        const glowSize = size * (0.5 + Math.random());
        const glowSizeMax = glowSize * (1.5 + Math.random());
        star.style.setProperty('--glow-size', `${glowSize}px`);
        star.style.setProperty('--glow-size-max', `${glowSizeMax}px`);
        star.style.setProperty('--glow-opacity', 0.1 + Math.random() * 0.2);
        star.style.setProperty('--glow-opacity-max', 0.3 + Math.random() * 0.4);
        
        // Добавляем небольшой оттенок цвета для некоторых звезд
        if (Math.random() > 0.8) {
            const hue = Math.random() > 0.5 ? '210' : (Math.random() > 0.5 ? '40' : '330');
            const starColor = `hsl(${hue}, 80%, 90%)`;
            star.style.backgroundColor = starColor;
        }
        
        document.body.appendChild(star);
    }
}

// Создаем детализированную планету
function createDetailedPlanet() {
    const planet = document.createElement('div');
    planet.className = 'space-planet';
    
    // Размер планеты (более разнообразный)
    const size = 50 + Math.random() * 100;
    planet.style.width = `${size}px`;
    planet.style.height = `${size}px`;
    
    // Положение по вертикали (более равномерное)
    planet.style.top = `${Math.random() * 80 + 5}%`;
    planet.style.left = '-150px'; // Начинаем за пределами экрана
    
    // Вращение планеты - уменьшаем скорость вращения для газовых гигантов
    const initialRotation = Math.random() * 360;
    // Сокращаем угол вращения для более медленного движения
    const finalRotation = initialRotation + (Math.random() * 180); // Медленное вращение
    planet.style.setProperty('--rotation', `${initialRotation}deg`);
    planet.style.setProperty('--rotation-end', `${finalRotation}deg`);
    
    // Выбираем тип планеты
    const planetType = Math.random();
    let baseHue, baseHue2;
    
    // Создаем более разнообразные и детализированные градиенты для планет
    if (planetType < 0.25) {
        // Ледяная планета (голубые и белые оттенки)
        baseHue = 180 + Math.random() * 40;
        baseHue2 = baseHue - 10;
        
        planet.style.background = `
            radial-gradient(
                circle at 30% 30%,
                hsl(${baseHue}, 90%, 85%) 0%,
                hsl(${baseHue}, 80%, 70%) 20%,
                hsl(${baseHue}, 70%, 50%) 40%,
                hsl(${baseHue2}, 80%, 40%) 60%,
                hsl(${baseHue2 - 10}, 70%, 25%) 80%,
                hsl(${baseHue2 - 20}, 60%, 20%) 100%
            )
        `;
        
        // Добавляем свечение для ледяной планеты
        const glowColor = `rgba(150, 220, 255, 0.6)`;
        planet.style.setProperty('--glow-color', glowColor);
        planet.style.setProperty('--glow-radius', `${size * 0.4}px`);
        
        // Добавляем атмосферу
        const atmosphere = document.createElement('div');
        atmosphere.className = 'planet-atmosphere';
        atmosphere.style.setProperty('--atmosphere-color', 'rgba(180, 230, 255, 0.15)');
        planet.appendChild(atmosphere);
        
    } else if (planetType < 0.5) {
        // Обитаемая планета (голубые и зеленые оттенки)
        baseHue = 160 + Math.random() * 60;
        baseHue2 = baseHue - 20;
        
        planet.style.background = `
            radial-gradient(
                circle at 35% 35%,
                hsl(${baseHue + 30}, 70%, 80%) 0%,
                hsl(${baseHue}, 70%, 60%) 20%,
                hsl(${baseHue - 10}, 60%, 45%) 40%,
                hsl(${baseHue2}, 50%, 40%) 60%,
                hsl(${baseHue2 - 10}, 60%, 30%) 80%,
                hsl(${baseHue2 - 20}, 70%, 20%) 100%
            )
        `;
        
        // Добавляем свечение для обитаемой планеты
        const glowColor = `rgba(100, 255, 180, 0.5)`;
        planet.style.setProperty('--glow-color', glowColor);
        planet.style.setProperty('--glow-radius', `${size * 0.35}px`);
        
        // Добавляем атмосферу
        const atmosphere = document.createElement('div');
        atmosphere.className = 'planet-atmosphere';
        atmosphere.style.setProperty('--atmosphere-color', 'rgba(160, 230, 200, 0.2)');
        planet.appendChild(atmosphere);
        
        // Добавляем текстуру континентов
        const texture = document.createElement('div');
        texture.className = 'planet-texture';
        texture.style.background = `
            radial-gradient(
                ellipse at 50% 50%,
                transparent 0%,
                transparent 40%,
                rgba(0, 100, 0, 0.3) 50%,
                rgba(0, 80, 0, 0.2) 60%,
                transparent 70%
            ),
            radial-gradient(
                ellipse at 80% 30%,
                transparent 0%,
                transparent 40%,
                rgba(0, 100, 0, 0.3) 50%,
                rgba(0, 80, 0, 0.2) 60%,
                transparent 70%
            ),
            radial-gradient(
                ellipse at 20% 70%,
                transparent 0%,
                transparent 40%,
                rgba(0, 100, 0, 0.3) 50%,
                rgba(0, 80, 0, 0.2) 60%,
                transparent 70%
            )
        `;
        planet.appendChild(texture);
        
    } else if (planetType < 0.75) {
        // Раскаленная планета (красные и оранжевые оттенки)
        baseHue = Math.random() * 30;
        
        planet.style.background = `
            radial-gradient(
                circle at 35% 35%,
                hsl(${baseHue + 20}, 100%, 70%) 0%,
                hsl(${baseHue + 10}, 90%, 60%) 20%,
                hsl(${baseHue}, 80%, 50%) 40%,
                hsl(${baseHue - 10}, 80%, 40%) 60%,
                hsl(${baseHue - 20}, 70%, 30%) 80%,
                hsl(${baseHue - 30}, 60%, 20%) 100%
            )
        `;
        
        // Добавляем свечение для раскаленной планеты
        const glowColor = `rgba(255, 120, 50, 0.6)`;
        planet.style.setProperty('--glow-color', glowColor);
        planet.style.setProperty('--glow-radius', `${size * 0.5}px`);
        
        // Добавляем текстуру лавы
        const texture = document.createElement('div');
        texture.className = 'planet-texture';
        texture.style.background = `
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")
        `;
        planet.appendChild(texture);
        
    } else {
        // Газовый гигант (полосатый) - обновленный код для более плавных переходов
        baseHue = Math.random() * 360;
        
        // Создаем полосы с более плавными переходами
        const stripeCount = 5 + Math.floor(Math.random() * 4); // Меньше полос для более плавных переходов
        let stripeGradient = '';
        
        // Массив для хранения цветов полос
        const stripeColors = [];
        
        // Генерируем цвета для полос заранее для более плавных переходов
        for (let i = 0; i < stripeCount; i++) {
            const hueShift = Math.floor(Math.random() * 30 - 15);
            const saturation = 70 + Math.random() * 20;
            const lightness = 40 + Math.random() * 30;
            
            stripeColors.push({
                hue: baseHue + hueShift,
                saturation,
                lightness
            });
        }
        
        // Создаем градиент с плавными переходами между полосами
        for (let i = 0; i < stripeCount; i++) {
            const percentage = (i * 100) / stripeCount;
            const nextPercentage = ((i + 1) * 100) / stripeCount;
            const midPoint = percentage + (nextPercentage - percentage) / 2;
            
            const currentColor = stripeColors[i];
            const nextColor = stripeColors[(i + 1) % stripeCount];
            
            // Добавляем промежуточные точки для более плавного перехода
            stripeGradient += `
                hsl(${currentColor.hue}, ${currentColor.saturation}%, ${currentColor.lightness}%) ${percentage}%,
                hsl(${currentColor.hue}, ${currentColor.saturation - 5}%, ${currentColor.lightness - 5}%) ${percentage + (nextPercentage - percentage) * 0.3}%,
                hsl(${lerp(currentColor.hue, nextColor.hue, 0.5)}, ${lerp(currentColor.saturation, nextColor.saturation, 0.5)}%, ${lerp(currentColor.lightness, nextColor.lightness, 0.5)}%) ${midPoint}%,
                hsl(${nextColor.hue}, ${nextColor.saturation - 5}%, ${nextColor.lightness - 5}%) ${percentage + (nextPercentage - percentage) * 0.7}%`;
            
            // Если не последняя полоса
            if (i < stripeCount - 1) {
                stripeGradient += `,
                    hsl(${nextColor.hue}, ${nextColor.saturation}%, ${nextColor.lightness}%) ${nextPercentage}%`;
            } else {
                stripeGradient += `,
                    hsl(${nextColor.hue}, ${nextColor.saturation}%, ${nextColor.lightness}%) 100%`;
            }
        }
        
        // Угол градиента - более случайный
        const gradientAngle = Math.random() * 20 - 10 + (Math.random() > 0.5 ? 0 : 180);
        
        planet.style.background = `
            linear-gradient(
                ${gradientAngle}deg,
                ${stripeGradient}
            )
        `;
        
        // Добавляем динамические "облака" и детали с помощью дополнительных элементов
        const detailsLayer = document.createElement('div');
        detailsLayer.className = 'planet-texture gas-giant-details';
        
        // Добавляем уникальную анимацию для деталей
        const animDuration = 30 + Math.random() * 60; // Медленная анимация
        detailsLayer.style.setProperty('--details-duration', `${animDuration}s`);
        
        // Генерируем случайные облачные детали
        const cloudDetails = [];
        const cloudCount = 3 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < cloudCount; i++) {
            const xPos = Math.random() * 100;
            const yPos = Math.random() * 100;
            const cloudSize = 20 + Math.random() * 40;
            const cloudHue = baseHue + (Math.random() * 30 - 15);
            const cloudOpacity = 0.1 + Math.random() * 0.3;
            
            cloudDetails.push(`
                radial-gradient(
                    ellipse at ${xPos}% ${yPos}%,
                    hsla(${cloudHue}, 70%, 70%, ${cloudOpacity}) 0%,
                    hsla(${cloudHue}, 60%, 60%, ${cloudOpacity * 0.7}) 40%,
                    hsla(${cloudHue}, 50%, 50%, ${cloudOpacity * 0.4}) 70%,
                    transparent 100%
                )
            `);
        }
        
        detailsLayer.style.background = cloudDetails.join(',');
        planet.appendChild(detailsLayer);
        
        // Добавляем свечение для газового гиганта
        const glowColor = `hsla(${baseHue}, 70%, 60%, 0.5)`;
        planet.style.setProperty('--glow-color', glowColor);
        planet.style.setProperty('--glow-radius', `${size * 0.45}px`);
        
        // С большим шансом добавляем кольца для газового гиганта
        if (Math.random() > 0.3) {
            // Внешние кольца
            const rings = document.createElement('div');
            rings.className = 'planet-rings';
            planet.appendChild(rings);
            
            // Внутренние кольца (для эффекта многослойности)
            const innerRings = document.createElement('div');
            innerRings.className = 'planet-rings-inner';
            planet.appendChild(innerRings);
        }
        
        // Добавляем большое пятно (как на Юпитере)
        if (Math.random() > 0.5) {
            const spot = document.createElement('div');
            spot.className = 'planet-texture';
            spot.style.background = `
                radial-gradient(
                    ellipse at ${50 + Math.random() * 30}% ${50 + Math.random() * 30}%,
                    hsla(${baseHue + 30}, 90%, 60%, 0.6) 0%,
                    hsla(${baseHue + 20}, 85%, 55%, 0.5) 30%,
                    hsla(${baseHue + 10}, 80%, 50%, 0.4) 50%,
                    transparent 70%
                )
            `;
            planet.appendChild(spot);
        }
    }
    
    // Скорость движения (более медленная и величественная для больших планет)
    const duration = 120 + Math.random() * 240;
    planet.style.setProperty('--move-duration', `${duration}s`);
    
    document.body.appendChild(planet);
    
    // Удаляем планету после завершения анимации
    setTimeout(() => {
        if (planet && planet.parentNode) {
            planet.remove();
        }
    }, duration * 1000 + 1000);
}

// Создаем улучшенную космическую туманность
function createNebula() {
    const nebula = document.createElement('div');
    nebula.className = 'space-nebula';
    
    // Размер туманности (более разнообразный)
    const size = 180 + Math.random() * 220;
    nebula.style.width = `${size}px`;
    nebula.style.height = `${size}px`;
    
    // Положение по вертикали
    nebula.style.top = `${Math.random() * 70 + 15}%`;
    nebula.style.left = '-200px'; // Начинаем за пределами экрана
    
    // Выбираем цвета туманности
    const hue1 = Math.random() * 360;
    const hue2 = (hue1 + 30 + Math.random() * 60) % 360;
    
    // Основной цвет туманности с более размытыми краями
    nebula.style.background = `
        radial-gradient(
            circle at ${40 + Math.random() * 20}% ${40 + Math.random() * 20}%,
            hsla(${hue1}, 100%, 70%, 0.8) 0%,
            hsla(${hue1}, 90%, 60%, 0.6) 20%,
            hsla(${hue1}, 80%, 50%, 0.4) 40%,
            hsla(${hue1}, 70%, 40%, 0.2) 60%,
            hsla(${hue1}, 60%, 30%, 0.1) 80%,
            transparent 100%
        )
    `;
    
    // Устанавливаем более сильное размытие для краев
    nebula.style.filter = `blur(${15 + Math.random() * 20}px) contrast(1.3) brightness(1.2)`;
    
    // Создаем внутреннюю структуру туманности с эффектом "мерцания"
    const inner = document.createElement('div');
    inner.className = 'nebula-inner';
    
    // Генерируем несколько слоев для более органичного вида
    const layers = [];
    const layerCount = 2 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < layerCount; i++) {
        const xPos = 20 + Math.random() * 60;
        const yPos = 20 + Math.random() * 60;
        const layerHue = hue2 + (Math.random() * 40 - 20);
        const layerOpacity = 0.3 + Math.random() * 0.5;
        
        // Добавляем мерцающий эффект через анимацию
        const animationDelay = i * (Math.random() * 3);
        const animationDuration = 5 + Math.random() * 10;
        inner.style.setProperty(`--twinkle-delay-${i}`, `${animationDelay}s`);
        inner.style.setProperty(`--twinkle-duration-${i}`, `${animationDuration}s`);
        
        layers.push(`
            radial-gradient(
                circle at ${xPos}% ${yPos}%,
                hsla(${layerHue}, 100%, 80%, ${layerOpacity}) 0%,
                hsla(${layerHue}, 90%, 70%, ${layerOpacity * 0.7}) 40%,
                hsla(${layerHue}, 80%, 60%, ${layerOpacity * 0.4}) 70%,
                transparent 100%
            )
        `);
    }
    
    inner.style.background = layers.join(',');
    
    // Добавляем эффект внутреннего мерцания через CSS-анимацию
    inner.style.animation = `nebula-pulse 20s infinite alternate ease-in-out, nebula-twinkle 8s infinite alternate ease-in-out`;
    
    nebula.appendChild(inner);
    
    // Добавляем слой "пятен" для более реалистичной неоднородности
    const spots = document.createElement('div');
    spots.className = 'nebula-spots';
    
    // Генерируем случайные яркие пятна внутри туманности
    const spotLayers = [];
    const spotCount = 3 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < spotCount; i++) {
        const xPos = 20 + Math.random() * 60;
        const yPos = 20 + Math.random() * 60;
        const spotSize = 10 + Math.random() * 30;
        const spotHue = hue1 + (Math.random() * 60 - 30);
        const spotOpacity = 0.2 + Math.random() * 0.6;
        
        // Добавляем мерцающий эффект через анимацию
        const animationDelay = i * (Math.random() * 2);
        const animationDuration = 3 + Math.random() * 7;
        spots.style.setProperty(`--spot-delay-${i}`, `${animationDelay}s`);
        spots.style.setProperty(`--spot-duration-${i}`, `${animationDuration}s`);
        
        spotLayers.push(`
            radial-gradient(
                circle at ${xPos}% ${yPos}%,
                hsla(${spotHue}, 100%, 90%, ${spotOpacity}) 0%,
                hsla(${spotHue}, 100%, 80%, ${spotOpacity * 0.8}) ${spotSize / 3}%,
                hsla(${spotHue}, 90%, 70%, ${spotOpacity * 0.4}) ${spotSize}%,
                transparent ${spotSize * 1.5}%
            )
        `);
    }
    
    spots.style.background = spotLayers.join(',');
    spots.style.animation = `nebula-spots-twinkle 6s infinite alternate ease-in-out`;
    
    nebula.appendChild(spots);
    
    // Скорость движения (очень медленно)
    const duration = 180 + Math.random() * 240;
    nebula.style.setProperty('--move-duration', `${duration}s`);
    
    document.body.appendChild(nebula);
    
    // Удаляем туманность после завершения анимации
    setTimeout(() => {
        if (nebula && nebula.parentNode) {
            nebula.remove();
        }
    }, duration * 1000 + 1000);
}

// Вспомогательная функция для линейной интерполяции
function lerp(a, b, t) {
    return a + (b - a) * t;
}

// Создаем последовательность планет (реже)
function createPlanetSequence() {
    // Создаем первую планету сразу
    setTimeout(() => {
        createDetailedPlanet();
        
        // Затем создаем планеты с регулярными интервалами
        setInterval(() => {
            if (Math.random() > 0.6) { // 40% шанс создания планеты (реже, чем было)
                createDetailedPlanet();
            }
        }, 30000); // Новая планета примерно каждые 30 секунд (увеличили интервал)
    }, 2000);
    
    // Создаем вторую планету через короткий промежуток времени
    setTimeout(() => {
        createDetailedPlanet();
    }, 12000); // Увеличили задержку
}

// Интервал для создания туманностей (увеличили частоту)
function createNebulaeInterval() {
    // Первая туманность через 10-20 секунд
    setTimeout(() => {
        createNebula();
        
        // Затем создаем новые с интервалами
        setInterval(() => {
            if (Math.random() > 0.3) { // 70% шанс (чаще, чем раньше)
                createNebula();
            }
        }, 35000); // Примерно каждые 35 секунд
    }, 10000 + Math.random() * 10000);
}

// Создаем яркую комету
function createComet() {
    const comet = document.createElement('div');
    comet.className = 'comet';
    
    // Случайное начальное положение
    const startPosX = Math.random() * window.innerWidth * 0.8;
    const startPosY = Math.random() * (window.innerHeight * 0.7); // Верхние 70% экрана
    comet.style.left = `${startPosX}px`;
    comet.style.top = `${startPosY}px`;
    comet.style.setProperty('--start-x', '0px');
    comet.style.setProperty('--start-y', '0px');
    
    // Размеры и яркость кометы
    const cometHeight = 2 + Math.random() * 4;
    comet.style.setProperty('--comet-height', `${cometHeight}px`);
    
    // Начальная ширина (хвост)
    const startWidth = 60 + Math.random() * 100;
    comet.style.setProperty('--start-width', `${startWidth}px`);
    comet.style.width = `${startWidth}px`;
    
    // Конечная ширина (обычно увеличивается при движении)
    const endWidth = startWidth * (1.2 + Math.random() * 0.8);
    comet.style.setProperty('--end-width', `${endWidth}px`);
    
    // Случайный угол падения (в основном по диагонали)
    const angle = 30 + Math.random() * 60;
    comet.style.setProperty('--fall-angle', `${angle}deg`);
    
    // Расстояние падения
    const fallDistance = 300 + Math.random() * 600;
    const endX = fallDistance * Math.sin(angle * Math.PI / 180);
    const endY = fallDistance * Math.cos(angle * Math.PI / 180);
    comet.style.setProperty('--end-x', `${endX}px`);
    comet.style.setProperty('--end-y', `${endY}px`);
    
    // Скорость падения (быстрая)
    const duration = 0.5 + Math.random() * 0.6;
    comet.style.setProperty('--fall-duration', `${duration}s`);
    
    // Свечение (яркое)
    comet.style.setProperty('--glow-size', `${cometHeight * 3}px`);
    comet.style.setProperty('--glow-size-outer', `${cometHeight * 6}px`);
    comet.style.setProperty('--glow-color', 'rgba(220, 240, 255, 0.9)');
    comet.style.setProperty('--glow-color-outer', 'rgba(150, 200, 255, 0.4)');
    
    document.body.appendChild(comet);
    
    // Удаляем комету после завершения анимации
    setTimeout(() => {
        if (comet && comet.parentNode) {
            comet.remove();
        }
    }, duration * 1000 + 100);
}

// Создаем последовательность планет (чаще)
function createPlanetSequence() {
    // Создаем первую планету сразу
    setTimeout(() => {
        createDetailedPlanet();
        
        // Затем создаем планеты с регулярными интервалами
        setInterval(() => {
            if (Math.random() > 0.3) { // 70% шанс создания планеты
                createDetailedPlanet();
            }
        }, 15000); // Новая планета примерно каждые 15 секунд
    }, 2000);
    
    // Создаем вторую планету через короткий промежуток времени
    setTimeout(() => {
        createDetailedPlanet();
    }, 5000);
}

// Интервал для создания туманностей
function createNebulaeInterval() {
    // Первая туманность через 10-20 секунд
    setTimeout(() => {
        createNebula();
        
        // Затем создаем новые с интервалами
        setInterval(() => {
            if (Math.random() > 0.5) { // 50% шанс
                createNebula();
            }
        }, 45000); // Примерно каждые 45 секунд
    }, 10000 + Math.random() * 10000);
}

// Интервал для создания комет
function createCometsInterval() {
    // Сразу запускаем первую комету
    setTimeout(createComet, 3000);
    
    // Функция для создания группы комет
    const createCometBurst = () => {
        const count = Math.floor(Math.random() * 3) + 1; // 1-3 кометы
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                createComet();
            }, i * 300); // С интервалом 300 мс
        }
    };
    
    // Регулярно создаем кометы
    setInterval(() => {
        if (Math.random() > 0.6) { // 40% шанс
            if (Math.random() > 0.7) { // 30% шанс группы
                createCometBurst();
            } else {
                createComet();
            }
        }
    }, 3000); // Проверка каждые 3 секунды
}

// Добавляем инициализацию космического фона к загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем инициализацию существующих компонентов
    setupGoldenEffectTrigger();
    setupPositionWatcher();
    
    // Устанавливаем черный фон сразу
    document.body.style.backgroundColor = '#000010';
    
    // Запускаем улучшенный космический фон
    setTimeout(initSpaceBackground, 1000);
});