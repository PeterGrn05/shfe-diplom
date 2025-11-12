const inputRows = document.getElementById('rows');
const inputSeats = document.getElementById('columns');
const saveConfigBtn = document.querySelector('.admin-button');
const cancelConfigBtn = document.querySelector('.admin-white-button');

let hallConfig = [];
let configActiveHall;

function getHallSeats (hall) {
	configActiveHall = data.info.halls.find(x => x.id === hall);
	hallConfig = configActiveHall.hall_config;
	inputRows.value = hallConfig.length;
	inputSeats.value = hallConfig[0].length;
	renderHallSeats();
	hallInput();
}

function validateNumber(input) {
	let value = input.value.trim();
	value = value.replace(/\D+/g, '');
	input.value = value;

	if (value === "" || Number(value) < 1) {
		input.classList.add('input-error');
		return false;
	} else {
		input.classList.remove('input-error');
		return true;
	}
}

function hallInput () {

	inputRows.addEventListener('input', () => {
		if (!validateNumber(inputRows)) return;
		if (validateNumber(inputSeats)) rebuildConfig();
	});

	inputSeats.addEventListener('input', () => {
		if (!validateNumber(inputSeats)) return;
		if (validateNumber(inputRows)) rebuildConfig();
	});
	inputRows.addEventListener('blur', () => validateNumber(inputRows));
	inputSeats.addEventListener('blur', () => validateNumber(inputSeats));
}

function rebuildConfig() {
	hallConfig = [];
	for (let i = 0; i < Number(inputRows.value); i++) {
		hallConfig.push([]);
		for (let x = 0; x < Number(inputSeats.value); x++) {
			hallConfig[i].push('standart');
		}
	}
	renderHallSeats();
}

function renderHallSeats () {
	const hallGrid = document.querySelector('.seat-scheme-grid');
	hallGrid.innerHTML = '';
	hallGrid.style.setProperty('grid-template-rows', `repeat(${hallConfig.length}, 26px)`);
	hallGrid.style.setProperty('grid-template-columns', `repeat(${hallConfig[0].length}, 26px)`);
	hallConfig.forEach((row, rowIndex) => {
		row.forEach((place, placeIndex) => {
			const hallGridCell = document.createElement('div');
			hallGrid.appendChild(hallGridCell);
			hallGridCell.classList.add('seat-scheme-item');
			if (place === 'standart') {
				hallGridCell.classList.add('seat-scheme-item-regular')
			} else if (place === 'vip') {
				hallGridCell.classList.add('seat-scheme-item-vip')
			};
			hallGridCell.addEventListener('click', () => {
				if (hallGridCell.classList.contains('seat-scheme-item-regular')) {
					hallGridCell.classList.remove('seat-scheme-item-regular');
					hallGridCell.classList.add('seat-scheme-item-vip');
					hallConfig[rowIndex][placeIndex] = 'vip';
				} else if (hallGridCell.classList.contains('seat-scheme-item-vip')) {
					hallGridCell.classList.remove('seat-scheme-item-vip');
					hallConfig[rowIndex][placeIndex] = 'disabled'
				} else {
					hallGridCell.classList.add('seat-scheme-item-regular');
					hallConfig[rowIndex][placeIndex] = 'standart'
				}
			});
		});
	});
};

async function saveHallSeats () {

	const validRows = validateNumber(inputRows);
	const validSeats = validateNumber(inputSeats);

	if (!validRows || !validSeats) {
		alert("Ошибка: количество рядов и мест должно быть целым числом не меньше 1.");
		return;
	}

	const placeCount = hallConfig[0].length;
	const rowCount = hallConfig.length;
	const params = new FormData();
	params.set('rowCount', rowCount);
	params.set('placeCount', placeCount);
	params.set('config', JSON.stringify(hallConfig));

	data.saveConfig(params);
}

function cancelHallSeats () {
	getHallSeats(configActiveHall.id);
}

saveConfigBtn.addEventListener('click', saveHallSeats);
cancelConfigBtn.addEventListener('click', cancelHallSeats);
