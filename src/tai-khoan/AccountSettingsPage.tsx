import React, { useEffect, useState } from 'react';
import { Check, LogOut, User } from 'lucide-react';
import { FabricOption } from '../fabricCatalogData';
import {
  NavPage,
  TailoringOrderRecord,
  UserAccount,
} from '../types/suitTypes';
import { ProfileAvatarCard } from './ProfileAvatarCard';
import { UserProfileForm } from './UserProfileForm';
import { CustomerOrderHistory } from './CustomerOrderHistory';
import { FavoriteFabricsCard } from './FavoriteFabricsCard';

interface AccountSettingsPageProps {
  currentUser: UserAccount;
  orders: TailoringOrderRecord[];
  fabrics: FabricOption[];
  favoriteFabricIds: string[];
  onToggleFavoriteFabric: (fabricId: string) => void;
  onSelectFabricAndCustomize: (fabric: FabricOption) => void;
  onInspectOrder: (order: TailoringOrderRecord) => void;
  onUpdateAccountProfile: (updated: UserAccount) => void;
  onLogout: () => void;
  navigateToPage: (targetPage: NavPage) => void;
}

export function AccountSettingsPage({
  currentUser,
  orders,
  fabrics,
  favoriteFabricIds,
  onToggleFavoriteFabric,
  onSelectFabricAndCustomize,
  onInspectOrder,
  onUpdateAccountProfile,
  onLogout,
  navigateToPage,
}: AccountSettingsPageProps) {
  const isCustomer = currentUser.role === 'KHACHHANG';

  const [fullName, setFullName] = useState(currentUser.fullName);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [password, setPassword] = useState(currentUser.password || '123');
  const [showPassword, setShowPassword] = useState(false);
  const [address, setAddress] = useState(
    currentUser.address || currentUser.workshopName || ''
  );
  const [avatarUrl, setAvatarUrl] = useState<string>(
    currentUser.avatarUrl || ''
  );
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    setFullName(currentUser.fullName);
    setEmail(currentUser.email);
    setPhone(currentUser.phone);
    setPassword(currentUser.password || '123');
    setAddress(currentUser.address || currentUser.workshopName || '');
    setAvatarUrl(currentUser.avatarUrl || '');
  }, [currentUser]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatarUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserAccount = {
      ...currentUser,
      fullName: fullName.trim() || currentUser.fullName,
      email: email.trim() || currentUser.email,
      phone: phone.trim() || currentUser.phone,
      password: password.trim() || '123',
      ...(isCustomer
        ? { address: address.trim() }
        : { workshopName: address.trim(), address: address.trim() }),
      avatarUrl,
    };
    onUpdateAccountProfile(updated);
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 3000);
  };

  const favoriteFabrics = fabrics.filter((f) =>
    favoriteFabricIds.includes(f.id)
  );
  const suggestedFabrics = fabrics
    .filter((f) => !favoriteFabricIds.includes(f.id))
    .slice(0, 6);

  return (
    <section className="max-w-[1380px] w-full mx-auto px-4 sm:px-8 py-8 flex-1 space-y-8">
      {/* Header Trang Cài Đặt Tài Khoản */}
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-[#E5E2DC]">
        <div className="space-y-1">
          <div className="text-xs text-[#8C6D46] font-semibold tracking-wider uppercase">
            {isCustomer
              ? 'TAILOR CRAFT PERSONAL ATELIER · HỒ SƠ KHÁCH HÀNG'
              : currentUser.role === 'THOMAY'
              ? 'TAILOR CRAFT WORKSHOP · HỒ SƠ TÀI KHOẢN THỢ MAY'
              : 'TAILOR CRAFT SYSTEM · HỒ SƠ TÀI KHOẢN QUẢN TRỊ VIÊN'}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#141413]">
            Cài Đặt Tài Khoản Cá Nhân
          </h1>
          <p className="text-xs sm:text-sm text-[#65615B] max-w-2xl">
            {isCustomer
              ? 'Quản lý ảnh đại diện, thông tin liên hệ, mật khẩu, địa chỉ nhận hàng cùng lịch sử các bộ Suit đã đặt và danh mục yêu thích của riêng tài khoản này.'
              : 'Quản lý ảnh đại diện, họ tên, email, số điện thoại, mật khẩu và thông tin đơn vị công tác của tài khoản.'}
          </p>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="px-4 py-2.5 text-xs font-semibold border border-red-200 bg-red-50/60 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Đăng xuất tài khoản</span>
        </button>
      </div>

      {/* KHỐI 1: HỒ SƠ TÀI KHOẢN & ẢNH ĐẠI DIỆN */}
      <div className="bg-white border border-[#E5E2DC] rounded-2xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[#EAE7E1]">
          <div className="flex items-center gap-2.5">
            <User className="w-5 h-5 text-[#8C6D46]" />
            <div>
              <h2 className="font-display text-2xl font-bold text-[#141413]">
                Hồ Sơ Tài Khoản
              </h2>
              <p className="text-xs text-[#65615B]">
                {isCustomer
                  ? 'Cập nhật ảnh đại diện, họ tên, email, số điện thoại, mật khẩu và địa chỉ nhận trang phục.'
                  : 'Cập nhật ảnh đại diện, họ tên, email, số điện thoại, mật khẩu và địa chỉ làm việc.'}
              </p>
            </div>
          </div>

          {savedNotice && (
            <div className="px-3.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>Đã lưu thông tin hồ sơ tài khoản thành công!</span>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSaveProfile}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          <ProfileAvatarCard
            currentUser={currentUser}
            fullName={fullName}
            avatarUrl={avatarUrl}
            onAvatarUpload={handleAvatarUpload}
            onResetAvatar={() => setAvatarUrl('')}
          />

          <UserProfileForm
            isCustomer={isCustomer}
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            address={address}
            setAddress={setAddress}
          />
        </form>
      </div>

      {/* KHỐI 2: DÀNH RIÊNG CHO KHÁCH HÀNG */}
      {isCustomer && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <CustomerOrderHistory
            currentUser={currentUser}
            orders={orders}
            onInspectOrder={onInspectOrder}
            navigateToPage={navigateToPage}
          />

          <FavoriteFabricsCard
            currentUser={currentUser}
            favoriteFabrics={favoriteFabrics}
            suggestedFabrics={suggestedFabrics}
            onToggleFavoriteFabric={onToggleFavoriteFabric}
            onSelectFabricAndCustomize={onSelectFabricAndCustomize}
            navigateToPage={navigateToPage}
          />
        </div>
      )}
    </section>
  );
}
