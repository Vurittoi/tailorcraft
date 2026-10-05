import { FabricOption } from '../fabricCatalogData';
import { SuitConfigState } from '../suitCanvasEngine';

export type JacketStyleId =
  | 'sb_1_button'
  | 'sb_2_buttons'
  | 'db_4_buttons'
  | 'db_6_buttons'
  | 'mandarin';

export interface StyleOptionItem<T extends string = string> {
  id: T;
  name: string;
  shortDesc: string;
  price: number;
}

export const JACKET_STYLE_OPTIONS: StyleOptionItem<JacketStyleId>[] = [
  {
    id: 'sb_1_button',
    name: 'Vạt đơn 1 cúc',
    shortDesc: 'Vạt đơn 1 cúc hiện đại, khe chữ V sâu phóng khoáng',
    price: 0,
  },
  {
    id: 'sb_2_buttons',
    name: 'Vạt đơn 2 cúc',
    shortDesc: 'Vạt đơn 2 cúc chuẩn mực Bespoke Savile Row cổ điển',
    price: 0,
  },
  {
    id: 'db_4_buttons',
    name: 'Vạt kép 4 cúc',
    shortDesc: 'Vạt kép 4 cúc (2x2) lịch lãm, tạo phom ngực uy quyền',
    price: 150000,
  },
  {
    id: 'db_6_buttons',
    name: 'Vạt kép 6 cúc',
    shortDesc: 'Vạt kép 6 cúc (6x2) cổ điển Hoàng gia Anh Quốc',
    price: 180000,
  },
  {
    id: 'mandarin',
    name: 'Cổ Tàu',
    shortDesc: 'Cổ Tàu đứng tối giản với hàng 5 cúc dọc sang trọng',
    price: 150000,
  },
];

export const LAPEL_OPTIONS: StyleOptionItem<'notch' | 'peak'>[] = [
  {
    id: 'notch',
    name: 'Cổ Xếch',
    shortDesc: 'Chuẩn mực thanh lịch cho doanh nhân & sự kiện trang trọng',
    price: 0,
  },
  {
    id: 'peak',
    name: 'Cổ Nhọn',
    shortDesc: 'Đỉnh ve vươn cao quyền lực, tôn dáng vai rộng Savile Row',
    price: 30000,
  },
];

export const BUTTON_OPTIONS: StyleOptionItem<
  'single' | 'double_two' | 'gold_brass'
>[] = [
  {
    id: 'double_two',
    name: 'Cúc thường',
    shortDesc: 'Cúc sừng tự nhiên mài bóng thủ công chuẩn Savile Row',
    price: 0,
  },
  {
    id: 'gold_brass',
    name: 'Cúc vàng',
    shortDesc: 'Bộ cúc đồng mạ vàng 24K chạm nổi thủ công sang trọng',
    price: 50000,
  },
];

export type PocketStyleId = 'flap' | 'jetted' | 'patched';

export const POCKET_OPTIONS: StyleOptionItem<PocketStyleId>[] = [
  {
    id: 'flap',
    name: 'Túi nắp',
    shortDesc: 'Có nắp túi cổ điển, giữ phom hông áo sắc nét',
    price: 0,
  },
  {
    id: 'jetted',
    name: 'Túi viền kép',
    shortDesc: 'Viền cơi mảnh tối giản kiểu Tuxedo & Bespoke dạ tiệc',
    price: 0,
  },
  {
    id: 'patched',
    name: 'Túi ốp ngoài',
    shortDesc: 'Túi đắp nổi dáng chữ U phóng khoáng phong cách Ý',
    price: 0,
  },
];

export interface SuitCarouselItem {
  id: string;
  title: string;
  subtitle: string;
  suitImage: string;
  fabric: FabricOption;
  weavePattern: 'solid' | 'herringbone' | 'pinstripe';
  weaveLabel: string;
  lapelId: 'notch' | 'peak';
  buttonId: 'single' | 'double_two' | 'gold_brass';
  pocketId: PocketStyleId;
}

export interface BodyMeasurements {
  profileName: string;
  mode: 'default' | 'custom';
  chestCm: number;
  waistCm: number;
  shoulderCm: number;
  sleeveCm: number;
  heightCm: number;
  weightKg: number;
  postureNote: string;
}

