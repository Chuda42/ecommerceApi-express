const socket = io();

/* socket events */
socket.on('messagesList', (messages) => {
  console.log(messages);
})