const Products = require("../models/Products");
const Order = require("../models/Order");
const { v4: uuidv4 } = require('uuid');
exports.addOrder = async (req, res, next) => {

  const tayming = [];
  for (let tay of req.body.product_ID) {
    let taym = tay
    tayming.push(taym)
  }

  const result = new Order({
    phone: req.body.phone,
    address: req.body.address,
    totalPrice: req.body.totalPrice,
    order_id: uuidv4(),
    user_name: req.body.user_name,
    user_surname: req.body.user_surname,
    userID: req.body.userID,
    product_ID: tayming
  });

  res.json(result)
  result
    .save({ validateBeforeSave: false })
    .then(() => {
      res.status(201).json({ data: result });
    })
    .catch((error) => {
      res.status(400).json({ data: error });
    });
};
//  order haqida malumot olish
exports.information = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
    res.status(200).json({ message: "Data is found", data: order });
  } catch (error) {
    res.status(400).json({ message: "Data is not found", data: error });
  }
};
// mahsulot haqida malumot olish
exports.information_product = async (req, res, next) => {
  try {
    const product = await Products.findById(req.params.id)
    .populate(['categoryID', 'colorID'])
    res.status(200).json({ message: "Data is found", data: product });
  } catch (error) {
    res.status(400).json({ message: "Data is not found", data: error });
  }
};
// active buyurtmalarni olish
exports.getActiveOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ status: { $in: "active" } })
      .populate(["productID", "categoryID", "userID"])
      .sort({ date: -1 });
    res.status(200).json({ message: "Data is found", data: order });
  } catch (error) {
    res.status(400).json({ message: "Data is not found", data: error });
  }
};
// noactive buyurtmalarni olish
exports.getNoactiveOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ status: { $in: "noactive" } })
      .populate(["productID", "categoryID", "userID"])
      .sort({ date: -1 });
    const user = req.session.admin; // admin session
    res.status(200).json({ message: "Data is found", data: order });
  } catch (error) {
    res.status(400).json({ message: "Data is not found", data: error });
  }
};
// buyurtmani activ qilish
exports.makeOrderActive = async (req, res, next) => {
  const result = await Order.findByIdAndUpdate(req.params.id);
  result.status = "active";
  // const product = await Products.findByIdAndUpdate(result.productID);
  // product.bestSeller_count++;
  // product.save();
  result
    .save()
    .then(() => {
      res.status(200).json({ message: "Order is  actived", data: result })
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed", data: error });
    });
};
// buyurtmani noactive qilish
exports.makeOrderNoactive = async (req, res, next) => {
  const result = await Order.findByIdAndUpdate(req.params.id);
  result.status = "noactive";

  // const product = await Products.findByIdAndUpdate(result.productID);
  // product.bestSeller_count--;
  // product.save();

  result
    .save()
    .then(() => {
      res.status(200).json({ message: "Order is noactived", data: result })
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed", data: error });
    });
};
// buyurtmani korilgan qilish
exports.makeSeenOrder = async (req, res, next) => {
  const result = await Order.findByIdAndUpdate(req.params.id);
  result.process = "seen";
  result
    .save({ validationBeforeSave: false })
    .then(() => {
      res.status(200).json({ message: "Success", data: result });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed", data: error });
    });
};
// buyurtmani korilmagan  qilish
exports.makeUnseenOrder = async (req, res, next) => {
  const result = await Order.findByIdAndUpdate(req.params.id);
  result.process = "unseen";
  result
    .save({ validationBeforeSave: false })
    .then(() => {
      res.status(200).json({ message: "Success", data: result });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed", data: error });
    });
};
// buyurtmani o'chirish
exports.deleteOrder = async (req, res, next) => {
  await Order.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) {
      throw err;
    } else {
      res.status(200).json({ message: "Success", data: [] });
    }
  });
};
// User paneldan orderni ochirish
exports.deleteOrderUserSide = async (req, res, next) => {
  await Order.findByIdAndDelete(req.params.id, (err, doc) => {
    if (err) {
      throw err
    } else {
      res.json("Success deleted")
    }
  });
};