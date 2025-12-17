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
    
    // 6. التحقق من حالة المستخدم
    checkUserStatus();
    
    // 7. إعداد زر "استخدم الذكاء الآن"
    setupStartButton();
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

// ====== 6. التحقق من حالة المستخدم ======
function checkUserStatus() {
    try {
        const currentUser = localStorage.getItem('currentUser');
        const authButtons = document.querySelector('.auth-buttons');
        
        if (currentUser && authButtons) {
            const user = JSON.parse(currentUser);
            
            // تحديث أزرار المصادقة
            authButtons.innerHTML = `
                <div class="user-dropdown">
                    <button class="user-btn">
                        <i class="fas fa-user-circle"></i>
                        ${user.fullName.split(' ')[0]}
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="dropdown-menu">
                        <a href="pages/upload.html"><i class="fas fa-file-upload"></i> رفع ملف جديد</a>
                        <a href="#"><i class="fas fa-history"></i> سجل التحليلات</a>
                        <a href="#"><i class="fas fa-cog"></i> الإعدادات</a>
                        <hr>
                        <a href="#" onclick="logout()"><i class="fas fa-sign-out-alt"></i> تسجيل الخروج</a>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('خطأ في التحقق من حالة المستخدم:', error);
    }
}

// ====== 7. إعداد زر "استخدم الذكاء الآن" ======
function setupStartButton() {
    const startBtn = document.getElementById('startNowBtn');
    
    if (startBtn) {
        startBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleStartButtonClick();
        });
    }
}

function handleStartButtonClick() {
    try {
        // التحقق إذا كان المستخدم مسجلاً
        const currentUser = localStorage.getItem('currentUser');
        
        if (currentUser) {
            // المستخدم مسجل - توجيه إلى صفحة الرفع
            const user = JSON.parse(currentUser);
            
            // عرض رسالة ترحيب
            showNotification(`مرحباً ${user.fullName.split(' ')[0]}! جاري تحويلك...`, 'success');
            
            // توجيه إلى صفحة الرفع بعد تأخير بسيط
            setTimeout(() => {
                window.location.href = 'pages/upload.html';
            }, 1000);
            
        } else {
            // المستخدم غير مسجل - توجيه إلى صفحة تسجيل الدخول
            showNotification('يجب تسجيل الدخول أولاً', 'info');
            
            // عرض خيارات المصادقة
            showAuthModal();
        }
    } catch (error) {
        console.error('خطأ في معالجة زر البدء:', error);
        showNotification('حدث خطأ. حاول مرة أخرى', 'error');
    }
}

// ====== 8. عرض مودال المصادقة ======
function showAuthModal() {
    // إنشاء المودال
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="auth-modal-content">
            <div class="auth-modal-header">
                <h3><i class="fas fa-lock"></i> تسجيل الدخول مطلوب</h3>
                <button class="close-modal" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="auth-modal-body">
                <p>يجب أن تكون مسجلاً في المنصة لاستخدام ميزات الذكاء الاصطناعي</p>
                
                <div class="auth-options">
                    <a href="pages/login.html" class="auth-option-btn login-option">
                        <i class="fas fa-sign-in-alt"></i>
                        <span>تسجيل الدخول</span>
                        <small>لديك حساب بالفعل؟</small>
                    </a>
                    
                    <a href="pages/register.html" class="auth-option-btn register-option">
                        <i class="fas fa-user-plus"></i>
                        <span>إنشاء حساب جديد</span>
                        <small>انضم إلينا الآن</small>
                    </a>
                </div>
                
                <div class="auth-benefits">
                    <h4><i class="fas fa-gift"></i> مزايا التسجيل:</h4>
                    <ul>
                        <li><i class="fas fa-check"></i> تحليل 50 ملف شهرياً مجاناً</li>
                        <li><i class="fas fa-check"></i> حفظ جميع التحليلات</li>
                        <li><i class="fas fa-check"></i> دعم فني مميز 24/7</li>
                        <li><i class="fas fa-check"></i> تحديثات مستمرة</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    // إضافة الأنماط
    const style = document.createElement('style');
    style.textContent = `
        .auth-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .auth-modal-content {
            background: white;
            border-radius: 20px;
            width: 90%;
            max-width: 500px;
            overflow: hidden;
            animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .auth-modal-header {
            background: var(--gradient);
            color: white;
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .auth-modal-header h3 {
            margin: 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .close-modal {
            background: transparent;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 5px;
            border-radius: 5px;
            transition: var(--transition);
        }
        
        .close-modal:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .auth-modal-body {
            padding: 2rem;
        }
        
        .auth-modal-body p {
            color: #666;
            text-align: center;
            margin-bottom: 2rem;
            font-size: 1.1rem;
        }
        
        .auth-options {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .auth-option-btn {
            border: 2px solid #e0e0e0;
            border-radius: 15px;
            padding: 1.5rem;
            text-align: center;
            text-decoration: none;
            transition: var(--transition);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }
        
        .auth-option-btn i {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }
        
        .auth-option-btn span {
            font-weight: 600;
            font-size: 1.1rem;
            color: var(--secondary);
        }
        
        .auth-option-btn small {
            color: #666;
            font-size: 0.9rem;
        }
        
        .login-option {
            border-color: var(--primary);
        }
        
        .login-option:hover {
            background: rgba(74, 144, 226, 0.1);
            transform: translateY(-5px);
        }
        
        .register-option {
            border-color: var(--success);
        }
        
        .register-option:hover {
            background: rgba(46, 204, 113, 0.1);
            transform: translateY(-5px);
        }
        
        .auth-benefits {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 15px;
            border: 1px solid #e9ecef;
        }
        
        .auth-benefits h4 {
            color: var(--secondary);
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .auth-benefits ul {
            list-style: none;
            padding: 0;
        }
        
        .auth-benefits li {
            padding: 0.5rem 0;
            color: #666;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .auth-benefits li i {
            color: var(--success);
        }
        
        @media (max-width: 768px) {
            .auth-options {
                grid-template-columns: 1fr;
            }
            
            .auth-modal-content {
                width: 95%;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // إغلاق المودال عند النقر خارج المحتوى
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// ====== 9. تسجيل الخروج ======
function logout() {
    if (confirm('هل تريد تسجيل الخروج؟')) {
        localStorage.removeItem('currentUser');
        showNotification('تم تسجيل الخروج بنجاح', 'success');
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
}

// ====== 10. نسخ رابط المشاركة ======
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

// ====== 11. عرض الإشعارات ======
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
        background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--accent)' : 'var(--primary)'};
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
    
    /* أنماط زر المستخدم */
    .user-dropdown {
        position: relative;
    }
    
    .user-btn {
        background: var(--primary);
        color: white;
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: var(--transition);
    }
    
    .user-btn:hover {
        background: var(--secondary);
    }
    
    .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        min-width: 200px;
        border-radius: 8px;
        box-shadow: var(--shadow);
        padding: 0.5rem 0;
        display: none;
        z-index: 1000;
    }
    
    .user-dropdown:hover .dropdown-menu {
        display: block;
        animation: fadeIn 0.2s ease;
    }
    
    .dropdown-menu a {
        display: block;
        padding: 0.8rem 1rem;
        color: var(--secondary);
        text-decoration: none;
        transition: var(--transition);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .dropdown-menu a:hover {
        background: #f8f9fa;
        color: var(--primary);
    }
    
    .dropdown-menu hr {
        margin: 0.5rem 0;
        border: none;
        border-top: 1px solid #eee;
    }
`;
document.head.appendChild(style);

// جعل الدوال متاحة عالمياً
window.copyShareLink = copyShareLink;
window.logout = logout;
window.showNotification = showNotification;