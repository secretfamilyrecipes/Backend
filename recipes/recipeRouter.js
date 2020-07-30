const router = require("express").Router();

const recipes = require("./recipeModel");

router.post('/', (req, res) => {
    recipes.add(req.body)
  
    .then(recipe => {
      res.status(200).json(recipe)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({errorMessage: "failed to add new recipe"})
    })
    
  });

router.get("/", (req, res) => {
    recipes.get()
        .then(recipes => {
            res.status(200).json({ data: recipes, jwt: req.jwt });
        })
        .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
    res.status(200).json(req.recipes)
  });

router.put('/:id', validaterecipeId, (req, res) => {
    recipes.update(req.params.id, req.body)
  
    .then(recipe => {
      if(recipe) {
        res.status(200).json(recipe)
      } else if (!req.body.title) {
        res.status(400).json({errorMessage: "missing required title"})
      } else {
        res.status(404).json({ errorMessage: "recipe does not exist"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({errorMessage: "can not update recipe"})
    })
  });

  router.delete('/:id', validaterecipeId, (req, res) => {
    recipes.remove(req.params.id)
  
    .then (count => {
      if(count > 0) {
        res.status(200).json({message: "recipe has been deleted"})
      } else {
        res.status(404).json({ errorMessage: " recipe can not be found"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ errorMessage: "can not delete recipe"})
    })
  });

  function validaterecipeId(req, res, next) {
    const {id} = req.params.id
    
    recipes.getById(id)
      .then (recipe => {
        req.recipe = recipe
        next()
      })
      .catch (err => {
        console.log (err)
        res.status(400).json ({ message: "invalid recipe id"})
      })
  }

module.exports = router;