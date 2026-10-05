import React from 'react';
import { DollarSign, Palette } from 'lucide-react';

export type AdminTabKey = 'fabrics' | 'pricing';

interface AdminTabNavigationProps {
  activeTab: AdminTabKey;
  setActiveTab: React.Dispatch<React.SetStateAction<AdminTabKey>>;
  fabricsCount: number;
}

export function AdminTabNavigation({
  activeTab,
  setActiveTab,
  fabricsCount,
}: AdminTabNavigationProps) {
  const tabs = [
    {
      id: 'fabrics' as const,
      label: '1. Thêm / Sửa / Xóa Vải',
      count: `${fabricsCount} mẫu vải`,
      icon: Palette,
    },
    {
      id: 'pricing' as const,
      label: '2. Cập Nhật Đơn Giá',
      count: 'Vải & Phụ kiện Suit',
      icon: DollarSign,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {tabs.map((tab) => {
        const IconComp = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
              isActive
                ? 'bg-[#141413] text-white border-[#141413] shadow-sm'
                : 'bg-white text-[#141413] border-[#E5E2DC] hover:border-[#8C6D46]'
            }`}
          >
            <div>
              <div className="text-xs font-bold">{tab.label}</div>
              <div className="text-[11px] font-mono-tabular opacity-75 mt-0.5">
                {tab.count}
              </div>
            </div>
            <IconComp className="w-5 h-5 text-[#8C6D46] shrink-0" />
          </button>
        );
      })}
    </div>
  );
}
