$(document).ready(function(){

//header fixed
$(window).on('scroll', function(){
    if ($(window).scrollTop() > 1) {
        $('.apidocs').addClass('header-fixed');
        $('.header').css({
            left: - $(window).scrollLeft()
        });
    } else {
        $('.apidocs').removeClass('header-fixed');
        $('.header').css({
            left: 0
        });
    }
});

//header menu

    $('.menu-block_title .title').on('click', function(e){
        e.preventDefault();
    });

    $('.menu-block_title').hover(function () {
        clearTimeout($.data(this,'timer'));
        $('ul',this).stop(true,true).slideDown(400);
    }, function () {
        $.data(this,'timer', setTimeout($.proxy(function() {
            $('ul',this).stop(true,true).slideUp(400);
        }, this), 100));
    });

//header search
    var searchOn = $('.search-on'),
        form = $('.form-search');

    searchOn.on('click', function(){
        $(this).parent('.form-search_wrap').toggleClass('on')
            .siblings('.menu-block').toggleClass('hide');
    });

    $(document).on('click', function(event){
        if( $(event.target).closest(form).length || $(event.target).closest(searchOn).length )
            return;
        form
            .children('.search-input').val('')
            .parents('.form-search_wrap').removeClass('on')
            .siblings('.menu-block').removeClass('hide');
        event.stopPropagation();
    });

//syntax highlighting
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
});