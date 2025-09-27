const rowsInput = document.getElementById('rows');
const seatsInput = document.getElementById('columns');
const saveConfigBtn = document.querySelector('.admin-button');
const cancelConfigBtn = document.querySelector('.admin-white-button');

let hallScheme = [];
let configActiveHall;


function loadHallConfig(hallId) {
  configActiveHall = hallItems.find(x => x.id === hallId);
  hallScheme = configActiveHall.hall_config;

  rowsInput.value = hallScheme.length;
  seatsInput.value = hallScheme[0].length;

  renderHallScheme();
  attachInputs();
}


function attachInputs() {
  rowsInput.addEventListener('input', () => {
    if (/^\d+$/.test(rowsInput.value) && seatsInput.value) {
      hallScheme = generateScheme(rowsInput.value, seatsInput.value);
      renderHallScheme();
    }
  });

  seatsInput.addEventListener('input', () => {
    if (/^\d+$/.test(seatsInput.value) && rowsInput.value) {
      hallScheme = generateScheme(rowsInput.value, seatsInput.value);
      renderHallScheme();
    }
  });
}

function generateScheme(rows, cols) {
  const scheme = [];
  for (let i = 0; i < rows; i++) {
    scheme.push([]);
    for (let j = 0; j < cols; j++) {
      scheme[i].push('standard');
    }
  }
  return scheme;
}

function renderHallScheme() {
  const hallGrid = document.querySelector('.seat-scheme-grid');
  hallGrid.innerHTML = '';

  hallGrid.style.setProperty('grid-template-rows', `repeat(${hallScheme.length}, 26px)`);
  hallGrid.style.setProperty('grid-template-columns', `repeat(${hallScheme[0].length}, 26px)`);

  hallScheme.forEach((row, rowIndex) => {
    row.forEach((seat, seatIndex) => {
      const seatCell = document.createElement('div');
      seatCell.classList.add('seat-scheme-item');

      if (seat === 'standard') {
        seatCell.classList.add('seat-scheme-item-regular');
      } else if (seat === 'vip') {
        seatCell.classList.add('seat-scheme-item-vip');
      }

      seatCell.addEventListener('click', () => {
        if (seatCell.classList.contains('seat-scheme-item-regular')) {
          seatCell.classList.remove('seat-scheme-item-regular');
          seatCell.classList.add('seat-scheme-item-vip');
          hallScheme[rowIndex][seatIndex] = 'vip';
        } else if (seatCell.classList.contains('seat-scheme-item-vip')) {
          seatCell.classList.remove('seat-scheme-item-vip');
          hallScheme[rowIndex][seatIndex] = 'disabled';
        } else {
          seatCell.classList.add('seat-scheme-item-regular');
          hallScheme[rowIndex][seatIndex] = 'standard';
        }
      });

      hallGrid.appendChild(seatCell);
    });
  });
}

async function saveHallScheme() {
  const rowCount = hallScheme.length;
  const seatCount = hallScheme[0].length;

  const params = new FormData();
  params.set('id', configActiveHall.id);
  params.set('rowCount', rowCount);
  params.set('seatCount', seatCount);
  data.saveConfig(params);
}


function cancelHallScheme() {
  loadHallConfig(configActiveHall.id);
}

saveConfigBtn.addEventListener('click', saveHallScheme);
cancelConfigBtn.addEventListener('click', cancelHallScheme);
