export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Contract" | "Part-time";
  description: string;
}
