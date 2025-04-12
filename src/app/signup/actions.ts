"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/src/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const dataObj = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    username: formData.get("username") as string,
  };

  const { error } = await supabase.auth.signUp(dataObj);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
