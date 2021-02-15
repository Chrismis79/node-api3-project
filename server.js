const express = require('express');
const helmet = require('helmet');

const userRouter = require('./users/userRouter');

const server = express();

//Built-in MW
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
server.use(logger);

//third Party MW
server.use(helmet());

//Router
server.use('/api/users', userRouter);



function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] 
        request method ${req.method} 
        to request url ${req.url} 
        from ${req.get("Origin")
      }`
    );
  next();
}



module.exports = server;
