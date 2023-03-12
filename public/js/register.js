const registerBtn = document.querySelector('#registerBtn');

registerBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const email = document.querySelector('#email').value;
    const age = document.querySelector('#age').value;
    const password = document.querySelector('#password').value;

    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      age,
      password
    };

    fetch('/api/sessions/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        if (res.status === 201) {
            window.location.replace('/login');
        } else {
            alert('Registration failed');
        }
    });
});