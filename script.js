document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       ۱. تم تاریک و روشن
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const icon = themeToggleBtn.querySelector('i');
    
    if (localStorage.getItem('theme') === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    /* ==========================================================================
       ۲. منوی همبرگری موبایل
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    if(hamburgerBtn) {
        const menuIcon = hamburgerBtn.querySelector('i');
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            if(navLinks.classList.contains('show')) {
                menuIcon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                menuIcon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }

    /* ==========================================================================
       ۳. افکت ذره‌ای متحرک خلاقانه (تنها در صفحه اصلی)
       ========================================================================== */
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];
        const numberOfParticles = 60;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.8 - 0.4;
                this.speedY = Math.random() * 0.8 - 0.4;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            }
            draw() {
                ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
                ctx.globalAlpha = 0.25;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    /* ==========================================================================
       ۴. افکت تایپ اتوماتیک (صفحه اصلی)
       ========================================================================== */
    const typedTextSpan = document.getElementById("typed-output");
    if (typedTextSpan) {
        const textArray = ["توسعه‌دهنده وب فرانت‌اند", "طراح تجربه کاربری (UI/UX)", "متخصص پردازش تصویر هوش مصنوعی", "پشتیبان ارشد سیستم‌های هوشمند"];
        let textArrayIndex = 0, charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 80);
            } else {
                setTimeout(erase, 2500);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 40);
            } else {
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                setTimeout(type, 600);
            }
        }
        setTimeout(type, 500);
    }

    /* ==========================================================================
       ۵. افکت لمس تعاملی ۳بعدی کارت‌ها (صفحه خدمات)
       ========================================================================== */
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);
            card.style.transform = `perspective(1000px) rotateX(${-y / 12}deg) rotateY(${x / 12}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    /* ==========================================================================
       ۶. پر شدن اتوماتیک نوار مهارت‌ها هنگام مشاهده
       ========================================================================== */
    const progressBars = document.querySelectorAll('.progress');
    if(progressBars.length > 0) {
        setTimeout(() => {
            progressBars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }, 400);
    }

    /* ==========================================================================
       ۷. سیستم اسلایدر مقایسه‌ای پیشرفته قبل/بعد (صفحه نمونه‌کار)
       ========================================================================== */
    const sliderContainer = document.querySelector('.before-after-container');
    if (sliderContainer) {
        const resizeWrapper = sliderContainer.querySelector('.resize-img-wrapper');
        const handle = sliderContainer.querySelector('.handle-bar');
        
        function moveSlider(x) {
            let rect = sliderContainer.getBoundingClientRect();
            let position = ((x - rect.left) / rect.width) * 100;
            
            if (position < 0) position = 0;
            if (position > 100) position = 100;
            
            // در زبان‌های راست‌چین، محاسبات را هماهنگ نگه می‌دارد
            handle.style.left = position + '%';
            resizeWrapper.style.width = position + '%';
        }

        sliderContainer.addEventListener('mousemove', (e) => {
            moveSlider(e.clientX);
        });

        sliderContainer.addEventListener('touchmove', (e) => {
            moveSlider(e.touches[0].clientX);
        });
    }

    /* ==========================================================================
       ۸. فیلتر گالری و لایت‌باکس کیس‌استادی پرمیوم (صفحه نمونه‌کار)
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    // منطق سیستم نمایش پاپ آپ جزئیات (Lightbox Case-Study)
    const lightbox = document.getElementById('portfolio-lightbox');
    if(lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxTech = document.getElementById('lightbox-tech-tags');
        const lightboxDesc = document.getElementById('lightbox-desc');
        const closeBtn = document.querySelector('.lightbox-close');

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightboxImg.src = item.querySelector('.portfolio-img').src;
                lightboxTitle.textContent = item.getAttribute('data-title');
                lightboxTech.textContent = item.getAttribute('data-tech');
                lightboxDesc.textContent = item.getAttribute('data-desc');
                
                lightbox.classList.add('show');
            });
        });

        closeBtn.addEventListener('click', () => lightbox.classList.remove('show'));
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) lightbox.classList.remove('show');
        });
    }

    /* ==========================================================================
       ۹. انیمیشن هوشمند ورود المان‌ها و فرم تماس
       ========================================================================== */
    const reveals = document.querySelectorAll(".reveal");
    function revealOnScroll() {
        reveals.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight - 30) {
                element.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const inputs = {
                name: document.getElementById('name'),
                email: document.getElementById('email'),
                message: document.getElementById('message')
            };

            document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
            document.getElementById('form-success').style.display = 'none';

            if (!inputs.name.value.trim()) {
                document.getElementById('name-error').textContent = 'لطفاً نام خود را وارد کنید.';
                isValid = false;
            }
            if (!inputs.email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email.value)) {
                document.getElementById('email-error').textContent = 'آدرس ایمیل وارد شده نامعتبر است.';
                isValid = false;
            }
            if (!inputs.message.value.trim()) {
                document.getElementById('message-error').textContent = 'متن پیام نمی‌تواند خالی باشد.';
                isValid = false;
            }

            if (isValid) {
                const btn = contactForm.querySelector('.submit-btn');
                const originalContent = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> در حال ارسال...';
                
                setTimeout(() => {
                    document.getElementById('form-success').style.display = 'block';
                    contactForm.reset();
                    btn.innerHTML = originalContent;
                }, 1400);
            }
        });
    }
});
