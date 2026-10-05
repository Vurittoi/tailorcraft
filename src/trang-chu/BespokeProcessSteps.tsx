import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Compass, Layers, Ruler, ShieldCheck } from 'lucide-react';
import { NavPage } from '../types/suitTypes';

interface BespokeProcessStepsProps {
  navigateToPage?: (targetPage: NavPage) => void;
}

interface ProcessStepItem {
  stepNumber: string;
  kicker: string;
  title: string;
  description: string;
  highlights: string[];
  ctaLabel: string;
  targetPage: NavPage;
  durationTag: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const PROCESS_STEPS: ProcessStepItem[] = [
  {
    stepNumber: '01',
    kicker: 'Cá Nhân Hóa Thiết Kế',
    title: 'Phòng Thử Đồ 2D Thời Gian Thực',
    description:
      'Quan sát trực quan sự thay đổi của chất liệu vải, họa tiết dệt, kiểu ve áo, cúc mạ vàng và chữ thêu Monogram ngay trên màn hình với độ chuẩn xác cao.',
    highlights: ['32+ mẫu vải Ý & Anh', '5 kiểu dệt bề mặt', 'Thêu tên Monogram'],
    ctaLabel: 'Trải nghiệm Phòng Thiết Kế 2D',
    targetPage: 'configurator',
    durationTag: 'Tương tác trực tiếp',
    Icon: Layers,
  },
  {
    stepNumber: '02',
    kicker: 'Số Đo Riêng Biệt',
    title: 'Hồ Sơ Giải Phẫu Học Chuẩn Xác',
    description:
      'Lưu trữ 6 chỉ số cơ thể quan trọng (vòng ngực, eo, vai, dài tay, chiều cao, cân nặng) kết hợp sơ đồ Blueprint 2D để nghệ nhân dựng rập giấy riêng cho từng khách hàng.',
    highlights: ['6 thông số giải phẫu', '3 chế độ độ ôm', 'Lưu rập cá nhân'],
    ctaLabel: 'Thiết lập Hồ Sơ Số Đo',
    targetPage: 'measurements',
    durationTag: 'Độ chính xác ±0.5 cm',
    Icon: Ruler,
  },
  {
    stepNumber: '03',
    kicker: 'Chế Tác & Bàn Giao',
    title: 'Hoàn Thiện Thủ Công Savile Row',
    description:
      'Mỗi bộ Suit được khâu canh ngực lông ngựa (Full Floating Canvas) qua 4 công đoạn Cắt, May, Kiểm định QC và Hoàn tất bởi nghệ nhân lành nghề trước khi bàn giao.',
    highlights: ['Full Floating Canvas', '4 mốc kiểm định QC', 'Bảo hành phom trọn đời'],
    ctaLabel: 'Theo dõi Tiến Độ Chế Tác',
    targetPage: 'orders',
    durationTag: 'Hoàn thiện 14 ngày',
    Icon: ShieldCheck,
  },
];

export function BespokeProcessSteps({
  navigateToPage,
}: BespokeProcessStepsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <div className="pt-8 border-t border-[#E5E2DC] space-y-10">
      {/* Header giới thiệu quy trình Bespoke */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6D46]">
            <Compass className="w-3.5 h-3.5" />
            <span>Tiêu Chuẩn May Đo Thủ Công Savile Row</span>
          </div>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold text-[#141413] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Hành Trình Kiến Tạo Bộ Suit Độc Bản Qua 3 Giai Đoạn
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#65615B] max-w-md leading-relaxed">
          Sự kết hợp giữa công nghệ mô phỏng 2D trực quan và kỹ nghệ cắt rập thủ
          công truyền thống, đảm bảo phom dáng vừa vặn tuyệt đối.
        </p>
      </div>

      {/* Thanh tiến trình kết nối 3 giai đoạn (Interactive Timeline Connector) */}
      <div className="hidden md:grid grid-cols-3 gap-8 items-center relative px-1">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#DCD7CD]" />
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#8C6D46] origin-left"
          animate={{
            width:
              hoveredIndex === 0
                ? '33.33%'
                : hoveredIndex === 1
                ? '66.66%'
                : '100%',
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />

        {PROCESS_STEPS.map((step, idx) => {
          const isActive = idx <= hoveredIndex;
          return (
            <div
              key={`timeline-node-${step.stepNumber}`}
              onMouseEnter={() => setHoveredIndex(idx)}
              className="relative z-10 flex items-center gap-3 cursor-pointer select-none"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-mono-tabular text-xs font-bold transition-all duration-200 border ${
                  idx === hoveredIndex
                    ? 'bg-[#141413] text-[#EAD8B8] border-[#141413] scale-110 shadow-sm'
                    : isActive
                    ? 'bg-[#8C6D46] text-white border-[#8C6D46]'
                    : 'bg-[#F8F7F4] text-[#65615B] border-[#CFCBC2]'
                }`}
              >
                {step.stepNumber}
              </div>
              <span
                className={`text-xs font-medium px-2 bg-[#F8F7F4] transition-colors duration-200 ${
                  idx === hoveredIndex
                    ? 'text-[#141413] font-semibold'
                    : 'text-[#65615B]'
                }`}
              >
                Giai đoạn {step.stepNumber} · {step.durationTag}
              </span>
            </div>
          );
        })}
      </div>

      {/* 3 Card Giai đoạn Chế tác với hiệu ứng tương tác */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {PROCESS_STEPS.map((step, idx) => {
          const isHovered = hoveredIndex === idx;
          const IconComponent = step.Icon;

          return (
            <motion.article
              key={step.stepNumber}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onClick={() => navigateToPage?.(step.targetPage)}
              className={`group relative rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-colors duration-200 cursor-pointer overflow-hidden border ${
                isHovered
                  ? 'bg-white border-[#141413] shadow-xl'
                  : 'bg-[#FDFCFB] border-[#E5E2DC] hover:border-[#8C6D46]/70 shadow-xs'
              }`}
            >
              {/* Thanh viền vàng đồng chạy mượt ở cạnh trên khi Hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8C6D46] via-[#D4B07A] to-[#141413] transition-transform duration-300 origin-left ${
                  isHovered ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />

              <div className="space-y-5">
                {/* Hàng trên: Số thứ tự Editorial & Icon chuyên môn */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-baseline gap-2.5">
                    <span
                      className={`font-display text-3xl sm:text-4xl font-bold font-mono-tabular transition-colors duration-200 ${
                        isHovered ? 'text-[#8C6D46]' : 'text-[#141413]/35'
                      }`}
                    >
                      {step.stepNumber}.
                    </span>
                    <span className="text-xs font-semibold text-[#8C6D46] tracking-wide">
                      {step.kicker}
                    </span>
                  </div>

                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 border ${
                      isHovered
                        ? 'bg-[#141413] text-[#EAD8B8] border-[#141413] scale-105'
                        : 'bg-[#F4F2ED] text-[#8C6D46] border-[#E5E2DC] group-hover:bg-[#141413] group-hover:text-[#EAD8B8]'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Tiêu đề & Nội dung mô tả */}
                <div className="space-y-2.5">
                  <h3
                    className="font-display text-2xl font-bold text-[#141413] group-hover:text-[#8C6D46] transition-colors duration-200"
                    style={{ textWrap: 'balance' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#57534E] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Chân thẻ: Thông số kỹ thuật & Nút điều hướng trực tiếp */}
              <div className="pt-6 mt-6 border-t border-[#EAE7E1] space-y-4">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#65615B]">
                  {step.highlights.map((item, i) => (
                    <React.Fragment key={item}>
                      {i > 0 && <span aria-hidden="true">·</span>}
                      <span className="font-medium text-[#141413]/85">
                        {item}
                      </span>
                    </React.Fragment>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-semibold text-[#141413] group-hover:text-[#8C6D46] transition-colors duration-200">
                  <span>{step.ctaLabel}</span>
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      isHovered
                        ? 'bg-[#141413] text-white translate-x-0.5 -translate-y-0.5'
                        : 'bg-[#F4F2ED] text-[#141413] group-hover:bg-[#141413] group-hover:text-white'
                    }`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
