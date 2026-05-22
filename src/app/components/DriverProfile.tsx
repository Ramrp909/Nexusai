import { useState } from "react";
import { X, User, Edit2, Plus, Check } from "lucide-react";
import { useAI } from "../../context/AIContext";
import type { DriverProfile as DriverProfileType } from "../../context/AIContext";

export default function DriverProfile() {
  const { modals, closeModal, currentProfile, profiles, setCurrentProfile, addProfile } = useAI();
  const isOpen = modals.driverProfile;
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(currentProfile?.name || "");
  const [showAddProfile, setShowAddProfile] = useState(false);
  const [newProfileData, setNewProfileData] = useState({
    name: "",
    acTemp: 22,
    seatH: 50,
    seatV: 50,
    lumbar: 50,
    ambientLight: "medium" as const,
    volume: 50,
  });

  if (!isOpen) return null;

  const handleSaveEdit = () => {
    if (currentProfile && editedName.trim()) {
      // Update profile logic would go here
      setIsEditing(false);
    }
  };

  const handleAddProfile = () => {
    if (newProfileData.name.trim()) {
      const newProfile: DriverProfileType = {
        id: `profile-${Date.now()}`,
        name: newProfileData.name,
        isActive: false,
        preferences: {
          acTemperature: newProfileData.acTemp,
          seatPosition: {
            horizontal: newProfileData.seatH,
            vertical: newProfileData.seatV,
            lumbar: newProfileData.lumbar,
          },
          ambientLighting: newProfileData.ambientLight,
          steeringWheel: { tilt: 50, telescope: 50 },
          mirrors: { driver: 50, passenger: 50 },
          sound: { volume: newProfileData.volume, equalizer: "balanced" },
        },
      };
      addProfile(newProfile);
      setShowAddProfile(false);
      setNewProfileData({
        name: "",
        acTemp: 22,
        seatH: 50,
        seatV: 50,
        lumbar: 50,
        ambientLight: "medium",
        volume: 50,
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => closeModal("driverProfile")}
    >
      <div
        className="w-full max-w-md bg-card rounded-[28px] border border-border shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="h-16 shrink-0 border-b border-border/30 flex items-center justify-between px-6">
          <div>
            <div className="text-sm font-semibold">Driver Profile</div>
            <div className="text-[9px] text-muted-foreground uppercase tracking-wide mt-0.5">
              Manage Your Preferences
            </div>
          </div>
          <button
            onClick={() => closeModal("driverProfile")}
            className="rounded-lg p-1.5 hover:bg-accent transition-colors text-muted-foreground"
            aria-label="Close driver profile"
          >
            <X className="size-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Current Profile */}
          <div className="rounded-2xl border border-border/30 bg-muted/20 p-4">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                <User className="size-6 text-primary" />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="flex-1 px-2 py-1 text-sm font-semibold bg-background border border-border/30 rounded-lg"
                    />
                    <button
                      onClick={handleSaveEdit}
                      className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90"
                      aria-label="Save name"
                    >
                      <Check className="size-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">{currentProfile?.name}</div>
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setEditedName(currentProfile?.name || "");
                      }}
                      className="p-1 rounded hover:bg-accent transition-colors"
                      aria-label="Edit name"
                    >
                      <Edit2 className="size-3 text-muted-foreground" />
                    </button>
                  </div>
                )}
                <div className="text-[9px] text-green-500 uppercase tracking-wide mt-0.5">
                  Active Profile
                </div>
              </div>
            </div>
          </div>

          {/* Profile List */}
          <div>
            <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-3">
              Saved Profiles
            </div>
            <div className="space-y-2">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => setCurrentProfile(profile)}
                  className={`w-full rounded-xl border p-3 flex items-center gap-3 transition-all ${
                    profile.id === currentProfile?.id
                      ? "border-primary/30 bg-primary/10"
                      : "border-border/30 bg-muted/20 hover:bg-muted/40"
                  }`}
                >
                  <div className="size-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <User className="size-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs font-semibold">{profile.name}</div>
                    <div className="text-[9px] text-muted-foreground">
                      {profile.isActive ? "Active" : "Saved"}
                    </div>
                  </div>
                  {profile.id === currentProfile?.id && (
                    <div className="size-2 rounded-full bg-green-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Add New Profile */}
          <div>
            {!showAddProfile ? (
              <button
                onClick={() => setShowAddProfile(true)}
                className="w-full rounded-xl border border-dashed border-border/50 bg-muted/20 p-3 flex items-center justify-center gap-2 hover:bg-muted/40 transition-all"
              >
                <Plus className="size-4 text-primary" />
                <span className="text-xs font-semibold text-primary">Add New Profile</span>
              </button>
            ) : (
              <div className="rounded-xl border border-border/30 bg-muted/20 p-4 space-y-4">
                <div className="text-xs font-semibold">New Profile Settings</div>

                <div>
                  <label className="text-[9px] uppercase tracking-wide text-muted-foreground">
                    Profile Name
                  </label>
                  <input
                    type="text"
                    value={newProfileData.name}
                    onChange={(e) =>
                      setNewProfileData({ ...newProfileData, name: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 text-xs bg-background border border-border/30 rounded-lg"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-wide text-muted-foreground">
                    AC Temperature: {newProfileData.acTemp}°C
                  </label>
                  <input
                    type="range"
                    min="16"
                    max="32"
                    value={newProfileData.acTemp}
                    onChange={(e) =>
                      setNewProfileData({ ...newProfileData, acTemp: Number(e.target.value) })
                    }
                    className="w-full mt-1"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[9px] uppercase tracking-wide text-muted-foreground">
                      Seat H
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={newProfileData.seatH}
                      onChange={(e) =>
                        setNewProfileData({ ...newProfileData, seatH: Number(e.target.value) })
                      }
                      className="w-full mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wide text-muted-foreground">
                      Seat V
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={newProfileData.seatV}
                      onChange={(e) =>
                        setNewProfileData({ ...newProfileData, seatV: Number(e.target.value) })
                      }
                      className="w-full mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wide text-muted-foreground">
                      Lumbar
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={newProfileData.lumbar}
                      onChange={(e) =>
                        setNewProfileData({ ...newProfileData, lumbar: Number(e.target.value) })
                      }
                      className="w-full mt-1"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddProfile(false)}
                    className="flex-1 px-3 py-2 text-xs font-medium border border-border/30 rounded-lg hover:bg-accent transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddProfile}
                    className="flex-1 px-3 py-2 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all"
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
