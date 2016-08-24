$(document).ready(function(){

    $('.calldrone-main-button').on('click', function(){
        $('.calldrone').addClass('active');
    });

    $('.calldrone-call-button').on('click', function(e){
        e.preventDefault();
        $('.calldrone').addClass('timer');
    });

    $('.calldrone-close').on('click', function(){
        $('.calldrone').removeClass('active timer');
    });
});