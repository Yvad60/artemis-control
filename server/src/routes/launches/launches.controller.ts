import { RequestHandler } from "express";
import launches from "../../model/launches.model";

export const getLaunches: RequestHandler = (req, res) => {
  return res.status(200).json(launches);
};
