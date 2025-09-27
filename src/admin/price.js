const pricesConfirm = document.getElementById('create-prices');
const pricesCancel = document.getElementById('cancel-prices');
const inputPriceStandard = document.getElementById('price-regular');
const inputPriceVip = document.getElementById('price-vip');

let hallPrices = [];
let pricesActiveHall;

function getHallPrices(hall) {
  pricesActiveHall = hallItems.find(x => x.id === hall);
  hallPrices = [pricesActiveHall.hall_price_standard, pricesActiveHall.hall_price_vip];
  renderHallPrices();
  priceInput();
}

function renderHallPrices() {
  inputPriceStandard.value = hallPrices[0];
  inputPriceVip.value = hallPrices[1];
}

function priceInput() {
  inputPriceStandard.addEventListener('input', () => {
    if (!/\D/.test(inputPriceStandard.value)) {
      hallPrices[0] = inputPriceStandard.value;
    }
  });

  inputPriceVip.addEventListener('input', () => {
    if (!/\D/.test(inputPriceVip.value)) {
      hallPrices[1] = inputPriceVip.value;
    }
  });
}

function saveHallPrices() {
  const priceStandard = hallPrices[0];
  const priceVip = hallPrices[1];
  const params = new FormData();
  params.set('priceStandard', priceStandard);
  params.set('priceVip', priceVip);
  data.savePrices(params);
}

function cancelHallPrices() {
  getHallPrices(pricesActiveHall.id);
}

pricesConfirm.addEventListener('click', saveHallPrices);
pricesCancel.addEventListener('click', cancelHallPrices);
