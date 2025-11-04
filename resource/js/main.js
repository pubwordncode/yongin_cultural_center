

swiperBox();
$(document).ready(function() {

  var toggleMainPopup = function() {
    /* 스토리지 제어 함수 정의 */
    var handleStorage = {
      // 스토리지에 데이터 쓰기(이름, 만료일)
      setStorage: function (name, exp) {
        // 만료 시간 구하기(exp를 ms단위로 변경)
        var date = new Date();
        date = date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

        // 로컬 스토리지에 저장하기
        // (값을 따로 저장하지 않고 만료 시간을 저장)
        localStorage.setItem(name, date)
      },
      // 스토리지 읽어오기
      getStorage: function (name) {
        var now = new Date();
        now = now.setTime(now.getTime());
        // 현재 시각과 스토리지에 저장된 시각을 각각 비교하여
        // 시간이 남아 있으면 true, 아니면 false 리턴
        return parseInt(localStorage.getItem(name)) > now
      }
    };
    
    
    // 쿠키 읽고 화면 보이게
    if (handleStorage.getStorage("today")) {
      $(".main_popup").removeClass("on");
    } else {
      $(".main_popup").addClass("on");
    }

    // 오늘하루 보지 않기 버튼
    $(".main_popup").on("click", ".btn_today_close", function () {
      // 로컬 스토리지에 today라는 이름으로 1일(24시간 뒤) 동안 보이지 않게
      handleStorage.setStorage("today", 1);
      $(this).parents(".main_popup.on").removeClass("on");
    });

    // 일반 닫기 버튼
    $(".main_popup").on("click", ".btn_close", function () {
      $(this).parents(".main_popup.on").removeClass("on");
    });
  }
  $(function() {
    toggleMainPopup();
  });
  $(window).resize(function(){

		windowW = window.innerWidth;
		if(windowW<=1024){


			$(function(){
        $('.tabcontent > div').hide();
        $('.tabnav a').click(function () {
          /*$('.tabcontent > div').hide().filter(this.hash).fadeIn();*/
          $('.tabcontent > div').hide().filter(this.hash).show();
          $('.tabnav a').removeClass('active');
          $(this).addClass('active');
          return false;
        }).filter(':eq(0)').click();
      });


      $('.mainVisual .conBox__inner .item').removeClass('on');
      

		}
		else{

			$('.tabcontent > div').show();

      $('.mainVisual .conBox__inner .item').hover(function() {
        $(this).addClass("on");
      }, function(){
        $(this).removeClass("on");
    });


		}
	}).resize();



});

function hoverEvent(){
  if (window.innerWidth >= 1025) {
    $('.se1 .se1__menu .swiper-slide a').hover(function() {
      $(this).addClass("on");
      $(".se1 .se1__menu .swiper-slide a").addClass("other");
    }, function(){
      $(".se1 .se1__menu .swiper-slide a").removeClass("on").removeClass("other");
    });
  }
  
}


hoverEvent();

// 윈도우 리사이즈 시 이벤트 핸들러를 다시 등록
window.addEventListener('resize', function() {
    hoverEvent();
});

function swiperBox() {
 

var swiper = new Swiper('.mainSwiper.swiper-container', {
    loop: true,
    effect:'fade',
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
        resetAllProgressCircles();  // Reset the SVG progress when paused
        playPauseButton.textContent = '';
        playPauseButton.classList.add('paused');
    } else {
        swiper.slideTo(swiper.activeIndex, 0, false);  // Reset to the current slide
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
        resetAllProgressCircles();  // Ensure the SVG resets after the transition if paused
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
    slidesPerView: 4 ,
    spaceBetween:20,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: ".se2__top .nav-button.next",
      prevEl: ".se2__top .nav-button.prev",
    },
    breakpoints: {
      320: {
        slidesPerView: "auto",
        spaceBetween:10,
        freeMode:false
      },
      1024: {
        slidesPerView: 4 ,
        spaceBetween:20,
      },
    },
    freeMode: true,
    scrollbar: {
      el: ".se2__bottomSwiper .swiper-scrollbar",
    },
  });

  var se3__rightSwiper = new Swiper('.se3__rightSwiper.swiper-container', {
    slidesPerView: "auto" ,
    spaceBetween:50,
    loop:true,
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
        loop:true,
        centeredSlides: true,
        slidesPerView: 1,
        spaceBetween:10,
      },
      1024: {
        slidesPerView: "auto",
        spaceBetween:50,
        centeredSlides:false,
        
      },
    },
    
  });

  var se4__rightSwiper = new Swiper('.se4__bottomSwiper.swiper-container', {
    slidesPerView: 1 ,
    loop : true,
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
        spaceBetween:10,
      },
      1024: {
      },
    },
  });

  var se5__rightSwiper = new Swiper('.se5__bottomSwiper.swiper-container', {
    slidesPerView: 3 ,
    spaceBetween:20,
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

