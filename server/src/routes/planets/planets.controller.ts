import { RequestHandler } from "express";
import { getHabitablePlanets } from "../../model/planets.model";

export const httpGetPlanets: RequestHandler = async (req, res) => {
  const planets = await getHabitablePlanets();
  return res.status(200).json(planets);
};
