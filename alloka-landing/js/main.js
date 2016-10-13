$(document).ready(function(){
//header fixed
    $(window).on('scroll', function(){
        $('.header').css({
            left: - $(window).scrollLeft()
        });
        if ($(window).scrollTop() > 1) {
            if($('.body-wrap').length > 0){
                $('.body-wrap').addClass('header-fixed');
            }
        } else {
            if($('.body-wrap').length > 0){
                $('.body-wrap').removeClass('header-fixed');
            }
        }
    });

//about-us page scroll-nav

    var navigation = $("a.underpage-nav_link[href^='#']");

    if(navigation.length > 0){
        navigation.on("click", function(e){

            e.preventDefault();
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 83}, 800);
            return false;
        });
    }
//vacancy

    var headerForm = $('.vacancy-box_header');

    if(headerForm.length > 0){
        headerForm.on('click', function(e){
            if($(e.currentTarget).parent().hasClass('active')){
                $(this).parent().removeClass('active').find('.vacancy-body-col_wrap').slideUp();
                return false;
            }
            $('.vacancy-tab_box').removeClass('active').find('.vacancy-body-col_wrap').slideUp();
            $(this).parent().addClass('active').find('.vacancy-body-col_wrap').slideDown();
        });
    }

    var vacancyFooterBtn = $('.vacancy-box_footer > .button');

    if(vacancyFooterBtn.length > 0){
        vacancyFooterBtn.on('click', function(e){
            e.preventDefault();

            var popUpName = $(this).attr('data-vacancy-name');

            $('.vacancy').find('.vacancy_pop-up').addClass('active').find('.pop-up_vacancy-name').html(popUpName);
            setTimeout(function(){
                $('.vacancy').find('.vacancy_pop-up').addClass('visible');
            }, 100);
        });
    }

    var popUp = $('.pop-up_wrapper');

    if(popUp.length > 0){

        $(document).on('click', '.pop-up_wrapper', function (event){
            if ($(event.target).hasClass('btn-close_pop-up') ||
                !$(event.target).parents().hasClass('pop_up-block')
                && !$(event.target).hasClass('pop_up-block')
                && popUp.hasClass('visible')) {

                event.preventDefault();
                $('.pop-up_wrapper').removeClass('visible');
                setTimeout(function(){
                    $('.vacancy').find('.vacancy_pop-up').removeClass('active').find('.pop-up_vacancy-name').html('');
                }, 300);

                return false;
            }
        });

    }

//slider
    var $carouselPrev = $('.owl-carousel:not(.not-slider)'),
        $nouteCarousel = $('.preview-slider .owl-carousel');

    if($carouselPrev.length > 0){

        $carouselPrev.owlCarousel({
            items : 1,
            autoplay: 4000,
            smartSpeed: 900,
            singleItem: true,
            autoplayHoverPause: true,
            loop: true,
            nav: true,
            navText: false,
            dots: true,
            mouseDrag: false
        });
    }
    if($nouteCarousel.length > 0){

        $nouteCarousel.on('changed.owl.carousel', function(e) {
            var step = e.item.index - 1,
                countN = e.item.count;
            if(step > countN){
                step = 1;
            }
            $('.slider-tip_wrap').find('.slider-tip.active').removeClass('active');
            $('.slider-tip_wrap').find('.slider-tip').eq(step - 1).addClass('active');
        });
    }

    if( $('.preview-slider').length > 0){

        $('.preview-slider .top-layer').on('click', '.ground, .layer-tip', function(){
            $($nouteCarousel).trigger('to.owl.carousel', [0,100]);
            $(this).parent('.top-layer').fadeOut(500, function(){
                $(this).siblings('.owl-carousel').find('.owl-controls').fadeIn(0, function(){
                    $(this).parents('.preview-slider').find('.slider-tip_wrap')
                        .addClass('active').find('.slider-tip').eq(0).addClass('active');
                }).addClass('active');
            });
        });
    }

//select about block
    var $toggleButton = $('.toggle-button');

    if($toggleButton.length > 0){

        $toggleButton.on('click', function(e){
            e.preventDefault();
            var dataBlock = $(this).data('about-block'),
                sectionAbout = $(this).parents('section.about');
            if(dataBlock == 'after'){
                sectionAbout.removeClass('about-before').addClass('about-after');
            }else{
                sectionAbout.removeClass('about-after').addClass('about-before');
            }
        });
    }

//dinamic text

    if($('.h3-dinamic .dinamic-text').length > 0){

        $('.h3-dinamic .dinamic-text').eq(0).addClass('active').fadeIn(0);

        setInterval('textAnimate();', 3000);

        initCallsCounter();
    }

//calltraking tabs

    if($('.tabs').length > 0){
        $(function () {
            var tabContainers = $('.tabs .tabs-block_container > .tabs-block');

            if(tabContainers.length > 0){
                var tabNav = $('.tabs .tabs-nav .tabs-nav_name');

                tabNav.on('click', function () {
                    tabContainers.removeClass('visible');
                    tabContainers.filter(this.hash).addClass('visible');
                    tabNav.removeClass('selected');
                    $(this).addClass('selected');
                    return false;
                }).filter(':first').click();
            }
        });
    }

});

function textAnimate() {
    var length = $('.h3-dinamic .dinamic-text').length - 1;
    
    $('.h3-dinamic .dinamic-text').each(function(index) {
        if($(this).hasClass('active') && index != length) {
            $(this).removeClass('active').fadeOut(500, function(){
                $(this).next('.dinamic-text').addClass('active').fadeIn(500);
            });
            return false;
        } else if (index == length) {
            $(this).removeClass('active').fadeOut(500, function(){
                $('.h3-dinamic .dinamic-text').eq(0).addClass('active').fadeIn(500);
            });
            return false;
        }
    });
}

function initCallsCounter() {
    var
        $countBlock = $('.block.user-count .count'),
        countValue = $countBlock.data('value');

    setNewValue(countValue);

    setInterval(function () {
        countValue += Math.floor(Math.random() * (200 - 20 + 1) + 20);
        setNewValue(countValue);
    }, 3000);

    function setNewValue (value) {
        var
            stringValue = value.toString(),
            digitNumber = 1;

        for (var i = stringValue.length - 1; i >= 0; i--) {
            var
                $digitItem = $('<div class="digit-item">'+ stringValue[i] +'</div>'),
                $digit = $countBlock.find('.digit:nth-last-of-type(' + digitNumber + ')'),
                $oldDigitItem = $digit.find('.digit-item');

            if ($digitItem.text() != $oldDigitItem.text()) {
                $digitItem.css({
                    transform: 'translateY(-100%)',
                    opacity: 0,
                    color: '#52bd00'
                });

                $countBlock
                    .find('.digit:nth-last-of-type(' + digitNumber + ')')
                    .prepend($digitItem);

                (function ($digitItem, $oldDigitItem) {
                    setTimeout(function () {
                        $digitItem.css({
                            transform: 'translateY(0)',
                            opacity: 1
                        });

                        $oldDigitItem.css({
                            transform: 'translateY(100%)',
                            opacity: 0,
                            color: '#bcc9d2'
                        });
                    }, 30);


                    setTimeout(function () {
                        $oldDigitItem.remove();
                        $digitItem.css({
                            color: '#000'
                        });
                    }, 700);
                })($digitItem, $oldDigitItem);
            }

            digitNumber++;
        }
    }

}