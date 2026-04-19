export default function SettingsPage(): JSX.Element {
  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="max-w-2xl text-muted-foreground">
          Manage dashboard preferences, profile details, and future app options here.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          This page can later hold account and UI preferences.
        </p>
      </section>
    </div>
  );
}