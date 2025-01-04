const texts = [
    'Привет!',
    'Sleryfink, да это я...',
    'Тут могла быть твоя реклама', 
    '1201816800', 
    //`Nah I'd Win 🤞`,
    'Напиши мне...',
    'Дмитрий 100 рублей от вас📍',
    'Why...',
    'Sweet user',
    'I <3 ...'
];
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

    const typingSpeed = isDeleting ? 50 : 150;
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
// Событие на клик по тексту для смены темы
typeTextElement.addEventListener('click', toggleTheme);

// Запуск функции печатания
document.addEventListener('DOMContentLoaded', type);
