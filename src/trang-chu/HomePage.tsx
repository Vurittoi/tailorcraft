import React from 'react';
import { motion } from 'motion/react';
import { FabricOption } from '../fabricCatalogData';
import { SuitConfigState } from '../suitCanvasEngine';
import { NavPage } from '../types/suitTypes';
import { HomeHeroBanner } from './HomeHeroBanner';
import { SuitCarousel } from './SuitCarousel';
import { HomeFabricCatalog } from './HomeFabricCatalog';
import { BespokeProcessSteps } from './BespokeProcessSteps';

interface HomePageProps {
  config: SuitConfigState;
  setConfig: React.Dispatch<React.SetStateAction<SuitConfigState>>;
  navigateToPage: (targetPage: NavPage) => void;
  handleSelectFabric: (fabric: FabricOption) => void;
}

export function HomePage({
  config,
  setConfig,
  navigateToPage,
  handleSelectFabric,
}: HomePageProps) {
  return (
    <div className="space-y-16 pb-8">
      {/* 1. Banner chính full-bleed với slogan & nút CTA */}
      <HomeHeroBanner navigateToPage={navigateToPage} />

      {/* 2. Băng chuyền mẫu Suit 2D tương tác (Cận cảnh thớ vải) */}
      <SuitCarousel setConfig={setConfig} navigateToPage={navigateToPage} />

      {/* 3 & 4. Bộ sưu tập Vải & Quy trình 3 bước Bespoke Savile Row với hiệu ứng whileInView */}
      <section className="max-w-[1380px] mx-auto px-4 sm:px-8 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <HomeFabricCatalog
            config={config}
            navigateToPage={navigateToPage}
            handleSelectFabric={handleSelectFabric}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <BespokeProcessSteps navigateToPage={navigateToPage} />
        </motion.div>
      </section>
    </div>
  );
}
