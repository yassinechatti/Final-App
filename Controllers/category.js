const Category = require("../Model/Category");

exports.addCategory = async (req, res) => {
  try {
    const newCategory = req.body;
    let categoryAdded = new Category({ ...newCategory });
    await categoryAdded.save();
    res.status(200).send({ msg: "Category Added", category: categoryAdded });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Category cannot be added", error });
  }
};
exports.getCategories = async (req, res) => {
  try {
    const categoriesToFind = await Product.find();
    res.status(200).send({ msg: "Categories found", categoriesToFind });
  } catch (error) {
    res.status(400).send({ msg: "Categories cannot be found", error });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const { _id } = req.params;
    const categoryToUpdate = req.body;
    if (!categoryToUpdate) {
      return res
        .status(400)
        .send({ msg: "Category cannot be found with this id" });
    }
    await Category.updateOne({ _id }, { $set: { ...categoryToUpdate } });
    res.status(200).send({ msg: "Category updated" });
  } catch (error) {
    res.status(400).send({ msg: "Category Cannot be updated" });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const { _id } = req.params;
    await Category.deleteOne({ _id });
    res.status(200).send({ msg: "Category deleted" });
  } catch (error) {
    res.status(400).send({ msg: "Category cannot be deleted" });
  }
};
