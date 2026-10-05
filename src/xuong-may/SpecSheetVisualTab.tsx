import React from 'react';
import { Ruler, Scissors } from 'lucide-react';
import { TailoringOrderRecord } from '../types/suitTypes';

interface SpecSheetVisualTabProps {
  selectedOrder: TailoringOrderRecord;
  specCanvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export function SpecSheetVisualTab({
  selectedOrder,
  specCanvasRef,
}: SpecSheetVisualTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      <div className="md:col-span-5 bg-[#F4F2ED] border border-[#E5E2DC] rounded-xl p-4 flex flex-col items-center">
        <div className="w-full flex items-center justify-between text-[11px] font-mono-tabular text-[#65615B] mb-2">
          <span>2D GARMENT CAD</span>
          <span>{selectedOrder.config.fabricCode}</span>
        </div>
        <canvas
          ref={specCanvasRef}
          width={360}
          height={468}
          className="w-full max-w-[260px] h-auto rounded-lg bg-[#ECE9E2]"
        />
        <div className="w-full mt-3 pt-2.5 border-t border-[#E5E2DC] text-[11px] text-[#57534E] flex items-center justify-between">
          <span>Màu Hex: {selectedOrder.config.colorHex}</span>
          <span>Kiểu dệt: {selectedOrder.config.weavePattern}</span>
        </div>
      </div>

      <div className="md:col-span-7 space-y-4">
        <div className="p-4 rounded-xl border border-[#E5E2DC] bg-[#F9F8F6] space-y-2.5">
          <div className="text-xs font-bold text-[#141413] uppercase tracking-wider flex items-center gap-1.5">
            <Scissors className="w-3.5 h-3.5 text-[#8C6D46]" />
            <span>Thông Số Cắt Rập & Phụ Liệu (Customization Spec)</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-2.5 bg-white rounded-lg border border-[#EAE7E1]">
              <div className="text-[#65615B] text-[11px]">
                Mã vải & Xuất xứ
              </div>
              <div className="font-semibold text-[#141413]">
                {selectedOrder.config.fabricName} (
                {selectedOrder.config.fabricCode})
              </div>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-[#EAE7E1]">
              <div className="text-[#65615B] text-[11px]">
                Kiểu Ve Áo (Lapel)
              </div>
              <div className="font-semibold text-[#141413]">
                {selectedOrder.config.lapelName} (
                {selectedOrder.config.lapelId})
              </div>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-[#EAE7E1]">
              <div className="text-[#65615B] text-[11px]">
                Cấu Trúc Cúc (Buttons)
              </div>
              <div className="font-semibold text-[#141413]">
                {selectedOrder.config.buttonName} (
                {selectedOrder.config.buttonId})
              </div>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-[#EAE7E1]">
              <div className="text-[#65615B] text-[11px]">
                Kiểu Túi Hông (Pockets)
              </div>
              <div className="font-semibold text-[#141413]">
                {selectedOrder.config.pocketName} (
                {selectedOrder.config.pocketId})
              </div>
            </div>
            <div className="col-span-2 p-2.5 bg-white rounded-lg border border-[#EAE7E1] flex items-center justify-between">
              <div>
                <div className="text-[#65615B] text-[11px]">
                  Thêu Monogram Cá Nhân Hóa
                </div>
                <div className="font-semibold text-[#141413]">
                  {selectedOrder.config.monogramText
                    ? `"${selectedOrder.config.monogramText}" · Chỉ: ${selectedOrder.config.monogramColor} · Kiểu: ${selectedOrder.config.monogramStyle}`
                    : 'Không yêu cầu thêu Monogram'}
                </div>
              </div>
              <span className="font-mono-tabular text-[11px] text-[#8C6D46]">
                Offset ({selectedOrder.config.monogramOffsetX || 0},{' '}
                {selectedOrder.config.monogramOffsetY || 0})
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[#E5E2DC] bg-[#F9F8F6] space-y-2.5">
          <div className="text-xs font-bold text-[#141413] uppercase tracking-wider flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-[#8C6D46]" />
            <span>
              Bảng Số Đo Giải Phẫu ({selectedOrder.measurements.profileName})
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="p-2.5 bg-white rounded-lg border border-[#EAE7E1]">
              <div className="text-[11px] text-[#65615B]">1. Vòng ngực</div>
              <div className="font-mono-tabular text-base font-bold text-[#141413]">
                {selectedOrder.measurements.chestCm} cm
              </div>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-[#EAE7E1]">
              <div className="text-[11px] text-[#65615B]">2. Vòng eo</div>
              <div className="font-mono-tabular text-base font-bold text-[#141413]">
                {selectedOrder.measurements.waistCm} cm
              </div>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-[#EAE7E1]">
              <div className="text-[11px] text-[#65615B]">3. Rộng vai</div>
              <div className="font-mono-tabular text-base font-bold text-[#141413]">
                {selectedOrder.measurements.shoulderCm} cm
              </div>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-[#EAE7E1]">
              <div className="text-[11px] text-[#65615B]">4. Dài tay áo</div>
              <div className="font-mono-tabular text-base font-bold text-[#141413]">
                {selectedOrder.measurements.sleeveCm} cm
              </div>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-[#EAE7E1]">
              <div className="text-[11px] text-[#65615B]">5. Chiều cao</div>
              <div className="font-mono-tabular text-base font-bold text-[#141413]">
                {selectedOrder.measurements.heightCm} cm
              </div>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-[#EAE7E1]">
              <div className="text-[11px] text-[#65615B]">6. Cân nặng</div>
              <div className="font-mono-tabular text-base font-bold text-[#141413]">
                {selectedOrder.measurements.weightKg} kg
              </div>
            </div>
          </div>

          <div className="text-xs text-[#57534E] pt-1">
            Lưu ý dáng người:{' '}
            <strong className="text-[#141413]">
              {selectedOrder.measurements.postureNote}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
