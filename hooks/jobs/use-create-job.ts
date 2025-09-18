import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  type CreateJobSchema,
  createJobSchema,
} from "@/schemas/jobs/create-job.schema";
import { createClient } from "@/utils/supabase/client";

export default function useCreateJob() {
  const router = useRouter();
  const form = useForm<CreateJobSchema>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      job_type: "temporary",
      category: "",
      status: "open",
      employer_id: "",
      needed_date: new Date(),
      urgency: "low",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const getDateString = useCallback((needed_date: Date) => {
    const year = needed_date.getFullYear();
    const month = String(needed_date.getMonth() + 1).padStart(2, "0");
    const day = String(needed_date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;
    return dateString;
  }, []);

  const onSubmit = async (values: CreateJobSchema) => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      values.employer_id = user.id;
    }

    const { error } = await supabase.from("jobs").insert({
      ...values,
      needed_date: getDateString(values.needed_date),
      urgency: values.urgency,
    });

    if (error) {
      console.error(error);
      toast.error("Error al crear el empleo");
    }

    toast.success("Empleo creado correctamente");
    form.reset();
    router.push("/dashboard/employer/postings");
  };

  return { form, onSubmit, isLoading };
}
