import mongoose from "mongoose";

const MONGO_DB_URL = process.env.MONGO_DB_URL;

export const connectToMongoDb = async () => {
  console.log(MONGO_DB_URL);
  if (MONGO_DB_URL != null) await mongoose.connect(MONGO_DB_URL);
};

export const disconnectFromMongoDb = async () => {
  await mongoose.disconnect();
};

mongoose.connection.once("open", () => {
  console.log("Database connected");
});
