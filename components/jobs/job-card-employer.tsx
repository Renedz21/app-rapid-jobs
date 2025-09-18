import { Clock, DollarSign, Edit, Eye, MapPin, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Job } from "@/types/supabase";

type JobCardEmployerProps = {
  job: Job;
};

export default function JobCardEmployer({ job }: JobCardEmployerProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-foreground">{job.title}</h3>
          <Badge variant={job.status === "open" ? "default" : "secondary"}>
            {job.status === "open" ? "Activo" : "Cerrado"}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {job.location}
          </div>

          {job.payment && (
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {job.payment}
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {job.job_type === "full-time"
              ? "Tiempo completo"
              : job.job_type === "part-time"
                ? "Tiempo parcial"
                : job.job_type === "contract"
                  ? "Contrato"
                  : "Temporal"}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4 lg:mt-0">
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Eye className="w-4 h-4" />
          Ver
        </Button>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Edit className="w-4 h-4" />
          Editar
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-destructive hover:text-destructive bg-transparent"
        >
          <Trash2 className="w-4 h-4" />
          Eliminar
        </Button>
      </div>
    </div>
  );
}
