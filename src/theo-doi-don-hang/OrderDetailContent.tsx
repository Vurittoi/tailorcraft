import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { SuitConfigState } from '../suitCanvasEngine';
import {
  BodyMeasurements,
  formatVND,
  NavPage,
  TailoringOrderRecord,
} from '../types/suitTypes';
import { OrderStatusTimeline } from './OrderStatusTimeline';

interface OrderDetailContentProps {
  isViewingExisting: boolean;
  selectedOrderForDetail: TailoringOrderRecord | null;
  displayConfig: SuitConfigState;
  displayMeasurements: BodyMeasurements;
  displayTotalPrice: number;
  displayAddonPrice: number;
  canvasSnapshotUrl: string;
  onClose: () => void;
  navigateToPage: (targetPage: NavPage) => void;
}

export function OrderDetailContent({
  isViewingExisting,
  selectedOrderForDetail,
  displayConfig,
  displayMeasurements,
  displayTotalPrice,
  displayAddonPrice,
  canvasSnapshotUrl,
  onClose,
  navigateToPage,
}: OrderDetailContentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Cột Trái: Hình ảnh mô phỏng & Cấu hình thiết kế */}
      <div className="md:col-span-6 bg-[#F9F8F6] border border-[#E2DFD7] rounded-xl p-4 space-y-4">
        <div className="flex items-center gap-4 pb-3.5 border-b border-[#E2DFD7]">
          {canvasSnapshotUrl ? (
            <img
              src={canvasSnapshotUrl}
              alt="Bản thiết kế Suit 2D"
              className="w-24 h-32 object-contain bg-[#EAE6DF] rounded-lg border border-[#D8D4CC] shrink-0"
            />
          ) : (
            <div
              className="w-20 h-24 rounded-lg border border-black/20 shrink-0"
              style={{ backgroundColor: displayConfig.colorHex }}
            />
          )}
          <div>
            <div className="font-mono-tabular text-[11px] text-[#8C6D46]">
              MÃ VẢI: {displayConfig.fabricCode}
            </div>
            <h3 className="font-display text-2xl font-bold text-[#141413]">
              Suit Tailor Craft {displayConfig.fabricName}
            </h3>
            <div className="text-xs text-[#65615B] mt-0.5">
              Xuất xứ: {displayConfig.fabricOrigin}
            </div>
            <div className="font-mono-tabular text-base font-bold text-[#8C6D46] mt-1.5">
              {formatVND(displayTotalPrice)}
            </div>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="font-semibold text-[#141413]">
            Chi tiết Tùy chỉnh Kiểu dáng:
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#EAE7E1]">
            <span className="text-[#65615B]">Họa tiết dệt:</span>
            <span className="font-medium text-[#141413]">
              {displayConfig.weavePattern === 'solid'
                ? 'Trơn Twill Super 130s'
                : displayConfig.weavePattern === 'herringbone'
                ? 'Vân Xương Cá'
                : displayConfig.weavePattern === 'pinstripe'
                ? 'Kẻ Sọc Pinstripe'
                : displayConfig.weavePattern === 'glen_check'
                ? 'Kẻ Ô Hoàng Gia'
                : 'Dệt Hạt Mắt Chim / Linen'}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#EAE7E1]">
            <span className="text-[#65615B]">Kiểu cổ áo:</span>
            <span className="font-medium text-[#141413]">
              {displayConfig.lapelName}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#EAE7E1]">
            <span className="text-[#65615B]">Cấu hình cúc áo:</span>
            <span className="font-medium text-[#141413]">
              {displayConfig.buttonName}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#EAE7E1]">
            <span className="text-[#65615B]">Kiểu túi hông:</span>
            <span className="font-medium text-[#141413]">
              {displayConfig.pocketName}
            </span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-[#65615B]">Thêu tên (Monogram):</span>
            <span className="font-medium text-[#141413]">
              {displayConfig.monogramText.trim() || 'Không thêu'}
            </span>
          </div>
        </div>

        {isViewingExisting && selectedOrderForDetail && (
          <OrderStatusTimeline
            order={selectedOrderForDetail}
            fabricCode={displayConfig.fabricCode}
          />
        )}
      </div>

      {/* Cột Phải: Hồ sơ số đo & Chi tiết thanh toán */}
      <div className="md:col-span-6 flex flex-col justify-between space-y-4">
        <div className="bg-[#F9F8F6] border border-[#E2DFD7] rounded-xl p-4 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#141413]">
              Số Đo Cá Nhân ({displayMeasurements.profileName})
            </span>
            {!isViewingExisting && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigateToPage('measurements');
                }}
                className="text-[#8C6D46] hover:underline font-medium cursor-pointer"
              >
                Chỉnh sửa
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5 font-mono-tabular text-xs bg-white p-3 rounded-lg border border-[#E2DFD7]">
            <div>
              <span className="text-[#65615B]">Vòng ngực:</span>{' '}
              <strong className="text-[#141413]">
                {displayMeasurements.chestCm} cm
              </strong>
            </div>
            <div>
              <span className="text-[#65615B]">Vòng eo:</span>{' '}
              <strong className="text-[#141413]">
                {displayMeasurements.waistCm} cm
              </strong>
            </div>
            <div>
              <span className="text-[#65615B]">Rộng vai:</span>{' '}
              <strong className="text-[#141413]">
                {displayMeasurements.shoulderCm} cm
              </strong>
            </div>
            <div>
              <span className="text-[#65615B]">Dài tay:</span>{' '}
              <strong className="text-[#141413]">
                {displayMeasurements.sleeveCm} cm
              </strong>
            </div>
            <div>
              <span className="text-[#65615B]">Chiều cao:</span>{' '}
              <strong className="text-[#141413]">
                {displayMeasurements.heightCm} cm
              </strong>
            </div>
            <div>
              <span className="text-[#65615B]">Cân nặng:</span>{' '}
              <strong className="text-[#141413]">
                {displayMeasurements.weightKg} kg
              </strong>
            </div>
          </div>

          {displayMeasurements.postureNote && (
            <div className="text-[11px] text-[#57534E] italic">
              Ghi chú phom dáng: "{displayMeasurements.postureNote}"
            </div>
          )}
        </div>

        {/* Bảng tổng hợp chi phí & Cam kết dịch vụ */}
        <div className="bg-white border border-[#E2DFD7] rounded-xl p-4 space-y-2.5 text-xs">
          <div className="font-semibold text-[#141413]">
            Chi Tiết Chi Phí Đặt May:
          </div>
          <div className="flex justify-between text-[#65615B]">
            <span>Giá vải tiêu chuẩn ({displayConfig.fabricName}):</span>
            <span className="font-mono-tabular text-[#141413]">
              {formatVND(displayConfig.fabricPrice)}
            </span>
          </div>
          <div className="flex justify-between text-[#65615B]">
            <span>Phụ phí kiểu dáng & phụ kiện:</span>
            <span className="font-mono-tabular text-[#141413]">
              +{formatVND(displayAddonPrice)}
            </span>
          </div>
          <div className="flex justify-between text-[#65615B]">
            <span>Dịch vụ thử đồ & Giao hàng tận nơi:</span>
            <span className="font-medium text-emerald-700">Miễn phí</span>
          </div>
          <div className="pt-2.5 border-t border-[#EAE7E1] flex items-baseline justify-between">
            <span className="font-semibold text-[#141413]">
              TỔNG THANH TOÁN:
            </span>
            <span className="font-mono-tabular text-xl font-bold text-[#8C6D46]">
              {formatVND(displayTotalPrice)}
            </span>
          </div>

          <div className="pt-2 flex items-center gap-2 text-[11px] text-[#57534E]">
            <ShieldCheck className="w-4 h-4 text-[#8C6D46] shrink-0" />
            <span>
              Bảo hành chỉnh sửa phom dáng trọn đời tại hệ thống Tailor Craft.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
