import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from '../src/js/exchange';

function getDropdown(response, dropDown) {
  response.supported_codes.forEach(element => {
    let option = document.createElement('option');
    option.innerText = element[0];
    dropDown.append(option);
  });
}

function fillOptions(response) {
  let from = document.getElementById('currency0');
  let to = document.getElementById('currency1');
  getDropdown(response, from);
  getDropdown(response, to);
}

function printError(error) {
  document.getElementById('text').innerText = `An error occured: ${error}`;
}


function exchange() {
  const amount =   document.getElementById('number').value;
  let from = getCurrency(0);
  let to = getCurrency(1);
  newAmount(amount, from, to);
}


function getCurrencies() {
  genCurrencies();
}

function getCurrency(selection) {
  let currency = document.getElementById(`currency${selection}`).value;
  return currency;
}

function showAmount(amount, currencyFrom, result, currencyTo) {
  document.getElementById('text').innerText = `${amount} ${currencyFrom} is: ${Math.round(result).toFixed(2)} ${currencyTo}`;
}

window.onload = function () {
  document.getElementById('button').addEventListener("click", exchange);
  getCurrencies();
};

///////////////////////////////////////

async function genCurrencies() {
  if (sessionStorage.getItem('supportedCurrencies')) {
    const response = JSON.parse(sessionStorage.getItem('supportedCurrencies'));
    fillOptions(response);
  } else {
    const response = await Exchange.genCurrencies();
    if (response.result === 'success') {
      sessionStorage.setItem('supportedCurrencies', JSON.stringify(response));
      fillOptions(response);
    } else {
      printError(response);
    }
  }
}

export async function newAmount(amount, from, to) {
  const response = await Exchange.newAmount(from, to, amount);
  if (response instanceof Error) {
    printError(response);
  } else {
    let result = response.conversion_result;
    showAmount(amount, from, result, to);
  }
}