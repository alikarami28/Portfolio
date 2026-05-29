document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       ۱. تم تاریک و روشن
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (themeToggleBtn) {

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

    }

    /* ==========================================================================
       ۲. منوی همبرگری موبایل
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerBtn) {

        const menuIcon = hamburgerBtn.querySelector('i');

        hamburgerBtn.addEventListener('click', () => {

            navLinks.classList.toggle('show');

            if (navLinks.classList.contains('show')) {

                menuIcon.classList.replace('fa-bars', 'fa-xmark');

            } else {

                menuIcon.classList.replace('fa-xmark', 'fa-bars');

            }

        });

    }

    /* ==========================================================================
       ۳. افکت ذره‌ای متحرک
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

                if (this.x > canvas.width || this.x < 0) {
                    this.speedX = -this.speedX;
                }

                if (this.y > canvas.height || this.y < 0) {
                    this.speedY = -this.speedY;
                }

            }

            draw() {

                ctx.fillStyle =
                    getComputedStyle(document.documentElement)
                    .getPropertyValue('--accent-color')
                    .trim();

                ctx.globalAlpha = 0.25;

                ctx.beginPath();

                ctx.arc(
                    this.x,
                    this.y,
                    this.size,
                    0,
                    Math.PI * 2
                );

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
       ۴. افکت تایپ اتوماتیک
       ========================================================================== */
    const typedTextSpan = document.getElementById("typed-output");

    if (typedTextSpan) {

        const textArray = [
            "توسعه‌دهنده وب فرانت‌اند",
            "طراح تجربه کاربری (UI/UX)",
            "متخصص پردازش تصویر هوش مصنوعی",
            "پشتیبان ارشد سیستم‌های هوشمند"
        ];

        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {

            if (charIndex < textArray[textArrayIndex].length) {

                typedTextSpan.textContent +=
                    textArray[textArrayIndex].charAt(charIndex);

                charIndex++;

                setTimeout(type, 80);

            } else {

                setTimeout(erase, 2500);

            }

        }

        function erase() {

            if (charIndex > 0) {

                typedTextSpan.textContent =
                    textArray[textArrayIndex]
                    .substring(0, charIndex - 1);

                charIndex--;

                setTimeout(erase, 40);

            } else {

                textArrayIndex =
                    (textArrayIndex + 1) % textArray.length;

                setTimeout(type, 600);

            }

        }

        setTimeout(type, 500);

    }

    /* ==========================================================================
       ۵. افکت سه‌بعدی کارت‌ها
       ========================================================================== */
    const cards = document.querySelectorAll('.service-card');

    cards.forEach(card => {

        card.addEventListener('mousemove', (e) => {

            const rect = card.getBoundingClientRect();

            const x =
                e.clientX - rect.left - (rect.width / 2);

            const y =
                e.clientY - rect.top - (rect.height / 2);

            card.style.transform =
                `perspective(1000px)
                 rotateX(${-y / 12}deg)
                 rotateY(${x / 12}deg)
                 translateY(-8px)`;

        });

        card.addEventListener('mouseleave', () => {

            card.style.transform =
                'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';

        });

    });

    /* ==========================================================================
       ۶. نوار مهارت‌ها
       ========================================================================== */
    const progressBars = document.querySelectorAll('.progress');

    if (progressBars.length > 0) {

        setTimeout(() => {

            progressBars.forEach(bar => {

                bar.style.width =
                    bar.getAttribute('data-width');

            });

        }, 400);

    }

    /* ==========================================================================
       ۷. اسلایدر قبل و بعد
       ========================================================================== */
    const sliderContainer =
        document.querySelector('.before-after-container');

    if (sliderContainer) {

        const resizeWrapper =
            sliderContainer.querySelector('.resize-img-wrapper');

        const handle =
            sliderContainer.querySelector('.handle-bar');

        function moveSlider(x) {

            let rect =
                sliderContainer.getBoundingClientRect();

            let position =
                ((x - rect.left) / rect.width) * 100;

            if (position < 0) position = 0;
            if (position > 100) position = 100;

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
       ۸. فیلتر گالری
       ========================================================================== */
    const filterBtns =
        document.querySelectorAll('.filter-btn');

    const galleryItems =
        document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0) {

        filterBtns.forEach(btn => {

            btn.addEventListener('click', () => {

                filterBtns.forEach(b =>
                    b.classList.remove('active')
                );

                btn.classList.add('active');

                const filterValue =
                    btn.getAttribute('data-filter');

                galleryItems.forEach(item => {

                    if (
                        filterValue === 'all' ||
                        item.getAttribute('data-category') === filterValue
                    ) {

                        item.classList.remove('hidden');

                    } else {

                        item.classList.add('hidden');

                    }

                });

            });

        });

    }

    /* ==========================================================================
       ۹. لایت‌باکس
       ========================================================================== */
    const lightbox =
        document.getElementById('portfolio-lightbox');

    if (lightbox) {

        const lightboxImg =
            document.getElementById('lightbox-img');

        const lightboxTitle =
            document.getElementById('lightbox-title');

        const lightboxTech =
            document.getElementById('lightbox-tech-tags');

        const lightboxDesc =
            document.getElementById('lightbox-desc');

        const closeBtn =
            document.querySelector('.lightbox-close');

        galleryItems.forEach(item => {

            item.addEventListener('click', () => {

                lightboxImg.src =
                    item.querySelector('.portfolio-img').src;

                lightboxTitle.textContent =
                    item.getAttribute('data-title');

                lightboxTech.textContent =
                    item.getAttribute('data-tech');

                lightboxDesc.textContent =
                    item.getAttribute('data-desc');

                lightbox.classList.add('show');

            });

        });

        closeBtn.addEventListener('click', () => {

            lightbox.classList.remove('show');

        });

        lightbox.addEventListener('click', (e) => {

            if (e.target === lightbox) {

                lightbox.classList.remove('show');

            }

        });

    }

    /* ==========================================================================
       ۱۰. انیمیشن ورود
       ========================================================================== */
    const reveals =
        document.querySelectorAll(".reveal");

    function revealOnScroll() {

        reveals.forEach(element => {

            if (
                element.getBoundingClientRect().top <
                window.innerHeight - 30
            ) {

                element.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", revealOnScroll);

    revealOnScroll();

    /* ==========================================================================
       ۱۱. فرم تماس + ارسال به تلگرام
       ========================================================================== */
    const contactForm =
        document.getElementById('contact-form');

    if (contactForm) {

        contactForm.addEventListener('submit', async (e) => {

            e.preventDefault();

            let isValid = true;

            const inputs = {

                name:
                    document.getElementById('name'),

                email:
                    document.getElementById('email'),

                message:
                    document.getElementById('message')

            };

            document
                .querySelectorAll('.error-text')
                .forEach(el => el.textContent = '');

            document
                .getElementById('form-success')
                .style.display = 'none';

            if (!inputs.name.value.trim()) {

                document
                    .getElementById('name-error')
                    .textContent =
                    'لطفاً نام خود را وارد کنید.';

                isValid = false;

            }

            if (
                !inputs.email.value.trim() ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email.value)
            ) {

                document
                    .getElementById('email-error')
                    .textContent =
                    'آدرس ایمیل نامعتبر است.';

                isValid = false;

            }

            if (!inputs.message.value.trim()) {

                document
                    .getElementById('message-error')
                    .textContent =
                    'متن پیام نمی‌تواند خالی باشد.';

                isValid = false;

            }

            if (!isValid) return;

            const btn =
                contactForm.querySelector('.submit-btn');

            const originalContent =
                btn.innerHTML;

            btn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> در حال ارسال...';

            try {

                const response =
                    await fetch('/api/contact', {

                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({

                        name: inputs.name.value,

                        email: inputs.email.value,

                        message: inputs.message.value,

                    }),

                });

                const data =
                    await response.json();

                if (data.success) {

                    document
                        .getElementById('form-success')
                        .style.display = 'block';

                    contactForm.reset();

                } else {

                    alert('ارسال پیام ناموفق بود ❌');

                }

            } catch (error) {

                console.log(error);

                alert('خطا در اتصال ❌');

            }

            btn.innerHTML = originalContent;

        });

    }

});