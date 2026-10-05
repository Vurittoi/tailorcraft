import React from 'react';
import { Eye } from 'lucide-react';
import { formatVND, TailoringOrderRecord } from '../types/suitTypes';

interface OrderCardItemProps {
  order: TailoringOrderRecord;
  handleStartEditingOrder: (order: TailoringOrderRecord) => void;
  handleInspectExistingOrder: (order: TailoringOrderRecord) => void;
}

export function OrderCardItem({
  order: ord,
  handleStartEditingOrder,
  handleInspectExistingOrder,
}: OrderCardItemProps) {
  return (
    <div className="bg-white border border-[#E5E2DC] rounded-xl p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      <div className="lg:col-span-5 space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#65615B]">
          <span className="font-mono-tabular font-semibold text-[#141413]">
            Mã đơn: #{ord.orderId}
          </span>
          <span aria-hidden="true">·</span>
          <span>Ngày đặt: {ord.createdAt}</span>
        </div>
        <h3 className="font-display text-2xl font-bold text-[#141413]">
          Suit Tailor Craft {ord.config.fabricName}
        </h3>
        <div className="text-xs text-[#65615B]">
          {ord.config.lapelName} · {ord.config.buttonName} ·{' '}
          {ord.config.pocketName}
        </div>
        <div className="text-xs text-[#8C6D46] font-medium pt-1">
          Trạng thái: {ord.status} (Dự kiến giao: {ord.estimatedDelivery})
        </div>
      </div>

      <div className="lg:col-span-4 text-xs space-y-1 border-t lg:border-t-0 lg:border-l border-[#EAE7E1] pt-3 lg:pt-0 lg:pl-5">
        <div className="font-semibold text-[#141413] mb-1">
          Số đo cá nhân áp dụng:
        </div>
        <div className="font-mono-tabular text-[#57534E]">
          Ngực: {ord.measurements.chestCm}cm · Eo: {ord.measurements.waistCm}cm
          · Vai: {ord.measurements.shoulderCm}cm
        </div>
        <div className="font-mono-tabular text-[#57534E]">
          Dài tay: {ord.measurements.sleeveCm}cm · Cao:{' '}
          {ord.measurements.heightCm}cm · Nặng: {ord.measurements.weightKg}kg
        </div>
      </div>

      <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-2">
        <div className="font-mono-tabular text-lg font-bold text-[#8C6D46]">
          {formatVND(ord.totalPrice)}
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => handleStartEditingOrder(ord)}
            className="px-3 py-2 text-xs font-medium border border-[#D8D4CC] text-[#57534E] rounded-lg hover:border-[#141413] hover:text-[#141413] transition-colors cursor-pointer"
          >
            Sửa thông số
          </button>
          <button
            type="button"
            onClick={() => handleInspectExistingOrder(ord)}
            className="px-3.5 py-2 text-xs font-semibold bg-[#141413] text-white rounded-lg hover:bg-[#2A2826] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem Chi Tiết Phiếu May</span>
          </button>
        </div>
      </div>
    </div>
  );
}
