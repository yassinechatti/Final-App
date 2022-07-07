const Product = require("../Model/Product");

exports.addProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    if (!newProduct.name || !newProduct.price || !newProduct.size) {
      return res.status(400).send({
        msg: "Name, Price and Size are required !",
      });
    }
    let productAdded = new Product({ ...newProduct });
    await productAdded.save();
    res.status(200).send({ msg: "Product Added", product: productAdded });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Product cannot be added", error });
  }
};
exports.getProducts = async (req, res) => {
  try {
    const productsToFind = await Product.find();
    res.status(200).send({ msg: "Products found", productsToFind });
  } catch (error) {
    res.status(400).send({ msg: "Products cannot be found", error });
  }
};
exports.getProduct = async (req, res) => {
  try {
    const { _id } = req.params;
    const productToFind = await Product.findOne({ _id });
    res.status(200).send({ msg: "Product found", productToFind });
  } catch (error) {
    res.status(400).send({ msg: "Product cannot be found", error });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { _id } = req.params;
    const productToUpdate = req.body;
    if (!productToUpdate) {
      return res
        .status(400)
        .send({ msg: "Product cannot be found with this id" });
    }
    await Product.updateOne({ _id }, { $set: { ...productToUpdate } });
    res.status(200).send({ msg: "Product updated" });
  } catch (error) {
    res.status(400).send({ msg: "Product Cannot be updated" });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const { _id } = req.params;
    await Product.deleteOne({ _id });
    res.status(200).send({ msg: "Product deleted" });
  } catch (error) {
    res.status(400).send({ msg: "Product cannot be deleted" });
  }
};
