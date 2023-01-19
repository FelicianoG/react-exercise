export interface Event {
  id: number;
  date: string;
  name: string;
  location: string;
  attendees?: number[];
}
export interface User {
  id: number;
  name: string;
  age?: number | null;
}
