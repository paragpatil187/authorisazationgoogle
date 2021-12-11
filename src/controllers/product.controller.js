const express = require("express");

const Product = require("../models/product.model");

const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorise(["seller", "admin"]),
  async (req, res) => {
    try {
      const user = req.user;

      const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        image_urls: ["www.google.com"],
        user: user.user._id,
      });

      return res.status(201).json({ product });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  }
);

router.get("/", async (req, res) => {
  const products = await Product.find().lean().exec();

  return res.send(products);
});
router.delete("/:_id",authorise(["seller", "admin"]),async(req,res)=>{
  const products=await Product.findByIdAndDelete().lean().exec()
  return res.send(products)
})

module.exports = router;
//have to add delete and update route acessby only seller and admin
//implement google auth
