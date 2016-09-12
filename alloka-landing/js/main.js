$(document).ready(function(){
//header fixed
    $(window).on('scroll', function(){
        if ($(window).scrollTop() > 1) {
            $('body').addClass('header-fixed');
            $('.header').css({
                left: - $(window).scrollLeft()
            });
        } else {
            $('body').removeClass('header-fixed');
            $('.header').css({
                left: 0
            });
        }
    });

//slider
    $('.preview-slider .top-layer .ground').on('click', function(){
        $(this).parent('.top-layer').fadeOut(500, function(){
            $(this).siblings('.owl-carousel').find('.owl-controls').fadeIn(0, function(){
                $(this).parents('.preview-slider').find('.slider-tip_wrap').addClass('active').find('.slider-tip').eq(0).addClass('active');
            }).addClass('active');
        });
    });

    var $carouselPrev = $('.owl-carousel'),
        $nouteCarousel = $('.preview-slider');
    
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

    $nouteCarousel.on('changed.owl.carousel', function(e) {
        var step = e.item.index - 1,
            countN = e.item.count;
        if(step > countN){
            step = 1;
        }
        $('.slider-tip_wrap').find('.slider-tip.active').removeClass('active');
        $('.slider-tip_wrap').find('.slider-tip').eq(step - 1).addClass('active');
    });

//select about block
    var 
        $toggleButton = $('.toggle-button');
    
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

//dinamic text

    $('.h3-dinamic .dinamic-text').eq(0).addClass('active').fadeIn(0);

    setInterval('textAnimate();', 3000);

    initCallsCounter();
});

function textAnimate() {
    var length = $('.h3-dinamic .dinamic-text').length - 1;
    
    $('.h3-dinamic .dinamic-text').each(function(index) {
        var windowWidth = $(window).width();
        if(windowWidth > 1540){
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
        } else {
            if($(this).hasClass('active') && index != length) {
                $(this).parent('.paragraph').fadeOut(500, function(){
                    $(this).find('.active').removeClass('active').fadeOut(0, function(){
                        $(this).next('.dinamic-text').addClass('active').fadeIn(0).parent('.paragraph').fadeIn(500);
                    });
                });
                return false;
            } else if (index == length) {
                $(this).parent('.paragraph').fadeOut(500, function() {
                    $(this).find('.active').removeClass('active').fadeOut(0, function () {
                        $('.h3-dinamic .dinamic-text').eq(0).addClass('active').fadeIn(0, function(){
                            $(this).parent('.paragraph').fadeIn(500);
                        });
                    });
                });
                return false;
            }
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