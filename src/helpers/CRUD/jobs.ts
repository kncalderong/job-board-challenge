"use server";
import jobs from "@/lib/jobs.json";
import { Job } from "@/types/jobs";

export async function getTotalPages(
  pageSize: number,
  query?: string
): Promise<number> {
  try {
    if (pageSize === 0) return 0;
    const typedJobs = jobs as Job[];
    if (query) {
      const filteredJobs = typedJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase())
      );
      return Math.ceil(filteredJobs.length / pageSize);
    }
    return Math.ceil(jobs.length / pageSize);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of pages");
  }
}

export async function getJobs({
  pageSize,
  page,
  query,
}: {
  pageSize: number;
  page: number;
  query: string;
}) {
  try {
    const typedJobs = jobs as Job[];
    if (query) {
      const filteredJobs = typedJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase())
      );
      return filteredJobs.slice((page - 1) * pageSize, page * pageSize);
    }
    return typedJobs.slice((page - 1) * pageSize, page * pageSize);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch jobs");
  }
}
