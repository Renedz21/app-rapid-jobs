"use client";

import {
  ArrowLeft,
  Bookmark,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface JobDetailProps {
  jobId: string;
}

// Mock data - in real app this would come from API
const jobData = {
  id: "1",
  title: "Asistente de Eventos Corporativos",
  company: "EventPro Solutions",
  location: "Madrid, España",
  salary: "€25-30/hora",
  duration: "1 día",
  date: "15 Dic 2024",
  category: "Eventos",
  urgency: "Alta",
  description: `Buscamos un asistente experimentado para apoyar en la organización y ejecución de un evento corporativo de alto nivel. El candidato ideal tendrá experiencia previa en eventos empresariales y excelentes habilidades de comunicación.

El evento se realizará en el centro de Madrid y requerirá atención al detalle, capacidad para trabajar bajo presión y mantener un alto nivel de profesionalismo durante toda la jornada.`,
  requirements: [
    "Experiencia mínima de 2 años en eventos corporativos",
    "Excelentes habilidades de comunicación",
    "Disponibilidad completa el día del evento",
    "Vestimenta formal requerida",
    "Conocimiento de protocolos empresariales",
  ],
  responsibilities: [
    "Recepción y registro de asistentes",
    "Coordinación con proveedores durante el evento",
    "Apoyo en la logística general",
    "Atención a invitados VIP",
    "Resolución de incidencias menores",
  ],
  benefits: [
    "Pago inmediato al finalizar",
    "Oportunidad de networking",
    "Experiencia en eventos de alto nivel",
    "Posibilidad de trabajos futuros",
  ],
};

export function JobDetail({ jobId }: JobDetailProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver al dashboard
          </Button>
        </Link>
      </div>

      {/* Job header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-700 border-orange-200"
                >
                  {jobData.urgency} prioridad
                </Badge>
                <Badge variant="outline">{jobData.category}</Badge>
              </div>

              <h1 className="text-2xl font-bold text-foreground leading-tight">
                {jobData.title}
              </h1>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span className="font-medium">{jobData.company}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 bg-transparent"
              >
                <Bookmark className="w-4 h-4" />
                Guardar
              </Button>
              <Link href={`/dashboard/jobs/${jobId}/apply`}>
                <Button
                  size="lg"
                  className="gap-2 bg-primary hover:bg-primary/90"
                >
                  <CheckCircle className="w-4 h-4" />
                  Aplicar ahora
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Pago</p>
                <p className="font-semibold">{jobData.salary}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Ubicación</p>
                <p className="font-semibold">{jobData.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Fecha</p>
                <p className="font-semibold">{jobData.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Duración</p>
                <p className="font-semibold">{jobData.duration}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job details */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Descripción del empleo</h2>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
                {jobData.description.split("\n\n").map((paragraph, index) => (
                  <p
                    key={`paragraph-${index}-${paragraph.slice(0, 20)}`}
                    className="mb-4 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Requisitos</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {jobData.requirements.map((requirement, index) => (
                  <li
                    key={`requirement-${index}-${requirement.slice(0, 20)}`}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Responsibilities */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Responsabilidades</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {jobData.responsibilities.map((responsibility, index) => (
                  <li
                    key={`responsibility-${index}-${responsibility.slice(0, 20)}`}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      {responsibility}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Benefits */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Beneficios</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {jobData.benefits.map((benefit, index) => (
                  <li
                    key={`benefit-${index}-${benefit.slice(0, 20)}`}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Company info */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Sobre la empresa</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{jobData.company}</p>
                  <p className="text-sm text-muted-foreground">
                    Eventos corporativos
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>50-200 empleados</span>
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className="space-y-3">
            <Link href={`/dashboard/jobs/${jobId}/apply`}>
              <Button
                size="lg"
                className="w-full gap-2 bg-primary hover:bg-primary/90"
              >
                <CheckCircle className="w-4 h-4" />
                Aplicar a este empleo
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full gap-2 bg-transparent"
            >
              <Bookmark className="w-4 h-4" />
              Guardar para después
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
