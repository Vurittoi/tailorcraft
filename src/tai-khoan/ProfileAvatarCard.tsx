import React from 'react';
import { Camera } from 'lucide-react';
import { UserAccount } from '../types/suitTypes';

interface ProfileAvatarCardProps {
  currentUser: UserAccount;
  fullName: string;
  avatarUrl: string;
  onAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetAvatar: () => void;
}

export function ProfileAvatarCard({
  currentUser,
  fullName,
  avatarUrl,
  onAvatarUpload,
  onResetAvatar,
}: ProfileAvatarCardProps) {
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="lg:col-span-4 bg-[#F9F8F6] border border-[#E5E2DC] rounded-2xl p-6 flex flex-col items-center text-center space-y-4">
      <div className="relative group">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={fullName}
            className="w-28 h-28 rounded-full object-cover border-2 border-[#8C6D46] shadow-md"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-[#141413] text-[#D4B07A] border-2 border-[#8C6D46] flex items-center justify-center font-display text-3xl font-bold shadow-md">
            {getInitials(fullName || currentUser.fullName)}
          </div>
        )}

        <label
          title="Tải ảnh đại diện mới"
          className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-[#8C6D46] text-white flex items-center justify-center shadow-md hover:bg-[#735837] transition-colors cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          <input
            type="file"
            accept="image/*"
            onChange={onAvatarUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="space-y-1">
        <h3 className="font-display text-2xl font-bold text-[#141413]">
          {fullName || currentUser.fullName}
        </h3>
        <div className="text-xs text-[#65615B] font-mono-tabular">
          @{currentUser.username} · Tham gia từ {currentUser.createdAt}
        </div>
      </div>

      <div className="w-full pt-3 border-t border-[#EAE7E1] flex flex-col gap-2">
        <label className="w-full py-2 px-3 text-xs font-semibold border border-[#D8D4CC] bg-white text-[#141413] rounded-lg hover:border-[#141413] transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
          <Camera className="w-3.5 h-3.5 text-[#8C6D46]" />
          <span>Tải ảnh Avatar từ máy</span>
          <input
            type="file"
            accept="image/*"
            onChange={onAvatarUpload}
            className="hidden"
          />
        </label>

        {avatarUrl && (
          <button
            type="button"
            onClick={onResetAvatar}
            className="text-[11px] text-[#65615B] hover:text-red-700 underline cursor-pointer"
          >
            Dùng lại Avatar chữ cái mặc định
          </button>
        )}
      </div>
    </div>
  );
}
