import React from 'react';
import { FabricOption } from '../fabricCatalogData';
import { StyleOptionItem } from '../types/suitTypes';

interface PricingManagerProps {
  fabrics: FabricOption[];
  setFabrics: React.Dispatch<React.SetStateAction<FabricOption[]>>;
  lapelOptions: StyleOptionItem<'notch' | 'peak'>[];
  setLapelOptions: React.Dispatch<
    React.SetStateAction<StyleOptionItem<'notch' | 'peak'>[]>
  >;
  buttonOptions: StyleOptionItem<'single' | 'double_two' | 'gold_brass'>[];
  setButtonOptions: React.Dispatch<
    React.SetStateAction<
      StyleOptionItem<'single' | 'double_two' | 'gold_brass'>[]
    >
  >;
  pocketOptions: StyleOptionItem<'flap' | 'jetted' | 'patched'>[];
  setPocketOptions: React.Dispatch<
    React.SetStateAction<StyleOptionItem<'flap' | 'jetted' | 'patched'>[]>
  >;
  showToast: (msg: string) => void;
}

export function PricingManager({
  fabrics,
  setFabrics,
  lapelOptions,
  setLapelOptions,
  buttonOptions,
  setButtonOptions,
  pocketOptions,
  setPocketOptions,
  showToast,
}: PricingManagerProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Cột trái: Đơn giá phụ thu Kiểu Cổ, Cúc, Túi */}
      <div className="lg:col-span-6 bg-white border border-[#E5E2DC] rounded-2xl p-6 space-y-5">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#141413]">
            Bảng Đơn Giá Phụ Thu Cấu Hình Áo Suit
          </h2>
          <p className="text-xs text-[#65615B]">
            Thay đổi đơn giá trực tiếp cho từng tùy chọn Cổ áo, Cúc áo và Túi áo.
          </p>
        </div>

        {/* Cổ áo */}
        <div className="space-y-2.5">
          <div className="text-xs font-bold text-[#8C6D46] uppercase">
            1. Đơn Giá Tùy Chọn Kiểu Ve Áo (Lapels)
          </div>
          {lapelOptions.map((item, idx) => (
            <div
              key={item.id}
              className="p-3 rounded-xl border border-[#EAE7E1] bg-[#F9F8F6] flex items-center justify-between gap-4"
            >
              <div>
                <div className="text-xs font-bold text-[#141413]">
                  {item.name} ({item.id})
                </div>
                <div className="text-[11px] text-[#65615B]">
                  {item.shortDesc}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="number"
                  step={10000}
                  value={item.price}
                  onChange={(e) => {
                    const val = Math.max(0, Number(e.target.value) || 0);
                    setLapelOptions((prev) =>
                      prev.map((l, i) => (i === idx ? { ...l, price: val } : l))
                    );
                  }}
                  className="w-32 px-3 py-1.5 text-xs font-mono-tabular font-bold bg-white border border-[#D8D4CC] rounded-lg text-right"
                />
                <span className="text-xs font-mono-tabular text-[#65615B]">
                  VNĐ
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Cúc áo */}
        <div className="space-y-2.5 pt-2">
          <div className="text-xs font-bold text-[#8C6D46] uppercase">
            2. Đơn Giá Tùy Chọn Cúc Áo (Buttons)
          </div>
          {buttonOptions.map((item, idx) => (
            <div
              key={item.id}
              className="p-3 rounded-xl border border-[#EAE7E1] bg-[#F9F8F6] flex items-center justify-between gap-4"
            >
              <div>
                <div className="text-xs font-bold text-[#141413]">
                  {item.name} ({item.id})
                </div>
                <div className="text-[11px] text-[#65615B]">
                  {item.shortDesc}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="number"
                  step={10000}
                  value={item.price}
                  onChange={(e) => {
                    const val = Math.max(0, Number(e.target.value) || 0);
                    setButtonOptions((prev) =>
                      prev.map((b, i) => (i === idx ? { ...b, price: val } : b))
                    );
                  }}
                  className="w-32 px-3 py-1.5 text-xs font-mono-tabular font-bold bg-white border border-[#D8D4CC] rounded-lg text-right"
                />
                <span className="text-xs font-mono-tabular text-[#65615B]">
                  VNĐ
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Túi áo */}
        <div className="space-y-2.5 pt-2">
          <div className="text-xs font-bold text-[#8C6D46] uppercase">
            3. Đơn Giá Tùy Chọn Túi Áo (Pockets)
          </div>
          {pocketOptions.map((item, idx) => (
            <div
              key={item.id}
              className="p-3 rounded-xl border border-[#EAE7E1] bg-[#F9F8F6] flex items-center justify-between gap-4"
            >
              <div>
                <div className="text-xs font-bold text-[#141413]">
                  {item.name} ({item.id})
                </div>
                <div className="text-[11px] text-[#65615B]">
                  {item.shortDesc}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="number"
                  step={10000}
                  value={item.price}
                  onChange={(e) => {
                    const val = Math.max(0, Number(e.target.value) || 0);
                    setPocketOptions((prev) =>
                      prev.map((p, i) => (i === idx ? { ...p, price: val } : p))
                    );
                  }}
                  className="w-32 px-3 py-1.5 text-xs font-mono-tabular font-bold bg-white border border-[#D8D4CC] rounded-lg text-right"
                />
                <span className="text-xs font-mono-tabular text-[#65615B]">
                  VNĐ
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            showToast(
              'Đã cập nhật biểu phí phụ kiện và đồng bộ sang bộ tính giá thời gian thực!'
            )
          }
          className="w-full py-2.5 bg-[#141413] text-white text-xs font-semibold rounded-lg hover:bg-[#2A2826] cursor-pointer"
        >
          Xác Nhận Áp Dụng Biểu Giá Phụ Kiện
        </button>
      </div>

      {/* Cột phải: Cập nhật nhanh đơn giá Vải */}
      <div className="lg:col-span-6 bg-white border border-[#E5E2DC] rounded-2xl p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#141413]">
              Điều Chỉnh Nhanh Đơn Giá Vải Chính
            </h2>
            <p className="text-xs text-[#65615B]">
              Chỉnh sửa trực tiếp đơn giá từng mã vải hoặc điều chỉnh hàng loạt.
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setFabrics((prev) =>
                  prev.map((f) => ({
                    ...f,
                    price: Math.round((f.price * 1.05) / 10000) * 10000,
                  }))
                );
                showToast('Đã tăng +5% đơn giá toàn bộ kho vải');
              }}
              className="px-2.5 py-1.5 text-xs font-semibold border border-[#D8D4CC] rounded-lg hover:border-[#141413] cursor-pointer"
            >
              +5% Toàn kho
            </button>
            <button
              type="button"
              onClick={() => {
                setFabrics((prev) =>
                  prev.map((f) => ({
                    ...f,
                    price: Math.round((f.price * 0.95) / 10000) * 10000,
                  }))
                );
                showToast('Đã giảm -5% đơn giá toàn bộ kho vải');
              }}
              className="px-2.5 py-1.5 text-xs font-semibold border border-[#D8D4CC] rounded-lg hover:border-[#141413] cursor-pointer"
            >
              -5% Toàn kho
            </button>
          </div>
        </div>

        <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
          {fabrics.slice(0, 20).map((fab) => (
            <div
              key={fab.id}
              className="p-3 rounded-xl border border-[#EAE7E1] bg-[#F9F8F6] flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-5 h-5 rounded-full border border-black/15 shrink-0"
                  style={{ backgroundColor: fab.colorHex }}
                />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#141413] truncate">
                    {fab.name}{' '}
                    <span className="font-mono-tabular text-[#8C6D46]">
                      ({fab.code})
                    </span>
                  </div>
                  <div className="text-[11px] text-[#65615B] truncate">
                    {fab.origin}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="number"
                  step={50000}
                  value={fab.price}
                  onChange={(e) => {
                    const nextPrice = Math.max(
                      500000,
                      Number(e.target.value) || 0
                    );
                    setFabrics((prev) =>
                      prev.map((item) =>
                        item.id === fab.id
                          ? { ...item, price: nextPrice }
                          : item
                      )
                    );
                  }}
                  className="w-32 px-2.5 py-1.5 text-xs font-mono-tabular font-bold bg-white border border-[#D8D4CC] rounded-lg text-right"
                />
                <span className="text-xs font-mono-tabular text-[#65615B]">
                  ₫
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
