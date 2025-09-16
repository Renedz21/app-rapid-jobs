import { DashboardCards } from "@/components/dashboard/dashboard-cards";
import DashboardChart from "@/components/dashboard/dashboard-chart";

export default function EmployerPage() {
  return (
    <>
      <DashboardCards />
      <div className="px-4 lg:px-6">
        <DashboardChart />
      </div>
    </>
  );
}
