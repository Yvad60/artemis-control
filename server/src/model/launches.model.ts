import axios from "axios";
import { FrontendLaunch, Launch as LaunchType, SpaceXLaunchResponse } from "../types";
import Launch from "./launches.mongo";
import Planet from "./planets.mongo";

const launches: Map<number, LaunchType> = new Map();

const launch = {
  flightNumber: 10,
  mission: "Explorer IS1",
  rocket: "Explorer IS1",
  launchDate: new Date("2024-03-25"),
  destination: "Kepler-1652 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

const saveLaunch = async (launch: LaunchType) => {
  const planet = await Planet.findOne({ kepler_name: launch.destination });
  if (planet == null) throw new Error("Specified planet not found");
  return await Launch.findOneAndUpdate({ flightNumber: launch.flightNumber }, launch, {
    upsert: true,
    new: true,
  });
};

saveLaunch(launch);

const getLatestFlightNumber = async () => {
  const DEFAULT_FLIGHT_NUMBER = 100;
  const latestLaunch = await Launch.findOne({}).sort("-flightNumber");
  return latestLaunch?.flightNumber ?? DEFAULT_FLIGHT_NUMBER;
};

export const getLaunches = async () => await Launch.find({});

export const addLaunch = async (launch: FrontendLaunch) => {
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
  const SPACE_X_API = "https://api.spacexdata.com/v4/launches/query";
  const response = await axios.post<SpaceXLaunchResponse>(SPACE_X_API, {
    query: {},
    options: {
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
      destination: launchDoc.rocket.name,
      customers: launchDoc.payloads.flatMap((payload) => payload.customers),
    };
    console.log("dowloading data...s", launch);
  });
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
