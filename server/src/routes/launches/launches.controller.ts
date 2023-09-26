import { RequestHandler } from "express";
import {
  abortLaunchById,
  addLaunch,
  existsLaunchWithId,
  getLaunches,
} from "../../model/launches.model";
import { FrontendLaunch } from "../../types";

export const httpGetLaunches: RequestHandler = (req, res) => {
  return res.status(200).json(getLaunches());
};

export const httpAddLaunch: RequestHandler<unknown, unknown, FrontendLaunch> = (req, res) => {
  const launchData = req.body;
  const requiredInputs = ["launchDate", "mission", "rocket", "destination"];
  if (!requiredInputs.every((input) => Object.keys(launchData).includes(input))) {
    return res.status(400).json({ error: "Missing required input" });
  }
  if (new Date(launchData.launchDate).toString() === "Invalid Date") {
    return res.status(400).json({ error: "Invalid launch date" });
  }
  return res.status(201).json(addLaunch(launchData));
};

export const httpAbortLaunch: RequestHandler<{ id: string }> = (req, res) => {
  const { id } = req.params;
  if (!existsLaunchWithId(Number(id))) {
    return res.status(400).json({ error: "Launch not found" });
  }
  return res.status(200).json(abortLaunchById(Number(id)));
};
