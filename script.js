const texts = [
    'Привет!',
    'Sleryfink, да эт я)', 
    'Мммммм', 
    'тут могла быть ваша реклама)', 
    '1201816800', 
    'Genial,  ̶m̶i̶l̶i̶a̶r̶d̶a̶r̶, playboy, filantrop.', 
    'Дмитрий 100 рублей от вас📍', 
    'Sweet user', 
    'Скинь денежку ;)', 
    'Ya v shoke'
];
const trackInfoElement = document.getElementById('track-info');
const trackTitleElement = document.getElementById('track-title');
const trackArtistElement = document.getElementById('track-artist');

let currentText = 0;
let currentChar = -8;
let isDeleting = false;

const typeTextElement = document.getElementById('type-text');
const bodyElement = document.body;

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

function type() {
    const currentString = texts[currentText];
    let displayedText;

    // Уменьшение или увеличение текста
    if (isDeleting) {
        displayedText = currentString.substring(0, currentChar--);
    } else {
        displayedText = currentString.substring(0, currentChar+++1);
    }

    // Обновляем текст с учетом HTML-разметки
    typeTextElement.innerHTML = displayedText;

    const typingSpeed = isDeleting ? 100 : 150;
    const pauseBeforeDeleting = 1000;

    // Когда текст полностью напечатан
    if (!isDeleting && currentChar === currentString.length) {
        isDeleting = true;  // Начать удаление
        setTimeout(type, pauseBeforeDeleting);  // Задержка перед удалением
    }
    // Когда текст полностью удалён
    else if (isDeleting && currentChar === -1) {
        isDeleting = false;  // Начать печатать новый текст
        currentText = getRandomTextIndex();  // Выбрать случайный текст
        currentChar = 0;  // Сбросить счётчик символов
        setTimeout(type, 500);  // Задержка перед началом печати нового текста
    } else {
        setTimeout(type, typingSpeed);  // Продолжить печатать/удалять
    }
}

function getRandomTextIndex() {
    let randomIndex = Math.floor(Math.random() * texts.length);

    // Убедимся, что новый текст не такой же, как предыдущий
    while (randomIndex === currentText) {
        randomIndex = Math.floor(Math.random() * texts.length);
    }

    return randomIndex;
}

function toggleTheme() {
    if (bodyElement.classList.contains('light-theme')) {
        bodyElement.classList.remove('light-theme');
        bodyElement.classList.add('dark-theme');
    } else {
        bodyElement.classList.remove('dark-theme');
        bodyElement.classList.add('light-theme');
    }
}
async function fetchTrackInfo() {
    try {
        const response = await fetch('https://api.mipoh.ru/get_current_track_beta?ya_token=myapi');
        const data = await response.json();

        if (data.track) {
            const trackTitle = data.track.title || '---';
            const trackArtist = data.track.artist || '---';

            trackTitleElement.textContent = `Трек: ${trackTitle}`;
            trackArtistElement.textContent = `Исполнитель: ${trackArtist}`;
        }
    } catch (error) {
        console.error('Ошибка получения данных о треке:', error);
        trackTitleElement.textContent = 'Ошибка загрузки трека';
        trackArtistElement.textContent = '';
    }
}
// Запрашивать данные каждые 60 секунд
setInterval(fetchTrackInfo, 60000);

// Первоначальная загрузка информации о треке
fetchTrackInfo();
// Событие на клик по тексту для смены темы
typeTextElement.addEventListener('click', toggleTheme);

// Запуск функции печатания
document.addEventListener('DOMContentLoaded', type);
