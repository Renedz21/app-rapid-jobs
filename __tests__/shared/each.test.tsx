import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Each from "@/components/shared/each";

describe("Each", () => {
  const mockItems = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];

  it("renders items using render function", () => {
    render(
      <Each
        of={mockItems}
        render={(item) => <div>{item.name}</div>}
        getKey={(item) => item.id}
      />,
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("passes index to render function", () => {
    const mockRender = vi.fn((item, index) => (
      <div>{`${item.name} - ${index}`}</div>
    ));

    render(
      <Each of={mockItems} render={mockRender} getKey={(item) => item.id} />,
    );

    expect(mockRender).toHaveBeenCalledWith(mockItems[0], 0);
    expect(mockRender).toHaveBeenCalledWith(mockItems[1], 1);
    expect(mockRender).toHaveBeenCalledWith(mockItems[2], 2);
  });

  it("uses getKey function for keys", () => {
    const mockGetKey = vi.fn((item, index) => `${item.id}-${index}`);

    render(
      <Each
        of={mockItems}
        render={(item) => <div>{item.name}</div>}
        getKey={mockGetKey}
      />,
    );

    expect(mockGetKey).toHaveBeenCalledWith(mockItems[0], 0);
    expect(mockGetKey).toHaveBeenCalledWith(mockItems[1], 1);
    expect(mockGetKey).toHaveBeenCalledWith(mockItems[2], 2);
  });

  it("handles empty array", () => {
    const { container } = render(
      <Each
        of={[]}
        render={(item: { name: string }) => <div>{item.name}</div>}
        getKey={(item: { id: number }) => item.id}
      />,
    );

    expect(container.innerHTML).toBe("");
  });

  it("returns null for non-array input and logs error", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { container } = render(
      <Each
        of={"not an array" as unknown as []}
        render={(item: string) => <div>{item}</div>}
        getKey={(item: string) => item}
      />,
    );

    expect(container.firstChild).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith("The `of` prop must be an array.");

    consoleSpy.mockRestore();
  });

  it("renders complex components", () => {
    const complexItems = [
      { id: 1, title: "Title 1", description: "Description 1" },
      { id: 2, title: "Title 2", description: "Description 2" },
    ];

    render(
      <Each
        of={complexItems}
        render={(item) => (
          <article>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </article>
        )}
        getKey={(item) => item.id}
      />,
    );

    expect(screen.getByText("Title 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Title 2")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
  });
});
