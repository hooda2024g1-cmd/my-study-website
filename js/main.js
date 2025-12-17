// ====== تهيئة الصفحة ======
document.addEventListener('DOMContentLoaded', function() {
    // 1. تفعيل القائمة المتنقلة
    initMobileMenu();
    
    // 2. تشغيل كتابة النص المتحركة
    initTypedText();
    
    // 3. تشغيل العدادات المتحركة
    initCounters();
    
    // 4. تأثيرات التمرير
    initScrollEffects();
    
    // 5. التأكيد على أهمية الاسم الرباعي
    initNameValidation();
});

// ====== 1. القائمة المتنقلة ======
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // تأثير الشريط
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ====== 2. النص المتحرك ======
function initTypedText() {
    const typedText = document.querySelector('.typed-text');
    const cursor = document.querySelector('.cursor');
    
    if (!typedText) return;
    
    const texts = [
        "مرحباً بك في مستقبل التعليم...",
        "أول منصة عربية ذكية...",
        "ابدأ رحلتك الدراسية الآن..."
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function type() {
        if (isPaused) return;
        
        const currentText = texts[textIndex];
        
        if (!isDeleting && charIndex <= currentText.length) {
            typedText.textContent = currentText.substring(0, charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex >= 0) {
            typedText.textContent = currentText.substring(0, charIndex);
            charIndex--;
            setTimeout(type, 50);
        } else {
            isDeleting = !isDeleting;
            
            if (!isDeleting) {
                textIndex = (textIndex + 1) % texts.length;
            }
            
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                type();
            }, 1500);
        }
    }
    
    // بدء الكتابة
    setTimeout(type, 1000);
}

// ====== 3. العدادات المتحركة ======
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    function updateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const count = parseInt(counter.textContent);
        const increment = Math.ceil(target / speed);
        
        if (count < target) {
            counter.textContent = count + increment;
            setTimeout(() => updateCounter(counter), 10);
        } else {
            counter.textContent = target;
        }
    }
    
    // تشغيل العدادات عند التمرير
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    updateCounter(counter);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    if (counters.length > 0) {
        observer.observe(document.querySelector('.stats'));
    }
}

// ====== 4. تأثيرات التمرير ======
function initScrollEffects() {
    // تثبيت النافبار عند التمرير
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'white';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'var(--shadow)';
        }
        
        // إخفاء النافبار عند التمرير لأسفل
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // تأثير ظهور العناصر
    const fadeElements = document.querySelectorAll('.feature-card, .section-title, .section-subtitle');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => fadeObserver.observe(el));
}

// ====== 5. التحقق من الاسم الرباعي ======
function initNameValidation() {
    const nameInput = document.getElementById('fullName');
    
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            const names = this.value.trim().split(/\s+/);
            const errorElement = this.nextElementSibling;
            
            if (names.length < 4) {
                this.style.borderColor = 'var(--accent)';
                if (errorElement) {
                    errorElement.textContent = 'الرجاء إدخال اسم رباعي (أربع كلمات على الأقل)';
                    errorElement.style.color = 'var(--accent)';
                }
            } else {
                this.style.borderColor = 'var(--success)';
                if (errorElement) {
                    errorElement.textContent = '✓ الاسم صحيح';
                    errorElement.style.color = 'var(--success)';
                }
            }
        });
    }
}

// ====== 6. نسخ رابط المشاركة ======
function copyShareLink() {
    const linkInput = document.getElementById('share-link');
    const copyBtn = document.querySelector('.copy-btn');
    
    linkInput.select();
    linkInput.setSelectionRange(0, 99999);
    
    navigator.clipboard.writeText(linkInput.value)
        .then(() => {
            // تأثير النجاح
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
            copyBtn.style.background = 'var(--success)';
            
            // إظهار رسالة نجاح
            showNotification('تم نسخ الرابط بنجاح! يمكنك الآن مشاركته مع أصدقائك.', 'success');
            
            // العودة للنص الأصلي بعد 3 ثوانٍ
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.style.background = '';
            }, 3000);
        })
        .catch(err => {
            console.error('فشل النسخ:', err);
            showNotification('حدث خطأ أثناء نسخ الرابط. حاول مرة أخرى.', 'error');
        });
}

// ====== 7. عرض الإشعارات ======
function showNotification(message, type = 'info') {
    // إنصراف العنصر
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // الأنيميشن
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--accent)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
    `;
    
    document.body.appendChild(notification);
    
    // إزالة الإشعار بعد 3 ثوانٍ
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// إضافة أنيميشن الإشعارات
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .fade-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);