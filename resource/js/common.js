// 두 개의 fetch 요청 완료 여부를 추적할 플래그 선언
let isHeaderLoaded = false;
let isFooterLoaded = false;
// header fetch
fetch("../../include/header.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector(".header").innerHTML = data;
        isHeaderLoaded = true; // header 로드 완료 표시
        initHeader();
});
// 헤더 관련
function initHeader(){

}
// footer fetch
fetch("../../include/footer.html")
.then(response => response.text())
.then(data => {
    document.querySelector(".footer").innerHTML = data;
    isFooterLoaded = true; // footer 로드 완료 표시
    initFooter();
});
// 푸터 관련
function initFooter(){

}
$(document).ready(function () {
    simpleBar();
    sideMenu();
    swiperBox();
});
function simpleBar() {
    if (typeof SimpleBar !== 'undefined') { // SimpleBar가 정의되어 있을 때만 실행
        // 첫 번째 .x-scroll 요소들에 대해 SimpleBar 초기화
        document.querySelectorAll('.x-scroll').forEach(element => {
            new SimpleBar(element, {
                autoHide: false, // 스크롤바가 항상 보이도록 설정
                direction: 'ltr', // 스크롤 방향 설정 (왼쪽에서 오른쪽)
                scrollbarMinSize: 120, // 손잡이의 최소 크기를 120px로 설정
                scrollbarMaxSize: 120, // 손잡이의 최대 크기를 120px로 설정
            });
        });

        // 두 번째 .custom-select.sub:not(.checked) .options 요소들에 대해 SimpleBar 초기화
        document.querySelectorAll('.custom-select.sub:not(.checked) .options').forEach(element => {
            new SimpleBar(element, {
                autoHide: false, // 스크롤바가 항상 보이도록 설정
                direction: 'ltr', // 스크롤 방향 설정 (왼쪽에서 오른쪽)
                scrollbarMinSize: 120, // 손잡이의 최소 크기를 120px로 설정
                scrollbarMaxSize: 120, // 손잡이의 최대 크기를 120px로 설정
            });
        });
    } else {
        console.warn('SimpleBar is not defined. Please ensure that the SimpleBar library is loaded.');
    }


}
function sideMenu() {

    /* 모바일 따로 씀 */
    if (window.innerWidth <= 1024) {
        // 기존에 등록된 이벤트를 제거
        $('.sitemap').off('click');
        $('.side-menu--close').off('click');
        $('.side-menu__depth01').off('click');
        $('.side-menu--close, .side-menu__bg').off('click');

        $('.sitemap').click(function () {
            $(this).addClass('is-click');
            if ($(this).hasClass('is-click')) {
                $('.side-menu').addClass('is-open');
                $('body').addClass("overflow-hidden");
            } else {
                $('.side-menu').removeClass('is-open');
                $('body').removeClass("overflow-hidden");
            }
        });

        $('.side-menu--close').click(function () {
            $('.sitemap').removeClass('is-click');
            $(".side-menu").removeClass('is-open');
            $('body').removeClass("overflow-hidden");
        });

        $('.side-menu__depth02').hide();

        $('.side-menu--close, .side-menu__bg').click(function () {
            $('.sitemap').removeClass('is-click');
            $(".side-menu").removeClass('is-open');
            $('body').removeClass("overflow-hidden");
        });

        $('.side-menu__depth02').hide();

        $('.side-menu__depth01:not(.no-dep)').click(function () {
            $(this).toggleClass('is-open');
            $(this).parents(".side-menu__item").toggleClass('is-open');
            if ($(this).hasClass('is-open')) {
                $('.side-menu__depth01').not(this).removeClass("is-open");
                $('.side-menu__depth01').not(this).parents(".side-menu__item").removeClass("is-open");
                $('.side-menu__depth01').not(this).next().slideUp();
                $(this).next().slideDown();
            } else {
                $(this).next().slideUp();
            }
        });
    } else {
        // 기존에 등록된 이벤트를 제거
        $('.sitemap').off('click');
        $('.side-menu--close').off('click');

        $('.sitemap').click(function () {
            $(this).addClass('is-click');
            if ($(this).hasClass('is-click')) {
                $(".bg").addClass("sideOn");
                $('.side-menu').addClass('is-open');
                $('body').addClass("overflow-hidden");
            } else {

                $('.side-menu').removeClass('is-open');
                $('body').removeClass("overflow-hidden");
            }
        });

        $('.side-menu--close').click(function () {
            $(".bg").removeClass("sideOn");
            $('.sitemap').removeClass('is-click');
            $(".side-menu").removeClass('is-open');
            $('body').removeClass("overflow-hidden");
        });

        $('.side-menu__depth02').hide();


        // .side-menu__item에 대해 마우스 오버/아웃 이벤트 처리
        document.querySelectorAll('.side-menu__item').forEach((sideMenuItem) => {
            const depth01Link = sideMenuItem.querySelector('.side-menu__depth01');

            sideMenuItem.addEventListener('mouseenter', function () {
                // 부모 항목과 해당 메뉴의 depth01에 active 클래스 추가
                sideMenuItem.classList.add('active');
                if (depth01Link) {
                    depth01Link.classList.add('active');
                }
            });

            sideMenuItem.addEventListener('mouseleave', function () {
                // 마우스가 벗어날 때 active 클래스 제거
                if (!sideMenuItem.querySelector('.side-menu__depth02:hover') && !sideMenuItem.querySelector('.side-menu__depth03:hover')) {
                    sideMenuItem.classList.remove('active');
                    if (depth01Link) {
                        depth01Link.classList.remove('active');
                    }
                }
            });
        });

        // .side-menu__depth02 항목에 대한 이벤트 처리
        document.querySelectorAll('.side-menu__depth02 > li').forEach((depth02Li) => {
            const depth02Link = depth02Li.querySelector('a');

            depth02Li.addEventListener('mouseenter', function () {
                // 해당 li에 active 클래스 추가
                depth02Li.classList.add('active');

                // 상위 .side-menu__item에 active 클래스 추가
                const parentSideMenuItem = depth02Li.closest('.side-menu__item');
                if (parentSideMenuItem) {
                    parentSideMenuItem.classList.add('active');
                    const depth01Link = parentSideMenuItem.querySelector('.side-menu__depth01');
                    if (depth01Link) {
                        depth01Link.classList.add('active');
                    }
                }
            });

            depth02Li.addEventListener('mouseleave', function () {
                // 마우스가 벗어날 때만 active 클래스 제거
                depth02Li.classList.remove('active');

                const parentSideMenuItem = depth02Li.closest('.side-menu__item');
                if (parentSideMenuItem && !parentSideMenuItem.querySelector('.side-menu__depth02:hover') && !parentSideMenuItem.querySelector('.side-menu__depth03:hover')) {
                    parentSideMenuItem.classList.remove('active');
                    const depth01Link = parentSideMenuItem.querySelector('.side-menu__depth01');
                    if (depth01Link) {
                        depth01Link.classList.remove('active');
                    }
                }
            });
        });

        // .side-menu__depth03 항목에 대한 이벤트 처리
        document.querySelectorAll('.side-menu__depth03 a').forEach((depth03Link) => {
            depth03Link.addEventListener('mouseenter', function () {
                // 해당 depth03 항목의 상위 li에 active 클래스 추가
                const parentLi = this.closest('li');
                if (parentLi) {
                    parentLi.classList.add('active');
                }

                // 상위 .side-menu__depth02와 .side-menu__item에 active 클래스 추가
                const parentDepth02 = parentLi.closest('.side-menu__depth02');
                if (parentDepth02) {
                    parentDepth02.classList.add('active');
                    const parentSideMenuItem = parentDepth02.closest('.side-menu__item');
                    if (parentSideMenuItem) {
                        parentSideMenuItem.classList.add('active');
                        const depth01Link = parentSideMenuItem.querySelector('.side-menu__depth01');
                        if (depth01Link) {
                            depth01Link.classList.add('active');
                        }
                    }
                }
            });

            depth03Link.addEventListener('mouseleave', function () {
                // 마우스가 벗어날 때만 active 클래스 제거
                const parentLi = this.closest('li');
                if (parentLi) {
                    parentLi.classList.remove('active');
                }

                const parentDepth02 = parentLi.closest('.side-menu__depth02');
                if (parentDepth02) {
                    parentDepth02.classList.remove('active');
                }

                const parentSideMenuItem = parentDepth02.closest('.side-menu__item');
                if (parentSideMenuItem && !parentSideMenuItem.querySelector('.side-menu__depth02:hover') && !parentSideMenuItem.querySelector('.side-menu__depth03:hover')) {
                    parentSideMenuItem.classList.remove('active');
                    const depth01Link = parentSideMenuItem.querySelector('.side-menu__depth01');
                    if (depth01Link) {
                        depth01Link.classList.remove('active');
                    }
                }
            });
        });










    }
}
// sideMenu() 호출
sideMenu();
// 윈도우 리사이즈 시 이벤트 핸들러를 다시 등록
window.addEventListener('resize', function () {
    sideMenu();
});
function swiperBox() {


    var swiper = new Swiper('.mainSwiper.swiper-container', {
        loop: true,
        effect: 'fade',
        pagination: {
            el: '.mainSwiper .swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return `
                <span class="${className}">
                    <div class="circular-progress">
                        <svg class="progress-circle" width="30" height="30" viewBox="0 0 36 36">
                            <path class="circle-bg"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path class="circle" stroke-dasharray="100, 100" stroke-dashoffset="100"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                    </div>
                    <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">${index + 1}</span>
                </span>`;
            }
        },

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },

        on: {
            slideChangeTransitionStart: function () {
                resetAllProgressCircles();
            },
            slideChangeTransitionEnd: function () {
                if (isPlaying) {
                    startProgressCircleForCurrentBullet();
                }
            },
        },
    });

    let isPlaying = true;

    // Reset all progress circles
    function resetAllProgressCircles() {
        const allProgressCircles = document.querySelectorAll('.progress-circle .circle');
        allProgressCircles.forEach(circle => {
            circle.style.transition = 'none';
            circle.style.strokeDashoffset = '100';
        });
    }

    // Start the progress circle for the current active bullet
    function startProgressCircleForCurrentBullet() {
        const activeBullet = document.querySelector('.swiper-pagination-bullet-active .progress-circle .circle');
        const circumference = 2 * Math.PI * 15.9155;
        if (activeBullet) {
            activeBullet.style.transition = `stroke-dashoffset 3000ms linear`;
            activeBullet.style.strokeDasharray = `${circumference} ${circumference}`;
            activeBullet.style.strokeDashoffset = '0';
        }
    }

    const playPauseButton = document.querySelector('.play-pause-button');

    playPauseButton.addEventListener('click', function () {
        if (isPlaying) {
            swiper.autoplay.stop();
            resetAllProgressCircles(); // Reset the SVG progress when paused
            playPauseButton.textContent = '';
            playPauseButton.classList.add('paused');
        } else {
            swiper.slideTo(swiper.activeIndex, 0, false); // Reset to the current slide
            swiper.autoplay.start();
            startProgressCircleForCurrentBullet();
            playPauseButton.textContent = '';
            playPauseButton.classList.remove('paused');
        }
        isPlaying = !isPlaying;
    });

    document.querySelector('.nav-button.next').addEventListener('click', function () {
        swiper.slideNext();
    });

    document.querySelector('.nav-button.prev').addEventListener('click', function () {
        swiper.slidePrev();
    });

    swiper.on('slideChangeTransitionEnd', function () {
        if (!isPlaying) {
            resetAllProgressCircles(); // Ensure the SVG resets after the transition if paused
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        startProgressCircleForCurrentBullet();
    });



    var se1__menuSwiper = new Swiper('.se1__menuSwiper.swiper-container', {
        slidesPerView: 4,
        breakpoints: {
            320: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 4,
            },
        },
        pagination: {
            el: '.se1__menuSwiper .swiper-pagination',
            clickable: true,
        },
    });



    var se2__rightSwiper = new Swiper('.se2__bottomSwiper.swiper-container', {
        slidesPerView: 4,
        spaceBetween: 20,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: ".se2__top .nav-button.next",
            prevEl: ".se2__top .nav-button.prev",
        },
        breakpoints: {
            320: {
                slidesPerView: "auto",
                spaceBetween: 10,
                freeMode: false
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        },
        freeMode: true,
        scrollbar: {
            el: ".se2__bottomSwiper .swiper-scrollbar",
        },
    });

    var se3__rightSwiper = new Swiper('.se3__rightSwiper.swiper-container', {
        slidesPerView: "auto",
        spaceBetween: 50,
        loop: true,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: ".se3__left .nav-button.next",
            prevEl: ".se3__left .nav-button.prev",
        },
        pagination: {
            el: '.se3__rightSwiper .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                loop: true,
                centeredSlides: true,
                slidesPerView: 1,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: "auto",
                spaceBetween: 50,
                centeredSlides: false,

            },
        },

    });

    var se4__rightSwiper = new Swiper('.se4__bottomSwiper.swiper-container', {
        slidesPerView: 1,
        loop: true,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: ".se4__bottom .nav-button.next",
            prevEl: ".se4__bottom .nav-button.prev",
        },
        pagination: {
            el: '.se4__bottomSwiper .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            1024: {},
        },
    });

    var se5__rightSwiper = new Swiper('.se5__bottomSwiper.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 20,
        observer: true,
        observeParents: true,
        pagination: {
            el: '.se5__bottomSwiper .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });



}


