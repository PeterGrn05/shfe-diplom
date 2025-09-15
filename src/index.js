const loginButton = document.getElementById('login')

loginButton.addEventListener('click', (e) => {
	e.preventDefault();

	window.location.assign('loginform.html', '_self')
})

let storage = new allData();

const catalogBlock = document.querySelector('.client-index');
const hallBlock = document.querySelector('.client-hall');
const payBlock = document.querySelector('.client-payment');

async function drawFilms() {
	await storage.getData();
	catalogBlock.innerHTML = "";
	let filmsList = storage.info.films;
	let hallsList = storage.info.halls;
	let sessionsList = storage.info.seances;

	filmsList.forEach((film, idx) => {
		const card = document.createElement('article');
		card.classList.add('movie');
		card.id = 'film' + film.id;
		catalogBlock.appendChild(card);

		card.insertAdjacentHTML('beforeend', `
			<div class="movie-info">
				<img src="${film.film_poster}" alt="" class="movie-image">
				<div class="movie-description">
					<h2 class="movie-title">${film.film_name}</h2>
					<p class="movie-synopsis">${film.film_description}</p>
					<div class="movie-data">
						<p class="movie-length">${film.film_duration} минут</p>
						<p class="movie-country">${film.film_origin}</p>
					</div>
				</div>
			</div>
			<div class="movie-schedule"></div>
		`);

		const schedules = [...document.querySelectorAll('.movie-schedule')];

		const sessionArr = [];
		const hallArr = [];

		sessionsList.forEach((s) => {
			if (s.seance_filmid === film.id) {
				sessionArr.push(s);
			}
		});

		hallsList.forEach((h) => {
			if (h.hall_open != 0) {
				if (sessionArr.some((s) => s.seance_hallid === h.id)) {
					schedules[idx].insertAdjacentHTML('beforeend', `
						<div class="movie-halls" data-id="${h.id}" data-open="1">
							<h3 class="movie-halls-title">${h.hall_name}</h3>
							<ul class="movie-halls-times"></ul>
						</div>
					`);
				}
			}
		});

		if ([...card.children.item(1).children].length === 0) {
			card.classList.add('hidden');
		}

		renderSessions(film, sessionArr, pickedDate);
	});
}

function renderSessions(filmObj, sessionArr, pickedDate) {
	const cards = [...document.querySelectorAll('.movie')];

	sessionArr.forEach((sess) => {
		const parentCard = cards.find((c) => c.id.slice(4) == sess.seance_filmid);
		const hallsInside = [...parentCard.children.item(1).children];
		const neededHall = hallsInside.find((h) => h.dataset.id == sess.seance_hallid);

		if (neededHall) {
			const timeLi = document.createElement('li');
			timeLi.classList.add('movie-halls-time');

			if (pickedDate === currentDayString) {
				const now = new Date();
				const nowStr = `${now.getHours()}${now.getMinutes()}`;
				if (nowStr > sess.seance_time.replace(':', '')) {
					timeLi.classList.add('movie-halls-time-disabled');
				}
			}

			timeLi.setAttribute('data-time', sess.seance_time.replace(':', ''));
			timeLi.textContent = sess.seance_time;

			if (!timeLi.classList.contains('movie-halls-time-disabled')) {
				timeLi.addEventListener('click', () => {
					window.localStorage.setItem('seanceId', sess.id);
					window.localStorage.setItem('seanceHallId', sess.seance_hallid);
					window.localStorage.setItem('seanceTime', sess.seance_time);
					window.localStorage.setItem('filmTitle', filmObj.film_name);
					window.localStorage.setItem('chosenDate', chosenDate);
					window.location.assign('loginform.html', '_self')
				});
			}

			neededHall.children.item(1).appendChild(timeLi);
		}
	});

	const allTimes = [...document.querySelectorAll('.movie-halls-times')];
	allTimes.forEach((ul) => {
		const items = [...ul.children];
		items.sort((a, b) => a.dataset.time - b.dataset.time);
		items.forEach((li) => ul.appendChild(li));
	});
}	