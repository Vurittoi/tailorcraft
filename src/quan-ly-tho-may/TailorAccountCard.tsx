import React from 'react';
import { Lock, Trash2, Unlock } from 'lucide-react';
import { TailoringOrderRecord, UserAccount } from '../types/suitTypes';

interface TailorAccountCardProps {
  tailor: UserAccount;
  assignedOrders: TailoringOrderRecord[];
  onToggleAccountStatus: (accountId: string) => void;
  onDeleteAccount: (accountId: string) => void;
}

export function TailorAccountCard({
  tailor,
  assignedOrders,
  onToggleAccountStatus,
  onDeleteAccount,
}: TailorAccountCardProps) {
  return (
    <div className="p-4 rounded-xl border border-[#E5E2DC] bg-[#F9F8F6] space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-lg font-bold text-[#141413]">
              {tailor.fullName}
            </span>
            <span className="font-mono-tabular text-xs font-bold text-[#8C6D46]">
              @{tailor.username}
            </span>
            <span className="text-[11px] font-mono-tabular text-[#65615B]">
              · Mật khẩu: {tailor.password || '123'}
            </span>
          </div>

          <div className="text-xs text-[#57534E]">
            {tailor.workshopName} · Chuyên môn:{' '}
            <strong className="text-[#141413]">{tailor.specialty}</strong>
          </div>

          <div className="text-[11px] text-[#65615B]">
            Email: {tailor.email} · ĐT: {tailor.phone} · Trạng thái:{' '}
            <strong
              className={
                tailor.status === 'ACTIVE' ? 'text-emerald-700' : 'text-red-600'
              }
            >
              {tailor.status === 'ACTIVE'
                ? 'Đang hoạt động'
                : 'Đang tạm khóa'}
            </strong>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onToggleAccountStatus(tailor.id)}
            className="px-3 py-1.5 text-xs font-medium border border-[#D8D4CC] bg-white rounded-lg hover:border-[#141413] flex items-center gap-1.5 cursor-pointer"
          >
            {tailor.status === 'ACTIVE' ? (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-700" />
                <span>Khóa TK</span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5 text-emerald-700" />
                <span>Mở khóa</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onDeleteAccount(tailor.id)}
            className="p-1.5 text-red-700 border border-red-200 bg-white rounded-lg hover:bg-red-50 cursor-pointer"
            title="Xóa tài khoản thợ may"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Danh sách đơn hàng thợ này đang phụ trách */}
      <div className="pt-2.5 border-t border-[#EAE7E1] flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-[#57534E]">
          Đơn hàng đang phụ trách ({assignedOrders.length} đơn):
        </span>
        {assignedOrders.length === 0 ? (
          <span className="text-[#8A857D] italic">
            Chưa được giao đơn hàng nào
          </span>
        ) : (
          <div className="flex flex-wrap items-center gap-1.5 font-mono-tabular">
            {assignedOrders.map((ord) => (
              <span
                key={ord.orderId}
                className="text-xs font-semibold text-[#8C6D46]"
              >
                #{ord.orderId} ({ord.config.fabricName})
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
