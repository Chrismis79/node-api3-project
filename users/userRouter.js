const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

router.use((req, res, next) => {
  console.log("User router");
  next();
})

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: 'Error adding new user'});
    });

});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  
}

function validateUser(req, res, next) {
  // do your magic!
  const {name} = req.body;
  if(!name){
    return res.status(400).json({message: "missing user data"});
  }
  if(typeof name !== "string"){
    return res.status(400).json({error: " Name must be a  string"});
  }
  req.body = {name};
  next();
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
