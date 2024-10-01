const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName:{type:String,required:true},
  price:{type:Number,required:true},
  descriptions:{type:String,required:true},
  image: { type: String, required: true },
  stock:{type:String,required:true}
})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;