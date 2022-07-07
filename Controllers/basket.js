const Basket = require("../Model/Basket");
const Product = require("../Model/Product");
exports.removeFromBasket = async (req, res) => {
  try {
    let basket = await Basket.findOne({ user: req.body.userId }).populate(
      "productQuantity.product"
    );
    const product = await Product.findById(req.body.productId);

    await basket.productQuantity.forEach((pq) => {
      if (JSON.stringify(pq.product._id) === JSON.stringify(product._id)) {
        if (pq.quantity > 1) {
          pq.quantity--;
        } else {
          basket.productQuantity.splice(basket.productQuantity.indexOf(pq), 1);
        }
      }
    });

    await basket.save();
    res.send(basket);
  } catch (error) {
    res.status(400).send({ msg: "Product cannot be removed from basket" });
  }
};

exports.addToBasket = async (req, res) => {
  try {
    let basket = await Basket.findOne({ user: req.body.userId }).populate(
      "productQuantity.product"
    );
    const product = await Product.findById(req.body.productId);
    let exist = false;

    await basket.productQuantity.forEach((pq) => {
      if (JSON.stringify(pq.product._id) === JSON.stringify(product._id)) {
        pq.quantity++;
        exist = true;
      }
    });
    if (exist === false) {
      basket.productQuantity.push({ product, quantity: 1 });
    }
    await basket.save();
    res.send(basket);
  } catch (error) {
    res.status(400).send({ msg: "Product cannot be added to basket" });
  }
};

exports.getBasket = async (req, res) => {
  try {
    const basketToFind = await Basket.findOne({
      user: req.params._id,
    }).populate(
      "productQuantity.product"
    );
    res.status(200).send({ msg: "Basket found !", basket: basketToFind });
  } catch (error) {
    res.status(400).send({ msg: "Basket cannot be found !!", error });
  }
};
