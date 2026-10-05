import { SuitConfigState } from './suitCanvasEngine';

export type FabricCategory =
  | 'all_year'
  | 'summer_linen'
  | 'winter_flannel'
  | 'luxury_party';

export type FabricFeatureKey =
  | 'new'
  | 'bestseller'
  | 'premium'
  | 'branded'
  | 'stretch'
  | 'tweed'
  | 'seasonal';

export type FabricOccasionKey =
  | 'business'
  | 'casual'
  | 'celebration'
  | 'smart_casual';

export type FabricColorKey =
  | 'blue'
  | 'white'
  | 'black'
  | 'grey'
  | 'green'
  | 'purple'
  | 'yellow'
  | 'brown'
  | 'red'
  | 'beige'
  | 'pink'
  | 'terracotta';

export type TriStateFilter = 'default' | 'include' | 'exclude';

export interface FabricOption {
  id: string;
  code: string;
  name: string;
  colorHex: string;
  price: number;
  origin: string;
  composition: string;
  weightGrams: string;
  category: FabricCategory;
  seasonLabel: string;
  tierLabel: string;
  defaultWeave: SuitConfigState['weavePattern'];
  features: FabricFeatureKey[];
  occasions: FabricOccasionKey[];
  colorGroup: FabricColorKey;
}

export const FABRIC_FEATURE_FILTERS: {
  key: FabricFeatureKey;
  label: string;
  viSub: string;
}[] = [
  { key: 'new', label: 'New', viSub: 'Mẫu mới ra mắt' },
  { key: 'bestseller', label: 'Best-Seller', viSub: 'Bán chạy nhất' },
  { key: 'premium', label: 'Premium', viSub: 'Thượng hạng Super 130s+' },
  { key: 'branded', label: 'Branded Fabrics', viSub: 'Nhà dệt danh tiếng Ý & Anh' },
  { key: 'stretch', label: 'Stretch', viSub: 'Co giãn thoải mái' },
  { key: 'tweed', label: 'Tweed', viSub: 'Vải Tweed cổ điển' },
  { key: 'seasonal', label: 'Seasonal Color', viSub: 'Sắc màu theo mùa' },
];

export const FABRIC_OCCASION_FILTERS: {
  key: FabricOccasionKey;
  label: string;
  viSub: string;
}[] = [
  { key: 'business', label: 'Business', viSub: 'Công sở & Doanh nhân' },
  { key: 'casual', label: 'Casual', viSub: 'Thường ngày phóng khoáng' },
  { key: 'celebration', label: 'Celebration', viSub: 'Dạ tiệc & Lễ cưới' },
  { key: 'smart_casual', label: 'Smart Casual', viSub: 'Thanh lịch đa dụng' },
];

export const FABRIC_COLOR_FILTERS: {
  key: FabricColorKey;
  label: string;
  topLeftHex: string;
  bottomRightHex: string;
}[] = [
  {
    key: 'blue',
    label: 'Xanh Navy & Blue',
    topLeftHex: '#35509B',
    bottomRightHex: '#CBD5F0',
  },
  {
    key: 'white',
    label: 'Trắng & Kem Sáng',
    topLeftHex: '#F0EFEA',
    bottomRightHex: '#E5E4DF',
  },
  {
    key: 'black',
    label: 'Đen Tuyền',
    topLeftHex: '#0A0A0A',
    bottomRightHex: '#1C1C1C',
  },
  {
    key: 'grey',
    label: 'Xám Than & Xám Tro',
    topLeftHex: '#7A7D80',
    bottomRightHex: '#9C9FA2',
  },
  {
    key: 'green',
    label: 'Xanh Rêu & Lục Bảo',
    topLeftHex: '#76B569',
    bottomRightHex: '#9EC68E',
  },
  {
    key: 'purple',
    label: 'Tím Mận & Plum',
    topLeftHex: '#916CA6',
    bottomRightHex: '#AE90BF',
  },
  {
    key: 'yellow',
    label: 'Vàng Cát & Amber',
    topLeftHex: '#F2D06B',
    bottomRightHex: '#FAE8A4',
  },
  {
    key: 'brown',
    label: 'Nâu Espresso & Mocha',
    topLeftHex: '#695341',
    bottomRightHex: '#87705C',
  },
  {
    key: 'red',
    label: 'Đỏ Rượu & Bordeaux',
    topLeftHex: '#9C4D46',
    bottomRightHex: '#C4645C',
  },
  {
    key: 'beige',
    label: 'Be Cát & Kem Ngà',
    topLeftHex: '#F2DDC4',
    bottomRightHex: '#E5DFD0',
  },
  {
    key: 'pink',
    label: 'Hồng Dusty Rose',
    topLeftHex: '#D88CB8',
    bottomRightHex: '#DEAAC8',
  },
  {
    key: 'terracotta',
    label: 'Cam Đất Terracotta',
    topLeftHex: '#D97B48',
    bottomRightHex: '#E8926B',
  },
];

export const getWeaveSwatchOverlay = (
  weave: SuitConfigState['weavePattern']
): string => {
  switch (weave) {
    case 'pinstripe':
      return 'repeating-linear-gradient(90deg, rgba(255,255,255,0.26) 0px, rgba(255,255,255,0.26) 1px, transparent 1px, transparent 9px)';
    case 'herringbone':
      return 'repeating-linear-gradient(135deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.16) 2.5px, rgba(0,0,0,0.22) 2.5px, rgba(0,0,0,0.22) 5px)';
    case 'glen_check':
      return 'repeating-linear-gradient(90deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.16) 1px, transparent 1px, transparent 8px), repeating-linear-gradient(0deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.16) 1px, transparent 1px, transparent 8px)';
    case 'birdseye':
      return 'radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.25) 1px, transparent 1px)';
    default:
      return 'repeating-linear-gradient(135deg, rgba(255,255,255,0.09) 0px, rgba(255,255,255,0.09) 1.5px, rgba(0,0,0,0.14) 1.5px, rgba(0,0,0,0.14) 3px)';
  }
};

