import {showHome} from "./home.js";
import { createElements } from "./utils.js";

const homeAnchorElement = document.querySelector('a');
homeAnchorElement.addEventListener('click', showHome);


function fetchPost() {
    const postId = localStorage.getItem('postId');
    loadPost(postId);
}
fetchPost()

async function loadPost(postId) {
    let formElement = document.querySelector('form');
    formElement.setAttribute('dataset.id', postId);

    try {
        const res = await fetch(
            `http://localhost:3030/jsonstore/collections/myboard/posts/${postId}`
          );
        if(!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }
        
        const post = await res.json();
        const themeContentDivElement = document.querySelector('.theme-content');
        themeContentDivElement.replaceChildren();

        const themeTitleDivElement = createElements(
            'div',
            '',
            themeContentDivElement,
            {
                'class': 'theme-title'
            }
        );

        const themeNameWrapperDivElement = createElements(
            'div',
            '',
            themeTitleDivElement,
            {
                'class': 'theme-name-wrapper'
            }
        );

        const themeNameDivElement = createElements(
            'div',
            '',
            themeNameWrapperDivElement,
            {
                'class': 'theme-name'
            }
        );

        createElements('h2', post.title,themeNameDivElement, {});

        const commentDivElement = createElements(
            'div',
            '',
            themeContentDivElement,
            {
                'class': 'comment'
            }
        );

        const headerDivElement = createElements(
            'div',
            '',
            commentDivElement,
            {
                'class': 'header'
            }
        );

        createElements('img', '', headerDivElement, {
            'src': './static/profile.png',
            'alt': 'avatar'
        })


         const paragraphElement = createElements(
            'p',
            '',
            headerDivElement,
            {}
        );

        paragraphElement.innerHTML = `<span>${post.username}</span> commented on <time>${post.createDate}</time>`;

        createElements('p', post.content, headerDivElement, {'class' : 'post-content'})

    } catch(error) {

    }
}