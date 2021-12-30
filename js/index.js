const detalle = document.getElementById('uno');
const option = document.getElementById('dos');
const valor = document.getElementById('tres');

const btnEvent = document.getElementById('btn-submit');

btnEvent.addEventListener('click', console.log(`${detalle.value}, ${option.value}, ${valor.value}`));