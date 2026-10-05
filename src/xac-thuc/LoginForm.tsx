import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Loader2, Lock, LogIn, User } from 'lucide-react';

interface LoginFormProps {
  measureActiveFormRef: (node: HTMLFormElement | null) => void;
  slideDirection: number;
  slideVariants: {
    enter: (direction: number) => { x: number; opacity: number; scale: number };
    center: { x: number; opacity: number; scale: number };
    exit: (direction: number) => { x: number; opacity: number; scale: number };
  };
  usernameOrEmail: string;
  setUsernameOrEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  isSubmitting: boolean;
  toastSuccessMsg: string;
  onSubmit: (e: React.FormEvent) => void;
}

export function LoginForm({
  measureActiveFormRef,
  slideDirection,
  slideVariants,
  usernameOrEmail,
  setUsernameOrEmail,
  password,
  setPassword,
  isSubmitting,
  toastSuccessMsg,
  onSubmit,
}: LoginFormProps) {
  return (
    <motion.form
      key="login-form"
      ref={measureActiveFormRef}
      custom={slideDirection}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={onSubmit}
      className="space-y-4"
    >
      <div>
        <label className="block text-xs font-semibold text-[#141413] mb-1.5">
          Tên đăng nhập hoặc Email
        </label>
        <div className="relative">
          <User className="w-4 h-4 text-[#8A857D] absolute left-3.5 top-3" />
          <input
            type="text"
            required
            disabled={isSubmitting || Boolean(toastSuccessMsg)}
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            placeholder="Nhập tên đăng nhập hoặc email..."
            className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413] disabled:opacity-60"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#141413] mb-1.5">
          Mật khẩu
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-[#8A857D] absolute left-3.5 top-3" />
          <input
            type="password"
            required
            disabled={isSubmitting || Boolean(toastSuccessMsg)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu..."
            className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413] disabled:opacity-60"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || Boolean(toastSuccessMsg)}
        className={`w-full py-3.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
          toastSuccessMsg
            ? 'bg-emerald-700 text-white'
            : 'bg-[#141413] text-white hover:bg-[#2A2826]'
        } disabled:cursor-not-allowed`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Đang xác thực...</span>
          </>
        ) : toastSuccessMsg ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            <span>Đăng nhập thành công</span>
          </>
        ) : (
          <>
            <LogIn className="w-4 h-4" />
            <span>Đăng Nhập Vào Hệ Thống</span>
          </>
        )}
      </button>
    </motion.form>
  );
}
