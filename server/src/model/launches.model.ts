import axios from "axios";
import { FrontendLaunch, Launch as LaunchType, SpaceXLaunchResponse } from "../types";
import Launch from "./launches.mongo";
import Planet from "./planets.mongo";

const saveLaunch = async (launch: LaunchType) => {
  return await Launch.findOneAndUpdate({ flightNumber: launch.flightNumber }, launch, {
    upsert: true,
    new: true,
  });
};

const getLatestFlightNumber = async () => {
  const DEFAULT_FLIGHT_NUMBER = 100;
  const latestLaunch = await Launch.findOne({}).sort("-flightNumber");
  return latestLaunch?.flightNumber ?? DEFAULT_FLIGHT_NUMBER;
};

export const getLaunches = async (skip: number, limit: number) => {
  return await Launch.find({}).skip(skip).limit(limit).sort({ flightNumber: 1 });
};

const populateLaunches = async () => {
  const SPACE_X_API = "https://api.spacexdata.com/v4/launches/query";
  const response = await axios.post<SpaceXLaunchResponse>(SPACE_X_API, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });
  const launchDocs = response.data.docs;
  launchDocs.forEach((launchDoc) => {
    const launch: LaunchType = {
      flightNumber: launchDoc.flight_number,
      mission: launchDoc.name,
      launchDate: new Date(launchDoc.date_local),
      upcoming: launchDoc.upcoming,
      success: launchDoc.success,
      rocket: launchDoc.rocket.name,
      customers: launchDoc.payloads.flatMap((payload) => payload.customers),
    };
    saveLaunch(launch);
  });
};

export const addLaunch = async (launch: FrontendLaunch) => {
  const planet = await Planet.findOne({ kepler_name: launch.destination });
  if (planet == null) throw new Error("Specified planet not found");

  let lastLaunchFlightNumber = await getLatestFlightNumber();
  const cleanLaunchData = { ...launch, launchDate: new Date(launch.launchDate) };
  return await saveLaunch(
    Object.assign(cleanLaunchData, {
      flightNumber: lastLaunchFlightNumber + 1,
      customers: ["ZTM", "NASA"],
      upcoming: true,
      success: true,
    })
  );
};

export const loadLaunchesData = async () => {
  const firstSpaceXLaunch = await Launch.findOne({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (firstSpaceXLaunch) {
    console.log("Launches data already loaded...");
  } else await populateLaunches();
};

export const existsLaunchWithId = async (launchId: number) =>
  await Launch.findOne({ flightNumber: launchId });

export const abortLaunchById = async (launchId: number) => {
  const abortedLaunch = await Launch.findOneAndUpdate(
    { flightNumber: launchId },
    {
      upcoming: false,
      success: false,
    }
  );

  return abortedLaunch;
};
