import { Router } from "express";
import CartDaoMongo from "../daos/Mongo/cartsDaoMongo.js";

const cartRouter = Router();
const cartManager = new CartDaoMongo();

cartRouter
  // Solicitud que trae todos los carritos
  .get("/", async (req, res) => {
    const carts = await cartManager.getCarts();
    res.send({
      status: "succes",
      payload: carts,
    });
  })
  // Solicitud que trae el carrito cuyo id sea especificado en los params
  .get("/:cid", async (req, res) => {
    const { cid } = req.params;
    const cartById = await cartManager.getCartById(cid);
    res.send({
      status: "succes",
      payload: cartById,
    });
  })
  // Crea un carrito
  .post("/", async (req, res) => {
    const newCart = req.body;
    await cartManager.createCart(newCart);
    res.send({
      status: "succes",
      payload: newCart,
    });
  })
  // Actualiza el carrito
  .put("/:cid", async (req, res) => {
    const { cid } = req.params;
    const cartUpdated = req.body;
    await cartManager.updateCart(cid, cartUpdated);

    res.send({
      status: "succes",
      payload: cartUpdated,
    });
  })
  // Actualiza solo la cantidad de stock de un producto en el carrito
  .put("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const newQuantity = req.body.quantity;
    await cartManager.updateProductQuantity(cid, pid, newQuantity);
    res.send({
      status: "success",
      payload: `Quantity of product with id ${pid} updated to ${newQuantity} in cart ${cid}`,
    });
  })

  // Elimina un Producto (pid) del carrito que especifiquemos (cid)
  .delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const cartUpdated = await cartManager.deleteOnePorductInCart(cid, pid);
    res.send({
      status: "succes",
      payload: cartUpdated,
    });
  })
  // Eliminar todos los productos del carrito
  .delete("/:cid", async (req, res) => {
    const { cid } = req.params;
    await cartManager.deleteAllProductsFromCart(cid);
    res.send({
      status: "success",
      payload: `All products deleted from cart ${cid}`,
    });
  });

export default cartRouter;