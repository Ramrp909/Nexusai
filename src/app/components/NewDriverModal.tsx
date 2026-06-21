import { X, User, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAI } from "../../context/AIContext";
<<<<<<< HEAD
=======
import { API_BASE } from "../../services/api";
>>>>>>> 0b5799bef361557c9f0b6ad43f9d467d3568cd03

type NewDriverModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewDriverModal({
  open,
  onClose,
}: NewDriverModalProps) {
const {
  driverFrame,
  setRecognizedDriver,
} = useAI();

const [loading, setLoading] =
  useState(false);

const [
  responseMessage,
  setResponseMessage,
] = useState("");

const [
  responseType,
  setResponseType,
] = useState<
  "success" | "error" | ""
>("");

const [name, setName] =
  useState("");

const [drivingStyle, setDrivingStyle] =
  useState("Balanced");

const [acTemperature, setAcTemperature] =
  useState("22°C");

const [ambientMode, setAmbientMode] =
  useState("Cyber Blue");

const [seatPosition, setSeatPosition] =
  useState("Comfort");

const [assistantVoice, setAssistantVoice] =
  useState("Calm");

  const handleSaveDriver =
  async () => {

    if (!driverFrame || !name)
      return;

    try {

      setLoading(true);

      setResponseMessage(
        "Saving driver profile..."
      );

      setResponseType("");

      const formData =
        new FormData();

      formData.append(
        "name",
        name
      );

      formData.append(
        "driving_style",
        drivingStyle
      );

      formData.append(
        "ac_temperature",
        acTemperature
      );

      formData.append(
        "ambient_mode",
        ambientMode
      );

      formData.append(
        "seat_position",
        seatPosition
      );

      formData.append(
        "assistant_voice",
        assistantVoice
      );

      formData.append(
        "file",
        new File(
          [driverFrame],
          "driver.jpg",
          {
            type: "image/jpeg",
          }
        )
      );

      const response =
        await fetch(
         
<<<<<<< HEAD
           "http://127.0.0.1:8000/register-driver",
=======
           `${API_BASE}/register-driver`,
>>>>>>> 0b5799bef361557c9f0b6ad43f9d467d3568cd03
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      console.log(data);

      if (
        response.ok &&
        data.success
      ) {

        setResponseMessage(
          "Profile created successfully"
        );

        setResponseType(
          "success"
        );

        setRecognizedDriver({
          name,
          confidence: 1,
        });

        setTimeout(() => {

          onClose();

          window.location.reload();

        }, 1500);

      } else {

        setResponseMessage(
          data.message ||
          "Registration failed"
        );

        setResponseType(
          "error"
        );
      }

    } catch (error) {

      console.error(error);

      setResponseMessage(
        "Server connection failed"
      );

      setResponseType(
        "error"
      );

    } finally {

      setLoading(false);
    }
};


  if (!open) return null;

  return (

  <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm">

    <div className="w-[760px] rounded-[32px] border border-cyan-500/20 bg-[#07111f]/95 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.08)] overflow-hidden">

      <div className="grid grid-cols-[280px_1fr]">

        {/* LEFT PANEL */}
        <div className="border-r border-cyan-500/10 p-6 flex flex-col justify-between bg-cyan-500/[0.03]">

          <div>

            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">

              <Sparkles className="w-6 h-6 text-cyan-300" />

            </div>

            <h2 className="mt-6 text-2xl font-semibold text-white">
              New Driver Detected
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Create your personalized cockpit profile and AI assistant preferences.
            </p>

          </div>

          <div className="rounded-2xl border border-cyan-500/10 bg-cyan-500/[0.03] p-4">

            <p className="text-xs uppercase tracking-wider text-cyan-400">
              AI Copilot
            </p>

            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Your cabin settings, driving behavior and assistant preferences will be restored automatically next time.
            </p>

          </div>

        </div>

                {/* RIGHT PANEL */}
        <div className="p-6 relative">

          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
          >
            <X className="w-4 h-4 text-slate-300" />
          </button>

          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-1">
              <label className="text-xs text-slate-400">
                Driver Name
              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter name"
                className="w-full h-11 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none focus:border-cyan-400/40"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">
                Driving Style
              </label>

              <select
                value={drivingStyle}
                onChange={(e) =>
                  setDrivingStyle(e.target.value)
                }
                className="w-full h-11 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none"
              >
                <option>Balanced</option>
                <option>Sport</option>
                <option>Comfort</option>
                <option>Eco</option>
              </select>
            </div>

                        <div className="space-y-1">
              <label className="text-xs text-slate-400">
                AC Temperature
              </label>

              <select
                value={acTemperature}
                onChange={(e) =>
                  setAcTemperature(
                    e.target.value
                  )
                }
                className="w-full h-11 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none"
              >
                <option>20°C</option>
                <option>22°C</option>
                <option>24°C</option>
                <option>26°C</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">
                Ambient Mode
              </label>

              <select
                value={ambientMode}
                onChange={(e) =>
                  setAmbientMode(
                    e.target.value
                  )
                }
                className="w-full h-11 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none"
              >
                <option>Cyber Blue</option>
                <option>Sunset Orange</option>
                <option>Neon Purple</option>
                <option>Arctic White</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">
                Seat Position
              </label>

              <select
                value={seatPosition}
                onChange={(e) =>
                  setSeatPosition(
                    e.target.value
                  )
                }
                className="w-full h-11 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none"
              >
                <option>Comfort</option>
                <option>Sport</option>
                <option>Relaxed</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">
                Assistant Voice
              </label>

              <select
                value={assistantVoice}
                onChange={(e) =>
                  setAssistantVoice(
                    e.target.value
                  )
                }
                className="w-full h-11 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none"
              >
                <option>Calm</option>
                <option>Professional</option>
                <option>Energetic</option>
              </select>
            </div>

          </div>

          {
  responseMessage && (

    <div
      className={`
        mt-5 rounded-xl border px-4 py-3 text-sm

        ${
          responseType === "success"
            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
            : responseType === "error"
            ? "border-red-500/20 bg-red-500/10 text-red-300"
            : "border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
        }
      `}
    >

      {responseMessage}

    </div>
  )
}
                    <div className="mt-6 flex items-center justify-between">

            <div className="flex items-center gap-2 text-xs text-slate-400">

              <User className="w-3 h-3" />

              <span>
                Personalized AI cockpit profile
              </span>

            </div>

            <button
  onClick={handleSaveDriver}
  disabled={loading}
  className="h-11 px-5 rounded-xl bg-cyan-500 text-black text-sm font-medium hover:scale-[1.02] transition disabled:opacity-50"
>

  {
    loading
      ? "Saving..."
      : "Save Driver Profile"
  }

</button>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}