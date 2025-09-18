import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import JobKpiEmployer from "@/components/jobs/job-kpi-employer";

describe("JobKpiEmployer", () => {
  it("renders all KPI cards", () => {
    render(<JobKpiEmployer />);
    
    expect(screen.getByText("Empleos activos")).toBeInTheDocument();
    expect(screen.getByText("Total aplicaciones")).toBeInTheDocument();
    expect(screen.getByText("Visualizaciones")).toBeInTheDocument();
    expect(screen.getByText("Tasa de respuesta")).toBeInTheDocument();
  });

  it("renders KPI values", () => {
    render(<JobKpiEmployer />);
    
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("35")).toBeInTheDocument();
    expect(screen.getByText("144")).toBeInTheDocument();
    expect(screen.getByText("24%")).toBeInTheDocument();
  });

  it("renders change indicators", () => {
    render(<JobKpiEmployer />);
    
    expect(screen.getByText("+1 desde el mes pasado")).toBeInTheDocument();
    expect(screen.getByText("+12% desde la semana pasada")).toBeInTheDocument();
    expect(screen.getByText("+8% desde ayer")).toBeInTheDocument();
    expect(screen.getByText("+2% desde el mes pasado")).toBeInTheDocument();
  });

  it("renders all icons", () => {
    render(<JobKpiEmployer />);
    
    const briefcaseIcon = document.querySelector('.lucide-briefcase');
    const usersIcon = document.querySelector('.lucide-users');
    const eyeIcon = document.querySelector('.lucide-eye');
    const dollarSignIcon = document.querySelector('.lucide-dollar-sign');

    expect(briefcaseIcon).toBeInTheDocument();
    expect(usersIcon).toBeInTheDocument();
    expect(eyeIcon).toBeInTheDocument();
    expect(dollarSignIcon).toBeInTheDocument();
  });

  it("has correct grid layout", () => {
    render(<JobKpiEmployer />);
    
    const gridContainer = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4');
    expect(gridContainer).toBeInTheDocument();
  });
});