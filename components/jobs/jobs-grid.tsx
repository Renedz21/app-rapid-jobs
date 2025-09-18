import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { JobWithProfile } from "@/types/supabase";
import Each from "../shared/each";
import JobCardWorker from "./job-card-worker";

type JobsGridProps = {
  jobs: JobWithProfile[];
};

export function JobsGrid({ jobs }: JobsGridProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl p-6 border border-primary dark:border-primary">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 dark:bg-primary/40 rounded-lg">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-primary">Potenciado por IA</h3>
            <p className="text-primary text-sm">
              La IA puede ayudarte a encontrar y aplicar más rápido a los
              mejores empleos
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            Empleos disponibles
          </h2>
          <p className="text-muted-foreground">
            {jobs.length} empleos encontrados
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Más recientes
          </Button>
          <Button variant="outline" size="sm">
            Mejor pagados
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        <Each
          of={jobs}
          render={(job) => <JobCardWorker job={job} />}
          getKey={(job) => job.id}
        />
      </div>
    </div>
  );
}
