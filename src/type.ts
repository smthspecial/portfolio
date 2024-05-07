export type IntroData = {
  name: string;
  description: string;
};
export type AbilitiesData = {
  want: string;
  can: string;
};
export type CommunicationData = {
  email: string;
  linkedIn: string;
};

export enum Screen {
  past = "/past",
  present = "/present",
  future = "/future",
}

export type Event = {
  id: string;
  startDate: number;
  endDate: number;
  header: string;
  body: string;
  footer: string;
  color: string;
  percentage?: number;
  percentageFromStart?: number;
};
