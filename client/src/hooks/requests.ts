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
  try {
    const response = await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
    return response;
  } catch (error) {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, { method: "DELETE" });
  } catch (error) {
    return { ok: false };
  }
}

export { httpAbortLaunch, httpGetLaunches, httpGetPlanets, httpSubmitLaunch };
