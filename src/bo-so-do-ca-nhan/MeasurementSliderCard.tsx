import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { BodyMeasurements } from '../types/suitTypes';

export type MeasureFieldKey =
  | 'chestCm'
  | 'waistCm'
  | 'shoulderCm'
  | 'sleeveCm'
  | 'heightCm'
  | 'weightKg';

export interface MeasurementFieldItem {
  field: MeasureFieldKey;
  stepNum: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  guide: string;
  standardRange: string;
}

export const MEASUREMENT_FIELDS: MeasurementFieldItem[] = [
  {
    field: 'chestCm',
    stepNum: '01',
    label: 'Chu vi vòng ngực',
    unit: 'cm',
    min: 75,
    max: 135,
    step: 0.5,
    guide:
      'Đo vòng quanh phần nở nhất của lồng ngực, thước dây giữ phẳng ngang lưng.',
    standardRange: '88 – 115 cm',
  },
  {
    field: 'waistCm',
    stepNum: '02',
    label: 'Chu vi vòng eo Suit',
    unit: 'cm',
    min: 64,
    max: 125,
    step: 0.5,
    guide:
      'Đo ngang vị trí thắt nút cúc chính của áo Suit (ngang rốn tự nhiên).',
    standardRange: '72 – 105 cm',
  },
  {
    field: 'shoulderCm',
    stepNum: '03',
    label: 'Độ rộng cầu vai',
    unit: 'cm',
    min: 38,
    max: 56,
    step: 0.5,
    guide:
      'Khoảng cách đo vòng nhẹ qua phần gồ xương bả vai từ mỏm vai trái sang phải.',
    standardRange: '42 – 51 cm',
  },
  {
    field: 'sleeveCm',
    stepNum: '04',
    label: 'Chiều dài tay áo',
    unit: 'cm',
    min: 52,
    max: 70,
    step: 0.5,
    guide:
      'Đo từ đỉnh mỏm xương cầu vai dọc theo cánh tay thả lỏng đến mắt cá cổ tay.',
    standardRange: '57 – 65 cm',
  },
  {
    field: 'heightCm',
    stepNum: '05',
    label: 'Chiều cao cơ thể',
    unit: 'cm',
    min: 150,
    max: 205,
    step: 1,
    guide:
      'Chiều cao khi đứng thẳng lưng tự nhiên không mang giày để tính độ dài thân áo.',
    standardRange: '162 – 190 cm',
  },
  {
    field: 'weightKg',
    stepNum: '06',
    label: 'Trọng lượng cơ thể',
    unit: 'kg',
    min: 45,
    max: 130,
    step: 0.5,
    guide:
      'Cân nặng hiện tại giúp nghệ nhân cân chỉnh độ ôm lồng ngực và vòng nách áo.',
    standardRange: '55 – 95 kg',
  },
];

interface MeasurementSliderCardProps {
  item: MeasurementFieldItem;
  currentVal: number;
  isFocused: boolean;
  onFocusField: (field: MeasureFieldKey) => void;
  setMeasurements: React.Dispatch<React.SetStateAction<BodyMeasurements>>;
}

export function MeasurementSliderCard({
  item,
  currentVal,
  isFocused,
  onFocusField,
  setMeasurements,
}: MeasurementSliderCardProps) {
  return (
    <div
      onMouseEnter={() => onFocusField(item.field)}
      onClick={() => onFocusField(item.field)}
      className={`p-5 rounded-2xl border transition-all duration-300 bg-white space-y-4 ${
        isFocused
          ? 'border-[#141413] shadow-md ring-1 ring-[#141413]/10'
          : 'border-[#E5E2DC] hover:border-[#9E7B4F]'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="font-mono-tabular text-[11px] font-semibold text-[#8C6D46]">
            CHỈ SỐ {item.stepNum} · KHUYẾN NGHỊ: {item.standardRange}
          </span>
          <h3 className="font-display text-xl font-bold text-[#141413] mt-0.5">
            {item.label}
          </h3>
        </div>
        <div className="font-mono-tabular text-2xl font-bold text-[#141413] bg-[#F9F8F6] border border-[#E2DFD7] px-3 py-1 rounded-lg">
          {currentVal}
          <span className="text-xs font-normal text-[#65615B] ml-1">
            {item.unit}
          </span>
        </div>
      </div>

      <div className="space-y-2.5">
        <input
          type="range"
          min={item.min}
          max={item.max}
          step={item.step}
          value={currentVal}
          onFocus={() => onFocusField(item.field)}
          onChange={(e) =>
            setMeasurements((prev) => ({
              ...prev,
              mode: 'custom',
              profileName: 'Số đo cá nhân tùy chỉnh riêng',
              [item.field]: Number(e.target.value),
            }))
          }
          className="w-full accent-[#141413] cursor-pointer h-1.5 bg-[#E5E2DC] rounded-lg"
        />

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                setMeasurements((prev) => ({
                  ...prev,
                  mode: 'custom',
                  profileName: 'Số đo cá nhân tùy chỉnh riêng',
                  [item.field]: Math.max(
                    item.min,
                    Number((prev[item.field] - item.step).toFixed(1))
                  ),
                }))
              }
              className="w-8 h-8 rounded-lg border border-[#D8D4CC] hover:border-[#141413] flex items-center justify-center text-[#141413] cursor-pointer transition-colors"
              title="Giảm chỉ số"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <input
              type="number"
              min={item.min}
              max={item.max}
              step={item.step}
              value={currentVal}
              onFocus={() => onFocusField(item.field)}
              onChange={(e) =>
                setMeasurements((prev) => ({
                  ...prev,
                  mode: 'custom',
                  profileName: 'Số đo cá nhân tùy chỉnh riêng',
                  [item.field]: Number(e.target.value),
                }))
              }
              className="w-20 px-2.5 py-1.5 text-center border border-[#D8D4CC] rounded-lg font-mono-tabular text-xs font-semibold focus:outline-none focus:border-[#141413]"
            />
            <button
              type="button"
              onClick={() =>
                setMeasurements((prev) => ({
                  ...prev,
                  mode: 'custom',
                  profileName: 'Số đo cá nhân tùy chỉnh riêng',
                  [item.field]: Math.min(
                    item.max,
                    Number((prev[item.field] + item.step).toFixed(1))
                  ),
                }))
              }
              className="w-8 h-8 rounded-lg border border-[#D8D4CC] hover:border-[#141413] flex items-center justify-center text-[#141413] cursor-pointer transition-colors"
              title="Tăng chỉ số"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-[11px] font-mono-tabular text-[#65615B]">
            Giới hạn: {item.min}–{item.max}
            {item.unit}
          </span>
        </div>
      </div>

      <p className="text-xs text-[#65615B] leading-relaxed pt-2 border-t border-[#F1EFEA]">
        {item.guide}
      </p>
    </div>
  );
}
