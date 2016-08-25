$(document).ready(function(){

    $('.calldrone-main-button').on('click', function(){
        $(this).parents('.calldrone').addClass('active');
    });

    $('.calldrone-call-button').on('click', function(e){
        e.preventDefault();
        $(this).parents('.calldrone').addClass('timer');
    });

    $('.calldrone-close').on('click', function(){
        $(this).parents('.calldrone').removeClass('active timer');
    });
});