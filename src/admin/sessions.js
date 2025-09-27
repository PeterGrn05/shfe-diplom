const addMovieButton = document.querySelector('.admin-sessions .admin-button'); 
const addSessionPopup = document.getElementById('add-session');
const addSessionForm = document.getElementById('popup-session-form');
const submitSessionButton = document.getElementById('create-session');
const sessionsList = document.querySelector('.admin-sessions-halls-list');
const hallSelect = document.getElementById('hall-select');
const filmSelect = document.getElementById('movie-select');
const timeInput = document.getElementById('time-select');


submitSessionButton.addEventListener('click', (e) => {
  e.preventDefault();

  const params = new FormData(addSessionForm);
  data.addSession(params);
});

function renderSessionsList(halls, seances) {
  sessionsList.innerHTML = '';

  halls.forEach((element) => {
    sessionsList.insertAdjacentHTML(
      'beforeend',
      `<li class="admin-sessions-halls-list-item" id="session-hall${element.id}">
        <h4 class="admin-sessions-halls-title">${element.hall_name}</h4>
        <div class="admin-sessions-halls-timeline"></div>
        <div class="admin-delete-button admin-sessions-session-delete visually-hidden"></div>
      </li>`
    );
    hallSelect.insertAdjacentHTML(
      'beforeend',
      `<option value="${element.id}">${element.hall_name}</option>`
    );
  });

  const hallTimelines = [...sessionsList.children];
  const filmCards = [...document.querySelectorAll('.admin-sessions-movie-list-item')];

  hallTimelines.forEach((timelineElement) => {
    const timeline = timelineElement.querySelector('.admin-sessions-halls-timeline');

    timeline.addEventListener(
      'dragover',
      (e) => {
        e.preventDefault();
      },
      false
    );

    timeline.addEventListener('drop', (e) => {
      if (filmCards.includes(dragged)) {
        addSessionPopup.classList.toggle('visually-hidden');
        for (let i, j = 0; (i = hallSelect.options[j]); j++) {
          if (i.value == timelineElement.id.slice(12)) {
            hallSelect.selectedIndex = j;
            break;
          }
        }

        for (let i, j = 0; (i = filmSelect.options[j]); j++) {
          if (i.value == dragged.id.slice(4)) {
            filmSelect.selectedIndex = j;
            break;
          }
        }

        dragged = null;
      }
    });
  });

  seances.forEach((element) => {
    const seanceHall = hallTimelines.find((x) => x.id.slice(12) == element.seance_hallid);
    if (seanceHall) {
      const seanceFilm = filmCards.find((x) => x.id.slice(4) == element.seance_filmid);

      if (seanceFilm) {
        const seanceTime = element.seance_time.replace(':', '');
        const seanceItem = document.createElement('div');
        seanceHall.querySelector('.admin-sessions-halls-timeline').appendChild(seanceItem);
        seanceItem.classList.add('admin-sessions-session-wrapper');
        seanceItem.id = element.id;
        seanceItem.setAttribute('data-time', seanceTime);
        seanceItem.insertAdjacentHTML(
          'beforeend',
          `<div class="admin-sessions-session">
            <p class="admin-sessions-session-title">
              ${filmItems.find((x) => x.id === element.seance_filmid).film_name}
            </p>
          </div>
          <p class="admin-sessions-session-time">${element.seance_time}</p>`
        );
        seanceItem.setAttribute('draggable', 'true');

        const fullTimeline = 100;
        const workDuration = 1440;
        const seanceWidth =
          filmItems.find((x) => x.id === element.seance_filmid).film_duration *
          (fullTimeline / workDuration);

        let seanceHour;
        if (seanceTime.slice(0, -3) == 0) {
          seanceHour = +seanceTime.slice(1, -2);
        } else {
          seanceHour = +seanceTime.slice(0, -2);
        }

        const seanceStart = +(seanceHour + seanceTime.slice(2) / 60) * 60;

        seanceItem.style.width = seanceWidth + '%';
        seanceItem.style.left = seanceStart * (fullTimeline / workDuration) + '%';

        const bgColor = window.getComputedStyle(seanceFilm).backgroundColor;
        seanceItem.style.background = bgColor;
      }
    }
  });

  hallTimelines.forEach((element) => {
    const timeline = element.querySelector('.admin-sessions-halls-timeline');
    const hallsTimeline = [...timeline.children];
    hallsTimeline.sort((a, b) => a.dataset.time - b.dataset.time);

    hallsTimeline.forEach((item) => {
      timeline.appendChild(item);
    });
  });

  const seanceBlock = [...document.querySelectorAll('.admin-sessions-session-wrapper')];
  const deleteSeance = [...document.querySelectorAll('.admin-sessions-session-delete')];

  seanceBlock.forEach((element) => {
    const deleteButton = element.parentElement.nextElementSibling;
    element.addEventListener('dragstart', (e) => {
      deleteButton.classList.remove('visually-hidden');
      e.dataTransfer.setData('text/plain', e.target.id);
    });

    element.addEventListener('dragend', (e) => {
      e.preventDefault();
      deleteButton.classList.add('visually-hidden');
    });
  });

  deleteSeance.forEach((element) => {
    element.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    element.addEventListener('drop', (e) => {
      const transferData = e.dataTransfer.getData('text');
      data.deleteSession(transferData);
    });
  });
}
