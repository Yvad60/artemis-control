import mongoose from "mongoose";

const MONGO_DB_URL =
  "mongodb+srv://ivadyhabimana:BzOcXr5BRbuHsPN6@artemiscluster.lxwbyom.mongodb.net/?retryWrites=true&w=majority";

export const connectToMongoDb = async () => {
  await mongoose.connect(MONGO_DB_URL);
};

export const disconnectFromMongoDb = async () => {
  await mongoose.disconnect();
};

mongoose.connection.once("open", () => {
  console.log("Database connected");
});
