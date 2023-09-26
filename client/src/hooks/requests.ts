import { LaunchDto } from "../types/api";

const API_URL = "http://localhost:5000";

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

async function httpGetLaunches(): Promise<LaunchDto[]> {
  const response = await fetch(`${API_URL}/launches`);
  const launches: LaunchDto[] = await response.json();
  return launches.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpAbortLaunch, httpGetLaunches, httpGetPlanets, httpSubmitLaunch };
