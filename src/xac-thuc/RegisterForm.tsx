import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Loader2, Mail, Phone, UserPlus } from 'lucide-react';

interface RegisterFormProps {
  measureActiveFormRef: (node: HTMLFormElement | null) => void;
  slideDirection: number;
  slideVariants: {
    enter: (direction: number) => { x: number; opacity: number; scale: number };
    center: { x: number; opacity: number; scale: number };
    exit: (direction: number) => { x: number; opacity: number; scale: number };
  };
  regFullName: string;
  setRegFullName: (value: string) => void;
  regUsername: string;
  setRegUsername: (value: string) => void;
  regEmail: string;
  setRegEmail: (value: string) => void;
  regPhone: string;
  setRegPhone: (value: string) => void;
  regAddress: string;
  setRegAddress: (value: string) => void;
  regPassword: string;
  setRegPassword: (value: string) => void;
  regConfirmPassword: string;
  setRegConfirmPassword: (value: string) => void;
  isSubmitting: boolean;
  toastSuccessMsg: string;
  onSubmit: (e: React.FormEvent) => void;
}

export function RegisterForm({
  measureActiveFormRef,
  slideDirection,
  slideVariants,
  regFullName,
  setRegFullName,
  regUsername,
  setRegUsername,
  regEmail,
  setRegEmail,
  regPhone,
  setRegPhone,
  regAddress,
  setRegAddress,
  regPassword,
  setRegPassword,
  regConfirmPassword,
  setRegConfirmPassword,
  isSubmitting,
  toastSuccessMsg,
  onSubmit,
}: RegisterFormProps) {
  return (
    <motion.form
      key="register-form"
      ref={measureActiveFormRef}
      custom={slideDirection}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={onSubmit}
      className="space-y-3.5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1">
            Họ và tên
          </label>
          <input
            type="text"
            required
            disabled={isSubmitting || Boolean(toastSuccessMsg)}
            value={regFullName}
            onChange={(e) => setRegFullName(e.target.value)}
            placeholder="VD: Nguyễn Văn An"
            className="w-full px-3.5 py-2.5 text-sm bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413] disabled:opacity-60"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1">
            Tên đăng nhập (Username)
          </label>
          <input
            type="text"
            required
            disabled={isSubmitting || Boolean(toastSuccessMsg)}
            value={regUsername}
            onChange={(e) => setRegUsername(e.target.value)}
            placeholder="VD: nguyenvanan"
            className="w-full px-3.5 py-2.5 text-sm bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413] disabled:opacity-60"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="w-3.5 h-3.5 text-[#8A857D] absolute left-3 top-3" />
            <input
              type="email"
              required
              disabled={isSubmitting || Boolean(toastSuccessMsg)}
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              placeholder="email@domain.com"
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413] disabled:opacity-60"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1">
            Số điện thoại
          </label>
          <div className="relative">
            <Phone className="w-3.5 h-3.5 text-[#8A857D] absolute left-3 top-3" />
            <input
              type="text"
              required
              disabled={isSubmitting || Boolean(toastSuccessMsg)}
              value={regPhone}
              onChange={(e) => setRegPhone(e.target.value)}
              placeholder="0908 123 456"
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413] disabled:opacity-60"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#141413] mb-1">
          Địa chỉ nhận hàng
        </label>
        <input
          type="text"
          disabled={isSubmitting || Boolean(toastSuccessMsg)}
          value={regAddress}
          onChange={(e) => setRegAddress(e.target.value)}
          placeholder="Số nhà, đường, quận/huyện, tỉnh/thành phố..."
          className="w-full px-3.5 py-2.5 text-sm bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413] disabled:opacity-60"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1">
            Mật khẩu
          </label>
          <input
            type="password"
            required
            disabled={isSubmitting || Boolean(toastSuccessMsg)}
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            placeholder="Tạo mật khẩu..."
            className="w-full px-3.5 py-2.5 text-sm bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413] disabled:opacity-60"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            required
            disabled={isSubmitting || Boolean(toastSuccessMsg)}
            value={regConfirmPassword}
            onChange={(e) => setRegConfirmPassword(e.target.value)}
            placeholder="Nhập lại mật khẩu..."
            className="w-full px-3.5 py-2.5 text-sm bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413] disabled:opacity-60"
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
            <span>Đăng ký thành công</span>
          </>
        ) : (
          <>
            <UserPlus className="w-4 h-4" />
            <span>Hoàn Tất Đăng Ký & Vào Trang Chủ</span>
          </>
        )}
      </button>
    </motion.form>
  );
}
