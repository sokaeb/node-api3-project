const express = require('express');
const Users = require('./userDb');
const router = express.Router();


function validateUser(req, res, next) {
  if(req.body.name && req.body){
    next();
  }else if(req.body.name === " ") {
    res.status(400).json({ message: "Missing required name field" })
  }else {
    res.status(400).json({ message: "Missing user data" })
  }
}

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
  .then(u => {
    res.status(201).json({ data: u })
  })
  .catch( err => {
    res.status(400).json({ message: "Name field missing" })
  })
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  Users.get()
  .then(users => {
    res.status(200).json({ data: users})
  })
  .catch(err => {
    res.status(500).json({ error: "Error retreiving users" })
  })
});

function validateUserId(req, res, next) {
  if(req.params.id){
    next();
  }else {
    res.status(404).json({ message: "User does not exist."})
  }
}

router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
  .then(user => {
    if(req.params.id == user.id){
      res.status(200).json({ data: user})
    }
  })
  .catch(err => {
    res.status(400).json({ message: "Invalid user ID."})
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
  .then(count => {
    if(count > 0){
      res.status(200).json({ data: count })
    }
  })
  .catch(err => {
    res.status(500).json({ message: "Error deleting user"})
  })
});

router.put('/:id',validateUserId, (req, res) => {
  Users.update(req.params.id, req.body)
  .then(count => {
    res.status(200).json({ data: count })
  })
  .catch(err => {
    res.status(500).json({error: "Error updating the user"})
  })
});

//custom middleware

function validatePost(req, res, next) {
 if(req.body){
   next();
 }else{
   res.status(400).json({ message: "Missing Post Data"})
 }
}

module.exports = router;
