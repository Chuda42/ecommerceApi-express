const buyBtn = document.querySelector('#buyBtn');

buyBtn.addEventListener('click', (e) => {

  e.preventDefault();

  fetch('/api/cart/buy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => {
    if (res.status === 200) {
      window.location.replace('/cart');
    } else {
      alert('Buy failed');
    }
  });
});