// ============================================================================
// BỘ XỬ LÝ ĐA ĐỘ PHÂN GIẢI CHO HÌNH ẢNH MẪU VẢI (MULTI-RESOLUTION IMAGE PIPELINE)
// 1. Bản Preview nhỏ (36x36px, WebP nén 0.65): Tải tức thì cho danh sách 50 mẫu vải
// 2. Bản Độ phân giải cao HD (160x160px Retina Macro, Lossless PNG/WebP 0.98):
//    Tự động kích hoạt khi người dùng chọn mẫu vải để hiển thị rõ nét từng sợi dệt
// ============================================================================
const smallPreviewSwatchCache = new Map<string, string>();
const highResSwatchCache = new Map<string, string>();

function renderFabricTextureToCanvas(
  size: number,
  colorHex: string,
  weave: SuitConfigState['weavePattern'],
  isHighRes: boolean
): HTMLCanvasElement | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const scale = size / 48;

  // 1. Nền màu vải gốc
  ctx.fillStyle = colorHex;
  ctx.fillRect(0, 0, size, size);

  // 2. Nếu ở chế độ HD (khi được chọn), vẽ thêm lớp sợi dệt vi mô (Micro-Yarn Fibers) sắc nét
  if (isHighRes) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.045)';
    ctx.lineWidth = 0.75;
    for (let y = 0; y < size; y += 2.5) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.07)';
    for (let x = 0; x < size; x += 3) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }
  }

  // 3. Vẽ họa tiết dệt đặc trưng theo tỷ lệ độ phân giải
  if (weave === 'pinstripe') {
    ctx.strokeStyle = isHighRes
      ? 'rgba(255, 255, 255, 0.34)'
      : 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = Math.max(1, 1.1 * scale);
    ctx.setLineDash([2 * scale, 2 * scale]);
    const step = 9 * scale;
    for (let x = 5 * scale; x < size; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  } else if (weave === 'herringbone') {
    ctx.strokeStyle = isHighRes
      ? 'rgba(255, 255, 255, 0.18)'
      : 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = Math.max(1, 1.25 * scale);
    const stepY = 7 * scale;
    const stepX = 12 * scale;
    for (let y = -stepY; y < size + stepY; y += stepY) {
      for (let x = 0; x < size; x += stepX) {
        ctx.beginPath();
        ctx.moveTo(x, y + 5 * scale);
        ctx.lineTo(x + 6 * scale, y);
        ctx.lineTo(x + 12 * scale, y + 5 * scale);
        ctx.stroke();
      }
    }
    if (isHighRes) {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.22)';
      for (let y = -stepY + 3.5 * scale; y < size + stepY; y += stepY) {
        for (let x = 0; x < size; x += stepX) {
          ctx.beginPath();
          ctx.moveTo(x, y + 5 * scale);
          ctx.lineTo(x + 6 * scale, y);
          ctx.lineTo(x + 12 * scale, y + 5 * scale);
          ctx.stroke();
        }
      }
    }
  } else if (weave === 'glen_check') {
    ctx.strokeStyle = isHighRes
      ? 'rgba(255, 255, 255, 0.19)'
      : 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = Math.max(0.9, 1 * scale);
    const gridStep = 7.5 * scale;
    for (let i = 5 * scale; i < size; i += gridStep) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size);
      ctx.moveTo(0, i);
      ctx.lineTo(size, i);
      ctx.stroke();
    }
    ctx.strokeStyle = isHighRes
      ? 'rgba(212, 175, 55, 0.34)'
      : 'rgba(212, 175, 55, 0.22)';
    ctx.lineWidth = Math.max(1, 1.15 * scale);
    const accentPos = Math.round(size * 0.46);
    ctx.beginPath();
    ctx.moveTo(accentPos, 0);
    ctx.lineTo(accentPos, size);
    ctx.moveTo(0, accentPos);
    ctx.lineTo(size, accentPos);
    ctx.stroke();
  } else if (weave === 'birdseye') {
    const dotStep = 4.5 * scale;
    const dotSize = Math.max(1.2, 1.45 * scale);
    ctx.fillStyle = isHighRes
      ? 'rgba(255, 255, 255, 0.21)'
      : 'rgba(255, 255, 255, 0.16)';
    for (let x = 2 * scale; x < size; x += dotStep) {
      for (let y = 2 * scale; y < size; y += dotStep) {
        ctx.fillRect(x, y, dotSize, dotSize);
      }
    }
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    for (let x = 0; x < size; x += dotStep) {
      for (let y = 0; y < size; y += dotStep) {
        ctx.fillRect(x, y, dotSize * 0.85, dotSize * 0.85);
      }
    }
  } else {
    // Vân chéo Twill Super 130s
    ctx.strokeStyle = isHighRes
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = Math.max(0.9, 1 * scale);
    const twillStep = (isHighRes ? 3.5 : 5) * scale;
    for (let i = -size; i < size * 2; i += twillStep) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + size, size);
      ctx.stroke();
    }
  }

  // 4. Ánh sáng nếp vải 3D (Fabric Drape & Specular Sheen)
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, isHighRes ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.13)');
  grad.addColorStop(0.45, 'rgba(255, 255, 255, 0.02)');
  grad.addColorStop(0.75, 'rgba(0, 0, 0, 0.10)');
  grad.addColorStop(1, isHighRes ? 'rgba(0, 0, 0, 0.28)' : 'rgba(0, 0, 0, 0.22)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  return canvas;
}

