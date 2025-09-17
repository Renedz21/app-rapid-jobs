import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Navbar from "@/components/shared/navbar";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<Navbar />);

    expect(screen.getByText("RapidJobs")).toBeInTheDocument();
    expect(screen.getByText("Empleos")).toBeInTheDocument();
    expect(screen.getByText("Cómo Funciona")).toBeInTheDocument();
    expect(screen.getByText("Para Empresas")).toBeInTheDocument();
  });

  it("displays logo with briefcase icon", () => {
    render(<Navbar />);

    const logo = screen.getByText("RapidJobs");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass("text-xl", "font-bold");
  });

  it("shows navigation links with correct hrefs", () => {
    render(<Navbar />);

    const empleosLink = screen.getByText("Empleos");
    const comoFuncionaLink = screen.getByText("Cómo Funciona");
    const empresasLink = screen.getByText("Para Empresas");

    expect(empleosLink).toHaveAttribute("href", "#empleos");
    expect(comoFuncionaLink).toHaveAttribute("href", "#como-funciona");
    expect(empresasLink).toHaveAttribute("href", "#empresas");
  });

  it("navigates to login when login button is clicked", () => {
    render(<Navbar />);

    const loginButton = screen.getByText("Iniciar Sesión");
    fireEvent.click(loginButton);

    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("navigates to register when register button is clicked", () => {
    render(<Navbar />);

    const registerButton = screen.getByText("Registrarse");
    fireEvent.click(registerButton);

    expect(mockPush).toHaveBeenCalledWith("/register");
  });

  it("applies correct button variants", () => {
    render(<Navbar />);

    const loginButton = screen.getByText("Iniciar Sesión");
    const registerButton = screen.getByText("Registrarse");

    expect(loginButton).toHaveClass("hover:bg-accent");
    expect(registerButton).toHaveClass("bg-primary");
  });
});
