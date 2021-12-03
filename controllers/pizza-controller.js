const { Pizza } = require('../models');

const pizzaController = {
  // functions as methods

  // GET ALL PIZZAS
  getAllPizza(req, res) {
    Pizza.find({})
    // add comment text , isnstead of just comment it
    .populate({ 
      path: 'comments',
      // the  - means we don't want to return _v
      select: '-__v'
    })
    .select('-__v')
    // sort so theat newest pizza returns first
    .sort({_id: -1 })
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  // get one pizza by ID
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
    // so comments show up and not omment id
    .populate({
      path: 'comments',
      // removes the __v from the returned list
      select:'-__v'
    })
    .select('-__v')
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