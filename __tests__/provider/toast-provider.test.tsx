import { render } from "@testing-library/react";
import { vi } from "vitest";
import ToastProvider from "@/components/provider/toast-provider";

vi.mock("sonner", () => ({
  Toaster: ({ richColors, position, closeButton }: any) => (
    <div
      data-testid="toaster"
      data-rich-colors={richColors}
      data-position={position}
      data-close-button={closeButton}
    >
      Toaster Component
    </div>
  ),
}));

describe("ToastProvider", () => {
  it("renders Toaster with correct props", () => {
    const { getByTestId } = render(<ToastProvider />);

    const toaster = getByTestId("toaster");
    expect(toaster).toBeInTheDocument();
    expect(toaster).toHaveAttribute("data-rich-colors", "true");
    expect(toaster).toHaveAttribute("data-position", "top-right");
    expect(toaster).toHaveAttribute("data-close-button", "true");
  });
});
