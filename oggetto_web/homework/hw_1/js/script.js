var $$ = $$ || {};

$$.initLogin = function(){
	
	var showLogin = function(){
			$('#b-page-wrapper').addClass('login');
			$('#b-login')
				.fadeIn()
				.find('.login-window').animate({
										height: '209'
									}, 300)
	}

	var hideLogin = function(){
		$('.login-window')
			.animate({
				height: 0
			}, 300,function(){
				$('#b-login').fadeOut();
				$('#b-page-wrapper').removeClass('login');
			})
	}


	$('#login-button').on('click', function(){
		showLogin()	
	})

	$('#login-cancel-button').on('click', function(event){
		event.stopPropagation();
		hideLogin();
	})

	$('#b-login').on('click', function(event){
		event.stopPropagation();
		hideLogin();
	})

	$('.login-window').on('click', function(event){
		event.stopPropagation();
	})
}

 $$.validateForm = function(){
 	$('.news-comments').on('submit', '.comment-form', function(event){
 		event.preventDefault();
 		var $form = $(this);
 			
 		if (($form.find('input[type=text]').val() == '') || ($form.find('textarea').val() == '')) {
 			$form.addClass('error');
 		} else {
 			$form.find('input[type=text]').val('');
 			$form.find('textarea').val('');
 			$form.removeClass('error')
 		}

 	})
 }

 $$.getCommentForm = function(){
 	$('.news-comments').on('click', '.comment-answer', function(event){
 		event.preventDefault();
		var $comment_answer = $(this).closest('.news-comment-item').children('.news-comment-item-answers'),
			$form = $comment_answer.children('.form-wrapper')

		if ($form.length) {
			if ($form.is(':visible')) {
				$form.hide();
			} else {
				$('.news-comment-item .form-wrapper').hide()
				$form.show();
			}
		} else {
			$.get('comment_form.html')
				.done(function(data) {
					$('.news-comment-item .form-wrapper').hide();
					$(data).prependTo($comment_answer);
			})
 		}
 	})
 }


jQuery(function init() {
        $$.initLogin();
        $$.validateForm();
        $$.getCommentForm();
});





