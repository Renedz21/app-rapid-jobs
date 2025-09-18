import { CreateJobForm } from "@/components/forms/create-job-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EmployerPostingsCreatePage() {
  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="outline" className="gap-2 bg-transparent" asChild>
          <Link href="/dashboard/employer/postings">
            <ArrowLeft className="w-4 h-4" />
            Volver al panel
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">
            Publicar nuevo empleo
          </h1>
          <p className="text-muted-foreground mt-2">
            Completa la información para publicar tu oferta de empleo
          </p>
        </div>
        <CreateJobForm />
      </div>
    </div>
  );
}
