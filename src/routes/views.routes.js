import { Router } from "express";
import productModel from "../daos/models/products.model.js";
import CartDaoMongo from "../daos/Mongo/cartsDaoMongo.js";
const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
  res.render("index", {
    title: "Backend CoderHouse",
  });
});

viewsRouter.get("/products", async (req, res) => {
  const { numPage, limit = 10, sort = 1, ...queryParams } = req.query;
  const filter = queryParams || {};
  const sortOrder = sort === "-1" ? -1 : 1;
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
  } = await productModel.paginate(filter, {
    limit,
    page: numPage,
    lean: true,
    sort: { [sort]: sortOrder },
  });
  res.render("products", {
    status: "succes",
    products: docs,
    prevPage,
    nextPage,
    hasPrevPage,
    hasNextPage,
    page,
  });
});

viewsRouter.get("/product/:pid", async (req, res) => {
  const { pid } = req.params;
  const result = await productModel.paginate({ _id: pid });

  if (result.docs && result.docs.length > 0) {
    const productData = { ...result.docs[0]._doc };
    res.render("productDetail", {
      status: "success",
      product: productData,
    });
  } else {
    res.render("productDetail", {
      status: "error",
      errorMessage: "Producto no encontrado",
    });
  }
});

viewsRouter.get("/cart/:cid", async (req, res) => {
  try {
    const cartManager = new CartDaoMongo(); // Reemplaza CartDaoMongo con tu clase o modelo real
    const { cid } = req.params;
    const cartData = await cartManager.getCartById(cid);

    if (cartData) {
      const products = cartData.products.map(cartItem => {
        return {
          title: cartItem.product.title,
          category: cartItem.product.category,
          price: cartItem.product.price,
          stock: cartItem.product.stock,
          isActive: cartItem.product.isActive,
          quantity: cartItem.quantity,
        };
      });

      res.render("cart", {
        status: "success",
        products: products,
      });
    } else {
      res.render("cart", {
        status: "error",
        errorMessage: "Producto no encontrado",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
});



export default viewsRouter;