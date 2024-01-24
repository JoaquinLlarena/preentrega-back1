import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";
const productSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  stock: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true,
  },
});
productSchema.plugin(mongoosePaginate);
const productModel = model(productCollection, productSchema);
export default productModel;