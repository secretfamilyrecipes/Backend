const router = require("express").Router();

const users = require("./userModel");

router.get("/", (req, res) => {
    users.get()
        .then(users => {
            res.status(200).json({ data: users, jwt: req.jwt });
        })
        .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
    res.status(200).json(req.user)
  });

router.put('/:id', validateUserId, (req, res) => {
    users.update(req.params.id, req.body)
  
    .then(user => {
      if(user) {
        res.status(200).json(user)
      } else if (!req.body.username) {
        res.status(400).json({errorMessage: "missing required username"})
      } else {
        res.status(404).json({ errorMessage: "user does not exist"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({errorMessage: "can not update user"})
    })
  });

  router.delete('/:id', validateUserId, (req, res) => {
    users.remove(req.params.id)
  
    .then (count => {
      if(count > 0) {
        res.status(200).json({message: "user has been deleted"})
      } else {
        res.status(404).json({ errorMessage: " user can not be found"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ errorMessage: "can not delete user"})
    })
  });

  function validateUserId(req, res, next) {
    const {id} = req.params.id
    
    users.getById(id)
      .then (user => {
        req.user = user
        next()
      })
      .catch (err => {
        console.log (err)
        res.status(400).json ({ message: "invalid user id"})
      })
  }

module.exports = router;