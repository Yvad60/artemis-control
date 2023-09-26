import { parse } from "csv-parse";
import fs from "fs";
import path from "path";
import { Planet } from "../data/types";

const documentStream = fs.createReadStream(path.join(__dirname, "..", "data", "planets-data.csv"));
const habitablePlanets: Planet[] = [];

const isPlanetHabbitable = (planet: Planet) => {
  return (
    planet.koi_disposition === "CONFIRMED" &&
    +planet.koi_insol > 0.36 &&
    +planet.koi_insol < 1.11 &&
    +planet.koi_prad < 1.6
  );
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
      .on("data", (chunk: Planet) => {
        if (isPlanetHabbitable(chunk)) habitablePlanets.push(chunk);
      })
      .on("end", () => {
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

export const getHabitablePlanets = () => habitablePlanets;

export default habitablePlanets;
