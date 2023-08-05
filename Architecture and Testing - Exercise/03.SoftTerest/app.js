import { showCatalog } from "./views/catalog.js";
import { showHomeView } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";

document.getElementById('defSection').remove();
document.querySelector('nav').addEventListener('click', onNavigateClick)

const links = {
    "/" : showHomeView,
    '/' : catalogView,
    '/login': showLogin,
    'register': showRegister,
    'create': showCreate,
    'details' : showDetails,
    //todo logout
}

const main = document.getElementById('mainView')

const context = {
    showSection,
}

window.showHomeView = showHomeView(context);

function showSection(section) {
    main.replaceChildren(section);
}

function onNavigateClick(event) {

    event.preventDefault();

    console.log(event.target);
}