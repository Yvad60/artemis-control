import { parse } from "csv-parse";
import fs from "fs";
import path from "path";
import { Planet as PlanetType } from "../data/types";
import Planet from "./planets.mongo";

const documentStream = fs.createReadStream(path.join(__dirname, "..", "data", "planets-data.csv"));

const isPlanetHabbitable = (planet: PlanetType) => {
  return (
    planet.koi_disposition === "CONFIRMED" &&
    +planet.koi_insol > 0.36 &&
    +planet.koi_insol < 1.11 &&
    +planet.koi_prad < 1.6
  );
};

const savePlanet = async ({ kepler_name }: PlanetType) => {
  try {
    await Planet.updateOne({ kepler_name }, { kepler_name }, { upsert: true });
  } catch (error) {
    console.log(error);
  }
};

export function loadPlanetsData(): Promise<void> {
  return new Promise((resolve, reject) => {
    documentStream
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (chunk: PlanetType) => {
        if (isPlanetHabbitable(chunk)) savePlanet(chunk);
      })
      .on("end", () => {
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

export const getHabitablePlanets = async () => {
  const planets = await Planet.find({}, { __v: 0 });
  return planets;
};
