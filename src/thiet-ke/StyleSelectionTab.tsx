import React from 'react';
import { Eye } from 'lucide-react';
import { RenderOptions, SuitConfigState } from '../suitCanvasEngine';
import {
  formatVND,
  JACKET_STYLE_OPTIONS,
  JacketStyleId,
  PocketStyleId,
  StyleOptionItem,
} from '../types/suitTypes';

type CustomButtonSwatchId = NonNullable<SuitConfigState['customButtonId']>;

interface CustomButtonSwatchItem {
  id: Exclude<CustomButtonSwatchId, 'default'>;
  label: string;
  kind: 'horn' | 'metal';
  price: number;
  c0: string;
  c1: string;
  c2: string;
  rim: string;
  accent: string;
}

const CUSTOM_BUTTON_SWATCHES: CustomButtonSwatchItem[] = [
  {
    id: 'brown',
    label: 'Nâu',
    kind: 'horn',
    price: 0,
    c0: '#8B5E3C',
    c1: '#4E321D',
    c2: '#26160B',
    rim: '#A47852',
    accent: '#C99E74',
  },
  {
    id: 'dark_grey',
    label: 'Xám đậm',
    kind: 'horn',
    price: 0,
    c0: '#8F9499',
    c1: '#52575C',
    c2: '#2B2E31',
    rim: '#B0B5BA',
    accent: '#D2D6DC',
  },
  {
    id: 'navy_blue',
    label: 'Xanh navy',
    kind: 'horn',
    price: 0,
    c0: '#3D5C7D',
    c1: '#1C3047',
    c2: '#0E1826',
    rim: '#5B7EA3',
    accent: '#94B4D4',
  },
  {
    id: 'khaki',
    label: 'Vàng kaki',
    kind: 'horn',
    price: 0,
    c0: '#DBC59E',
    c1: '#A3875B',
    c2: '#5E4B2E',
    rim: '#EDE0C5',
    accent: '#F7F0DF',
  },
  {
    id: 'off_white',
    label: 'Trắng ngà',
    kind: 'horn',
    price: 0,
    c0: '#FDFCF9',
    c1: '#EAE4D5',
    c2: '#C5BDAA',
    rim: '#FFFFFF',
    accent: '#9C9484',
  },
  {
    id: 'anthrazit',
    label: 'Than chì',
    kind: 'horn',
    price: 0,
    c0: '#4F5357',
    c1: '#232527',
    c2: '#0D0E0F',
    rim: '#6C7176',
    accent: '#9CA3AF',
  },
  {
    id: 'shiny_gold_brass',
    label: 'Đồng vàng bóng',
    kind: 'metal',
    price: 50000,
    c0: '#FFF7BF',
    c1: '#E6BD45',
    c2: '#9E6E14',
    rim: '#FFF199',
    accent: '#5C3A06',
  },
  {
    id: 'gold_brass',
    label: 'Đồng vàng',
    kind: 'metal',
    price: 50000,
    c0: '#E5D293',
    c1: '#AA8D3F',
    c2: '#634F1B',
    rim: '#D6C07A',
    accent: '#3B2E0C',
  },
  {
    id: 'silver_brass',
    label: 'Đồng bạc sáng',
    kind: 'metal',
    price: 50000,
    c0: '#FFFFFF',
    c1: '#CBD5E1',
    c2: '#64748B',
    rim: '#F1F5F9',
    accent: '#334155',
  },
  {
    id: 'antique_silver_brass',
    label: 'Đồng bạc cổ điển',
    kind: 'metal',
    price: 50000,
    c0: '#D9D6D0',
    c1: '#8D8982',
    c2: '#4F4C47',
    rim: '#BDB8AF',
    accent: '#262422',
  },
];

type NecktieSwatchId = Exclude<
  NonNullable<SuitConfigState['necktieId']>,
  'none'
>;

interface NecktieSwatchItem {
  id: NecktieSwatchId;
  label: string;
  price: number;
  c0: string;
  c1: string;
  c2: string;
  pattern: 'solid' | 'dots' | 'grid' | 'diamond' | 'stripes';
  accent: string;
  accent2?: string;
}

const NECKTIE_SWATCHES: NecktieSwatchItem[] = [
  {
    id: 'kendal',
    label: 'Cà vạt Nâu vàng chấm bi',
    price: 65000,
    c0: '#785F32',
    c1: '#56421F',
    c2: '#362911',
    pattern: 'dots',
    accent: '#EAD59B',
  },
  {
    id: 'verona',
    label: 'Cà vạt Xanh navy kẻ ô',
    price: 85000,
    c0: '#314B6E',
    c1: '#20334F',
    c2: '#121E30',
    pattern: 'grid',
    accent: '#8CB2DB',
  },
  {
    id: 'siros',
    label: 'Cà vạt Xanh navy trơn',
    price: 65000,
    c0: '#263859',
    c1: '#18243D',
    c2: '#0E1626',
    pattern: 'solid',
    accent: '#3B5280',
  },
  {
    id: 'schiza',
    label: 'Cà vạt Đỏ tươi trơn',
    price: 65000,
    c0: '#DE3B36',
    c1: '#BA2522',
    c2: '#821412',
    pattern: 'solid',
    accent: '#F26B66',
  },
  {
    id: 'riesi',
    label: 'Cà vạt Họa tiết kim cương',
    price: 85000,
    c0: '#2E384D',
    c1: '#1F2636',
    c2: '#131824',
    pattern: 'diamond',
    accent: '#E0A387',
    accent2: '#9CB8D9',
  },
  {
    id: 'parma',
    label: 'Cà vạt Đỏ chấm bi',
    price: 85000,
    c0: '#D63430',
    c1: '#B0221E',
    c2: '#7A1311',
    pattern: 'dots',
    accent: '#D4E6FA',
  },
  {
    id: 'lisard',
    label: 'Cà vạt Xanh navy kẻ sọc',
    price: 65000,
    c0: '#253652',
    c1: '#182438',
    c2: '#0E1624',
    pattern: 'stripes',
    accent: '#E8F0F8',
    accent2: '#6390C2',
  },
  {
    id: 'lioni',
    label: 'Cà vạt Đỏ rượu kẻ sọc',
    price: 65000,
    c0: '#85202E',
    c1: '#5E131E',
    c2: '#3B0A11',
    pattern: 'stripes',
    accent: '#F0C2C8',
    accent2: '#BD5364',
  },
  {
    id: 'liberi',
    label: 'Cà vạt Xanh da trời chấm bi',
    price: 65000,
    c0: '#789FCE',
    c1: '#5A82B2',
    c2: '#3E628E',
    pattern: 'dots',
    accent: '#F2F7FC',
  },
  {
    id: 'lena',
    label: 'Cà vạt Xanh đen chấm bi',
    price: 85000,
    c0: '#28384F',
    c1: '#1B2738',
    c2: '#101824',
    pattern: 'dots',
    accent: '#A8C4E3',
  },
  {
    id: 'kera',
    label: 'Cà vạt Xám than trơn',
    price: 65000,
    c0: '#505459',
    c1: '#36393D',
    c2: '#202225',
    pattern: 'solid',
    accent: '#6E737A',
  },
  {
    id: 'brady',
    label: 'Cà vạt Đen chấm bi',
    price: 65000,
    c0: '#2B2B2B',
    c1: '#181818',
    c2: '#0A0A0A',
    pattern: 'dots',
    accent: '#D4D4D4',
  },
  {
    id: 'burgundy_dot',
    label: 'Cà vạt Đỏ đô chấm bi',
    price: 65000,
    c0: '#732832',
    c1: '#521820',
    c2: '#330D12',
    pattern: 'dots',
    accent: '#DF9FA8',
  },
  {
    id: 'champagne',
    label: 'Cà vạt Vàng kem trơn',
    price: 65000,
    c0: '#F5E9BF',
    c1: '#E0CC90',
    c2: '#BEA768',
    pattern: 'solid',
    accent: '#FFF8DE',
  },
  {
    id: 'black_solid',
    label: 'Cà vạt Đen tuyền trơn',
    price: 65000,
    c0: '#2E2E2E',
    c1: '#191919',
    c2: '#080808',
    pattern: 'solid',
    accent: '#454545',
  },
];

interface StyleSelectionTabProps {
  config: SuitConfigState;
  setConfig: React.Dispatch<React.SetStateAction<SuitConfigState>>;
  renderOpts: RenderOptions;
  currentTargetZoom: number;
  lapelOptions: StyleOptionItem<'notch' | 'peak'>[];
  buttonOptions: StyleOptionItem<'single' | 'double_two' | 'gold_brass'>[];
  pocketOptions: StyleOptionItem<PocketStyleId>[];
  handleResetView: () => void;
  handleFocusBreastPocket: () => void;
  mode?: 'style' | 'trousers' | 'details';
}

/**
 * Hình minh họa Vector Line-Art cho 5 kiểu Áo Vest (Style)
 */
