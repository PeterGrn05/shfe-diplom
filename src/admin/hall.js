const createHallButton = document.querySelector('.admin-halls-button');
const addHallPopup = document.getElementById('add-hall');
const hallForm = document.getElementById('popup-hall-form');
const hallName = document.getElementById('hall-name');
const hallSubmitButton = document.getElementById('create-hall');
const hallsListWrapper = document.querySelector('.admin-halls-wrapper');
const hallsList = document.querySelector('.admin-halls-list');



function renderHallsList(hallsInfo) {
    hallsList.innerHTML = "";
    hallsInfo.forEach((element, index) => {
        const hallLabel = element['hall-name'] ?? element.hallName ?? element.name ?? `Зал ${index + 1}`;
        hallsList.insertAdjacentHTML(
            'beforeend',
            `<li class="admin-halls-list-item" id="hall ${element.id}">
            <p class="admin-halls-item-text">${hallLabel}: </p>
            <button class="admin-delete-button-halls admin-delete-button"></button>
            </li>`
        );
    });

    const deleteHallButtons = [...document.querySelectorAll('.admin-delete-button-halls')];
    initHallDelete(deleteHallButtons);

    renderHallSwitch(document.querySelector('.hall-switch-buttons-configuration'), hallsInfo);
    renderHallSwitch(document.querySelector('.hall-switch-buttons-launch'), hallsInfo);
    renderHallSwitch(document.querySelector('.hall-switch-buttons-prices'), hallsInfo);
}

function initHallDelete(buttons) {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const hallId = button.closest('.admin-halls-list-item').id.slice(4);
            data.deleteHall(hallId);
        });
    });
}

function renderHallSwitch(hallSwitchContainer, hallsInfo) {
    if (!hallSwitchContainer) return;

    hallSwitchContainer.innerHTML = '';
    hallsInfo.forEach((element, index) => {
        const hallLabel = element['hall-name'] ?? element.hallName ?? element.name ?? `Зал ${index + 1}`;
        hallSwitchContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="hall-switch-button">${hallLabel} </button>`
        );
    });

    const hallButtons = [...hallSwitchContainer.children];
    if (hallButtons.length === 0) return;

    hallButtons[0].classList.add('hall-switch-button-active');

    let activeIndex = 0;
    let activeHallId = hallsInfo[0].id;

    if (hallSwitchContainer.classList.contains('hall-switch-buttons-configuration')) {
        loadHallConfig(activeHallId);
    } else if (hallSwitchContainer.classList.contains('hall-switch-buttons-prices')) {
        getHallPrices(activeHallId);
    } else if (hallSwitchContainer.classList.contains('hall-switch-buttons-launch')) {
        launchInfo(activeHallId);
    }

    hallButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (index !== activeIndex) {
                hallButtons[activeIndex].classList.remove('hall-switch-button-active');
                button.classList.add('hall-switch-button-active');
                activeIndex = index;
                activeHallId = hallsInfo[index].id;

                if (hallSwitchContainer.classList.contains('hall-switch-buttons-configuration')) {
                    rowsInput.value = '';
                    seatsInput.value = '';
                    loadHallConfig(activeHallId);
                } else if (hallSwitchContainer.classList.contains('hall-switch-buttons-prices')) {
                    getHallPrices(activeHallId);
                } else if (hallSwitchContainer.classList.contains('hall-switch-buttons-launch')) {
                    launchInfo(activeHallId);
                }
            }
        });
    });
}



createHallButton.addEventListener('click', () => {
    addHallPopup.classList.remove('visually-hidden');
});

hallSubmitButton.addEventListener('click', (e) => {
    e.preventDefault();
    data.addHall(); 
    hallForm.reset();
    addHallPopup.classList.add('visually-hidden');
});
