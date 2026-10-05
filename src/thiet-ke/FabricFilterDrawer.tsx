import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Search, SlidersHorizontal, X } from 'lucide-react';
import {
  FABRIC_COLOR_FILTERS,
  FABRIC_FEATURE_FILTERS,
  FABRIC_OCCASION_FILTERS,
  FabricColorKey,
  FabricFeatureKey,
  FabricOccasionKey,
  TriStateFilter,
} from '../fabricCatalogData';

interface FabricFilterDrawerProps {
  fabricSearchQuery: string;
  setFabricSearchQuery: (value: string) => void;
  isFabricFilterOpen: boolean;
  setIsFabricFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeFilterCount: number;
  featureFilters: Partial<Record<FabricFeatureKey, TriStateFilter>>;
  occasionFilters: Partial<Record<FabricOccasionKey, TriStateFilter>>;
  colorFilters: Partial<Record<FabricColorKey, TriStateFilter>>;
  toggleFeatureFilter: (key: FabricFeatureKey) => void;
  toggleOccasionFilter: (key: FabricOccasionKey) => void;
  toggleColorFilter: (key: FabricColorKey) => void;
  resetAllFabricFilters: () => void;
}

export function FabricFilterDrawer({
  fabricSearchQuery,
  setFabricSearchQuery,
  isFabricFilterOpen,
  setIsFabricFilterOpen,
  activeFilterCount,
  featureFilters,
  occasionFilters,
  colorFilters,
  toggleFeatureFilter,
  toggleOccasionFilter,
  toggleColorFilter,
  resetAllFabricFilters,
}: FabricFilterDrawerProps) {
  return (
    <>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#65615B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={fabricSearchQuery}
            onChange={(e) => setFabricSearchQuery(e.target.value)}
            placeholder="Search fabrics by name or properties..."
            className="w-full pl-9 pr-8 py-2.5 text-xs bg-white border border-[#CFCBC2] rounded-xl text-[#141413] placeholder:text-[#8E8A82] focus:outline-none focus:border-[#141413] transition-colors"
          />
          {fabricSearchQuery && (
            <button
              type="button"
              onClick={() => setFabricSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E8A82] hover:text-[#141413] cursor-pointer"
              title="Xóa từ khóa"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsFabricFilterOpen((prev) => !prev)}
          className={`px-4 py-2.5 text-xs font-medium rounded-xl border transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            isFabricFilterOpen || activeFilterCount > 0
              ? 'bg-[#141413] text-white border-[#141413] shadow-xs'
              : 'bg-white text-[#33312E] border-[#8E8A82] hover:border-[#141413]'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="font-mono-tabular text-[10px] px-1.5 py-0.2 rounded-full bg-[#D4AF37] text-[#141413] font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-3 pb-2.5 border-b border-[#EAE7E1]">
          {FABRIC_FEATURE_FILTERS.map((f) => {
            const st = featureFilters[f.key];
            if (!st || st === 'default') return null;
            return (
              <button
                key={`chip-feat-${f.key}`}
                type="button"
                onClick={() => toggleFeatureFilter(f.key)}
                className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 cursor-pointer border ${
                  st === 'include'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-800 line-through'
                }`}
                title="Bấm để chuyển trạng thái lọc"
              >
                {st === 'include' ? (
                  <Check className="w-3 h-3 text-emerald-700" />
                ) : (
                  <X className="w-3 h-3 text-rose-600" />
                )}
                <span>{f.label}</span>
              </button>
            );
          })}
          {FABRIC_OCCASION_FILTERS.map((o) => {
            const st = occasionFilters[o.key];
            if (!st || st === 'default') return null;
            return (
              <button
                key={`chip-occ-${o.key}`}
                type="button"
                onClick={() => toggleOccasionFilter(o.key)}
                className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 cursor-pointer border ${
                  st === 'include'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-800 line-through'
                }`}
                title="Bấm để chuyển trạng thái lọc"
              >
                {st === 'include' ? (
                  <Check className="w-3 h-3 text-emerald-700" />
                ) : (
                  <X className="w-3 h-3 text-rose-600" />
                )}
                <span>{o.label}</span>
              </button>
            );
          })}
          {FABRIC_COLOR_FILTERS.map((c) => {
            const st = colorFilters[c.key];
            if (!st || st === 'default') return null;
            return (
              <button
                key={`chip-col-${c.key}`}
                type="button"
                onClick={() => toggleColorFilter(c.key)}
                className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 cursor-pointer border ${
                  st === 'include'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-800 line-through'
                }`}
                title="Bấm để chuyển trạng thái lọc"
              >
                {st === 'include' ? (
                  <Check className="w-3 h-3 text-emerald-700" />
                ) : (
                  <X className="w-3 h-3 text-rose-600" />
                )}
                <span>{c.label}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={resetAllFabricFilters}
            className="text-[11px] text-[#8C6D46] hover:text-[#141413] underline ml-auto cursor-pointer"
          >
            Đặt lại mặc định
          </button>
        </div>
      )}

      <AnimatePresence>
        {isFabricFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden mb-4"
          >
            <div className="bg-white border border-[#DCD7CD] rounded-xl p-4 shadow-lg space-y-5 max-h-[420px] overflow-y-auto">
              <div className="flex items-center justify-between gap-2 bg-[#F9F8F6] border border-[#E5E2DC] rounded-lg px-3 py-2 text-[11px] text-[#57534E]">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1 font-medium text-emerald-800">
                    <span className="w-4 h-4 rounded bg-[#141413] text-white inline-flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                    1 lần: Hiện
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-rose-700">
                    <span className="w-4 h-4 rounded bg-rose-600 text-white inline-flex items-center justify-center text-[10px]">
                      ✕
                    </span>
                    2 lần: Ẩn đi
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#65615B]">
                    <span className="w-4 h-4 rounded border border-[#CFCBC2] bg-white inline-block" />
                    3 lần: Mặc định
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFabricFilterOpen(false)}
                  className="text-[#65615B] hover:text-[#141413] font-semibold cursor-pointer shrink-0"
                >
                  Đóng
                </button>
              </div>

              <div className="space-y-2.5">
                {FABRIC_FEATURE_FILTERS.map((item) => {
                  const state = featureFilters[item.key] || 'default';
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleFeatureFilter(item.key)}
                      className="w-full flex items-center justify-between py-1.5 px-1 hover:bg-[#F9F8F6] rounded-lg transition-colors cursor-pointer group select-none"
                    >
                      <div className="text-left">
                        <span
                          className={`text-sm ${
                            state === 'include'
                              ? 'font-semibold text-[#141413]'
                              : state === 'exclude'
                              ? 'line-through text-rose-700 font-medium'
                              : 'text-[#57534E] group-hover:text-[#141413]'
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="text-[11px] text-[#8E8A82] ml-2">
                          ({item.viSub})
                        </span>
                      </div>

                      <span
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                          state === 'include'
                            ? 'bg-[#141413] border-[#141413] text-white shadow-2xs'
                            : state === 'exclude'
                            ? 'bg-rose-600 border-rose-600 text-white shadow-2xs'
                            : 'bg-white border-[#D5D2CB] group-hover:border-[#8C6D46]'
                        }`}
                      >
                        {state === 'include' && (
                          <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                        )}
                        {state === 'exclude' && (
                          <X className="w-3.5 h-3.5 stroke-[2.8]" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-[#EAE7E1] space-y-2.5">
                <div className="text-sm font-medium text-[#65615B] pb-1">
                  Occasion
                </div>
                {FABRIC_OCCASION_FILTERS.map((item) => {
                  const state = occasionFilters[item.key] || 'default';
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleOccasionFilter(item.key)}
                      className="w-full flex items-center justify-between py-1.5 px-1 hover:bg-[#F9F8F6] rounded-lg transition-colors cursor-pointer group select-none"
                    >
                      <div className="text-left">
                        <span
                          className={`text-sm ${
                            state === 'include'
                              ? 'font-semibold text-[#141413]'
                              : state === 'exclude'
                              ? 'line-through text-rose-700 font-medium'
                              : 'text-[#57534E] group-hover:text-[#141413]'
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="text-[11px] text-[#8E8A82] ml-2">
                          ({item.viSub})
                        </span>
                      </div>

                      <span
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                          state === 'include'
                            ? 'bg-[#141413] border-[#141413] text-white shadow-2xs'
                            : state === 'exclude'
                            ? 'bg-rose-600 border-rose-600 text-white shadow-2xs'
                            : 'bg-white border-[#D5D2CB] group-hover:border-[#8C6D46]'
                        }`}
                      >
                        {state === 'include' && (
                          <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                        )}
                        {state === 'exclude' && (
                          <X className="w-3.5 h-3.5 stroke-[2.8]" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-[#EAE7E1] space-y-3">
                <div className="text-sm font-medium text-[#65615B]">Color</div>
                <div className="grid grid-cols-4 gap-3.5 place-items-center pt-1">
                  {FABRIC_COLOR_FILTERS.map((col) => {
                    const state = colorFilters[col.key] || 'default';
                    return (
                      <button
                        key={col.key}
                        type="button"
                        onClick={() => toggleColorFilter(col.key)}
                        title={`${col.label} — Bấm lần 1: Hiện (✓) | Lần 2: Ẩn (✕) | Lần 3: Mặc định`}
                        className={`relative w-10 h-10 rounded-full transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center border ${
                          state === 'include'
                            ? 'ring-2 ring-offset-2 ring-[#141413] border-black/30'
                            : state === 'exclude'
                            ? 'ring-2 ring-offset-2 ring-rose-600 border-rose-600 opacity-85'
                            : 'border-black/15'
                        }`}
                        style={{
                          background: `linear-gradient(135deg, ${col.topLeftHex} 50%, ${col.bottomRightHex} 50%)`,
                        }}
                      >
                        {state === 'include' && (
                          <span className="w-5 h-5 rounded-full bg-[#141413]/85 text-white flex items-center justify-center shadow">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                        {state === 'exclude' && (
                          <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shadow">
                            <X className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
