import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import type { ReactElement } from "react";

type ProjectStatus = "active" | "completed" | "archived";

type Project = {
  id: number;
  title: string;
  description: string | null;
  status: ProjectStatus;
};

const statusBadgeClasses: Record<ProjectStatus, string> = {
  active: "bg-green-100 text-green-800 ring-green-200",
  completed: "bg-blue-100 text-blue-800 ring-blue-200",
  archived: "bg-slate-100 text-slate-700 ring-slate-200",
};

function getStatusLabel(status: ProjectStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default async function ProjectsPage(): Promise<ReactElement> {
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, description, status");

  const projects = (data ?? []) as Project[];

  return (
    <div className="space-y-8">
      <section className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="max-w-2xl text-muted-foreground">
            Track active work, completed deliverables, and archived initiatives.
          </p>
        </div>
        <div>
          <Button asChild>
            <Link href="/projects/new">New Project</Link>
          </Button>
        </div>
      </section>

      {error ? (
        <section className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
          <p className="text-sm text-destructive">
            Unable to load projects from Supabase right now.
          </p>
        </section>
      ) : projects.length === 0 ? (
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">No projects found.</p>
        </section>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="border border-border shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle>{project.title}</CardTitle>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusBadgeClasses[project.status]}`}
                  >
                    {getStatusLabel(project.status)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {project.description?.trim() || "No description provided."}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
}