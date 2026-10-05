import React, {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FabricColorKey,
  FabricFeatureKey,
  FabricOccasionKey,
  FabricOption,
  TriStateFilter,
} from '../fabricCatalogData';
import { SuitConfigState } from '../suitCanvasEngine';
import { FabricSwatchCard } from './FabricSwatchCard';
import { FabricFilterDrawer } from './FabricFilterDrawer';

interface FabricSelectionTabProps {
  config: SuitConfigState;
  setConfig: React.Dispatch<React.SetStateAction<SuitConfigState>>;
  fabrics: FabricOption[];
  handleSelectFabric: (fabric: FabricOption) => void;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export function FabricSelectionTab({
  config,
  setConfig,
  fabrics,
  handleSelectFabric,
  scrollContainerRef,
}: FabricSelectionTabProps) {
  const [fabricSearchQuery, setFabricSearchQuery] = useState<string>('');
  const [isFabricFilterOpen, setIsFabricFilterOpen] = useState<boolean>(false);
  const [featureFilters, setFeatureFilters] = useState<
    Partial<Record<FabricFeatureKey, TriStateFilter>>
  >({});
  const [occasionFilters, setOccasionFilters] = useState<
    Partial<Record<FabricOccasionKey, TriStateFilter>>
  >({});
  const [colorFilters, setColorFilters] = useState<
    Partial<Record<FabricColorKey, TriStateFilter>>
  >({});

  const cycleTriStateValue = (current?: TriStateFilter): TriStateFilter => {
    if (!current || current === 'default') return 'include';
    if (current === 'include') return 'exclude';
    return 'default';
  };

  const toggleFeatureFilter = (key: FabricFeatureKey) => {
    setFeatureFilters((prev) => ({
      ...prev,
      [key]: cycleTriStateValue(prev[key]),
    }));
  };

  const toggleOccasionFilter = (key: FabricOccasionKey) => {
    setOccasionFilters((prev) => ({
      ...prev,
      [key]: cycleTriStateValue(prev[key]),
    }));
  };

  const toggleColorFilter = (key: FabricColorKey) => {
    setColorFilters((prev) => ({
      ...prev,
      [key]: cycleTriStateValue(prev[key]),
    }));
  };

  const resetAllFabricFilters = () => {
    setFabricSearchQuery('');
    setFeatureFilters({});
    setOccasionFilters({});
    setColorFilters({});
  };

  const activeFilterCount = useMemo(
    () =>
      Object.values(featureFilters).filter((v) => v && v !== 'default').length +
      Object.values(occasionFilters).filter((v) => v && v !== 'default')
        .length +
      Object.values(colorFilters).filter((v) => v && v !== 'default').length,
    [featureFilters, occasionFilters, colorFilters]
  );

  const deferredSearchQuery = useDeferredValue(fabricSearchQuery);
  const deferredFeatureFilters = useDeferredValue(featureFilters);
  const deferredOccasionFilters = useDeferredValue(occasionFilters);
  const deferredColorFilters = useDeferredValue(colorFilters);

  const filteredFabrics = useMemo(() => {
    const q = deferredSearchQuery.trim().toLowerCase();

    const includedFeatures = (
      Object.entries(deferredFeatureFilters) as [
        FabricFeatureKey,
        TriStateFilter,
      ][]
    )
      .filter(([, state]) => state === 'include')
      .map(([k]) => k);

    const includedOccasions = (
      Object.entries(deferredOccasionFilters) as [
        FabricOccasionKey,
        TriStateFilter,
      ][]
    )
      .filter(([, state]) => state === 'include')
      .map(([k]) => k);

    const includedColors = (
      Object.entries(deferredColorFilters) as [FabricColorKey, TriStateFilter][]
    )
      .filter(([, state]) => state === 'include')
      .map(([k]) => k);

    return fabrics.filter((fabric) => {
      if (q) {
        const matchText =
          fabric.name.toLowerCase().includes(q) ||
          fabric.code.toLowerCase().includes(q) ||
          fabric.origin.toLowerCase().includes(q) ||
          fabric.composition.toLowerCase().includes(q) ||
          fabric.seasonLabel.toLowerCase().includes(q) ||
          fabric.tierLabel.toLowerCase().includes(q) ||
          fabric.colorGroup.toLowerCase().includes(q);
        if (!matchText) return false;
      }

      for (const feat of fabric.features) {
        if (deferredFeatureFilters[feat] === 'exclude') return false;
      }
      for (const occ of fabric.occasions) {
        if (deferredOccasionFilters[occ] === 'exclude') return false;
      }
      if (deferredColorFilters[fabric.colorGroup] === 'exclude') {
        return false;
      }

      if (
        includedFeatures.length > 0 &&
        !includedFeatures.some((f) => fabric.features.includes(f))
      ) {
        return false;
      }
      if (
        includedOccasions.length > 0 &&
        !includedOccasions.some((o) => fabric.occasions.includes(o))
      ) {
        return false;
      }
      if (
        includedColors.length > 0 &&
        !includedColors.includes(fabric.colorGroup)
      ) {
        return false;
      }

      return true;
    });
  }, [
    fabrics,
    deferredSearchQuery,
    deferredFeatureFilters,
    deferredOccasionFilters,
    deferredColorFilters,
  ]);

  const [visibleFabricLimit, setVisibleFabricLimit] = useState<number>(12);
  const loadMoreSentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleFabricLimit(12);
  }, [
    deferredSearchQuery,
    deferredFeatureFilters,
    deferredOccasionFilters,
    deferredColorFilters,
  ]);

  useEffect(() => {
    const sentinel = loadMoreSentinelRef.current;
    if (!sentinel || visibleFabricLimit >= filteredFabrics.length) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisibleFabricLimit(filteredFabrics.length);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleFabricLimit((prev) =>
            Math.min(filteredFabrics.length, prev + 14)
          );
        }
      },
      { rootMargin: '160px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleFabricLimit, filteredFabrics.length]);

  return (
    <div className="flex-1 min-h-0 flex flex-col gap-3 h-full">
      {/* KHỐI 1: DANH SÁCH VẢI (CUỘN ĐỘC LẬP) */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="shrink-0">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-[#141413]">
              Bộ sưu tập Vải May Đo Hockerty Edition
            </label>
            <span className="text-[11px] font-mono-tabular text-[#8C6D46] font-semibold">
              {filteredFabrics.length} / {fabrics.length} mẫu vải
            </span>
          </div>

          <FabricFilterDrawer
            fabricSearchQuery={fabricSearchQuery}
            setFabricSearchQuery={setFabricSearchQuery}
            isFabricFilterOpen={isFabricFilterOpen}
            setIsFabricFilterOpen={setIsFabricFilterOpen}
            activeFilterCount={activeFilterCount}
            featureFilters={featureFilters}
            occasionFilters={occasionFilters}
            colorFilters={colorFilters}
            toggleFeatureFilter={toggleFeatureFilter}
            toggleOccasionFilter={toggleOccasionFilter}
            toggleColorFilter={toggleColorFilter}
            resetAllFabricFilters={resetAllFabricFilters}
          />
        </div>

        <div
          ref={scrollContainerRef}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1.5 space-y-2.5"
        >
          {filteredFabrics.length === 0 ? (
            <div className="p-6 text-center bg-[#F9F8F6] border border-[#E5E2DC] rounded-xl space-y-2">
              <p className="text-xs font-semibold text-[#141413]">
                Không tìm thấy mẫu vải phù hợp với bộ lọc hiện tại.
              </p>
              <button
                type="button"
                onClick={resetAllFabricFilters}
                className="px-3.5 py-1.5 text-xs font-semibold bg-[#141413] text-white rounded-lg cursor-pointer"
              >
                Xóa bộ lọc để xem toàn bộ {fabrics.length} mẫu vải
              </button>
            </div>
          ) : (
            <>
              {filteredFabrics.slice(0, visibleFabricLimit).map((fabric) => (
                <FabricSwatchCard
                  key={fabric.id}
                  fabric={fabric}
                  isSelected={config.fabricId === fabric.id}
                  onSelect={handleSelectFabric}
                />
              ))}

              {visibleFabricLimit < filteredFabrics.length && (
                <div ref={loadMoreSentinelRef} className="py-2 text-center">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleFabricLimit((prev) =>
                        Math.min(filteredFabrics.length, prev + 18)
                      )
                    }
                    className="text-[11px] font-medium text-[#8C6D46] hover:text-[#141413] underline cursor-pointer"
                  >
                    Đang tải thêm mẫu vải ({visibleFabricLimit}/
                    {filteredFabrics.length})...
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* KHỐI 2: HỌA TIẾT DỆT BỀ MẶT VẢI — TÁCH RIÊNG NGAY DƯỚI DANH SÁCH VẢI */}
      <div className="shrink-0 p-3 rounded-xl bg-[#F9F8F6] border border-[#E5E2DC]">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold text-[#141413]">
            Họa tiết dệt bề mặt vải
          </label>
          <span className="text-[11px] text-[#8C6D46] font-medium">
            Chọn kiểu dệt sợi
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { id: 'solid' as const, label: 'Trơn Twill 130s' },
            { id: 'herringbone' as const, label: 'Vân Xương Cá' },
            { id: 'pinstripe' as const, label: 'Kẻ Sọc Pinstripe' },
            { id: 'glen_check' as const, label: 'Kẻ Ô Glen Check' },
            { id: 'birdseye' as const, label: 'Dệt Hạt / Linen' },
          ].map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() =>
                setConfig((prev) => ({
                  ...prev,
                  weavePattern: w.id,
                }))
              }
              className={`py-2 px-2.5 text-xs rounded-lg border text-center transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xs active:scale-[0.98] whitespace-nowrap cursor-pointer ${
                config.weavePattern === w.id
                  ? 'border-[#141413] bg-[#141413] font-semibold text-white shadow-2xs'
                  : 'border-[#E5E2DC] bg-white text-[#65615B] hover:border-[#9E7B4F]/60 hover:text-[#141413]'
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
