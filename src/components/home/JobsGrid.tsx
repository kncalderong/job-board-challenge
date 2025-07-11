import { getJobs } from "@/helpers/CRUD/jobs";
import {
  ClockFading,
  ClockPlus,
  LaptopMinimalCheck,
  MapPin,
  ReceiptText,
} from "lucide-react";

export default async function JobsGrid({
  currentPage,
  pageSize,
}: {
  currentPage: number;
  pageSize: number;
}) {
  const jobs = await getJobs(pageSize, currentPage);
  return (
    <section className="flex flex-col gap-6 my-12">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="grid grid-cols-1 grid-flow-row gap-2 rounded-lg bg-semi-dark-blue p-4 md:grid-cols-3 "
        >
          <div className="flex flex-col gap-1 my-2">
            <h2 className="text-lg text-center underline md:text-left">
              {job.title}
            </h2>
            <p className="hidden text-gray text-sm md:block">{job.company}</p>
          </div>
          <div className="flex md:hidden gap-2 items-center">
            <p className="text-gray text-sm">Company</p>
            <h2>{job.company}</h2>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex gap-2 items-center md:flex-col-reverse md:items-start">
              <p className="text-gray text-sm">Location</p>
              <h2>{job.location}</h2>
            </div>
            {job.location === "Remote" ? (
              <LaptopMinimalCheck color="var(--color-light-blue)" />
            ) : (
              <MapPin color="var(--color-light-blue)" />
            )}
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex gap-2 items-center md:flex-col-reverse md:items-start">
              <p className="text-gray text-sm">Type</p>
              <h2>{job.type}</h2>
            </div>

            {job.type === "Part-time" ? (
              <ClockFading color="var(--color-light-blue)" />
            ) : job.type === "Full-time" ? (
              <ClockPlus color="var(--color-light-blue)" />
            ) : (
              <ReceiptText color="var(--color-light-blue)" />
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

export function JobsGridSkeleton({ pageSize }: { pageSize: number }) {
  return (
    <section className="flex flex-col gap-6 my-12">
      {Array.from({ length: pageSize }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-1 grid-flow-row gap-2 rounded-lg bg-semi-dark-blue p-4 md:grid-cols-3 "
        ></div>
      ))}
    </section>
  );
}
