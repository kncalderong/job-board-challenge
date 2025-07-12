import { JobForm } from "@/components/Job/JobForm";

export default function CreateJobPage() {
  return (
    <div className="custom-box flex flex-col gap-8 py-8">
      <h1 className="text-3xl">Create Job</h1>
      <JobForm />
    </div>
  );
}
