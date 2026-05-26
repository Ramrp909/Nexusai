import { Sparkles, User } from "lucide-react";

type WelcomeDriverCardProps = {
  open: boolean;
  driverName: string;
};

export default function WelcomeDriverCard({
  open,
  driverName,
}: WelcomeDriverCardProps) {

  if (!open) return null;
  return (

  <div className="fixed top-6 right-6 z-[130] animate-in fade-in slide-in-from-top-4 duration-500">

    <div className="w-[360px] rounded-[28px] border border-cyan-500/20 bg-[#07111f]/95 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.08)] overflow-hidden">

      <div className="p-5 flex items-start gap-4">

        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center shrink-0">

          <Sparkles className="w-6 h-6 text-cyan-300" />

        </div>

        <div className="flex-1">

          <p className="text-xs uppercase tracking-wider text-cyan-400">
            AI Copilot
          </p>

          <h2 className="mt-1 text-xl font-semibold text-white">
            Welcome back,
            {" "}
            {driverName}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Personalized cockpit profile restored successfully.
          </p>

          <div className="mt-4 flex items-center gap-2 flex-wrap">

            <div className="px-3 py-1 rounded-lg border border-cyan-500/20 bg-cyan-500/10 text-[11px] text-cyan-300">
              Cabin Synced
            </div>

            <div className="px-3 py-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-[11px] text-emerald-300">
              AI Ready
            </div>

            <div className="px-3 py-1 rounded-lg border border-purple-500/20 bg-purple-500/10 text-[11px] text-purple-300">
              Profile Loaded
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}