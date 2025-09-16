"use client"

import { Briefcase, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">RapidJobs</span>
            </div>
  
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#empleos" className="text-muted-foreground hover:text-foreground transition-colors">
                Empleos
              </a>
              <a href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">
                Cómo Funciona
              </a>
              <a href="#empresas" className="text-muted-foreground hover:text-foreground transition-colors">
                Para Empresas
              </a>
            </div>
  
            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
                Iniciar Sesión
              </Button>
              <Button size="sm" onClick={() => router.push("/register")}>Registrarse</Button>
            </div>
  
          </div>
        </div>
      </nav>
    )
}