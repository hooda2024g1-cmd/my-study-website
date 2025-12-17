// ====== مكتبة التأثيرات المتحركة ======
document.addEventListener('DOMContentLoaded', function() {
    // إضافة أنماط الأنيميشن
    addAnimationStyles();
    
    // تهيئة جميع التأثيرات
    initAllAnimations();
});

function initAllAnimations() {
    // تأثيرات التمرير
    initScrollAnimations();
    
    // تأثيرات العناصر الطافية
    initFloatingElements();
    
    // تأثيرات البطاقات
    initCardAnimations();
    
    // تأثيرات الأزرار
    initButtonAnimations();
    
    // تأثيرات خاصة بالصفحة الرئيسية
    initHomepageAnimations();
}

// ====== تأثيرات التمرير ======
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .section-title, .section-subtitle, .stat-box'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateOnScroll(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

function animateOnScroll(element) {
    element.style.transition = 'all 0.6s ease';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
}

// ====== العناصر الطافية ======
function initFloatingElements() {
    const floatIcons = document.querySelectorAll('.float-icon');
    
    floatIcons.forEach((icon, index) => {
        // تأخير مختلف لكل عنصر
        icon.style.animationDelay = `${index * 0.5}s`;
        
        // إضافة تفاعل عند النقر
        icon.addEventListener('click', () => {
            bounceElement(icon);
        });
    });
}

function bounceElement(element) {
    element.style.animation = 'none';
    void element.offsetWidth; // إعادة التدفق
    element.style.animation = 'bounce 0.5s ease';
    
    setTimeout(() => {
        element.style.animation = 'float 6s ease-in-out infinite';
    }, 500);
}

// ====== تأثيرات البطاقات ======
function initCardAnimations() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            animateCardHover(card, true);
        });
        
        card.addEventListener('mouseleave', () => {
            animateCardHover(card, false);
        });
    });
}

function animateCardHover(card, isHovering) {
    if (isHovering) {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        card.style.zIndex = '10';
    } else {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
        card.style.zIndex = '';
    }
}

// ====== تأثيرات الأزرار ======
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-login, .btn-register');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px) scale(1.05)';
            btn.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0) scale(1)';
            btn.style.boxShadow = '';
        });
    });
}

// ====== تأثيرات الصفحة الرئيسية ======
function initHomepageAnimations() {
    // تأثير الصورة الرئيسية
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.addEventListener('mouseenter', () => {
            heroImage.style.transform = 'perspective(1000px) rotateY(0deg) scale(1.05)';
        });
        
        heroImage.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'perspective(1000px) rotateY(-10deg) scale(1)';
        });
    }
    
    // تأثير الخط تحت النص
    const highlight = document.querySelector('.highlight');
    if (highlight) {
        setInterval(() => {
            highlight.classList.add('pulse');
            setTimeout(() => {
                highlight.classList.remove('pulse');
            }, 1000);
        }, 5000);
    }
}

// ====== إضافة أنماط الأنيميشن ======
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* تأثيرات أساسية */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* تأثير الطفو */
        @keyframes float {
            0%, 100% {
                transform: translateY(0) rotate(0deg);
            }
            50% {
                transform: translateY(-20px) rotate(5deg);
            }
        }
        
        /* تأثير الارتداد */
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        /* تأثير النبض */
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        /* تأثير الاهتزاز */
        @keyframes shake {
            0%, 100% {
                transform: translateX(0);
            }
            10%, 30%, 50%, 70%, 90% {
                transform: translateX(-5px);
            }
            20%, 40%, 60%, 80% {
                transform: translateX(5px);
            }
        }
        
        /* تأثير التموج */
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* دوران */
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
        /* تأثير التلألؤ */
        @keyframes glow {
            0%, 100% {
                box-shadow: 0 0 5px currentColor;
            }
            50% {
                box-shadow: 0 0 20px currentColor, 0 0 30px currentColor;
            }
        }
        
        /* تأثير الوهج للعناصر المهمة */
        .glow {
            animation: glow 2s ease-in-out infinite;
        }
        
        /* تأثير ظهور تدريجي */
        .stagger-fade-in > * {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .stagger-fade-in > *:nth-child(1) { animation-delay: 0.1s; }
        .stagger-fade-in > *:nth-child(2) { animation-delay: 0.2s; }
        .stagger-fade-in > *:nth-child(3) { animation-delay: 0.3s; }
        .stagger-fade-in > *:nth-child(4) { animation-delay: 0.4s; }
        .stagger-fade-in > *:nth-child(5) { animation-delay: 0.5s; }
        
        /* تأثير تحميل */
        .wave-loading {
            display: flex;
            justify-content: center;
            gap: 5px;
        }
        
        .wave-loading span {
            width: 5px;
            height: 20px;
            background: var(--primary);
            animation: waveLoading 1s ease-in-out infinite;
            border-radius: 2px;
        }
        
        .wave-loading span:nth-child(2) { animation-delay: 0.1s; }
        .wave-loading span:nth-child(3) { animation-delay: 0.2s; }
        .wave-loading span:nth-child(4) { animation-delay: 0.3s; }
        .wave-loading span:nth-child(5) { animation-delay: 0.4s; }
        
        @keyframes waveLoading {
            0%, 100% {
                transform: scaleY(1);
            }
            50% {
                transform: scaleY(2);
            }
        }
        
        /* تأثير اهتزاز النجاح */
        @keyframes successShake {
            0%, 100% {
                transform: scale(1);
            }
            10%, 30%, 50%, 70%, 90% {
                transform: scale(1.1) rotate(5deg);
            }
            20%, 40%, 60%, 80% {
                transform: scale(1.1) rotate(-5deg);
            }
        }
        
        /* تأثير تحميل دوار */
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s linear infinite;
        }
    `;
    
    document.head.appendChild(style);
}

// ====== دوال مساعدة عامة ======
window.animateElement = function(elementId, animationName, duration = 1000) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.animation = `${animationName} ${duration}ms ease`;
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }
};

window.animateSuccess = function(elementId) {
    animateElement(elementId, 'successShake', 1000);
};

window.createConfetti = function(x, y, count = 50) {
    const colors = ['#4A90E2', '#2ECC71', '#E74C3C', '#F39C12', '#9B59B6', '#FFD700'];
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        
        confetti.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            z-index: 9999;
            opacity: 0.8;
        `;
        
        document.body.appendChild(confetti);
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        
        confetti.animate([
            {
                transform: 'translate(0, 0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `
                    translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance + 200}px)
                    rotate(${Math.random() * 360}deg)
                `,
                opacity: 0
            }
        ], {
            duration: Math.random() * 1000 + 1000,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        }).onfinish = () => {
            confetti.remove();
        };
    }
};

// دوال لصفحات محددة
window.initHomeAnimations = initHomepageAnimations;