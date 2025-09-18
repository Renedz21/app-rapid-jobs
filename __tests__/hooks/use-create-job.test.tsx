import { act, renderHook, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { vi } from "vitest";
import useCreateJob from "@/hooks/jobs/use-create-job";
import { createClient } from "@/utils/supabase/client";

vi.mock("next/navigation");
vi.mock("sonner");
vi.mock("@/utils/supabase/client");

const mockRouter = {
  push: vi.fn(),
};

const mockAuth = {
  getUser: vi.fn(),
};

const mockSupabase = {
  from: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  auth: mockAuth,
};

const mockUseRouter = vi.mocked(useRouter);
const mockToast = vi.mocked(toast);
const mockCreateClient = vi.mocked(createClient);

describe("useCreateJob", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseRouter.mockReturnValue(mockRouter as any);
    mockCreateClient.mockReturnValue(mockSupabase as any);
    mockToast.success = vi.fn();
    mockToast.error = vi.fn();
  });

  it("initializes form with correct default values", () => {
    const { result } = renderHook(() => useCreateJob());

    expect(result.current.form.getValues()).toEqual({
      title: "",
      description: "",
      location: "",
      job_type: "temporary",
      category: "",
      status: "open",
      employer_id: "",
      needed_date: expect.any(Date),
      urgency: "low",
    });
  });

  it("formats date string correctly", () => {
    const { result } = renderHook(() => useCreateJob());
    const _testDate = new Date(2024, 0, 15);

    const formattedDate = result.current.form.getValues().needed_date;
    expect(formattedDate).toBeInstanceOf(Date);
  });

  it("submits form successfully with authenticated user", async () => {
    const mockUser = { id: "user-123" };
    mockAuth.getUser.mockResolvedValue({ data: { user: mockUser } });
    mockSupabase.insert.mockResolvedValue({ error: null });

    const { result } = renderHook(() => useCreateJob());

    const formData = {
      title: "Test Job",
      description: "Test description",
      location: "Test Location",
      job_type: "temporary" as const,
      category: "hospitality",
      status: "open" as const,
      employer_id: "",
      needed_date: new Date(2024, 0, 15),
      urgency: "medium" as const,
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    await waitFor(() => {
      expect(mockSupabase.from).toHaveBeenCalledWith("jobs");
      expect(mockSupabase.insert).toHaveBeenCalledWith({
        ...formData,
        employer_id: "user-123",
        needed_date: "2024-01-15",
      });
      expect(mockToast.success).toHaveBeenCalledWith(
        "Empleo creado correctamente",
      );
      expect(mockRouter.push).toHaveBeenCalledWith(
        "/dashboard/employer/postings",
      );
    });
  });

  it("handles submission error", async () => {
    const mockUser = { id: "user-123" };
    const error = new Error("Database error");
    mockAuth.getUser.mockResolvedValue({ data: { user: mockUser } });
    mockSupabase.insert.mockResolvedValue({ error });

    const { result } = renderHook(() => useCreateJob());

    const formData = {
      title: "Test Job",
      description: "Test description",
      location: "Test Location",
      job_type: "temporary" as const,
      category: "hospitality",
      status: "open" as const,
      employer_id: "",
      needed_date: new Date(2024, 0, 15),
      urgency: "medium" as const,
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith("Error al crear el empleo");
    });
  });

  it("handles submission without authenticated user", async () => {
    mockAuth.getUser.mockResolvedValue({ data: { user: null } });
    mockSupabase.insert.mockResolvedValue({ error: null });

    const { result } = renderHook(() => useCreateJob());

    const formData = {
      title: "Test Job",
      description: "Test description",
      location: "Test Location",
      job_type: "temporary" as const,
      category: "hospitality",
      status: "open" as const,
      employer_id: "",
      needed_date: new Date(2024, 0, 15),
      urgency: "medium" as const,
    };

    await act(async () => {
      await result.current.onSubmit(formData);
    });

    await waitFor(() => {
      expect(mockSupabase.insert).toHaveBeenCalledWith({
        ...formData,
        employer_id: "",
        needed_date: "2024-01-15",
      });
    });
  });

  it("formats date correctly with getDateString helper", async () => {
    const { result } = renderHook(() => useCreateJob());

    const testDate = new Date(2024, 0, 15);
    const expectedDateString = "2024-01-15";

    const formData = {
      title: "Test Job",
      description: "Test description",
      location: "Test Location",
      job_type: "temporary" as const,
      category: "hospitality",
      status: "open" as const,
      employer_id: "",
      needed_date: testDate,
      urgency: "medium" as const,
    };

    mockAuth.getUser.mockResolvedValue({ data: { user: { id: "user-123" } } });
    mockSupabase.insert.mockImplementation((data) => {
      expect(data.needed_date).toBe(expectedDateString);
      return Promise.resolve({ error: null });
    });

    await act(async () => {
      await result.current.onSubmit(formData);
    });
  });

  it("returns correct loading state", () => {
    const { result } = renderHook(() => useCreateJob());

    expect(result.current.isLoading).toBe(false);
    expect(typeof result.current.isLoading).toBe("boolean");
  });
});
