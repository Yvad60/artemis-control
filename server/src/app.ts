import cors from "cors";
import express, { Router } from "express";
import morgan from "morgan";
import path from "path";
import launchesRouter from "./routes/launches/launches.router";
import planetsRouter from "./routes/planets/planets.router";

const app = express();
const apiRouter = Router();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/v1", apiRouter);

apiRouter.use("/planets", planetsRouter);
apiRouter.use("/launches", launchesRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export default app;
