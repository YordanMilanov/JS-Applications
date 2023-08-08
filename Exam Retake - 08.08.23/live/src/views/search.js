import { html} from '../../node_modules/lit-html/lit-html.js';
import { searchMotorcycles } from '../data/motorcycle.js';
import { createSubmitHandler } from '../util.js';


//TODO replace with actual view
const searchTemplate = (motorcycles, onSearch) => html`<section id="search">
<div class="form">
  <h4>Search</h4>
  <form @submit=${onSearch} class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>

</div>
<h4 id="result-heading">Results:</h4>
  <div class="search-result">
  ${motorcycles.length === 0 
    ? html`<h2 class="no-avaliable">No result.</h2>`
    : html`${motorcycles.map(motorcycleCard)}`} 
  </div>
        </section>`;

const motorcycleCard = (motorcycle) => html`</div>

  <!--If there are matches display a div with information about every motorcycle-->
 <div class="motorcycle">
  <img src="${motorcycle.imageUrl}" alt="example1" />
  <h3 class="model">${motorcycle.model}</h3>
    <a class="details-btn" href="/catalog/${motorcycle._id}">More Info</a>
</div>
  </div>`;


export function searchPage(ctx) {
    let motorcycles = [];

    async function onSearch(search, form) {
        let searchText = search.search;
        if(searchText == '') {
            return alert('All fields are required');
        }

        motorcycles = await searchMotorcycles(searchText);
        form.reset();
        ctx.render(searchTemplate(motorcycles, createSubmitHandler(onSearch)));
    }

    ctx.render(searchTemplate(motorcycles, createSubmitHandler(onSearch)));

}