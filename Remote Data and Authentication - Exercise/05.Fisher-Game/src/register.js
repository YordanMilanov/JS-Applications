const registerForm = document.querySelector('form');
registerForm.addEventListener('submit', onUserRegister)
document.getElementById('user').style.display = "none";

const url = 'http://localhost:3030/users/register';

async function onUserRegister(e) {
    e.preventDefault();
    console.log(e.currentTarget);
    const formData = new FormData(e.currentTarget);

    //here the {email, password, rePass} should be the same as in the HTML form fields
    const {email, password, rePass} = Object.fromEntries(formData);
    console.log(email, password, rePass);

    try {
        //[...formData.values()] this deconstruction can be also replaced
        //with this syntax for every field(every value of the formData)
        // const email = formData.get('email')
        //const password = formData.get('password')
        //const rePass = formData.get('rePass')
        // this is the same with [...formData.values()]
        if([...formData.values()].some(el => el === '')) {
            throw new Error('Input is invalid!');
        } else if (password != rePass) {
            throw new Error('The Password you entered do not match!');
        }

        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                password,
                rePass
            })
        })

        if(!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const data = await res.json()
        console.log(data);
        const user = {
            email: data.email,
            id: data._id,
            token: data.accessToken
        }

        localStorage.setItem('userData', JSON.stringify(user));
        window.location = './index.html';
    } catch(error) {
        document.querySelector('form').reset();
        alert(error.message)
    }
}