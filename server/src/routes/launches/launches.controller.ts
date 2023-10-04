import { RequestHandler } from "express";
import {
  abortLaunchById,
  addLaunch,
  existsLaunchWithId,
  getLaunches,
} from "../../model/launches.model";
import { getPagination } from "../../services/query";
import { FrontendLaunch } from "../../types";

export const httpGetLaunches: RequestHandler<
  unknown,
  unknown,
  unknown,
  { limit: string | undefined; page: string | undefined }
> = async (req, res) => {
  const { limit, skip } = getPagination(req.query);
  const launches = await getLaunches(skip, limit);
  return res.status(200).json(launches);
};

export const httpAddLaunch: RequestHandler<unknown, unknown, FrontendLaunch> = async (req, res) => {
  const launchData = req.body;
  const requiredInputs = ["launchDate", "mission", "rocket", "destination"];
  if (!requiredInputs.every((input) => Object.keys(launchData).includes(input))) {
    return res.status(400).json({ error: "Missing required input" });
  }
  if (new Date(launchData.launchDate).toString() === "Invalid Date") {
    return res.status(400).json({ error: "Invalid launch date" });
  }
  const newLaunch = await addLaunch(launchData);
  return res.status(201).json(newLaunch);
};

export const httpAbortLaunch: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;
  if (!(await existsLaunchWithId(Number(id)))) {
    return res.status(400).json({ error: "Launch not found" });
  }
  return res.status(200).json(await abortLaunchById(Number(id)));
};
