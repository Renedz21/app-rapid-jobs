import { Briefcase } from "lucide-react";
import DashboardHeader from "@/components/dashboard/dashboard-header";

export default function EmployerPostingsPage() {
  return (
    <DashboardHeader
      title="Empleos publicados"
      description="Gestiona tus ofertas de empleo"
      buttonText="Publicar empleo"
      buttonLink="/dashboard/employer/postings/create"
      Icon={Briefcase}
    />
  );
}
