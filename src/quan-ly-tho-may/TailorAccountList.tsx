import React from 'react';
import { Scissors } from 'lucide-react';
import {
  NavPage,
  TailoringOrderRecord,
  UserAccount,
} from '../types/suitTypes';
import { TailorAccountCard } from './TailorAccountCard';

interface TailorAccountListProps {
  tailorList: UserAccount[];
  orders: TailoringOrderRecord[];
  onToggleAccountStatus: (accountId: string) => void;
  onDeleteAccount: (accountId: string) => void;
  navigateToPage: (targetPage: NavPage) => void;
}

export function TailorAccountList({
  tailorList,
  orders,
  onToggleAccountStatus,
  onDeleteAccount,
  navigateToPage,
}: TailorAccountListProps) {
  return (
    <div className="lg:col-span-7 bg-white border border-[#E5E2DC] rounded-2xl p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE7E1] pb-4">
        <div className="flex items-center gap-2.5">
          <Scissors className="w-5 h-5 text-[#8C6D46]" />
          <div>
            <h2 className="font-display text-2xl font-bold text-[#141413]">
              Danh Sách Tài Khoản Thợ May ({tailorList.length})
            </h2>
            <p className="text-xs text-[#65615B]">
              Quản lý danh sách nghệ nhân tại xưởng và theo dõi số lượng đơn hàng đang phụ trách
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigateToPage('tailor_dashboard')}
          className="px-3.5 py-2 text-xs font-semibold bg-[#F4F2ED] text-[#141413] border border-[#D8D4CC] rounded-lg hover:border-[#141413] cursor-pointer"
        >
          Đến Giám sát xưởng để giao việc →
        </button>
      </div>

      <div className="space-y-3.5">
        {tailorList.map((tailor) => {
          const assignedOrders = orders.filter(
            (o) => o.assignedTailorId === tailor.id
          );

          return (
            <TailorAccountCard
              key={tailor.id}
              tailor={tailor}
              assignedOrders={assignedOrders}
              onToggleAccountStatus={onToggleAccountStatus}
              onDeleteAccount={onDeleteAccount}
            />
          );
        })}
      </div>
    </div>
  );
}
