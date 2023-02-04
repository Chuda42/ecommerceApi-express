const socket = io();

const container = document.getElementById('productsContainer');
const sumbitBtn = document.getElementById('submitForm');

/* submit btn click event */
sumbitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const product = {
        title: document.getElementById('inputTitle').value,
        price: document.getElementById('inputPrice').value,
        description: document.getElementById('inputDescription').value,
        code: document.getElementById('inputCode').value,
        stock: document.getElementById('inputStock').value,
        category: document.getElementById('inputCategory').value
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
        let status = (product.status)? 'Active' : 'Inactive';
        html += `
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-heading${product.id}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#flush-collapse${product.id}" aria-expanded="false" aria-controls="flush-collapse${product.id}">
                        Product Id: ${product.id}. Product title: ${product.title}
                    </button>
                </h2>
                <div id="flush-collapse${product.id}" class="accordion-collapse collapse" aria-labelledby="flush-heading${product.id}"
                    data-bs-parent="#productsAccordion">
                    <div class="accordion-body">
                        <ul>
                            <li>Description: ${product.description}</li>
                            <li>Price: $${product. price }</li>
                            <li>Code: ${product.code}</li>
                            <li>Stock: ${product.stock} </li>
                            <li>Status: ${status} </li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    })
    container.innerHTML = html;
})

/* listen new product add event */
socket.on('newProduct', (product) => {
    let div = document.createElement('div');
    let status = (product.status)? 'Active' : 'Inactive';
    let html = `
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-heading${product.id}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapse${product.id}" aria-expanded="false" aria-controls="flush-collapse${product.id}">
                    Product Id: ${product.id}. Product title: ${product.title}
                </button>
            </h2>
            <div id="flush-collapse${product.id}" class="accordion-collapse collapse" aria-labelledby="flush-heading${product.id}"
                data-bs-parent="#productsAccordion">
                <div class="accordion-body">
                    <ul>
                        <li>Description: ${product.description}</li>
                        <li>Price: $${product. price }</li>
                        <li>Code: ${product.code}</li>
                        <li>Stock: ${product.stock}</li>
                        <li>Stock: ${status} </li>
                    </ul>
                </div>
            </div>
        </div>
    `
    div.innerHTML = html;
    container.appendChild(div);
})

