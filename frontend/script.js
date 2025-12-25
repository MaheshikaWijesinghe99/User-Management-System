const API = 'http://localhost:5000/api';

// REGISTER
function register() {
    fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            alert(data.message);
        })
        .catch((err) => {
            console.error(err);
            alert('Registration failed');
        });
}

// LOGIN
function login() {
    fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                alert('Login successful');
            } else {
                alert(data.message);
            }
        });
}

// GET USERS
function getUsers() {
    const token = localStorage.getItem('token');

    fetch(`${API}/users`, {
        headers: {
            Authorization: token,
        },
    })
        .then((res) => res.json())
        .then((users) => {
            const list = document.getElementById('list');
            list.innerHTML = '';

            users.forEach((u) => {
                list.innerHTML += `<li>${u.name} - ${u.email}</li>`;
            });
        })
        .catch(() => alert('Failed to load users'));
}
