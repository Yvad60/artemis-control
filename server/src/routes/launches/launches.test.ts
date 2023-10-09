import "dotenv/config";
import request from "supertest";
import app from "../../app";
import { loadPlanetsData } from "../../model/planets.model";
import { connectToMongoDb, disconnectFromMongoDb } from "../../services/mongo";

describe("Launches API test", () => {
  beforeAll(async () => {
    await connectToMongoDb();
    await loadPlanetsData();
  });

  afterAll(async () => {
    await disconnectFromMongoDb();
  });

  describe("Test GET /launches ", () => {
    const response = request(app).get("/v1/launches");
    it("Should respond with 200 status code", async () => {
      await response.expect(200);
    });

    it("Should contain json in response Content-Type", async () => {
      await response.expect("Content-Type", /json/i);
    });
  });

  describe("Test POST /launches ", () => {
    const validLaunch = {
      mission: "Ivad IS1. nini in test",
      rocket: "Ivad IS1",
      launchDate: "2034-05-10",
      destination: "Kepler-1652 b",
    };

    const launchWithoutDate = {
      mission: "Ivad IS1. nini in test",
      rocket: "Ivad IS1",
      destination: "Kepler-1652 b",
    };

    const launchWithInvalidDate = {
      mission: "Ivad IS1. nini in test",
      rocket: "Ivad IS1",
      destination: "Kepler-1652 b",
      launchDate: "Invalid date",
    };

    const response = request(app).post("/v1/launches").send(validLaunch);
    it("Should respond with 200 status code", async () => {
      await response.expect(201);
    });
    it("Should contain json in the response Content-Type", async () => {
      await response.expect("Content-Type", /json/i);
    });
    it("Should contain all inputs provided inputs", async () => {
      expect((await response).body).toMatchObject(launchWithoutDate);
    });
    it("Should create a launch with correct launchDate", async () => {
      const body = (await response).body;
      expect(new Date(body.launchDate).valueOf()).toBe(new Date(validLaunch.launchDate).valueOf());
    });
    it("Should catch missing launch inputs", async () => {
      const response = request(app).post("/v1/launches").send(launchWithoutDate);
      const body = (await response).body;
      expect(body).toStrictEqual({ error: "Missing required input" });
    });
    it("Should catch invalid date launch", async () => {
      const response = request(app).post("/v1/launches").send(launchWithInvalidDate);
      const body = (await response).body;
      expect(body).toStrictEqual({ error: "Invalid launch date" });
    });
  });
});
