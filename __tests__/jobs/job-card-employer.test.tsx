import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import JobCardEmployer from "@/components/jobs/job-card-employer";
import { Job } from "@/types/supabase";

const mockJob: Job = {
  id: "1",
  title: "Frontend Developer",
  location: "Mexico City",
  payment: "$50/hour",
  status: "open",
  job_type: "full-time",
  description: "Test description",
  employer_id: "user-1",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  category: "tech",
  needed_date: "2024-02-01",
};

describe("JobCardEmployer", () => {
  it("renders job title and status", () => {
    render(<JobCardEmployer job={mockJob} />);
    
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText("Activo")).toBeInTheDocument();
  });

  it("renders job location", () => {
    render(<JobCardEmployer job={mockJob} />);
    
    expect(screen.getByText("Mexico City")).toBeInTheDocument();
  });

  it("renders job payment when provided", () => {
    render(<JobCardEmployer job={mockJob} />);
    
    expect(screen.getByText("$50/hour")).toBeInTheDocument();
  });

  it("renders job type correctly for full-time", () => {
    render(<JobCardEmployer job={mockJob} />);
    
    expect(screen.getByText("Tiempo completo")).toBeInTheDocument();
  });

  it("renders job type correctly for part-time", () => {
    const partTimeJob = { ...mockJob, job_type: "part-time" as const };
    render(<JobCardEmployer job={partTimeJob} />);
    
    expect(screen.getByText("Tiempo parcial")).toBeInTheDocument();
  });

  it("renders job type correctly for contract", () => {
    const contractJob = { ...mockJob, job_type: "contract" as const };
    render(<JobCardEmployer job={contractJob} />);
    
    expect(screen.getByText("Contrato")).toBeInTheDocument();
  });

  it("renders job type correctly for temporary", () => {
    const tempJob = { ...mockJob, job_type: "temporary" as const };
    render(<JobCardEmployer job={tempJob} />);
    
    expect(screen.getByText("Temporal")).toBeInTheDocument();
  });

  it("renders closed status for closed jobs", () => {
    const closedJob = { ...mockJob, status: "closed" as const };
    render(<JobCardEmployer job={closedJob} />);
    
    expect(screen.getByText("Cerrado")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<JobCardEmployer job={mockJob} />);
    
    expect(screen.getByRole("button", { name: "Ver" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Editar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Eliminar" })).toBeInTheDocument();
  });

  it("handles job without payment", () => {
    const jobWithoutPayment = { ...mockJob, payment: null };
    render(<JobCardEmployer job={jobWithoutPayment} />);
    
    expect(screen.queryByText("$50/hour")).not.toBeInTheDocument();
  });

  it("shows different styling for closed jobs", () => {
    const closedJob = { ...mockJob, status: "closed" as const };
    render(<JobCardEmployer job={closedJob} />);
    
    const statusBadge = screen.getByText("Cerrado");
    expect(statusBadge).toBeInTheDocument();
    expect(statusBadge.className).toContain('secondary');
  });

  it("displays all essential job information for employers", () => {
    render(<JobCardEmployer job={mockJob} />);
    
    expect(screen.getByText(mockJob.title)).toBeInTheDocument();
    expect(screen.getByText(mockJob.location)).toBeInTheDocument();
    if (mockJob.payment) {
      expect(screen.getByText(mockJob.payment)).toBeInTheDocument();
    }
  });

  it("provides action buttons for job management", () => {
    render(<JobCardEmployer job={mockJob} />);
    
    const viewButton = screen.getByRole("button", { name: "Ver" });
    const editButton = screen.getByRole("button", { name: "Editar" });
    const deleteButton = screen.getByRole("button", { name: "Eliminar" });
    
    expect(viewButton).toBeEnabled();
    expect(editButton).toBeEnabled();
    expect(deleteButton).toBeEnabled();
    expect(deleteButton).toHaveClass('text-destructive');
  });
});
