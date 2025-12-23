// Система переключения темы
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Проверяем сохранённую тему в localStorage
const savedTheme = localStorage.getItem('theme') || 'light';

// Применяем сохранённую тему
if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
} else {
    body.setAttribute('data-theme', 'light');
    themeToggle.checked = false;
}

// Обработчик переключения темы
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Автоматическое определение системной темы
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Если пользователь не выбрал тему вручную, используем системную
if (!localStorage.getItem('theme')) {
    if (prefersDarkScheme.matches) {
        body.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
        localStorage.setItem('theme', 'dark');
    }
}

// Слушатель изменения системной темы
prefersDarkScheme.addEventListener('change', function(e) {
    // Меняем тему только если пользователь не выбрал её вручную
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            body.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
        } else {
            body.setAttribute('data-theme', 'light');
            themeToggle.checked = false;
        }
    }
});

// Активация мобильного меню
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navList = document.querySelector('.nav-list');

if (mobileMenuBtn && navList) {
    mobileMenuBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenuBtn.innerHTML = navList.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Анимация чисел в статистике
function animateCounter(element, target, duration = 2000) {
    const start = parseInt(element.textContent);
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Запуск счетчиков при прокрутке
const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

function checkCounterAnimation() {
    if (countersAnimated) return;
    
    const statsSection = document.querySelector('.hero-stats');
    const sectionPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (sectionPosition < screenPosition) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            animateCounter(stat, target);
        });
        countersAnimated = true;
    }
}

// Кнопка "Наверх"
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    // Проверка для счетчиков
    checkCounterAnimation();
    
    // Кнопка "Наверх"
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    // Активное состояние навигации при прокрутке
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (navLink) {
                navLink.classList.add('active');
            }
        } else {
            if (navLink) {
                navLink.classList.remove('active');
            }
        }
    });
});

// Обработка формы обратной связи
const feedbackForm = document.getElementById('feedbackForm');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // В реальном проекте здесь будет отправка на сервер
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        
        console.log('Данные формы:', formValues);
        
        // Простая валидация
        if (!formValues.name || !formValues.email || !formValues.agree) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        // Имитация отправки
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
            feedbackForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Анимация при наведении на карточки портфолио
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Запуск счетчиков, если статистика уже видна
    checkCounterAnimation();
    
    // Добавление текущего года в футер
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;
});