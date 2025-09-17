import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DashboardCards } from "@/components/dashboard/dashboard-cards";

describe("DashboardCards", () => {
  it("renders all cards correctly", () => {
    render(<DashboardCards />);

    expect(screen.getByText("Total Revenue")).toBeInTheDocument();
    expect(screen.getByText("New Customers")).toBeInTheDocument();
    expect(screen.getByText("Active Accounts")).toBeInTheDocument();
    expect(screen.getByText("Growth Rate")).toBeInTheDocument();
  });

  it("displays correct values for each metric", () => {
    render(<DashboardCards />);

    expect(screen.getByText("$1,250.00")).toBeInTheDocument();
    expect(screen.getByText("1,234")).toBeInTheDocument();
    expect(screen.getByText("45,678")).toBeInTheDocument();
    expect(screen.getByText("4.5%")).toBeInTheDocument();
  });

  it("shows trending indicators", () => {
    render(<DashboardCards />);

    expect(screen.getAllByText("+12.5%")).toHaveLength(2);
    expect(screen.getByText("-20%")).toBeInTheDocument();
    expect(screen.getByText("+4.5%")).toBeInTheDocument();
  });

  it("displays footer descriptions", () => {
    render(<DashboardCards />);

    expect(screen.getByText("Trending up this month")).toBeInTheDocument();
    expect(screen.getByText("Down 20% this period")).toBeInTheDocument();
    expect(screen.getByText("Strong user retention")).toBeInTheDocument();
    expect(screen.getByText("Steady performance increase")).toBeInTheDocument();
  });

  it("shows additional context information", () => {
    render(<DashboardCards />);

    expect(
      screen.getByText("Visitors for the last 6 months"),
    ).toBeInTheDocument();
    expect(screen.getByText("Acquisition needs attention")).toBeInTheDocument();
    expect(screen.getByText("Engagement exceed targets")).toBeInTheDocument();
    expect(screen.getByText("Meets growth projections")).toBeInTheDocument();
  });
});
