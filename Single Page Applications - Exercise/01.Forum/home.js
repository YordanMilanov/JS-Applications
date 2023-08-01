//show home
// load posts
// create post function
// cancel function

import { createElements } from "./utils.js";

export async function showHome(e) {
    e.preventDefault();
    localStorage.clear();
    window.location = './index.html';
}

    loadPosts();

function showComments(e) {
    let postId;
    if(e.target.tagName === 'a') {
        postId = e.target.dataset.id
    } else {
        postId = e.target.parentElement.getAttribute('dataset.id');
    }

    localStorage.setItem('postId', postId)
    window.location = './theme-content.html';
}

async function loadPosts() {
    let topicDivElement = document.querySelector('.topic-title');
    topicDivElement.replaceChildren();

    try {

        let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
        if(!response.ok) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let posts = await response.json();

    for (let [postId, post] of Object.entries(posts)) {
        let topicContainerDivElement = createElements(
                'div', 
                '', 
                topicDivElement, 
                {class: 'topic-container'}
            );
        

        let topicNameWrapperDivElement = createElements(
            'div', 
            '', 
            topicContainerDivElement,
            {class: 'topic-name-wrapper'}
        );

        let topicNameDivElement = createElements(
            'div',
            '',
            topicNameWrapperDivElement,
            {class: 'topic-name'}
        );

        let anchorElement = createElements(
            'a',
            '',
            topicNameDivElement,
            { 'href': '#',
            'dataset.id' : postId,
            class:'normal'}
        );
        
        anchorElement.addEventListener('click', showComments)
        
        createElements(
            'h2', 
            post.title,
            anchorElement, 
            {}
        );

        let columnsDivElement = createElements(
            'div',
            '',
            topicNameDivElement,
            {class: 'columns'},
        );

        let divElement = createElements(
            'div',
            '',
            columnsDivElement,
            {}
        );

        let dateParagraphElement = createElements(
            'p',
            'Date:',
            divElement,
            {}
        );

        createElements(
        'time', 
        post.createDate,
        dateParagraphElement,
        {});

        let nickNameDivElement = createElements(
            'div',
            '',
            divElement,
            {class: 'nick-name'}
        )

        let userNameParagraphElement = createElements(
            'p',
            'Username: ',
            nickNameDivElement,
            {}
        );

        createElements('span', post.username, userNameParagraphElement, {});

    };

    } catch(error) {
        alert(error.message);
    }
}

export async function createPost(e) {
    e.preventDefault();

    const formElement = document.querySelector('form');

    let formData = new FormData(formElement);

    const title = formData.get('topicName').trim();
    const username = formData.get('username').trim();
    const content = formData.get('postText').trim();
    const createDate = new Date();

    try {
        if(!title) {
            throw new Error('Title is required!');
        } else if(!username) {
            throw new Error('Username is required!');
        } else if(!content) {
            throw new Error('Post content is required!');
        }

        const url = 'http://localhost:3030/jsonstore/collections/myboard/comments';

        const res = await fetch(url,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, username, content, createDate})
        })

        if(!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        formElement.reset();

        loadPosts();

    } catch(error) {
        alert(error.message);
    }
}

export function onClose(e) {
    e.preventDefault();

    const formElement = document.querySelector('form');
    formElement.reset();
} 