export const DEFAULT_PRESETS: Record<string, Omit<BodyMeasurements, 'mode'>> = {
  size_m: {
    profileName: 'Phom Chuẩn Quý Ông — Size M',
    chestCm: 94,
    waistCm: 80,
    shoulderCm: 44.5,
    sleeveCm: 60,
    heightCm: 170,
    weightKg: 65,
    postureNote: 'Vai cân đối, lưng thẳng tiêu chuẩn, độ ôm Slim Tailored',
  },
  size_l: {
    profileName: 'Phom Chuẩn Quý Ông — Size L (Mặc định)',
    chestCm: 98,
    waistCm: 84,
    shoulderCm: 46,
    sleeveCm: 61.5,
    heightCm: 175,
    weightKg: 70,
    postureNote: 'Ngực nở chuẩn, độ ôm Classic Bespoke thoải mái',
  },
  size_xl: {
    profileName: 'Phom Chuẩn Quý Ông — Size XL',
    chestCm: 104,
    waistCm: 90,
    shoulderCm: 48,
    sleeveCm: 63,
    heightCm: 180,
    weightKg: 78,
    postureNote: 'Khung vai rộng, ưu tiên cử động tay thoải mái',
  },
};

export type UserRole = 'KHACHHANG' | 'THOMAY' | 'ADMIN';

export interface UserAccount {
  id: string;
  username: string;
  password?: string;
  email: string;
  fullName: string;
  phone: string;
  avatarUrl?: string;
  role: UserRole;
  roleLabel: string;
  workshopName?: string;
  specialty?: string;
  address?: string;
  status: 'ACTIVE' | 'LOCKED';
  createdAt: string;
}

export const INITIAL_USER_ACCOUNTS: UserAccount[] = [
  {
    id: 'USR-CUS-01',
    username: 'khachhang',
    password: '123',
    email: 'nguyenvanan@tailorcraft.vn',
    fullName: 'Nguyễn Văn An',
    phone: '0908 246 810',
    role: 'KHACHHANG',
    roleLabel: 'Khách hàng (KHACHHANG / Customer)',
    address: '88 Đồng Khởi, Quận 1, TP. Hồ Chí Minh',
    status: 'ACTIVE',
    createdAt: '10/01/2026',
  },
  {
    id: 'USR-TAI-01',
    username: 'thomay01',
    password: '123',
    email: 'tranminhduc.atelier@tailorcraft.vn',
    fullName: 'Nghệ nhân Trần Minh Đức',
    phone: '0912 345 678',
    role: 'THOMAY',
    roleLabel: 'Thợ may / Xưởng (THOMAY / Tailor)',
    workshopName: 'Xưởng Chế Tác Bespoke Savile — Quận 1',
    specialty: 'Cắt rập thủ công & Ráp phom Canvas',
    status: 'ACTIVE',
    createdAt: '15/02/2026',
  },
  {
    id: 'USR-TAI-02',
    username: 'thomay02',
    password: '123',
    email: 'lehoangnam.atelier@tailorcraft.vn',
    fullName: 'Nghệ nhân Lê Hoàng Nam',
    phone: '0938 765 432',
    role: 'THOMAY',
    roleLabel: 'Thợ may / Xưởng (THOMAY / Tailor)',
    workshopName: 'Xưởng Chế Tác Bespoke Savile — Quận 3',
    specialty: 'Khâu đột ve áo & Kiểm định QC hoàn thiện',
    status: 'ACTIVE',
    createdAt: '20/03/2026',
  },
  {
    id: 'USR-ADM-01',
    username: 'admin',
    password: '123',
    email: 'admin@tailorcraft.vn',
    fullName: 'Quản Trị Viên Hệ Thống',
    phone: '0989 999 888',
    role: 'ADMIN',
    roleLabel: 'Quản trị viên (ADMIN)',
    workshopName: 'Trung Tâm Điều Hành Tailor Craft Việt Nam',
    status: 'ACTIVE',
    createdAt: '01/01/2026',
  },
];

export type ProductionStage = 'CAT' | 'MAY' | 'KIEM_DINH' | 'HOAN_TAT';

export interface ProductionStageInfo {
  key: ProductionStage;
  stepNumber: number;
  shortLabel: string;
  title: string;
  customerStatusText: string;
  description: string;
}

