import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Settings className="w-8 h-8 text-indigo-500" />
            Settings
          </h1>
          <p className="text-foreground/60 mt-2">Manage your website and account preferences.</p>
        </div>
      </div>

      <div className="bg-foreground/[0.02] border border-foreground/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-4 text-foreground/80">General Profile</h2>
        <div className="space-y-4">
          <p className="text-sm text-foreground/60">
            Settings functionality is under development. Please check back later.
          </p>
        </div>
      </div>
    </div>
  );
}
