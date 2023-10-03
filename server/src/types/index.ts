export interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: Date | null;
  destination?: string; // Launches from space x does not have destination planets
  customers: string[];
  upcoming: boolean;
  success: boolean;
}

export interface FrontendLaunch
  extends Omit<Launch, "launchDate" | "flightNumber" | "customers" | "upcoming" | "success"> {
  launchDate: "string";
}

export interface SpaceXLaunch {
  rocket: {
    name: string;
    id: string;
  };
  flight_number: number;
  payloads: {
    customers: string[];
    id: string;
  }[];
  date_local: Date;
  success: boolean;
  upcoming: boolean;
  name: string;
}

export interface SpaceXLaunchResponse {
  docs: SpaceXLaunch[];
}
