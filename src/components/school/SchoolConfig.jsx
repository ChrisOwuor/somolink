import React, { useState } from "react";
import { Plug, Wifi, Sliders, WifiOff, Users } from "lucide-react";
import StepHotspot from "./steps/StepHotspot";
import StepProfiles from "./steps/StepProfiles";
import StepAccessPoints from "./steps/StepAccessPoints";
import StepUsers from "./steps/StepUsers";
import StepReview from "./steps/StepReview";
import StepInterface from "./steps/StepInterface";

/**
 * Setup wizard with step locking:
 * Interface -> Hotspot -> Profiles -> APs -> Users -> Review
 */
const STEPS = [
  { id: "interface", label: "Interface", icon: Plug },
  { id: "hotspot", label: "Hotspot", icon: Wifi },
  { id: "profiles", label: "Profiles", icon: Sliders },
  { id: "aps", label: "Access Points", icon: WifiOff },
  { id: "users", label: "Users", icon: Users },
  { id: "review", label: "Review", icon: Users },
];

export default function SchoolConfig({ school, onUpdate, onDone }) {
  // wizard state
  const [current, setCurrent] = useState(0);
  // which steps are completed/unlocked - start with interface unlocked
  const [completed, setCompleted] = useState({
    interface: school.interfaces && school.interfaces.length > 0,
    hotspot: school.hotspots && school.hotspots.length > 0,
    profiles: school.profiles && school.profiles.length > 0,
    aps: school.accessPoints && school.accessPoints.length > 0,
    users: school.users && school.users.length > 0,
  });

  function markDone(stepId) {
    setCompleted((c) => ({ ...c, [stepId]: true }));
    // advance to next step
    setCurrent((i) => Math.min(i + 1, STEPS.length - 1));
  }

  const stepComponents = {
    interface: (
      <StepInterface
        school={school}
        onSave={(intf) => {
          const updated = { interfaces: [...(school.interfaces || []), intf] };
          onUpdate(updated);
          markDone("interface");
        }}
      />
    ),
    hotspot: (
      <StepHotspot
        school={school}
        onSave={(hotspot) => {
          const updated = { hotspots: [...(school.hotspots || []), hotspot] };
          onUpdate(updated);
          markDone("hotspot");
        }}
        disabled={!completed.interface}
      />
    ),
    profiles: (
      <StepProfiles
        school={school}
        onSave={(profile) => {
          const updated = { profiles: [...(school.profiles || []), profile] };
          onUpdate(updated);
          markDone("profiles");
        }}
        disabled={!completed.hotspot}
      />
    ),
    aps: (
      <StepAccessPoints
        school={school}
        onSave={(ap) => {
          const updated = {
            accessPoints: [...(school.accessPoints || []), ap],
          };
          onUpdate(updated);
          markDone("aps");
        }}
        disabled={!completed.profiles}
      />
    ),
    users: (
      <StepUsers
        school={school}
        onSave={(user) => {
          const updated = { users: [...(school.users || []), user] };
          onUpdate(updated);
          markDone("users");
        }}
        disabled={!completed.aps}
      />
    ),
    review: <StepReview school={school} onActivate={() => onDone()} />,
  };

  return (
    <div className="flex gap-6">
      {/* Stepper */}
      <aside className="w-56 hidden md:block">
        <nav className="space-y-2">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            const locked =
              (s.id === "hotspot" && !completed.interface) ||
              (s.id === "profiles" && !completed.hotspot) ||
              (s.id === "aps" && !completed.profiles) ||
              (s.id === "users" && !completed.aps) ||
              (s.id === "review" && !completed.users);

            return (
              <button
                key={s.id}
                onClick={() => {
                  if (!locked) setCurrent(idx);
                }}
                className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded ${
                  current === idx
                    ? "bg-indigo-50 border-l-4 border-indigo-600 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                disabled={locked}
              >
                <span className="p-1">
                  <Icon size={16} />
                </span>
                <div>
                  <div className="text-sm font-medium">{s.label}</div>
                  <div className="text-xs text-gray-400">
                    {completed[s.id] ? "Done" : locked ? "Locked" : "Pending"}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1">
        <div className="bg-white border border-gray-200 rounded p-6">
          {stepComponents[STEPS[current].id]}
        </div>
      </main>
    </div>
  );
}
