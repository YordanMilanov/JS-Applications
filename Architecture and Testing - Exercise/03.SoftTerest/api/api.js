const host = 'http://localhost:3030/';

async function requester(method, url, data) {
    const user = sessionStorage.getItem('user');
    const options = {
        method: method,
        headers: {},
    }

    if(data) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(data);
    }
    
    if(user) {
        const token = sessionStorage.getItem('token');
        options.headers['X-Authorization'] = token;    
    }

    try{
        //http://localhost:3030/login
        const res = await fetch(`${host}${url}`, options);
        if(!res.ok) {
            //check if the user is not logged (throws 403 unautorized user)
            if(!res.status === 403) {
                sessionStorage.removeItem('user');
                throw new Error('Access denied');
            }

            const err = await res.json();
            throw new Error(err.message);
        }

        return res.status === 204 ? res :res.json();
        //no content in the response
        // if(!res.status === 204) {
        //     return res;
        // } else {
        //     return res.json();
        // }

    } catch(error) {
        alert(error.message);
    }

const get = requester.bind(null, 'GET')
const post = requester.bind(null, 'POST')
const put = requester.bind(null, 'PUT')
const delete_ = requester.bind(null, 'DELETE')



export {
    get,
    post,
    put,
    delete_
}
