const btns = document.querySelectorAll('.addToCartBtn');

btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const productId = btn.getAttribute('productId');
    const cartId = document.getElementById('userIdInput').value;

    const url = `/api/carts/${cartId}/product/${productId}`;
    fetch(url, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(response.status === 200){
        window.location.replace(`/cart/${cartId}`);
        return;
      }
      throw new Error('Carrito no encontrado o eres el propietario');
    })
    .catch(error => {
      swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error'
      });
      console.error(error);
    });
  });
});
