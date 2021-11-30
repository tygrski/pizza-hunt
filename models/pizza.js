const { Schema, model } = require("mongoose");
// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

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


// exporting the Pizza module
module.exports = Pizza;