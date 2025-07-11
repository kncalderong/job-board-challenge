import JobBlock from "@/components/Job/JobBlock";
import { getJobById } from "@/helpers/CRUD/jobs";

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJobById(id);

  return (
    <div className="custom-box flex flex-col gap-8 py-8 text-white">
      <h1 className="text-3xl">Job Details</h1>
      {job && <JobBlock job={job} showDescription={true} isLink={false} />}
    </div>
  );
}
