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
function initHeader() {
    $(document).ready(function () {
        // a와 b 선택
        const $aItems = $('.navigation.depth_1 > li');
        const $bItems = $('.depth_2');

        // 배경 요소 및 header 선택
        const $bgElement = $('.bg');
        const $headerElement = $('.header'); // header 요소 선택
        const $containerElement = $('.container'); // container 요소 선택

        // hover 시 bg 높이를 업데이트하는 함수
        function updateBgHeight() {
            const headerHeight = $headerElement.outerHeight(); // header의 높이
            let maxHeight = 0;

            // 모든 depth_2의 높이를 측정하여 최대 높이 찾기
            $bItems.each(function () {
                maxHeight = Math.max(maxHeight, $(this).outerHeight());
            });

            // 모든 depth_2의 높이를 최대 높이에 맞춰 조정
            $bItems.each(function () {
                $(this).css('height', maxHeight + 'px'); // 모든 .depth_2의 높이를 최대 높이로 설정
            });

            // bg의 높이를 header의 높이 + depth_2의 최대 높이로 설정
            $bgElement.css('height', headerHeight + maxHeight + 'px');
        }

        // navi-bg 높이 업데이트 함수
        function updateNaviBgHeight($aItem) {
            const headerHeight = $headerElement.outerHeight(); // header의 높이
            const $relatedBItems = $aItem.find('.depth_2'); // 해당 aItem에 포함된 depth_2 선택

            let maxHeight = 0;
            $relatedBItems.each(function () {
                maxHeight = Math.max(maxHeight, $(this).outerHeight()); // 해당 depth_2의 최대 높이 측정
            });

            const $naviBgElement = $aItem.find('.navi-bg'); // 해당 aItem 내의 navi-bg 요소 선택
            $naviBgElement.css('height', headerHeight + maxHeight + 'px'); // navi-bg의 높이를 업데이트
        }

        // 초기 로드 시 bg 높이 계산
        $bgElement.css('height', '0'); // 초기 상태에서 .bg의 높이를 0으로 설정

        // a의 각 항목에 대한 이벤트 설정
        $aItems.each(function (index) {
            const $aItem = $(this);
            const $bItem = $bItems.eq(index);

            $aItem.on('mouseenter', function () {
                $headerElement.addClass('active');
                updateBgHeight(); // bg 높이 업데이트
                updateNaviBgHeight($aItem); // navi-bg 높이 업데이트
                $aItem.addClass('active');
                if ($bItem.length) {
                    $bItem.addClass('active');
                }
            });

            $aItem.on('mouseleave', function () {
                // aItem에서 나가면 active 클래스를 제거
                $aItem.removeClass('active');
                if ($bItem.length) {
                    $bItem.removeClass('active');
                }

                // header와 bg를 모두 벗어나면 active 해제
                if (!$headerElement.hasClass('active')) {
                    resetBgHeight();
                }
            });
        });

        // b의 각 항목에 대한 이벤트 설정
        $bItems.each(function (index) {
            const $bItem = $(this);
            const $aItem = $aItems.eq(index);

            $bItem.on('mouseenter', function () {
                $headerElement.addClass('active');
                updateBgHeight(); // bg 높이 업데이트
                updateNaviBgHeight($aItem); // navi-bg 높이 업데이트
                $aItem.addClass('active'); // 해당 aItem의 active 상태 유지
                $bItem.addClass('active'); // 해당 bItem의 active 상태 유지
            });

            $bItem.on('mouseleave', function (event) {
                // .depth_2에서 나가면 active 클래스를 제거
                $bItem.removeClass('active');

                // header와 bg를 모두 벗어나면 active 해제
                if (!$headerElement.is(event.relatedTarget) && !$bgElement.is(event.relatedTarget)) {
                    if (!$headerElement.hasClass('active')) {
                        resetBgHeight();
                    }
                }
            });
        });

        // bg와 header를 벗어났을 때 처리
        $(document).on('mouseleave', function (event) {
            if (!$headerElement.is(event.relatedTarget) && !$bgElement.is(event.relatedTarget)) {
                $headerElement.removeClass('active'); // header에서 active 클래스 제거
                resetBgHeight(); // bg 높이 초기화
            }
        });

        // container에 마우스가 올라갔을 때 header active 제거
        $containerElement.on('mouseenter', function () {
            $headerElement.removeClass('active'); // header에서 active 클래스 제거
            resetBgHeight(); // bg 높이 초기화
        });

        // bg 높이 초기화 함수
        function resetBgHeight() {
            $bgElement.css('height', 'auto'); // bg의 높이는 자동으로 설정
            // 모든 depth_2 높이를 초기 상태로 복원
            $bItems.css('height', 'auto'); // 원래 높이로 복원

            // navi-bg의 높이를 0으로 설정
            $('.navi-bg').css('height', '0'); // 모든 navi-bg 요소 높이를 0으로 설정
        }

        $('.depth_2 > li').each(function () {
            const $item = $(this);
            $item.on('mouseenter', function () {
                // Remove 'active' class from all siblings
                $item.siblings().removeClass('active');
                // Add 'active' class to the hovered item
                $item.addClass('active');
            });

            $item.on('mouseleave', function () {
                // Remove 'active' class when mouse leaves
                $item.removeClass('active');
            });
        });
    });
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
function initFooter() {

}
$(document).ready(function () {
    simpleBar();
    sideMenu();
    swiperBox();
    tabMenu();
    accordion();
    customSelect();
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


    var se2__rightSwiper = new Swiper('.se2__rightSwiper.swiper-container', {
        slidesPerView: "auto",
        spaceBetween: 50,
        loop: true,
        observer: true,
        observeParents: true,

        // ✅ 스크롤(드래그) 및 마우스 휠 이동 허용
        mousewheel: {
            forceToAxis: true, // 세로 스크롤 방지하고 가로로만 작동
            sensitivity: 1,
        },
        grabCursor: true, // 마우스 커서 손 모양으로 변경 (드래그 가능)

        // ✅ 스크롤바 추가 (선택)
        scrollbar: {
            el: ".se2__rightSwiper .swiper-scrollbar",
            draggable: true,
            hide: false,
        },

        navigation: {
            nextEl: ".se2__left .nav-button.next",
            prevEl: ".se2__left .nav-button.prev",
        },

        pagination: {
            el: '.se2__rightSwiper .swiper-pagination',
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
                spaceBetween: 24,
                centeredSlides: false,
            },
        },
    });

    var se4__rightSwiper = new Swiper('.se4__rightSwiper.swiper-container', {
        slidesPerView: "auto",
        spaceBetween: 50,
        loop: true,
        observer: true,
        observeParents: true,

        // ✅ 스크롤(드래그) 및 마우스 휠 이동 허용
        mousewheel: {
            forceToAxis: true, // 세로 스크롤 방지하고 가로로만 작동
            sensitivity: 1,
        },
        grabCursor: true, // 마우스 커서 손 모양으로 변경 (드래그 가능)

        // ✅ 스크롤바 추가 (선택)
        scrollbar: {
            el: ".se4__rightSwiper .swiper-scrollbar",
            draggable: true,
            hide: false,
        },

        navigation: {
            nextEl: ".se4__left .nav-button.next",
            prevEl: ".se4__left .nav-button.prev",
        },

        pagination: {
            el: '.se4 .btn_wrap .swiper-pagination',
            clickable: true,
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                 return '<span class="current">' + current + '</span> / ' + total;
            },
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
                spaceBetween: 24,
                centeredSlides: false,
            },
        },
    });

    var se5__frontSwiper = new Swiper('.se5__frontSwiper.swiper-container', {
        slidesPerView: "auto",
        loop: true,
        observer: true,
        observeParents: true,
        navigation: {
            nextEl: ".se5__left .nav-button.next",
            prevEl: ".se5__left .nav-button.prev",
        },
        pagination: {
            el: '.se5__frontSwiper .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                loop: true,
                centeredSlides: true,
                slidesPerView: 1,
                spaceBetween: 10,
            },
            1024: {},
        },
    });

    // ✅ 첫 번째 슬라이드에 active 추가
    const slides = document.querySelectorAll('.se5__frontSwiper .swiper-slide');
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    // ✅ hover 시 active 토글 (하나만 유지)
    slides.forEach(slide => {
        slide.addEventListener('mouseenter', () => {
            slides.forEach(s => s.classList.remove('active'));
            slide.classList.add('active');
        });

        slide.addEventListener('mouseleave', () => {
            slide.classList.remove('active');

            // ✅ 다른 슬라이드가 hover 중이 아니라면 첫 번째 슬라이드에 active 복구
            const isAnyHovered = Array.from(slides).some(s =>
                s.matches(':hover')
            );
            if (!isAnyHovered && slides.length > 0) {
                slides[0].classList.add('active');
            }
        });
    });


}

