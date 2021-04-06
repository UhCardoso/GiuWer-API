const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

app.use((req, res, next) => {
    req.io = io;
    next();
})

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

require('./app/controllers/index')(app);

const PORT = process.env.PORT || 3234;

app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});