const express = require('express');
const app = express();
const Config = { SERVER_PORT: 3000 }; // Asume que SERVER_PORT está definido correctamente en tu código.

app.get('/hola', (req, res) => {
  res.send('Hola Mundo');
});

const httpServer = app.listen(Config.SERVER_PORT, () => {
  console.log(`[SERVER] Server listen on port ${Config.SERVER_PORT}`);
});
httpServer.on('error', (err) => {
  console.log(`[SERVER] Server error: ${err}`);
});
