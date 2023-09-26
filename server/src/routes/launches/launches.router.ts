import { Router } from "express";
import { httpAbortLaunch, httpAddLaunch, httpGetLaunches } from "./launches.controller";

const launchesRouter = Router();

launchesRouter.get("/", httpGetLaunches);
launchesRouter.post("/", httpAddLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

export default launchesRouter;
