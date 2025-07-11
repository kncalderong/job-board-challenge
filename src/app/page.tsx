import PaginationBlock from "@/components/global/PaginationBlock";
import JobsGrid, { JobsGridSkeleton } from "@/components/home/JobsGrid";
import SearchBlock from "@/components/home/Search";
import { getTotalPages } from "@/helpers/CRUD/jobs";
import { Suspense } from "react";

export default async function Home(props: {
  searchParams?: Promise<{
    page?: string;
    query?: string;
    type?: string;
    remote?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const jobType = searchParams?.type || "";
  const remoteOnly = searchParams?.remote === "true";

  const PAGE_SIZE = 6;
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getTotalPages({
    pageSize: PAGE_SIZE,
    query,
    jobType,
    remoteOnly,
  });

  return (
    <div className="custom-box flex flex-col gap-8 py-8">
      <SearchBlock placeholder="Search by name or author" />
      <Suspense
        key={currentPage + PAGE_SIZE}
        fallback={<JobsGridSkeleton pageSize={PAGE_SIZE} />}
      >
        <JobsGrid
          currentPage={currentPage}
          pageSize={PAGE_SIZE}
          query={query}
          jobType={jobType}
          remoteOnly={remoteOnly}
        />
      </Suspense>
      <PaginationBlock totalPages={totalPages} />
    </div>
  );
}
