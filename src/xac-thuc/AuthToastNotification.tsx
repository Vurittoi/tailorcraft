import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface AuthToastNotificationProps {
  toastSuccessMsg: string;
}

export function AuthToastNotification({
  toastSuccessMsg,
}: AuthToastNotificationProps) {
  return (
    <AnimatePresence>
      {toastSuccessMsg && (
        <motion.div
          key="auth-top-right-toast"
          initial={{ opacity: 0, x: 48, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: 48, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-5 right-5 z-50 bg-[#141413] text-[#F9F8F6] border border-[#8C6D46]/60 rounded-xl px-4 py-3 shadow-2xl flex items-center gap-3"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-xs font-bold tracking-wide text-white">
              {toastSuccessMsg}
            </div>
            <div className="text-[11px] text-[#D8D4CC]">
              Đang chuyển vào không gian Tailor Craft...
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
