import React from 'react';
import { Check, PackageCheck, Printer, X } from 'lucide-react';
import { SuitConfigState } from '../suitCanvasEngine';
import {
  BodyMeasurements,
  NavPage,
  TailoringOrderRecord,
} from '../types/suitTypes';
import { OrderDetailContent } from './OrderDetailContent';

export interface OrderSummaryModalProps {
  isOpen: boolean;
  selectedOrderForDetail: TailoringOrderRecord | null;
  editingOrderId: string | null;
  config: SuitConfigState;
  measurements: BodyMeasurements;
  totalEstimatedPrice: number;
  canvasSnapshotUrl: string;
  onClose: () => void;
  navigateToPage: (targetPage: NavPage) => void;
  handleStartEditingOrder: (order: TailoringOrderRecord) => void;
  handleConfirmCreateOrder: () => void;
}

export function OrderSummaryModal({
  isOpen,
  selectedOrderForDetail,
  editingOrderId,
  config,
  measurements,
  totalEstimatedPrice,
  canvasSnapshotUrl,
  onClose,
  navigateToPage,
  handleStartEditingOrder,
  handleConfirmCreateOrder,
}: OrderSummaryModalProps) {
  if (!isOpen) return null;

  const isViewingExisting = selectedOrderForDetail !== null;
  const displayConfig = isViewingExisting
    ? selectedOrderForDetail.config
    : config;
  const displayMeasurements = isViewingExisting
    ? selectedOrderForDetail.measurements
    : measurements;
  const displayTotalPrice = isViewingExisting
    ? selectedOrderForDetail.totalPrice
    : totalEstimatedPrice;
  const displayAddonPrice =
    displayConfig.lapelPrice +
    displayConfig.buttonPrice +
    displayConfig.pocketPrice;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#E5E2DC] rounded-xl max-w-3xl w-full p-6 shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-[#EAE7E1] pb-4 mb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono-tabular text-xs text-[#8C6D46] font-medium">
                {isViewingExisting
                  ? `HỒ SƠ ĐƠN ĐẶT MAY #${selectedOrderForDetail.orderId}`
                  : editingOrderId
                  ? `CẬP NHẬT ĐƠN HÀNG #${editingOrderId}`
                  : 'TAILOR CRAFT · ATELIER ORDER CONFIRMATION'}
              </span>
              {isViewingExisting && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Check className="w-3 h-3" />
                  Đã xác nhận đặt may
                </span>
              )}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141413] mt-0.5">
              {isViewingExisting
                ? 'Chi Tiết Phiếu May & Tiến Độ Chế Tác'
                : editingOrderId
                ? 'Xác Nhận Lưu Thay Đổi Đơn Đặt May'
                : 'Phiếu Xác Nhận Đặt May Trang Phục'}
            </h2>
            <p className="text-xs text-[#65615B] mt-0.5">
              {isViewingExisting
                ? `Đơn hàng tạo lúc ${selectedOrderForDetail.createdAt} · Dự kiến bàn giao: ${selectedOrderForDetail.estimatedDelivery}`
                : editingOrderId
                ? `Thông số mới sẽ được cập nhật trực tiếp vào đơn #${editingOrderId} mà không tạo thêm đơn trùng lặp.`
                : 'Quý khách vui lòng kiểm tra lại cấu hình thiết kế và thông số cơ thể trước khi xác nhận chế tác.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#65615B] hover:text-[#141413] rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <OrderDetailContent
          isViewingExisting={isViewingExisting}
          selectedOrderForDetail={selectedOrderForDetail}
          displayConfig={displayConfig}
          displayMeasurements={displayMeasurements}
          displayTotalPrice={displayTotalPrice}
          displayAddonPrice={displayAddonPrice}
          canvasSnapshotUrl={canvasSnapshotUrl}
          onClose={onClose}
          navigateToPage={navigateToPage}
        />

        {/* Footer Modal */}
        <div className="mt-6 pt-4 border-t border-[#EAE7E1] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2.5 text-xs font-medium border border-[#D8D4CC] rounded-lg hover:border-[#141413] flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In Phiếu Đặt May</span>
          </button>

          {isViewingExisting ? (
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => handleStartEditingOrder(selectedOrderForDetail)}
                className="px-4 py-2.5 text-xs font-medium border border-[#141413] text-[#141413] rounded-lg hover:bg-[#F4F2ED] transition-colors cursor-pointer"
              >
                Chỉnh Sửa Thông Số Đơn Này
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-semibold bg-[#141413] text-white rounded-lg hover:bg-[#2A2826] transition-colors cursor-pointer"
              >
                Đóng Chi Tiết Phiếu May
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-medium border border-[#D8D4CC] rounded-lg cursor-pointer"
              >
                Quay lại chỉnh sửa
              </button>
              <button
                type="button"
                onClick={handleConfirmCreateOrder}
                className="px-6 py-2.5 text-xs font-semibold bg-[#141413] text-white rounded-lg hover:bg-[#2A2826] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <PackageCheck className="w-4 h-4" />
                <span>
                  {editingOrderId
                    ? `Lưu Cập Nhật Đơn #${editingOrderId}`
                    : 'Xác Nhận Đặt May Ngay'}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
