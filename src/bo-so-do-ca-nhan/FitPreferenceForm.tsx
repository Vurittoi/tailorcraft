import React from 'react';
import { Check } from 'lucide-react';
import { BodyMeasurements } from '../types/suitTypes';

export type FitPreferenceType = 'slim' | 'classic' | 'comfort';

interface FitPreferenceFormProps {
  fitPreference: FitPreferenceType;
  setFitPreference: React.Dispatch<React.SetStateAction<FitPreferenceType>>;
  measurements: BodyMeasurements;
  setMeasurements: React.Dispatch<React.SetStateAction<BodyMeasurements>>;
}

export function FitPreferenceForm({
  fitPreference,
  setFitPreference,
  measurements,
  setMeasurements,
}: FitPreferenceFormProps) {
  return (
    <div className="bg-white border border-[#E5E2DC] rounded-2xl p-6 space-y-5">
      <div>
        <div className="text-xs font-semibold text-[#8C6D46] uppercase tracking-wider">
          TÙY CHỌN ĐỘ ÔM & ĐẶC ĐIỂM HÌNH THỂ
        </div>
        <h3 className="font-display text-2xl font-bold text-[#141413] mt-0.5">
          Độ Ôm Phom Áo (Silhouette Fit) & Ghi Chú Cắt Rập
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(
          [
            {
              id: 'slim' as const,
              title: 'Slim Fit Hiện Đại',
              desc: 'Ôm sát tôn dáng ngực và chiết eo sắc nét trẻ trung.',
              noteAddon: 'Độ ôm Slim Fit hiện đại, chiết eo gọn',
            },
            {
              id: 'classic' as const,
              title: 'Classic Bespoke',
              desc: 'Cân bằng hoàn hảo giữa phom đứng Savile Row và sự lịch lãm.',
              noteAddon: 'Độ ôm Classic Bespoke chuẩn mực Savile Row',
            },
            {
              id: 'comfort' as const,
              title: 'Comfort Tailored',
              desc: 'Nới nhẹ vòng ngực và bắp tay giúp cử động suốt ngày dài.',
              noteAddon: 'Độ ôm Comfort Tailored ưu tiên cử động thoải mái',
            },
          ] as const
        ).map((fit) => {
          const active = fitPreference === fit.id;
          return (
            <button
              key={fit.id}
              type="button"
              onClick={() => {
                setFitPreference(fit.id);
                setMeasurements((prev) => ({
                  ...prev,
                  postureNote: fit.noteAddon,
                }));
              }}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                active
                  ? 'border-[#141413] bg-[#F9F8F6] shadow-xs'
                  : 'border-[#E5E2DC] hover:border-[#9E7B4F]'
              }`}
            >
              <div className="text-xs font-bold text-[#141413] flex items-center justify-between">
                <span>{fit.title}</span>
                {active && <Check className="w-3.5 h-3.5 text-[#8C6D46]" />}
              </div>
              <p className="text-[11px] text-[#65615B] mt-1 leading-relaxed">
                {fit.desc}
              </p>
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#141413]">
          Ghi chú yêu cầu riêng dành cho Nghệ nhân cắt rập (Tùy chọn):
        </label>
        <textarea
          rows={3}
          value={measurements.postureNote}
          onChange={(e) =>
            setMeasurements((prev) => ({
              ...prev,
              postureNote: e.target.value,
            }))
          }
          placeholder="Ví dụ: Vai phải thấp hơn vai trái 0.5cm, thích tay áo lộ măng-séc sơ mi 1.2cm..."
          className="w-full px-4 py-3 text-xs border border-[#D8D4CC] rounded-xl focus:outline-none focus:border-[#141413] leading-relaxed"
        />
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            'Vai cân đối, lưng thẳng chuẩn',
            'Ngực nở thể thao, chiết eo rõ',
            'Cổ tay trái đeo đồng hồ cơ (nới măng-séc +0.5cm)',
            'Thích gấu áo che phủ vừa chuẩn hông',
          ].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() =>
                setMeasurements((prev) => ({
                  ...prev,
                  postureNote: tag,
                }))
              }
              className="px-3 py-1 text-[11px] bg-[#F1EFEA] hover:bg-[#E5E2DC] text-[#57534E] rounded-lg transition-colors cursor-pointer"
            >
              + {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
