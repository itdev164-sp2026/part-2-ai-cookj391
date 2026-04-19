export default function ProjectsPage(): JSX.Element {
  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="max-w-2xl text-muted-foreground">
          This section is ready for project tracking, milestones, and portfolio work.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Add project summaries, statuses, and links here.
        </p>
      </section>
    </div>
  );
}