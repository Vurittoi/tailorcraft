import React from 'react';
import { NavPage, TailoringOrderRecord } from '../types/suitTypes';
import { OrderCardItem } from './OrderCardItem';
import { OrderSummaryModal } from './OrderSummaryModal';

export { OrderSummaryModal };

interface OrderTrackingPageProps {
  orders: TailoringOrderRecord[];
  navigateToPage: (targetPage: NavPage) => void;
  handleStartEditingOrder: (order: TailoringOrderRecord) => void;
  handleInspectExistingOrder: (order: TailoringOrderRecord) => void;
}

export function OrderTrackingPage({
  orders,
  navigateToPage,
  handleStartEditingOrder,
  handleInspectExistingOrder,
}: OrderTrackingPageProps) {
  return (
    <section className="max-w-[1380px] w-full mx-auto px-4 sm:px-8 py-8 flex-1">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[#E5E2DC]">
        <div>
          <div className="text-xs text-[#8C6D46] font-medium">
            TAILOR CRAFT ATELIER CARE
          </div>
          <h1 className="font-display text-3xl font-bold text-[#141413]">
            Theo Dõi Đơn Đặt May Của Quý Khách
          </h1>
        </div>
        <button
          type="button"
          onClick={() => navigateToPage('configurator')}
          className="px-4 py-2.5 text-xs font-semibold bg-[#141413] text-white rounded-lg hover:bg-[#2A2826] transition-colors cursor-pointer"
        >
          + Thiết Kế Bộ Suit Mới
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-[#E5E2DC] rounded-xl p-10 text-center space-y-3">
          <div className="font-display text-2xl font-bold text-[#141413]">
            Tài khoản của quý khách chưa có đơn đặt may nào
          </div>
          <p className="text-xs text-[#65615B] max-w-md mx-auto">
            Mỗi tài khoản có danh sách đơn đặt may độc lập. Hãy bắt đầu thiết kế
            bộ Suit 2D đầu tiên của quý khách.
          </p>
          <button
            type="button"
            onClick={() => navigateToPage('configurator')}
            className="px-5 py-2.5 text-xs font-semibold bg-[#141413] text-white rounded-lg hover:bg-[#2A2826] transition-colors cursor-pointer"
          >
            Bắt Đầu Thiết Kế Suit 2D Ngay
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord) => (
            <OrderCardItem
              key={ord.orderId}
              order={ord}
              handleStartEditingOrder={handleStartEditingOrder}
              handleInspectExistingOrder={handleInspectExistingOrder}
            />
          ))}
        </div>
      )}
    </section>
  );
}
