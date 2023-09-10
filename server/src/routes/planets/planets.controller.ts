import { RequestHandler } from "express";
import habitablePlanets from "../../model/planets.model";

export const getPlanets: RequestHandler = (req, res) => {
  console.log(habitablePlanets);
  return res.status(200).json(habitablePlanets);
};
