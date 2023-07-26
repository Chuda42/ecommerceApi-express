const buyBtn = document.querySelector('#btnBuy');
const cartId = document.querySelector('#cartId');
const id = cartId.value;

buyBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const { value: formValues } = await swal.fire({
    title: "Credit Card Input",
    html:
      '<input type="text" id="cardNumber" placeholder="Card Number">' +
      '<input type="text" id="cardHolder" placeholder="Card Holder Name">' +
      '<input type="text" id="expiryDate" placeholder="Expiry Date (MM/YY)">' +
      '<input type="text" id="cvv" placeholder="CVV">',
    focusConfirm: false,
    preConfirm: () => {
      return {
        cardNumber: document.getElementById("cardNumber").value,
        cardHolder: document.getElementById("cardHolder").value,
        expiryDate: document.getElementById("expiryDate").value,
        cvv: document.getElementById("cvv").value,
      };
    },
  });

  if (formValues) {
    try {
      const res = await fetch(`/api/carts/${id}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues),
      });

      if (res.status === 200) {
        swal("Success", "Purchase successful!", "success");
        window.location.replace('/cart');
      } else {
        swal("Error", "Buy failed", "error");
      }
    } catch (error) {
      console.error(error);
      swal("Error", "An error occurred during the purchase.", "error");
    }
  }
});
