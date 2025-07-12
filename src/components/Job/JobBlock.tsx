import { cn } from "@/lib/utils";
import { Job } from "@/types/jobs";
import {
  ClockFading,
  ClockPlus,
  LaptopMinimalCheck,
  MapPin,
  ReceiptText,
} from "lucide-react";
import Link from "next/link";

export default async function JobBlock({
  job,
  showDescription = false,
  isLink = true,
}: {
  job: Job;
  showDescription?: boolean;
  isLink?: boolean;
}) {
  return (
    <Link
      href={`/job/${job.id}`}
      key={job.id}
      className={cn(
        "grid grid-cols-1 grid-flow-row gap-2 rounded-lg bg-semi-dark-blue p-4 md:grid-cols-3 text-white",
        !isLink && "cursor-default pointer-events-none"
      )}
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
      {showDescription && (
        <div className="flex gap-2 flex-col items-start mt-4 md:col-span-3">
          <p className="text-gray text-sm">Description:</p>
          <h2>{job.description}</h2>
        </div>
      )}
    </Link>
  );
}
