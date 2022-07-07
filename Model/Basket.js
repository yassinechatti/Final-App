const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const basketSchema = new Schema({
  productQuantity: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = Basket = model("Basket", basketSchema);
