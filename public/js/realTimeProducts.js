const socket = io();

const container = document.getElementById('productsContainer');
const addThumbnailBtn = document.getElementById('addThumbnail');
const sumbitBtn = document.getElementById('submitForm');

/* add thumbnail btn click event */
let thumbnailCount = 1;
addThumbnailBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const newThmbnailHtml = `
    <div class="col-md-12">
      <label for="inputThumbnail${thumbnailCount} " class="form-label">Thumbnail</label>
      <input type="text" class="form-control" id="inputThumbnail${thumbnailCount}">
    </div>
  `;
  thumbnailCount++;
  document.getElementById('thumbnailsContainer').innerHTML += newThmbnailHtml;
});

/* submit btn click event */
sumbitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let thumbnails = [];
  for (let i = 0; i < thumbnailCount; i++) {
    const thumbnail = document.getElementById(`inputThumbnail${i}`).value;
    if (thumbnail) {
      thumbnails.push(thumbnail);
    }
  }

  const product = {
    title: document.getElementById('inputTitle').value,
    price: document.getElementById('inputPrice').value,
    description: document.getElementById('inputDescription').value,
    code: document.getElementById('inputCode').value,
    stock: document.getElementById('inputStock').value,
    category: document.getElementById('inputCategory').value,
    status: document.getElementById('inputStatus').value === 'Active',
    thumbnails
  }

  thumbnailCount = 1;

  /* send http request */
  const xhr = new XMLHttpRequest();

  /* exception control */
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `${JSON.parse(xhr.response).message}`
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${JSON.parse(xhr.response).error}`
        })
      }
    }
  }

  xhr.open('POST', '/api/products', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(product));

});

const addEvents = (id) => {
  /* delete */
  let deleteBtn = document.getElementById(`deleteProduct${id}`);
  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              Swal.fire(
                'Deleted!',
                `${JSON.parse(xhr.response).message}`,
                'success'
              )
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${JSON.parse(xhr.response).error}`
              })
            }
          }
        }
        xhr.open('DELETE', `/api/products/${id}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
      }
    })
  });
}

/* create accordion item */
const createAccordionItem = (product) => {
  let status = (product.status) ? 'Active' : 'Inactive';
  return `
    <div class="accordion-item" id="accordion-tiem${product._id}">
      <h2 class="accordion-header" id="flush-heading${product._id}">
        <div class="row">
          <div class="col-11">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#flush-collapse${product._id}" aria-expanded="false" aria-controls="flush-collapse${product._id}">
              Product Id: ${product._id}. Product title: ${product.title}
            </button>
          </div>
          <div class="col">
            <button class="btn btn-danger" id="deleteProduct${product._id}"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      </h2>
      <div id="flush-collapse${product._id}" class="accordion-collapse collapse" aria-labelledby="flush-heading${product._id}"
        data-bs-parent="#productsAccordion">
        <div class="accordion-body">
          <ul>
            <li>Description: ${product.description}</li>
            <li>Price: $${product.price}</li>
            <li>Code: ${product.code}</li>
            <li>Stock: ${product.stock} </li>
            <li>Status: ${status} </li>
            <li>Thumbnails: ${JSON.stringify(product.thumbnails)} </li>
          </ul>
        </div>
      </div>
    </div>
  `
}

/* socket events */

/* listen inital product list */
socket.on('productsList', (products) => {
  let html = "";
  products.forEach(product => {
    html = createAccordionItem(product);
    container.insertAdjacentHTML('beforeend', html ); 
    addEvents(product._id);
  })
})

/* listen new product add event */
socket.on('newProduct', (product) => {
  let html = createAccordionItem(product);
  container.insertAdjacentHTML('beforeend', html );
  addEvents(product._id);
})

socket.on('deleteProduct', (id) => {
  Swal.fire({
    position: 'top-end',
    icon: 'info',
    title: `Product ${id} deleted`,
    showConfirmButton: false,
    timer: 2000
  })
  container.removeChild(document.getElementById(`accordion-tiem${id}`));
});
