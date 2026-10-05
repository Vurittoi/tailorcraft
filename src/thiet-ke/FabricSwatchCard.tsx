import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FabricOption,
  getHighResFabricSwatchUrl,
  getSmallPreviewSwatchUrl,
} from '../fabricCatalogData';
import { formatVND } from '../types/suitTypes';

interface FabricSwatchCardProps {
  fabric: FabricOption;
  isSelected: boolean;
  onSelect: (fabric: FabricOption) => void;
}

export const FabricSwatchCard = React.memo(function FabricSwatchCard({
  fabric,
  isSelected,
  onSelect,
}: FabricSwatchCardProps) {
  const cardRef = useRef<HTMLButtonElement | null>(null);
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || isInView) return;
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '140px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isInView]);

  const previewThumbUrl = useMemo(
    () => (isInView ? getSmallPreviewSwatchUrl(fabric) : ''),
    [isInView, fabric]
  );

  const activeSwatchUrl = useMemo(
    () => (isSelected ? getHighResFabricSwatchUrl(fabric) : previewThumbUrl),
    [isSelected, fabric, previewThumbUrl]
  );

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onSelect(fabric)}
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '0 74px',
      }}
      className={`group w-full p-3 rounded-lg border text-left transition-all duration-200 ease-out hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] flex items-center justify-between gap-3 cursor-pointer ${
        isSelected
          ? 'border-[#141413] bg-[#F9F8F6] shadow-xs ring-1 ring-[#141413]/10'
          : 'border-[#E5E2DC] bg-white hover:border-[#9E7B4F]/60 hover:bg-[#FAF9F6]'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <span
          className={`relative w-12 h-12 rounded-lg border shrink-0 flex items-center justify-center overflow-hidden transition-transform duration-200 ease-out group-hover:scale-105 ${
            isSelected
              ? 'border-[#8C6D46] ring-2 ring-[#8C6D46]/35 shadow-sm'
              : 'border-black/20'
          }`}
          style={{ backgroundColor: fabric.colorHex }}
        >
          {activeSwatchUrl && (
            <img
              src={activeSwatchUrl}
              srcSet={
                isSelected && previewThumbUrl
                  ? `${previewThumbUrl} 1x, ${activeSwatchUrl} 2x`
                  : undefined
              }
              alt={fabric.name}
              loading="lazy"
              decoding="async"
              width={isSelected ? 160 : 36}
              height={isSelected ? 160 : 36}
              className="w-full h-full object-cover pointer-events-none select-none"
            />
          )}
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm font-semibold text-[#141413] truncate transition-colors duration-200 group-hover:text-[#8C6D46]">
              {fabric.name}
            </span>
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#F1EFEA] text-[#8C6D46] border border-[#E2DFD7]">
              {fabric.tierLabel}
            </span>
          </div>
          <div className="text-xs text-[#65615B] truncate mt-0.5">
            {fabric.composition} · {fabric.weightGrams} ·{' '}
            <span className="text-[#141413] font-medium">
              {fabric.seasonLabel}
            </span>
          </div>
          <div className="text-[11px] text-[#8C6D46] truncate">
            Xuất xứ: {fabric.origin}
          </div>
        </div>
      </div>

      <div className="text-right shrink-0">
        <div className="font-mono-tabular text-xs font-bold text-[#141413]">
          {formatVND(fabric.price)}
        </div>
      </div>
    </button>
  );
});
