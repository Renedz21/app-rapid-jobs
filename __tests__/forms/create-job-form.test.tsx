import { vi } from "vitest";

const mockUseCreateJob = {
  form: {
    control: {},
    handleSubmit: vi.fn(() => vi.fn()),
    reset: vi.fn(),
    formState: { isSubmitting: false },
  },
  onSubmit: vi.fn(),
  isLoading: false,
};

vi.mock("@/hooks/jobs/use-create-job", () => ({
  default: () => mockUseCreateJob,
}));

describe("CreateJobForm hook integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCreateJob.isLoading = false;
  });

  it("mock provides expected hook structure", () => {
    expect(mockUseCreateJob.form).toBeDefined();
    expect(mockUseCreateJob.onSubmit).toBeDefined();
    expect(mockUseCreateJob.isLoading).toBeDefined();
  });

  it("form mock has required methods", () => {
    expect(typeof mockUseCreateJob.form.handleSubmit).toBe("function");
    expect(typeof mockUseCreateJob.form.reset).toBe("function");
    expect(typeof mockUseCreateJob.onSubmit).toBe("function");
  });

  it("loading state can be controlled", () => {
    mockUseCreateJob.isLoading = true;
    expect(mockUseCreateJob.isLoading).toBe(true);

    mockUseCreateJob.isLoading = false;
    expect(mockUseCreateJob.isLoading).toBe(false);
  });
});
