const pricesConfirm = document.getElementById('create-prices');
const pricesCancel = document.getElementById('cancel-prices');
const inputPriceStandard = document.getElementById('price-regular');
const inputPriceVip = document.getElementById('price-vip');

let hallPrices = [];
let pricesActiveHall;

function getHallPrices (hall) {
	pricesActiveHall = data.info.halls.find(x => x.id === hall);
	hallPrices = [pricesActiveHall.hall_price_standart, pricesActiveHall.hall_price_vip];
	renderHallPrices();
	priceInput();
}

function renderHallPrices() {
	inputPriceStandard.value = hallPrices[0];
	inputPriceVip.value = hallPrices[1];
}

function validatePrice(input) {
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

function priceInput () {
	inputPriceStandard.addEventListener('input', () => {
		if (validatePrice(inputPriceStandard)) {
			hallPrices[0] = inputPriceStandard.value;
		}
	});

	inputPriceVip.addEventListener('input', () => {
		if (validatePrice(inputPriceVip)) {
			hallPrices[1] = inputPriceVip.value;
		}
	});

	inputPriceStandard.addEventListener('blur', () => validatePrice(inputPriceStandard));
	inputPriceVip.addEventListener('blur', () => validatePrice(inputPriceVip));
}

function saveHallPrices() {
	const validStandard = validatePrice(inputPriceStandard);
	const validVip = validatePrice(inputPriceVip);

	if (!validStandard || !validVip) {
		alert("Ошибка: стоимость должна быть целым числом и не меньше 1.");
		return;
	}

	const priceStandart = hallPrices[0];
	const priceVip = hallPrices[1];
	const params = new FormData();
	params.set('priceStandart', priceStandart);
	params.set('priceVip', priceVip);
	data.savePrices(params);
}

function cancelHallPrices() {
	getHallPrices(pricesActiveHall.id);
}

pricesConfirm.addEventListener('click', saveHallPrices);
pricesCancel.addEventListener('click', cancelHallPrices);