function tabMenu() {
    const tabItems = document.querySelectorAll('.tab__item');
    const tabContents = document.querySelectorAll('.tab__content');

    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-tab');

            // 모든 탭 초기화
            tabItems.forEach(i => i.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // 클릭된 탭만 활성화
            item.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

}

function accordion() {
    const accordionHeaders = document.querySelectorAll('.accordion__header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;

            // 이미 열려 있는 상태면 아무것도 하지 않음
            if (header.classList.contains('active')) return;

            // 모든 아코디언 닫기
            accordionHeaders.forEach(h => h.classList.remove('active'));
            document.querySelectorAll('.accordion__content').forEach(c => c.classList.remove('open'));

            // 클릭한 항목만 열기
            header.classList.add('active');
            content.classList.add('open');
        });
    });


}

function customSelect() {
    const customSelects = document.querySelectorAll('.custom-select');

    customSelects.forEach(select => {
        const selected = select.querySelector('.select-selected');
        const itemsWrapper = select.querySelector('.select-items-wrapper');
        const items = select.querySelector('.select-items');

        // 선택 영역 클릭 시 열기/닫기
        selected.addEventListener('click', e => {
            e.stopPropagation(); // 이벤트 버블링 방지
            closeAllSelect(select);
            items.classList.toggle('select-hide');
            selected.classList.toggle('active');
        });

        // 옵션 클릭
        items.querySelectorAll('div').forEach(option => {
            option.addEventListener('click', () => {
                selected.textContent = option.textContent;
                selected.dataset.value = option.dataset.value; // 값 저장
                items.classList.add('select-hide');
                selected.classList.remove('active');
            });
        });
    });

    // 다른 셀렉트 닫기
    function closeAllSelect(except = null) {
        customSelects.forEach(select => {
            if (select === except) return;
            const sel = select.querySelector('.select-selected');
            const items = select.querySelector('.select-items');
            items.classList.add('select-hide');
            sel.classList.remove('active');
        });
    }

    // 페이지 클릭 시 모두 닫기
    document.addEventListener('click', () => closeAllSelect());


}