import {showHome} from "./home.js";

const homeAnchorElement = document.querySelector('a');
homeAnchorElement.addEventListener('click', showHome);


function fetchPost() {
    const postId = localStorage.getItem('postId');
    loadPost(postId);
}
loadPost(postId);

async function loadPost(postId) {
    console.log(postId);
}