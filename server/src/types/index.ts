export interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: Date | null;
  destination: string;
  customers: string[];
  upcoming: boolean;
  success: boolean;
}

export interface FrontendLaunch
  extends Omit<Launch, "launchDate" | "flightNumber" | "customers" | "upcoming" | "success"> {
  launchDate: "string";
}
