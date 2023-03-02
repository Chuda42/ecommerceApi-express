const productId = document.querySelector('#productId').value;
const btnAddToCart = document.querySelector('#btnAddToCart');
let cartId = "";

btnAddToCart.addEventListener('click', function (e) {
  e.preventDefault();
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
  }).then(cartId => {
    const url = `/api/carts/${cartId}/product/${productId}`;
    console.log(url);
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
      throw new Error('Something went wrong');
    })

    .catch(error => {

      swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error'
      })
      console.error(error);
    });
  })

});