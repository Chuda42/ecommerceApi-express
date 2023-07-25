// Select all the buttons with the class 'addToCartBtn'
const btns = document.querySelectorAll('.addToCartBtn');

const userIdInput = document.getElementById('userIdInput').value;
console.log(userIdInput);

// Loop through the buttons
btns.forEach((btn) => {
btn.addEventListener('click', (e) => {
  e.preventDefault();

  const productId = btn.getAttribute('productId')
  let cartId = userIdInput;

    const url = `/api/carts/${cartId}/product/${productId}`;
    fetch(url, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(response.status === 200){
        window.location.replace(`/cart/${cartId}`)
        return
      }
      throw new Error('Cart not found or you are the owner');
    }).catch(error => {
      swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error'
      })
      console.error(error);
    });
  }).catch(error => {
    swal.fire({
      title: 'Error',
      text: error.message,
      icon: 'error'
    })
    console.error(error);
  }) ;
});

