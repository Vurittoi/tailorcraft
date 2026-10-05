import React from 'react';
import { UserCheck } from 'lucide-react';
import {
  formatVND,
  TailoringOrderRecord,
  UserAccount,
} from '../types/suitTypes';

interface SupervisorTailorAssignProps {
  orders: TailoringOrderRecord[];
  filteredOrders: TailoringOrderRecord[];
  tailorAccounts: UserAccount[];
  tailorFilterId: string;
  setTailorFilterId: (tailorId: string) => void;
  handleAssignTailor: (order: TailoringOrderRecord, tailorId: string) => void;
}

export function SupervisorTailorAssign({
  orders,
  filteredOrders,
  tailorAccounts,
  tailorFilterId,
  setTailorFilterId,
  handleAssignTailor,
}: SupervisorTailorAssignProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Cột trái (4 cột): Thống kê tải công việc của từng Thợ May */}
      <div className="lg:col-span-4 bg-white border border-[#E5E2DC] rounded-2xl p-5 space-y-4">
        <div className="border-b border-[#EAE7E1] pb-3">
          <h2 className="font-display text-xl font-bold text-[#141413]">
            Phân Công Theo Thợ May
          </h2>
          <p className="text-xs text-[#65615B]">
            Bấm chọn thợ may để lọc danh sách đơn hàng mà thợ đó đang phụ trách
          </p>
        </div>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => setTailorFilterId('ALL')}
            className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
              tailorFilterId === 'ALL'
                ? 'border-[#141413] bg-[#F9F8F6] font-semibold'
                : 'border-[#E5E2DC] bg-white hover:border-[#8C6D46]'
            }`}
          >
            <span className="text-xs text-[#141413]">
              Tất cả thợ may trong xưởng
            </span>
            <span className="font-mono-tabular text-xs font-bold text-[#8C6D46]">
              {orders.length} đơn
            </span>
          </button>

          {tailorAccounts.map((tailor) => {
            const count = orders.filter(
              (o) => o.assignedTailorId === tailor.id
            ).length;
            const isSelected = tailorFilterId === tailor.id;
            return (
              <button
                key={tailor.id}
                type="button"
                onClick={() => setTailorFilterId(tailor.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all space-y-1 cursor-pointer ${
                  isSelected
                    ? 'border-2 border-[#141413] bg-[#FAF8F5]'
                    : 'border-[#E5E2DC] bg-white hover:border-[#8C6D46]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#141413]">
                    {tailor.fullName}
                  </span>
                  <span className="font-mono-tabular text-xs font-bold text-[#8C6D46]">
                    {count} đơn phụ trách
                  </span>
                </div>
                <div className="text-[11px] text-[#65615B]">
                  @{tailor.username} · {tailor.specialty}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cột phải (8 cột): Danh sách đơn hàng & Giao thợ may phụ trách từng đơn */}
      <div className="lg:col-span-8 bg-white border border-[#E5E2DC] rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE7E1] pb-3">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#141413]">
              Danh Sách Đơn Hàng & Giao Thợ Phụ Trách
            </h2>
            <p className="text-xs text-[#65615B]">
              Chọn thợ may phụ trách cho từng đơn hàng và giám sát tiến độ chế
              tác tại xưởng
            </p>
          </div>
          <span className="font-mono-tabular text-xs font-bold text-[#8C6D46]">
            Hiển thị {filteredOrders.length} đơn hàng
          </span>
        </div>

        <div className="space-y-4">
          {filteredOrders.map((ord) => (
            <div
              key={ord.orderId}
              className="p-5 rounded-xl border border-[#E5E2DC] bg-[#F9F8F6] space-y-4"
            >
              <div className="space-y-2 text-left">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono-tabular font-bold text-[#8C6D46]">
                    Mã đơn: #{ord.orderId}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#65615B]">
                    Ngày đặt: {ord.createdAt}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#141413] font-medium">
                    Khách hàng: {ord.customerName || 'Nguyễn Văn An'}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#141413]">
                  Suit {ord.config.fabricName} ({ord.config.fabricCode})
                </h3>

                <div className="text-xs text-[#57534E]">
                  Cấu hình: {ord.config.lapelName} · {ord.config.buttonName} ·{' '}
                  {ord.config.pocketName} · Dự kiến giao:{' '}
                  {ord.estimatedDelivery}
                </div>

                <div className="pt-1 space-y-0.5 text-left">
                  <div className="font-mono-tabular text-base font-bold text-[#141413]">
                    {formatVND(ord.totalPrice)}
                  </div>
                  <div className="text-[11px] text-[#8C6D46] font-medium">
                    {ord.status}
                  </div>
                </div>
              </div>

              {/* Khung Giao Thợ May Phụ Trách Đơn Hàng Này */}
              <div className="p-3.5 rounded-xl bg-white border border-[#EAE7E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <UserCheck className="w-4 h-4 text-[#8C6D46] shrink-0" />
                  <div>
                    <span className="text-[#65615B]">
                      Thợ may đang phụ trách đơn #{ord.orderId}:{' '}
                    </span>
                    <strong className="text-[#141413]">
                      {ord.assignedTailorName || 'Chưa phân công'}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#141413] whitespace-nowrap">
                    Giao cho thợ:
                  </span>
                  <select
                    value={ord.assignedTailorId || ''}
                    onChange={(e) => handleAssignTailor(ord, e.target.value)}
                    className="px-3 py-1.5 text-xs bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg font-semibold text-[#141413] focus:outline-none focus:border-[#141413] cursor-pointer"
                  >
                    <option value="">-- Chọn thợ may phụ trách --</option>
                    {tailorAccounts.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.fullName} (@{t.username})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
