var $$ = $$ || {};

$$.detectBrowser = function() {
	$('body').browserDetected();
};

$$.toggleItem = function() {
    var items =  $('.catalog-item');
    items.each(function(){
        var item_body = $(this).find('.item-body');
        var item_zoom = $(this).find('.b-zoom-item');
        item_body.bind('click', function (){
           $(".b-zoom-item").removeClass("show");
           item_zoom.addClass('show');
            event.stopPropagation();
        })
    })
};

function format(state) {
    if (!state.id) return state.text;
    return "<img class='flag' src='images/flags/" + state.id.toLowerCase() + ".png'/>" + state.text;
}

jQuery(function init() {
	$$.detectBrowser();
    $$.toggleItem();
});