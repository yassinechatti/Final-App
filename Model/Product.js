const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  image: String,
  description: String,
  // category: { type: Schema.Types.ObjectId, ref: "Category" },
});
module.exports = Product = model("Product", productSchema);
