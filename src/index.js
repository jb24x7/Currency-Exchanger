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
  let from = document.getElementById('convertFrom');
  let to = document.getElementById('convertTo');
  getCurencies(response, from);
  getCurencies(response, to);
}

function printError(error) {
  document.getElementById('text').innerText = `An error occured: ${error}`;
}