/**
 * Tạo bản Preview kích thước nhỏ (36x36px, WebP nén 0.65 ~220 bytes)
 * dùng cho danh sách 50 mẫu vải nhằm giảm tối đa thời gian tải ban đầu
 */
export function getSmallPreviewSwatchUrl(fabric: FabricOption): string {
  const cached = smallPreviewSwatchCache.get(fabric.id);
  if (cached) return cached;

  const canvas = renderFabricTextureToCanvas(
    36,
    fabric.colorHex,
    fabric.defaultWeave,
    false
  );
  if (!canvas) return '';

  const smallDataUrl = canvas.toDataURL('image/webp', 0.65);
  smallPreviewSwatchCache.set(fabric.id, smallDataUrl);
  return smallDataUrl;
}

/**
 * Tạo bản Độ phân giải cao HD (160x160px Retina Macro, chất lượng 0.98)
 * chỉ tạo theo yêu cầu (on-demand) khi người dùng CHỌN mẫu vải để giữ độ sắc nét tuyệt đối
 */
export function getHighResFabricSwatchUrl(
  fabric: FabricOption,
  weaveOverride?: SuitConfigState['weavePattern']
): string {
  const activeWeave = weaveOverride || fabric.defaultWeave;
  const cacheKey = `${fabric.id}__${activeWeave}`;
  const cached = highResSwatchCache.get(cacheKey);
  if (cached) return cached;

  const canvas = renderFabricTextureToCanvas(
    160,
    fabric.colorHex,
    activeWeave,
    true
  );
  if (!canvas) return '';

  const hdDataUrl = canvas.toDataURL('image/webp', 0.98);
  highResSwatchCache.set(cacheKey, hdDataUrl);
  return hdDataUrl;
}

export function getCompressedFabricSwatchUrl(fabric: FabricOption): string {
  return getSmallPreviewSwatchUrl(fabric);
}

