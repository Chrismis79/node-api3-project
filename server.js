const express = require('express');
const helmet = require('helmet');

const userRouter = require('./users/userRouter');

const server = express();

server.use('/api/users', userRouter)
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.origionalUrl}`);
  next();
}

server.use(express.json());
server.use(helmet());
server.use(logger);

module.exports = server;
