const { Pizza } = require('../models');

const pizzaController = {
  // functions as methods

  // GET ALL PIZZAS
  getAllPizza(req, res) {
    Pizza.find({})
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  // get one pizza by ID
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
    .then(dbPizzaData => {
      // if no pizza found 404
      if(!dbPizzaData) {
        res.status.json({ message: 'No pizza found with that id'});
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err)
    });
  },
 // createPizza
createPizza({ body }, res) {
  Pizza.create(body)
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => res.status(400).json(err));
},
// update pizza by id
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
       }
        res.json(dbPizzaData);
    })
    .catch(err => res.status(400).json(err));
},
  // delete pizza
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
         res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = pizzaController;