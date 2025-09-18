import { useForm } from "react-hook-form";
import {
  CreateJobSchema,
  createJobSchema,
} from "@/schemas/jobs/create-job.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/utils/supabase/client";

export default function useCreateJob() {
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

  const onSubmit = async (values: CreateJobSchema) => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      values.employer_id = user.id;
    }

    // Create a date string in YYYY-MM-DD format to avoid timezone issues
    const year = values.needed_date.getFullYear();
    const month = String(values.needed_date.getMonth() + 1).padStart(2, "0");
    const day = String(values.needed_date.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    const { error } = await supabase.from("jobs").insert({
      ...values,
      needed_date: dateString,
      urgency: values.urgency,
    });

    if (error) {
      console.error(error);
    }
  };

  return { form, onSubmit, isLoading };
}
