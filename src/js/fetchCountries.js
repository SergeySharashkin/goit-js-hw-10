const MANE_URL = 'https://restcountries.com/v3.1/name/';
const FILTER = '?fields=name,capital,population,flags,languages'
function fetchCountries(name) {
  return fetch(`${MANE_URL}${name}${FILTER}`).then(response => {
    if(response.ok){
       return response.json(); 
   }

  });
}
export default { fetchCountries };
