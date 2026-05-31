import React, { useState, useRef } from "react";
import { Camera, MapPin, Pencil, Star, CheckCircle2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function ProfileHeader({ user, view }) {
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    await base44.auth.updateMe({ avatar_url: file_url });
    setAvatarUrl(file_url);
    setUploading(false);
  }

  const displayName = user?.full_name || "Your Name";
  const role = view === "mentor" ? "Mentor" : "Mentee";
  const roleColor =
    view === "mentor"
      ? "bg-cyan-500/10 text-cyan-600"
      : "bg-purple-500/10 text-purple-600";
  const emoji = view === "mentor" ? "👨‍🏫" : "🎓";

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      {/* Banner */}
      <div
        className={`h-24 bg-gradient-to-br ${view === "mentor" ? "from-cyan-500/20 to-blue-600/20" : "from-purple-500/20 to-indigo-600/20"}`}
      />

      <div className="px-6 pb-5">
        <div className="flex items-end gap-4 -mt-10 mb-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl border-4 border-card shadow-md overflow-hidden bg-secondary flex items-center justify-center">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl">{emoji}</span>
              )}
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-primary border-2 border-card flex items-center justify-center hover:bg-primary/90 transition-colors shadow"
            >
              {uploading ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Camera className="w-3.5 h-3.5 text-primary-foreground" />
              )}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex-1 min-w-0 pb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-extrabold text-foreground leading-tight">
                {displayName}
              </h2>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${roleColor}`}
              >
                {role}
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            United Kingdom
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            4.9 rating
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Active
          </span>
        </div>
      </div>
    </div>
  );
}
