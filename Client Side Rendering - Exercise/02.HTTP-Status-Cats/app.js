import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const cardTemplate = (data) =>
    html`<li>
    <img 
    src="./images/${data.imageLocation}.jpg" 
    width="250" 
    height="250" 
    alt="Card image cap"
    />

    <div class="info">
        <button class="showBtn" @click = ${onClick}>Show status code</button>
        <div class="status" style="display: none" id="100">
            <h4>${data.statusCode}</h4>
            <p>${data.statusMessage}</p>
        </div>
    </div>
</li>`;

const ulTemplate = (data) =>
    html`<ul>
${data.map(cat => cardTemplate(cat))}
</ul>`

const renderCatsComponent = (data) => {
    render(ulTemplate(data), document.getElementById('allCats'));
}

renderCatsComponent(cats);

function onClick(event) {
    event.preventDefault();
    const cat = event.target.parentNode;
    const result = cat.querySelector('.status').style.display;

    if(result === 'block') {
        cat.querySelector('.showBtn').textContent = 'Show status code'
        cat.querySelector('.status').style.display = 'none';
    } else {
        cat.querySelector('.showBtn').textContent = 'Hide status code'
        cat.querySelector('.status').style.display = 'block';
    }

    
}