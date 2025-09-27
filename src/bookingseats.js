let appData = new allData;

const hallWrapper = document.querySelector('.client-hall-wrapper');
const sessionInfoBlock = document.querySelector('.session-info');
const seatGrid = document.querySelector('.hall-grid');
const legendStandard = document.getElementById('legend-standard');
const legendVip = document.getElementById('legend-vip');
const btnBooking = document.querySelector('.booking-button');

const seanceId = window.localStorage.getItem('seanceId');
const seanceHallId = window.localStorage.getItem('seanceHallId');
const seanceTime = window.localStorage.getItem('seanceTime');
const filmTitle = window.localStorage.getItem('filmTitle');
const chosenDate = window.localStorage.getItem('chosenDate');

async function renderSeanceLayout () {
	await appData.getData();
	await appData.getSeanceConfig(seanceId);

	seatGrid.innerHTML = "";

	const hallsInfo = appData.info.halls;
	const currentHall = hallsInfo.find((e) => e.id == seanceHallId);
	const hallTitle = currentHall.hall_name;
	const hallScheme = appData.hallConfig;
	let selectedSeats = [];

	sessionInfoBlock.insertAdjacentHTML('beforeend', `
		<p class="session-title">${filmTitle}</p>
		<p class="session-time">Начало сеанса: ${seanceTime}</p>
		<p class="session-hall">${hallTitle}</p>
	`);

	seatGrid.style.setProperty('grid-template-rows', `repeat(${hallScheme.length}, 20px)`);
	seatGrid.style.setProperty('grid-template-columns', `repeat(${hallScheme[0].length}, 20px)`);

	hallScheme.forEach((row, rowIndex) => {
		row.forEach((place, placeIndex) => {

			const seat = document.createElement('div');
			
			seatGrid.appendChild(seat);
			seat.classList.add('hall-seat');
			if (place === 'standard') {
				seat.classList.add('seat-free');
			} else if (place === 'vip') {
				seat.classList.add('seat-vip');
			} else if (place === 'taken') {
				seat.classList.add('seat-occupied');
			};
			seat.addEventListener('click', () => {
				if (seat.classList.contains('seat-free') && !seat.classList.contains('hall-seat-chosen')) {
					seat.classList.add('hall-seat-chosen');
					selectedSeats.push({
						row: rowIndex + 1,
						place: placeIndex + 1,
						cost: currentHall.hall_price_standard,
					});
				} else if (seat.classList.contains('seat-vip') && !seat.classList.contains('hall-seat-chosen')) {
					seat.classList.add('hall-seat-chosen');
					selectedSeats.push({
						row: rowIndex + 1,
						place: placeIndex + 1,
						cost: currentHall.hall_price_vip,
					});
				} else if (seat.classList.contains('hall-seat-chosen')) {
					seat.classList.remove('hall-seat-chosen');
					for (let i = 0; i < selectedSeats.length; i++) {
						const row = rowIndex + 1;
						const place = placeIndex + 1;
						if (selectedSeats[i].row == row && selectedSeats[i].place == place) {
							selectedSeats.splice(i, 1);
							break;
						}
					}
				}
			});
		});
	});

	legendStandard.textContent = `Свободно (${currentHall.hall_price_standard}руб)`;
	legendVip.textContent = `Свободно VIP (${currentHall.hall_price_vip}руб)`;

	btnBooking.addEventListener('click', e => {
		e.preventDefault();

		if (selectedSeats.length > 0) {
			window.localStorage.setItem('chosenSeats', JSON.stringify(selectedSeats));
			window.localStorage.setItem('hallTitle', hallTitle);
			window.location.assign('paymentprocess.html', '_self');
		} else {
			alert('Выберите места');
		}
	})
};

renderSeanceLayout();