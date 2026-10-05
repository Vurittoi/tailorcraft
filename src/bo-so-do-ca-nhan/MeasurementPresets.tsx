import React from 'react';
import { Check } from 'lucide-react';
import { BodyMeasurements, DEFAULT_PRESETS } from '../types/suitTypes';

interface MeasurementPresetsProps {
  measurements: BodyMeasurements;
  setMeasurements: React.Dispatch<React.SetStateAction<BodyMeasurements>>;
  selectedPresetKey: string;
  setSelectedPresetKey: React.Dispatch<React.SetStateAction<string>>;
}

export function MeasurementPresets({
  measurements,
  setMeasurements,
  selectedPresetKey,
  setSelectedPresetKey,
}: MeasurementPresetsProps) {
  return (
    <div className="bg-[#F1EFEA] border border-[#E2DFD7] rounded-2xl p-5 sm:p-7 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#141413]">
            Phương Thức Thiết Lập Số Đo
          </h2>
          <p className="text-xs text-[#65615B] mt-0.5">
            Lựa chọn nhanh từ bộ phom chuẩn Quý Ông Á Đông hoặc tự điều chỉnh từng thông số riêng biệt của bạn.
          </p>
        </div>

        <div className="inline-grid grid-cols-2 gap-1.5 p-1.5 bg-white border border-[#E2DFD7] rounded-xl shrink-0">
          <button
            type="button"
            onClick={() => {
              const preset = DEFAULT_PRESETS[selectedPresetKey];
              setMeasurements({
                mode: 'default',
                ...preset,
              });
            }}
            className={`py-2.5 px-4 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              measurements.mode === 'default'
                ? 'bg-[#141413] text-white shadow-xs'
                : 'text-[#65615B] hover:text-[#141413]'
            }`}
          >
            Dùng bộ số đo chuẩn
          </button>
          <button
            type="button"
            onClick={() =>
              setMeasurements((prev) => ({
                ...prev,
                mode: 'custom',
                profileName: 'Số đo cá nhân tùy chỉnh riêng',
              }))
            }
            className={`py-2.5 px-4 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              measurements.mode === 'custom'
                ? 'bg-[#141413] text-white shadow-xs'
                : 'text-[#65615B] hover:text-[#141413]'
            }`}
          >
            Tự nhập số đo mới
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(DEFAULT_PRESETS).map(([key, preset]) => {
          const isSelected =
            measurements.mode === 'default' && selectedPresetKey === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => {
                setSelectedPresetKey(key);
                setMeasurements({
                  mode: 'default',
                  ...preset,
                });
              }}
              className={`group p-5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-white border-[#141413] shadow-md ring-1 ring-[#141413]/10'
                  : 'bg-white/75 border-[#DCD7CD] hover:bg-white hover:border-[#9E7B4F]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#8C6D46] font-semibold">
                    {key.replace('_', ' ').toUpperCase()}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#141413] mt-0.5">
                    {preset.profileName}
                  </h3>
                </div>
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                    isSelected
                      ? 'bg-[#141413] border-[#141413] text-white'
                      : 'border-[#D8D4CC] text-transparent group-hover:border-[#8C6D46]'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#EAE7E1] font-mono-tabular text-xs">
                <div>
                  <span className="text-[#65615B] block text-[10px]">
                    Ngực / Eo
                  </span>
                  <strong className="text-[#141413]">
                    {preset.chestCm}/{preset.waistCm}cm
                  </strong>
                </div>
                <div>
                  <span className="text-[#65615B] block text-[10px]">
                    Vai / Tay
                  </span>
                  <strong className="text-[#141413]">
                    {preset.shoulderCm}/{preset.sleeveCm}cm
                  </strong>
                </div>
                <div>
                  <span className="text-[#65615B] block text-[10px]">
                    Cao / Nặng
                  </span>
                  <strong className="text-[#8C6D46]">
                    {preset.heightCm}cm · {preset.weightKg}kg
                  </strong>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
