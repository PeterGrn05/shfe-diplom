let data = new allData;
let hallItems;
let filmItems;
let seanceItems;
let dragged;

async function getData() {
	await data.getData();

	console.log(data.info)
	hallItems = data.info.halls;
	filmItems = data.info.films;
	seanceItems = data.info.seances;
	renderHallsList(data.info.halls);
	renderHallSwitch (document.querySelector('.switch-hall-buttons-configuration'), hallItems);
	renderHallSwitch (document.querySelector('.switch-hall-buttons-launch'), hallItems);
	renderHallSwitch (document.querySelector('.switch-hall-buttons-prices'), hallItems);
	renderFilmsList(filmItems);
	renderSessionsList(hallItems, seanceItems);
}

getData();

const closePopup = [...document.querySelectorAll('.popup-close')];
const cancelPopup = [...document.querySelectorAll('.popup-cancel')];

closePopup.forEach((element) => {
	element.addEventListener('click', () => {
		element.closest('.popup-wrapper').classList.toggle('visually-hidden');
	})
});

cancelPopup.forEach((element) => {
	element.addEventListener('click', (e) => {
		e.preventDefault();
		element.closest('.popup-wrapper').classList.toggle('visually-hidden');
	})
});