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

router.post('/:id/posts', validatePost, (req, res) => {
     const postData = req.body;
     Posts.insert(postData)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(error => {
          res.status(500).json({message: "Error posting new post with user id"})
        })
});

router.get('/', (req, res) => {
  Users.get(req.query)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log("Error GET api/users/", error)
      res.status(500).json({message: "Error retrieving users"})
    })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const {id} = req.params;
  Users.getUserPosts(id)
    .then(userPost => {
      res.status(200).json(userPost);
    })
    .catch(err => {
      res.status(500).json({message: 'Error retrieving user post by given userID'})
      
    })
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  Users.remove(id)
    .then(() => res.status(204).end())
    .catch(error => {
      console.log("There was an error on DELETE /api/users/:id", error)
      res.status(500).json({
        message: "Error removing user"
      })
    })
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const {id} = req.params;
  Users.getById(id)
    .then(user => {
      if(user){
        req.user = user;
        next();
      }else {
        res.status(404).json({message: "invalid user id from middleware validateUserId"})
      }
    })
  .catch(error => {
    console.log(error)
    res.status(500).json({message: "Failed to complete request from middleware validateUserId"})
  })
  req.body ={id};
  
}

function validateUser(req, res, next) {
  // do your magic!
  const {name} = req.body;
  if(!name){
    res.status(400).json({message: "missing user data"});
  }
  if(typeof name !== "string"){
    res.status(400).json({error: " Name must be a  string"});
  }
  req.body = {name};
  next();
}

function validatePost(req, res, next) {
  // do your magic!
  const {id: user_id} = req.params;
  const {text} = req.body;
  if(!req.body){
    res.status(400).json({message: "Post requires a body"})
  }
  if(!text){
    res.status(400).json({message: "Post requires text"})
  }
  req.body = {user_id, text};
  next();
}

module.exports = router;
