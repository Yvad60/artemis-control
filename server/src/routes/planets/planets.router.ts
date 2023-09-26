import { Router } from "express";
import { httpGetPlanets } from "./planets.controller";

const planetsRouter = Router();

planetsRouter.get("/planets", httpGetPlanets);

export default planetsRouter;
