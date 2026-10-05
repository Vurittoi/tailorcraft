import React from 'react';
import { Heart, Plus, Sparkles, Trash2 } from 'lucide-react';
import {
  FabricOption,
  getSmallPreviewSwatchUrl,
} from '../fabricCatalogData';
import { formatVND, NavPage, UserAccount } from '../types/suitTypes';

interface FavoriteFabricsCardProps {
  currentUser: UserAccount;
  favoriteFabrics: FabricOption[];
  suggestedFabrics: FabricOption[];
  onToggleFavoriteFabric: (fabricId: string) => void;
  onSelectFabricAndCustomize: (fabric: FabricOption) => void;
  navigateToPage: (targetPage: NavPage) => void;
}

export function FavoriteFabricsCard({
  currentUser,
  favoriteFabrics,
  suggestedFabrics,
  onToggleFavoriteFabric,
  onSelectFabricAndCustomize,
  navigateToPage,
}: FavoriteFabricsCardProps) {
  return (
    <div className="lg:col-span-6 bg-white border border-[#E5E2DC] rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-[#EAE7E1] pb-4">
        <div className="flex items-center gap-2.5">
          <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
          <div>
            <h2 className="font-display text-2xl font-bold text-[#141413]">
              Mẫu Vải & Thiết Kế Yêu Thích ({favoriteFabrics.length})
            </h2>
            <p className="text-xs text-[#65615B]">
              Các mẫu vải Suit thượng hạng mà tài khoản @{currentUser.username}{' '}
              đã lưu
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigateToPage('configurator')}
          className="text-xs font-semibold text-[#8C6D46] hover:text-[#141413] underline cursor-pointer shrink-0"
        >
          Khám phá thêm →
        </button>
      </div>

      {favoriteFabrics.length === 0 ? (
        <div className="p-6 text-center bg-[#F9F8F6] rounded-xl border border-[#EAE7E1] text-xs text-[#65615B]">
          Tài khoản của quý khách chưa lưu mẫu vải yêu thích nào. Quý khách có
          thể bấm chọn thêm từ gợi ý bên dưới.
        </div>
      ) : (
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {favoriteFabrics.map((fab) => (
            <div
              key={fab.id}
              className="p-3.5 rounded-xl border border-[#E5E2DC] bg-[#F9F8F6] flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={getSmallPreviewSwatchUrl(fab)}
                  alt={fab.name}
                  className="w-12 h-12 rounded-lg object-cover border border-black/15 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#141413] truncate">
                    {fab.name}
                  </div>
                  <div className="text-xs text-[#65615B] truncate">
                    Mã: {fab.code} · {fab.origin}
                  </div>
                  <div className="font-mono-tabular text-xs font-semibold text-[#8C6D46] mt-0.5">
                    {formatVND(fab.price)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onSelectFabricAndCustomize(fab)}
                  className="px-3 py-1.5 text-xs font-semibold bg-[#141413] text-white rounded-lg hover:bg-[#2A2826] flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Thiết kế ngay</span>
                </button>
                <button
                  type="button"
                  onClick={() => onToggleFavoriteFabric(fab.id)}
                  className="p-1.5 text-[#65615B] hover:text-rose-600 rounded-lg border border-[#D8D4CC] bg-white cursor-pointer"
                  title="Bỏ khỏi danh sách yêu thích"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gợi ý thêm nhanh vào danh sách yêu thích */}
      {suggestedFabrics.length > 0 && (
        <div className="pt-3 border-t border-[#EAE7E1] space-y-2.5">
          <div className="text-xs font-semibold text-[#141413]">
            Gợi ý thêm vào danh mục yêu thích của quý khách:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedFabrics.slice(0, 4).map((fab) => (
              <div
                key={fab.id}
                className="p-2.5 rounded-lg border border-[#EAE7E1] bg-white flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-5 h-5 rounded-full border border-black/15 shrink-0"
                    style={{ backgroundColor: fab.colorHex }}
                  />
                  <span className="text-xs font-medium text-[#141413] truncate">
                    {fab.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleFavoriteFabric(fab.id)}
                  className="px-2 py-1 text-[11px] font-semibold text-[#8C6D46] hover:text-[#141413] flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Yêu thích</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
