import React from 'react';
import {
  PRODUCTION_STAGES,
  ProductionStage,
  TailoringOrderRecord,
} from '../types/suitTypes';

interface ProductionStageStatsProps {
  orders: TailoringOrderRecord[];
  stageFilter: 'ALL' | ProductionStage;
  setStageFilter: (filter: 'ALL' | ProductionStage) => void;
}

export function ProductionStageStats({
  orders,
  stageFilter,
  setStageFilter,
}: ProductionStageStatsProps) {
  const countByStage = (st: ProductionStage) =>
    orders.filter((o) => (o.stage || 'CAT') === st).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      <button
        type="button"
        onClick={() => setStageFilter('ALL')}
        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
          stageFilter === 'ALL'
            ? 'bg-[#141413] text-white border-[#141413]'
            : 'bg-white text-[#141413] border-[#E5E2DC] hover:border-[#141413]'
        }`}
      >
        <div className="text-[11px] font-mono-tabular opacity-75">
          TỔNG ĐƠN SẢN XUẤT
        </div>
        <div className="font-mono-tabular text-2xl font-bold mt-1">
          {orders.length} đơn
        </div>
        <div className="text-[11px] opacity-80 mt-0.5">Toàn bộ đơn xưởng</div>
      </button>

      {PRODUCTION_STAGES.map((st) => {
        const active = stageFilter === st.key;
        const count = countByStage(st.key);
        return (
          <button
            key={st.key}
            type="button"
            onClick={() => setStageFilter(st.key)}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              active
                ? 'bg-[#8C6D46] text-white border-[#8C6D46]'
                : 'bg-white text-[#141413] border-[#E5E2DC] hover:border-[#8C6D46]'
            }`}
          >
            <div className="text-[11px] font-mono-tabular font-semibold uppercase opacity-85">
              {st.shortLabel}
            </div>
            <div className="font-mono-tabular text-2xl font-bold mt-1">
              {count} đơn
            </div>
            <div className="text-[11px] opacity-80 mt-0.5 truncate">
              {st.title}
            </div>
          </button>
        );
      })}
    </div>
  );
}
