let data = new allData;

const paymentTitle = document.querySelector('.payment-title');
const ticketInfo = document.querySelector('.ticket-info');
const ticketButton = document.querySelector('.ticket-button');
const ticketHint = document.querySelector('.ticket-hint');
const qrWrapper = document.querySelector('.ticket-qr');

const hallTitle = window.localStorage.getItem('hallTitle');
const chosenSeats = JSON.parse(window.localStorage.getItem('chosenSeats'));
const filmTitle = window.localStorage.getItem('filmTitle');
const seanceId = window.localStorage.getItem('seanceId');
const seanceTime = window.localStorage.getItem('seanceTime');
const chosenDate = window.localStorage.getItem('chosenDate');

let totalPrice = 0;
let placeArray = [];

function renderPayment() {
	chosenSeats.forEach(element => {
		totalPrice += element.coast;
		placeArray.push(`Ряд ${element.row} Место ${element.place}`);
	});

	ticketInfo.insertAdjacentHTML('afterbegin', `
		<p class="ticket-info-text">На фильм: <span class="ticket-info-text-value">${filmTitle}</span></p>
		<p class="ticket-info-text">Места: <span class="ticket-info-text-value">${placeArray.join(', ')}</span></p>
		<p class="ticket-info-text">В зале: <span class="ticket-info-text-value">${hallTitle}</span></p>
		<p class="ticket-info-text">Начало сеанса: <span class="ticket-info-text-value">${seanceTime}</span></p>
		<p class="ticket-info-text">Стоимость: <span class="ticket-info-text-value">${totalPrice}</span> рублей</p>
	`);

	ticketButton.addEventListener('click', e => {
		e.preventDefault();

		const params = new FormData();
		params.set('seanceId', seanceId);
		params.set('ticketDate', chosenDate);
		params.set('tickets', JSON.stringify(chosenSeats));

		console.log(params.get('seanceId'));
		console.log(params.get('ticketDate'));
		console.log(params.get('tickets'));

		data.setTicket(params);
	});
}

function renderTicket() {
	ticketButton.classList.add('visually-hidden');
	ticketInfo.children.item(4).remove();
	qrWrapper.classList.add('ticket-qr');

	ticketHint.textContent = 'Покажите QR-код нашему контроллеру для подтверждения бронирования.';

	const qrcode = QRCreator(
		`Дата: ${chosenDate}, Время:${seanceTime}, Название фильма:${filmTitle}, Зал:${hallTitle}, ${placeArray.join(', ')}, Стоимость:${totalPrice}. Билет действителен строго на свой сеанс`,
		{
			mode: 4,
			eccl: 0,
			mask: -1,
			image: 'png',
			modsize: -1,
			margin: 0
		}
	);

	const content = (qrcode) => {
		return qrcode.error
			? `недопустимые исходные данные ${qrcode.error}`
			: qrcode.result;
	};

	qrWrapper.appendChild(content(qrcode));
}

renderPayment();