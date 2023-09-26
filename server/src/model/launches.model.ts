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
  successs: true,
};

launches.set(launch.flightNumber, launch);

export const getLaunches = () => Array.from(launches.values());
export const addLaunch = (launch: FrontendLaunch) => {
  const lastLaunchFlightNumber = Array.from(launches.values()).pop()?.flightNumber || 9; // When launches are empty the default number will be 10 from 9 + 1 = 10
  const cleanLaunchData = { ...launch, launchDate: new Date(launch.launchDate) };
  launches.set(
    lastLaunchFlightNumber,
    Object.assign(cleanLaunchData, {
      flightNumber: lastLaunchFlightNumber + 1,
      customers: ["ZTM", "NASA"],
      upcoming: true,
      successs: true,
    })
  );
  return launches.get(lastLaunchFlightNumber);
};
