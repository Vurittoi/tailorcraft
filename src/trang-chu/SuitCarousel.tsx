import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FABRIC_CATALOG } from '../fabricCatalogData';
import { SuitConfigState } from '../suitCanvasEngine';
import {
  BUTTON_OPTIONS,
  formatVND,
  LAPEL_OPTIONS,
  NavPage,
  POCKET_OPTIONS,
  SuitCarouselItem,
} from '../types/suitTypes';
import suitBlackClassicImg from '../assets/images/suit_black_classic_model_1790428565063.jpg';
import suitBlackTuxedoImg from '../assets/images/suit_black_tuxedo_model_1790428495103.jpg';
import suitNavyYoungImg from '../assets/images/suit_navy_young_model_1790428473030.jpg';
import suitNavyHerringboneImg from '../assets/images/suit_navy_herringbone_model_1790428484049.jpg';
import suitCharcoalImg from '../assets/images/suit_charcoal_grey_1790428052722.jpg';
import suitWineImg from '../assets/images/suit_wine_brown_1790428066530.jpg';

const SUIT_CAROUSEL_ITEMS: SuitCarouselItem[] = [
  {
    id: 'carousel_navy_bespoke',
    title: 'Custom Suits — Vest Xanh Navy',
    subtitle: 'Vải Xanh Navy',
    suitImage: suitNavyYoungImg,
    fabric: FABRIC_CATALOG[1],
    weavePattern: 'pinstripe',
    weaveLabel: 'Kẻ Sọc Mảnh Savile Row',
    lapelId: 'peak',
    buttonId: 'double_two',
    pocketId: 'flap',
  },
  {
    id: 'carousel_black_luxury',
    title: 'Bespoke Suits — Vest Đen Luxury',
    subtitle: 'Vải Đen Luxury',
    suitImage: suitBlackClassicImg,
    fabric: FABRIC_CATALOG[0],
    weavePattern: 'solid',
    weaveLabel: 'Dệt Trơn Super 130s',
    lapelId: 'notch',
    buttonId: 'double_two',
    pocketId: 'flap',
  },
  {
    id: 'carousel_wine_cashmere',
    title: 'Wool & Cashmere — Vest Nâu Rượu',
    subtitle: 'Vải Nâu Rượu',
    suitImage: suitWineImg,
    fabric: FABRIC_CATALOG[3],
    weavePattern: 'herringbone',
    weaveLabel: 'Vân Xương Cá Cashmere',
    lapelId: 'peak',
    buttonId: 'gold_brass',
    pocketId: 'flap',
  },
  {
    id: 'carousel_charcoal_flannel',
    title: 'Tailored Blazers — Vest Xám Than',
    subtitle: 'Vải Xám Than',
    suitImage: suitCharcoalImg,
    fabric: FABRIC_CATALOG[2],
    weavePattern: 'solid',
    weaveLabel: 'Dệt Chéo Twill Flannel',
    lapelId: 'notch',
    buttonId: 'single',
    pocketId: 'flap',
  },
  {
    id: 'carousel_tuxedo_midnight',
    title: 'Tuxedos — Vest Dạ Tiệc Đen Tuyền',
    subtitle: 'Vải Đen Luxury',
    suitImage: suitBlackTuxedoImg,
    fabric: FABRIC_CATALOG[0],
    weavePattern: 'solid',
    weaveLabel: 'Lụa Pha Wool Dạ Tiệc',
    lapelId: 'peak',
    buttonId: 'single',
    pocketId: 'jetted',
  },
  {
    id: 'carousel_navy_herringbone',
    title: 'Savile Row — Vest Navy Xương Cá',
    subtitle: 'Vải Xanh Navy',
    suitImage: suitNavyHerringboneImg,
    fabric: FABRIC_CATALOG[1],
    weavePattern: 'herringbone',
    weaveLabel: 'Vân Xương Cá Anh Quốc',
    lapelId: 'notch',
    buttonId: 'gold_brass',
    pocketId: 'jetted',
  },
];

interface SuitCarouselProps {
  setConfig: React.Dispatch<React.SetStateAction<SuitConfigState>>;
  navigateToPage: (targetPage: NavPage) => void;
}

