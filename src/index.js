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