const createHallButton = document.querySelector('.admin-halls-button');
const addHallPopup = document.getElementById('add-hall');
const hallForm = document.getElementById('popup-hall-form');
const hallName = document.getElementById('hall-name');
const hallSubmitButton = document.getElementById('create-hall');
const hallsListWrapper = document.querySelector('.admin-halls-wrapper');
const hallsList = document.createElement('ul');

hallsListWrapper.insertBefore(hallsList, createHallButton);
hallsList.classList.add('admin-halls-list');

function renderHallsList (hallsInfo) {
	hallsList.innerHTML = "";
	hallsInfo.forEach((element) => {
		hallsList.insertAdjacentHTML('beforeend', 
			`<li class="admin-halls-list-item" id="hall${element.id}">
				<p class="admin-halls-item-text">${element.hall_name}</p>
				<button class="admin-delete-button-halls admin-delete-button"></button>
			</li>`
			)
	});
	const deleteHallButton = [...document.querySelectorAll('.admin-delete-button-halls')];
	deleteHall(deleteHallButton);
	renderHallSwitch(document.querySelector('.switch-hall-buttons-configuration'), hallsInfo);
	renderHallSwitch(document.querySelector('.switch-hall-buttons-launch'), hallsInfo);
	renderHallSwitch(document.querySelector('.switch-hall-buttons-prices'), hallsInfo);
};

function deleteHall (buttonArray) {
		buttonArray.forEach((element) => {
			element.addEventListener('click', (e) => {
				e.preventDefault();
				const hallId = element.closest('.admin-halls-list-item').id.slice(4);

				data.deleteHall(hallId);
			});
		})
};

function renderHallSwitch (hallSwitchContainer, hallsInfo) {
	hallSwitchContainer.innerHTML = '';
	hallsInfo.forEach((element) => {
		hallSwitchContainer.insertAdjacentHTML('beforeend', `<button class="switch-hall-button">${element.hall_name}</button>`
			)
	});
	const hallItemsRendered = [...hallSwitchContainer.children];

	hallItemsRendered[0].classList.add('switch-hall-button-active');

	let activeHallIndex = 0;
	let activeHallName = hallItemsRendered[0].textContent;
	let activeHallId = hallsInfo[0].id;
	if (hallItemsRendered[0].closest('.switch-hall-buttons-configuration')) {
		getHallSeats(activeHallId)
	} else if (hallItemsRendered[0].closest('.switch-hall-buttons-prices')) {
		getHallPrices(activeHallId)
	} else if (hallItemsRendered[0].closest('.switch-hall-buttons-launch')) {
		launchInfo(activeHallId)
	};

	hallItemsRendered.forEach((element, index) => {
		element.addEventListener('click', (e) => {
			if (index !== activeHallIndex) {
				hallItemsRendered[activeHallIndex].classList.remove('switch-hall-button-active');
				element.classList.add('switch-hall-button-active');
				activeHallIndex = index;
				activeHallName = element.textContent;
				activeHallId = hallsInfo.find(x => x.hall_name === activeHallName).id;
				if (element.closest('.switch-hall-buttons-configuration')) {
					inputRows.value = '';
					inputSeats.value = '';
					getHallSeats(activeHallId)
				} else if (element.closest('.switch-hall-buttons-prices')) {
					getHallPrices(activeHallId)
				} else if (element.closest('.switch-hall-buttons-launch')) {
					launchInfo(activeHallId)
				};
			}
		})
	})
};

createHallButton.addEventListener('click', () => {
	addHallPopup.classList.remove('visually-hidden');
});

hallSubmitButton.addEventListener('click', (e) => {
	e.preventDefault();
	data.addHall();
	hallsList.innerHTML = "";
});
