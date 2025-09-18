import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Clock } from "lucide-react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { JobWithProfile } from "@/types/supabase";
import Link from "next/link";

type JobCardWorkerProps = {
  job: JobWithProfile;
};

export default function JobCardWorker({ job }: JobCardWorkerProps) {
  return (
    <Link href={`/dashboard/worker/jobs/${job.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors">
                  {job.title}
                </h3>
                {job.urgency && (
                  <Badge variant="destructive" className="text-xs">
                    Urgente
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground font-medium">
                Solicitado por {job.profiles?.full_name}
              </p>
            </div>
            <Badge variant="secondary">{job.category}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {job.description}
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{job.job_type}</span>
            </div>
            {job.needed_date && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="capitalize">{job.needed_date}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-2">
              <Button size="sm">Aplicar ahora</Button>
              <Button
                variant="outline"
                size="sm"
                className="text-primary border-primary hover:bg-primary/10 bg-transparent"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Aplicar con IA
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Guardar
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
