import React from 'react';
import { PackageCheck, Ruler } from 'lucide-react';
import { SuitConfigState } from '../suitCanvasEngine';
import { BodyMeasurements, formatVND, NavPage } from '../types/suitTypes';

interface ConfiguratorFooterProps {
  config: SuitConfigState;
  measurements: BodyMeasurements;
  styleAddonPrice: number;
  totalEstimatedPrice: number;
  navigateToPage: (targetPage: NavPage) => void;
  handleOpenOrderSummary: () => void;
}

export function ConfiguratorFooter({
  config,
  measurements,
  styleAddonPrice,
  totalEstimatedPrice,
  navigateToPage,
  handleOpenOrderSummary,
}: ConfiguratorFooterProps) {
  return (
    <div className="shrink-0 pt-4 mt-3 border-t border-[#E5E2DC] bg-white">
      <div className="space-y-1.5 text-xs text-[#65615B] mb-3.5">
        <div className="flex items-center justify-between">
          <span>Giá vải ({config.fabricName}):</span>
          <span className="font-mono-tabular font-medium text-[#141413]">
            {formatVND(config.fabricPrice)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>
            Phụ phí kiểu dáng ({config.lapelId === 'peak' ? 'Cổ nhọn, ' : ''}
            {config.buttonName}):
          </span>
          <span className="font-mono-tabular font-medium text-[#141413]">
            +{formatVND(styleAddonPrice)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Hồ sơ số đo hiện tại:</span>
          <button
            type="button"
            onClick={() => navigateToPage('measurements')}
            className="font-medium text-[#8C6D46] hover:underline cursor-pointer"
          >
            Ngực {measurements.chestCm} · Eo {measurements.waistCm} · Vai{' '}
            {measurements.shoulderCm}cm
          </button>
        </div>
      </div>

      <div className="flex items-baseline justify-between bg-[#F9F8F6] border border-[#E2DFD7] px-4 py-3 rounded-lg mb-4">
        <span className="text-xs font-semibold text-[#141413]">
          TỔNG CHI PHÍ TẠM TÍNH:
        </span>
        <span className="font-mono-tabular text-2xl font-bold text-[#8C6D46]">
          {formatVND(totalEstimatedPrice)}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => navigateToPage('measurements')}
          className="w-full py-3 px-4 text-xs font-semibold border border-[#141413] text-[#141413] rounded-lg hover:bg-[#F1EFEA] transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <Ruler className="w-4 h-4" />
          <span>Tiếp tục đặt may</span>
        </button>
        <button
          type="button"
          onClick={handleOpenOrderSummary}
          className="w-full py-3 px-4 text-xs font-semibold bg-[#141413] text-[#F9F8F6] rounded-lg hover:bg-[#2A2826] transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <PackageCheck className="w-4 h-4" />
          <span>Tạo Đơn Đặt May</span>
        </button>
      </div>
    </div>
  );
}
