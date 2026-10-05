import React from 'react';
import { Check, PackageCheck } from 'lucide-react';
import { BodyMeasurements, NavPage } from '../types/suitTypes';
import { MeasureFieldKey } from './MeasurementSliderCard';

interface MeasurementBlueprintSVGProps {
  measurements: BodyMeasurements;
  activeMeasureField: MeasureFieldKey;
  savedMeasurementToast: boolean;
  setSavedMeasurementToast: React.Dispatch<React.SetStateAction<boolean>>;
  navigateToPage: (targetPage: NavPage) => void;
  handleOpenOrderSummary: () => void;
}

export function MeasurementBlueprintSVG({
  measurements,
  activeMeasureField,
  savedMeasurementToast,
  setSavedMeasurementToast,
  navigateToPage,
  handleOpenOrderSummary,
}: MeasurementBlueprintSVGProps) {
  return (
    <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
      <div className="bg-[#141413] text-[#F9F8F6] rounded-2xl p-6 space-y-5 shadow-lg">
        <div className="flex items-center justify-between border-b border-white/15 pb-4">
          <div>
            <span className="text-[11px] font-mono-tabular uppercase tracking-widest text-[#D4AF37]">
              TAILOR CRAFT BLUEPRINT
            </span>
            <h3 className="font-display text-2xl font-bold text-white mt-0.5">
              Sơ Đồ Vị Trí Đo Trực Quan
            </h3>
          </div>
          <span className="text-xs font-mono-tabular px-2.5 py-1 rounded bg-white/10 text-[#EAD8B8]">
            Drop: {Math.round(measurements.chestCm - measurements.waistCm)} cm
          </span>
        </div>

        <div className="relative bg-[#1E1D1B] border border-white/10 rounded-xl p-4 flex flex-col items-center">
          <svg
            viewBox="0 0 320 380"
            className="w-full max-w-[290px] h-auto select-none"
          >
            <defs>
              <pattern
                id="tailorGrid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="320" height="380" fill="url(#tailorGrid)" />

            <g
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.8"
              fill="rgba(212,175,55,0.06)"
            >
              <path d="M142,40 L178,40 L184,58 L238,76 L256,225 L230,228 L216,120 L210,275 L110,275 L104,120 L90,228 L64,225 L82,76 L136,58 Z" />
              <path
                d="M142,58 L160,150 L178,58"
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeDasharray="3 3"
              />
              <line
                x1="160"
                y1="25"
                x2="160"
                y2="345"
                stroke="rgba(255,255,255,0.18)"
                strokeDasharray="4 4"
              />
            </g>

            <g
              opacity={activeMeasureField === 'shoulderCm' ? 1 : 0.45}
              className="transition-opacity duration-300"
            >
              <path
                d="M82,74 Q160,62 238,74"
                fill="none"
                stroke="#D4AF37"
                strokeWidth={activeMeasureField === 'shoulderCm' ? 3 : 1.5}
              />
              <circle cx="82" cy="74" r="4" fill="#D4AF37" />
              <circle cx="238" cy="74" r="4" fill="#D4AF37" />
              <text
                x="160"
                y="54"
                textAnchor="middle"
                fill="#EAD8B8"
                fontSize="11"
                fontFamily="monospace"
              >
                Vai: {measurements.shoulderCm}cm
              </text>
            </g>

            <g
              opacity={activeMeasureField === 'chestCm' ? 1 : 0.45}
              className="transition-opacity duration-300"
            >
              <ellipse
                cx="160"
                cy="128"
                rx="55"
                ry="12"
                fill="none"
                stroke="#38BDF8"
                strokeWidth={activeMeasureField === 'chestCm' ? 3 : 1.5}
              />
              <text
                x="160"
                y="123"
                textAnchor="middle"
                fill="#BAE6FD"
                fontSize="11"
                fontFamily="monospace"
              >
                Ngực: {measurements.chestCm}cm
              </text>
            </g>

            <g
              opacity={activeMeasureField === 'waistCm' ? 1 : 0.45}
              className="transition-opacity duration-300"
            >
              <ellipse
                cx="160"
                cy="192"
                rx="48"
                ry="10"
                fill="none"
                stroke="#34D399"
                strokeWidth={activeMeasureField === 'waistCm' ? 3 : 1.5}
              />
              <text
                x="160"
                y="187"
                textAnchor="middle"
                fill="#A7F3D0"
                fontSize="11"
                fontFamily="monospace"
              >
                Eo: {measurements.waistCm}cm
              </text>
            </g>

            <g
              opacity={activeMeasureField === 'sleeveCm' ? 1 : 0.45}
              className="transition-opacity duration-300"
            >
              <line
                x1="244"
                y1="76"
                x2="262"
                y2="225"
                stroke="#F472B6"
                strokeWidth={activeMeasureField === 'sleeveCm' ? 3 : 1.5}
              />
              <circle cx="244" cy="76" r="3.5" fill="#F472B6" />
              <circle cx="262" cy="225" r="3.5" fill="#F472B6" />
              <text
                x="275"
                y="155"
                textAnchor="start"
                fill="#FBCFE8"
                fontSize="10"
                fontFamily="monospace"
              >
                Tay {measurements.sleeveCm}
              </text>
            </g>

            <g
              opacity={
                activeMeasureField === 'heightCm' ||
                activeMeasureField === 'weightKg'
                  ? 1
                  : 0.45
              }
              className="transition-opacity duration-300"
            >
              <line
                x1="36"
                y1="32"
                x2="36"
                y2="335"
                stroke="#EAD8B8"
                strokeWidth="2"
              />
              <line
                x1="30"
                y1="32"
                x2="42"
                y2="32"
                stroke="#EAD8B8"
                strokeWidth="2"
              />
              <line
                x1="30"
                y1="335"
                x2="42"
                y2="335"
                stroke="#EAD8B8"
                strokeWidth="2"
              />
              <text
                x="46"
                y="315"
                fill="#EAD8B8"
                fontSize="11"
                fontFamily="monospace"
              >
                Cao: {measurements.heightCm}cm · Nặng: {measurements.weightKg}kg
              </text>
            </g>
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-2.5 pt-1 text-xs font-mono-tabular">
          <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
            <span className="text-white/60 block text-[10px]">Vòng ngực</span>
            <strong className="text-white text-sm">
              {measurements.chestCm} cm
            </strong>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
            <span className="text-white/60 block text-[10px]">Vòng eo</span>
            <strong className="text-white text-sm">
              {measurements.waistCm} cm
            </strong>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
            <span className="text-white/60 block text-[10px]">Rộng vai</span>
            <strong className="text-white text-sm">
              {measurements.shoulderCm} cm
            </strong>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
            <span className="text-white/60 block text-[10px]">Dài tay</span>
            <strong className="text-white text-sm">
              {measurements.sleeveCm} cm
            </strong>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
            <span className="text-white/60 block text-[10px]">Chiều cao</span>
            <strong className="text-white text-sm">
              {measurements.heightCm} cm
            </strong>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-2.5">
            <span className="text-white/60 block text-[10px]">Cân nặng</span>
            <strong className="text-white text-sm">
              {measurements.weightKg} kg
            </strong>
          </div>
        </div>

        <div className="space-y-2.5 pt-2">
          {savedMeasurementToast && (
            <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>Đã lưu hồ sơ số đo cá nhân thành công!</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              setSavedMeasurementToast(true);
              window.setTimeout(() => setSavedMeasurementToast(false), 2500);
              navigateToPage('configurator');
            }}
            className="w-full py-3.5 px-4 text-xs font-semibold bg-white text-[#141413] rounded-xl hover:bg-[#F1EFEA] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Lưu Hồ Sơ Số Đo & Quay Lại Thiết Kế 2D</span>
          </button>
          <button
            type="button"
            onClick={handleOpenOrderSummary}
            className="w-full py-3.5 px-4 text-xs font-semibold bg-[#9E7B4F] text-white rounded-xl hover:bg-[#8C6D46] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <PackageCheck className="w-4 h-4" />
            <span>Xác Nhận Số Đo & Tiến Hành Đặt May Ngay</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
