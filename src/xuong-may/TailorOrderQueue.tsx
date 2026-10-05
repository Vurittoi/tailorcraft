import React from 'react';
import { Check, Lock, UserCheck } from 'lucide-react';
import {
  formatVND,
  PRODUCTION_STAGES,
  ProductionStage,
  TailoringOrderRecord,
  UserAccount,
} from '../types/suitTypes';

interface TailorOrderQueueProps {
  currentUser: UserAccount;
  filteredOrders: TailoringOrderRecord[];
  selectedOrder: TailoringOrderRecord | null;
  setSelectedOrderId: (orderId: string) => void;
  handleChangeStage: (
    order: TailoringOrderRecord,
    targetStage: ProductionStage
  ) => void;
}

export function TailorOrderQueue({
  currentUser,
  filteredOrders,
  selectedOrder,
  setSelectedOrderId,
  handleChangeStage,
}: TailorOrderQueueProps) {
  return (
    <div className="lg:col-span-5 space-y-4">
      <div className="bg-white border border-[#E5E2DC] rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[#EAE7E1] pb-3">
          <div>
            <h2 className="font-display text-xl font-bold text-[#141413]">
              Danh Sách Lệnh Chế Tác Tại Xưởng
            </h2>
            <p className="text-xs text-[#65615B]">
              Chọn đơn hàng để đọc Hồ sơ kỹ thuật và đổi mốc chế tác
            </p>
          </div>
          <span className="font-mono-tabular text-xs font-semibold text-[#8C6D46]">
            {filteredOrders.length} đơn
          </span>
        </div>

        <div className="space-y-3.5 max-h-[680px] overflow-y-auto pr-1">
          {filteredOrders.map((ord) => {
            const isSelected = selectedOrder?.orderId === ord.orderId;
            const currentStage: ProductionStage = ord.stage || 'CAT';
            const canModifyOrder =
              currentUser.role === 'ADMIN' ||
              !ord.assignedTailorId ||
              ord.assignedTailorId === currentUser.id;

            return (
              <div
                key={ord.orderId}
                onClick={() => setSelectedOrderId(ord.orderId)}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? 'border-2 border-[#141413] bg-[#FAF8F5] shadow-sm'
                    : 'border-[#E5E2DC] bg-white hover:border-[#8C6D46]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono-tabular font-bold text-[#8C6D46]">
                        #{ord.orderId}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#65615B]">{ord.createdAt}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#141413] mt-0.5">
                      Suit {ord.config.fabricName} ({ord.config.fabricCode})
                    </h3>
                    <div className="text-xs text-[#57534E]">
                      {ord.config.lapelName} · {ord.config.buttonName} ·{' '}
                      {ord.config.pocketName}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-[11px] text-[#8C6D46]">
                        Phụ trách:{' '}
                        <strong>
                          {ord.assignedTailorName || currentUser.fullName}
                        </strong>
                      </span>
                      {canModifyOrder ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[10px] font-semibold text-emerald-800">
                          <UserCheck className="w-3 h-3" />
                          <span>Đơn bạn phụ trách</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F4F2ED] border border-[#DFDCD4] text-[10px] font-semibold text-[#65615B]">
                          <Lock className="w-2.5 h-2.5" />
                          <span>Chỉ xem mốc tiến độ</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="font-mono-tabular text-xs font-bold text-[#141413]">
                    {formatVND(ord.totalPrice)}
                  </span>
                </div>

                {/* Thanh mốc chế tác: Cho phép bấm đổi mốc nếu là nghệ nhân phụ trách, ngược lại chỉ hiển thị mốc hiện tại */}
                <div
                  className="pt-2 border-t border-[#EAE7E1] space-y-2"
                  onClick={(e) => {
                    if (canModifyOrder) {
                      e.stopPropagation();
                    }
                  }}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#141413]">
                      Mốc chế tác hiện tại:
                    </span>
                    <span className="font-mono-tabular font-semibold text-[#8C6D46]">
                      {
                        PRODUCTION_STAGES.find((s) => s.key === currentStage)
                          ?.shortLabel
                      }
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5">
                    {PRODUCTION_STAGES.map((stageItem) => {
                      const isCurrentStage = currentStage === stageItem.key;
                      const currentStepNum =
                        PRODUCTION_STAGES.find((s) => s.key === currentStage)
                          ?.stepNumber || 1;
                      const isPassed = stageItem.stepNumber < currentStepNum;

                      if (!canModifyOrder) {
                        return (
                          <div
                            key={stageItem.key}
                            title={`Đơn hàng do ${ord.assignedTailorName} phụ trách — Bạn chỉ có thể xem mốc hiện tại`}
                            className={`py-2 px-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 select-none cursor-default ${
                              isCurrentStage
                                ? 'bg-[#141413] text-white shadow-xs'
                                : isPassed
                                ? 'bg-emerald-50/80 text-emerald-800 border border-emerald-200'
                                : 'bg-[#F4F2ED]/70 text-[#8A857E]'
                            }`}
                          >
                            {isPassed && <Check className="w-3 h-3 shrink-0" />}
                            <span className="truncate">
                              {stageItem.shortLabel.replace(/^\d\.\s*/, '')}
                            </span>
                          </div>
                        );
                      }

                      return (
                        <button
                          key={stageItem.key}
                          type="button"
                          onClick={() => handleChangeStage(ord, stageItem.key)}
                          className={`py-2 px-1.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            isCurrentStage
                              ? 'bg-[#141413] text-white shadow-xs'
                              : isPassed
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-[#F4F2ED] text-[#57534E] hover:bg-[#EAE6DF]'
                          }`}
                        >
                          {isPassed && <Check className="w-3 h-3 shrink-0" />}
                          <span className="truncate">
                            {stageItem.shortLabel.replace(/^\d\.\s*/, '')}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {!canModifyOrder && (
                    <div className="text-[10px] text-[#78716C] flex items-center gap-1 pt-0.5">
                      <Lock className="w-3 h-3 text-[#8C6D46] shrink-0" />
                      <span>
                        Chỉ <strong>{ord.assignedTailorName}</strong> mới có
                        quyền điều chỉnh mốc chế tác của đơn này.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
