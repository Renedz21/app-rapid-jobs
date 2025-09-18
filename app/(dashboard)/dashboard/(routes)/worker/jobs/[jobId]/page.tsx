import { JobDetail } from "@/components/jobs/job-details";
import { createClient } from "@/utils/supabase/server";

type WorkerJobPageProps = {
  params: {
    jobId: string;
  };
};

export default async function WorkerJobPage({ params }: WorkerJobPageProps) {
  const supabase = await createClient();
  const { jobId } = params;
  const { data: job } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", jobId)
    .single();

  if (!job) {
    return <div>Job not found</div>;
  }

  return <JobDetail jobId={jobId} />;
}
