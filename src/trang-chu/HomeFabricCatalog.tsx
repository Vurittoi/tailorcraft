import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import {
  FABRIC_CATALOG,
  FabricOption,
  getHighResFabricSwatchUrl,
  getSmallPreviewSwatchUrl,
} from '../fabricCatalogData';
import { SuitConfigState } from '../suitCanvasEngine';
import { formatVND, NavPage } from '../types/suitTypes';

interface HomeFabricCatalogProps {
  config: SuitConfigState;
  navigateToPage: (targetPage: NavPage) => void;
  handleSelectFabric: (fabric: FabricOption) => void;
}

export function HomeFabricCatalog({
  config,
  navigateToPage,
  handleSelectFabric,
}: HomeFabricCatalogProps) {
  const [showAllHomeFabrics, setShowAllHomeFabrics] = useState<boolean>(false);

  const renderFabricCard = (fab: FabricOption) => (
    <div
      key={fab.id}
      onClick={() => {
        handleSelectFabric(fab);
        navigateToPage('configurator');
      }}
      className="group bg-white border border-[#E5E2DC] rounded-xl p-3.5 hover:border-[#141413] transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div
          className="relative w-full h-20 rounded-lg mb-2.5 border border-black/10 overflow-hidden transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          style={{ backgroundColor: fab.colorHex }}
        >
          <img
            src={
              config.fabricId === fab.id
                ? getHighResFabricSwatchUrl(fab)
                : getSmallPreviewSwatchUrl(fab)
            }
            alt={fab.name}
            loading="lazy"
            decoding="async"
            width={config.fabricId === fab.id ? 160 : 36}
            height={config.fabricId === fab.id ? 160 : 36}
            className="w-full h-full object-cover pointer-events-none select-none"
          />
          <span className="absolute top-1.5 left-1.5 text-[9px] font-semibold px-1.5 py-0.5 rounded bg-black/60 text-[#EAD8B8]">
            {fab.tierLabel}
          </span>
        </div>
        <div className="text-[11px] text-[#6E6A63] truncate">{fab.origin}</div>
        <div className="font-display text-base font-bold text-[#141413] mt-0.5 group-hover:text-[#8C6D46] transition-colors duration-300 line-clamp-1">
          {fab.name}
        </div>
      </div>
      <div className="pt-2 mt-1.5 border-t border-[#F1EFEA] flex items-center justify-between">
        <span className="font-mono-tabular text-xs font-semibold text-[#8C6D46]">
          {formatVND(fab.price)}
        </span>
        <span className="text-[10px] text-[#65615B]">{fab.weightGrams}</span>
      </div>
    </div>
  );

  return (
    <motion.div
      layout
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden bg-[#F1EFEA] border border-[#E2DFD7] rounded-2xl p-8 sm:p-12"
    >
      <motion.div
        layout
        transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
        className={`flex items-center justify-between mb-4 ${
          showAllHomeFabrics
            ? 'w-full'
            : 'w-full lg:w-[calc(50%-1.25rem)] lg:ml-auto'
        }`}
      >
        <motion.span
          layout="position"
          className="text-xs font-semibold uppercase tracking-wider text-[#8C6D46]"
        >
          BỘ SƯU TẬP {FABRIC_CATALOG.length} MẪU VẢI HOCKERTY EDITION
        </motion.span>
        <motion.button
          layout="position"
          type="button"
          onClick={() => setShowAllHomeFabrics((prev) => !prev)}
          className="text-xs font-semibold text-[#141413] hover:text-[#8C6D46] underline cursor-pointer"
        >
          {showAllHomeFabrics
            ? 'Thu gọn danh sách'
            : `Xem tất cả (${FABRIC_CATALOG.length} mẫu)`}
        </motion.button>
      </motion.div>

      <div
        className={`relative grid grid-cols-1 lg:grid-cols-12 items-center ${
          showAllHomeFabrics ? 'gap-3.5' : 'gap-10'
        }`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!showAllHomeFabrics && (
            <motion.div
              key="heritage-left-intro"
              initial={{ x: '-112%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-112%', opacity: 0 }}
              transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-5 lg:-mt-8"
            >
              <div className="text-xs text-[#8C6D46] font-semibold tracking-wider uppercase">
                TAILOR CRAFT HERITAGE · MAY ĐO THỦ CÔNG THƯỢNG HẠNG
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-[#141413] leading-[1.15]"
                style={{ textWrap: 'balance' }}
              >
                Nghệ Thuật Cắt May Bespoke Độc Bản Dành Riêng Cho Quý Ông
              </h2>
              <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
                Trải nghiệm phòng thiết kế Suit 2D trực tuyến thời gian thực,
                cho phép quý khách tự tay lựa chọn những thước vải Wool &
                Cashmere trứ danh từ Ý và Anh Quốc cùng từng chi tiết ve áo, cúc
                sừng và phom dáng độc bản.
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => navigateToPage('configurator')}
                  className="px-6 py-3 text-xs font-semibold bg-[#141413] text-[#F9F8F6] rounded-lg hover:bg-[#2B2927] transition-all duration-300 hover:scale-[1.02] inline-flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Khám Phá Phòng Tùy Chỉnh 2D</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3.5"
        >
          {FABRIC_CATALOG.slice(0, 6).map((fab) => renderFabricCard(fab))}
        </motion.div>

        <AnimatePresence mode="popLayout">
          {showAllHomeFabrics && (
            <motion.div
              key="right-half-next-6-fabrics"
              initial={{ x: '85%', opacity: 0, scale: 0.96 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: '85%', opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.56,
                delay: 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3.5"
            >
              {FABRIC_CATALOG.slice(6, 12).map((fab) => renderFabricCard(fab))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {showAllHomeFabrics && (
          <motion.div
            key="remaining-rows-3-4-plus"
            initial={{ opacity: 0, y: 28, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            transition={{
              duration: 0.56,
              delay: 0.16,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            <div className="pt-3.5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {FABRIC_CATALOG.slice(12).map((fab, idx) => (
                <motion.div
                  key={fab.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.36,
                    delay: Math.min(0.45, 0.18 + Math.floor(idx / 6) * 0.06),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {renderFabricCard(fab)}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
