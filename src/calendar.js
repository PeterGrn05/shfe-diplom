const calendarBox = document.querySelector('.nav');
const calendarList = document.querySelector('.nav-list');
const currentDay = new Date();
const visibleDays = 6;

let isSwitched = 0;
let startDate = new Date(currentDay);
let pickedDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
const currentDayString = `${currentDay.getFullYear()}-${currentDay.getMonth() + 1}-${currentDay.getDate()}`;

let loopDate = new Date(startDate);

function getWeekDay(date) {
	const names = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
	return names[date.getDay()];
}

function renderCalendar(date) {
	calendarList.innerHTML = '';

	for (let i = 0; i < visibleDays; i++) {
		const dayItem = document.createElement('li');
		dayItem.classList.add('nav-item');
		calendarList.appendChild(dayItem);
	}

	const dayItems = [...calendarList.children];
	let tempDate = new Date(date);
	let activeIndex = 0;

	// обновляем список фильмов
	drawFilms();

	dayItems.forEach((el, idx) => {
		el.innerHTML = '';
		el.classList.remove('nav-item-active', 'nav-item-red');

		const dayLabel = document.createElement('p');
		const dayNum = document.createElement('p');
		dayLabel.classList.add('date-day');
		dayNum.classList.add('date-number');

		if (currentDay.getDate() === loopDate.getDate()) {
			dayLabel.textContent = 'Сегодня';
			dayNum.textContent = `${getWeekDay(loopDate)},${loopDate.getDate()}`;
		} else {
			dayLabel.textContent = `${getWeekDay(loopDate)},`;
			dayNum.textContent = loopDate.getDate();
		}

		el.appendChild(dayLabel);
		el.appendChild(dayNum);

		if (loopDate.getDay() === 0 || loopDate.getDay() === 6) {
			el.classList.add('nav-item-red');
		}

		el.setAttribute(
			'data-date',
			`${loopDate.getFullYear()}-${loopDate.getMonth() + 1}-${loopDate.getDate()}`
		);

		el.addEventListener('click', () => {
			if (idx !== activeIndex) {
				dayItems[activeIndex].classList.remove('nav-item-active');
				el.classList.add('nav-item-active');
				pickedDate = el.dataset.date;
				activeIndex = idx;
				drawFilms();
				console.log(pickedDate);
			}
		});

		loopDate.setDate(loopDate.getDate() + 1);
	});

	dayItems[activeIndex].classList.add('nav-item-active');

	const switchItem = document.createElement('li');
	const switchText = document.createElement('p');
	switchItem.classList.add('nav-item');
	switchText.classList.add('date-link', 'date-switch');
	switchItem.appendChild(switchText);

	if (isSwitched === 0) {
		pickedDate = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`;

		calendarList.appendChild(switchItem);
		switchText.textContent = '>';
		switchItem.addEventListener('click', (e) => {
			loopDate.setDate(loopDate.getDate());
			isSwitched = 1;
			e.target.innerHTML = '';
			renderCalendar(loopDate);
		});
	} else {
		pickedDate = dayItems[0].dataset.date;

		calendarList.prepend(switchItem);
		switchText.textContent = '<';
		switchItem.addEventListener('click', (e) => {
			loopDate.setDate(date.getDate());
			isSwitched = 0;
			e.target.innerHTML = '';
			loopDate = new Date(currentDay);
			renderCalendar(loopDate);
		});
	}
	console.log(pickedDate);
}

renderCalendar(currentDay);