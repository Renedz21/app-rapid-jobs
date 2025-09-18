import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { vi } from "vitest";
import DeleteJobButton from "@/components/jobs/actions/delete-job-button";
import { createClient } from "@/utils/supabase/client";

vi.mock("next/navigation");
vi.mock("sonner");
vi.mock("@/utils/supabase/client");

const mockRouter = {
  refresh: vi.fn(),
};

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
};

const mockUseRouter = vi.mocked(useRouter);
const mockToast = vi.mocked(toast);
const mockCreateClient = vi.mocked(createClient);

describe("DeleteJobButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter as any);
    mockCreateClient.mockReturnValue(mockSupabase as any);
    mockToast.success = vi.fn();
    mockToast.error = vi.fn();
  });

  it("renders delete button correctly", () => {
    render(<DeleteJobButton jobId="test-job-id" />);

    const deleteButton = screen.getByRole("button", { name: /eliminar/i });
    expect(deleteButton).toBeInTheDocument();
    expect(screen.getByText("Eliminar")).toBeInTheDocument();
  });

  it("opens confirmation dialog when button is clicked", async () => {
    render(<DeleteJobButton jobId="test-job-id" />);

    const deleteButton = screen.getByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.getByText("¿Estás seguro de querer eliminar este empleo?"),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/esta acción no se puede deshacer/i),
      ).toBeInTheDocument();
    });
  });

  it("successfully deletes job and shows success message", async () => {
    mockSupabase.eq.mockResolvedValue({ error: null });

    render(<DeleteJobButton jobId="test-job-id" />);

    const deleteButton = screen.getByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.getByText("¿Estás seguro de querer eliminar este empleo?"),
      ).toBeInTheDocument();
    });

    const confirmButton = screen.getByRole("button", { name: "Eliminar" });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockSupabase.from).toHaveBeenCalledWith("jobs");
      expect(mockSupabase.delete).toHaveBeenCalled();
      expect(mockSupabase.eq).toHaveBeenCalledWith("id", "test-job-id");
      expect(mockToast.success).toHaveBeenCalledWith(
        "Empleo eliminado correctamente",
      );
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });

  it("handles delete error and shows error message", async () => {
    const error = new Error("Database error");
    mockSupabase.eq.mockResolvedValue({ error });

    render(<DeleteJobButton jobId="test-job-id" />);

    const deleteButton = screen.getByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.getByText("¿Estás seguro de querer eliminar este empleo?"),
      ).toBeInTheDocument();
    });

    const confirmButton = screen.getByRole("button", { name: "Eliminar" });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith(
        "Error al eliminar el empleo",
      );
    });
  });

  it("shows loading state during deletion", async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    mockSupabase.eq.mockReturnValue(promise);

    render(<DeleteJobButton jobId="test-job-id" />);

    const deleteButton = screen.getByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.getByText("¿Estás seguro de querer eliminar este empleo?"),
      ).toBeInTheDocument();
    });

    const confirmButton = screen.getByRole("button", { name: "Eliminar" });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled();
    });

    resolvePromise?.({ error: null });

    await waitFor(() => {
      expect(mockToast.success).toHaveBeenCalledWith(
        "Empleo eliminado correctamente",
      );
    });
  });

  it("can cancel deletion", async () => {
    render(<DeleteJobButton jobId="test-job-id" />);

    const deleteButton = screen.getByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.getByText("¿Estás seguro de querer eliminar este empleo?"),
      ).toBeInTheDocument();
    });

    const cancelButton = screen.getByRole("button", { name: "Cancelar" });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(
        screen.queryByText("¿Estás seguro de querer eliminar este empleo?"),
      ).not.toBeInTheDocument();
    });

    expect(mockSupabase.delete).not.toHaveBeenCalled();
  });
});
