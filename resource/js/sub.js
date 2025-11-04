


$(document).ready(function(){
    breadcrumb();
    gallerySwiper();
    liveSwiper();
    accordion();
    td_file();
    preventDefault();
    hisProgram();
    // Num_ani();
    key_input();
    form_select();
    calendar();

    
})

function breadcrumb(){
    
    $('.breadcrumb__tit').click(function(){
        $(this).toggleClass('on');
        $(this).next().slideToggle();
        $(this).parent().siblings().children('.breadcrumb__links').slideUp();
    })

    
}



function gallerySwiper(){
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        
        spaceBetween: 20,
        slidesPerView: "auto",
        loop: false,
        freeMode: true,
        breakpoints: {
            // 768px 이상
            320: {
                direction: 'horizontal',
                spaceBetween: 16,
                slidesPerView: 3,
                freeMode: false,
            },
            // 1024px 이상
            1025: {
                direction: 'vertical',
                spaceBetween: 20,
                slidesPerView: "auto",
                freeMode: true,
            }
        }
      });
      var galleryTop = new Swiper('.gallery-viewer', {
        spaceBetween: 20,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        thumbs: {
          swiper: galleryThumbs,
        },
      });

}

function liveSwiper() {
    var liveSwiper = new Swiper('.liveSwiper', {



        slidesPerView: 'auto',
        speed: 1000,
        
        loop: true,
        autoplay: {
            delay: 1000,
        },
        spaceBetween: 20,
        navigation: {
            nextEl: '.subContent__wide-top .swiper-button-next',
            prevEl: '.subContent__wide-top .swiper-button-prev'
        },
        breakpoints: {
            // 768px 이상에서는 3개의 슬라이드를 보여줌
            320: {
                centeredSlides: true,
            },
            // 1024px 이상에서는 5개의 슬라이드를 보여줌
            1025: {
                centeredSlides: false,
            }
        }
       

    });

    $('.subContent__wide-top .swiper-button-pause').click(function () {
        if ($(this).hasClass('off')) {
          $(this).removeClass('off');
          liveSwiper.autoplay.start();
        } else {
          $(this).addClass('off');
          liveSwiper.autoplay.stop();
        }
    });

    
}

function accordion() {
    
    $(window).resize(function() {
        $(".accordion-wrap__item").removeClass('on');
        if (window.innerWidth < 1024) {  // 다바이스 크기가 1024이하일때
            $(".accordion-wrap__item.fix").addClass('on');
            $('.accordion-wrap__item').click(function (){
                $('.accordion-wrap__item').not($(this)).removeClass("on");
                $(this).addClass("on");
                
                if ($(this).hasClass('on')) {
                    $(this).children("a").removeClass("pre");
                    $(".accordion-wrap__item .cover.pre").addClass("pre");
                }else{
                    $(this).children("a").removeClass("pre");
                    $(".accordion-wrap__item .cover.pre").addClass("pre");
                }
            });
        } else {
            $(".accordion-wrap__item.fix").addClass('on');
            $('.accordion-wrap__item').hover(function () {
                if ($(this).hasClass('on')) {
                  $(this).removeClass('on');
                } else {
                  $(this).addClass('on');
                }

                if ($(".accordion-wrap__item").hasClass('on')) {
                    $(".accordion-wrap__item.fix").removeClass('on');
                } else{
                    $(".accordion-wrap__item.fix").addClass('on');
                }
            });
        }
        

    }).resize();


}

function preventDefault() {
    const links = document.querySelectorAll('.accordion-wrap__item .cover.pre');
    links.forEach(function(element) {
      element.addEventListener('click', function(e) {
        e.preventDefault();
      }, false);
    });
}


function td_file(){


  


    var td_file = $(".td-file")

    td_file.each((i,v) => {


        if(td_file.eq(i).find("a").length){
            td_file.eq(i).parent('tr').removeClass("noFIle");
        } else{
            td_file.eq(i).parent('tr').addClass("noFile");

        }


    })

    var tr_len4 = $(".table-basic th[colspan='4'].ta-l")

    tr_len4.each((i,v) => {
        tr_len4.eq(i).parent().addClass('add').addClass(`add-${i}`);
    })

    var commLen = $(".sub-container.community .board-layout--list td.td-file")

    commLen.each((i,v) => {
        if(commLen.eq(i).find(".td-filelink").length){
            commLen.eq(i).parent('tr').removeClass("noFIle");
        } else{
            commLen.eq(i).parent('tr').addClass("noFile");
        }
    })

}

