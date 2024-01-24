import { connect } from "mongoose";
// Conexión con Mongo Atlas
const connectDB = async () => {
  await connect(
    "mongodb+srv://daniagus1612:racingclub32@cluster0.qnozhpb.mongodb.net/c55625?retryWrites=true&w=majority"
  );
  console.log("base de datos conectada");
};

export default connectDB;