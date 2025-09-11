const loginButton = document.getElementById('login')

loginButton.addEventListener('click', (e) => {
	e.preventDefault();

	window.location.assign('loginform.html', '_self')
})
