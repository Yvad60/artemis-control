import cors from "cors";
import express from "express";
import planetsRouter from "./routes/planets/planets.router";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(planetsRouter);

export default app;
