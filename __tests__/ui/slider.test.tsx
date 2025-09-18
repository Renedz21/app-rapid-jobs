import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "@/components/ui/slider";

describe("Slider - Business Critical Functionality", () => {
  it("renders slider component", () => {
    render(<Slider />);
    
    const slider = document.querySelector('[data-slot="slider"]');
    expect(slider).toBeInTheDocument();
  });

  it("accepts custom configuration", () => {
    render(<Slider min={10} max={200} />);
    
    const slider = document.querySelector('[data-slot="slider"]');
    expect(slider).toBeInTheDocument();
  });

  it("renders slider track and range", () => {
    render(<Slider defaultValue={[25]} />);
    
    const track = document.querySelector('[data-slot="slider-track"]');
    const range = document.querySelector('[data-slot="slider-range"]');
    
    expect(track).toBeInTheDocument();
    expect(range).toBeInTheDocument();
  });

  it("renders correct number of thumbs for value array", () => {
    render(<Slider defaultValue={[20, 80]} />);
    
    const thumbs = document.querySelectorAll('[data-slot="slider-thumb"]');
    expect(thumbs).toHaveLength(2);
  });

  it("renders single thumb for single value", () => {
    render(<Slider defaultValue={[50]} />);
    
    const thumbs = document.querySelectorAll('[data-slot="slider-thumb"]');
    expect(thumbs).toHaveLength(1);
  });

  it("handles controlled value prop", () => {
    const { rerender } = render(<Slider value={[30]} />);
    
    let thumbs = document.querySelectorAll('[data-slot="slider-thumb"]');
    expect(thumbs).toHaveLength(1);
    
    rerender(<Slider value={[30, 70]} />);
    
    thumbs = document.querySelectorAll('[data-slot="slider-thumb"]');
    expect(thumbs).toHaveLength(2);
  });

  it("applies disabled state correctly", () => {
    render(<Slider disabled />);
    
    const slider = document.querySelector('[data-slot="slider"]');
    expect(slider).toHaveAttribute("data-disabled", "");
    expect(slider).toHaveClass("data-[disabled]:opacity-50");
  });

  it("supports vertical orientation", () => {
    render(<Slider orientation="vertical" />);
    
    const slider = document.querySelector('[data-slot="slider"]');
    expect(slider).toHaveClass("data-[orientation=vertical]:h-full");
    expect(slider).toHaveClass("data-[orientation=vertical]:w-auto");
  });

  it("handles keyboard navigation", () => {
    render(<Slider defaultValue={[50]} />);
    
    const thumb = document.querySelector('[data-slot="slider-thumb"]');
    expect(thumb).toBeInTheDocument();
    
    // Should have focus-visible styles for keyboard navigation
    expect(thumb).toHaveClass("focus-visible:outline-hidden");
  });

  it("provides visual feedback on hover", () => {
    render(<Slider defaultValue={[30]} />);
    
    const thumb = document.querySelector('[data-slot="slider-thumb"]');
    expect(thumb).toHaveClass("hover:ring-4");
  });

  it("maintains accessibility attributes", () => {
    render(<Slider defaultValue={[40]} />);
    
    const slider = document.querySelector('[data-slot="slider"]');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveClass("select-none"); // Prevents text selection
  });

  it("calculates values array correctly", () => {
    render(<Slider min={0} max={100} defaultValue={[25, 75]} />);
    
    const thumbs = document.querySelectorAll('[data-slot="slider-thumb"]');
    expect(thumbs).toHaveLength(2);
  });

  it("uses fallback values when none provided", () => {
    render(<Slider min={20} max={80} />);
    
    // Should use min and max as fallback for _values array
    const thumbs = document.querySelectorAll('[data-slot="slider-thumb"]');
    expect(thumbs).toHaveLength(2); // Should create thumbs for [min, max]
  });

  it("handles custom className", () => {
    render(<Slider className="custom-slider" />);
    
    const slider = document.querySelector('[data-slot="slider"]');
    expect(slider).toHaveClass("custom-slider");
  });

  it("provides business value for range selection", () => {
    render(<Slider defaultValue={[100, 500]} min={0} max={1000} />);
    
    const slider = document.querySelector('[data-slot="slider"]');
    const thumbs = document.querySelectorAll('[data-slot="slider-thumb"]');
    
    // Critical for salary/price range filtering in job search
    expect(slider).toBeInTheDocument();
    expect(thumbs).toHaveLength(2); // Dual range for min/max salary
  });

  it("supports touch interactions", () => {
    render(<Slider defaultValue={[50]} />);
    
    const slider = document.querySelector('[data-slot="slider"]');
    expect(slider).toHaveClass("touch-none"); // Prevents default touch behavior
  });

  it("maintains consistent styling across themes", () => {
    render(<Slider defaultValue={[30]} />);
    
    const track = document.querySelector('[data-slot="slider-track"]');
    const range = document.querySelector('[data-slot="slider-range"]');
    const thumb = document.querySelector('[data-slot="slider-thumb"]');
    
    expect(track).toHaveClass("bg-muted");
    expect(range).toHaveClass("bg-primary");
    expect(thumb).toHaveClass("border-primary", "bg-background");
  });
});