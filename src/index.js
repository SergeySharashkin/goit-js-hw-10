import './css/styles.css';
import Notiflix from 'notiflix';
import getRefs from './js/refs';
import API from './js/fetchCountries';
import countryTpl from './tamplates/country-template.hbs';
import listTpl from './tamplates/list-template.hbs';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = getRefs();
let countryInfoMarkup = null;
refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput() {
  const name = refs.input.value.trim();
  
  if (name.length===0){
    ceaner();
    return
  }
  API.fetchCountries(name).then(render).catch(onError);
}
function render(name) {
  const countryListMarkup = listTpl({ name });
  refs.countryList.innerHTML = countryListMarkup;
  if (name.length > 10) {
    Notiflix.Notify.info('Необходимо ввести больше символов');
    ceaner();
  }
  if (name.length === 1) {
    countryInfoMarkup = countryTpl({ name });
    refs.countryInfo.innerHTML = countryInfoMarkup;
    document.querySelector('.country-item').style.fontSize = '12px';
  } else {
    refs.countryInfo.innerHTML = '';
  }
}
function onError(error) {
    Notiflix.Notify.warning('Страна не найдена');
    refs.countryInfo.innerHTML = '';
}
function ceaner() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}