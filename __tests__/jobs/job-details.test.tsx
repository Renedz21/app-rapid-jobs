import { render, screen } from "@testing-library/react";
import type React from "react";
import { describe, expect, it, vi } from "vitest";
import { JobDetail } from "@/components/jobs/job-details";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("JobDetail - Business Critical Functionality", () => {
  const jobId = "123";

  it("renders job title and company information", () => {
    render(<JobDetail jobId={jobId} />);

    expect(
      screen.getByText("Asistente de Eventos Corporativos"),
    ).toBeInTheDocument();
    expect(screen.getAllByText("EventPro Solutions")).toHaveLength(2); // Header and sidebar
  });

  it("displays back navigation button", () => {
    render(<JobDetail jobId={jobId} />);

    const backButton = screen.getByRole("link", {
      name: "Volver al dashboard",
    });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/dashboard");
  });

  it("shows job priority and category badges", () => {
    render(<JobDetail jobId={jobId} />);

    expect(screen.getByText("Alta prioridad")).toBeInTheDocument();
    expect(screen.getByText("Eventos")).toBeInTheDocument();
  });

  it("displays all essential job information", () => {
    render(<JobDetail jobId={jobId} />);

    expect(screen.getByText("€25-30/hora")).toBeInTheDocument();
    expect(screen.getByText("Madrid, España")).toBeInTheDocument();
    expect(screen.getByText("15 Dic 2024")).toBeInTheDocument();
    expect(screen.getByText("1 día")).toBeInTheDocument();
  });

  it("shows primary and secondary action buttons", () => {
    render(<JobDetail jobId={jobId} />);

    const applyButtons = screen.getAllByText(/Aplicar/);
    const saveButtons = screen.getAllByText(/Guardar/);

    expect(applyButtons.length).toBeGreaterThan(0);
    expect(saveButtons.length).toBeGreaterThan(0);
  });

  it("displays job requirements list", () => {
    render(<JobDetail jobId={jobId} />);

    expect(screen.getByText("Requisitos")).toBeInTheDocument();
    expect(
      screen.getByText("Experiencia mínima de 2 años en eventos corporativos"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Excelentes habilidades de comunicación"),
    ).toBeInTheDocument();
    expect(screen.getByText("Vestimenta formal requerida")).toBeInTheDocument();
  });

  it("shows job responsibilities", () => {
    render(<JobDetail jobId={jobId} />);

    expect(screen.getByText("Responsabilidades")).toBeInTheDocument();
    expect(
      screen.getByText("Recepción y registro de asistentes"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Coordinación con proveedores durante el evento"),
    ).toBeInTheDocument();
    expect(screen.getByText("Atención a invitados VIP")).toBeInTheDocument();
  });

  it("displays job benefits", () => {
    render(<JobDetail jobId={jobId} />);

    expect(screen.getByText("Beneficios")).toBeInTheDocument();
    expect(screen.getByText("Pago inmediato al finalizar")).toBeInTheDocument();
    expect(screen.getByText("Oportunidad de networking")).toBeInTheDocument();
    expect(
      screen.getByText("Posibilidad de trabajos futuros"),
    ).toBeInTheDocument();
  });

  it("shows company information section", () => {
    render(<JobDetail jobId={jobId} />);

    expect(screen.getByText("Sobre la empresa")).toBeInTheDocument();
    expect(screen.getAllByText("EventPro Solutions")).toHaveLength(2);
    expect(screen.getByText("Eventos corporativos")).toBeInTheDocument();
    expect(screen.getByText("50-200 empleados")).toBeInTheDocument();
  });

  it("renders apply buttons with correct links", () => {
    render(<JobDetail jobId={jobId} />);

    const applyLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.includes("/apply"));

    applyLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", `/dashboard/jobs/${jobId}/apply`);
    });
  });

  it("displays job description with proper formatting", () => {
    render(<JobDetail jobId={jobId} />);

    expect(screen.getByText("Descripción del empleo")).toBeInTheDocument();
    expect(
      screen.getByText(/Buscamos un asistente experimentado/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/El evento se realizará en el centro de Madrid/),
    ).toBeInTheDocument();
  });

  it("shows information cards with icons", () => {
    render(<JobDetail jobId={jobId} />);

    const salaryIcon = document.querySelector(".lucide-dollar-sign");
    const locationIcon = document.querySelector(".lucide-map-pin");
    const calendarIcon = document.querySelector(".lucide-calendar");
    const clockIcon = document.querySelector(".lucide-clock");

    expect(salaryIcon).toBeInTheDocument();
    expect(locationIcon).toBeInTheDocument();
    expect(calendarIcon).toBeInTheDocument();
    expect(clockIcon).toBeInTheDocument();
  });

  it("uses proper responsive layout", () => {
    render(<JobDetail jobId={jobId} />);

    const mainContent = document.querySelector(".lg\\:col-span-2");
    const sidebar = document.querySelector(".space-y-6");

    expect(mainContent).toBeInTheDocument();
    expect(sidebar).toBeInTheDocument();
  });

  it("provides essential business information for job application decision", () => {
    render(<JobDetail jobId={jobId} />);

    // Critical business info for workers
    expect(screen.getByText("€25-30/hora")).toBeInTheDocument(); // Payment
    expect(screen.getByText("Alta prioridad")).toBeInTheDocument(); // Urgency
    expect(screen.getByText("Madrid, España")).toBeInTheDocument(); // Location
    expect(screen.getByText("15 Dic 2024")).toBeInTheDocument(); // Date
    expect(screen.getByText("1 día")).toBeInTheDocument(); // Duration

    // Requirements for qualification check
    expect(screen.getByText("Requisitos")).toBeInTheDocument();

    // Benefits for motivation
    expect(screen.getByText("Pago inmediato al finalizar")).toBeInTheDocument();
  });

  it("maintains consistent action buttons throughout the component", () => {
    render(<JobDetail jobId={jobId} />);

    const applyButtons = screen
      .getAllByRole("button")
      .filter((button) => button.textContent?.includes("Aplicar"));
    const saveButtons = screen
      .getAllByRole("button")
      .filter((button) => button.textContent?.includes("Guardar"));

    expect(applyButtons.length).toBeGreaterThan(0);
    expect(saveButtons.length).toBeGreaterThan(0);
  });
});
