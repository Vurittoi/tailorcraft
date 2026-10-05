import React from 'react';
import { ChevronLeft, PackageCheck } from 'lucide-react';
import { NavPage } from '../types/suitTypes';

interface ProfileHeaderProps {
  navigateToPage: (targetPage: NavPage) => void;
  handleOpenOrderSummary: () => void;
}

export function ProfileHeader({
  navigateToPage,
  handleOpenOrderSummary,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-[#E5E2DC]">
      <div className="space-y-1">
        <div className="text-xs text-[#8C6D46] font-semibold tracking-wider uppercase">
          TAILOR CRAFT ANATOMICAL FITTING · HỒ SƠ SỐ ĐO ĐỘC BẢN
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#141413]">
          Hồ Sơ Số Đo Cá Nhân Của Quý Khách
        </h1>
        <p className="text-xs sm:text-sm text-[#65615B] max-w-2xl">
          Không gian tinh chỉnh 6 chỉ số giải phẫu cơ thể rộng rãi, trực quan — giúp nghệ nhân cắt rập Bespoke kiến tạo phom áo vừa vặn chuẩn xác từng milimet.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => navigateToPage('configurator')}
          className="px-4 py-2.5 text-xs font-semibold border border-[#D8D4CC] bg-white text-[#141413] rounded-lg hover:border-[#141413] transition-all cursor-pointer flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Quay lại Thiết kế 2D</span>
        </button>
        <button
          type="button"
          onClick={handleOpenOrderSummary}
          className="px-5 py-2.5 text-xs font-semibold bg-[#141413] text-white rounded-lg hover:bg-[#2A2826] transition-all cursor-pointer flex items-center gap-2 shadow-xs"
        >
          <PackageCheck className="w-4 h-4" />
          <span>Hoàn Tất & Tạo Đơn Đặt May</span>
        </button>
      </div>
    </div>
  );
}
