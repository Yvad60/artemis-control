import { FrontendLaunch, Launch } from "../types";

const launches: Map<number, Launch> = new Map();

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

launches.set(launch.flightNumber, launch);

export const getLaunches = () => Array.from(launches.values());

export const addLaunch = (launch: FrontendLaunch) => {
  let lastLaunchFlightNumber = Array.from(launches.values()).pop()?.flightNumber || 9; // When launches are empty the default number will be 10 from 9 + 1 = 10
  const cleanLaunchData = { ...launch, launchDate: new Date(launch.launchDate) };

  lastLaunchFlightNumber++;
  launches.set(
    lastLaunchFlightNumber,
    Object.assign(cleanLaunchData, {
      flightNumber: lastLaunchFlightNumber,
      customers: ["ZTM", "NASA"],
      upcoming: true,
      success: true,
    })
  );

  return launches.get(lastLaunchFlightNumber);
};

export const existsLaunchWithId = (launchId: number) => launches.has(launchId);

export const abortLaunchById = (launchId: number) => {
  const abortedLaunch = launches.get(launchId);
  if (abortedLaunch == null) return null;
  abortedLaunch.upcoming = false;
  abortedLaunch.success = false;
  return abortedLaunch;
};
