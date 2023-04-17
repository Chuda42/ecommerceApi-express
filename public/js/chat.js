const socket = io();

/* DOM elements */
const sendBtn = document.getElementById('sendMsgBtn');
const chatBox = document.getElementById('chatBox');

/* user  */
let user;
/* insert email */
/*Swal.fire({
  title: "Enter your email",
  input: "email",
  text: "Enter your email to start chatting",
  inputValidator: (value) => {
      return !value && 'Email is required!'
  },
  allowOutsideClick: false
}).then(result =>{
  user = result.value
  return user;
})*/

/* socket events */
socket.on('messagesList', (messages) => {
  let html = '';
  console.log(messages);
  messages.forEach(msg => {
    html = `
    <li >
      <strong>${msg.user}</strong>: ${msg.message}
    </li>
  `;

    chatBox.insertAdjacentHTML('beforeend', html);
  })
})

socket.on('newMessage', (message) => {
  console.log(message);
  let html = `
  <li >
    <strong>${message.user}</strong>: ${message.message}
  </li>
`
  chatBox.insertAdjacentHTML('beforeend', html);
})

fetch('api/sessions/current', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(async response => {
    if (response.status === 200) {
      user = await response.json();
      user = user.payload.email;
      /* event */
      sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const msgContent = document.getElementById('inputMsg').value;
        const message = { user: user, message: msgContent }
        /* send http request */
        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/chats', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(message));

        document.getElementById('inputMsg').value = '';
      })
    }else {
      throw new Error('Something went wrong');
    }
    
  })

  .catch(error => {
    swal.fire({
      title: 'Error',
      text: error.message,
      icon: 'error'
    })
    console.error(error);
  });


