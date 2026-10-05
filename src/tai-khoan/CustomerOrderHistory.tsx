import React from 'react';
import { Package, ShoppingBag } from 'lucide-react';
import {
  formatVND,
  NavPage,
  TailoringOrderRecord,
  UserAccount,
} from '../types/suitTypes';

interface CustomerOrderHistoryProps {
  currentUser: UserAccount;
  orders: TailoringOrderRecord[];
  onInspectOrder: (order: TailoringOrderRecord) => void;
  navigateToPage: (targetPage: NavPage) => void;
}

export function CustomerOrderHistory({
  currentUser,
  orders,
  onInspectOrder,
  navigateToPage,
}: CustomerOrderHistoryProps) {
  return (
    <div className="lg:col-span-6 bg-white border border-[#E5E2DC] rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-[#EAE7E1] pb-4">
        <div className="flex items-center gap-2.5">
          <Package className="w-5 h-5 text-[#8C6D46]" />
          <div>
            <h2 className="font-display text-2xl font-bold text-[#141413]">
              Trang Phục Đã Từng Đặt May ({orders.length})
            </h2>
            <p className="text-xs text-[#65615B]">
              Lịch sử các đơn hàng Bespoke Suit của riêng tài khoản @
              {currentUser.username}
            </p>
          </div>
        </div>

        {orders.length > 0 && (
          <button
            type="button"
            onClick={() => navigateToPage('orders')}
            className="text-xs font-semibold text-[#8C6D46] hover:text-[#141413] underline cursor-pointer shrink-0"
          >
            Xem tiến độ chi tiết →
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="p-8 text-center bg-[#F9F8F6] rounded-xl border border-[#EAE7E1] space-y-3">
          <ShoppingBag className="w-8 h-8 text-[#8C6D46] mx-auto" />
          <div className="text-sm font-semibold text-[#141413]">
            Tài khoản của quý khách chưa có đơn đặt may nào
          </div>
          <p className="text-xs text-[#65615B]">
            Hãy bắt đầu thiết kế bộ Suit 2D đầu tiên mang dấu ấn cá nhân của quý
            khách.
          </p>
          <button
            type="button"
            onClick={() => navigateToPage('configurator')}
            className="px-4 py-2 text-xs font-semibold bg-[#141413] text-white rounded-lg cursor-pointer"
          >
            Bắt đầu Thiết kế Suit 2D
          </button>
        </div>
      ) : (
        <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
          {orders.map((ord) => (
            <div
              key={ord.orderId}
              className="p-4 rounded-xl border border-[#E5E2DC] bg-[#F9F8F6] space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono-tabular font-bold text-[#8C6D46]">
                    Mã đơn: #{ord.orderId}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#65615B]">{ord.createdAt}</span>
                </div>
                <span className="font-mono-tabular text-sm font-bold text-[#141413]">
                  {formatVND(ord.totalPrice)}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#141413]">
                    Suit Tailor Craft {ord.config.fabricName}
                  </h3>
                  <div className="text-xs text-[#65615B]">
                    Mã vải: {ord.config.fabricCode} · {ord.config.lapelName} ·{' '}
                    {ord.config.buttonName} · {ord.config.pocketName}
                  </div>
                  <div className="text-[11px] text-[#8C6D46] font-medium mt-1">
                    Trạng thái: {ord.status}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onInspectOrder(ord)}
                  className="px-3 py-1.5 text-xs font-semibold bg-white border border-[#D8D4CC] text-[#141413] rounded-lg hover:border-[#141413] shrink-0 cursor-pointer"
                >
                  Xem phiếu may
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