function hisProgram(){

    $(".slider").each(function(index){
        let $this = $(this);
        let swiper = undefined;
        let slideNum =  $this.find('.swiper-slide').length //슬라이드 총 개수
        let slideInx = 0; //현재 슬라이드 index

        //디바이스 체크
        let oldWChk = window.innerWidth > 768 ? 'pc' : 'mo';
        sliderAct();
        $(window).on('resize', function () {
            let newWChk = window.innerWidth > 768 ? 'pc' : 'mo';
            if(newWChk != oldWChk){
                oldWChk = newWChk;
                sliderAct();
            }
        })

        function sliderAct(){
            //슬라이드 인덱스 클래스 추가
            $this.addClass(`slider${index}`);

            //슬라이드 초기화
            if (swiper != undefined){
                swiper.destroy();
                swiper = undefined;
            }

            //slidesPerView 옵션 설정
            let viewNum = oldWChk == 'pc' ? 5 : 2;
            //loop 옵션 체크
            let loopChk = slideNum > viewNum;

            swiper = new Swiper(`.slider${index} .inner`, {
                slidesPerView: viewNum,
                initialSlide :slideInx,
                spaceBetween: 0,
                slidesPerView: 1,
                
                loop: loopChk,
                pagination: {
                    el: $(`.slider${index} .swiper-pagination`)[0],
                    clickable : true,
                },
                on: {
                    activeIndexChange: function () {
                        slideInx = this.realIndex; //현재 슬라이드 index 갱신
                    }
                },
            });
        }
    });
}

/*
function Num_ani(){
    // 숫자카운트
    const counter = (counterElement, max) => {
        let now = max;

        const handle = setInterval(() => {
            counterElement.innerHTML = Math.ceil(max - now).toLocaleString();

            if (now < 1) {
                clearInterval(handle);
            }

            const step = now / 10;
            now -= step;
        }, 30);
    };


    // 스크롤 이벤트
    const startCountersOnScroll = () => {
        const numSec = document.querySelector('.stat-box');
        const numSecOffsetTop = numSec.offsetTop;
        let started = false;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY >= numSecOffsetTop && !started) {
                const counters = document.querySelectorAll('.number');
                const maxValues = [61, 313, 201, 25709];
                counters.forEach((counterElement, index) => {
                    setTimeout(() => counter(counterElement, maxValues[index]), 0);
                });
                started = true;
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);
    };

    window.addEventListener('load', startCountersOnScroll);
}

*/

function key_input(){
    
    $('.input-check').keyup( function() {
        var ele = $(this);
        var a = $(this).val();
        if(a !=""){
            ele.next().css("color","#fff");
            ele.next().children().css("color","#fff");
        } else{
            ele.next().css("color","#8e8e8e");
            ele.next().children().css("color","#555");
        }
        
    });
}

function form_select(){
    
    $('select').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;
      
        $this.addClass('select-hidden'); 
        $this.wrap('<div class="select-inner"></div>');
        $this.after('<div class="select-styled"></div>');
    
        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());
      
        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);
      
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
            if ($this.children('option').eq(i).is(':selected')){
              $('li[rel="' + $this.children('option').eq(i).val() + '"]').addClass('is-selected')
            }
        }
      
        var $listItems = $list.children('li');
      
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
                $(this).parent().parent().parent().parent().parent().removeClass("sel");
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
            $(".board-layout__table tbody td.sel").removeClass("sel");
            $(this).parent().parent().parent().parent().parent().addClass("sel");
        });
      
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
          $list.find('li.is-selected').removeClass('is-selected');
          $list.find('li[rel="' + $(this).attr('rel') + '"]').addClass('is-selected');
            $list.hide();
            //console.log($this.val());
        });
      
        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });
    
    });
    

    

}

function calendar(){
    $(".board-layout--calendar .board-layout--calendar__inner .month_list li").on('click',function(){
        $(".board-layout--calendar .board-layout--calendar__inner .month_list li").removeClass("now");
        $(this).addClass("now");
        
    })
}





