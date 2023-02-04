const socket = io();

const container = document.getElementById('productsContainer');
const sumbitBtn = document.getElementById('submitForm');

/* submit btn click event */
sumbitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const product = {
        title: document.getElementById('productTitle').value,
        price: document.getElementById('productPrice').value,
        description: document.getElementById('productDescription').value,
        code: document.getElementById('productCode').value,
        stock: document.getElementById('productStock').value,
        category: document.getElementById('productCategory').value
    }

    /* send http request */
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/products', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(product));

});

/* listen inital product list */
socket.on('productsList', (products) => {
    let html = "";
    products.forEach(product => {
        html += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.price}</p>
                </div>
            </div>
        `
    })
    container.innerHTML = html;
    console.log(products);
})

/* listen new product add event */
socket.on('newProduct', (product) => {
    let div = document.createElement('div');
    let html = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.price}</p>
            </div>
        </div>
    `
    div.innerHTML = html;
    container.appendChild(div);
})

