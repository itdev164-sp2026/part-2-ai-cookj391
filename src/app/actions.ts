"use server"

import { projectSchema, type Project } from "@/lib/schemas"
import { supabase } from "@/lib/supabase"

export async function createProject(data: Project) {
  try {
    const parsed = projectSchema.parse(data)

    const { error } = await supabase.from("projects").insert(parsed)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err?.message ?? String(err) }
  }
}

export default createProject
