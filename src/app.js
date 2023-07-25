import express from 'express'
import Config from './config/config.js'
const app = express();

app.get('/hola', (req, res) => {
  res.send('Hola Mundo');
});

const httpServer = app.listen(Config.SERVER_PORT, () => {
  console.log(`[SERVER] Server listen on port ${Config.SERVER_PORT}`);
});
httpServer.on('error', (err) => {
  console.log(`[SERVER] Server error: ${err}`);
});
