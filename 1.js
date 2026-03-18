document.addEventListener('DOMContentLoaded', function() {
    // Инициализация переменных
    let currentZoom = 1;
    const minZoom = 0.8;
    const maxZoom = 1.5;
    const zoomStep = 0.1;
    
    // Элементы управления зумом
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const resetZoomBtn = document.getElementById('resetZoom');
    const container = document.querySelector('.container');
    
    // Функции управления масштабом
    function updateZoom() {
        container.style.transform = scale(${currentZoom});
        container.style.transformOrigin = 'top center';
        container.style.transition = 'transform 0.3s ease';
    }
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', function() {
            if (currentZoom < maxZoom) {
                currentZoom += zoomStep;
                updateZoom();
            }
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', function() {
            if (currentZoom > minZoom) {
                currentZoom -= zoomStep;
                updateZoom();
            }
        });
    }
    
    if (resetZoomBtn) {
        resetZoomBtn.addEventListener('click', function() {
            currentZoom = 1;
            updateZoom();
        });
    }
    
    // Прогресс бар для чтения
    const progressBar = document.getElementById('progressBar');
    
    function updateProgressBar() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    }
    
    window.addEventListener('scroll', updateProgressBar);
    window.addEventListener('resize', updateProgressBar);
    
    // Скрипт для чек-листа
    const checklistItems = document.querySelectorAll('#birthdayChecklist li');
    
    checklistItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('checked');
            // Анимация при клике
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Эффекты при наведении на развороты
    const spreads = document.querySelectorAll('.spread');
    
    spreads.forEach(spread => {
        spread.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            }
        });
        
        spread.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // Модальное окно с рецептом
    const recipeBtn = document.getElementById('recipeBtn');
    const recipeModal = document.getElementById('recipeModal');
    const closeModal = document.getElementById('closeModal');
    
    if (recipeBtn && recipeModal && closeModal) {
        recipeBtn.addEventListener('click', function() {
            recipeModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        closeModal.addEventListener('click', function() {
            recipeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Закрытие модального окна при клике вне его
        recipeModal.addEventListener('click', function(e) {
            if (e.target === recipeModal) {
        recipeModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Анимация появления элементов при скролле
    function checkVisibility() {
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;
        
        spreads.forEach(spread => {
            const spreadTop = spread.offsetTop;
            const spreadBottom = spreadTop + spread.offsetHeight;
            
            // Если элемент виден в окне
            if (spreadBottom >= windowTop && spreadTop <= windowBottom) {
                spread.classList.add('visible');
            }
        });
    }
    
    // Проверка видимости при загрузке и скролле
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    
    // Активировать видимость всех элементов после загрузки (для анимации)
    setTimeout(() => {
        spreads.forEach(spread => {
            spread.classList.add('visible');
        });
    }, 100);
    
    // Индикатор размера экрана (для отладки, можно отключить)
    const screenSizeIndicator = document.getElementById('screenSize');
    
    function updateScreenSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Определение типа устройства
        let deviceType = 'Десктоп';
        if (width < 768) deviceType = 'Мобильный';
        else if (width < 1200) deviceType = 'Планшет';
        
        if (screenSizeIndicator) {
            screenSizeIndicator.textContent = (${width};${height}) (${deviceType});
            
            // Показать индикатор только при нажатии Ctrl+Shift+I
            if (width < 768) {
                screenSizeIndicator.style.display = 'block';
            } else {
                screenSizeIndicator.style.display = 'none';
            }
        }
    }
    
    window.addEventListener('resize', updateScreenSize);
    updateScreenSize(); // Инициализация
    
    // Горячие клавиши для отладки
    document.addEventListener('keydown', function(e) {
        // Ctrl+Shift+I для показа индикатора размера
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            if (screenSizeIndicator) {
                screenSizeIndicator.style.display = screenSizeIndicator.style.display === 'none' ? 'block' : 'none';
            }
        }
        
        // +/- для зума
        if (e.ctrlKey && (e.key === '+' || e.key === '=')) {
            e.preventDefault();
            if (currentZoom < maxZoom) {
                currentZoom += zoomStep;
                updateZoom();
            }
        }
        
        if (e.ctrlKey && e.key === '-') {
            e.preventDefault();
            if (currentZoom > minZoom) {
                currentZoom -= zoomStep;
                updateZoom();
            }
        }
        
        // 0 для сброса зума
        if (e.ctrlKey && e.key === '0') {
            e.preventDefault();
            currentZoom = 1;
            updateZoom();
        }
    });
    
    // Интерактивность для кулинарных иконок
    const culinaryIcons = document.querySelectorAll('.culinary-icon');
    culinaryIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const iconText = this.querySelector('div').textContent;
            
            // Создаем временное уведомление
            const notification = document.createElement('div');
            notification.textContent = Илья отлично разбирается в ${iconText.toLowerCase()}!;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: #4caf50;
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                z-index: 1000;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                font-family: 'Roboto Slab', serif;
                max-width: 300px;
                animation: slideIn 0.3s ease;
            ;
            
            document.body.appendChild(notification);
            
            // Удаляем уведомление через 3 секунды
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => {
                    if (notification.parentNode) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        });
    });
    
    // Стили для анимации уведомлений
    const style = document.createElement('style');
    style.textContent = 
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Адаптация для тач-устройств
    if ('ontouchstart' in window) {
        // Увеличиваем тап-таргеты на мобильных
        const clickableElements = document.querySelectorAll('.checklist li, .culinary-icon, .ingredient, .btn');
        clickableElements.forEach(el => {
            el.style.minHeight = '44px';
            el.style.minWidth = '44px';
            el.style.display = 'flex';
            el.style.alignItems = 'center';
            el.style.justifyContent = 'center';
        });
        
        // Убираем ховер-эффекты на тач-устройствах
        document.body.classList.add('touch-device');
    }
    
    // Обработчик для переключения вида на мобильных
    let isMobileView = window.innerWidth < 768;
    
    window.addEventListener('resize', function() {
        const newIsMobileView = window.innerWidth < 768;
        if (newIsMobileView !== isMobileView) {
            isMobileView = newIsMobileView;
            // Принудительный рефлоу для обновления стилей
            document.body.style.display = 'none';
            document.body.offsetHeight; // Триггер рефлоу
            document.body.style.display = '';
        }
    });
    
    // Предотвращение контекстного меню на изображениях-заглушках
    const placeholders = document.querySelectorAll('.img-placeholder');
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    });
});