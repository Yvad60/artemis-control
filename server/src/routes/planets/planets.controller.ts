import { RequestHandler } from "express";
import { getHabitablePlanets } from "../../model/planets.model";

export const httpGetPlanets: RequestHandler = (req, res) => {
  return res.status(200).json(getHabitablePlanets());
};
