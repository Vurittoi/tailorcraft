import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { FabricColorKey, FabricOption } from '../fabricCatalogData';
import {
  NavPage,
  StyleOptionItem,
  TextureMaskAsset,
  UserAccount,
} from '../types/suitTypes';
import { AdminTabKey, AdminTabNavigation } from './AdminTabNavigation';
import { FabricFormModal } from './FabricFormModal';
import { FabricTableList } from './FabricTableList';
import { PricingManager } from './PricingManager';

interface AdminDashboardPageProps {
  currentUser: UserAccount;
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
  textureMaskAssets: TextureMaskAsset[];
  setTextureMaskAssets: React.Dispatch<
    React.SetStateAction<TextureMaskAsset[]>
  >;
  accounts: UserAccount[];
  onCreateTailorAccount: (newTailor: UserAccount) => void;
  onToggleAccountStatus: (accountId: string) => void;
  onDeleteAccount: (accountId: string) => void;
  onSwitchAccount: (account: UserAccount, redirectPage?: NavPage) => void;
  navigateToPage: (targetPage: NavPage) => void;
}

export function AdminDashboardPage({
  fabrics,
  setFabrics,
  lapelOptions,
  setLapelOptions,
  buttonOptions,
  setButtonOptions,
  pocketOptions,
  setPocketOptions,
}: AdminDashboardPageProps) {
  const [activeTab, setActiveTab] = useState<AdminTabKey>('fabrics');
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg(''), 3200);
  };

  // --- STATE QUẢN LÝ KHO VẢI ---
  const [fabricSearch, setFabricSearch] = useState<string>('');
  const [editingFabric, setEditingFabric] = useState<FabricOption | null>(null);
  const [isAddingFabric, setIsAddingFabric] = useState<boolean>(false);

  const [formFabName, setFormFabName] = useState<string>('');
  const [formFabCode, setFormFabCode] = useState<string>('');
  const [formFabColorHex, setFormFabColorHex] = useState<string>('#1F2937');
  const [formFabPrice, setFormFabPrice] = useState<number>(2850000);
  const [formFabOrigin, setFormFabOrigin] = useState<string>(
    'Biella, Ý — Loro Piana Mill'
  );
  const [formFabComposition, setFormFabComposition] = useState<string>(
    '100% Virgin Wool Super 150s'
  );
  const [formFabWeave, setFormFabWeave] = useState<
    'solid' | 'herringbone' | 'pinstripe'
  >('solid');
  const [formFabColorGroup, setFormFabColorGroup] =
    useState<FabricColorKey>('blue');

  const openAddFabricForm = () => {
    setEditingFabric(null);
    setIsAddingFabric(true);
    setFormFabName('');
    setFormFabCode(`TC-NEW-${Math.floor(10 + Math.random() * 89)}`);
    setFormFabColorHex('#263248');
    setFormFabPrice(2950000);
    setFormFabOrigin('Biella, Ý — Vitale Barberis Canonico');
    setFormFabComposition('100% Australian Merino Wool');
    setFormFabWeave('solid');
    setFormFabColorGroup('blue');
  };

  const openEditFabricForm = (fab: FabricOption) => {
    setIsAddingFabric(false);
    setEditingFabric(fab);
    setFormFabName(fab.name);
    setFormFabCode(fab.code);
    setFormFabColorHex(fab.colorHex);
    setFormFabPrice(fab.price);
    setFormFabOrigin(fab.origin);
    setFormFabComposition(fab.composition);
    setFormFabWeave(fab.defaultWeave);
    setFormFabColorGroup(fab.colorGroup);
  };

  const handleSaveFabricForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFabName.trim() || !formFabCode.trim()) return;

    if (editingFabric) {
      setFabrics((prev) =>
        prev.map((item) =>
          item.id === editingFabric.id
            ? {
                ...item,
                name: formFabName.trim(),
                code: formFabCode.trim().toUpperCase(),
                colorHex: formFabColorHex,
                price: Number(formFabPrice) || 2500000,
                origin: formFabOrigin.trim(),
                composition: formFabComposition.trim(),
                defaultWeave: formFabWeave,
                colorGroup: formFabColorGroup,
              }
            : item
        )
      );
      showToast(`Đã cập nhật thông tin mẫu vải ${formFabCode.toUpperCase()}`);
      setEditingFabric(null);
    } else {
      const newFab: FabricOption = {
        id: `fab_custom_${Date.now()}`,
        code: formFabCode.trim().toUpperCase(),
        name: formFabName.trim(),
        colorHex: formFabColorHex,
        price: Number(formFabPrice) || 2500000,
        origin: formFabOrigin.trim(),
        composition: formFabComposition.trim(),
        weightGrams: '260g/m',
        category: 'all_year',
        seasonLabel: 'Quanh năm (4 mùa)',
        tierLabel: 'Bespoke Atelier',
        defaultWeave: formFabWeave,
        features: ['new', 'premium'],
        occasions: ['business', 'celebration'],
        colorGroup: formFabColorGroup,
      };
      setFabrics((prev) => [newFab, ...prev]);
      showToast(`Đã thêm mẫu vải mới "${newFab.name}" vào danh mục hệ thống`);
      setIsAddingFabric(false);
    }
  };

  const handleDeleteFabric = (fab: FabricOption) => {
    if (fabrics.length <= 1) return;
    setFabrics((prev) => prev.filter((item) => item.id !== fab.id));
    showToast(`Đã xóa mẫu vải ${fab.name} (${fab.code}) khỏi kho vải`);
  };

  const filteredFabrics = fabrics.filter((f) => {
    const q = fabricSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      f.name.toLowerCase().includes(q) ||
      f.code.toLowerCase().includes(q) ||
      f.origin.toLowerCase().includes(q)
    );
  });

  return (
    <section className="max-w-[1380px] w-full mx-auto px-4 sm:px-8 py-8 flex-1 space-y-6">
      {/* 1. Thanh chuyển Tab chức năng (Vải / Giá) */}
      <AdminTabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        fabricsCount={fabrics.length}
      />

      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-semibold text-emerald-900 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 2 & 3. Bảng danh sách Kho vải, Tìm kiếm & Form Thêm mới / Chỉnh sửa Vải */}
      {activeTab === 'fabrics' && (
        <FabricTableList
          totalFabricsCount={fabrics.length}
          filteredFabrics={filteredFabrics}
          fabricSearch={fabricSearch}
          setFabricSearch={setFabricSearch}
          onOpenAddFabricForm={openAddFabricForm}
          onOpenEditFabricForm={openEditFabricForm}
          onDeleteFabric={handleDeleteFabric}
        >
          {(isAddingFabric || editingFabric) && (
            <FabricFormModal
              editingFabric={editingFabric}
              formFabName={formFabName}
              setFormFabName={setFormFabName}
              formFabCode={formFabCode}
              setFormFabCode={setFormFabCode}
              formFabColorHex={formFabColorHex}
              setFormFabColorHex={setFormFabColorHex}
              formFabPrice={formFabPrice}
              setFormFabPrice={setFormFabPrice}
              formFabOrigin={formFabOrigin}
              setFormFabOrigin={setFormFabOrigin}
              formFabComposition={formFabComposition}
              setFormFabComposition={setFormFabComposition}
              formFabWeave={formFabWeave}
              setFormFabWeave={setFormFabWeave}
              formFabColorGroup={formFabColorGroup}
              setFormFabColorGroup={setFormFabColorGroup}
              onSaveFabricForm={handleSaveFabricForm}
              onCloseForm={() => {
                setIsAddingFabric(false);
                setEditingFabric(null);
              }}
            />
          )}
        </FabricTableList>
      )}

      {/* 4. Khu vực điều chỉnh Đơn giá Phụ kiện & Vải hàng loạt */}
      {activeTab === 'pricing' && (
        <PricingManager
          fabrics={fabrics}
          setFabrics={setFabrics}
          lapelOptions={lapelOptions}
          setLapelOptions={setLapelOptions}
          buttonOptions={buttonOptions}
          setButtonOptions={setButtonOptions}
          pocketOptions={pocketOptions}
          setPocketOptions={setPocketOptions}
          showToast={showToast}
        />
      )}
    </section>
  );
}
