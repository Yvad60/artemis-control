import { Router } from "express";
import { getPlanets } from "./planets.controller";

const planetsRouter = Router();

planetsRouter.get("/planets", getPlanets);

export default planetsRouter;
