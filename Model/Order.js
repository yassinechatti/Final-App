const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  productQuantity: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User"},

});

module.exports = Order = model("Order", orderSchema);