export const PRODUCTION_STAGES: ProductionStageInfo[] = [
  {
    key: 'CAT',
    stepNumber: 1,
    shortLabel: '1. Khâu Cắt',
    title: 'Cắt Rập & Phá Vải Thủ Công',
    customerStatusText: 'Khâu Cắt — Nghệ nhân đang cắt rập thủ công theo số đo',
    description:
      'Dựng rập giấy cá nhân hóa từ bộ số đo giải phẫu và cắt vải chính + lớp dựng canh tóc.',
  },
  {
    key: 'MAY',
    stepNumber: 2,
    shortLabel: '2. Khâu May',
    title: 'Ráp Phom, Khâu Đột & Thêu Monogram',
    customerStatusText: 'Khâu May — Đang ráp thân áo, tra tay & thêu Monogram',
    description:
      'May ráp cấu trúc ngực áo, tạo độ cong ve áo (lapel roll), đính cúc và thêu chữ Monogram.',
  },
  {
    key: 'KIEM_DINH',
    stepNumber: 3,
    shortLabel: '3. Kiểm Định',
    title: 'Kiểm Định Chất Lượng (QC) & Ép Phom Hơi Nước',
    customerStatusText:
      'Khâu Kiểm Định — Đang đo kiểm thông số QC & ép hơi nước hoàn thiện',
    description:
      'Đối chiếu 6 chỉ số đo thực tế so với Spec Sheet, kiểm tra đường chỉ và ép phom 3D.',
  },
  {
    key: 'HOAN_TAT',
    stepNumber: 4,
    shortLabel: '4. Hoàn Tất',
    title: 'Hoàn Tất Chế Tác — Sẵn Sàng Bàn Giao',
    customerStatusText:
      'Hoàn tất chế tác — Trang phục đã qua kiểm định, sẵn sàng bàn giao',
    description:
      'Đóng gói trong túi bảo quản Suit chuyên dụng kèm chứng nhận Bespoke Tailor Craft.',
  },
];

export interface TextureMaskAsset {
  id: string;
  name: string;
  assetType: 'texture' | 'mask';
  targetLayer: string;
  blendMode: 'multiply' | 'normal' | 'screen';
  previewUrl: string;
  linkedFabricCode?: string;
  uploadedAt: string;
  resolution: string;
}

export const INITIAL_TEXTURE_MASK_ASSETS: TextureMaskAsset[] = [
  {
    id: 'AST-TEX-01',
    name: 'Wool_Herringbone_Super150s_Tile.png',
    assetType: 'texture',
    targetLayer: 'Lớp Vân Vải (Fabric Pattern Fill)',
    blendMode: 'multiply',
    previewUrl: '',
    linkedFabricCode: 'TC-NVY-02',
    uploadedAt: '20/09/2026 14:20',
    resolution: '512 x 512 px',
  },
  {
    id: 'AST-MSK-01',
    name: 'Suit_Torso_Base_Mask_2D.png',
    assetType: 'mask',
    targetLayer: 'Mặt Nạ Thân Áo Chính (Torso Clipping Mask)',
    blendMode: 'normal',
    previewUrl: '',
    uploadedAt: '18/09/2026 09:15',
    resolution: '1000 x 1300 px',
  },
  {
    id: 'AST-MSK-02',
    name: 'Suit_Lapel_Shadow_Overlay.png',
    assetType: 'mask',
    targetLayer: 'Lớp Bóng Đổ Ve Áo 3D (Lapel Shading Overlay)',
    blendMode: 'multiply',
    previewUrl: '',
    uploadedAt: '18/09/2026 09:18',
    resolution: '1000 x 1300 px',
  },
];

export interface TailoringOrderRecord {
  orderId: string;
  customerId?: string;
  createdAt: string;
  status: string;
  stage?: ProductionStage;
  estimatedDelivery: string;
  previewDataUrl: string;
  config: SuitConfigState;
  measurements: BodyMeasurements;
  totalPrice: number;
  customerName?: string;
  customerPhone?: string;
  assignedTailorId?: string;
  assignedTailorName?: string;
  tailorNotes?: string;
  updatedAt?: string;
}

export const formatVND = (value: number): string =>
  new Intl.NumberFormat('vi-VN').format(value) + ' ₫';

export type NavPage =
  | 'home'
  | 'configurator'
  | 'measurements'
  | 'orders'
  | 'tailor_dashboard'
  | 'admin_dashboard'
  | 'tailor_management'
  | 'account_settings'
  | 'auth';

export const NAV_ORDER: Record<NavPage, number> = {
  home: 0,
  configurator: 1,
  measurements: 2,
  orders: 3,
  tailor_dashboard: 4,
  admin_dashboard: 5,
  tailor_management: 6,
  account_settings: 7,
  auth: 8,
};