// ============================================================================
// DANH SÁCH 50 MẪU VẢI HOCKERTY EDITION ĐẦY ĐỦ THUỘC TÍNH LỌC
// ============================================================================
export const FABRIC_CATALOG: FabricOption[] = [
  // --- NHÓM 1: BLACK & ONYX (6 MẪU) ---
  {
    id: 'luxury_black',
    code: 'HCK-01-BLK',
    name: 'Đen Luxury',
    colorHex: '#121212',
    price: 1850000,
    origin: 'Biella, Ý',
    composition: '100% Virgin Wool Super 130s',
    weightGrams: '260g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm',
    tierLabel: 'Premium Super 130s',
    defaultWeave: 'solid',
    features: ['bestseller', 'premium', 'branded'],
    occasions: ['business', 'celebration'],
    colorGroup: 'black',
  },
  {
    id: 'royal_navy',
    code: 'HCK-02-NVY',
    name: 'Xanh Navy Hoàng Gia',
    colorHex: '#1B2A4A',
    price: 1950000,
    origin: 'Huddersfield, Anh Quốc',
    composition: '100% Worsted Merino Wool',
    weightGrams: '280g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm',
    tierLabel: 'Best-Seller',
    defaultWeave: 'solid',
    features: ['bestseller', 'branded'],
    occasions: ['business', 'celebration', 'smart_casual'],
    colorGroup: 'blue',
  },
  {
    id: 'charcoal_grey',
    code: 'HCK-03-GRY',
    name: 'Xám Than Đậm',
    colorHex: '#3A3D40',
    price: 1890000,
    origin: 'Biella, Ý',
    composition: '100% Super 120s Twill Flannel',
    weightGrams: '270g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm',
    tierLabel: 'Best-Seller',
    defaultWeave: 'solid',
    features: ['bestseller', 'branded'],
    occasions: ['business', 'smart_casual'],
    colorGroup: 'grey',
  },
  {
    id: 'wine_brown',
    code: 'HCK-04-BRG',
    name: 'Nâu Rượu Vang',
    colorHex: '#4A2511',
    price: 2250000,
    origin: 'Trivero, Ý',
    composition: '90% Wool · 10% Cashmere Thượng Hạng',
    weightGrams: '290g/m',
    category: 'luxury_party',
    seasonLabel: 'Thu Đông · Dạ Tiệc',
    tierLabel: 'Premium Cashmere',
    defaultWeave: 'herringbone',
    features: ['premium', 'branded', 'seasonal'],
    occasions: ['celebration', 'smart_casual'],
    colorGroup: 'brown',
  },
  {
    id: 'obsidian_stretch_black',
    code: 'HCK-05-BLK',
    name: 'Đen Obsidian Co Giãn',
    colorHex: '#19191B',
    price: 1590000,
    origin: 'Milano, Ý',
    composition: '96% Merino Wool · 4% Lycra Stretch',
    weightGrams: '250g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm',
    tierLabel: 'Stretch Comfort',
    defaultWeave: 'solid',
    features: ['bestseller', 'stretch'],
    occasions: ['business', 'smart_casual'],
    colorGroup: 'black',
  },
  {
    id: 'midnight_barathea_tux',
    code: 'HCK-06-BLK',
    name: 'Đen Dạ Tiệc Barathea',
    colorHex: '#0D0E12',
    price: 2590000,
    origin: 'Biella, Ý',
    composition: '85% Super 140s Wool · 15% Barathea Silk',
    weightGrams: '275g/m',
    category: 'luxury_party',
    seasonLabel: 'Dạ Tiệc & Lễ Cưới',
    tierLabel: 'Premium Gala',
    defaultWeave: 'birdseye',
    features: ['new', 'premium', 'branded'],
    occasions: ['celebration'],
    colorGroup: 'black',
  },
  {
    id: 'onyx_pinstripe_black',
    code: 'HCK-07-BLK',
    name: 'Đen Kẻ Sọc Phố Wall',
    colorHex: '#16171A',
    price: 2150000,
    origin: 'Savile Row, Anh Quốc',
    composition: '100% Worsted English Wool',
    weightGrams: '285g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm',
    tierLabel: 'Branded Fabrics',
    defaultWeave: 'pinstripe',
    features: ['branded', 'premium'],
    occasions: ['business', 'celebration'],
    colorGroup: 'black',
  },
  {
    id: 'caviar_herringbone_black',
    code: 'HCK-08-BLK',
    name: 'Đen Caviar Xương Cá',
    colorHex: '#1E1F22',
    price: 1990000,
    origin: 'Yorkshire, Anh Quốc',
    composition: '100% Pure Merino Wool',
    weightGrams: '295g/m',
    category: 'winter_flannel',
    seasonLabel: 'Thu Đông',
    tierLabel: 'Savile Row Cut',
    defaultWeave: 'herringbone',
    features: ['new'],
    occasions: ['business', 'celebration'],
    colorGroup: 'black',
  },
  {
    id: 'graphite_shadow_check',
    code: 'HCK-09-BLK',
    name: 'Đen Kẻ Ô Chìm',
    colorHex: '#232528',
    price: 2190000,
    origin: 'Biella, Ý',
    composition: '98% Virgin Wool · 2% Elastane',
    weightGrams: '265g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm',
    tierLabel: 'Stretch Luxury',
    defaultWeave: 'glen_check',
    features: ['new', 'stretch', 'branded'],
    occasions: ['business', 'smart_casual', 'celebration'],
    colorGroup: 'black',
  },

  // --- NHÓM 2: BLUE & NAVY (9 MẪU) ---
  {
    id: 'cobalt_royal_blue',
    code: 'HCK-10-BLU',
    name: 'Xanh Cobalt Milano',
    colorHex: '#1D4273',
    price: 1990000,
    origin: 'Biella, Ý',
    composition: '100% Merino Wool Super 110s',
    weightGrams: '250g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm',
    tierLabel: 'Best-Seller',
    defaultWeave: 'birdseye',
    features: ['bestseller', 'branded'],
    occasions: ['business', 'celebration', 'smart_casual'],
    colorGroup: 'blue',
  },
  {
    id: 'banker_navy_pinstripe',
    code: 'HCK-11-BLU',
    name: 'Navy Kẻ Sọc',
    colorHex: '#152036',
    price: 2490000,
    origin: 'Savile Row, Anh Quốc',
    composition: '100% Super 140s Worsted Wool',
    weightGrams: '285g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm',
    tierLabel: 'Premium Super 140s',
    defaultWeave: 'pinstripe',
    features: ['premium', 'branded', 'bestseller'],
    occasions: ['business'],
    colorGroup: 'blue',
  },
  {
    id: 'serenity_sky_linen',
    code: 'HCK-12-BLU',
    name: 'Xanh Bầu Trời',
    colorHex: '#4A6E8C',
    price: 1750000,
    origin: 'Bergamo, Ý',
    composition: '55% Pure Linen · 45% Virgin Wool',
    weightGrams: '220g/m',
    category: 'summer_linen',
    seasonLabel: 'Mùa Hè · Resort',
    tierLabel: 'Summer Linen',
    defaultWeave: 'birdseye',
    features: ['new', 'seasonal', 'branded'],
    occasions: ['casual', 'celebration', 'smart_casual'],
    colorGroup: 'blue',
  },
  {
    id: 'aegean_azure_stretch',
    code: 'HCK-13-BLU',
    name: 'Xanh Đại Dương Co Giãn',
    colorHex: '#224C7A',
    price: 1850000,
    origin: 'Biella, Ý',
    composition: '97% Super 120s Wool · 3% Elastane',
    weightGrams: '245g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm',
    tierLabel: 'Stretch Active',
    defaultWeave: 'solid',
    features: ['stretch', 'branded', 'bestseller'],
    occasions: ['business', 'smart_casual'],
    colorGroup: 'blue',
  },
  {
    id: 'oxford_navy_herringbone',
    code: 'HCK-14-BLU',
    name: 'Navy Xương Cá Anh Quốc',
    colorHex: '#1A273D',
    price: 2290000,
    origin: 'Huddersfield, Anh Quốc',
    composition: '100% English Tweed Wool',
    weightGrams: '310g/m',
    category: 'winter_flannel',
    seasonLabel: 'Thu Đông',
    tierLabel: 'Tweed Heritage',
    defaultWeave: 'herringbone',
    features: ['tweed', 'branded'],
    occasions: ['business', 'smart_casual'],
    colorGroup: 'blue',
  },
  {
    id: 'windsor_blue_glencheck',
    code: 'HCK-15-BLU',
    name: 'Xanh Kẻ Ô Hoàng Gia',
    colorHex: '#283C5A',
    price: 2390000,
    origin: 'Biella, Ý',
    composition: '100% Super 130s Virgin Wool',
    weightGrams: '265g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm',
    tierLabel: 'Premium Check',
    defaultWeave: 'glen_check',
    features: ['new', 'premium', 'branded'],
    occasions: ['business', 'celebration', 'smart_casual'],
    colorGroup: 'blue',
  },
  {
    id: 'capri_indigo_linen',
    code: 'HCK-16-BLU',
    name: 'Xanh Indigo Đảo Capri',
    colorHex: '#2E557C',
    price: 1650000,
    origin: 'Napoli, Ý',
    composition: '100% Italian Organic Linen',
    weightGrams: '210g/m',
    category: 'summer_linen',
    seasonLabel: 'Mùa Hè',
    tierLabel: 'Seasonal Linen',
    defaultWeave: 'birdseye',
    features: ['seasonal', 'branded'],
    occasions: ['casual', 'smart_casual'],
    colorGroup: 'blue',
  },
  {
    id: 'prussian_petrol_blue',
    code: 'HCK-17-BLU',
    name: 'Xanh Petrol Ánh Lụa',
    colorHex: '#18364A',
    price: 2450000,
    origin: 'Como, Ý',
    composition: '85% Merino Wool · 15% Mulberry Silk',
    weightGrams: '255g/m',
    category: 'luxury_party',
    seasonLabel: 'Quanh năm · Dạ Tiệc',
    tierLabel: 'Premium Silk',
    defaultWeave: 'solid',
    features: ['new', 'premium', 'seasonal'],
    occasions: ['celebration', 'business'],
    colorGroup: 'blue',
  },

  // --- NHÓM 3: GREY & SILVER (7 MẪU) ---
  {
    id: 'light_pearl_grey',
    code: 'HCK-18-GRY',
    name: 'Xám Tro Sáng',
    colorHex: '#6E737B',
    price: 1750000,
    origin: 'Milano, Ý',
    composition: '98% Virgin Wool · 2% Elastane Co Giãn',
    weightGrams: '245g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm',
    tierLabel: 'Stretch Comfort',
    defaultWeave: 'solid',
    features: ['bestseller', 'stretch', 'branded'],
    occasions: ['business', 'celebration', 'smart_casual'],
    colorGroup: 'grey',
  },
  {
    id: 'prince_of_wales_check',
    code: 'HCK-19-GRY',
    name: 'Xám Kẻ Ô',
    colorHex: '#484C52',
    price: 2390000,
    origin: 'Yorkshire, Anh Quốc',
    composition: '100% Scottish Cheviot Wool',
    weightGrams: '300g/m',
    category: 'winter_flannel',
    seasonLabel: 'Thu Đông',
    tierLabel: 'Branded Tweed',
    defaultWeave: 'glen_check',
    features: ['bestseller', 'branded', 'tweed'],
    occasions: ['business', 'smart_casual'],
    colorGroup: 'grey',
  },
  {
    id: 'silver_mist_mohair',
    code: 'HCK-20-GRY',
    name: 'Xám Bạc Ánh Kim',
    colorHex: '#848991',
    price: 2550000,
    origin: 'Biella, Ý',
    composition: '80% Wool · 20% Kid Mohair',
    weightGrams: '250g/m',
    category: 'luxury_party',
    seasonLabel: 'Quanh năm · Lễ Cưới',
    tierLabel: 'Premium Mohair',
    defaultWeave: 'solid',
    features: ['new', 'premium', 'branded'],
    occasions: ['celebration', 'business'],
    colorGroup: 'grey',
  },
  {
    id: 'slate_sharkskin_grey',
    code: 'HCK-21-GRY',
    name: 'Xám Đá Phiến Dệt Hạt',
    colorHex: '#52575E',
    price: 1890000,
    origin: 'Biella, Ý',
    composition: '100% Super 120s Virgin Wool',
    weightGrams: '265g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm',
    tierLabel: 'Best-Seller',
    defaultWeave: 'birdseye',
    features: ['bestseller', 'branded'],
    occasions: ['business', 'smart_casual'],
    colorGroup: 'grey',
  },
  {
    id: 'london_fog_flannel_pinstripe',
    code: 'HCK-22-GRY',
    name: 'Xám Sương Mù Kẻ Sọc',
    colorHex: '#42454A',
    price: 2290000,
    origin: 'Somerset, Anh Quốc',
    composition: '100% West of England Flannel Wool',
    weightGrams: '320g/m',
    category: 'winter_flannel',
    seasonLabel: 'Thu Đông',
    tierLabel: 'Branded Fabrics',
    defaultWeave: 'pinstripe',
    features: ['branded', 'premium'],
    occasions: ['business'],
    colorGroup: 'grey',
  },
  {
    id: 'donegal_pewter_tweed',
    code: 'HCK-23-GRY',
    name: 'Xám Chì Donegal',
    colorHex: '#5D6065',
    price: 2190000,
    origin: 'Donegal, Ireland',
    composition: '100% Pure Irish Tweed Wool',
    weightGrams: '330g/m',
    category: 'winter_flannel',
    seasonLabel: 'Thu Đông',
    tierLabel: 'Irish Tweed',
    defaultWeave: 'herringbone',
    features: ['tweed', 'branded'],
    occasions: ['casual', 'smart_casual'],
    colorGroup: 'grey',
  },

  // --- NHÓM 4: BROWN & ESPRESSO (5 MẪU) ---
  {
    id: 'espresso_chocolate_tweed',
    code: 'HCK-24-BRN',
    name: 'Nâu Espresso',
    colorHex: '#33241B',
    price: 2350000,
    origin: 'Donegal, Ireland',
    composition: '85% Virgin Wool · 15% Silk Tweed',
    weightGrams: '310g/m',
    category: 'winter_flannel',
    seasonLabel: 'Thu Đông · Giữ Ấm',
    tierLabel: 'Tweed Heritage',
    defaultWeave: 'herringbone',
    features: ['tweed', 'branded', 'bestseller'],
    occasions: ['business', 'smart_casual', 'casual'],
    colorGroup: 'brown',
  },
  {
    id: 'tobacco_havana_linen',
    code: 'HCK-25-BRN',
    name: 'Nâu Thuốc Lá Havana',
    colorHex: '#63442B',
    price: 1750000,
    origin: 'Normandy, Pháp',
    composition: '70% French Linen · 30% Cotton',
    weightGrams: '225g/m',
    category: 'summer_linen',
    seasonLabel: 'Mùa Hè',
    tierLabel: 'Seasonal Color',
    defaultWeave: 'birdseye',
    features: ['new', 'seasonal'],
    occasions: ['casual', 'smart_casual', 'celebration'],
    colorGroup: 'brown',
  },
  {
    id: 'mocha_glencheck_stretch',
    code: 'HCK-26-BRN',
    name: 'Nâu Mocha Kẻ Ô',
    colorHex: '#4F3B2F',
    price: 2090000,
    origin: 'Biella, Ý',
    composition: '97% Merino Wool · 3% Elastane',
    weightGrams: '260g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm',
    tierLabel: 'Stretch Check',
    defaultWeave: 'glen_check',
    features: ['stretch', 'branded', 'new'],
    occasions: ['business', 'smart_casual'],
    colorGroup: 'brown',
  },
  {
    id: 'walnut_cinnamon_wool',
    code: 'HCK-27-BRN',
    name: 'Nâu Gỗ Óc Chó',
    colorHex: '#593E2E',
    price: 2350000,
    origin: 'Biella, Ý',
    composition: '100% Super 130s Merino Wool',
    weightGrams: '270g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm',
    tierLabel: 'Premium Super 130s',
    defaultWeave: 'solid',
    features: ['premium', 'branded'],
    occasions: ['business', 'smart_casual'],
    colorGroup: 'brown',
  },

  // --- NHÓM 5: BEIGE & CREAM (5 MẪU) ---
  {
    id: 'sand_beige_linen',
    code: 'HCK-28-BGE',
    name: 'Be Cát Địa Trung Hải',
    colorHex: '#B59E80',
    price: 1550000,
    origin: 'Normandy, Pháp',
    composition: '65% Pure Linen · 35% Cotton Thoáng Khí',
    weightGrams: '215g/m',
    category: 'summer_linen',
    seasonLabel: 'Mùa Hè · Thoáng Khí',
    tierLabel: 'Best-Seller Linen',
    defaultWeave: 'birdseye',
    features: ['bestseller', 'seasonal'],
    occasions: ['casual', 'celebration', 'smart_casual'],
    colorGroup: 'beige',
  },
  {
    id: 'oatmeal_sahara_herringbone',
    code: 'HCK-29-BGE',
    name: 'Be Yến Mạch Vân Xương Cá',
    colorHex: '#C2B199',
    price: 1950000,
    origin: 'Yorkshire, Anh Quốc',
    composition: '80% Wool · 20% Linen Tweed',
    weightGrams: '275g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm',
    tierLabel: 'Tweed & Linen',
    defaultWeave: 'herringbone',
    features: ['tweed', 'seasonal'],
    occasions: ['smart_casual', 'casual', 'celebration'],
    colorGroup: 'beige',
  },
  {
    id: 'champagne_silk_gala',
    code: 'HCK-30-BGE',
    name: 'Vàng Champagne Ánh Lụa',
    colorHex: '#C9BA9F',
    price: 2650000,
    origin: 'Trivero, Ý',
    composition: '75% Virgin Wool · 25% Silk',
    weightGrams: '240g/m',
    category: 'luxury_party',
    seasonLabel: 'Lễ Cưới & Gala',
    tierLabel: 'Premium Branded',
    defaultWeave: 'solid',
    features: ['premium', 'branded', 'new'],
    occasions: ['celebration'],
    colorGroup: 'beige',
  },
  {
    id: 'stone_chino_stretch',
    code: 'HCK-31-BGE',
    name: 'Be Đá Cuội Co Giãn',
    colorHex: '#A69783',
    price: 1450000,
    origin: 'Milano, Ý',
    composition: '96% Combed Cotton · 4% Elastane',
    weightGrams: '245g/m',
    category: 'summer_linen',
    seasonLabel: 'Mùa Hè · Quanh năm',
    tierLabel: 'Stretch Casual',
    defaultWeave: 'solid',
    features: ['stretch', 'bestseller'],
    occasions: ['casual', 'smart_casual'],
    colorGroup: 'beige',
  },
  {
    id: 'camel_hair_luxury',
    code: 'HCK-32-BGE',
    name: 'Vàng Lạc Đà Thượng Hạng',
    colorHex: '#9E7B56',
    price: 2790000,
    origin: 'Biella, Ý',
    composition: '85% Wool · 15% Baby Camel Hair',
    weightGrams: '305g/m',
    category: 'winter_flannel',
    seasonLabel: 'Thu Đông',
    tierLabel: 'Premium Branded',
    defaultWeave: 'herringbone',
    features: ['premium', 'branded', 'seasonal'],
    occasions: ['business', 'smart_casual', 'celebration'],
    colorGroup: 'beige',
  },

  // --- NHÓM 6: WHITE & IVORY (3 MẪU) ---
  {
    id: 'ivory_cream_tuxedo',
    code: 'HCK-33-WHT',
    name: 'Trắng Ngà Lễ Cưới',
    colorHex: '#DED6C8',
    price: 2350000,
    origin: 'Biella, Ý',
    composition: '90% Australian Wool · 10% Silk',
    weightGrams: '240g/m',
    category: 'luxury_party',
    seasonLabel: 'Lễ Cưới & Gala',
    tierLabel: 'Premium Gala',
    defaultWeave: 'solid',
    features: ['bestseller', 'premium', 'branded'],
    occasions: ['celebration'],
    colorGroup: 'white',
  },
  {
    id: 'alabaster_pure_white',
    code: 'HCK-34-WHT',
    name: 'Trắng Tuyết Tinh Khôi',
    colorHex: '#EAE8E3',
    price: 2050000,
    origin: 'Milano, Ý',
    composition: '97% Super 120s Wool · 3% Elastane',
    weightGrams: '250g/m',
    category: 'luxury_party',
    seasonLabel: 'Lễ Cưới & Sự Kiện',
    tierLabel: 'Stretch Ceremony',
    defaultWeave: 'solid',
    features: ['new', 'stretch'],
    occasions: ['celebration'],
    colorGroup: 'white',
  },
  {
    id: 'portofino_white_linen',
    code: 'HCK-35-WHT',
    name: 'Trắng Kem Portofino',
    colorHex: '#E2DDD3',
    price: 1690000,
    origin: 'Bergamo, Ý',
    composition: '100% Pure Italian Linen',
    weightGrams: '210g/m',
    category: 'summer_linen',
    seasonLabel: 'Mùa Hè · Bãi Biển',
    tierLabel: 'Summer Linen',
    defaultWeave: 'birdseye',
    features: ['seasonal', 'branded'],
    occasions: ['celebration', 'casual'],
    colorGroup: 'white',
  },

  // --- NHÓM 7: GREEN & OLIVE (4 MẪU) ---
  {
    id: 'emerald_olive_green',
    code: 'HCK-36-GRN',
    name: 'Xanh Rêu Lục Bảo',
    colorHex: '#21382B',
    price: 2150000,
    origin: 'Biella, Ý',
    composition: '100% Super 130s Merino Wool',
    weightGrams: '265g/m',
    category: 'luxury_party',
    seasonLabel: 'Quanh năm · Sự kiện',
    tierLabel: 'Best-Seller',
    defaultWeave: 'herringbone',
    features: ['bestseller', 'premium', 'branded'],
    occasions: ['celebration', 'smart_casual', 'business'],
    colorGroup: 'green',
  },
  {
    id: 'sage_mint_linen',
    code: 'HCK-37-GRN',
    name: 'Xanh Lá Xô Thơm',
    colorHex: '#5C7362',
    price: 1690000,
    origin: 'Normandy, Pháp',
    composition: '60% Linen · 40% Organic Cotton',
    weightGrams: '215g/m',
    category: 'summer_linen',
    seasonLabel: 'Mùa Hè',
    tierLabel: 'Seasonal Color',
    defaultWeave: 'birdseye',
    features: ['new', 'seasonal'],
    occasions: ['casual', 'celebration', 'smart_casual'],
    colorGroup: 'green',
  },
  {
    id: 'highland_hunter_tweed',
    code: 'HCK-38-GRN',
    name: 'Xanh Rừng Già Scotland',
    colorHex: '#2A3B2C',
    price: 2390000,
    origin: 'Isle of Harris, Scotland',
    composition: '100% Scottish Virgin Tweed Wool',
    weightGrams: '325g/m',
    category: 'winter_flannel',
    seasonLabel: 'Thu Đông',
    tierLabel: 'Scottish Tweed',
    defaultWeave: 'glen_check',
    features: ['tweed', 'branded', 'premium'],
    occasions: ['smart_casual', 'casual'],
    colorGroup: 'green',
  },
  {
    id: 'khaki_olive_stretch',
    code: 'HCK-39-GRN',
    name: 'Xanh Olive Quân Đội',
    colorHex: '#464F3B',
    price: 1590000,
    origin: 'Milano, Ý',
    composition: '96% Wool & Cotton · 4% Elastane',
    weightGrams: '250g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm',
    tierLabel: 'Stretch Casual',
    defaultWeave: 'solid',
    features: ['stretch', 'seasonal'],
    occasions: ['casual', 'smart_casual'],
    colorGroup: 'green',
  },

  // --- NHÓM 8: RED & BURGUNDY (3 MẪU) ---
  {
    id: 'bordeaux_velvet_maroon',
    code: 'HCK-40-RED',
    name: 'Đỏ Bordeaux Dạ Tiệc',
    colorHex: '#4E1620',
    price: 2690000,
    origin: 'Como, Ý',
    composition: '80% Virgin Wool · 20% Mulberry Silk',
    weightGrams: '275g/m',
    category: 'luxury_party',
    seasonLabel: 'Dạ Tiệc & Lễ Cưới',
    tierLabel: 'Premium Silk',
    defaultWeave: 'solid',
    features: ['bestseller', 'premium', 'branded'],
    occasions: ['celebration'],
    colorGroup: 'red',
  },
  {
    id: 'chianti_crimson_check',
    code: 'HCK-41-RED',
    name: 'Đỏ Rượu Chianti Kẻ Ô',
    colorHex: '#5E2129',
    price: 2250000,
    origin: 'Biella, Ý',
    composition: '100% Super 120s Merino Wool',
    weightGrams: '265g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm · Sự kiện',
    tierLabel: 'Branded Check',
    defaultWeave: 'glen_check',
    features: ['new', 'branded', 'seasonal'],
    occasions: ['celebration', 'smart_casual'],
    colorGroup: 'red',
  },
  {
    id: 'ruby_garnet_herringbone',
    code: 'HCK-42-RED',
    name: 'Đỏ Hồng Ngọc Vân Xương Cá',
    colorHex: '#6B242B',
    price: 2150000,
    origin: 'Yorkshire, Anh Quốc',
    composition: '95% Wool · 5% Cashmere',
    weightGrams: '295g/m',
    category: 'winter_flannel',
    seasonLabel: 'Thu Đông',
    tierLabel: 'Tweed & Cashmere',
    defaultWeave: 'herringbone',
    features: ['tweed', 'seasonal'],
    occasions: ['celebration', 'smart_casual'],
    colorGroup: 'red',
  },

  // --- NHÓM 9: PURPLE & PLUM (2 MẪU) ---
  {
    id: 'aubergine_royal_plum',
    code: 'HCK-43-PRP',
    name: 'Tím Mận Hoàng Gia',
    colorHex: '#3B233A',
    price: 2450000,
    origin: 'Biella, Ý',
    composition: '100% Super 130s Nobility Wool',
    weightGrams: '260g/m',
    category: 'luxury_party',
    seasonLabel: 'Dạ Tiệc & Sự Kiện',
    tierLabel: 'Premium Branded',
    defaultWeave: 'solid',
    features: ['new', 'premium', 'branded', 'seasonal'],
    occasions: ['celebration', 'smart_casual'],
    colorGroup: 'purple',
  },
  {
    id: 'lavender_dusk_weave',
    code: 'HCK-44-PRP',
    name: 'Tím Khói Hoàng Hôn',
    colorHex: '#543D56',
    price: 1950000,
    origin: 'Milano, Ý',
    composition: '96% Merino Wool · 4% Elastane',
    weightGrams: '245g/m',
    category: 'all_year',
    seasonLabel: 'Quanh năm',
    tierLabel: 'Stretch Seasonal',
    defaultWeave: 'birdseye',
    features: ['stretch', 'seasonal'],
    occasions: ['celebration', 'smart_casual'],
    colorGroup: 'purple',
  },

  // --- NHÓM 10: YELLOW & AMBER (2 MẪU) ---
  {
    id: 'ochre_mustard_linen',
    code: 'HCK-45-YLW',
    name: 'Vàng Nghệ Tuscany',
    colorHex: '#9E7B3B',
    price: 1790000,
    origin: 'Florence, Ý',
    composition: '70% Pure Linen · 30% Virgin Wool',
    weightGrams: '225g/m',
    category: 'summer_linen',
    seasonLabel: 'Mùa Hè · Resort',
    tierLabel: 'Seasonal Color',
    defaultWeave: 'birdseye',
    features: ['new', 'seasonal'],
    occasions: ['casual', 'celebration'],
    colorGroup: 'yellow',
  },
  {
    id: 'amber_gold_tweed',
    code: 'HCK-46-YLW',
    name: 'Vàng Hổ Phách Cổ Điển',
    colorHex: '#8C6B32',
    price: 2150000,
    origin: 'Yorkshire, Anh Quốc',
    composition: '100% British Shetland Tweed',
    weightGrams: '300g/m',
    category: 'winter_flannel',
    seasonLabel: 'Thu Đông',
    tierLabel: 'Shetland Tweed',
    defaultWeave: 'glen_check',
    features: ['tweed', 'seasonal'],
    occasions: ['smart_casual', 'casual'],
    colorGroup: 'yellow',
  },

  // --- NHÓM 11: PINK & ROSE (2 MẪU) ---
  {
    id: 'dusty_rose_summer_wool',
    code: 'HCK-47-PNK',
    name: 'Hồng Đất Nam Tính',
    colorHex: '#8F5E68',
    price: 1890000,
    origin: 'Biella, Ý',
    composition: '98% Super 120s Wool · 2% Elastane',
    weightGrams: '235g/m',
    category: 'summer_linen',
    seasonLabel: 'Mùa Hè · Lễ Cưới',
    tierLabel: 'Seasonal Stretch',
    defaultWeave: 'solid',
    features: ['new', 'stretch', 'seasonal', 'branded'],
    occasions: ['celebration', 'smart_casual'],
    colorGroup: 'pink',
  },
  {
    id: 'blush_quartz_linen',
    code: 'HCK-48-PNK',
    name: 'Hồng Thạch Anh Phớt',
    colorHex: '#A67B84',
    price: 1750000,
    origin: 'Napoli, Ý',
    composition: '60% Linen · 40% Silk & Cotton',
    weightGrams: '215g/m',
    category: 'summer_linen',
    seasonLabel: 'Mùa Hè · Gala',
    tierLabel: 'Seasonal Color',
    defaultWeave: 'birdseye',
    features: ['new', 'seasonal'],
    occasions: ['celebration', 'casual'],
    colorGroup: 'pink',
  },

  // --- NHÓM 12: TERRACOTTA & RUST (2 MẪU) ---
  {
    id: 'terracotta_siena_linen',
    code: 'HCK-49-TER',
    name: 'Cam Đất Siena',
    colorHex: '#8C462B',
    price: 1790000,
    origin: 'Siena, Ý',
    composition: '75% Italian Linen · 25% Virgin Wool',
    weightGrams: '230g/m',
    category: 'summer_linen',
    seasonLabel: 'Mùa Hè · Thu',
    tierLabel: 'Seasonal Branded',
    defaultWeave: 'birdseye',
    features: ['new', 'seasonal', 'branded'],
    occasions: ['casual', 'smart_casual', 'celebration'],
    colorGroup: 'terracotta',
  },
  {
    id: 'rust_copper_herringbone',
    code: 'HCK-50-TER',
    name: 'Đỏ Gạch Vân Xương Cá',
    colorHex: '#733722',
    price: 2190000,
    origin: 'Huddersfield, Anh Quốc',
    composition: '90% British Wool · 10% Cashmere',
    weightGrams: '295g/m',
    category: 'winter_flannel',
    seasonLabel: 'Thu Đông',
    tierLabel: 'Tweed & Cashmere',
    defaultWeave: 'herringbone',
    features: ['tweed', 'premium', 'seasonal'],
    occasions: ['smart_casual', 'celebration'],
    colorGroup: 'terracotta',
  },
];
