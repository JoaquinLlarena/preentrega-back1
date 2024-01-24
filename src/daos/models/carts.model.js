import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartsCollection = "carts";
const cartssSchema = new Schema({
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
});
cartssSchema.pre("findOne", function () {
  this.populate("products.product");
});
cartssSchema.plugin(mongoosePaginate);
const cartsModel = model(cartsCollection, cartssSchema);

export default cartsModel;