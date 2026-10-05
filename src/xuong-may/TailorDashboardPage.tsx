import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Code2,
  FileSpreadsheet,
  Lock,
  Printer,
} from 'lucide-react';
import { renderSuitCanvas } from '../suitCanvasEngine';
import {
  NavPage,
  PRODUCTION_STAGES,
  ProductionStage,
  TailoringOrderRecord,
  UserAccount,
} from '../types/suitTypes';
import { ProductionStageStats } from './ProductionStageStats';
import { SupervisorTailorAssign } from './SupervisorTailorAssign';
import { TailorOrderQueue } from './TailorOrderQueue';
import { SpecSheetVisualTab } from './SpecSheetVisualTab';
import { SpecSheetJsonTab } from './SpecSheetJsonTab';

interface TailorDashboardPageProps {
  currentUser: UserAccount;
  orders: TailoringOrderRecord[];
  tailorAccounts: UserAccount[];
  onUpdateOrderStage: (
    orderId: string,
    nextStage: ProductionStage,
    tailorNote?: string
  ) => void;
  onAssignTailorToOrder: (orderId: string, tailor: UserAccount) => void;
  navigateToPage: (targetPage: NavPage) => void;
}

export function TailorDashboardPage({
  currentUser,
  orders,
  tailorAccounts,
  onUpdateOrderStage,
  onAssignTailorToOrder,
}: TailorDashboardPageProps) {
  const isSupervisorMode = currentUser.role === 'ADMIN';
  const [stageFilter, setStageFilter] = useState<'ALL' | ProductionStage>('ALL');
  const [tailorFilterId, setTailorFilterId] = useState<string>('ALL');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    orders[0]?.orderId || ''
  );
  const [specTab, setSpecTab] = useState<'visual_spec' | 'raw_json'>(
    'visual_spec'
  );
  const [tailorNoteInput, setTailorNoteInput] = useState<string>('');
  const [copiedJson, setCopiedJson] = useState<boolean>(false);
  const [stageToast, setStageToast] = useState<string>('');

  const specCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const selectedOrder =
    orders.find((o) => o.orderId === selectedOrderId) || orders[0] || null;

  useEffect(() => {
    if (selectedOrder) {
      setTailorNoteInput(
        selectedOrder.tailorNotes ||
          'Đã kiểm tra độ co giãn vải chính, canh sọc ve áo đối xứng chuẩn Bespoke.'
      );
    }
  }, [selectedOrder?.orderId]);

  useEffect(() => {
    if (isSupervisorMode || !selectedOrder || !specCanvasRef.current) return;
    renderSuitCanvas(specCanvasRef.current, selectedOrder.config, {
      zoom: 1,
      panX: 0,
      panY: 0,
      renderMode: 'composite',
    });
  }, [selectedOrder, isSupervisorMode, specTab]);

  const filteredOrders = orders.filter((ord) => {
    const ordStage: ProductionStage = ord.stage || 'CAT';
    if (stageFilter !== 'ALL' && ordStage !== stageFilter) return false;
    if (
      isSupervisorMode &&
      tailorFilterId !== 'ALL' &&
      ord.assignedTailorId !== tailorFilterId
    ) {
      return false;
    }
    return true;
  });

  const canTailorModifyOrder = (order: TailoringOrderRecord) => {
    return (
      isSupervisorMode ||
      !order.assignedTailorId ||
      order.assignedTailorId === currentUser.id
    );
  };

  const canModifySelectedOrder = selectedOrder
    ? canTailorModifyOrder(selectedOrder)
    : false;

  const handleChangeStage = (
    order: TailoringOrderRecord,
    targetStage: ProductionStage
  ) => {
    if (!canTailorModifyOrder(order)) {
      return;
    }
    onUpdateOrderStage(order.orderId, targetStage, tailorNoteInput);
    const stageMeta = PRODUCTION_STAGES.find((s) => s.key === targetStage);
    setStageToast(
      `Đơn #${order.orderId} đã chuyển sang mốc: ${
        stageMeta?.shortLabel || targetStage
      }`
    );
    window.setTimeout(() => setStageToast(''), 3200);
  };

  const handleAssignTailor = (
    order: TailoringOrderRecord,
    tailorId: string
  ) => {
    const foundTailor = tailorAccounts.find((t) => t.id === tailorId);
    if (!foundTailor) return;
    onAssignTailorToOrder(order.orderId, foundTailor);
    setStageToast(
      `Đã giao đơn #${order.orderId} (${order.config.fabricName}) cho ${foundTailor.fullName} phụ trách!`
    );
    window.setTimeout(() => setStageToast(''), 3200);
  };

  const handleAdvanceNextStage = (order: TailoringOrderRecord) => {
    if (!canTailorModifyOrder(order)) {
      return;
    }
    const currentStage: ProductionStage = order.stage || 'CAT';
    const orderSequence: ProductionStage[] = [
      'CAT',
      'MAY',
      'KIEM_DINH',
      'HOAN_TAT',
    ];
    const idx = orderSequence.indexOf(currentStage);
    const nextStage =
      orderSequence[Math.min(idx + 1, orderSequence.length - 1)];
    handleChangeStage(order, nextStage);
  };

  const buildCustomizationSpecJson = (order: TailoringOrderRecord) => {
    return {
      specSheetVersion: '2026.1-BESPOKE-2D',
      orderId: order.orderId,
      createdAt: order.createdAt,
      estimatedDelivery: order.estimatedDelivery,
      productionMilestone: {
        currentStageCode: order.stage || 'CAT',
        statusDescription: order.status,
        assignedTailor: order.assignedTailorName || currentUser.fullName,
        updatedAt: order.updatedAt || order.createdAt,
      },
      customizationJSON: {
        fabric: {
          fabricId: order.config.fabricId,
          fabricCode: order.config.fabricCode,
          fabricName: order.config.fabricName,
          origin: order.config.fabricOrigin,
          colorHex: order.config.colorHex,
          weavePattern: order.config.weavePattern,
          unitPriceVND: order.config.fabricPrice,
        },
        silhouetteAndTrim: {
          lapel: {
            id: order.config.lapelId,
            name: order.config.lapelName,
            addonPriceVND: order.config.lapelPrice,
          },
          button: {
            id: order.config.buttonId,
            name: order.config.buttonName,
            addonPriceVND: order.config.buttonPrice,
          },
          pocket: {
            id: order.config.pocketId,
            name: order.config.pocketName,
            addonPriceVND: order.config.pocketPrice,
          },
        },
        monogramEmbroidery: {
          text: order.config.monogramText || '(Không thêu)',
          threadColor: order.config.monogramColor,
          fontStyle: order.config.monogramStyle,
          offsetX: order.config.monogramOffsetX || 0,
          offsetY: order.config.monogramOffsetY || 0,
        },
      },
      anatomicalMeasurementsCm: {
        profileName: order.measurements.profileName,
        fittingMode: order.measurements.mode,
        chestCm: order.measurements.chestCm,
        waistCm: order.measurements.waistCm,
        shoulderCm: order.measurements.shoulderCm,
        sleeveCm: order.measurements.sleeveCm,
        heightCm: order.measurements.heightCm,
        weightKg: order.measurements.weightKg,
        postureNote: order.measurements.postureNote,
      },
      workshopNotes: tailorNoteInput,
    };
  };

  const handleCopySpecJson = () => {
    if (!selectedOrder) return;
    const jsonString = JSON.stringify(
      buildCustomizationSpecJson(selectedOrder),
      null,
      2
    );
    navigator.clipboard.writeText(jsonString);
    setCopiedJson(true);
    window.setTimeout(() => setCopiedJson(false), 2500);
  };

  const handleDownloadSpecJson = () => {
    if (!selectedOrder) return;
    const jsonString = JSON.stringify(
      buildCustomizationSpecJson(selectedOrder),
      null,
      2
    );
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SpecSheet-${selectedOrder.orderId}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="max-w-[1380px] w-full mx-auto px-4 sm:px-8 py-8 flex-1 space-y-6">
      {/* 1. Thanh thống kê 5 thẻ mốc sản xuất */}
      <ProductionStageStats
        orders={orders}
        stageFilter={stageFilter}
        setStageFilter={setStageFilter}
      />

      {stageToast && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-semibold text-emerald-900 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{stageToast}</span>
        </div>
      )}

      {/* 2. Chế độ Admin: Phân công thợ may & Giám sát đơn hàng */}
      {isSupervisorMode ? (
        <SupervisorTailorAssign
          orders={orders}
          filteredOrders={filteredOrders}
          tailorAccounts={tailorAccounts}
          tailorFilterId={tailorFilterId}
          setTailorFilterId={setTailorFilterId}
          handleAssignTailor={handleAssignTailor}
        />
      ) : (
        /* 3, 4 & 5. Chế độ Thợ May: Lệnh chế tác & Hồ sơ Kỹ thuật Spec Sheet */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <TailorOrderQueue
            currentUser={currentUser}
            filteredOrders={filteredOrders}
            selectedOrder={selectedOrder}
            setSelectedOrderId={setSelectedOrderId}
            handleChangeStage={handleChangeStage}
          />

          <div className="lg:col-span-7">
            {selectedOrder ? (
              <div className="bg-white border border-[#E5E2DC] rounded-2xl p-6 space-y-6">
                <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[#EAE7E1]">
                  <div>
                    <div className="font-mono-tabular text-xs font-bold text-[#8C6D46]">
                      BESPOKE PRODUCTION SPEC SHEET · ĐƠN HÀNG #
                      {selectedOrder.orderId}
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141413] mt-0.5">
                      Hồ Sơ Kỹ Thuật: CustomizationJSON & Số Đo Giải Phẫu
                    </h2>
                    <p className="text-xs text-[#65615B] mt-0.5">
                      Thợ phụ trách:{' '}
                      <strong className="text-[#141413]">
                        {selectedOrder.assignedTailorName ||
                          currentUser.fullName}
                      </strong>{' '}
                      · Hạn bàn giao: {selectedOrder.estimatedDelivery}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center bg-[#F4F2ED] p-1 rounded-lg text-xs">
                      <button
                        type="button"
                        onClick={() => setSpecTab('visual_spec')}
                        className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 cursor-pointer ${
                          specTab === 'visual_spec'
                            ? 'bg-[#141413] text-white'
                            : 'text-[#65615B] hover:text-[#141413]'
                        }`}
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>Bản Vẽ & Số Đo</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSpecTab('raw_json')}
                        className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 cursor-pointer ${
                          specTab === 'raw_json'
                            ? 'bg-[#141413] text-white'
                            : 'text-[#65615B] hover:text-[#141413]'
                        }`}
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>CustomizationJSON</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="p-2 border border-[#D8D4CC] rounded-lg text-[#141413] hover:border-[#141413] cursor-pointer"
                      title="In phiếu kỹ thuật xưởng"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Thanh Quy trình Chế tác lớn: Cắt -> May -> Kiểm định -> Hoàn tất */}
                <div className="p-4 rounded-xl bg-[#F9F8F6] border border-[#E5E2DC] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-semibold text-[#141413] flex items-center gap-1.5">
                      {canModifySelectedOrder ? (
                        <>
                          <ClipboardCheck className="w-4 h-4 text-[#8C6D46]" />
                          <span>
                            Điều Khiển Mốc Chế Tác Xưởng (Cắt → May → Kiểm
                            định):
                          </span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-[#8C6D46]" />
                          <span>
                            Tiến Độ Mốc Chế Tác Xưởng (Chỉ xem — Do{' '}
                            {selectedOrder.assignedTailorName} phụ trách):
                          </span>
                        </>
                      )}
                    </div>
                    {canModifySelectedOrder ? (
                      <button
                        type="button"
                        onClick={() => handleAdvanceNextStage(selectedOrder)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#8C6D46] text-white text-xs font-semibold hover:bg-[#765A38] transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Chuyển sang mốc chế tác tiếp theo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EAE7E1] text-[#57534E] text-[11px] font-semibold">
                        <Lock className="w-3 h-3 text-[#8C6D46]" />
                        <span>Không có quyền đổi mốc</span>
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                    {PRODUCTION_STAGES.map((st) => {
                      const currentStage: ProductionStage =
                        selectedOrder.stage || 'CAT';
                      const isCurrent = currentStage === st.key;
                      const currentNum =
                        PRODUCTION_STAGES.find((s) => s.key === currentStage)
                          ?.stepNumber || 1;
                      const isCompleted = st.stepNumber < currentNum;

                      if (!canModifySelectedOrder) {
                        return (
                          <div
                            key={st.key}
                            title={`Đơn hàng do ${selectedOrder.assignedTailorName} phụ trách — Chỉ xem mốc hiện tại`}
                            className={`p-3 rounded-xl border text-left select-none cursor-default ${
                              isCurrent
                                ? 'bg-[#141413] text-white border-[#141413]'
                                : isCompleted
                                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                                : 'bg-white/70 border-[#E5E2DC] text-[#8A857E]'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs font-bold">
                              <span>{st.shortLabel}</span>
                              {isCompleted && (
                                <Check className="w-3.5 h-3.5 text-emerald-700" />
                              )}
                            </div>
                            <div className="text-[11px] opacity-85 mt-1 line-clamp-2">
                              {st.title}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <button
                          key={st.key}
                          type="button"
                          onClick={() =>
                            handleChangeStage(selectedOrder, st.key)
                          }
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-[#141413] text-white border-[#141413]'
                              : isCompleted
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                              : 'bg-white border-[#E5E2DC] text-[#57534E] hover:border-[#141413]'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span>{st.shortLabel}</span>
                            {isCompleted && (
                              <Check className="w-3.5 h-3.5 text-emerald-700" />
                            )}
                          </div>
                          <div className="text-[11px] opacity-85 mt-1 line-clamp-2">
                            {st.title}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {specTab === 'visual_spec' ? (
                  <SpecSheetVisualTab
                    selectedOrder={selectedOrder}
                    specCanvasRef={specCanvasRef}
                  />
                ) : (
                  <SpecSheetJsonTab
                    specJsonData={buildCustomizationSpecJson(selectedOrder)}
                    copiedJson={copiedJson}
                    onCopySpecJson={handleCopySpecJson}
                    onDownloadSpecJson={handleDownloadSpecJson}
                  />
                )}

                <div className="pt-4 border-t border-[#EAE7E1] space-y-2">
                  <label className="block text-xs font-semibold text-[#141413]">
                    Nhật ký kỹ thuật của Thợ may / Ghi chú kiểm định QC cho đơn
                    #{selectedOrder.orderId}:
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="text"
                      value={tailorNoteInput}
                      readOnly={!canModifySelectedOrder}
                      disabled={!canModifySelectedOrder}
                      onChange={(e) => {
                        if (canModifySelectedOrder) {
                          setTailorNoteInput(e.target.value);
                        }
                      }}
                      placeholder="Nhập ghi chú cắt rập, độ dư đường may hoặc kết quả đo kiểm QC..."
                      className={`flex-1 px-3.5 py-2.5 text-xs border border-[#D8D4CC] rounded-lg focus:outline-none ${
                        canModifySelectedOrder
                          ? 'bg-[#F9F8F6] focus:border-[#141413]'
                          : 'bg-[#F1EFEA] text-[#78716C] cursor-not-allowed'
                      }`}
                    />
                    {canModifySelectedOrder ? (
                      <button
                        type="button"
                        onClick={() =>
                          handleChangeStage(
                            selectedOrder,
                            selectedOrder.stage || 'CAT'
                          )
                        }
                        className="px-4 py-2.5 text-xs font-semibold bg-[#141413] text-white rounded-lg hover:bg-[#2A2826] shrink-0 cursor-pointer"
                      >
                        Lưu Ghi Chú Xưởng
                      </button>
                    ) : (
                      <div className="px-4 py-2.5 text-xs font-semibold bg-[#EAE7E1] text-[#65615B] rounded-lg shrink-0 flex items-center gap-1.5 select-none">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Chỉ xem ghi chú</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#E5E2DC] rounded-2xl p-12 text-center text-sm text-[#65615B]">
                Hiện chưa có đơn đặt may nào trong danh sách lọc.
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
