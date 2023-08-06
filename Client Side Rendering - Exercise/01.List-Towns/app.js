import {html, render} from './node_modules/lit-html/lit-html.js';

document.getElementById('btnLoadTowns').addEventListener('click', onClick);
let input = document.querySelector('#towns');

const dataFromInput = (input) => input.value.split(', ');
const clearInput = (input) => input.value ='';


function onClick(e) {
    e.preventDefault();
    const data = dataFromInput(input);
   
    renderComponentTowns(data);
    clearInput(input);

}

const cardTemplate = (data) => 
html `<ul>
${data.map((item) => html`<li>${item}</li>`)}
</ul>`

const renderComponentTowns = (data) => {
    const root = document.getElementById('root');
    render(cardTemplate(data), root);
}

