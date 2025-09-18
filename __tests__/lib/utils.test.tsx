import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility function", () => {
  it("combines multiple class names", () => {
    const result = cn("btn", "btn-primary", "disabled");
    expect(result).toBe("btn btn-primary disabled");
  });

  it("handles conditional classes", () => {
    const isActive = true;
    const isDisabled = false;
    const result = cn("btn", isActive && "active", isDisabled && "disabled");
    expect(result).toBe("btn active");
  });

  it("merges conflicting Tailwind classes correctly", () => {
    const result = cn("p-2", "p-4");
    expect(result).toBe("p-4");
  });

  it("handles empty and falsy values", () => {
    const result = cn("btn", "", null, undefined, false, "primary");
    expect(result).toBe("btn primary");
  });

  it("combines classes without automatic deduplication", () => {
    const result = cn("btn", "btn", "primary", "primary");
    expect(result).toBe("btn btn primary primary");
  });
});
