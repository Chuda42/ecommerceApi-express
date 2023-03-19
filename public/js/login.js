const loginBtn = document.querySelector('#loginBtn');
const githubBtn = document.querySelector('#githubBtn');

loginBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const data = {
        email,
        password
    };

    fetch('/api/sessions/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
      if (res.status === 200) {
        window.location.replace('/');
      } else {
        swal.fire({
          title: 'Error',
          text: 'Email or password is incorrect',
          icon: 'error'
        })
      }
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      throw error;
    });
});

githubBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.replace('/api/sessions/github');
});