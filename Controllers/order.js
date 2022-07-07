const Order = require("../Model/Order");
const Basket = require("../Model/Basket");

exports.addOrder = async (req, res) => {
  let order = new Order({ ...req.body, user: req.body.user._id });
  await order.save();
  let basket = await Basket.findOne({ user: req.body.user._id }).populate(
    "productQuantity.product"
  );
  await basket.productQuantity.forEach((pq) => {
    basket.productQuantity.splice(basket.productQuantity.indexOf(pq), 1);
  });
  await basket.save();
  let userOrders = await Order.find({ user: req.body.user._id });
  res.status(200).send({ msg: "success", orders: userOrders });
};
exports.getUserOrders = async (req, res) => {
  let id = req.params;
  let orders = await Order.find({ user: id }).populate(
    "productQuantity.product"
  );
  res.status(200).send({ orders: orders });
};

// exports.deleteO = async (req, res) => {
//   try {
//     await Order.deleteMany({ productQuantity: [] });
//     res.send(ok);
//   } catch (error) {
//     res.send(error)
//   }
// };
