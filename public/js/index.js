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
