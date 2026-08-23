'use strict'

// Menu Fixed
const menu = document.querySelector("#mainMenu");
window.addEventListener("scroll", () => {
    if (window.scrollY > 150) {
        menu.classList.add("menu-fixed");
    } else {
        menu.classList.remove("menu-fixed");
    }
});

// Add Icon ZirMenu
const header_menu_level_one = document.querySelectorAll('.header-main__menu-list>ul>li')
header_menu_level_one.forEach(element => {
    if (element.querySelector('ul') !== null) {
        element.querySelector('a').insertAdjacentHTML('afterend', '<i class="fas fa-chevron-down"></i>')
    }
});

const responsive_menu_list = document.querySelectorAll('.responsive-menu__list ul li')
responsive_menu_list.forEach(element => {
    if (element.querySelector('ul') !== null) {
        element.querySelector('a').insertAdjacentHTML('afterend', '<i class="fas fa-chevron-down"></i>')

        const arrow = element.querySelector('.fa-chevron-down')
        arrow.addEventListener('click', () => {
            const target_ul = arrow.parentElement.querySelector('ul')
            target_ul.classList.toggle('show')
            arrow.classList.toggle('rotate')
        })
    }
});

// Animation Content Slider
const box_icon_header_main__content = document.querySelector('.header-main__content-icon ul')
document.addEventListener('DOMContentLoaded', () => {
    const heroIcons = document.querySelector('.header-main__content-icon ul');
    const heroTitle = document.querySelector('.header-main__content-title');
    const heroDesc = document.querySelector('.header-main__content-description');
    const heroBtns = document.querySelector('.header-main__content-btns');

    let playHeroAnimation = () => {
        const items = [
            { el: heroIcons, delay: 0 },
            { el: heroTitle, delay: 150 },
            { el: heroDesc, delay: 300 },
            { el: heroBtns, delay: 450 },
        ];

        items.forEach(({ el, delay }) => {
            el.classList.remove('animate-in');
            void el.offsetWidth;
            setTimeout(() => {
                el.classList.add('animate-in');
            }, delay);
        });
    }

    const headerSwiper = new Swiper('.header-swiper', {
        effect: "creative",

        creativeEffect: {
            prev: {
                shadow: false,
                translate: ["-20%", 0, -1],
            },
            next: {
                translate: ["100%", 0, 0],
            },
        },

        speed: 1800,

        loop: true,

        allowTouchMove: true,

        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },

        navigation: {
            nextEl: '.next-btn',
            prevEl: '.perv-btn',
        },

        on: {
            init() {
                playHeroAnimation();
            },
            slideChangeTransitionStart() {
                playHeroAnimation();
            }
        }

    });

});

//Top Button
const backToTop = document.querySelector(".backToTop");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show')
    } else {
        backToTop.classList.remove('show')
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Animation Default Btns
document.querySelectorAll('.default-btn').forEach((btn) => {
    let span = btn.querySelector('span');
    let getDirection = (e) => {
        let rect = btn.getBoundingClientRect();
        let x = e.clientX - rect.left - rect.width / 2;
        let y = e.clientY - rect.top - rect.height / 2;
        let nx = x / (rect.width / 2);
        let ny = y / (rect.height / 2);
        let angle = Math.atan2(ny, nx) * 180 / Math.PI;

        if (angle >= -45 && angle < 45) return 'right';
        if (angle >= 45 && angle < 135) return 'bottom';
        if (angle >= -135 && angle < -45) return 'top';
        return 'left';
    }

    btn.addEventListener('mouseenter', (e) => {
        let dir = getDirection(e);
        span.classList.remove('top', 'bottom', 'left', 'right', 'enter');
        void span.offsetWidth;
        span.classList.add(dir);
        requestAnimationFrame(() => {
            span.classList.add('enter');
        });
    });

    btn.addEventListener('mouseleave', () => {
        span.classList.remove('enter');
    });
});


// Slider Our Client Say
const testimonialSwiper = new Swiper('.testimonial-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.testimonial-swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.testimonial-swiper-button-next',
        prevEl: '.testimonial-swiper-button-prev',
    },
});

// Section Gallery
Fancybox.bind("[data-fancybox='gallery']", {
    animated: true,
    dragToClose: true,
    Carousel: {
        infinite: true,
    },

    Toolbar: {
        display: {
            left: ["infobar"],
            middle: [],
            right: ["close"],
        },
    },
    Thumbs: false,
});

// Section Overview Process
const progressSection = document.querySelector(".overview-section-tow");
const progressBars = document.querySelectorAll(".process-line");
let started = false;
window.addEventListener("scroll", () => {
    const top = progressSection.getBoundingClientRect().top;

    if (top < window.innerHeight - 100 && !started) {
        progressBars.forEach(bar => {
            bar.style.width = bar.dataset.width + "%";
        });
        started = true;
    }
});

// Slider Our Clients
const clientSwiper = new Swiper('.swiper-client', {
    slidesPerView: 5,
    spaceBetween: 24,
    freeMode: true,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 15,
        },
        576: {
            slidesPerView: 2,
            spaceBetween: 15
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        992: {
            slidesPerView: 4,
            spaceBetween: 24
        },
        1200: {
            slidesPerView: 5,
            spaceBetween: 24
        }
    }
});

// Section Counter
const counter_numbers = document.querySelectorAll('.counter-number');
const sectionCounter = document.querySelector('.counter-section');
let hasCounted = false;

window.addEventListener('scroll', () => {
    const top = sectionCounter.getBoundingClientRect().top;
    const trigger = window.innerHeight - 200;

    if (hasCounted || top > trigger) return;
    hasCounted = true;

    counter_numbers.forEach(el => {
        const target = +el.dataset.target;
        const duration = 2000;
        const interval = 20;

        const step = target / (duration / interval);

        let count = 0;

        const update = () => {
            count += step;

            if (count < target) {
                el.textContent = `${Math.floor(count)}+`;
                requestAnimationFrame(update, interval);
            } else {
                el.textContent = `${target}+`;
            }
        };

        update();
    });
});