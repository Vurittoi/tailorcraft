import React from 'react';
import { Edit3, Plus, Search, Trash2 } from 'lucide-react';
import {
  FabricOption,
  getSmallPreviewSwatchUrl,
} from '../fabricCatalogData';
import { formatVND } from '../types/suitTypes';

interface FabricTableListProps {
  totalFabricsCount: number;
  filteredFabrics: FabricOption[];
  fabricSearch: string;
  setFabricSearch: React.Dispatch<React.SetStateAction<string>>;
  onOpenAddFabricForm: () => void;
  onOpenEditFabricForm: (fab: FabricOption) => void;
  onDeleteFabric: (fab: FabricOption) => void;
  children?: React.ReactNode;
}

export function FabricTableList({
  totalFabricsCount,
  filteredFabrics,
  fabricSearch,
  setFabricSearch,
  onOpenAddFabricForm,
  onOpenEditFabricForm,
  onDeleteFabric,
  children,
}: FabricTableListProps) {
  return (
    <div className="bg-white border border-[#E5E2DC] rounded-2xl p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#EAE7E1]">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#141413]">
            Quản Lý Danh Mục Kho Vải Thượng Hạng ({totalFabricsCount} mẫu)
          </h2>
          <p className="text-xs text-[#65615B]">
            Mọi thao tác Thêm, Sửa hoặc Xóa vải tại đây đều đồng bộ tức thì sang trang Thiết kế 2D (`ConfiguratorPage.tsx`).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#8A857D] absolute left-3 top-2.5" />
            <input
              type="text"
              value={fabricSearch}
              onChange={(e) => setFabricSearch(e.target.value)}
              placeholder="Tìm mã vải, tên vải..."
              className="pl-8 pr-3 py-2 text-xs bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413]"
            />
          </div>

          <button
            type="button"
            onClick={onOpenAddFabricForm}
            className="px-4 py-2 text-xs font-semibold bg-[#141413] text-white rounded-lg hover:bg-[#2A2826] flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Mẫu Vải Mới</span>
          </button>
        </div>
      </div>

      {/* Khe cắm hiển thị FabricFormModal khi đang Thêm hoặc Sửa vải */}
      {children}

      {/* Bảng danh sách mẫu vải */}
      <div className="overflow-x-auto max-h-[520px] overflow-y-auto border border-[#E5E2DC] rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="bg-[#F4F2ED] text-[#141413] sticky top-0 z-10 border-b border-[#E5E2DC]">
            <tr>
              <th className="py-3 px-4 font-semibold">Mẫu Vải</th>
              <th className="py-3 px-4 font-semibold">Mã Code</th>
              <th className="py-3 px-4 font-semibold">Tên Vải & Xuất Xứ</th>
              <th className="py-3 px-4 font-semibold">Kiểu Dệt</th>
              <th className="py-3 px-4 font-semibold">Đơn Giá (VNĐ)</th>
              <th className="py-3 px-4 font-semibold text-right">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAE7E1]">
            {filteredFabrics.map((fab) => (
              <tr key={fab.id} className="hover:bg-[#FAF9F6]">
                <td className="py-2.5 px-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={getSmallPreviewSwatchUrl(fab)}
                      alt={fab.name}
                      className="w-8 h-8 rounded-md border border-black/15 object-cover"
                    />
                    <span className="font-mono-tabular text-[11px] text-[#65615B]">
                      {fab.colorHex}
                    </span>
                  </div>
                </td>
                <td className="py-2.5 px-4 font-mono-tabular font-bold text-[#8C6D46]">
                  {fab.code}
                </td>
                <td className="py-2.5 px-4">
                  <div className="font-semibold text-[#141413]">{fab.name}</div>
                  <div className="text-[11px] text-[#65615B]">
                    {fab.origin} · {fab.composition}
                  </div>
                </td>
                <td className="py-2.5 px-4 font-mono-tabular text-[#57534E]">
                  {fab.defaultWeave}
                </td>
                <td className="py-2.5 px-4 font-mono-tabular font-bold text-[#141413]">
                  {formatVND(fab.price)}
                </td>
                <td className="py-2.5 px-4 text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onOpenEditFabricForm(fab)}
                      className="px-2.5 py-1.5 rounded-md border border-[#D8D4CC] text-[#141413] hover:border-[#141413] flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Sửa</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteFabric(fab)}
                      className="px-2.5 py-1.5 rounded-md border border-red-200 text-red-700 hover:bg-red-50 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
