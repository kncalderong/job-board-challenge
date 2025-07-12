import { ParallelModal } from "@/components/global/ParallelModal";
import JobBlock from "@/components/Job/JobBlock";
import { getJobById } from "@/helpers/CRUD/jobs";
import { Pencil } from "lucide-react";
import Link from "next/link";

export default async function JobPageModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJobById(id);
  return (
    <ParallelModal>
      <div className="flex w-full justify-between items-center text-white">
        <h1 className="text-3xl">Job Details</h1>
        <Link
          href={job ? `/edit/${job.id}` : "/"}
          className="flex gap-4 items-center text-lg"
        >
          <Pencil />
          <p className="hidden md:block">Edit</p>
        </Link>
      </div>
      {job && <JobBlock job={job} isLink={false} showDescription={true} />}
    </ParallelModal>
  );
}
