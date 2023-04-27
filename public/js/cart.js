const buyBtn = document.querySelector('#btnBuy');
const cartId = document.querySelector('#cartId');
const id = cartId.value


buyBtn.addEventListener('click', (e) => {

  e.preventDefault();

  fetch(`/api/carts/${id}/purchase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (res.status === 200) {
      window.location.replace('/');
    } else {
      alert('Buy failed');
    }
  });
});