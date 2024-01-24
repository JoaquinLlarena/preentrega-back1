// Importamos Express
import express from "express";
import { engine } from "express-handlebars";
import * as path from "path";
import __dirname from "./utils.js";
import connectDB from "./config/index.js";
import viewsRouter from "./routes/views.routes.js";
import appRouter from "./routes/index.routes.js";
// Instanciamos la app de Express con la que manejaremos el servidor
const app = express();
// puerto donde correrá nuestro servidor

const puerto = 8082;
// Conexion a Atlas
connectDB();
// Le decimos a nuestra app que utilizaremos el formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "views"));
app.use("/", express.static(__dirname + "/public"));

app.use("/", viewsRouter);
app.use("/", appRouter);

const server = app.listen(puerto, () => {
  console.log(`Servidor funcionando en puerto: ${puerto} `);
});