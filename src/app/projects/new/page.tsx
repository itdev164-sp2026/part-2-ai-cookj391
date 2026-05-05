import type { ReactElement } from "react"
import { ProjectForm } from "@/components/project-form"

export default function NewProjectPage(): ReactElement {
  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
        <p className="max-w-2xl text-muted-foreground">Create a new project.</p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <ProjectForm />
      </section>
    </div>
  )
}
