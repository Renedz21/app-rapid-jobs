import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import JobCardWorker from "@/components/jobs/job-card-worker";
import { JobWithProfile } from "@/types/supabase";

const mockJobWithProfile: JobWithProfile = {
  id: "1",
  title: "Desarrollador Frontend",
  description: "Buscamos un desarrollador con experiencia en React para proyecto urgente.",
  location: "Madrid, España",
  payment: 1500,
  job_type: "full-time",
  category: "tech",
  status: "open",
  urgency: "high",
  needed_date: "2024-12-15",
  employer_id: "employer-1",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  profiles: {
    full_name: "María García"
  }
};

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("JobCardWorker - Business Critical Functionality", () => {
  it("renders job title and employer information", () => {
    render(<JobCardWorker job={mockJobWithProfile} />);
    
    expect(screen.getByText("Desarrollador Frontend")).toBeInTheDocument();
    expect(screen.getByText("Solicitado por María García")).toBeInTheDocument();
  });

  it("displays urgent badge for high priority jobs", () => {
    render(<JobCardWorker job={mockJobWithProfile} />);
    
    const urgentBadge = screen.getByText("Urgente");
    expect(urgentBadge).toBeInTheDocument();
    expect(urgentBadge.className).toContain("destructive");
  });

  it("does not show urgent badge for non-urgent jobs", () => {
    const normalJob = { ...mockJobWithProfile, urgency: null };
    render(<JobCardWorker job={normalJob} />);
    
    expect(screen.queryByText("Urgente")).not.toBeInTheDocument();
  });

  it("shows job category as secondary badge", () => {
    render(<JobCardWorker job={mockJobWithProfile} />);
    
    const categoryBadge = screen.getByText("tech");
    expect(categoryBadge).toBeInTheDocument();
    expect(categoryBadge.className).toContain("secondary");
  });

  it("displays job location and type information", () => {
    render(<JobCardWorker job={mockJobWithProfile} />);
    
    expect(screen.getByText("Madrid, España")).toBeInTheDocument();
    expect(screen.getByText("full-time")).toBeInTheDocument();
  });

  it("shows needed date when provided", () => {
    render(<JobCardWorker job={mockJobWithProfile} />);
    
    expect(screen.getByText("2024-12-15")).toBeInTheDocument();
  });

  it("hides needed date when not provided", () => {
    const jobWithoutDate = { ...mockJobWithProfile, needed_date: null };
    render(<JobCardWorker job={jobWithoutDate} />);
    
    expect(screen.queryByText("2024-12-15")).not.toBeInTheDocument();
  });

  it("provides worker action buttons for job application", () => {
    render(<JobCardWorker job={mockJobWithProfile} />);
    
    const applyButton = screen.getByRole("button", { name: "Aplicar ahora" });
    const aiApplyButton = screen.getByRole("button", { name: "Aplicar con IA" });
    const saveButton = screen.getByRole("button", { name: "Guardar" });
    
    expect(applyButton).toBeInTheDocument();
    expect(aiApplyButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  it("renders as clickable link to job details", () => {
    render(<JobCardWorker job={mockJobWithProfile} />);
    
    const jobLink = screen.getByRole("link");
    expect(jobLink).toHaveAttribute("href", "/dashboard/worker/jobs/1");
  });

  it("shows job description truncated for card view", () => {
    render(<JobCardWorker job={mockJobWithProfile} />);
    
    expect(screen.getByText("Buscamos un desarrollador con experiencia en React para proyecto urgente.")).toBeInTheDocument();
  });

  it("displays hover effects for better UX", () => {
    render(<JobCardWorker job={mockJobWithProfile} />);
    
    const card = document.querySelector('.cursor-pointer');
    expect(card).toHaveClass("hover:shadow-md", "transition-shadow", "cursor-pointer");
  });

  it("shows AI application feature prominently", () => {
    render(<JobCardWorker job={mockJobWithProfile} />);
    
    const aiButton = screen.getByRole("button", { name: "Aplicar con IA" });
    expect(aiButton).toHaveClass("text-primary", "border-primary");
    
    const sparklesIcon = document.querySelector('.lucide-sparkles');
    expect(sparklesIcon).toBeInTheDocument();
  });

  it("handles jobs without profile information gracefully", () => {
    const jobWithoutProfile = { ...mockJobWithProfile, profiles: null };
    render(<JobCardWorker job={jobWithoutProfile} />);
    
    expect(screen.getByText("Desarrollador Frontend")).toBeInTheDocument();
    // Profile name should not appear when profiles is null
    expect(screen.queryByText("María García")).not.toBeInTheDocument();
  });
});