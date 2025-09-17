import { fireEvent, render, screen } from "@testing-library/react";
import { User } from "lucide-react";
import { describe, expect, it, vi } from "vitest";
import RoleOptionCard from "@/components/forms/role-option-card";

describe("RoleOptionCard", () => {
  const mockOnSelect = vi.fn();
  const defaultProps = {
    label: "Test Role",
    selected: false,
    onSelect: mockOnSelect,
    icon: <User data-testid="user-icon" />,
  };

  it("renders correctly", () => {
    render(<RoleOptionCard {...defaultProps} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Test Role")).toBeInTheDocument();
    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", () => {
    render(<RoleOptionCard {...defaultProps} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });

  it("applies selected styles when selected", () => {
    render(<RoleOptionCard {...defaultProps} selected={true} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-primary");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("applies unselected styles when not selected", () => {
    render(<RoleOptionCard {...defaultProps} selected={false} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-muted");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("shows check circle when selected", () => {
    render(<RoleOptionCard {...defaultProps} selected={true} />);
    const checkIcon = document.querySelector(".lucide-circle-check");
    expect(checkIcon).toBeInTheDocument();
  });

  it("hides check circle when not selected", () => {
    render(<RoleOptionCard {...defaultProps} selected={false} />);
    expect(screen.queryByLabelText(/check/i)).not.toBeInTheDocument();
  });
});
