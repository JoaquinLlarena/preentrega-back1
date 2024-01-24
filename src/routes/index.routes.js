import { Router } from "express";
import productRouter from "./products.routes.js";
import cartRouter from "./carts.routes.js";
const appRouter = Router();

appRouter.use("/api/products", productRouter);
appRouter.use("/api/carts", cartRouter);

export default appRouter;