import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Plus } from "lucide-react";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import JobCardEmployer from "@/components/jobs/job-card-employer";
import Each from "@/components/shared/each";
import JobKpiEmployer from "@/components/jobs/job-kpi-employer";

export default async function EmployerPostingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("employer_id", user.id);

  if (!jobs) {
    return <div>No hay empleos publicados</div>;
  }

  return (
    <>
      <DashboardHeader
        title="Empleos publicados"
        description="Gestiona tus ofertas de empleo"
        buttonText="Publicar empleo"
        buttonLink="/dashboard/employer/postings/create"
        Icon={Plus}
      />

      <JobKpiEmployer />

      <Card>
        <CardHeader>
          <CardTitle>Mis empleos publicados</CardTitle>
          <CardDescription>
            Gestiona y monitorea el estado de tus ofertas de empleo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Each
              of={jobs}
              render={(job) => <JobCardEmployer job={job} />}
              getKey={(job) => job.id}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
