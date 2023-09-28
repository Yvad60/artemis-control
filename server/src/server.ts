import { createServer } from "http";
import mongoose from "mongoose";
import app from "./app";
import { loadPlanetsData } from "./model/planets.model";

const PORT = process.env.PORT || 5000;
const MONGO_DB_URL =
  "mongodb+srv://ivadyhabimana:BzOcXr5BRbuHsPN6@artemiscluster.lxwbyom.mongodb.net/?retryWrites=true&w=majority";

const server = createServer(app);

const startServer = async () => {
  await mongoose.connect(MONGO_DB_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

mongoose.connection.once("open", () => {
  console.log("Database connected");
});

startServer();
