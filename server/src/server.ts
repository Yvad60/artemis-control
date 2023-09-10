import { createServer } from "http";
import app from "./app";
import { loadPlanetsData } from "./model/planets.model";

const PORT = process.env.PORT || 5000;
const server = createServer(app);

const startServer = async () => {
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();
