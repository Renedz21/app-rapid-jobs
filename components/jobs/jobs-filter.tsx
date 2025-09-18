"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";

export function JobsFilters() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const removeFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  };

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="text-lg">Filtros</CardTitle>
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="gap-1">
                {filter}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 w-4"
                  onClick={() => removeFilter(filter)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category */}
        <div className="space-y-2">
          <Label>Categoría</Label>
          <Select>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delivery">Delivery</SelectItem>
              <SelectItem value="cleaning">Limpieza</SelectItem>
              <SelectItem value="gardening">Jardinería</SelectItem>
              <SelectItem value="tech">Tecnología</SelectItem>
              <SelectItem value="events">Eventos</SelectItem>
              <SelectItem value="tutoring">Tutorías</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Apply Filters */}
        <div className="pt-4 space-y-2">
          <Button
            className="w-full"
            onClick={() => {
              setActiveFilters([]);
            }}
          >
            Aplicar filtros
          </Button>
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => {
              setActiveFilters([]);
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
