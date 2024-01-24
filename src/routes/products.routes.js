import { Router } from "express";
import ProductDaoMongo from "../daos/Mongo/productsDaoMongo.js";
import productModel from "../daos/models/products.model.js";

const productRouter = Router();
const productService = new ProductDaoMongo();

productRouter
  .get("/", async (req, res) => {
    try {
      const { numPage } = req.query;
      const {
        docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page,
        totalPages,
        nextLink,
        prevLink,
      } = await productModel.paginate({}, { page: numPage || 1, lean: true });
      res.send({
        status: "success",
        payload: docs,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage ? `/products?page=${prevPage}` : null,
        nextLink: hasNextPage ? `/products?page=${nextPage}` : null,
      });
    } catch (error) {
      console.error("Error en la obtención de productos:", error);
      res.status(500).send({
        status: "error",
        message: "Error interno del servidor al obtener productos.",
      });
    }
  })

  .get("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const products = await productService.getProductById(pid);
      res.send(products);
    } catch (error) {
      console.error("Error al obtener producto por ID:", error);
      res.status(500).send({
        status: "error",
        message: "Error interno del servidor al obtener producto por ID.",
      });
    }
  })

  .post("/", async (req, res) => {
    try {
      const newProduct = req.body;
      if (
        !newProduct.title ||
        !newProduct.category ||
        !newProduct.stock ||
        !newProduct.price ||
        !newProduct.thumbnail ||
        newProduct.isActive === undefined
      ) {
        return res.status(400).send({
          status: "error",
          message:
            "Todos los campos (title, category, stock, price, thumbnail, isActive) son obligatorios.",
        });
      }

      const result = await productService.createProduct(newProduct);

      res.send({
        status: "success",
        payload: result,
      });
    } catch (error) {
      console.error("Error al crear un nuevo producto:", error);
      res.status(500).send({
        status: "error",
        message: "Error interno del servidor al crear un nuevo producto.",
      });
    }
  })

  .put("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const updatedProduct = req.body;
      if (
        !updatedProduct.title ||
        !updatedProduct.category ||
        !updatedProduct.stock ||
        !updatedProduct.price ||
        !updatedProduct.thumbnail ||
        updatedProduct.isActive === undefined
      ) {
        return res.status(400).send({
          status: "error",
          message:
            "Todos los campos (title, category, stock, price, thumbnail, isActive) son obligatorios.",
        });
      }

      const newProduct = await productService.updateProduct(
        pid,
        updatedProduct
      );

      res.send({
        status: "success",
        payload: newProduct,
      });
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      res.status(500).send({
        status: "error",
        message: "Error interno del servidor al actualizar el producto.",
      });
    }
  })

  .delete("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      await productService.deleteProduct(pid);
      res.send("Producto Eliminado");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      res.status(500).send({
        status: "error",
        message: "Error interno del servidor al eliminar el producto.",
      });
    }
  });

export default productRouter;