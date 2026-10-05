import React from 'react';
import { motion } from 'motion/react';
import { UserAccount } from '../types/suitTypes';

interface AuthSidebarProps {
  accounts: UserAccount[];
  onFillDemoCredentials: (acc: UserAccount) => void;
}

export function AuthSidebar({
  accounts,
  onFillDemoCredentials,
}: AuthSidebarProps) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="lg:col-span-5 bg-[#141413] text-[#F9F8F6] p-7 flex flex-col justify-between space-y-5"
    >
      <div className="space-y-2.5">
        <div className="text-xs font-mono-tabular tracking-widest uppercase text-[#D4B07A]">
          BESPOKE SARTORIAL ATELIER
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
          Tailor Craft
        </h1>
        <p className="text-xs text-[#D8D4CC] leading-relaxed">
          Hệ thống thiết kế trang phục Suit nam giới may đo 2D theo thời gian
          thực, quản lý hồ sơ số đo giải phẫu và điều hành chế tác Bespoke.
        </p>
      </div>

      {/* Gợi ý điền nhanh thông tin tài khoản thử nghiệm */}
      <div className="space-y-2 pt-4 border-t border-white/15">
        <div className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#D4B07A]">
          Tài khoản mẫu (Bấm để điền nhanh):
        </div>

        <div className="space-y-1.5">
          {accounts.map((acc) => (
            <button
              key={acc.id}
              type="button"
              onClick={() => onFillDemoCredentials(acc)}
              className="w-full text-left px-2.5 py-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 transition-colors flex items-center justify-between gap-2 cursor-pointer"
            >
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white truncate">
                  {acc.fullName}
                </div>
                <div className="text-[11px] font-mono-tabular text-[#D8D4CC]">
                  TK: <strong className="text-[#D4B07A]">{acc.username}</strong>{' '}
                  · MK: {acc.password || '123'}
                </div>
              </div>
              <span className="text-[10px] font-mono-tabular text-[#D4B07A] shrink-0">
                {acc.role}
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
