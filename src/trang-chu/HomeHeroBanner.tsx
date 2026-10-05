import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Ruler, Scissors } from 'lucide-react';
import { NavPage } from '../types/suitTypes';
import hockertyHeroBanner from '../assets/images/hockerty_hero_banner_1790427448432.jpg';
import heroSavileAtelier from '../assets/images/hero_savile_atelier_1790569032837.jpg';
import heroTuxedoEvening from '../assets/images/hero_tuxedo_evening_1790569044737.jpg';
import heroCashmereLounge from '../assets/images/hero_cashmere_lounge_1790569057247.jpg';

interface HomeHeroBannerProps {
  navigateToPage: (targetPage: NavPage) => void;
}

const HERO_IMAGES: string[] = [
  hockertyHeroBanner,
  heroSavileAtelier,
  heroTuxedoEvening,
  heroCashmereLounge,
];

export function HomeHeroBanner({ navigateToPage }: HomeHeroBannerProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Tự động chuyển slide sau mỗi 3 giây
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[540px] sm:min-h-[640px] lg:min-h-[78vh] flex items-end overflow-hidden bg-[#141413] select-none">
      {/* Hoạt ảnh chuyển slide tự động kết hợp fade-in/fade-out và trượt sang trái mượt mà */}
      <AnimatePresence initial={false}>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: '18%', scale: 1.04 }}
          animate={{ opacity: 1, x: '0%', scale: 1 }}
          exit={{ opacity: 0, x: '-18%', scale: 1.02 }}
          transition={{
            opacity: { duration: 0.85, ease: 'easeInOut' },
            x: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 1.1, ease: 'easeOut' },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={HERO_IMAGES[activeIndex]}
            alt="Tailor Craft — Tuyệt Tác May Đo Độc Bản"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Nội dung Slogan & CTA cố định */}
      <div className="relative z-10 max-w-[1380px] w-full mx-auto px-6 sm:px-10 pb-12 sm:pb-16 pt-28">
        <div className="max-w-2xl space-y-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#EAD8B8]">
            TAILOR CRAFT · SAVILE ROW ATELIER
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.08]">
            Tuyệt Tác Suit Độc Bản
          </h1>
          <p className="text-sm sm:text-lg font-medium text-white/95 leading-relaxed max-w-xl">
            Định hình phong thái quý ông qua từng đường cắt Savile Row chuẩn xác
            theo số đo và khí chất của riêng bạn.
          </p>
          <div className="pt-3 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => navigateToPage('configurator')}
              className="px-7 py-3.5 text-xs sm:text-sm font-semibold bg-white text-[#141413] rounded-lg hover:bg-[#F9F8F6] transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-lg active:scale-[0.99] flex items-center gap-2 cursor-pointer"
            >
              <Scissors className="w-4 h-4" />
              <span>Bắt Đầu Thiết Kế Suit 2D</span>
            </button>
            <button
              type="button"
              onClick={() => navigateToPage('measurements')}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold bg-black/35 backdrop-blur-xs border border-white/70 text-white rounded-lg hover:bg-white/20 transition-all duration-300 ease-out hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
            >
              <Ruler className="w-4 h-4" />
              <span>Hồ Sơ Số Đo Cá Nhân</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
