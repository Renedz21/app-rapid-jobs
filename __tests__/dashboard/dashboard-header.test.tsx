import { render, screen } from "@testing-library/react";
import { Plus } from "lucide-react";
import { describe, expect, it } from "vitest";
import DashboardHeader from "@/components/dashboard/dashboard-header";

describe("DashboardHeader", () => {
  const defaultProps = {
    title: "Dashboard",
    description: "Welcome to your dashboard",
    buttonText: "Create Job",
    buttonLink: "/create-job",
    Icon: Plus,
  };

  it("renders title and description", () => {
    render(<DashboardHeader {...defaultProps} />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Welcome to your dashboard")).toBeInTheDocument();
  });

  it("renders button with correct text", () => {
    render(<DashboardHeader {...defaultProps} />);

    expect(
      screen.getByRole("button", { name: "Create Job" }),
    ).toBeInTheDocument();
  });

  it("renders button with correct link", () => {
    render(<DashboardHeader {...defaultProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/create-job");
  });

  it("renders icon in button", () => {
    render(<DashboardHeader {...defaultProps} />);

    const icon = document.querySelector(".lucide-plus");
    expect(icon).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    render(<DashboardHeader {...defaultProps} />);

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveClass("text-3xl", "font-bold", "text-foreground");

    const description = screen.getByText("Welcome to your dashboard");
    expect(description).toHaveClass("text-muted-foreground", "mt-2");
  });

  it("handles different icons", () => {
    const { rerender } = render(<DashboardHeader {...defaultProps} />);

    expect(document.querySelector(".lucide-plus")).toBeInTheDocument();

    rerender(<DashboardHeader {...defaultProps} Icon={Plus} />);
    expect(document.querySelector(".lucide-plus")).toBeInTheDocument();
  });
});
