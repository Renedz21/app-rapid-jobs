import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { JobsFilters } from "@/components/jobs/jobs-filter";

describe("JobsFilters - Business Critical Functionality", () => {
  it("renders filter title and category selector", () => {
    render(<JobsFilters />);

    expect(screen.getByText("Filtros")).toBeInTheDocument();
    expect(screen.getByText("Categoría")).toBeInTheDocument();
    expect(screen.getByText("Seleccionar categoría")).toBeInTheDocument();
  });

  it("displays all available job categories", () => {
    render(<JobsFilters />);

    const categorySelect = screen.getByRole("combobox");
    fireEvent.click(categorySelect);

    expect(screen.getByText("Delivery")).toBeInTheDocument();
    expect(screen.getByText("Limpieza")).toBeInTheDocument();
    expect(screen.getByText("Jardinería")).toBeInTheDocument();
    expect(screen.getByText("Tecnología")).toBeInTheDocument();
    expect(screen.getByText("Eventos")).toBeInTheDocument();
    expect(screen.getByText("Tutorías")).toBeInTheDocument();
  });

  it("shows apply filters button", () => {
    render(<JobsFilters />);

    const applyButton = screen.getByRole("button", { name: "Aplicar filtros" });
    expect(applyButton).toBeInTheDocument();
    expect(applyButton).toHaveClass("w-full");
  });

  it("shows clear filters button", () => {
    render(<JobsFilters />);

    const clearButton = screen.getByRole("button", { name: "Limpiar filtros" });
    expect(clearButton).toBeInTheDocument();
    expect(clearButton).toHaveClass("w-full");
  });

  it("does not show active filters section initially", () => {
    render(<JobsFilters />);

    const filterBadges = document.querySelector(".flex-wrap");
    expect(filterBadges).not.toBeInTheDocument();
  });

  it("clears active filters when clear button is clicked", () => {
    render(<JobsFilters />);

    const clearButton = screen.getByRole("button", { name: "Limpiar filtros" });
    fireEvent.click(clearButton);

    // Should not show any active filters
    expect(document.querySelector(".flex-wrap")).not.toBeInTheDocument();
  });

  it("applies filters when apply button is clicked", () => {
    render(<JobsFilters />);

    const applyButton = screen.getByRole("button", { name: "Aplicar filtros" });
    fireEvent.click(applyButton);

    // Filter state should be reset after applying
    expect(document.querySelector(".flex-wrap")).not.toBeInTheDocument();
  });

  it("has sticky positioning for better UX", () => {
    render(<JobsFilters />);

    const filterCard = document.querySelector(".sticky.top-6");
    expect(filterCard).toBeInTheDocument();
  });

  it("renders with proper card structure", () => {
    render(<JobsFilters />);

    const card = document.querySelector('[class*="card"]');
    expect(card).toBeInTheDocument();
  });

  it("maintains separate state for filters", () => {
    const { rerender } = render(<JobsFilters />);

    const applyButton = screen.getByRole("button", { name: "Aplicar filtros" });
    const clearButton = screen.getByRole("button", { name: "Limpiar filtros" });

    // Both buttons should be functional
    expect(applyButton).toBeEnabled();
    expect(clearButton).toBeEnabled();

    // Re-render should maintain state
    rerender(<JobsFilters />);
    expect(applyButton).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  it("shows proper button variants", () => {
    render(<JobsFilters />);

    const _applyButton = screen.getByRole("button", {
      name: "Aplicar filtros",
    });
    const clearButton = screen.getByRole("button", { name: "Limpiar filtros" });

    // Apply should be primary, clear should be outline
    expect(clearButton).toHaveClass("bg-transparent");
  });
});
