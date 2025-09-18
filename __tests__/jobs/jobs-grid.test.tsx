import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { JobsGrid } from "@/components/jobs/jobs-grid";
import { JobWithProfile } from "@/types/supabase";

const mockJobs: JobWithProfile[] = [
  {
    id: "1",
    title: "Desarrollador React",
    description: "Necesitamos un desarrollador React experimentado",
    location: "Madrid",
    payment: 2000,
    job_type: "full-time",
    category: "tech",
    status: "open",
    urgency: "high",
    needed_date: "2024-12-15",
    employer_id: "employer-1",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    profiles: { full_name: "Empresa Tech" }
  },
  {
    id: "2",
    title: "Diseñador UX/UI",
    description: "Buscamos diseñador creativo",
    location: "Barcelona",
    payment: 1800,
    job_type: "part-time",
    category: "design",
    status: "open",
    urgency: null,
    needed_date: "2024-12-20",
    employer_id: "employer-2",
    created_at: "2024-01-02T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
    profiles: { full_name: "Estudio Creativo" }
  }
];

vi.mock("@/components/jobs/job-card-worker", () => ({
  default: ({ job }: { job: JobWithProfile }) => (
    <div data-testid={`job-card-${job.id}`}>{job.title}</div>
  ),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("JobsGrid - Business Critical Functionality", () => {
  it("displays AI-powered section prominently", () => {
    render(<JobsGrid jobs={mockJobs} />);
    
    expect(screen.getByText("Potenciado por IA")).toBeInTheDocument();
    expect(screen.getByText("La IA puede ayudarte a encontrar y aplicar más rápido a los mejores empleos")).toBeInTheDocument();
    
    const sparklesIcon = document.querySelector('.lucide-sparkles');
    expect(sparklesIcon).toBeInTheDocument();
  });

  it("shows correct job count", () => {
    render(<JobsGrid jobs={mockJobs} />);
    
    expect(screen.getByText("Empleos disponibles")).toBeInTheDocument();
    expect(screen.getByText("2 empleos encontrados")).toBeInTheDocument();
  });

  it("renders all provided jobs", () => {
    render(<JobsGrid jobs={mockJobs} />);
    
    expect(screen.getByTestId("job-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("job-card-2")).toBeInTheDocument();
    expect(screen.getByText("Desarrollador React")).toBeInTheDocument();
    expect(screen.getByText("Diseñador UX/UI")).toBeInTheDocument();
  });

  it("handles empty jobs list", () => {
    render(<JobsGrid jobs={[]} />);
    
    expect(screen.getByText("0 empleos encontrados")).toBeInTheDocument();
    expect(screen.queryByTestId("job-card-1")).not.toBeInTheDocument();
  });

  it("provides sorting options for jobs", () => {
    render(<JobsGrid jobs={mockJobs} />);
    
    expect(screen.getByRole("button", { name: "Más recientes" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mejor pagados" })).toBeInTheDocument();
  });

  it("displays sorting buttons with correct styling", () => {
    render(<JobsGrid jobs={mockJobs} />);
    
    const recentButton = screen.getByRole("button", { name: "Más recientes" });
    const paidButton = screen.getByRole("button", { name: "Mejor pagados" });
    
    expect(recentButton).toHaveClass("h-8", "rounded-md");
    expect(paidButton).toHaveClass("h-8", "rounded-md");
  });

  it("renders jobs in grid layout", () => {
    render(<JobsGrid jobs={mockJobs} />);
    
    const jobsContainer = document.querySelector('.grid.gap-4');
    expect(jobsContainer).toBeInTheDocument();
  });

  it("highlights AI feature with proper styling", () => {
    render(<JobsGrid jobs={mockJobs} />);
    
    const aiSection = document.querySelector('.border-primary');
    expect(aiSection).toBeInTheDocument();
    
    const aiIcon = document.querySelector('.bg-primary\\/10');
    expect(aiIcon).toBeInTheDocument();
  });

  it("shows header with job count and sorting options", () => {
    render(<JobsGrid jobs={mockJobs} />);
    
    const header = document.querySelector('.flex.items-center.justify-between');
    expect(header).toBeInTheDocument();
  });

  it("uses Each component for efficient rendering", () => {
    render(<JobsGrid jobs={mockJobs} />);
    
    // Each component should render all jobs
    expect(screen.getAllByTestId(/job-card-/)).toHaveLength(2);
  });

  it("handles single job correctly", () => {
    const singleJob = [mockJobs[0]];
    render(<JobsGrid jobs={singleJob} />);
    
    expect(screen.getByText("1 empleos encontrados")).toBeInTheDocument();
    expect(screen.getByTestId("job-card-1")).toBeInTheDocument();
    expect(screen.queryByTestId("job-card-2")).not.toBeInTheDocument();
  });

  it("provides business value through job discovery features", () => {
    render(<JobsGrid jobs={mockJobs} />);
    
    // AI feature for better job matching
    expect(screen.getByText("Potenciado por IA")).toBeInTheDocument();
    
    // Sorting for user preference
    expect(screen.getByText("Más recientes")).toBeInTheDocument();
    expect(screen.getByText("Mejor pagados")).toBeInTheDocument();
    
    // Clear job count for transparency
    expect(screen.getByText("2 empleos encontrados")).toBeInTheDocument();
  });
});