import React from 'react';
import { Check } from 'lucide-react';
import { TailoringOrderRecord } from '../types/suitTypes';

interface OrderStatusTimelineProps {
  order: TailoringOrderRecord;
  fabricCode: string;
}

export function OrderStatusTimeline({
  order,
  fabricCode,
}: OrderStatusTimelineProps) {
  return (
    <div className="pt-3 border-t border-[#E2DFD7] space-y-2 text-xs">
      <div className="font-semibold text-[#8C6D46] uppercase tracking-wider text-[11px]">
        Tiến Độ Chế Tác Tại Xưởng Tailor Craft
      </div>
      <div className="p-3 rounded-lg bg-white border border-[#E2DFD7] space-y-2">
        <div className="flex items-center gap-2 text-emerald-700 font-medium">
          <Check className="w-3.5 h-3.5 shrink-0" />
          <span>1. Tiếp nhận số đo & Khóa vải {fabricCode}</span>
        </div>
        <div className="flex items-center gap-2 text-[#141413] font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#8C6D46] shrink-0" />
          <span>2. {order.status}</span>
        </div>
        <div className="flex items-center gap-2 text-[#65615B]">
          <span className="w-2 h-2 rounded-full bg-[#D8D4CC] shrink-0" />
          <span>
            3. Khâu dựng Canvas, hoàn thiện & Bàn giao (
            {order.estimatedDelivery})
          </span>
        </div>
      </div>
    </div>
  );
}
