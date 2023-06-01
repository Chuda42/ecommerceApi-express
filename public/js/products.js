// Select all the buttons with the class 'addToCartBtn'
const btns = document.querySelectorAll('.addToCartBtn');

// Loop through the buttons
btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const productId = btn.getAttribute('productId')
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
      if(!result.value){
        throw new Error('Cart id is required!!');
      }
      cartId = result.value
      return cartId;
    }).then(cartId => {
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
});
