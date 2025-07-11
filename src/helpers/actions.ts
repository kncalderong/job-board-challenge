"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import jobs from "@/lib/jobs.json";
const addSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
  type: z.enum(["Full-time", "Contract", "Part-time"]),
  description: z.string().min(1),
});

export async function addJobAction(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    console.error("Validation Error:", result.error);
    return result.error.flatten().fieldErrors;
  }
  const data = result.data;

  // Simulate adding job to the database
  jobs.unshift({
    id: crypto.randomUUID(),
    ...data,
  });

  revalidatePath("/");
  redirect("/");
}

export async function updateJobAction(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    console.error("Validation Error:", result.error);
    return result.error.flatten().fieldErrors;
  }
  const data = result.data;

  // Simulate updating job in the database
  const jobIndex = jobs.findIndex((job) => job.id === id);
  if (jobIndex !== -1) {
    jobs[jobIndex] = { id, ...data };
  }

  revalidatePath("/");
  redirect("/");
}