function JacketStyleLineArtSvg({
  styleId,
  active,
}: {
  styleId: JacketStyleId;
  active: boolean;
}) {
  const strokeColor = active ? '#141413' : '#9E9A93';
  const strokeWidth = active ? 1.55 : 1.25;

  return (
    <svg
      viewBox="0 0 100 132"
      className="w-20 h-26 sm:w-22 sm:h-28 mx-auto overflow-visible select-none"
      fill="none"
    >
      {active && (
        <g transform="translate(18, 26)">
          <circle
            cx="0"
            cy="0"
            r="8.5"
            fill="#FFFFFF"
            stroke="#141413"
            strokeWidth="1.4"
          />
          <path
            d="M -3.5 0.2 L -1 2.8 L 3.8 -2.5"
            stroke="#8C6D46"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      <path
        d="M 38 14 Q 50 9 62 14 L 78 21 Q 83 24 84 34 L 86 110 Q 81 112 76 110 L 74 44 L 72 112 Q 61 116 50 112 Q 39 116 28 112 L 26 44 L 24 110 Q 19 112 14 110 L 16 34 Q 17 24 22 21 Z"
        fill="#FFFFFF"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />

      <path
        d="M 39 14 Q 50 17 61 14"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.85}
      />

      {styleId === 'sb_1_button' && (
        <g stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round">
          <path d="M 39 14 L 50 74 L 61 14" />
          <path d="M 38 14 L 31 24 L 35 26 L 31 29 L 50 74" />
          <path d="M 62 14 L 69 24 L 65 26 L 69 29 L 50 74" />
          <path d="M 50 74 L 50 112" />
          <circle cx="52.5" cy="75" r="1.7" fill={strokeColor} />
          <line x1="47.5" y1="75" x2="50" y2="75" />
        </g>
      )}

      {styleId === 'sb_2_buttons' && (
        <g stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round">
          <path d="M 39 14 L 50 68 L 61 14" />
          <path d="M 38 14 L 31 24 L 35 26 L 31 29 L 50 68" />
          <path d="M 62 14 L 69 24 L 65 26 L 69 29 L 50 68" />
          <path d="M 50 68 L 50 112" />
          <circle cx="52.5" cy="70" r="1.7" fill={strokeColor} />
          <line x1="47.5" y1="70" x2="50" y2="70" />
          <circle cx="52.5" cy="84" r="1.7" fill={strokeColor} />
          <line x1="47.5" y1="84" x2="50" y2="84" />
        </g>
      )}

      {styleId === 'db_4_buttons' && (
        <g stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round">
          <path d="M 62 14 L 69 24 L 65 26 L 70 28 L 50 58" />
          <path d="M 39 14 L 50 58" />
          <path d="M 38 14 L 31 24 L 35 26 L 30 28 L 58 72 L 58 113" />
          <circle cx="43" cy="73" r="1.7" fill="none" />
          <circle cx="54" cy="73" r="1.7" fill="none" />
          <line x1="50" y1="73" x2="52.5" y2="73" />
          <line x1="39.5" y1="84" x2="43.5" y2="84" />
          <circle cx="54" cy="84" r="1.7" fill="none" />
          <line x1="50" y1="84" x2="52.5" y2="84" />
        </g>
      )}

      {styleId === 'db_6_buttons' && (
        <g stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round">
          <path d="M 62 14 L 69 24 L 65 26 L 70 28 L 50 58" />
          <path d="M 39 14 L 50 58" />
          <path d="M 38 14 L 31 24 L 35 26 L 30 28 L 58 72 L 58 113" />
          <circle cx="39.5" cy="63" r="1.6" fill="none" />
          <circle cx="57" cy="63" r="1.6" fill="none" />
          <circle cx="43" cy="74" r="1.6" fill="none" />
          <circle cx="54" cy="74" r="1.6" fill="none" />
          <line x1="50" y1="74" x2="52.5" y2="74" />
          <circle cx="43" cy="85" r="1.6" fill="none" />
          <circle cx="54" cy="85" r="1.6" fill="none" />
          <line x1="50" y1="85" x2="52.5" y2="85" />
        </g>
      )}

      {styleId === 'mandarin' && (
        <g stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round">
          <path
            d="M 38 14 Q 50 9 62 14 L 62 20 Q 50 24 38 20 Z"
            fill="#FFFFFF"
          />
          <path d="M 49 12 L 49 21.5" />
          <path d="M 49 21.5 L 49 112" />
          {[31, 46, 61, 76, 91].map((cy) => (
            <g key={cy}>
              <circle cx="51.8" cy={cy} r="1.5" fill="none" />
              <line x1="48.5" y1={cy} x2="50.4" y2={cy} />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

/**
 * Hình minh họa Vector Line-Art cho Kiểu Cổ Áo (Lapel Style):
 * - notch: Cổ Xếch (Notch Lapel)
 * - peak: Cổ Nhọn (Peak Lapel)
 */
function LapelStyleLineArtSvg({
  lapelId,
  active,
}: {
  lapelId: 'notch' | 'peak';
  active: boolean;
}) {
  const strokeColor = active ? '#141413' : '#9E9A93';
  const secondaryStroke = active ? '#65615B' : '#B8B4AC';
  const strokeWidth = active ? 1.55 : 1.25;

  return (
    <svg
      viewBox="0 0 92 96"
      className="w-20 h-22 sm:w-22 sm:h-24 mx-auto overflow-visible select-none"
      fill="none"
    >
      {active && (
        <g transform="translate(16, 20)">
          <circle
            cx="0"
            cy="0"
            r="8.5"
            fill="#FFFFFF"
            stroke="#141413"
            strokeWidth="1.4"
          />
          <path
            d="M -3.5 0.2 L -1 2.8 L 3.8 -2.5"
            stroke="#8C6D46"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      <path
        d="M 29 15 Q 43 16 50 32 L 44 37 Q 39 22 29 15 Z"
        fill="#FFFFFF"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M 48 27 L 69 34 Q 73 48 74 86"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M 68 34 Q 65 56 59 75"
        stroke={secondaryStroke}
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />

      <path
        d="M 40 23 L 32 66"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {lapelId === 'notch' ? (
        <path
          d="M 44 37 L 51 43 L 36 84"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M 44 37 L 46 41 L 57 34 L 36 84"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

/**
 * Hình minh họa Vector Line-Art cho Độ Rộng Cổ Áo (Lapel Width):
 * - slim: Bản nhỏ (2 mũi tên hướng vào trong ép hẹp ve áo)
 * - standard: Tiêu chuẩn (ve áo tiêu chuẩn không mũi tên)
 * - wide: Bản rộng (2 mũi tên hướng ra ngoài mở rộng ve áo)
 */
function LapelWidthLineArtSvg({
  widthId,
  active,
}: {
  widthId: 'slim' | 'standard' | 'wide';
  active: boolean;
}) {
  const strokeColor = active ? '#141413' : '#9E9A93';
  const secondaryStroke = active ? '#65615B' : '#B8B4AC';
  const strokeWidth = active ? 1.55 : 1.25;
  const arrowStrokeWidth = active ? 1.85 : 1.55;

  return (
    <svg
      viewBox="0 0 92 96"
      className="w-20 h-22 sm:w-22 sm:h-24 mx-auto overflow-visible select-none"
      fill="none"
    >
      {/* Dấu tích tròn góc trên bên trái khi được chọn */}
      {active && (
        <g transform="translate(16, 20)">
          <circle
            cx="0"
            cy="0"
            r="8.5"
            fill="#FFFFFF"
            stroke="#141413"
            strokeWidth="1.4"
          />
          <path
            d="M -3.5 0.2 L -1 2.8 L 3.8 -2.5"
            stroke="#8C6D46"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* Lá cổ trên (Upper Collar) */}
      <path
        d="M 29 15 Q 43 16 50 32 L 44 37 Q 39 22 29 15 Z"
        fill="#FFFFFF"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Đường cầu vai & sườn ngoài tay áo */}
      <path
        d="M 48 27 L 69 34 Q 73 48 74 86"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Đường ráp vòng nách mảnh */}
      <path
        d="M 68 34 Q 65 56 59 75"
        stroke={secondaryStroke}
        strokeWidth={strokeWidth * 0.75}
        strokeLinecap="round"
      />

      {/* Đường gập ve áo bên trong (Lapel Roll Line) */}
      <path
        d="M 40 23 L 32 66"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Cạnh ngoài Ve Áo (điều chỉnh nhẹ độ mở theo slim / standard / wide) */}
      <path
        d={
          widthId === 'slim'
            ? 'M 44 37 L 49 43 L 35 84'
            : widthId === 'wide'
            ? 'M 44 37 L 53.5 43 L 37 84'
            : 'M 44 37 L 51 43 L 36 84'
        }
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Mũi tên biểu thị Bản nhỏ (Slim - 2 mũi tên chỉ vào nhau) */}
      {widthId === 'slim' && (
        <g
          stroke={strokeColor}
          strokeWidth={arrowStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Mũi tên bên trái chỉ vào trong */}
          <line x1="18" y1="45" x2="32" y2="50" />
          <polyline points="28,42 32.5,50.2 24.5,53.5" />

          {/* Mũi tên bên phải chỉ vào trong */}
          <line x1="63" y1="59" x2="49" y2="54" />
          <polyline points="56.5,50.5 48.5,53.8 53,62" />
        </g>
      )}

      {/* Mũi tên biểu thị Bản rộng (Wide - 2 mũi tên chỉ ra ngoài) */}
      {widthId === 'wide' && (
        <g
          stroke={strokeColor}
          strokeWidth={arrowStrokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Mũi tên bên trái chỉ ra ngoài */}
          <line x1="32" y1="50" x2="18" y2="45" />
          <polyline points="25.5,41.5 17.5,44.8 22,53" />

          {/* Mũi tên bên phải chỉ ra ngoài */}
          <line x1="49" y1="54" x2="63" y2="59" />
          <polyline points="59,51 63.5,59.2 55.5,62.5" />
        </g>
      )}
    </svg>
  );
}

/**
 * Hình minh họa Vector Line-Art cho Vest 2 Mảnh & Vest 3 Mảnh (2 piece suit / 3 piece suit):
 * - 2_piece: Hình áo gile có đường gạch chéo (loại bình thường có tay áo)
 * - 3_piece: Hình áo gile không tay (loại bỏ 2 bên tay áo trên mô hình 2D)
 */
function SuitPieceLineArtSvg({
  pieceId,
  active,
}: {
  pieceId: '2_piece' | '3_piece';
  active: boolean;
}) {
  const strokeColor = active ? '#141413' : '#9E9A93';
  const strokeWidth = active ? 1.55 : 1.25;

  return (
    <svg
      viewBox="0 0 96 104"
      className="w-20 h-22 sm:w-22 sm:h-24 mx-auto overflow-visible select-none"
      fill="none"
    >
      {/* Dấu tích tròn góc trên bên trái khi được chọn */}
      {active && (
        <g transform="translate(17, 18)">
          <circle
            cx="0"
            cy="0"
            r="8.5"
            fill="#FFFFFF"
            stroke="#141413"
            strokeWidth="1.4"
          />
          <path
            d="M -3.5 0.2 L -1 2.8 L 3.8 -2.5"
            stroke="#8C6D46"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* Khung thân áo Gile / Waistcoat không tay (chuẩn theo mẫu hình 2) */}
      <path
        d="M 29 16 L 40 16 Q 48 18 56 16 L 67 16 L 65 34 Q 64 42 70 47 L 66 84 L 55 86 L 48 81 L 41 86 L 30 84 L 26 47 Q 32 42 31 34 Z"
        fill="#FFFFFF"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />

      {/* Cổ chữ V sâu của áo Gile & đường giao vạt giữa */}
      <path
        d="M 40 16 Q 42 36 48 49 Q 54 36 56 16"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M 48 49 L 48 81"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Cơi túi ngực nhỏ bên phải áo Gile */}
      <rect
        x="53.5"
        y="44"
        width="8.5"
        height="2.8"
        rx="0.6"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.8}
      />

      {/* 3 Cúc áo dọc ở tâm áo Gile */}
      {[55, 64, 73].map((cy) => (
        <g key={cy}>
          <circle cx="51" cy={cy} r="1.6" fill={strokeColor} />
          <line
            x1="48.5"
            y1={cy}
            x2="50.5"
            y2={cy}
            stroke={strokeColor}
            strokeWidth={strokeWidth * 0.85}
          />
        </g>
      ))}

      {/* 2 đường chiết eo dọc dưới vạt áo Gile */}
      <line
        x1="36"
        y1="68"
        x2="36"
        y2="84.5"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
      />
      <line
        x1="60"
        y1="68"
        x2="60"
        y2="84.5"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.85}
        strokeLinecap="round"
      />

      {/* Đường gạch chéo đậm cho Vest 2 mảnh (2 piece suit) chuẩn như trên hình */}
      {pieceId === '2_piece' && (
        <g>
          <line
            x1="21"
            y1="82"
            x2="75"
            y2="20"
            stroke="#FFFFFF"
            strokeWidth="5.2"
            strokeLinecap="round"
          />
          <line
            x1="21"
            y1="82"
            x2="75"
            y2="20"
            stroke={strokeColor}
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}

/**
 * Hình minh họa Vector Line-Art cho 3 Kiểu Túi Hông (Pocket Style):
 * - flap: Túi nắp (With flap)
 * - jetted: Túi viền kép (Double-welted)
 * - patched: Túi ốp ngoài (Patched)
 */
function PocketStyleLineArtSvg({
  pocketId,
  active,
}: {
  pocketId: PocketStyleId;
  active: boolean;
}) {
  const strokeColor = active ? '#141413' : '#9E9A93';
  const secondaryStroke = active ? '#57534E' : '#B8B4AC';
  const strokeWidth = active ? 1.55 : 1.25;

  return (
    <svg
      viewBox="0 0 96 84"
      className="w-20 h-18 sm:w-22 sm:h-20 mx-auto overflow-visible select-none"
      fill="none"
    >
      {/* Dấu tích tròn góc trên bên trái khi được chọn (chuẩn theo mẫu hình 1) */}
      {active && (
        <g transform="translate(17, 17)">
          <circle
            cx="0"
            cy="0"
            r="8.5"
            fill="#FFFFFF"
            stroke="#141413"
            strokeWidth="1.4"
          />
          <path
            d="M -3.5 0.2 L -1 2.8 L 3.8 -2.5"
            stroke="#8C6D46"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {pocketId === 'flap' && (
        <g>
          {/* Thân nắp túi ngang bo nhẹ 2 góc dưới */}
          <path
            d="M 22 40 H 74 L 74.5 52.5 Q 74.5 57.5 69.5 57.5 H 26.5 Q 21.5 57.5 21.5 52.5 Z"
            fill="#FFFFFF"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Đường viền cơi trên nắp túi */}
          <path
            d="M 22 44.5 H 74"
            stroke={secondaryStroke}
            strokeWidth={strokeWidth * 0.85}
            strokeLinecap="round"
          />
        </g>
      )}

      {pocketId === 'jetted' && (
        <g>
          {/* Khung viền cơi kép mảnh ngang */}
          <rect
            x="22"
            y="43"
            width="52"
            height="10"
            rx="3.2"
            fill="#FFFFFF"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Khe miệng túi giữa hai viền cơi */}
          <line
            x1="25"
            y1="48"
            x2="71"
            y2="48"
            stroke={secondaryStroke}
            strokeWidth={strokeWidth * 0.85}
            strokeLinecap="round"
          />
        </g>
      )}

      {pocketId === 'patched' && (
        <g>
          {/* Thân túi ốp ngoài dáng chữ U đứng */}
          <path
            d="M 27 23 H 69 V 59 Q 69 68 60 68 H 36 Q 27 68 27 59 Z"
            fill="#FFFFFF"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
          {/* Đường miệng túi phía trên */}
          <line
            x1="27.5"
            y1="26.5"
            x2="68.5"
            y2="26.5"
            stroke={secondaryStroke}
            strokeWidth={strokeWidth * 0.65}
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}

/**
 * Hình minh họa Vector Line-Art cho 2 chế độ chọn Cúc Áo:
 * - default: Loại thường
 * - custom: Tự chọn (kèm vòng tròn bảng màu góc dưới phải)
 */
function ButtonModeLineArtSvg({
  modeType,
  active,
}: {
  modeType: 'default' | 'custom';
  active: boolean;
}) {
  const strokeColor = active ? '#141413' : '#9E9A93';
  const strokeWidth = active ? 1.55 : 1.25;

  return (
    <svg
      viewBox="0 0 88 80"
      className="w-18 h-16 sm:w-20 sm:h-18 mx-auto overflow-visible select-none"
      fill="none"
    >
      {active && (
        <g transform="translate(17, 16)">
          <circle
            cx="0"
            cy="0"
            r="8.5"
            fill="#FFFFFF"
            stroke="#141413"
            strokeWidth="1.4"
          />
          <path
            d="M -3.5 0.2 L -1 2.8 L 3.8 -2.5"
            stroke="#8C6D46"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* Vòng ngoài cúc áo */}
      <circle
        cx="44"
        cy="40"
        r="24"
        fill="#FFFFFF"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      {/* Vành lõm bên trong cúc áo */}
      <circle
        cx="44"
        cy="40"
        r="19.5"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.85}
      />
      {/* 4 lỗ cúc áo */}
      <circle
        cx="38.5"
        cy="34.5"
        r="2.4"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.9}
      />
      <circle
        cx="49.5"
        cy="34.5"
        r="2.4"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.9}
      />
      <circle
        cx="38.5"
        cy="45.5"
        r="2.4"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.9}
      />
      <circle
        cx="49.5"
        cy="45.5"
        r="2.4"
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.9}
      />

      {/* Biểu tượng bánh xe màu sắc ở góc dưới phải cho mục Tự chọn */}
      {modeType === 'custom' && (
        <g transform="translate(61, 55)">
          <circle cx="0" cy="0" r="10.5" fill="#FFFFFF" />
          <path d="M 0 0 L 0 -9.5 A 9.5 9.5 0 0 1 8.2 -4.75 Z" fill="#EF4444" />
          <path
            d="M 0 0 L 8.2 -4.75 A 9.5 9.5 0 0 1 8.2 4.75 Z"
            fill="#F59E0B"
          />
          <path d="M 0 0 L 8.2 4.75 A 9.5 9.5 0 0 1 0 9.5 Z" fill="#10B981" />
          <path d="M 0 0 L 0 9.5 A 9.5 9.5 0 0 1 -8.2 4.75 Z" fill="#3B82F6" />
          <path
            d="M 0 0 L -8.2 4.75 A 9.5 9.5 0 0 1 -8.2 -4.75 Z"
            fill="#6366F1"
          />
          <path
            d="M 0 0 L -8.2 -4.75 A 9.5 9.5 0 0 1 0 -9.5 Z"
            fill="#EC4899"
          />
        </g>
      )}
    </svg>
  );
}

/**
 * Hình minh họa 3D chân thực cho 10 mẫu cúc áo trong danh sách Tự chọn
 * (6 mẫu cúc sừng / ngọc trai 4 lỗ + 4 mẫu cúc đồng chạm khắc)
 */
function CustomButtonSwatchSvg({
  swatch,
  active,
}: {
  swatch: CustomButtonSwatchItem;
  active: boolean;
}) {
  const gradId = `btn_swatch_grad_${swatch.id}`;
  const rimGradId = `btn_swatch_rim_${swatch.id}`;

  return (
    <svg
      viewBox="0 0 84 80"
      className="w-16 h-15 sm:w-18 sm:h-16 mx-auto overflow-visible select-none"
      fill="none"
    >
      <defs>
        <radialGradient id={gradId} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor={swatch.c0} />
          <stop offset="55%" stopColor={swatch.c1} />
          <stop offset="100%" stopColor={swatch.c2} />
        </radialGradient>
        <linearGradient id={rimGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={swatch.rim} />
          <stop offset="50%" stopColor={swatch.c1} />
          <stop offset="100%" stopColor={swatch.c2} />
        </linearGradient>
      </defs>

      {/* Bóng đổ мяг dưới cúc */}
      <ellipse cx="44" cy="44" rx="25" ry="24" fill="rgba(20, 20, 19, 0.16)" />

      {/* Thân cúc chính */}
      <circle
        cx="42"
        cy="40"
        r="24.5"
        fill={`url(#${rimGradId})`}
        stroke={active ? '#141413' : 'rgba(20,20,19,0.22)'}
        strokeWidth={active ? '1.3' : '0.8'}
      />

      {swatch.kind === 'horn' ? (
        <g>
          {/* Lòng cúc sừng bóng */}
          <circle
            cx="42"
            cy="40"
            r="19.2"
            fill={`url(#${gradId})`}
            stroke={swatch.rim}
            strokeWidth="0.9"
            strokeOpacity="0.65"
          />
          {/* Vân sừng tự nhiên */}
          <path
            d="M 27 31 Q 38 25 53 33"
            stroke={swatch.accent}
            strokeWidth="1.4"
            strokeOpacity="0.28"
            strokeLinecap="round"
          />
          <path
            d="M 29 49 Q 43 54 56 45"
            stroke={swatch.c2}
            strokeWidth="1.6"
            strokeOpacity="0.35"
            strokeLinecap="round"
          />
          {/* 4 lỗ khâu chỉ */}
          {[
            [36.5, 34.5],
            [47.5, 34.5],
            [36.5, 45.5],
            [47.5, 45.5],
          ].map(([hx, hy], idx) => (
            <circle
              key={idx}
              cx={hx}
              cy={hy}
              r="2.4"
              fill={swatch.c2}
              stroke={swatch.rim}
              strokeWidth="0.65"
              strokeOpacity="0.6"
            />
          ))}
        </g>
      ) : (
        <g>
          {/* Vành chạm khắc răng cưa / dây thừng của cúc đồng */}
          <circle
            cx="42"
            cy="40"
            r="22"
            fill={`url(#${gradId})`}
            stroke={swatch.rim}
            strokeWidth="1.4"
            strokeDasharray="2.2 1.4"
          />
          <circle
            cx="42"
            cy="40"
            r="17.8"
            fill={`url(#${gradId})`}
            stroke={swatch.accent}
            strokeWidth="0.9"
            strokeOpacity="0.65"
          />
          {/* Họa tiết vương miện & khiên hoàng gia chạm nổi ở tâm cúc đồng */}
          <path
            d="M 34 35 L 37 29 L 42 33 L 47 29 L 50 35 Z"
            fill={swatch.rim}
            stroke={swatch.accent}
            strokeWidth="0.75"
            strokeLinejoin="round"
          />
          <path
            d="M 35 37 H 49 V 44 C 49 48.5 42 51.5 42 51.5 C 42 51.5 35 48.5 35 44 Z"
            fill={swatch.rim}
            fillOpacity="0.85"
            stroke={swatch.accent}
            strokeWidth="0.85"
            strokeLinejoin="round"
          />
          <path
            d="M 42 38.5 V 49 M 37.5 43 H 46.5"
            stroke={swatch.accent}
            strokeWidth="0.9"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Dấu tích tròn góc trên bên trái khi mẫu cúc được chọn */}
      {active && (
        <g transform="translate(19, 17)">
          <circle
            cx="0"
            cy="0"
            r="8.5"
            fill="#FFFFFF"
            stroke="#141413"
            strokeWidth="1.4"
          />
          <path
            d="M -3.5 0.2 L -1 2.8 L 3.8 -2.5"
            stroke="#8C6D46"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
    </svg>
  );
}

/**
 * Hình minh họa Vector Line-Art cho 2 chế độ chọn Cà Vạt (Necktie):
 * - without: Không dùng (hình cà vạt kẻ chéo bị gạch chéo)
 * - add: Thêm cà vạt (hình thân trên áo vest đeo cà vạt)
 */
function NecktieModeLineArtSvg({
  modeType,
  active,
}: {
  modeType: 'without' | 'add';
  active: boolean;
}) {
  const strokeColor = active ? '#141413' : '#9E9A93';
  const strokeWidth = active ? 1.5 : 1.2;

  return (
    <svg
      viewBox="0 0 96 94"
      className="w-20 h-20 sm:w-22 sm:h-22 mx-auto overflow-visible select-none"
      fill="none"
    >
      {active && (
        <g transform="translate(17, 16)">
          <circle
            cx="0"
            cy="0"
            r="8.5"
            fill="#FFFFFF"
            stroke="#141413"
            strokeWidth="1.4"
          />
          <path
            d="M -3.5 0.2 L -1 2.8 L 3.8 -2.5"
            stroke="#8C6D46"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {modeType === 'without' ? (
        <g stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round">
          {/* Nút thắt cà vạt trên */}
          <path
            d="M 44 16 H 52 L 50.5 23.5 H 45.5 Z"
            fill="#FFFFFF"
          />
          {/* Thân cà vạt */}
          <path
            d="M 45.5 23.5 H 50.5 L 55 68 L 48 77 L 41 68 Z"
            fill="#FFFFFF"
          />
          {/* Các vạch kẻ sọc chéo trên thân cà vạt */}
          <line x1="45" y1="30" x2="51" y2="27" />
          <line x1="44" y1="38" x2="52" y2="34" />
          <line x1="43" y1="46" x2="53" y2="41" />
          <line x1="42.5" y1="54" x2="53.5" y2="49" />
          <line x1="42" y1="62" x2="54" y2="57" />
          <line x1="42" y1="69" x2="54.5" y2="64" />

          {/* Đường gạch chéo biểu thị Không dùng cà vạt */}
          <line
            x1="23"
            y1="66"
            x2="73"
            y2="26"
            stroke="#FFFFFF"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            x1="23"
            y1="66"
            x2="73"
            y2="26"
            stroke={strokeColor}
            strokeWidth="2.3"
            strokeLinecap="round"
          />
        </g>
      ) : (
        <g stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round">
          {/* Phần thân trên áo Vest & cầu vai */}
          <path
            d="M 38 22 Q 48 17 58 22 L 75 28 L 78 76 M 21 28 L 38 22 M 21 28 L 18 76"
            strokeLinecap="round"
          />
          {/* Đường nách & eo trong */}
          <path d="M 27 42 L 26 76 M 69 42 L 70 76" strokeLinecap="round" />
          {/* Cổ áo sơ mi */}
          <path d="M 39 22 L 45 29 L 41 34 M 57 22 L 51 29 L 55 34" />
          {/* Hai ve áo chữ V */}
          <path d="M 38 22 L 32 30 L 36 32 L 33 35 L 48 67 L 48 76" />
          <path d="M 58 22 L 64 30 L 60 32 L 63 35 L 48 67" />
          {/* Cà vạt chính giữa khe chữ V */}
          <path d="M 46 28 H 50 L 49.2 33 H 46.8 Z" fill="#FFFFFF" />
          <path d="M 46.8 33 H 49.2 L 51.5 57 L 48 65 L 44.5 57 Z" fill="#FFFFFF" />
          <line x1="46" y1="39" x2="50" y2="37" strokeWidth={strokeWidth * 0.8} />
          <line x1="45.5" y1="45" x2="50.5" y2="42.5" strokeWidth={strokeWidth * 0.8} />
          <line x1="45" y1="51" x2="51" y2="48.5" strokeWidth={strokeWidth * 0.8} />
          <line x1="45" y1="57" x2="51" y2="54.5" strokeWidth={strokeWidth * 0.8} />
        </g>
      )}
    </svg>
  );
}

/**
 * Hình minh họa lụa 3D chân thực cho 15 mẫu Cà Vạt trong danh sách
 */
function NecktieSwatchSvg({
  tie,
  active,
}: {
  tie: NecktieSwatchItem;
  active: boolean;
}) {
  const gradId = `tie_grad_${tie.id}`;
  const clipId = `tie_clip_${tie.id}`;
  const bladePath = 'M 33 10 H 51 L 56 76 L 42 91 L 28 76 Z';

  return (
    <svg
      viewBox="0 0 84 100"
      className="w-18 h-22 sm:w-20 sm:h-24 mx-auto overflow-visible select-none"
      fill="none"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="15%">
          <stop offset="0%" stopColor={tie.c1} />
          <stop offset="38%" stopColor={tie.c0} />
          <stop offset="72%" stopColor={tie.c1} />
          <stop offset="100%" stopColor={tie.c2} />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={bladePath} />
        </clipPath>
      </defs>

      {/* Bóng đổ мяг dưới thân cà vạt */}
      <path
        d="M 35 13 H 53 L 58 78 L 44 93 L 30 78 Z"
        fill="rgba(20, 20, 19, 0.14)"
      />

      {/* Thân cà vạt lụa */}
      <g clipPath={`url(#${clipId})`}>
        <path d={bladePath} fill={`url(#${gradId})`} />

        {/* Họa tiết dệt Jacquard trên bề mặt cà vạt */}
        {tie.pattern === 'dots' && (
          <g fill={tie.accent} fillOpacity="0.88">
            {[16, 24, 32, 40, 48, 56, 64, 72, 80].map((y, rIdx) =>
              [31, 37, 43, 49, 55].map((x, cIdx) => {
                const offsetX = rIdx % 2 === 0 ? 0 : 3;
                return (
                  <circle
                    key={`${rIdx}_${cIdx}`}
                    cx={x + offsetX - 1.5}
                    cy={y}
                    r="0.95"
                  />
                );
              })
            )}
          </g>
        )}

        {tie.pattern === 'grid' && (
          <g stroke={tie.accent} strokeOpacity="0.52" strokeWidth="0.8">
            {[14, 19, 24, 29, 34, 39, 44, 49, 54, 59, 64, 69, 74, 79, 84].map(
              (y) => (
                <line key={`h_${y}`} x1="26" y1={y} x2="58" y2={y} />
              )
            )}
            {[30, 34, 38, 42, 46, 50, 54].map((x) => (
              <line key={`v_${x}`} x1={x} y1="8" x2={x} y2="92" />
            ))}
          </g>
        )}

        {tie.pattern === 'diamond' && (
          <g stroke={tie.accent} strokeOpacity="0.6" strokeWidth="0.85">
            {[10, 18, 26, 34, 42, 50, 58, 66, 74, 82].map((y) => (
              <g key={`d_${y}`}>
                <line x1="26" y1={y} x2="58" y2={y + 16} />
                <line x1="58" y1={y} x2="26" y2={y + 16} />
              </g>
            ))}
          </g>
        )}

        {tie.pattern === 'stripes' && (
          <g>
            {[18, 34, 50, 66, 82].map((y) => (
              <g key={`s_${y}`}>
                <line
                  x1="24"
                  y1={y + 14}
                  x2="60"
                  y2={y - 10}
                  stroke={tie.accent}
                  strokeWidth="2.4"
                  strokeOpacity="0.9"
                />
                {tie.accent2 && (
                  <line
                    x1="24"
                    y1={y + 18.5}
                    x2="60"
                    y2={y - 5.5}
                    stroke={tie.accent2}
                    strokeWidth="1.3"
                    strokeOpacity="0.85"
                  />
                )}
              </g>
            ))}
          </g>
        )}

        {/* Ánh bóng lụa dọc thân cà vạt */}
        <path
          d="M 36 10 H 41 L 43 90 H 37 Z"
          fill="rgba(255, 255, 255, 0.07)"
        />
      </g>

      {/* Đường viền thân cà vạt */}
      <path
        d={bladePath}
        stroke={active ? '#141413' : 'rgba(20, 20, 19, 0.22)'}
        strokeWidth={active ? '1.3' : '0.8'}
        strokeLinejoin="round"
      />

      {/* Dấu tích tròn góc trên bên trái khi mẫu cà vạt được chọn */}
      {active && (
        <g transform="translate(20, 18)">
          <circle
            cx="0"
            cy="0"
            r="8.5"
            fill="#FFFFFF"
            stroke="#141413"
            strokeWidth="1.4"
          />
          <path
            d="M -3.5 0.2 L -1 2.8 L 3.8 -2.5"
            stroke="#8C6D46"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
    </svg>
  );
}

/**
 * Hình minh họa Vector Line-Art cho các tùy chọn Quần Âu (Trousers):
 * - Phom ống quần (Slim / Regular / Relaxed)
 * - Ly quần trước (Không ly / 1 ly / 2 ly)
 * - Cạp quần (Cạp tiêu chuẩn / Cạp chéo dài / Cạp trơn)
 * - Túi trước (Túi chéo / Túi dọc / Túi ngang)
 * - Gấu quần (Gấu trơn / Gấu lơ-vê)
 */
function TrouserOptionLineArtSvg({
  category,
  optionId,
  active,
}: {
  category: 'style' | 'rise' | 'fit' | 'pleat' | 'waistband' | 'pocket' | 'cuff';
  optionId: string;
  active: boolean;
}) {
  const strokeColor = active ? '#141413' : '#9E9A93';
  const strokeWidth = active ? 1.5 : 1.2;

  return (
    <svg
      viewBox="0 0 96 94"
      className="w-20 h-20 sm:w-22 sm:h-22 mx-auto overflow-visible select-none"
      fill="none"
    >
      {active && (
        <g transform="translate(16, 15)">
          <circle
            cx="0"
            cy="0"
            r="8.5"
            fill="#FFFFFF"
            stroke="#141413"
            strokeWidth="1.4"
          />
          <path
            d="M -3.5 0.2 L -1 2.8 L 3.8 -2.5"
            stroke="#8C6D46"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {category === 'style' && (
        <g stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round">
          {optionId === 'flat_front' && (
            <>
              <path d="M 27 20 H 69 L 70 80 H 52 L 48 44 L 44 80 H 26 Z" fill="#FFFFFF" />
              <line x1="27" y1="28" x2="69" y2="28" />
              <line x1="48" y1="20" x2="48" y2="44" />
              <circle cx="51.5" cy="24" r="1.4" fill={strokeColor} />
              <line x1="36" y1="36" x2="35" y2="78" strokeDasharray="2 2" strokeWidth="1" />
              <line x1="60" y1="36" x2="61" y2="78" strokeDasharray="2 2" strokeWidth="1" />
            </>
          )}
          {optionId === 'pleated' && (
            <>
              <path d="M 26 20 H 70 L 72 80 H 52 L 48 44 L 44 80 H 24 Z" fill="#FFFFFF" />
              <line x1="26" y1="28" x2="70" y2="28" />
              <line x1="48" y1="20" x2="48" y2="44" />
              <path d="M 36 28 L 34 45 M 38.5 28 L 36.5 45" strokeLinecap="round" />
              <path d="M 60 28 L 62 45 M 57.5 28 L 59.5 45" strokeLinecap="round" />
              <line x1="35" y1="45" x2="34" y2="78" strokeWidth="1" />
              <line x1="61" y1="45" x2="62" y2="78" strokeWidth="1" />
            </>
          )}
          {optionId === 'high_waisted' && (
            <>
              <path d="M 26 12 H 70 L 72 80 H 52 L 48 44 L 44 80 H 24 Z" fill="#FFFFFF" />
              <line x1="26" y1="26" x2="70" y2="26" />
              <path d="M 46 12 H 60 L 64 19 L 60 26 H 46 Z" fill="#FFFFFF" />
              <circle cx="59" cy="19" r="1.5" fill={strokeColor} />
              <line x1="48" y1="26" x2="48" y2="44" />
              <path d="M 36 26 L 34 43 M 60 26 L 62 43" strokeLinecap="round" />
              <line x1="35" y1="43" x2="34" y2="78" strokeWidth="1" />
              <line x1="61" y1="43" x2="62" y2="78" strokeWidth="1" />
            </>
          )}
          {optionId === 'double_pleat_sartorial' && (
            <>
              <path d="M 26 14 H 70 L 73 80 H 51 L 48 44 L 45 80 H 23 Z" fill="#FFFFFF" />
              <line x1="26" y1="25" x2="70" y2="25" />
              <line x1="48" y1="14" x2="48" y2="44" />
              <path d="M 37 25 L 35 43 M 32 25 L 30 40" strokeLinecap="round" />
              <path d="M 59 25 L 61 43 M 64 25 L 66 40" strokeLinecap="round" />
              <rect x="23" y="72" width="22" height="8" fill="#FFFFFF" />
              <rect x="51" y="72" width="22" height="8" fill="#FFFFFF" />
            </>
          )}
          {optionId === 'gurkha' && (
            <>
              <path d="M 26 12 H 70 L 73 80 H 51 L 48 44 L 45 80 H 23 Z" fill="#FFFFFF" />
              <line x1="26" y1="27" x2="70" y2="27" />
              <path d="M 34 13 H 62 L 65 19 L 62 20 H 34 Z" fill="#FFFFFF" />
              <path d="M 62 20 H 34 L 31 25 L 34 27 H 62 Z" fill="#FFFFFF" />
              <rect x="57" y="14" width="4" height="6" />
              <rect x="35" y="20" width="4" height="6" />
              <line x1="48" y1="27" x2="48" y2="44" />
              <path d="M 36 27 L 34 44 M 60 27 L 62 44" strokeLinecap="round" />
            </>
          )}
        </g>
      )}

      {category === 'rise' && (
        <g stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round">
          {optionId === 'standard_rise' ? (
            <>
              <line x1="20" y1="16" x2="76" y2="16" strokeDasharray="2 2" strokeWidth="1" />
              <path d="M 25 26 H 71 L 73 78 H 52 L 48 48 L 44 78 H 23 Z" fill="#FFFFFF" />
              <line x1="25" y1="35" x2="71" y2="35" />
              <line x1="48" y1="26" x2="48" y2="48" />
            </>
          ) : (
            <>
              <path d="M 25 14 H 71 L 73 78 H 52 L 48 48 L 44 78 H 23 Z" fill="#FFFFFF" />
              <line x1="25" y1="28" x2="71" y2="28" />
              <line x1="48" y1="14" x2="48" y2="48" />
              <path d="M 18 30 V 15 M 15 18 L 18 15 L 21 18" strokeLinecap="round" />
              <path d="M 78 30 V 15 M 75 18 L 78 15 L 81 18" strokeLinecap="round" />
            </>
          )}
        </g>
      )}

      {category === 'fit' && (
        <g stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round">
          {/* Cạp quần trên */}
          <rect x="28" y="14" width="40" height="7" rx="1" fill="#FFFFFF" />
          <line x1="48" y1="14" x2="48" y2="36" />
          {/* 2 ống quần với độ rộng tùy theo Slim / Regular / Relaxed */}
          {optionId === 'slim' && (
            <>
              <path d="M 28 21 L 31 80 H 43 L 48 36 L 53 80 H 65 L 68 21" />
              {/* Mũi tên ép gọn 2 bên ống quần */}
              <path d="M 19 54 H 27 M 24 51 L 27 54 L 24 57" strokeLinecap="round" />
              <path d="M 77 54 H 69 M 72 51 L 69 54 L 72 57" strokeLinecap="round" />
            </>
          )}
          {optionId === 'regular' && (
            <>
              <path d="M 28 21 L 29 80 H 45 L 48 36 L 51 80 H 67 L 68 21" />
              <line x1="37" y1="26" x2="37" y2="78" strokeDasharray="2 2" strokeWidth="1" />
              <line x1="59" y1="26" x2="59" y2="78" strokeDasharray="2 2" strokeWidth="1" />
            </>
          )}
          {optionId === 'relaxed' && (
            <>
              <path d="M 28 21 L 25 80 H 46 L 48 36 L 50 80 H 71 L 68 21" />
              {/* Mũi tên mở rộng 2 bên ống quần */}
              <path d="M 23 54 H 15 M 18 51 L 15 54 L 18 57" strokeLinecap="round" />
              <path d="M 73 54 H 81 M 78 51 L 81 54 L 78 57" strokeLinecap="round" />
            </>
          )}
        </g>
      )}

      {category === 'pleat' && (
        <g stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round">
          {/* Phần thân trên quần âu */}
          <path d="M 24 18 H 72 L 75 78 H 53 L 48 44 L 43 78 H 21 Z" fill="#FFFFFF" />
          <line x1="24" y1="27" x2="72" y2="27" />
          <line x1="48" y1="18" x2="48" y2="44" />
          <path d="M 48 27 H 53 V 39 Q 53 43 48 43" strokeDasharray="1.8 1.8" strokeWidth="1" />
          {/* Đường ly ủi chính */}
          <line x1="35" y1="45" x2="34" y2="76" strokeWidth="1" />
          <line x1="61" y1="45" x2="62" y2="76" strokeWidth="1" />
          {optionId === 'single_pleat' && (
            <>
              <path d="M 35 27 L 33 45 M 37 27 L 35 45" strokeLinecap="round" />
              <path d="M 61 27 L 63 45 M 59 27 L 61 45" strokeLinecap="round" />
            </>
          )}
          {optionId === 'double_pleat' && (
            <>
              <path d="M 36 27 L 34 45 M 38 27 L 36 45" strokeLinecap="round" />
              <path d="M 30 27 L 29 42 M 32 27 L 30.5 42" strokeLinecap="round" />
              <path d="M 60 27 L 62 45 M 58 27 L 60 45" strokeLinecap="round" />
              <path d="M 66 27 L 67 42 M 64 27 L 65.5 42" strokeLinecap="round" />
            </>
          )}
        </g>
      )}

      {category === 'waistband' && (
        <g stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round">
          {/* Phần cạp quần phóng cận cảnh */}
          <path d="M 18 28 H 78 L 80 72 H 16 Z" fill="#FFFFFF" />
          <line x1="17" y1="42" x2="79" y2="42" />
          <line x1="48" y1="42" x2="48" y2="72" />
          {optionId === 'standard' && (
            <>
              <line x1="48" y1="28" x2="48" y2="42" />
              <circle cx="53" cy="35" r="2.2" fill={strokeColor} />
              {/* Đỉa quần */}
              <rect x="27" y="27" width="4" height="16" rx="1" fill="#FFFFFF" />
              <rect x="65" y="27" width="4" height="16" rx="1" fill="#FFFFFF" />
            </>
          )}
          {optionId === 'extended_tab' && (
            <>
              <path
                d="M 45 28 H 63 L 68 35 L 63 42 H 45 Z"
                fill="#FFFFFF"
              />
              <circle cx="62" cy="35" r="2.1" fill={strokeColor} />
            </>
          )}
          {optionId === 'clean' && (
            <>
              <line x1="51" y1="28" x2="51" y2="42" />
              <line x1="34" y1="35" x2="62" y2="35" strokeDasharray="2 3" strokeWidth="1" />
            </>
          )}
          {optionId === 'gurkha' && (
            <>
              <path d="M 30 29 H 64 L 68 35 L 64 36 H 30 Z" fill="#FFFFFF" />
              <path d="M 66 36 H 32 L 28 41 L 32 42 H 66 Z" fill="#FFFFFF" />
              <rect x="57" y="30" width="4.5" height="6" />
              <rect x="34" y="36" width="4.5" height="6" />
            </>
          )}
        </g>
      )}

      {category === 'pocket' && (
        <g stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round">
          {/* Phần hông quần bên trái */}
          <path d="M 26 18 H 72 V 76 H 22 L 26 18 Z" fill="#FFFFFF" />
          <line x1="25.5" y1="28" x2="72" y2="28" />
          {optionId === 'slanted' && (
            <>
              <line x1="36" y1="28" x2="23.5" y2="58" strokeWidth={strokeWidth * 1.15} />
              <line x1="38.5" y1="28" x2="26" y2="58" strokeDasharray="1.8 2" strokeWidth="1" />
            </>
          )}
          {optionId === 'vertical' && (
            <>
              <line x1="28" y1="28" x2="25" y2="60" strokeWidth={strokeWidth * 1.15} />
              <line x1="30.5" y1="28" x2="27.5" y2="60" strokeDasharray="1.8 2" strokeWidth="1" />
            </>
          )}
          {optionId === 'frogmouth' && (
            <>
              <path
                d="M 25 38 Q 40 43 54 35"
                strokeWidth={strokeWidth * 1.15}
                strokeLinecap="round"
              />
              <path
                d="M 25 40.5 Q 40 45.5 54 37.5"
                strokeDasharray="1.8 2"
                strokeWidth="1"
              />
            </>
          )}
        </g>
      )}

      {category === 'cuff' && (
        <g stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round">
          {/* Phần gấu ống quần */}
          <path d="M 28 16 L 31 74 H 65 L 68 16" fill="#FFFFFF" />
          <line x1="48" y1="16" x2="48" y2="74" strokeWidth="1" />
          {optionId === 'cuffed' && (
            <>
              <rect x="30" y="61" width="36" height="13" fill="#FFFFFF" />
              <line x1="30" y1="64" x2="66" y2="64" strokeWidth="1" />
            </>
          )}
        </g>
      )}
    </svg>
  );
}

export function StyleSelectionTab({
  config,
  setConfig,
  renderOpts,
  currentTargetZoom,
  lapelOptions,
  pocketOptions,
  handleResetView,
  handleFocusBreastPocket,
  mode = 'style',
}: StyleSelectionTabProps) {
  const activeJacketStyleId: JacketStyleId =
    config.jacketStyleId ||
    (config.buttonId === 'single' ? 'sb_1_button' : 'sb_2_buttons');

  const isMandarin = activeJacketStyleId === 'mandarin';

  const isCustomButtonMode =
    Boolean(config.customButtonId && config.customButtonId !== 'default') ||
    config.buttonId === 'gold_brass';

  const activeCustomSwatchId: Exclude<CustomButtonSwatchId, 'default'> =
    config.customButtonId && config.customButtonId !== 'default'
      ? config.customButtonId
      : config.buttonId === 'gold_brass'
      ? 'shiny_gold_brass'
      : 'brown';

  const isNecktieEnabled = Boolean(
    config.necktieId && config.necktieId !== 'none'
  );

  const activeNecktieSwatchId: NecktieSwatchId =
    config.necktieId && config.necktieId !== 'none'
      ? config.necktieId
      : 'kendal';

  const handleSelectJacketStyle = (
    item: StyleOptionItem<JacketStyleId>
  ) => {
    setConfig((prev) => {
      const matchedLapel = lapelOptions.find((l) => l.id === prev.lapelId);
      const nextIsMandarin = item.id === 'mandarin';
      return {
        ...prev,
        jacketStyleId: item.id,
        jacketStyleName: item.name,
        jacketStylePrice: item.price,
        suitPieceId: nextIsMandarin
          ? '2_piece'
          : prev.suitPieceId ?? '2_piece',
        suitPieceName: nextIsMandarin
          ? 'Vest 2 mảnh'
          : prev.suitPieceName ?? 'Vest 2 mảnh',
        lapelName: nextIsMandarin
          ? 'Cổ Tàu'
          : matchedLapel?.name || prev.lapelName,
        lapelPrice: nextIsMandarin
          ? 0
          : matchedLapel?.price ?? prev.lapelPrice,
      };
    });
  };

  const handleSelectLapel = (
    lapel: StyleOptionItem<'notch' | 'peak'>
  ) => {
    if (isMandarin) return;
    setConfig((prev) => ({
      ...prev,
      lapelId: lapel.id,
      lapelName: lapel.name,
      lapelPrice: lapel.price,
    }));
  };

  const handleSelectLapelWidth = (
    widthId: 'slim' | 'standard' | 'wide',
    widthName: string
  ) => {
    if (isMandarin) return;
    setConfig((prev) => ({
      ...prev,
      lapelWidthId: widthId,
      lapelWidthName: widthName,
    }));
  };

  const handleSelectSuitPiece = (
    pieceId: '2_piece' | '3_piece',
    pieceName: string
  ) => {
    if (isMandarin && pieceId === '3_piece') return;
    setConfig((prev) => ({
      ...prev,
      suitPieceId: pieceId,
      suitPieceName: pieceName,
    }));
  };

  const handleSelectDefaultButtonMode = () => {
    setConfig((prev) => ({
      ...prev,
      customButtonId: 'default',
      buttonId: 'double_two',
      buttonName: 'Cúc thường',
      buttonPrice: 0,
    }));
  };

  const handleSelectCustomButtonMode = () => {
    const targetSwatch =
      CUSTOM_BUTTON_SWATCHES.find((s) => s.id === activeCustomSwatchId) ||
      CUSTOM_BUTTON_SWATCHES[0];
    setConfig((prev) => ({
      ...prev,
      customButtonId: targetSwatch.id,
      buttonId: targetSwatch.kind === 'metal' ? 'gold_brass' : 'double_two',
      buttonName: `Cúc tự chọn (${targetSwatch.label})`,
      buttonPrice: targetSwatch.price,
    }));
  };

  const handleSelectCustomSwatch = (swatch: CustomButtonSwatchItem) => {
    setConfig((prev) => ({
      ...prev,
      customButtonId: swatch.id,
      buttonId: swatch.kind === 'metal' ? 'gold_brass' : 'double_two',
      buttonName: `Cúc tự chọn (${swatch.label})`,
      buttonPrice: swatch.price,
    }));
  };

  const handleSelectWithoutNecktie = () => {
    setConfig((prev) => ({
      ...prev,
      necktieId: 'none',
      necktieName: 'Không dùng',
      necktiePrice: 0,
    }));
  };

  const handleSelectAddNecktieMode = () => {
    const targetTie =
      NECKTIE_SWATCHES.find((t) => t.id === activeNecktieSwatchId) ||
      NECKTIE_SWATCHES[0];
    setConfig((prev) => ({
      ...prev,
      necktieId: targetTie.id,
      necktieName: targetTie.label,
      necktiePrice: targetTie.price,
    }));
  };

  const handleSelectNecktieSwatch = (tie: NecktieSwatchItem) => {
    setConfig((prev) => ({
      ...prev,
      necktieId: tie.id,
      necktieName: tie.label,
      necktiePrice: tie.price,
    }));
  };

  const handleSelectPocket = (
    pocket: StyleOptionItem<PocketStyleId>
  ) => {
    setConfig((prev) => ({
      ...prev,
      pocketId: pocket.id,
      pocketName: pocket.name,
      pocketPrice: pocket.price,
    }));
  };

  // ==========================================================================
  // TAB QUẦN ÂU (TROUSERS): DANH SÁCH KIỂU QUẦN ÂU CHỦ ĐẠO + TÙY CHỈNH CHI TIẾT
  // ==========================================================================
  if (mode === 'trousers') {
    const activeStyleId = config.trouserStyleId ?? 'flat_front';
    const activeRiseId =
      config.trouserRiseId ??
      (activeStyleId === 'high_waisted' || activeStyleId === 'gurkha'
        ? 'high_waisted'
        : 'standard_rise');
    const activeFitId = config.trouserFitId ?? 'regular';
    const activePleatId = config.trouserPleatId ?? 'flat_front';
    const activeWaistbandId = config.trouserWaistbandId ?? 'standard';
    const activeTrouserPocketId = config.trouserPocketId ?? 'slanted';
    const activeCuffId = config.trouserCuffId ?? 'no_cuff';

    const trouserStylePresets = [
      {
        id: 'flat_front' as const,
        name: 'Quần không xếp ly',
        subtitle: 'Flat Front',
        riseId: 'standard_rise' as const,
        riseName: 'Cạp tiêu chuẩn',
        pleatId: 'flat_front' as const,
        pleatName: 'Không xếp ly',
        waistbandId: 'standard' as const,
        waistbandName: 'Cạp tiêu chuẩn',
        fitId: 'slim' as const,
        fitName: 'Ống ôm vừa',
        cuffId: 'no_cuff' as const,
        cuffName: 'Gấu trơn',
      },
      {
        id: 'pleated' as const,
        name: 'Quần xếp ly',
        subtitle: 'Pleated',
        riseId: 'standard_rise' as const,
        riseName: 'Cạp tiêu chuẩn',
        pleatId: 'single_pleat' as const,
        pleatName: '1 ly xếp',
        waistbandId: 'standard' as const,
        waistbandName: 'Cạp tiêu chuẩn',
        fitId: 'regular' as const,
        fitName: 'Ống đứng chuẩn',
        cuffId: 'no_cuff' as const,
        cuffName: 'Gấu trơn',
      },
      {
        id: 'high_waisted' as const,
        name: 'Quần cạp cao',
        subtitle: 'High-Waisted',
        riseId: 'high_waisted' as const,
        riseName: 'Quần cạp cao',
        pleatId: 'single_pleat' as const,
        pleatName: '1 ly xếp',
        waistbandId: 'extended_tab' as const,
        waistbandName: 'Cạp chéo dài',
        fitId: 'regular' as const,
        fitName: 'Ống đứng chuẩn',
        cuffId: 'cuffed' as const,
        cuffName: 'Gấu lơ-vê',
      },
      {
        id: 'double_pleat_sartorial' as const,
        name: 'Quần xếp ly đôi',
        subtitle: 'Double Pleated',
        riseId: 'high_waisted' as const,
        riseName: 'Quần cạp cao',
        pleatId: 'double_pleat' as const,
        pleatName: '2 ly xếp',
        waistbandId: 'extended_tab' as const,
        waistbandName: 'Cạp chéo dài',
        fitId: 'relaxed' as const,
        fitName: 'Ống suông rộng',
        cuffId: 'cuffed' as const,
        cuffName: 'Gấu lơ-vê',
      },
      {
        id: 'gurkha' as const,
        name: 'Quần cạp Gurkha',
        subtitle: 'Gurkha High-Waisted',
        riseId: 'high_waisted' as const,
        riseName: 'Quần cạp cao',
        pleatId: 'double_pleat' as const,
        pleatName: '2 ly xếp',
        waistbandId: 'gurkha' as const,
        waistbandName: 'Cạp đôi Gurkha',
        fitId: 'regular' as const,
        fitName: 'Ống đứng chuẩn',
        cuffId: 'cuffed' as const,
        cuffName: 'Gấu lơ-vê',
      },
    ];

    return (
      <div className="space-y-5">
        {/* 0. DANH SÁCH KIỂU QUẦN ÂU (PHONG CÁCH QUẦN CHỦ ĐẠO) */}
        <div>
          <label className="block text-sm font-semibold text-[#141413] mb-3">
            Kiểu Dáng Quần Âu
          </label>
          <div className="grid grid-cols-3 gap-3">
            {trouserStylePresets.map((preset) => {
              const active = activeStyleId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      garmentView: 'trousers',
                      trouserStyleId: preset.id,
                      trouserStyleName: `${preset.name} (${preset.subtitle})`,
                      trouserRiseId: preset.riseId,
                      trouserRiseName: preset.riseName,
                      trouserPleatId: preset.pleatId,
                      trouserPleatName: preset.pleatName,
                      trouserWaistbandId: preset.waistbandId,
                      trouserWaistbandName: preset.waistbandName,
                      trouserFitId: preset.fitId,
                      trouserFitName: preset.fitName,
                      trouserCuffId: preset.cuffId,
                      trouserCuffName: preset.cuffName,
                    }))
                  }
                  className={`group py-3 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between ${
                    active
                      ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs'
                      : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60'
                  }`}
                >
                  <TrouserOptionLineArtSvg
                    category="style"
                    optionId={preset.id}
                    active={active}
                  />
                  <div
                    className={`mt-1.5 text-xs leading-snug transition-colors ${
                      active
                        ? 'font-semibold text-[#141413]'
                        : 'text-[#78716C] group-hover:text-[#141413]'
                    }`}
                  >
                    {preset.name}
                  </div>
                  <div className="text-[10px] text-[#8C6D46] font-medium mt-0.5">
                    {preset.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. ĐỘ CAO CẠP QUẦN (WAIST RISE: CẠP TIÊU CHUẨN / QUẦN CẠP CAO) */}
        <div className="pt-3 border-t border-[#EAE7E1]">
          <label className="block text-sm font-semibold text-[#141413] mb-3">
            Độ Cao Cạp Quần
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                {
                  id: 'standard_rise' as const,
                  name: 'Cạp tiêu chuẩn',
                  sub: 'Mid-Rise',
                },
                {
                  id: 'high_waisted' as const,
                  name: 'Quần cạp cao',
                  sub: 'High-Waisted',
                },
              ] as const
            ).map((item) => {
              const active = activeRiseId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      garmentView: 'trousers',
                      trouserRiseId: item.id,
                      trouserRiseName: item.name,
                      trouserStyleId:
                        item.id === 'high_waisted'
                          ? 'high_waisted'
                          : prev.trouserPleatId === 'flat_front'
                          ? 'flat_front'
                          : 'pleated',
                    }))
                  }
                  className={`group py-3 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between ${
                    active
                      ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs'
                      : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60'
                  }`}
                >
                  <TrouserOptionLineArtSvg
                    category="rise"
                    optionId={item.id}
                    active={active}
                  />
                  <div
                    className={`mt-1.5 text-xs leading-snug transition-colors ${
                      active
                        ? 'font-semibold text-[#141413]'
                        : 'text-[#78716C] group-hover:text-[#141413]'
                    }`}
                  >
                    {item.name}
                  </div>
                  <div className="text-[10px] text-[#8C6D46] font-medium mt-0.5">
                    {item.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. KIỂU ỐNG QUẦN (FIT) */}
        <div className="pt-3 border-t border-[#EAE7E1]">
          <label className="block text-sm font-semibold text-[#141413] mb-3">
            Kiểu Ống Quần
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                { id: 'slim' as const, name: 'Ống ôm vừa' },
                { id: 'regular' as const, name: 'Ống đứng chuẩn' },
                { id: 'relaxed' as const, name: 'Ống suông rộng' },
              ] as const
            ).map((item) => {
              const active = activeFitId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      garmentView: 'trousers',
                      trouserFitId: item.id,
                      trouserFitName: item.name,
                    }))
                  }
                  className={`group py-3 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between ${
                    active
                      ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs'
                      : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60'
                  }`}
                >
                  <TrouserOptionLineArtSvg
                    category="fit"
                    optionId={item.id}
                    active={active}
                  />
                  <div
                    className={`mt-1.5 text-xs leading-snug transition-colors ${
                      active
                        ? 'font-semibold text-[#141413]'
                        : 'text-[#78716C] group-hover:text-[#141413]'
                    }`}
                  >
                    {item.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. LY QUẦN TRƯỚC (PLEATS) */}
        <div className="pt-3 border-t border-[#EAE7E1]">
          <label className="block text-sm font-semibold text-[#141413] mb-3">
            Ly Quần Trước
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                { id: 'flat_front' as const, name: 'Không xếp ly' },
                { id: 'single_pleat' as const, name: '1 ly xếp' },
                { id: 'double_pleat' as const, name: '2 ly xếp' },
              ] as const
            ).map((item) => {
              const active = activePleatId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      garmentView: 'trousers',
                      trouserPleatId: item.id,
                      trouserPleatName: item.name,
                      trouserStyleId:
                        item.id === 'flat_front'
                          ? 'flat_front'
                          : item.id === 'double_pleat'
                          ? 'double_pleat_sartorial'
                          : prev.trouserRiseId === 'high_waisted'
                          ? 'high_waisted'
                          : 'pleated',
                    }))
                  }
                  className={`group py-3 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between ${
                    active
                      ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs'
                      : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60'
                  }`}
                >
                  <TrouserOptionLineArtSvg
                    category="pleat"
                    optionId={item.id}
                    active={active}
                  />
                  <div
                    className={`mt-1.5 text-xs leading-snug transition-colors ${
                      active
                        ? 'font-semibold text-[#141413]'
                        : 'text-[#78716C] group-hover:text-[#141413]'
                    }`}
                  >
                    {item.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. KIỂU CẠP QUẦN (WAISTBAND) */}
        <div className="pt-3 border-t border-[#EAE7E1]">
          <label className="block text-sm font-semibold text-[#141413] mb-3">
            Kiểu Cạp Quần
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                { id: 'standard' as const, name: 'Cạp tiêu chuẩn' },
                { id: 'extended_tab' as const, name: 'Cạp chéo dài' },
                { id: 'clean' as const, name: 'Cạp trơn ẩn cúc' },
                { id: 'gurkha' as const, name: 'Cạp đôi Gurkha' },
              ] as const
            ).map((item) => {
              const active = activeWaistbandId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      garmentView: 'trousers',
                      trouserWaistbandId: item.id,
                      trouserWaistbandName: item.name,
                      ...(item.id === 'gurkha'
                        ? {
                            trouserStyleId: 'gurkha',
                            trouserRiseId: 'high_waisted',
                            trouserRiseName: 'Quần cạp cao',
                          }
                        : {}),
                    }))
                  }
                  className={`group py-3 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between ${
                    active
                      ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs'
                      : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60'
                  }`}
                >
                  <TrouserOptionLineArtSvg
                    category="waistband"
                    optionId={item.id}
                    active={active}
                  />
                  <div
                    className={`mt-1.5 text-xs leading-snug transition-colors ${
                      active
                        ? 'font-semibold text-[#141413]'
                        : 'text-[#78716C] group-hover:text-[#141413]'
                    }`}
                  >
                    {item.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. KIỂU TÚI TRƯỚC QUẦN (FRONT POCKETS) */}
        <div className="pt-3 border-t border-[#EAE7E1]">
          <label className="block text-sm font-semibold text-[#141413] mb-3">
            Kiểu Túi Trước
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                { id: 'slanted' as const, name: 'Túi chéo' },
                { id: 'vertical' as const, name: 'Túi dọc' },
                { id: 'frogmouth' as const, name: 'Túi ngang' },
              ] as const
            ).map((item) => {
              const active = activeTrouserPocketId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      garmentView: 'trousers',
                      trouserPocketId: item.id,
                      trouserPocketName: item.name,
                    }))
                  }
                  className={`group py-3 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between ${
                    active
                      ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs'
                      : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60'
                  }`}
                >
                  <TrouserOptionLineArtSvg
                    category="pocket"
                    optionId={item.id}
                    active={active}
                  />
                  <div
                    className={`mt-1.5 text-xs leading-snug transition-colors ${
                      active
                        ? 'font-semibold text-[#141413]'
                        : 'text-[#78716C] group-hover:text-[#141413]'
                    }`}
                  >
                    {item.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. KIỂU GẤU QUẦN (CUFFS) */}
        <div className="pt-3 border-t border-[#EAE7E1]">
          <label className="block text-sm font-semibold text-[#141413] mb-3">
            Kiểu Gấu Quần
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                { id: 'no_cuff' as const, name: 'Gấu trơn' },
                { id: 'cuffed' as const, name: 'Gấu lơ-vê' },
              ] as const
            ).map((item) => {
              const active = activeCuffId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      garmentView: 'trousers',
                      trouserCuffId: item.id,
                      trouserCuffName: item.name,
                    }))
                  }
                  className={`group py-3 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between ${
                    active
                      ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs'
                      : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60'
                  }`}
                >
                  <TrouserOptionLineArtSvg
                    category="cuff"
                    optionId={item.id}
                    active={active}
                  />
                  <div
                    className={`mt-1.5 text-xs leading-snug transition-colors ${
                      active
                        ? 'font-semibold text-[#141413]'
                        : 'text-[#78716C] group-hover:text-[#141413]'
                    }`}
                  >
                    {item.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // TAB CHI TIẾT (DETAILS): CHỌN CÚC ÁO (LOẠI THƯỜNG / TỰ CHỌN) + THÊU TÊN CÁ NHÂN
  // ==========================================================================
  if (mode === 'details') {
    return (
      <div className="space-y-5">
        {/* MỤC CHỌN CÚC ÁO: 1 LÀ LOẠI THƯỜNG, 2 LÀ TỰ CHỌN (HIỆN DANH SÁCH 10 MẪU CÚC) */}
        <div className="p-4 rounded-xl bg-white border border-[#E5E2DC] space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-[#141413]">
              Cúc Áo
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={handleSelectDefaultButtonMode}
              className={`group py-3 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between ${
                !isCustomButtonMode
                  ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs'
                  : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60'
              }`}
            >
              <ButtonModeLineArtSvg
                modeType="default"
                active={!isCustomButtonMode}
              />
              <div
                className={`mt-1.5 text-xs leading-snug transition-colors ${
                  !isCustomButtonMode
                    ? 'font-semibold text-[#141413]'
                    : 'text-[#78716C] group-hover:text-[#141413]'
                }`}
              >
                Loại thường
              </div>
            </button>

            <button
              type="button"
              onClick={handleSelectCustomButtonMode}
              className={`group py-3 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between ${
                isCustomButtonMode
                  ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs'
                  : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60'
              }`}
            >
              <ButtonModeLineArtSvg
                modeType="custom"
                active={isCustomButtonMode}
              />
              <div
                className={`mt-1.5 text-xs leading-snug transition-colors ${
                  isCustomButtonMode
                    ? 'font-semibold text-[#141413]'
                    : 'text-[#78716C] group-hover:text-[#141413]'
                }`}
              >
                Tự chọn
              </div>
            </button>
          </div>

          {/* KHI BẤM VÀO "TỰ CHỌN": HIỂN THỊ DANH SÁCH 10 MẪU CÚC NHƯ HÌNH THỨ 3 */}
          {isCustomButtonMode && (
            <div className="pt-3.5 border-t border-[#EAE7E1]">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {CUSTOM_BUTTON_SWATCHES.map((swatch) => {
                  const active = activeCustomSwatchId === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => handleSelectCustomSwatch(swatch)}
                      className={`group py-2.5 px-1.5 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-start ${
                        active
                          ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs'
                          : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60'
                      }`}
                    >
                      <CustomButtonSwatchSvg swatch={swatch} active={active} />
                      <div
                        className={`mt-1 text-[11px] leading-tight transition-colors ${
                          active
                            ? 'font-semibold text-[#141413]'
                            : 'text-[#78716C] group-hover:text-[#141413]'
                        }`}
                      >
                        {swatch.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* MỤC CHỌN CÀ VẠT (NECKTIE): KHÔNG DÙNG HOẶC THÊM CÀ VẠT (HIỆN DANH SÁCH 15 MẪU CÀ VẠT LỤA) */}
        <div className="p-4 rounded-xl bg-white border border-[#E5E2DC] space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-[#141413]">
              Cà Vạt
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={handleSelectWithoutNecktie}
              className={`group py-3 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between ${
                !isNecktieEnabled
                  ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs'
                  : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60'
              }`}
            >
              <NecktieModeLineArtSvg
                modeType="without"
                active={!isNecktieEnabled}
              />
              <div
                className={`mt-1.5 text-xs leading-snug transition-colors ${
                  !isNecktieEnabled
                    ? 'font-semibold text-[#141413]'
                    : 'text-[#78716C] group-hover:text-[#141413]'
                }`}
              >
                Không dùng
              </div>
            </button>

            <button
              type="button"
              onClick={handleSelectAddNecktieMode}
              className={`group py-3 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between ${
                isNecktieEnabled
                  ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs'
                  : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60'
              }`}
            >
              <NecktieModeLineArtSvg
                modeType="add"
                active={isNecktieEnabled}
              />
              <div
                className={`mt-1.5 text-xs leading-snug transition-colors ${
                  isNecktieEnabled
                    ? 'font-semibold text-[#141413]'
                    : 'text-[#78716C] group-hover:text-[#141413]'
                }`}
              >
                Thêm (+{formatVND(65000)})
              </div>
            </button>
          </div>

          {/* KHI BẤM VÀO "THÊM CÀ VẠT": HIỂN THỊ DANH SÁCH 15 MẪU CÀ VẠT LỤA NHƯ HÌNH */}
          {isNecktieEnabled && (
            <div className="pt-3.5 border-t border-[#EAE7E1]">
              <div className="grid grid-cols-3 gap-2.5">
                {NECKTIE_SWATCHES.map((tie) => {
                  const active = activeNecktieSwatchId === tie.id;
                  return (
                    <button
                      key={tie.id}
                      type="button"
                      onClick={() => handleSelectNecktieSwatch(tie)}
                      className={`group py-2.5 px-1.5 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-start ${
                        active
                          ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs'
                          : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60'
                      }`}
                    >
                      <NecktieSwatchSvg tie={tie} active={active} />
                      <div
                        className={`mt-1.5 text-[11px] leading-snug transition-colors ${
                          active
                            ? 'font-semibold text-[#141413]'
                            : 'text-[#65615B] group-hover:text-[#141413]'
                        }`}
                      >
                        {tie.label}
                      </div>
                      <div className="text-[11px] font-mono-tabular text-[#78716C] mt-0.5">
                        ({formatVND(tie.price)})
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* MỤC THÊU TÊN CÁ NHÂN HÓA LÊN TÚI NGỰC */}
        <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E5E2DC] space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <label className="block text-xs font-semibold text-[#141413]">
                Thêu Tên Cá Nhân Hóa Lên Túi Ngực (Miễn phí)
              </label>
              <p className="text-[11px] text-[#65615B] mt-0.5">
                Thêu tay chỉ lụa nghệ thuật ngay dưới cơi túi ngực Barchetta
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (renderOpts.zoom > 1.5) {
                  handleResetView();
                } else {
                  handleFocusBreastPocket();
                }
              }}
              className="text-[11px] font-semibold text-[#8C6D46] hover:text-[#141413] underline cursor-pointer flex items-center gap-1 shrink-0"
            >
              <Eye className="w-3 h-3" />
              <span>
                {renderOpts.zoom > 1.5
                  ? 'Thu về toàn bộ áo'
                  : 'Zoom túi ngực 2D'}
              </span>
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              maxLength={12}
              value={config.monogramText}
              onFocus={() => {
                if (currentTargetZoom < 1.35) {
                  handleFocusBreastPocket();
                }
              }}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  monogramText: e.target.value,
                }))
              }
              placeholder="Nhập tên hoặc chữ viết tắt (VD: N.V.A, Minh Quân)..."
              className="w-full px-3.5 py-2.5 pr-16 text-xs border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413] bg-white font-medium"
            />
            {config.monogramText ? (
              <button
                type="button"
                onClick={() =>
                  setConfig((prev) => ({ ...prev, monogramText: '' }))
                }
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#65615B] hover:text-[#141413] px-1.5 py-0.5 rounded bg-[#F1EFEA] cursor-pointer"
              >
                Xóa
              </button>
            ) : (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono-tabular text-[#8C6D46]">
                0/12
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-[#65615B]">Gợi ý mẫu:</span>
            {['N.V.A', 'T.C', 'Hoàng Nam', 'V.An'].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => {
                  setConfig((prev) => ({
                    ...prev,
                    monogramText: sample,
                  }));
                  handleFocusBreastPocket();
                }}
                className={`px-2.5 py-1 text-[11px] rounded border transition-colors cursor-pointer ${
                  config.monogramText === sample
                    ? 'border-[#141413] bg-[#141413] text-white font-semibold'
                    : 'border-[#E2DFD7] bg-white text-[#57534E] hover:border-[#8C6D46]'
                }`}
              >
                {sample}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#EAE7E1]">
            <div>
              <span className="block text-[11px] font-medium text-[#65615B] mb-1.5">
                Kiểu chữ nghệ thuật:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    { id: 'script' as const, label: 'Chữ Ký' },
                    { id: 'imperial' as const, label: 'In Hoa' },
                    { id: 'crest' as const, label: 'Huy Hiệu' },
                  ] as const
                ).map((st) => {
                  const active = (config.monogramStyle ?? 'script') === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() =>
                        setConfig((prev) => ({
                          ...prev,
                          monogramStyle: st.id,
                        }))
                      }
                      className={`py-2 px-1.5 text-[11px] rounded-lg border text-center transition-all cursor-pointer ${
                        active
                          ? 'border-[#141413] bg-[#141413] font-semibold text-white'
                          : 'border-[#E5E2DC] bg-white text-[#65615B] hover:border-[#9E7B4F]'
                      }`}
                    >
                      {st.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="block text-[11px] font-medium text-[#65615B] mb-1.5">
                Màu chỉ thêu:
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {(
                  [
                    {
                      id: 'gold' as const,
                      label: 'Chỉ Vàng 24K',
                      hex: '#D4AF37',
                    },
                    {
                      id: 'silver' as const,
                      label: 'Chỉ Bạc Tuyết',
                      hex: '#CBD5E1',
                    },
                    {
                      id: 'ivory' as const,
                      label: 'Chỉ Trắng Ngà',
                      hex: '#F5EFE6',
                    },
                    {
                      id: 'burgundy' as const,
                      label: 'Chỉ Đỏ Rượu',
                      hex: '#E11D48',
                    },
                  ] as const
                ).map((clr) => {
                  const active = (config.monogramColor ?? 'gold') === clr.id;
                  return (
                    <button
                      key={clr.id}
                      type="button"
                      title={clr.label}
                      onClick={() =>
                        setConfig((prev) => ({
                          ...prev,
                          monogramColor: clr.id,
                        }))
                      }
                      className={`py-2 px-2 rounded-lg border flex items-center justify-center gap-1 text-[10px] transition-all cursor-pointer ${
                        active
                          ? 'border-[#141413] bg-white font-semibold text-[#141413] ring-2 ring-[#141413]/15'
                          : 'border-[#E5E2DC] bg-white text-[#65615B]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/25 shrink-0"
                        style={{ backgroundColor: clr.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#EAE7E1] space-y-2.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-medium text-[#65615B]">
                Căn chỉnh tâm thêu trên lưới (X: {config.monogramOffsetX ?? 0} ·
                Y: {config.monogramOffsetY ?? 0})
              </span>
              {((config.monogramOffsetX ?? 0) !== 0 ||
                (config.monogramOffsetY ?? 0) !== 0) && (
                <button
                  type="button"
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      monogramOffsetX: 0,
                      monogramOffsetY: 0,
                    }))
                  }
                  className="text-[10px] font-semibold text-[#8C6D46] hover:text-[#141413] underline cursor-pointer"
                >
                  Về tâm chuẩn
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-tabular text-[#65615B] shrink-0">
                  Ngang
                </span>
                <input
                  type="range"
                  min={-12}
                  max={12}
                  step={1}
                  value={config.monogramOffsetX ?? 0}
                  onFocus={() => {
                    if (currentTargetZoom < 1.35) {
                      handleFocusBreastPocket();
                    }
                  }}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      monogramOffsetX: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-[#141413] cursor-pointer h-1.5 bg-[#E5E2DC] rounded-lg"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-tabular text-[#65615B] shrink-0">
                  Dọc
                </span>
                <input
                  type="range"
                  min={-6}
                  max={6}
                  step={1}
                  value={config.monogramOffsetY ?? 0}
                  onFocus={() => {
                    if (currentTargetZoom < 1.35) {
                      handleFocusBreastPocket();
                    }
                  }}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      monogramOffsetY: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-[#141413] cursor-pointer h-1.5 bg-[#E5E2DC] rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // TAB KIỂU DÁNG (STYLE): 5 MODEL ÁO VEST + KIỂU CỔ ÁO + KIỂU TÚI HÔNG (KHÔNG ĐÁNH SỐ 1 2 3)
  // ==========================================================================
  return (
    <div className="space-y-5">
      {/* MỤC ĐẦU TIÊN: 5 MODEL ÁO VEST */}
      <div>
        <label className="block text-sm font-semibold text-[#141413] mb-3">
          Kiểu Dáng
        </label>

        <div className="grid grid-cols-3 gap-3">
          {JACKET_STYLE_OPTIONS.map((item) => {
            const active = activeJacketStyleId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectJacketStyle(item)}
                className={`group py-3 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between ${
                  active
                    ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs'
                    : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60'
                }`}
              >
                <JacketStyleLineArtSvg styleId={item.id} active={active} />
                <div
                  className={`mt-2 text-xs leading-snug transition-colors ${
                    active
                      ? 'font-semibold text-[#141413]'
                      : 'text-[#78716C] group-hover:text-[#141413]'
                  }`}
                >
                  {item.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* KIỂU ÁO: VEST 2 MẢNH (BÌNH THƯỜNG) & VEST 3 MẢNH (LOẠI BỎ 2 BÊN TAY ÁO) */}
      <div className="pt-3 border-t border-[#EAE7E1]">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-[#141413]">
            Kiểu Áo
          </label>
          {isMandarin && (
            <span className="text-[11px] text-[#8C6D46] font-medium">
              Áo Cổ Tàu cố định ở Vest 2 mảnh
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {(
            [
              { id: '2_piece' as const, name: 'Vest 2 mảnh' },
              { id: '3_piece' as const, name: 'Vest 3 mảnh' },
            ] as const
          ).map((piece) => {
            const effectivePieceId = isMandarin
              ? '2_piece'
              : config.suitPieceId ?? '2_piece';
            const active = effectivePieceId === piece.id;
            const isLocked3Piece = isMandarin && piece.id === '3_piece';
            return (
              <button
                key={piece.id}
                type="button"
                disabled={isLocked3Piece}
                onClick={() => handleSelectSuitPiece(piece.id, piece.name)}
                className={`group py-3 px-2 rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-between ${
                  isLocked3Piece
                    ? 'border-transparent bg-[#F5F3EE]/60 opacity-45 cursor-not-allowed select-none'
                    : active
                    ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs cursor-pointer'
                    : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60 cursor-pointer'
                }`}
              >
                <SuitPieceLineArtSvg pieceId={piece.id} active={active} />
                <div
                  className={`mt-1.5 text-xs leading-snug transition-colors ${
                    active
                      ? 'font-semibold text-[#141413]'
                      : 'text-[#78716C] group-hover:text-[#141413]'
                  }`}
                >
                  {piece.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* KIỂU CỔ ÁO */}
      <div className="pt-3 border-t border-[#EAE7E1]">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-[#141413]">
            Kiểu Cổ Áo
          </label>
          {isMandarin && (
            <span className="text-[11px] text-[#8C6D46] font-medium">
              Áo Cổ Tàu không sử dụng ve cổ áo
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {lapelOptions.map((lapel) => {
            const active = !isMandarin && config.lapelId === lapel.id;
            return (
              <button
                key={lapel.id}
                type="button"
                disabled={isMandarin}
                onClick={() => handleSelectLapel(lapel)}
                className={`group py-3 px-2 rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-between ${
                  isMandarin
                    ? 'border-transparent bg-[#F5F3EE]/60 opacity-45 cursor-not-allowed select-none'
                    : active
                    ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs cursor-pointer'
                    : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60 cursor-pointer'
                }`}
              >
                <LapelStyleLineArtSvg lapelId={lapel.id} active={active} />
                <div
                  className={`mt-1.5 text-xs leading-snug transition-colors ${
                    active
                      ? 'font-semibold text-[#141413]'
                      : 'text-[#78716C] group-hover:text-[#141413]'
                  }`}
                >
                  {lapel.name}
                </div>
                <div className="font-mono-tabular text-[10px] font-medium text-[#8C6D46] mt-0.5">
                  {lapel.price === 0
                    ? 'Tiêu chuẩn'
                    : `+${formatVND(lapel.price)}`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ĐỘ RỘNG CỔ ÁO (SLIM / STANDARD / WIDE - NGAY DƯỚI MỤC KIỂU CỔ ÁO) */}
      <div className="pt-3 border-t border-[#EAE7E1]">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-[#141413]">
            Độ Rộng Cổ Áo
          </label>
          {isMandarin && (
            <span className="text-[11px] text-[#8C6D46] font-medium">
              Áo Cổ Tàu không sử dụng ve cổ áo
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {(
            [
              { id: 'slim' as const, name: 'Bản nhỏ' },
              { id: 'standard' as const, name: 'Tiêu chuẩn' },
              { id: 'wide' as const, name: 'Bản rộng' },
            ] as const
          ).map((lw) => {
            const active =
              !isMandarin && (config.lapelWidthId ?? 'standard') === lw.id;
            return (
              <button
                key={lw.id}
                type="button"
                disabled={isMandarin}
                onClick={() => handleSelectLapelWidth(lw.id, lw.name)}
                className={`group py-3 px-2 rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-between ${
                  isMandarin
                    ? 'border-transparent bg-[#F5F3EE]/60 opacity-45 cursor-not-allowed select-none'
                    : active
                    ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs cursor-pointer'
                    : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60 cursor-pointer'
                }`}
              >
                <LapelWidthLineArtSvg widthId={lw.id} active={active} />
                <div
                  className={`mt-1.5 text-xs leading-snug transition-colors ${
                    active
                      ? 'font-semibold text-[#141413]'
                      : 'text-[#78716C] group-hover:text-[#141413]'
                  }`}
                >
                  {lw.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* KIỂU TÚI HÔNG (3 LOẠI VẼ MINH HỌA VECTOR NHƯ HÌNH MẪU) */}
      <div className="pt-3 border-t border-[#EAE7E1]">
        <label className="block text-sm font-semibold text-[#141413] mb-3">
          Kiểu Túi Hông
        </label>
        <div className="grid grid-cols-3 gap-3">
          {pocketOptions.map((pocket) => {
            const active = config.pocketId === pocket.id;
            return (
              <button
                key={pocket.id}
                type="button"
                onClick={() => handleSelectPocket(pocket)}
                className={`group py-3 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between ${
                  active
                    ? 'border-[#141413] bg-[#FAF9F6] shadow-2xs'
                    : 'border-transparent hover:border-[#E5E2DC] hover:bg-[#FAF9F6]/60'
                }`}
              >
                <PocketStyleLineArtSvg pocketId={pocket.id} active={active} />
                <div
                  className={`mt-1.5 text-xs leading-snug transition-colors ${
                    active
                      ? 'font-semibold text-[#141413]'
                      : 'text-[#78716C] group-hover:text-[#141413]'
                  }`}
                >
                  {pocket.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

