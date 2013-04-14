document.getElementById('login-cancel-button').onclick = function() {
	hideLogin(document);
}

document.getElementById('login-button').onclick = function() {
	showLogin(document);
}

function showLogin(el) {
	el.getElementById('b-login').style.display = 'block';
	el.getElementById('b-page-wrapper').className = 'b-page-wrapper login';
}

function hideLogin(el) {
	el.getElementById('b-login').style.display = 'none';
	el.getElementById('b-page-wrapper').className = 'b-page-wrapper';
}