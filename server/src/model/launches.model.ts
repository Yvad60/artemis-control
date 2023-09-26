const launches = new Map();

const launch = {
  flightNumber: 10,
  mission: "Explorer IS1",
  rocket: "Explorer IS1",
  launchDate: new Date("20/03/2024"),
  destination: "Kepler-1652 b",
  customers: ["ZTM"],
  upcoming: true,
  successs: true,
};

launches.set(launch.flightNumber, launch);

export default launches;
