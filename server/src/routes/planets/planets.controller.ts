import { RequestHandler } from "express";
import habitablePlanets from "../../model/planets.model";

export const getPlanets: RequestHandler = (req, res) => {
  return res.status(200).json(habitablePlanets);
};
