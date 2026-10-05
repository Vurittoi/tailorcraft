import React from 'react';
import { Eye, EyeOff, MapPin, Save } from 'lucide-react';

interface UserProfileFormProps {
  isCustomer: boolean;
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  address: string;
  setAddress: (value: string) => void;
}

export function UserProfileForm({
  isCustomer,
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  address,
  setAddress,
}: UserProfileFormProps) {
  return (
    <div className="lg:col-span-8 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1.5">
            1. Họ và tên
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nhập họ và tên..."
            className="w-full px-3.5 py-2.5 text-sm bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1.5">
            2. Địa chỉ Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email..."
            className="w-full px-3.5 py-2.5 text-sm bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1.5">
            3. Số điện thoại
          </label>
          <input
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Nhập số điện thoại..."
            className="w-full px-3.5 py-2.5 text-sm bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1.5">
            4. Mật khẩu tài khoản
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu..."
              className="w-full pl-3.5 pr-10 py-2.5 text-sm font-mono-tabular bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-2.5 text-[#65615B] hover:text-[#141413] cursor-pointer"
              title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-[#141413] mb-1.5">
            {isCustomer
              ? '5. Địa chỉ nhận hàng (Giao trang phục Bespoke tận nơi)'
              : '5. Địa chỉ liên hệ / Đơn vị công tác'}
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#8C6D46] absolute left-3.5 top-3" />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={
                isCustomer
                  ? 'Nhập số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố...'
                  : 'Nhập địa chỉ xưởng hoặc văn phòng điều hành...'
              }
              className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413]"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
        <button
          type="submit"
          className="px-6 py-3 bg-[#141413] text-white text-xs font-semibold rounded-lg hover:bg-[#2A2826] transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Lưu Hồ Sơ Tài Khoản</span>
        </button>
      </div>
    </div>
  );
}
