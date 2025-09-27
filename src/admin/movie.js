const addFilmPopupButton = document.getElementById('open-add-film');
const addFilmPopup = document.getElementById('add-movie');
const addFilmForm = document.getElementById('popup-movie-form');
const filmNameInput = document.getElementById('movie-title');
const filmLengthInput = document.getElementById('movie-length');
const filmDescInput = document.getElementById('movie-description');
const filmCountryInput = document.getElementById('movie-country');
const submitFilmButton = document.getElementById('create-film');
const uploadPosterButton = document.getElementById('upload-poster');
const filmsList = document.querySelector('.admin-sessions-movie-list');



addFilmPopupButton.addEventListener('click', () => {
	addFilmPopup.classList.toggle('visually-hidden');
});

submitFilmButton.addEventListener('click', (e) => {
	e.preventDefault();

	filmsList.innerHTML = "";

	const params = new FormData(addFilmForm);

	data.addFilm(params);
});

function renderFilmsList(filmItems) {
	filmsList.innerHTML = "";
	document.getElementById('movie-select').innerHTML = "";

	filmItems.forEach((element) => {
		filmsList.insertAdjacentHTML('beforeend',
			`<li class="admin-sessions-movie-list-item" id="film${element.id}" draggable="true">
				<img src="${element.film_poster}" alt="" class="admin-sessions-movie-image">
				<div class="admin-sessions-movie-info">
					<p class="admin-sessions-movie-title">${element.film_name}</p>
					<p class="admin-sessions-movie-length">${element.film_duration} минут</p>
				</div>
				<button class="admin-delete-button admin-delete-button-sessions"></button>
			</li>`
		);

		document
			.getElementById('movie-select')
			.insertAdjacentHTML('beforeend', `<option value="${element.id}">${element.film_name}</option>`);
	});

	const deleteFilmButton = [...document.querySelectorAll('.admin-delete-button-sessions')];
	const filmCards = [...document.querySelectorAll('.admin-sessions-movie-list-item')];

	filmCards.forEach((element) => {
		element.addEventListener('dragstart', () => {
			dragged = element;
		});

		element.addEventListener('dragend', () => {
			dragged = null;
		});
	});

	renderSessionsList(hallItems, seanceItems);
	deleteFilm(deleteFilmButton);
}

function deleteFilm(buttonArray) {
	buttonArray.forEach((element) => {
		element.addEventListener('click', (e) => {
			e.preventDefault();
			const filmId = element.closest('.admin-sessions-movie-list-item').id.slice(4);
			data.deleteFilm(filmId);
		});
	});
}
