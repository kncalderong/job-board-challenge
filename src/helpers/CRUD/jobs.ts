"use server";
import jobs from "@/lib/jobs.json";
import { Job } from "@/types/jobs";

export async function getTotalPages(pageSize: number) {
  try {
    if (pageSize === 0) return 0;
    return Math.ceil(jobs.length / pageSize);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of pages");
  }
}

export async function getJobs(pageSize: number, page: number) {
  try {
    const typedJobs = jobs as Job[];
    return typedJobs.slice((page - 1) * pageSize, page * pageSize);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch jobs");
  }
}
