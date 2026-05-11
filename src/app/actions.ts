"use server"

import { authSchema, projectSchema, type AuthInput, type Project } from "@/lib/schemas"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signIn(data: AuthInput) {
  try {
    const parsed = authSchema.parse(data)
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.email,
      password: parsed.password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err?.message ?? String(err) }
  }
}

export async function signUp(data: AuthInput) {
  try {
    const parsed = authSchema.parse(data)
    const supabase = await createClient()

    const { error } = await supabase.auth.signUp({
      email: parsed.email,
      password: parsed.password,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err?.message ?? String(err) }
  }
}

export async function signOut() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/login")
  } catch (err: any) {
    return { success: false, error: err?.message ?? String(err) }
  }
}

export async function createProject(data: Project) {
  try {
    const parsed = projectSchema.parse(data)
    const supabase = await createClient()

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
