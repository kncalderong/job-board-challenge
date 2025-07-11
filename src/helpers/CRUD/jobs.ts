"use server";
import jobs from "@/lib/jobs.json";
import { Job } from "@/types/jobs";

export async function getTotalPages({
  pageSize,
  query,
  jobType,
  remoteOnly,
}: {
  pageSize: number;
  query: string;
  jobType?: string;
  remoteOnly?: boolean;
}): Promise<number> {
  try {
    if (pageSize === 0) return 0;
    const filteredJobs = filterJobs({ query, jobType, remoteOnly });
    return Math.ceil(filteredJobs.length / pageSize);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of pages");
  }
}

export async function getJobs({
  pageSize,
  page,
  query,
  jobType,
  remoteOnly,
}: {
  pageSize: number;
  page: number;
  query: string;
  jobType?: string;
  remoteOnly?: boolean;
}) {
  try {
    if (pageSize === 0 || page < 1) return [];
    const filteredJobs = filterJobs({ query, jobType, remoteOnly });
    return filteredJobs.slice((page - 1) * pageSize, page * pageSize);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch jobs");
  }
}

function filterJobs({
  query,
  jobType,
  remoteOnly,
}: {
  query?: string;
  jobType?: string;
  remoteOnly?: boolean;
}) {
  const typedJobs = jobs as Job[];
  let filteredJobs = typedJobs;
  if (query) {
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase())
    );
  }
  if (jobType) {
    filteredJobs = filteredJobs.filter((job) => job.type === jobType);
  }
  if (remoteOnly) {
    filteredJobs = filteredJobs.filter((job) => job.location === "Remote");
  }
  return filteredJobs;
}
