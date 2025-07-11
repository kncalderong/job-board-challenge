import { JobForm } from "@/components/Job/JobForm";
import { getJobById } from "@/helpers/CRUD/jobs";

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("EditJobPage id:", id);
  const job = await getJobById(id);
  return (
    <div className="custom-box flex flex-col gap-8 py-8">
      <h1 className="text-3xl">Edit Job</h1>
      <JobForm job={job} />
    </div>
  );
}
