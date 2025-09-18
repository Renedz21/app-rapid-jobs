import { JobsFilters } from "@/components/jobs/jobs-filter";
import { JobsGrid } from "@/components/jobs/jobs-grid";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 0;

export default async function WorkerJobsPage() {
  const supabase = await createClient();

  const { data: jobs } = await supabase.from("jobs").select(`
      *,
      profiles:profiles(full_name)
    `);

  if (!jobs) {
    return <div>No hay empleos disponibles</div>;
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-80">
          <JobsFilters />
        </aside>
        <div className="flex-1">
          <JobsGrid
            jobs={jobs
              .filter((job) => job.profiles !== null)
              .map((job) => ({
                ...job,
                profiles: { full_name: job.profiles?.full_name ?? "" },
              }))}
          />
        </div>
      </div>
    </div>
  );
}
