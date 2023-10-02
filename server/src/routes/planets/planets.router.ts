import { Router } from "express";
import { httpGetPlanets } from "./planets.controller";

const planetsRouter = Router();

planetsRouter.get("/", httpGetPlanets);

export default planetsRouter;