export function SuitCarousel({ setConfig, navigateToPage }: SuitCarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [carouselMotion, setCarouselMotion] = useState<'left' | 'right' | null>(
    null
  );
  const [carouselProgress, setCarouselProgress] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const motionTimeoutRef = useRef<number | null>(null);

  const handleCarouselOnScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const maxScroll = Math.max(1, scrollWidth - clientWidth);
    const progress = Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100));
    setCarouselProgress(progress);
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < maxScroll - 8);
  };

  const handleScrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = 350;

    setCarouselMotion(direction);
    if (motionTimeoutRef.current) {
      window.clearTimeout(motionTimeoutRef.current);
    }
    motionTimeoutRef.current = window.setTimeout(() => {
      setCarouselMotion(null);
    }, 480);

    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleSelectCarouselSuit = (item: SuitCarouselItem) => {
    const lapelObj =
      LAPEL_OPTIONS.find((l) => l.id === item.lapelId) || LAPEL_OPTIONS[0];
    const btnObj =
      BUTTON_OPTIONS.find((b) => b.id === item.buttonId) || BUTTON_OPTIONS[1];
    const pocketObj =
      POCKET_OPTIONS.find((p) => p.id === item.pocketId) || POCKET_OPTIONS[0];

    setConfig((prev) => ({
      ...prev,
      fabricId: item.fabric.id,
      fabricName: item.fabric.name,
      fabricCode: item.fabric.code,
      fabricOrigin: item.fabric.origin,
      colorHex: item.fabric.colorHex,
      fabricPrice: item.fabric.price,
      weavePattern: item.weavePattern,
      lapelId: lapelObj.id,
      lapelName: lapelObj.name,
      lapelPrice: lapelObj.price,
      buttonId: btnObj.id,
      buttonName: btnObj.name,
      buttonPrice: btnObj.price,
      pocketId: pocketObj.id,
      pocketName: pocketObj.name,
      pocketPrice: pocketObj.price,
    }));
    navigateToPage('configurator');
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-2">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl sm:text-[32px] font-bold tracking-tight text-[#141413]">
            Tuyệt Tác May Đo Từ Mọi Góc Nhìn
          </h2>
          <p className="text-xs sm:text-sm text-[#65615B] mt-1">
            Di chuột vào từng bộ Vest để cảm nhận cận cảnh thớ vải & sắc độ màu
            sắc — Nhấn vào thẻ để mở phòng thiết kế 2D.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#65615B]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#8C6D46]" />
          <span>Chạm hoặc di chuột (Hover) để xem mẫu vải</span>
        </div>
      </div>

      <div className="relative group/carousel">
        <button
          type="button"
          onClick={() => handleScrollCarousel('left')}
          aria-label="Cuộn sang trái"
          className={`group/btn absolute left-3 top-[44%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#141413]/80 text-white hover:bg-[#141413] backdrop-blur-md flex items-center justify-center shadow-xl transition-all duration-300 ease-out hover:scale-110 active:scale-90 cursor-pointer border border-white/15 ${
            canScrollLeft
              ? 'opacity-95 hover:shadow-2xl'
              : 'opacity-40 hover:opacity-70'
          }`}
        >
          <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover/btn:-translate-x-1" />
        </button>

        <button
          type="button"
          onClick={() => handleScrollCarousel('right')}
          aria-label="Cuộn sang phải"
          className={`group/btn absolute right-3 top-[44%] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#141413]/80 text-white hover:bg-[#141413] backdrop-blur-md flex items-center justify-center shadow-xl transition-all duration-300 ease-out hover:scale-110 active:scale-90 cursor-pointer border border-white/15 ${
            canScrollRight
              ? 'opacity-95 hover:shadow-2xl'
              : 'opacity-40 hover:opacity-70'
          }`}
        >
          <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>

        <div
          ref={carouselRef}
          onScroll={handleCarouselOnScroll}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-4 pt-1 px-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SUIT_CAROUSEL_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleSelectCarouselSuit(item)}
              style={{
                transitionDelay: carouselMotion ? `${idx * 25}ms` : '0ms',
              }}
              className={`group relative shrink-0 w-[270px] sm:w-[310px] md:w-[325px] snap-start cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                carouselMotion === 'right'
                  ? '-translate-x-2.5 -skew-x-1 scale-[0.98] shadow-xl'
                  : carouselMotion === 'left'
                  ? 'translate-x-2.5 skew-x-1 scale-[0.98] shadow-xl'
                  : 'translate-x-0 skew-x-0 scale-100 hover:-translate-y-1.5'
              }`}
            >
              <div className="relative w-full aspect-[3/4] bg-[#E5E5E5] overflow-hidden rounded-sm shadow-xs group-hover:shadow-xl transition-shadow duration-500">
                <div
                  className={`pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out ${
                    carouselMotion === 'right'
                      ? 'translate-x-full'
                      : carouselMotion === 'left'
                      ? '-translate-x-full'
                      : 'translate-x-[-150%] opacity-0'
                  }`}
                />

                <img
                  src={item.suitImage}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-top transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-0 ${
                    carouselMotion ? 'scale-[1.03]' : 'scale-100'
                  }`}
                />

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-between p-6 text-white"
                  style={{ backgroundColor: item.fabric.colorHex }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none opacity-35"
                    style={{
                      backgroundImage:
                        item.weavePattern === 'pinstripe'
                          ? 'repeating-linear-gradient(90deg, rgba(255,255,255,0.28) 0px, rgba(255,255,255,0.28) 1px, transparent 1px, transparent 14px), repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 4px)'
                          : item.weavePattern === 'herringbone'
                          ? 'repeating-linear-gradient(135deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.16) 3px, rgba(0,0,0,0.22) 3px, rgba(0,0,0,0.22) 6px), repeating-linear-gradient(45deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 4px, transparent 4px, transparent 8px)'
                          : 'repeating-linear-gradient(135deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1.5px, rgba(0,0,0,0.18) 1.5px, rgba(0,0,0,0.18) 3.5px)',
                    }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(125deg, rgba(255,255,255,0.22) 0%, rgba(0,0,0,0.35) 38%, rgba(255,255,255,0.15) 68%, rgba(0,0,0,0.55) 100%)',
                    }}
                  />

                  <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#EAD8B8]">
                      CẬN CẢNH MẪU VẢI
                    </span>
                    <span className="font-mono-tabular text-xs bg-black/35 backdrop-blur-xs px-2.5 py-1 rounded border border-white/20">
                      {item.fabric.colorHex}
                    </span>
                  </div>

                  <div className="relative z-10 my-auto mx-auto flex flex-col items-center">
                    <div
                      className="w-28 h-28 rounded-full border-2 border-[#EAD8B8]/80 shadow-2xl flex items-center justify-center relative overflow-hidden transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundColor: item.fabric.colorHex }}
                    >
                      <div
                        className="absolute inset-0 opacity-60"
                        style={{
                          backgroundImage:
                            item.weavePattern === 'pinstripe'
                              ? 'repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1.5px, transparent 1.5px, transparent 10px)'
                              : 'repeating-linear-gradient(135deg, rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.25) 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
                        }}
                      />
                      <span className="relative z-10 text-[11px] font-semibold uppercase tracking-widest bg-black/55 px-2.5 py-1 rounded text-white">
                        {item.fabric.name}
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 bg-black/45 backdrop-blur-md border border-white/20 rounded-xl p-4 space-y-1.5">
                    <div className="text-[11px] text-[#EAD8B8] font-medium">
                      MÀU VẢI ĐANG CHỌN:
                    </div>
                    <div className="font-display text-xl font-bold text-white">
                      Vải {item.fabric.name}
                    </div>
                    <div className="text-xs text-white/90">
                      {item.weaveLabel}
                    </div>
                    <div className="text-[11px] text-white/75">
                      {item.fabric.composition} · {item.fabric.origin}
                    </div>
                    <div className="pt-2 flex items-center justify-between border-t border-white/15 text-xs font-semibold text-[#EAD8B8]">
                      <span>{formatVND(item.fabric.price)}</span>
                      <span>Thiết kế mẫu này →</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-xs sm:text-[13px] font-medium text-[#141413] group-hover:text-[#8C6D46] transition-colors">
                  {item.title}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-[#65615B]">
                  <span
                    className="w-3 h-3 rounded-full border border-black/20 inline-block"
                    style={{ backgroundColor: item.fabric.colorHex }}
                  />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-[#141413]">
                    {item.fabric.name}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="relative h-1 flex-1 bg-[#E5E2DC] rounded-full overflow-hidden">
            <div
              className="absolute top-0 bottom-0 left-0 bg-[#141413] rounded-full transition-all duration-300 ease-out"
              style={{
                width: '35%',
                transform: `translateX(${(carouselProgress / 100) * 185}%)`,
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScrollCarousel('left')}
              className="text-xs font-medium text-[#65615B] hover:text-[#141413] transition-colors cursor-pointer"
            >
              ← Trái
            </button>
            <span className="text-[#D8D4CC]">|</span>
            <button
              type="button"
              onClick={() => handleScrollCarousel('right')}
              className="text-xs font-medium text-[#65615B] hover:text-[#141413] transition-colors cursor-pointer"
            >
              Phải →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
