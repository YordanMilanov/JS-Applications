const userData = JSON.parse(localStorage.getItem('userData'));

 if(userData) {
    document.querySelector('.email span').textContent = userData.email;
    document.getElementById('guest').style.display = 'none';
    document.querySelector('#addForm .add').disabled = false;
    loadData();
 } else {
    document.getElementById('user').style.display = "none";
 }

 // load all data
 document.querySelector('.load').addEventListener('click', loadData);

 async function loadData() {
    const url = 'http://localhost:3030/data/catches';
    const res = await fetch (url);
    const data = await res.json();
    document.getElementById('catches').replaceChildren(...data.map(createCatch))
 }

 function createCatch(data) {

 }

 function createElement(type, attr, ...content) {
    const element = document.createElement(type);
    for (const item of attr) {
       if(item === 'class') {
        element.classList.add(attr[item]);
       } else if (item === 'disable') {
        element.disabled = attr[item];
       } else {
        element[item] = attr[item];
       }
    }
 }