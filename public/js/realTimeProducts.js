const socket = io();

socket.on('productList', (products) => {
    console.log(products);
})