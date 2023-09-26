export interface LaunchDto {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: Date | null;
  destination: string;
  customers: string[];
  upcoming: boolean;
  successs: boolean;
}
