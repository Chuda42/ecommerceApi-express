const cartsNavBarSelec = document.querySelector('#cartsNavBarSelec')

cartsNavBarSelec.addEventListener('click', (e) => {
  e.preventDefault();

  let cartId;

  Swal.fire({
    title: "Enter the cart id",
    input: "text",
    text: "Enter the cart id",
    inputValidator: (value) => {
      return !value && 'Cart id is required!!'
  },
    allowOutsideClick: true
  }).then(result =>{
    cartId = result.value
    return cartId;
  }).then(response => {
    if(response){
      window.location.replace(`/cart/${cartId}`)
      return
    }
    throw new Error('Something went wrong the cart id is not valid');
  }).catch(err => {
    swal.fire({
      title: 'Error',
      text: err.message,
      icon: 'error'
    })
    console.error(err);
  })
});

const logoutBtn = document.querySelector('#logoutBtn');

logoutBtn.addEventListener('click', (e) => {
  e.preventDefault();

  fetch('/api/sessions/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (res.status === 200) {
      window.location.replace('/login');
    } else {
      alert('Logout failed');
    }
  });
});

const premiumBtn = document.querySelector('#premiumBtn');

premiumBtn.addEventListener('click', (e) => {
  e.preventDefault();

  fetch('/api/sessions/current', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (res.status === 200) {
      const json = res.json();
      Promise.resolve(json).then((res) => {
        fetch(`/api/users/premium/${res.payload.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          if (res.status === 200) {
            window.location.replace('/');
          }
        });
      });
    } else {
      alert('Upgrade failed');
    }
  });
});
