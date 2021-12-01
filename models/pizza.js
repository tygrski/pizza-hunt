const { Schema, model } = require("mongoose");
// create the Pizza model using the PizzaSchema


const PizzaSchema = new Schema ({
  pizzaName: {
    type: String
  },
  createdBy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  size: {
    type: String,
    default: "Large"
  },
  toppings: []
});

const Pizza = model('Pizza', PizzaSchema);

// exporting the Pizza module
module.exports = Pizza;