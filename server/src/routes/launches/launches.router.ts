import { Router } from "express";
import { getLaunches } from "./launches.controller";

const launchesRouter = Router();

launchesRouter.get("/launches", getLaunches);

export default launchesRouter;
