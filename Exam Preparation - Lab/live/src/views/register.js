import {html} from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';


 
//TODO replace with actual view
const registerTemplate = (onregister) =>  html`
<h1>Register page</h1>
<form @submit=${onregister}>
    <label>Email: <input type="text" name="email"></label>
    <label>Password: <input type="password" name="password"></label>
    <label>Repeat Password: <input type="password" name="repass"></label>
    <button>Register</button>`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));


    //TODO change user object based on requirements
    async function onRegister({email, password, repass}, form) {
        if(email == '' || password == '') {
            return alert('All fields are required');
        }

        if(password != repass) {
            return alert('Passwords do not match');
        }

        //TODO trim input fields if required
       email = email.trim();
       password = password.trim();

        await register(email, password);
        form.reset();
        // TODO use redirect location from requirements
        ctx.page.redirect('/');
    }
}