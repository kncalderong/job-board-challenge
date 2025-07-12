import { getJobs } from "@/helpers/CRUD/jobs";
import JobBlock from "../Job/JobBlock";

export default async function JobsGrid({
  currentPage,
  pageSize,
  query,
  jobType,
  remoteOnly,
}: {
  currentPage: number;
  pageSize: number;
  query?: string;
  jobType?: string;
  remoteOnly?: boolean;
}) {
  const jobs = await getJobs({
    pageSize,
    page: currentPage,
    query: query || "",
    jobType: jobType || "",
    remoteOnly: remoteOnly || false,
  });
  return (
    <section className="flex flex-col gap-6 my-4">
      {jobs.map((job) => (
        <JobBlock job={job} key={job.id} />
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
