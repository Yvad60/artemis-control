import { Router } from "express";
import { httpAddLaunch, httpGetLaunches } from "./launches.controller";

const launchesRouter = Router();

launchesRouter.get("/", httpGetLaunches);
launchesRouter.post("/", httpAddLaunch);

export default launchesRouter;
