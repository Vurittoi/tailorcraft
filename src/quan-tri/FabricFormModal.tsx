import React from 'react';
import { X } from 'lucide-react';
import { FabricColorKey, FabricOption } from '../fabricCatalogData';

interface FabricFormModalProps {
  editingFabric: FabricOption | null;
  formFabName: string;
  setFormFabName: React.Dispatch<React.SetStateAction<string>>;
  formFabCode: string;
  setFormFabCode: React.Dispatch<React.SetStateAction<string>>;
  formFabColorHex: string;
  setFormFabColorHex: React.Dispatch<React.SetStateAction<string>>;
  formFabPrice: number;
  setFormFabPrice: React.Dispatch<React.SetStateAction<number>>;
  formFabOrigin: string;
  setFormFabOrigin: React.Dispatch<React.SetStateAction<string>>;
  formFabComposition: string;
  setFormFabComposition: React.Dispatch<React.SetStateAction<string>>;
  formFabWeave: 'solid' | 'herringbone' | 'pinstripe';
  setFormFabWeave: React.Dispatch<
    React.SetStateAction<'solid' | 'herringbone' | 'pinstripe'>
  >;
  formFabColorGroup: FabricColorKey;
  setFormFabColorGroup: React.Dispatch<React.SetStateAction<FabricColorKey>>;
  onSaveFabricForm: (e: React.FormEvent) => void;
  onCloseForm: () => void;
}

export function FabricFormModal({
  editingFabric,
  formFabName,
  setFormFabName,
  formFabCode,
  setFormFabCode,
  formFabColorHex,
  setFormFabColorHex,
  formFabPrice,
  setFormFabPrice,
  formFabOrigin,
  setFormFabOrigin,
  formFabComposition,
  setFormFabComposition,
  formFabWeave,
  setFormFabWeave,
  formFabColorGroup,
  setFormFabColorGroup,
  onSaveFabricForm,
  onCloseForm,
}: FabricFormModalProps) {
  return (
    <form
      onSubmit={onSaveFabricForm}
      className="p-5 rounded-xl bg-[#FAF7F2] border border-[#D8C7AE] space-y-4"
    >
      <div className="flex items-center justify-between border-b border-[#E5DEC9] pb-2.5">
        <h3 className="font-display text-xl font-bold text-[#141413]">
          {editingFabric
            ? `Chỉnh Sửa Mẫu Vải: ${editingFabric.name} (${editingFabric.code})`
            : 'Thêm Mẫu Vải Bespoke Mới Vào Kho'}
        </h3>
        <button
          type="button"
          onClick={onCloseForm}
          className="p-1 text-[#65615B] hover:text-[#141413] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1">
            Tên mẫu vải hiển thị
          </label>
          <input
            type="text"
            required
            value={formFabName}
            onChange={(e) => setFormFabName(e.target.value)}
            placeholder="VD: Xanh Navy Loro Piana"
            className="w-full px-3 py-2 text-xs bg-white border border-[#D8D4CC] rounded-lg"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1">
            Mã định danh vải (Code)
          </label>
          <input
            type="text"
            required
            value={formFabCode}
            onChange={(e) => setFormFabCode(e.target.value)}
            placeholder="VD: TC-NVY-99"
            className="w-full px-3 py-2 text-xs font-mono-tabular bg-white border border-[#D8D4CC] rounded-lg"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1">
            Mã màu Hex & Bộ chọn màu
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={formFabColorHex}
              onChange={(e) => setFormFabColorHex(e.target.value)}
              className="w-9 h-9 rounded border border-[#D8D4CC] cursor-pointer"
            />
            <input
              type="text"
              value={formFabColorHex}
              onChange={(e) => setFormFabColorHex(e.target.value)}
              className="flex-1 px-3 py-2 text-xs font-mono-tabular bg-white border border-[#D8D4CC] rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1">
            Đơn giá may đo (VNĐ)
          </label>
          <input
            type="number"
            step={50000}
            value={formFabPrice}
            onChange={(e) => setFormFabPrice(Number(e.target.value))}
            className="w-full px-3 py-2 text-xs font-mono-tabular bg-white border border-[#D8D4CC] rounded-lg"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1">
            Xuất xứ nhà dệt (Origin)
          </label>
          <input
            type="text"
            value={formFabOrigin}
            onChange={(e) => setFormFabOrigin(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white border border-[#D8D4CC] rounded-lg"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1">
            Thành phần sợi (Composition)
          </label>
          <input
            type="text"
            value={formFabComposition}
            onChange={(e) => setFormFabComposition(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white border border-[#D8D4CC] rounded-lg"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1">
            Kiểu dệt mặc định (Weave)
          </label>
          <select
            value={formFabWeave}
            onChange={(e) =>
              setFormFabWeave(
                e.target.value as 'solid' | 'herringbone' | 'pinstripe'
              )
            }
            className="w-full px-3 py-2 text-xs bg-white border border-[#D8D4CC] rounded-lg"
          >
            <option value="solid">Trơn (Solid Weave)</option>
            <option value="herringbone">Xương cá (Herringbone)</option>
            <option value="pinstripe">Kẻ sọc mảnh (Pinstripe)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1">
            Nhóm màu bộ lọc
          </label>
          <select
            value={formFabColorGroup}
            onChange={(e) =>
              setFormFabColorGroup(e.target.value as FabricColorKey)
            }
            className="w-full px-3 py-2 text-xs bg-white border border-[#D8D4CC] rounded-lg"
          >
            <option value="blue">Xanh Navy / Blue</option>
            <option value="black">Đen / Black</option>
            <option value="grey">Xám / Charcoal Grey</option>
            <option value="brown">Nâu / Brown</option>
            <option value="beige">Kem / Beige</option>
            <option value="green">Xanh Rêu / Green</option>
            <option value="red">Đỏ Burgundy / Red</option>
            <option value="white">Trắng / Ivory</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCloseForm}
          className="px-4 py-2 text-xs font-medium border border-[#D8D4CC] bg-white rounded-lg cursor-pointer"
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          className="px-5 py-2 text-xs font-semibold bg-[#141413] text-white rounded-lg hover:bg-[#2A2826] cursor-pointer"
        >
          {editingFabric ? 'Lưu Thay Đổi Mẫu Vải' : 'Thêm Vào Kho Vải'}
        </button>
      </div>
    </form>
  );
}
