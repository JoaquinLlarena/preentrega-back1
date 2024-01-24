import productModel from "../models/products.model.js";

class ProductDaoMongo {
  constructor() {
    this.model = productModel;
  }

  async getProducts() {
    return this.model.find({});
  }

  async getProductById(pid) {
    return this.model.findOne({ _id: pid });
  }

  async createProduct(newProduct) {
    return this.model.create(newProduct);
  }

  async updateProduct(pid, updatedProduct) {
    return this.model.updateOne({ _id: pid }, updatedProduct);
  }

  async deleteProduct(pid) {
    return this.model.deleteOne({ _id: pid });
  }
}

export default ProductDaoMongo;