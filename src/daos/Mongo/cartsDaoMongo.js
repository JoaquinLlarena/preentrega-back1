

import cartsModel from "../models/carts.model.js";

class CartDaoMongo {
  constructor() {
    this.model = cartsModel;
  }
  async getCarts() {
    return this.model.find({});
  }

  async getCartById(cid) {
    return this.model.findOne({ _id: cid });
  }

  async createCart(newCart) {
    return this.model.create(newCart);
  }

  async updateCart(cid, updatedCart) {
    return this.model.updateOne({ _id: cid }, updatedCart);
  }

  async deleteOnePorductInCart(cid, pid) {
    return this.model.updateOne(
      { _id: cid },
      { $pull: { products: { _id: pid } } }
    );
  }
  async updateProductQuantity(cid, pid, newQuantity) {
    const cart = await this.model.findOne({ _id: cid });
    const productToUpdate = cart.products.find((product) =>
      product.product.equals(pid)
    );
    if (productToUpdate) {
      productToUpdate.quantity = newQuantity;
      await cart.save();
    }

    return cart;
  }
}

export default CartDaoMongo;