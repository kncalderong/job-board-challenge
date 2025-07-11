import { ParallelModal } from "@/components/global/ParallelModal";
import JobBlock from "@/components/Job/JobBlock";
import { getJobById } from "@/helpers/CRUD/jobs";

export default async function JobPageModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJobById(id);
  return (
    <ParallelModal>
      <h1 className="text-3xl text-white">Job Details</h1>
      {job && <JobBlock job={job} isLink={false} showDescription={true} />}
    </ParallelModal>
  );
}
