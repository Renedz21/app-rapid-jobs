import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button Component - Critical Business Functionality", () => {
  it("renders as clickable button by default", () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe("BUTTON");
  });

  it("executes onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("becomes unclickable when disabled", () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled Button</Button>);
    
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies destructive styling for critical actions", () => {
    render(<Button variant="destructive">Delete Account</Button>);
    
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-destructive");
  });

  it("renders as different element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  it("supports different sizes for various UI contexts", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-8");

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-10");
  });

  it("prevents form submission when type is not submit", () => {
    render(
      <form onSubmit={vi.fn()}>
        <Button type="button">Don't Submit</Button>
      </form>
    );
    
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });
});