/**
 * ============================================================================
 * BỘ ENGINE ĐỒ HỌA 2D CANVAS — TAILOR CRAFT
 * Kỹ thuật: 2D Multi-Layering & Hòa trộn màu Multiply (ctx.globalCompositeOperation = 'multiply')
 * Giữ nguyên bóng đổ 3D, nếp nhăn tự nhiên của vải và chi tiết đường may Savile Row
 * ============================================================================
 */

export interface SuitConfigState {
  fabricId: string;
  fabricName: string;
  fabricCode: string;
  fabricOrigin: string;
  colorHex: string;
  fabricPrice: number;
  weavePattern: 'solid' | 'herringbone' | 'pinstripe' | 'glen_check' | 'birdseye';
  jacketStyleId?:
    | 'sb_1_button'
    | 'sb_2_buttons'
    | 'db_4_buttons'
    | 'db_6_buttons'
    | 'mandarin';
  jacketStyleName?: string;
  jacketStylePrice?: number;
  suitPieceId?: '2_piece' | '3_piece';
  suitPieceName?: string;
  lapelId: 'notch' | 'peak';
  lapelName: string;
  lapelPrice: number;
  lapelWidthId?: 'slim' | 'standard' | 'wide';
  lapelWidthName?: string;
  buttonId: 'single' | 'double_two' | 'gold_brass';
  buttonName: string;
  buttonPrice: number;
  customButtonId?:
    | 'default'
    | 'brown'
    | 'dark_grey'
    | 'navy_blue'
    | 'khaki'
    | 'off_white'
    | 'anthrazit'
    | 'shiny_gold_brass'
    | 'gold_brass'
    | 'silver_brass'
    | 'antique_silver_brass';
  pocketId: 'flap' | 'jetted' | 'patched';
  pocketName: string;
  pocketPrice: number;
  necktieId?:
    | 'none'
    | 'kendal'
    | 'verona'
    | 'siros'
    | 'schiza'
    | 'riesi'
    | 'parma'
    | 'lisard'
    | 'lioni'
    | 'liberi'
    | 'lena'
    | 'kera'
    | 'brady'
    | 'burgundy_dot'
    | 'champagne'
    | 'black_solid';
  necktieName?: string;
  necktiePrice?: number;
  monogramText: string;
  monogramColor?: 'gold' | 'silver' | 'ivory' | 'burgundy';
  monogramStyle?: 'script' | 'imperial' | 'crest';
  monogramOffsetX?: number;
  monogramOffsetY?: number;
  // Cấu hình góc nhìn & tùy chỉnh Quần Âu (Trousers 2D)
  garmentView?: 'jacket' | 'trousers';
  trouserStyleId?:
    | 'flat_front'
    | 'pleated'
    | 'high_waisted'
    | 'double_pleat_sartorial'
    | 'gurkha';
  trouserStyleName?: string;
  trouserRiseId?: 'standard_rise' | 'high_waisted';
  trouserRiseName?: string;
  trouserFitId?: 'slim' | 'regular' | 'relaxed';
  trouserFitName?: string;
  trouserPleatId?: 'flat_front' | 'single_pleat' | 'double_pleat';
  trouserPleatName?: string;
  trouserWaistbandId?: 'standard' | 'extended_tab' | 'clean' | 'gurkha';
  trouserWaistbandName?: string;
  trouserPocketId?: 'slanted' | 'vertical' | 'frogmouth';
  trouserPocketName?: string;
  trouserCuffId?: 'no_cuff' | 'cuffed';
  trouserCuffName?: string;
}

function getEffectiveJacketStyle(
  config: SuitConfigState
): NonNullable<SuitConfigState['jacketStyleId']> {
  if (config.jacketStyleId) return config.jacketStyleId;
  return config.buttonId === 'single' ? 'sb_1_button' : 'sb_2_buttons';
}

export interface RenderOptions {
  zoom: number;
  panX: number;
  panY: number;
  renderMode: 'composite' | 'grayscale_shadow' | 'color_mask';
}

/**
 * Hàm vẽ hình bóng (Silhouette Path) của thân áo Suit Bespoke
 * Hỗ trợ chế độ có tay áo (Vest 2 mảnh) và loại bỏ 2 bên tay áo (Vest 3 mảnh)
 */
function traceJacketSilhouette(
  ctx: CanvasRenderingContext2D,
  sleeveless = false
) {
  ctx.beginPath();
  // Điểm bắt đầu: Cổ sau gáy
  ctx.moveTo(210, 92);
  ctx.quadraticCurveTo(250, 84, 290, 92);

  if (sleeveless) {
    // Cầu vai phải thu gọn & vòng khoét nách phải (loại bỏ tay áo bên phải)
    ctx.lineTo(364, 118);
    ctx.bezierCurveTo(348, 156, 346, 196, 360, 232);
  } else {
    // Cầu vai phải (người mặc bên trái)
    ctx.lineTo(378, 122);
    // Đỉnh vai & cánh tay ngoài bên phải
    ctx.quadraticCurveTo(408, 135, 418, 185);
    ctx.bezierCurveTo(428, 265, 434, 365, 424, 488);
    // Cổ tay áo phải
    ctx.lineTo(380, 494);
    // Cánh tay trong bên phải đi lên nách
    ctx.bezierCurveTo(376, 395, 372, 310, 360, 232);
  }

  // Eo áo bên phải (thắt eo Bespoke chuẩn mực)
  ctx.bezierCurveTo(346, 305, 342, 355, 356, 525);
  // Vạt áo dưới bên phải (bo tròn kiểu English Cut)
  ctx.quadraticCurveTo(354, 562, 292, 566);
  // Điểm giao vạt giữa dưới
  ctx.quadraticCurveTo(256, 564, 250, 520);
  // Vạt áo dưới bên trái
  ctx.quadraticCurveTo(244, 564, 208, 566);
  ctx.quadraticCurveTo(146, 562, 144, 525);
  // Eo áo bên trái đi lên nách trái
  ctx.bezierCurveTo(158, 355, 154, 305, 140, 232);

  if (sleeveless) {
    // Vòng khoét nách trái & cầu vai trái (loại bỏ tay áo bên trái)
    ctx.bezierCurveTo(154, 196, 152, 156, 136, 118);
  } else {
    // Cánh tay trong bên trái đi xuống cổ tay
    ctx.bezierCurveTo(128, 310, 124, 395, 120, 494);
    // Cổ tay áo trái
    ctx.lineTo(76, 488);
    // Cánh tay ngoài bên trái đi lên đỉnh vai
    ctx.bezierCurveTo(66, 365, 72, 265, 82, 185);
    ctx.quadraticCurveTo(92, 135, 122, 122);
  }

  // Cầu vai trái về lại cổ
  ctx.lineTo(210, 92);
  ctx.closePath();
}

const weavePatternCache = new Map<string, CanvasPattern>();
const grayscaleShadowCache = new Map<string, HTMLCanvasElement>();
const backdropOffscreenCache = new Map<string, HTMLCanvasElement>();
const fabricTextureLayerCache = new Map<string, HTMLCanvasElement>();
let cachedCompositeGarmentBuffer: {
  key: string;
  canvas: HTMLCanvasElement;
} | null = null;

/**
 * Tạo Offscreen Canvas cho các layer vải, texture và trang phục
 * Giúp tách biệt quá trình kết xuất phức tạp khỏi luồng chính khi người dùng Zoom / Pan
 */
function createOffscreenBuffer(width: number, height: number): HTMLCanvasElement {
  const offscreen = document.createElement('canvas');
  offscreen.width = width;
  offscreen.height = height;
  return offscreen;
}

/**
 * Tạo lớp Phông nền Studio & Lưới tỷ lệ cắt may trên Offscreen Canvas
 */
function getStudioBackdropOffscreenLayer(
  W: number,
  H: number
): HTMLCanvasElement {
  const cacheKey = `${W}x${H}`;
  const cached = backdropOffscreenCache.get(cacheKey);
  if (cached) return cached;

  const offCanvas = createOffscreenBuffer(W, H);
  const ctx = offCanvas.getContext('2d')!;

  const bgGrad = ctx.createRadialGradient(
    W / 2,
    H * 0.42,
    40,
    W / 2,
    H * 0.45,
    390
  );
  bgGrad.addColorStop(0, '#FDFCFB');
  bgGrad.addColorStop(0.65, '#F3F1EC');
  bgGrad.addColorStop(1, '#E5E1D8');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.strokeStyle = 'rgba(20, 20, 19, 0.035)';
  ctx.lineWidth = 1;
  for (let x = 50; x < W; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 50; y < H; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  ctx.restore();

  backdropOffscreenCache.set(cacheKey, offCanvas);
  return offCanvas;
}

/**
 * Tạo họa tiết dệt vải (Weave Pattern) trên Offscreen Canvas (có lưu đệm Cache)
 */
function createWeavePattern(
  weavePattern: SuitConfigState['weavePattern'],
  colorHex: string
): CanvasPattern | null {
  const cacheKey = `${weavePattern}__${colorHex}`;
  const existing = weavePatternCache.get(cacheKey);
  if (existing) return existing;

  const patternCanvas = document.createElement('canvas');
  patternCanvas.width = 16;
  patternCanvas.height = 16;
  const pCtx = patternCanvas.getContext('2d');
  if (!pCtx) return null;

  // Lớp màu nền chính của vải
  pCtx.fillStyle = colorHex;
  pCtx.fillRect(0, 0, 16, 16);

  if (weavePattern === 'solid') {
    // Vân vải Wool Super 130s mịn tự nhiên
    pCtx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
    pCtx.lineWidth = 1;
    for (let i = -16; i < 32; i += 3) {
      pCtx.beginPath();
      pCtx.moveTo(i, 0);
      pCtx.lineTo(i + 16, 16);
      pCtx.stroke();
    }
  } else if (weavePattern === 'herringbone') {
    // Vân xương cá cổ điển (Herringbone)
    pCtx.strokeStyle = 'rgba(255, 255, 255, 0.075)';
    pCtx.lineWidth = 1.2;
    pCtx.beginPath();
    pCtx.moveTo(0, 8);
    pCtx.lineTo(8, 0);
    pCtx.lineTo(16, 8);
    pCtx.moveTo(0, 16);
    pCtx.lineTo(8, 8);
    pCtx.lineTo(16, 16);
    pCtx.stroke();

    pCtx.strokeStyle = 'rgba(0, 0, 0, 0.14)';
    pCtx.beginPath();
    pCtx.moveTo(0, 4);
    pCtx.lineTo(8, 12);
    pCtx.lineTo(16, 4);
    pCtx.stroke();
  } else if (weavePattern === 'pinstripe') {
    // Kẻ sọc mảnh Pinstripe Savile Row
    pCtx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
    pCtx.lineWidth = 1;
    pCtx.setLineDash([2, 2]);
    pCtx.beginPath();
    pCtx.moveTo(8, 0);
    pCtx.lineTo(8, 16);
    pCtx.stroke();
  } else if (weavePattern === 'glen_check') {
    // Kẻ ô Hoàng gia Prince of Wales (Glen Check / Windowpane) chuẩn Hockerty
    pCtx.strokeStyle = 'rgba(255, 255, 255, 0.13)';
    pCtx.lineWidth = 1;
    pCtx.beginPath();
    // Các đường sọc đan chéo tạo ô vuông Glen Check
    pCtx.moveTo(0, 4);
    pCtx.lineTo(16, 4);
    pCtx.moveTo(0, 12);
    pCtx.lineTo(16, 12);
    pCtx.moveTo(4, 0);
    pCtx.lineTo(4, 16);
    pCtx.moveTo(12, 0);
    pCtx.lineTo(12, 16);
    pCtx.stroke();

    // Đường kẻ ô mảnh nhấn (Accent Overcheck)
    pCtx.strokeStyle = 'rgba(212, 175, 55, 0.18)';
    pCtx.lineWidth = 0.8;
    pCtx.beginPath();
    pCtx.moveTo(0, 8);
    pCtx.lineTo(16, 8);
    pCtx.moveTo(8, 0);
    pCtx.lineTo(8, 16);
    pCtx.stroke();
  } else if (weavePattern === 'birdseye') {
    // Dệt hạt Mắt Chim / Sợi Linen thoáng khí (Birdseye & Linen Texture)
    pCtx.fillStyle = 'rgba(255, 255, 255, 0.09)';
    for (let x = 2; x < 16; x += 4) {
      for (let y = 2; y < 16; y += 4) {
        pCtx.fillRect(x, y, 1.5, 1.5);
      }
    }
    pCtx.fillStyle = 'rgba(0, 0, 0, 0.14)';
    for (let x = 0; x < 16; x += 4) {
      for (let y = 0; y < 16; y += 4) {
        pCtx.fillRect(x, y, 1.2, 1.2);
      }
    }
  }

  const created = pCtx.createPattern(patternCanvas, 'repeat');
  if (created) {
    weavePatternCache.set(cacheKey, created);
  }
  return created;
}

/**
 * Tạo lớp Bản Đồ Ánh Sáng & Nếp Nhăn 3D (Grayscale Shadow Map)
 * Lớp này sẽ được trộn với lớp Màu Vải thông qua globalCompositeOperation = 'multiply'
 */
function buildGrayscaleShadingLayer(
  width: number,
  height: number,
  sleeveless = false
): HTMLCanvasElement {
  const cacheKey = `${width}x${height}__${sleeveless ? 'sleeveless' : 'sleeved'}`;
  const cached = grayscaleShadowCache.get(cacheKey);
  if (cached) return cached;

  const offCanvas = document.createElement('canvas');
  offCanvas.width = width;
  offCanvas.height = height;
  const ctx = offCanvas.getContext('2d')!;

  // Nền trắng trung tính (khi multiply với trắng #FFFFFF thì màu gốc giữ nguyên 100%)
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  traceJacketSilhouette(ctx, sleeveless);
  ctx.clip();

  // 1. Khối sáng 3D tổng thể trên thân áo (Cylindrical Torso Lighting)
  const torsoGrad = ctx.createLinearGradient(75, 200, 425, 200);
  torsoGrad.addColorStop(0, '#8A8A8A');     // Bóng tối rìa tay áo trái
  torsoGrad.addColorStop(0.18, '#E6E6E6');  // Ánh sáng chiếu vào ngực trái
  torsoGrad.addColorStop(0.45, '#FAFAFA');  // Vùng sáng trung tâm ngực
  torsoGrad.addColorStop(0.55, '#DCDCDC');  // Khe giao vạt áo
  torsoGrad.addColorStop(0.82, '#EBEBEB');  // Ngực phải
  torsoGrad.addColorStop(1, '#7D7D7D');     // Bóng tối rìa tay áo phải
  ctx.fillStyle = torsoGrad;
  ctx.fillRect(60, 80, 380, 500);

  // 2. Bóng đổ dọc theo chiều dài áo (Vertical Falloff)
  const vertGrad = ctx.createLinearGradient(250, 85, 250, 570);
  vertGrad.addColorStop(0, 'rgba(255,255,255,0.15)');
  vertGrad.addColorStop(0.35, 'rgba(240,240,240,0.05)');
  vertGrad.addColorStop(0.75, 'rgba(180,180,180,0.22)');
  vertGrad.addColorStop(1, 'rgba(110,110,110,0.45)');
  ctx.fillStyle = vertGrad;
  ctx.fillRect(60, 80, 380, 500);

  // 3. Bóng hốc nách & đường ráp tay áo (Armhole & Sleeve Crease Shadows)
  const drawSoftShadowCurve = (
    x1: number,
    y1: number,
    cx: number,
    cy: number,
    x2: number,
    y2: number,
    lineWidth: number,
    opacity: number
  ) => {
    ctx.save();
    ctx.strokeStyle = `rgba(40, 40, 45, ${opacity})`;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.filter = 'blur(5px)';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cx, cy, x2, y2);
    ctx.stroke();
    ctx.restore();
  };

  // Đường ráp cầu vai - nách trái & phải
  drawSoftShadowCurve(125, 126, 148, 185, 140, 238, 10, 0.42);
  drawSoftShadowCurve(375, 126, 352, 185, 360, 238, 10, 0.42);

  if (!sleeveless) {
    // Nếp nhăn tự nhiên ở khuỷu tay áo (Sleeve Drape Folds)
    drawSoftShadowCurve(95, 260, 118, 305, 102, 360, 12, 0.25);
    drawSoftShadowCurve(88, 340, 114, 380, 96, 440, 9, 0.20);
    drawSoftShadowCurve(405, 260, 382, 305, 398, 360, 12, 0.25);
    drawSoftShadowCurve(412, 340, 386, 380, 404, 440, 9, 0.20);
  }

  // Bóng thắt eo (Waist Suppression Sculpting)
  drawSoftShadowCurve(155, 250, 175, 335, 162, 430, 18, 0.22);
  drawSoftShadowCurve(345, 250, 325, 335, 338, 430, 18, 0.22);

  // Bóng dưới ve áo (Lapel Roll 3D Shadow)
  drawSoftShadowCurve(198, 105, 182, 225, 250, 340, 14, 0.38);
  drawSoftShadowCurve(302, 105, 318, 225, 250, 340, 14, 0.38);

  // Bóng vạt áo đè lên nhau ở trung tâm
  drawSoftShadowCurve(250, 325, 246, 435, 248, 535, 8, 0.35);

  ctx.restore();
  grayscaleShadowCache.set(cacheKey, offCanvas);
  return offCanvas;
}

function getShadedSuitBodyBuffer(
  W: number,
  H: number,
  config: SuitConfigState,
  renderMode: RenderOptions['renderMode']
): HTMLCanvasElement {
  const sleeveless =
    config.suitPieceId === '3_piece' &&
    getEffectiveJacketStyle(config) !== 'mandarin';
  const key = `${W}x${H}__${config.colorHex}__${config.weavePattern}__${sleeveless ? '3p' : '2p'}__${renderMode}`;
  const cached = fabricTextureLayerCache.get(key);
  if (cached) {
    return cached;
  }

  const suitBuffer = createOffscreenBuffer(W, H);
  const sCtx = suitBuffer.getContext('2d')!;
  sCtx.clearRect(0, 0, W, H);

  sCtx.save();
  traceJacketSilhouette(sCtx, sleeveless);
  sCtx.clip();

  if (renderMode === 'grayscale_shadow') {
    const shadowMap = buildGrayscaleShadingLayer(W, H, sleeveless);
    sCtx.drawImage(shadowMap, 0, 0);
  } else if (renderMode === 'color_mask') {
    const pattern = createWeavePattern(config.weavePattern, config.colorHex);
    sCtx.fillStyle = pattern || config.colorHex;
    sCtx.fillRect(0, 0, W, H);
  } else {
    const pattern = createWeavePattern(config.weavePattern, config.colorHex);
    sCtx.fillStyle = pattern || config.colorHex;
    sCtx.fillRect(0, 0, W, H);

    const shadowMap = buildGrayscaleShadingLayer(W, H, sleeveless);
    sCtx.globalCompositeOperation = 'multiply';
    sCtx.drawImage(shadowMap, 0, 0);

    sCtx.globalCompositeOperation = 'screen';
    const sheenGrad = sCtx.createLinearGradient(110, 110, 380, 480);
    sheenGrad.addColorStop(0, 'rgba(255, 255, 255, 0.14)');
    sheenGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.05)');
    sheenGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.12)');
    sheenGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.02)');
    sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0.09)');
    sCtx.fillStyle = sheenGrad;
    sCtx.fillRect(0, 0, W, H);

    sCtx.globalCompositeOperation = 'source-over';
  }

  sCtx.restore();

  // Giới hạn dung lượng bộ nhớ đệm Offscreen (tối đa 16 mẫu vải gần nhất)
  if (fabricTextureLayerCache.size >= 16) {
    const oldestKey = fabricTextureLayerCache.keys().next().value;
    if (oldestKey) {
      fabricTextureLayerCache.delete(oldestKey);
    }
  }
  fabricTextureLayerCache.set(key, suitBuffer);
  return suitBuffer;
}

/**
 * Tạo Offscreen Buffer tổng hợp toàn bộ các layer Trang phục + Vải + Texture ở độ phân giải 2x
 * Khi người dùng thao tác Zoom / Pan, Main Thread chỉ cần blit ảnh từ Offscreen Buffer này
 * mà không phải tính toán lại đường cong Bezier, Gradient hay phép trộn Multiply.
 */
function getCompositeGarmentOffscreenLayer(
  W: number,
  H: number,
  config: SuitConfigState,
  renderMode: RenderOptions['renderMode']
): HTMLCanvasElement {
  const supersampleScale = 2;
  const targetW = W * supersampleScale;
  const targetH = H * supersampleScale;

  const key = [
    `${targetW}x${targetH}`,
    config.garmentView ?? 'jacket',
    config.fabricId,
    config.colorHex,
    config.weavePattern,
    getEffectiveJacketStyle(config),
    config.suitPieceId ?? '2_piece',
    config.lapelId,
    config.lapelWidthId ?? 'standard',
    config.buttonId,
    config.customButtonId ?? 'default',
    config.pocketId,
    config.necktieId ?? 'none',
    config.trouserStyleId ?? 'flat_front',
    config.trouserRiseId ?? 'standard_rise',
    config.trouserFitId ?? 'regular',
    config.trouserPleatId ?? 'flat_front',
    config.trouserWaistbandId ?? 'standard',
    config.trouserPocketId ?? 'slanted',
    config.trouserCuffId ?? 'no_cuff',
    config.monogramText.trim(),
    config.monogramColor ?? 'gold',
    config.monogramStyle ?? 'script',
    config.monogramOffsetX ?? 0,
    config.monogramOffsetY ?? 0,
    renderMode,
  ].join('__');

  if (
    cachedCompositeGarmentBuffer &&
    cachedCompositeGarmentBuffer.key === key
  ) {
    return cachedCompositeGarmentBuffer.canvas;
  }

  const garmentCanvas = cachedCompositeGarmentBuffer
    ? cachedCompositeGarmentBuffer.canvas
    : createOffscreenBuffer(targetW, targetH);

  if (garmentCanvas.width !== targetW) garmentCanvas.width = targetW;
  if (garmentCanvas.height !== targetH) garmentCanvas.height = targetH;

  const gCtx = garmentCanvas.getContext('2d')!;
  gCtx.clearRect(0, 0, targetW, targetH);

  gCtx.save();
  gCtx.scale(supersampleScale, supersampleScale);

  // Bóng đổ dưới chân Mannequin
  gCtx.save();
  const floorShadow = gCtx.createRadialGradient(250, 598, 10, 250, 598, 130);
  floorShadow.addColorStop(0, 'rgba(20, 20, 19, 0.22)');
  floorShadow.addColorStop(1, 'rgba(20, 20, 19, 0)');
  gCtx.fillStyle = floorShadow;
  gCtx.beginPath();
  gCtx.ellipse(250, 598, 125, 16, 0, 0, Math.PI * 2);
  gCtx.fill();
  gCtx.restore();

  if (config.garmentView === 'trousers') {
    drawBespokeTrousers2D(gCtx, W, H, config, renderMode);
    gCtx.restore();
    cachedCompositeGarmentBuffer = { key, canvas: garmentCanvas };
    return garmentCanvas;
  }

  // 0. Vẽ Trụ Mannequin Gỗ Óc Chó & Cổ Áo Sơ Mi + Cà Vạt Lụa Bên Trong
  drawMannequinAndShirt(
    gCtx,
    config.suitPieceId === '3_piece' &&
      getEffectiveJacketStyle(config) !== 'mandarin'
  );

  // 1. Vẽ Layer Vải & Texture đã hòa trộn Multiply trên Offscreen Canvas
  const suitBuffer = getShadedSuitBodyBuffer(W, H, config, renderMode);
  gCtx.drawImage(suitBuffer, 0, 0);

  // 2. Vẽ vùng cổ chữ V (V-Neck Shirt & Tie Opening)
  drawShirtOpeningOverlay(gCtx, config);

  // 3. Vẽ các chi tiết cấu trúc: Cổ áo, Túi ngực, Túi hông, Cúc áo, Đường chỉ đột & Monogram
  drawLapels(gCtx, config);
  drawBreastPocket(gCtx, config);
  drawHipPockets(gCtx, config);
  drawSuitButtons(gCtx, config);
  drawTailoringSeams(gCtx, config);

  if (config.monogramText.trim()) {
    drawArtisticBreastPocketMonogram(gCtx, config);
  }

  gCtx.restore();

  cachedCompositeGarmentBuffer = { key, canvas: garmentCanvas };
  return garmentCanvas;
}

export interface OffscreenSuitLayerBundle {
  key: string;
  backdropBuffer: HTMLCanvasElement;
  fabricBaseBuffer: HTMLCanvasElement;
  weaveTextureBuffer: HTMLCanvasElement;
  shadedFabricTextureBuffer: HTMLCanvasElement;
  compositeGarmentBuffer: HTMLCanvasElement;
}

/**
 * Hàm khởi tạo & cập nhật các Offscreen Layer riêng biệt cho Vải (Fabric Layer) và Họa tiết dệt (Texture Layer)
 * Giúp ConfiguratorPage tách biệt hoàn toàn việc dựng họa tiết/ánh sáng khỏi thao tác Zoom/Pan trên Main Thread
 */
export function buildOffscreenFabricAndTextureLayers(
  config: SuitConfigState,
  width = 500,
  height = 650,
  renderMode: RenderOptions['renderMode'] = 'composite'
): OffscreenSuitLayerBundle {
  const backdropBuffer = getStudioBackdropOffscreenLayer(width, height);

  const sleeveless =
    config.suitPieceId === '3_piece' &&
    getEffectiveJacketStyle(config) !== 'mandarin';

  // Layer 1: Lớp nền vải gốc (Base Fabric Color Layer) trên Offscreen Canvas
  const fabricBaseBuffer = createOffscreenBuffer(width, height);
  const fCtx = fabricBaseBuffer.getContext('2d');
  if (fCtx) {
    fCtx.save();
    traceJacketSilhouette(fCtx, sleeveless);
    fCtx.clip();
    fCtx.fillStyle = config.colorHex;
    fCtx.fillRect(0, 0, width, height);
    fCtx.restore();
  }

  // Layer 2: Lớp họa tiết dệt (Weave Texture Pattern Layer) trên Offscreen Canvas
  const weaveTextureBuffer = createOffscreenBuffer(width, height);
  const tCtx = weaveTextureBuffer.getContext('2d');
  if (tCtx) {
    tCtx.save();
    traceJacketSilhouette(tCtx, sleeveless);
    tCtx.clip();
    const pattern = createWeavePattern(config.weavePattern, config.colorHex);
    tCtx.fillStyle = pattern || config.colorHex;
    tCtx.fillRect(0, 0, width, height);
    tCtx.restore();
  }

  // Layer 3: Lớp Vải + Texture đã hòa trộn bóng đổ 3D Multiply (Shaded Fabric & Texture Layer)
  const shadedFabricTextureBuffer = getShadedSuitBodyBuffer(
    width,
    height,
    config,
    renderMode
  );

  // Layer 4: Lớp Trang phục tổng hợp độ phân giải cao 2x phục vụ Blit tức thì khi Zoom/Pan
  const compositeGarmentBuffer = getCompositeGarmentOffscreenLayer(
    width,
    height,
    config,
    renderMode
  );

  const key = `${width}x${height}__${config.garmentView ?? 'jacket'}__${config.fabricId}__${config.colorHex}__${config.weavePattern}__${getEffectiveJacketStyle(config)}__${config.suitPieceId ?? '2_piece'}__${config.lapelId}__${config.lapelWidthId ?? 'standard'}__${config.buttonId}__${config.customButtonId ?? 'default'}__${config.pocketId}__${config.necktieId ?? 'none'}__${config.trouserStyleId ?? 'flat_front'}__${config.trouserRiseId ?? 'standard_rise'}__${config.trouserFitId ?? 'regular'}__${config.trouserPleatId ?? 'flat_front'}__${config.trouserWaistbandId ?? 'standard'}__${config.trouserPocketId ?? 'slanted'}__${config.trouserCuffId ?? 'no_cuff'}__${config.monogramText.trim()}__${renderMode}`;

  return {
    key,
    backdropBuffer,
    fabricBaseBuffer,
    weaveTextureBuffer,
    shadedFabricTextureBuffer,
    compositeGarmentBuffer,
  };
}

/**
 * Hàm khởi tạo trước (Pre-warm) các Offscreen Layer cho Vải, Texture và Trang phục
 * Được gọi từ ConfiguratorPage để chuẩn bị sẵn dữ liệu đồ họa ngoài luồng tương tác Zoom/Pan
 */
export function prewarmOffscreenSuitLayers(
  config: SuitConfigState,
  width = 500,
  height = 650,
  renderMode: RenderOptions['renderMode'] = 'composite'
): {
  backdropBuffer: HTMLCanvasElement;
  fabricTextureBuffer: HTMLCanvasElement;
  compositeGarmentBuffer: HTMLCanvasElement;
} {
  const bundle = buildOffscreenFabricAndTextureLayers(
    config,
    width,
    height,
    renderMode
  );
  return {
    backdropBuffer: bundle.backdropBuffer,
    fabricTextureBuffer: bundle.shadedFabricTextureBuffer,
    compositeGarmentBuffer: bundle.compositeGarmentBuffer,
  };
}

/**
 * Hàm chính vẽ toàn bộ Mô phỏng Áo Suit 2D lên Canvas
 * Sử dụng kỹ thuật Offscreen Rendering để việc Zoom/Pan chỉ tốn 1 lệnh blit ảnh tốc độ cao
 */
export function renderSuitCanvas(
  canvas: HTMLCanvasElement,
  config: SuitConfigState,
  options: RenderOptions
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const W = canvas.width;
  const H = canvas.height;

  ctx.clearRect(0, 0, W, H);

  // 1. Blit lớp Phông nền Studio & Lưới cắt may từ Offscreen Buffer
  const backdropLayer = getStudioBackdropOffscreenLayer(W, H);
  ctx.drawImage(backdropLayer, 0, 0, W, H);

  // 2. Áp dụng ma trận biến đổi Phóng to / Thu nhỏ & Di chuyển (Zoom & Pan)
  ctx.save();
  ctx.translate(W / 2 + options.panX, H / 2 + options.panY);
  ctx.scale(options.zoom, options.zoom);
  ctx.translate(-W / 2, -H / 2);

  // 3. Blit toàn bộ Layer Vải, Texture & Trang phục đã render sẵn từ Offscreen Buffer 2x
  const compositeGarmentLayer = getCompositeGarmentOffscreenLayer(
    W,
    H,
    config,
    options.renderMode
  );
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(compositeGarmentLayer, 0, 0, W, H);

  // 4. Lớp phủ lưới căn chỉnh (Translucent Alignment Grid Overlay) khi người dùng ở chế độ Phóng To (Zoom > 1.05x) trên Áo Vest
  if (options.zoom > 1.05 && config.garmentView !== 'trousers') {
    drawZoomMonogramAlignmentGrid(ctx, W, H, config, options);
  }

  ctx.restore();
}

/**
 * Hàm vẽ Cận Cảnh Túi Ngực & Chữ Thêu Monogram (Live Close-Up Loupe Preview trên Canvas phụ)
 */
export function renderBreastPocketMonogramCloseUp(
  canvas: HTMLCanvasElement,
  config: SuitConfigState
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const cw = canvas.width;
  const ch = canvas.height;
  ctx.clearRect(0, 0, cw, ch);

  // Phông nền Studio tối giản
  const bgGrad = ctx.createRadialGradient(cw / 2, ch / 2, 10, cw / 2, ch / 2, cw * 0.7);
  bgGrad.addColorStop(0, '#FDFCFB');
  bgGrad.addColorStop(1, '#E6E2D8');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, cw, ch);

  // Dịch tâm khung hình cận cảnh vào đúng vị trí Túi Ngực Áo (x=308, y=236 trên hệ tọa độ 500x650)
  const zoom = 2.45;
  const focusX = 308;
  const focusY = 236;

  ctx.save();
  ctx.translate(cw / 2, ch / 2);
  ctx.scale(zoom, zoom);
  ctx.translate(-focusX, -focusY);

  const suitBuffer = getShadedSuitBodyBuffer(500, 650, config, 'composite');
  ctx.drawImage(suitBuffer, 0, 0);
  drawShirtOpeningOverlay(ctx, config);
  drawLapels(ctx, config);
  drawBreastPocket(ctx, config);
  drawSuitButtons(ctx, config);
  drawTailoringSeams(ctx, config);

  if (config.monogramText.trim()) {
    drawArtisticBreastPocketMonogram(ctx, config);
  }

  ctx.restore();
}

/**
 * Vẽ cổ trụ Mannequin & phần cổ sơ mi trên cùng
 */
function drawMannequinAndShirt(
  ctx: CanvasRenderingContext2D,
  sleeveless = false
) {
  ctx.save();
  // Trụ cổ gỗ óc chó của Mannequin
  const neckGrad = ctx.createLinearGradient(222, 48, 278, 48);
  neckGrad.addColorStop(0, '#3D271D');
  neckGrad.addColorStop(0.5, '#6B4635');
  neckGrad.addColorStop(1, '#2D1B13');
  ctx.fillStyle = neckGrad;
  ctx.beginPath();
  ctx.roundRect(224, 52, 52, 45, 8);
  ctx.fill();

  // Chóp kim loại đồng thau trên đỉnh Mannequin
  const brassGrad = ctx.createLinearGradient(238, 35, 262, 55);
  brassGrad.addColorStop(0, '#B38728');
  brassGrad.addColorStop(0.5, '#FBF5B7');
  brassGrad.addColorStop(1, '#8A6421');
  ctx.fillStyle = brassGrad;
  ctx.beginPath();
  ctx.roundRect(240, 38, 20, 14, 4);
  ctx.fill();

  // Chân đế kim loại dưới gấu áo
  ctx.fillStyle = '#2A2927';
  ctx.fillRect(245, 555, 10, 44);

  if (!sleeveless) {
    // Tay áo sơ mi trắng lộ ra ở cổ tay (1.2cm chuẩn quy tắc Bespoke)
    ctx.fillStyle = '#F7F6F2';
    ctx.strokeStyle = '#D4D0C8';
    ctx.lineWidth = 1;
    // Cổ tay trái
    ctx.beginPath();
    ctx.roundRect(78, 486, 40, 16, 2);
    ctx.fill();
    ctx.stroke();
    // Cổ tay phải
    ctx.beginPath();
    ctx.roundRect(382, 486, 40, 16, 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

/**
 * Vẽ vùng chữ V của áo sơ mi trắng Poplin và cà vạt lụa Jacquard
 */
function drawShirtOpeningOverlay(
  ctx: CanvasRenderingContext2D,
  config: SuitConfigState
) {
  const jacketStyle = getEffectiveJacketStyle(config);

  // Nếu là kiểu Mandarin (Cổ Tàu đứng cài kín ngực), chỉ lộ nhẹ viền cổ áo trắng bên trong cổ Tàu
  if (jacketStyle === 'mandarin') {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(212, 86);
    ctx.quadraticCurveTo(250, 96, 288, 86);
    ctx.lineTo(286, 98);
    ctx.quadraticCurveTo(250, 108, 214, 98);
    ctx.closePath();
    ctx.fillStyle = '#F7F5F0';
    ctx.fill();
    ctx.restore();
    return;
  }

  const vBottomY =
    jacketStyle === 'sb_1_button'
      ? 340
      : jacketStyle === 'db_4_buttons' || jacketStyle === 'db_6_buttons'
      ? 284
      : 315;

  ctx.save();
  // Vùng mở chữ V từ cổ xuống nút cài đầu tiên
  ctx.beginPath();
  ctx.moveTo(208, 92);
  ctx.lineTo(250, vBottomY);
  ctx.lineTo(292, 92);
  ctx.quadraticCurveTo(250, 84, 208, 92);
  ctx.closePath();
  ctx.clip();

  // Nền áo sơ mi trắng ngà
  const shirtGrad = ctx.createLinearGradient(208, 90, 292, 260);
  shirtGrad.addColorStop(0, '#EAE7E1');
  shirtGrad.addColorStop(0.5, '#FFFFFF');
  shirtGrad.addColorStop(1, '#DFDCD4');
  ctx.fillStyle = shirtGrad;
  ctx.fillRect(200, 80, 100, 270);

  // Cổ áo sơ mi Spread Collar
  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#D0CCC2';
  ctx.lineWidth = 1.2;
  // Lá cổ trái
  ctx.beginPath();
  ctx.moveTo(212, 88);
  ctx.lineTo(246, 114);
  ctx.lineTo(222, 146);
  ctx.lineTo(206, 106);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Lá cổ phải
  ctx.beginPath();
  ctx.moveTo(288, 88);
  ctx.lineTo(254, 114);
  ctx.lineTo(278, 146);
  ctx.lineTo(294, 106);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Cà vạt lụa (Silk Tie) hoặc hàng cúc áo sơ mi nếu chọn "Không dùng" cà vạt
  const activeTieId = config.necktieId ?? 'none';
  if (activeTieId === 'none') {
    // Vẽ đường nẹp áo sơ mi trắng & hàng cúc ngọc trai tinh tế
    ctx.strokeStyle = '#DCD8CF';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(243, 114);
    ctx.lineTo(243, vBottomY);
    ctx.moveTo(257, 114);
    ctx.lineTo(257, vBottomY);
    ctx.stroke();

    for (let by = 132; by < vBottomY - 10; by += 36) {
      ctx.fillStyle = '#F5F2EB';
      ctx.strokeStyle = '#C6C1B5';
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.arc(250, by, 2.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  const tiePalettes: Record<
    string,
    {
      c0: string;
      c1: string;
      c2: string;
      pattern: 'solid' | 'dots' | 'grid' | 'diamond' | 'stripes';
      accent: string;
      accent2?: string;
    }
  > = {
    kendal: {
      c0: '#785F32',
      c1: '#56421F',
      c2: '#362911',
      pattern: 'dots',
      accent: '#EAD59B',
    },
    verona: {
      c0: '#314B6E',
      c1: '#20334F',
      c2: '#121E30',
      pattern: 'grid',
      accent: '#8CB2DB',
    },
    siros: {
      c0: '#263859',
      c1: '#18243D',
      c2: '#0E1626',
      pattern: 'solid',
      accent: '#3B5280',
    },
    schiza: {
      c0: '#DE3B36',
      c1: '#BA2522',
      c2: '#821412',
      pattern: 'solid',
      accent: '#F26B66',
    },
    riesi: {
      c0: '#2E384D',
      c1: '#1F2636',
      c2: '#131824',
      pattern: 'diamond',
      accent: '#E0A387',
      accent2: '#9CB8D9',
    },
    parma: {
      c0: '#D63430',
      c1: '#B0221E',
      c2: '#7A1311',
      pattern: 'dots',
      accent: '#D4E6FA',
    },
    lisard: {
      c0: '#253652',
      c1: '#182438',
      c2: '#0E1624',
      pattern: 'stripes',
      accent: '#E8F0F8',
      accent2: '#6390C2',
    },
    lioni: {
      c0: '#85202E',
      c1: '#5E131E',
      c2: '#3B0A11',
      pattern: 'stripes',
      accent: '#F0C2C8',
      accent2: '#BD5364',
    },
    liberi: {
      c0: '#789FCE',
      c1: '#5A82B2',
      c2: '#3E628E',
      pattern: 'dots',
      accent: '#F2F7FC',
    },
    lena: {
      c0: '#28384F',
      c1: '#1B2738',
      c2: '#101824',
      pattern: 'dots',
      accent: '#A8C4E3',
    },
    kera: {
      c0: '#505459',
      c1: '#36393D',
      c2: '#202225',
      pattern: 'solid',
      accent: '#6E737A',
    },
    brady: {
      c0: '#2B2B2B',
      c1: '#181818',
      c2: '#0A0A0A',
      pattern: 'dots',
      accent: '#D4D4D4',
    },
    burgundy_dot: {
      c0: '#732832',
      c1: '#521820',
      c2: '#330D12',
      pattern: 'dots',
      accent: '#DF9FA8',
    },
    champagne: {
      c0: '#F5E9BF',
      c1: '#E0CC90',
      c2: '#BEA768',
      pattern: 'solid',
      accent: '#FFF8DE',
    },
    black_solid: {
      c0: '#2E2E2E',
      c1: '#191919',
      c2: '#080808',
      pattern: 'solid',
      accent: '#454545',
    },
  };

  const tieStyle = tiePalettes[activeTieId] || tiePalettes.kendal;
  const tieGrad = ctx.createLinearGradient(234, 110, 266, vBottomY);
  tieGrad.addColorStop(0, tieStyle.c1);
  tieGrad.addColorStop(0.38, tieStyle.c0);
  tieGrad.addColorStop(0.72, tieStyle.c1);
  tieGrad.addColorStop(1, tieStyle.c2);
  ctx.fillStyle = tieGrad;

  // Nút thắt Windsor Knot
  ctx.beginPath();
  ctx.moveTo(238, 112);
  ctx.lineTo(262, 112);
  ctx.lineTo(256, 136);
  ctx.lineTo(244, 136);
  ctx.closePath();
  ctx.fill();

  // Thân cà vạt
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(244, 136);
  ctx.lineTo(256, 136);
  ctx.lineTo(264, vBottomY - 26);
  ctx.lineTo(250, vBottomY);
  ctx.lineTo(236, vBottomY - 26);
  ctx.closePath();
  ctx.fill();
  ctx.clip();

  // Họa tiết trên thân cà vạt theo mẫu đã chọn
  if (tieStyle.pattern === 'stripes') {
    for (let y = 126; y < vBottomY; y += 16) {
      ctx.strokeStyle = tieStyle.accent;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(232, y + 14);
      ctx.lineTo(268, y - 4);
      ctx.stroke();

      if (tieStyle.accent2) {
        ctx.strokeStyle = tieStyle.accent2;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(232, y + 18);
        ctx.lineTo(268, y);
        ctx.stroke();
      }
    }
  } else if (tieStyle.pattern === 'dots') {
    ctx.fillStyle = tieStyle.accent;
    for (let y = 140; y < vBottomY - 6; y += 9) {
      const rowOffset = Math.floor(y / 9) % 2 === 0 ? 0 : 4.5;
      for (let x = 236 + rowOffset; x <= 264; x += 9) {
        ctx.beginPath();
        ctx.arc(x, y, 1.05, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (tieStyle.pattern === 'grid') {
    ctx.strokeStyle = tieStyle.accent;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 0.85;
    for (let y = 136; y < vBottomY; y += 6) {
      ctx.beginPath();
      ctx.moveTo(234, y);
      ctx.lineTo(266, y);
      ctx.stroke();
    }
    for (let x = 236; x <= 264; x += 6) {
      ctx.beginPath();
      ctx.moveTo(x, 136);
      ctx.lineTo(x, vBottomY);
      ctx.stroke();
    }
  } else if (tieStyle.pattern === 'diamond') {
    ctx.strokeStyle = tieStyle.accent;
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 0.9;
    for (let y = 130; y < vBottomY; y += 10) {
      ctx.beginPath();
      ctx.moveTo(232, y);
      ctx.lineTo(268, y + 18);
      ctx.moveTo(268, y);
      ctx.lineTo(232, y + 18);
      ctx.stroke();
    }
  }

  ctx.restore();

  ctx.restore();
}

/**
 * Vẽ Ve Áo (Lapel) & Vạt Áo theo 5 kiểu Jacket Style:
 * Single-breasted 1/2 buttons, Double-breasted 4/6 buttons, hoặc Mandarin Stand Collar
 */
function drawLapels(ctx: CanvasRenderingContext2D, config: SuitConfigState) {
  ctx.save();
  const jacketStyle = getEffectiveJacketStyle(config);
  const pattern = createWeavePattern(config.weavePattern, config.colorHex);
  ctx.fillStyle = pattern || config.colorHex;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 1.3;

  // ----- TRƯỜNG HỢP 1: CỔ TÀU MANDARIN (MANDARIN STAND COLLAR) -----
  if (jacketStyle === 'mandarin') {
    // Dải cổ đứng Mandarin ôm quanh cổ với khe mở chữ V nhỏ chính giữa
    ctx.beginPath();
    ctx.moveTo(205, 92);
    ctx.quadraticCurveTo(226, 76, 247, 82);
    ctx.lineTo(248.5, 108);
    ctx.quadraticCurveTo(224, 106, 202, 114);
    ctx.closePath();
    ctx.fill();

    const leftBandGrad = ctx.createLinearGradient(202, 80, 248, 112);
    leftBandGrad.addColorStop(0, 'rgba(255, 255, 255, 0.16)');
    leftBandGrad.addColorStop(1, 'rgba(0, 0, 0, 0.26)');
    ctx.fillStyle = leftBandGrad;
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = pattern || config.colorHex;
    ctx.beginPath();
    ctx.moveTo(295, 92);
    ctx.quadraticCurveTo(274, 76, 253, 82);
    ctx.lineTo(251.5, 108);
    ctx.quadraticCurveTo(276, 106, 298, 114);
    ctx.closePath();
    ctx.fill();

    const rightBandGrad = ctx.createLinearGradient(298, 80, 252, 112);
    rightBandGrad.addColorStop(0, 'rgba(255, 255, 255, 0.14)');
    rightBandGrad.addColorStop(1, 'rgba(0, 0, 0, 0.28)');
    ctx.fillStyle = rightBandGrad;
    ctx.fill();
    ctx.stroke();

    // Đường chân cổ Mandarin đổ bóng xuống ngực áo
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(202, 114);
    ctx.quadraticCurveTo(250, 106, 298, 114);
    ctx.stroke();

    ctx.restore();
    return;
  }

  const isDoubleBreasted =
    jacketStyle === 'db_4_buttons' || jacketStyle === 'db_6_buttons';
  const rollEndY = jacketStyle === 'sb_1_button' ? 340 : 318;

  // Nếu là Vạt Kép (Double-Breasted 4 hoặc 6 cúc), vẽ vạt đắp chéo sang bên phải kèm bóng đổ cạnh vạt
  if (isDoubleBreasted) {
    ctx.save();
    ctx.fillStyle = pattern || config.colorHex;
    ctx.beginPath();
    ctx.moveTo(250, 284);
    ctx.lineTo(288, 336);
    ctx.lineTo(288, 552);
    ctx.quadraticCurveTo(250, 558, 208, 554);
    ctx.lineTo(208, 310);
    ctx.closePath();
    ctx.fill();

    // Bóng đổ dọc mép vạt đắp chéo Double-Breasted (x = 288)
    const dbOverlapShadow = ctx.createLinearGradient(284, 330, 296, 330);
    dbOverlapShadow.addColorStop(0, 'rgba(0, 0, 0, 0.42)');
    dbOverlapShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = dbOverlapShadow;
    ctx.fillRect(284, 334, 12, 220);
    ctx.restore();
  }

  // ----- VE ÁO BÊN PHẢI (Right Lapel - nằm dưới nếu là Double-breasted) -----
  const widthDelta =
    config.lapelWidthId === 'slim'
      ? -11
      : config.lapelWidthId === 'wide'
      ? 13
      : 0;
  const rightLapelTargetY = isDoubleBreasted ? 284 : rollEndY;
  ctx.fillStyle = pattern || config.colorHex;
  ctx.beginPath();
  ctx.moveTo(292, 92);
  ctx.lineTo(308 + widthDelta * 0.4, 134);

  if (config.lapelId === 'notch') {
    // Cổ Xếch bên phải (hỗ trợ cả Vạt đơn, Vạt kép 4/6 cúc & 3 mức độ rộng ve áo)
    ctx.lineTo(324 + widthDelta, 140);
    ctx.lineTo(315 + widthDelta * 0.85, 154);
    ctx.lineTo(334 + widthDelta, 158);
    ctx.quadraticCurveTo(
      312 + widthDelta * 0.85,
      isDoubleBreasted ? 226 : 240,
      250,
      rightLapelTargetY
    );
  } else {
    // Cổ Nhọn bên phải (hỗ trợ cả Vạt đơn, Vạt kép 4/6 cúc & 3 mức độ rộng ve áo)
    ctx.lineTo(318 + widthDelta * 0.7, 144);
    ctx.lineTo(352 + widthDelta, 124);
    ctx.quadraticCurveTo(
      326 + widthDelta * 0.85,
      225,
      250,
      rightLapelTargetY
    );
  }
  ctx.lineTo(292, 92);
  ctx.closePath();
  ctx.fill();

  const rightLapelGrad = ctx.createLinearGradient(
    345 + widthDelta,
    130,
    255,
    310
  );
  rightLapelGrad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
  rightLapelGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.03)');
  rightLapelGrad.addColorStop(1, 'rgba(0, 0, 0, 0.28)');
  ctx.fillStyle = rightLapelGrad;
  ctx.fill();
  ctx.stroke();

  // ----- VE ÁO BÊN TRÁI (Left Lapel - vắt chéo qua phải nếu là Double-breasted) -----
  ctx.fillStyle = pattern || config.colorHex;
  ctx.beginPath();
  ctx.moveTo(208, 92);
  ctx.lineTo(192 - widthDelta * 0.4, 134);

  const leftLapelTargetX = isDoubleBreasted ? 288 : 250;
  const leftLapelTargetY = isDoubleBreasted ? 336 : rollEndY;

  if (config.lapelId === 'notch') {
    // Cổ Xếch (Notch Lapel - hỗ trợ cả Vạt đơn, Vạt kép 4/6 cúc & 3 mức độ rộng ve áo)
    ctx.lineTo(176 - widthDelta, 140);
    ctx.lineTo(185 - widthDelta * 0.85, 154);
    ctx.lineTo(166 - widthDelta, 158);
    ctx.quadraticCurveTo(
      (isDoubleBreasted ? 196 : 188) - widthDelta * 0.85,
      isDoubleBreasted ? 250 : 244,
      leftLapelTargetX,
      leftLapelTargetY
    );
  } else {
    // Cổ Nhọn (Peak Lapel - hỗ trợ cả Vạt đơn, Vạt kép 4/6 cúc & 3 mức độ rộng ve áo)
    ctx.lineTo(182 - widthDelta * 0.7, 144);
    ctx.lineTo(148 - widthDelta, 124);
    ctx.quadraticCurveTo(
      (isDoubleBreasted ? 186 : 174) - widthDelta * 0.85,
      isDoubleBreasted ? 236 : 225,
      leftLapelTargetX,
      leftLapelTargetY
    );
  }
  if (isDoubleBreasted) {
    ctx.lineTo(250, 284);
  }
  ctx.lineTo(208, 92);
  ctx.closePath();
  ctx.fill();

  const leftLapelGrad = ctx.createLinearGradient(
    155 - widthDelta,
    130,
    leftLapelTargetX,
    leftLapelTargetY
  );
  leftLapelGrad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
  leftLapelGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0.05)');
  leftLapelGrad.addColorStop(1, 'rgba(0, 0, 0, 0.26)');
  ctx.fillStyle = leftLapelGrad;
  ctx.fill();
  ctx.stroke();

  // Khuyết cài hoa ve áo trái (Milanese Buttonhole / Boutonniere)
  ctx.strokeStyle =
    config.buttonId === 'gold_brass'
      ? '#D4AF37'
      : 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  if (config.lapelId === 'notch') {
    ctx.moveTo(175 - widthDelta * 0.85, 174);
    ctx.lineTo(192 - widthDelta * 0.65, 180);
  } else {
    ctx.moveTo(166 - widthDelta * 0.85, 162);
    ctx.lineTo(186 - widthDelta * 0.65, 170);
  }
  ctx.stroke();

  ctx.restore();
}

/**
 * Vẽ Túi Ngực (Barchetta Breast Pocket) & Khăn Lụa Pocket Square
 */
function drawBreastPocket(ctx: CanvasRenderingContext2D, config: SuitConfigState) {
  ctx.save();
  const pattern = createWeavePattern(config.weavePattern, config.colorHex);

  // Khăn cài túi ngực (White Silk Presidential Fold Pocket Square)
  const silkGrad = ctx.createLinearGradient(284, 206, 336, 224);
  silkGrad.addColorStop(0, '#FFFFFF');
  silkGrad.addColorStop(0.55, '#F7F5F0');
  silkGrad.addColorStop(1, '#E5E0D5');
  ctx.fillStyle = silkGrad;
  ctx.beginPath();
  ctx.moveTo(286, 214);
  ctx.lineTo(334, 207);
  ctx.lineTo(332, 219);
  ctx.lineTo(284, 224);
  ctx.closePath();
  ctx.fill();

  // Đường viền lụa mảnh trên khăn cài túi ngực
  ctx.strokeStyle =
    config.monogramText.trim() && (config.monogramColor ?? 'gold') === 'gold'
      ? 'rgba(212, 175, 55, 0.5)'
      : 'rgba(20, 20, 19, 0.18)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(287, 216.5);
  ctx.lineTo(332.5, 209.8);
  ctx.stroke();

  // Cơi túi ngực cong nhẹ kiểu Ý (Barchetta Welt)
  ctx.fillStyle = pattern || config.colorHex;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.26)';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(280, 222);
  ctx.quadraticCurveTo(310, 218, 340, 214);
  ctx.lineTo(339, 225);
  ctx.quadraticCurveTo(310, 229, 280, 232);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Đường chỉ đột (Pick-stitching) tinh xảo dọc mép trên cơi túi ngực
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
  ctx.lineWidth = 0.75;
  ctx.setLineDash([1.5, 2.2]);
  ctx.beginPath();
  ctx.moveTo(282, 223.8);
  ctx.quadraticCurveTo(310, 219.8, 338, 215.8);
  ctx.stroke();
  ctx.restore();

  // Bóng dưới cơi túi ngực
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.48)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(280, 233);
  ctx.quadraticCurveTo(310, 230, 339, 226);
  ctx.stroke();
  ctx.restore();
}

/**
 * Vẽ Chữ Thêu Monogram Nghệ Thuật & Cân Đối Trên Vị Trí Túi Ngực Áo (Breast Pocket Embroidery)
 */
function drawArtisticBreastPocketMonogram(
  ctx: CanvasRenderingContext2D,
  config: SuitConfigState
) {
  const rawText = config.monogramText.trim();
  if (!rawText) return;

  const style = config.monogramStyle ?? 'script';
  const colorKey = config.monogramColor ?? 'gold';
  const displayText = style === 'imperial' ? rawText.toUpperCase() : rawText;

  // Bảng màu chỉ thêu lụa / kim tuyến 3D
  const palettes: Record<
    NonNullable<SuitConfigState['monogramColor']>,
    { stops: [string, string, string, string]; accent: string; glow: string }
  > = {
    gold: {
      stops: ['#FFF6B7', '#D4AF37', '#AA7C11', '#F7E28B'],
      accent: 'rgba(247, 226, 139, 0.78)',
      glow: 'rgba(212, 175, 55, 0.28)',
    },
    silver: {
      stops: ['#FFFFFF', '#E2E8F0', '#94A3B8', '#F8FAFC'],
      accent: 'rgba(241, 245, 249, 0.8)',
      glow: 'rgba(226, 232, 240, 0.25)',
    },
    ivory: {
      stops: ['#FFFFFF', '#F7F3E8', '#D6C7B2', '#FDFBF7'],
      accent: 'rgba(247, 243, 232, 0.8)',
      glow: 'rgba(247, 243, 232, 0.22)',
    },
    burgundy: {
      stops: ['#FECDD3', '#E11D48', '#9F1239', '#FDA4AF'],
      accent: 'rgba(253, 164, 175, 0.78)',
      glow: 'rgba(225, 29, 72, 0.25)',
    },
  };
  const palette = palettes[colorKey] || palettes.gold;

  ctx.save();

  // Tâm chuẩn xác tại khu vực Túi Ngực (ngay dưới cơi túi Barchetta Welt và cân giữa 2 mép túi x=280..340)
  const pocketCenterX = 310.5;
  const pocketCenterY = 244.5;
  // Góc nghiêng tự nhiên song song với đường cong cơi túi ngực Ý Barchetta (-7 độ)
  const pocketAngleRad = -0.122;
  const offsetX = Math.max(-14, Math.min(14, config.monogramOffsetX ?? 0));
  const offsetY = Math.max(-8, Math.min(8, config.monogramOffsetY ?? 0));

  ctx.translate(pocketCenterX, pocketCenterY);
  ctx.rotate(pocketAngleRad);

  // Đường chỉ khâu viền phom túi ngực mờ (Bespoke Breast Pocket Bag Contour) giúp tôn vị trí chữ thêu
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 0.75;
  ctx.setLineDash([2, 2.5]);
  ctx.beginPath();
  ctx.moveTo(-28, -12);
  ctx.lineTo(-27, 13);
  ctx.quadraticCurveTo(0, 17, 27, 13);
  ctx.lineTo(28, -12);
  ctx.stroke();
  ctx.restore();

  ctx.translate(offsetX, offsetY);

  // Tính toán cỡ chữ động (Auto-Fit Font Scaling) để luôn cân đối hoàn hảo trong bề rộng túi ngực (56px)
  const len = displayText.length;
  let baseFontSize =
    style === 'imperial'
      ? len <= 4
        ? 9.8
        : len <= 8
        ? 8.5
        : 7.4
      : len <= 4
      ? 11.8
      : len <= 8
      ? 10.2
      : 8.8;

  const fontSpec =
    style === 'imperial'
      ? `600 ${baseFontSize}px "Playfair Display", Georgia, serif`
      : style === 'crest'
      ? `italic 700 ${baseFontSize}px "Playfair Display", Georgia, serif`
      : `italic 600 ${baseFontSize}px "Playfair Display", "Cormorant Garamond", Georgia, serif`;

  ctx.font = fontSpec;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const maxPocketTextWidth = style === 'crest' ? 44 : 52;
  const measuredW = ctx.measureText(displayText).width;
  const horizScale =
    measuredW > maxPocketTextWidth ? maxPocketTextWidth / measuredW : 1;
  const effectiveHalfW = Math.min(26, Math.max(11, (measuredW * horizScale) / 2));

  // Vẽ họa tiết khung / đường lượn nghệ thuật theo từng phong cách Monogram
  if (style === 'crest') {
    // Khung Huy Hiệu Hoàng Gia (Savile Row Crest Cartouche) ôm quanh chữ thêu
    const crestW = Math.max(32, effectiveHalfW * 2 + 12);
    const crestH = 17.5;
    ctx.save();
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 0.85;
    ctx.fillStyle = 'rgba(15, 15, 14, 0.24)';
    ctx.beginPath();
    ctx.roundRect(-crestW / 2, -crestH / 2, crestW, crestH, 8);
    ctx.fill();
    ctx.stroke();

    // Điểm nhấn hoa thị kim cương ở đỉnh và đáy huy hiệu
    ctx.fillStyle = palette.stops[0];
    ctx.beginPath();
    ctx.arc(0, -crestH / 2, 1.3, 0, Math.PI * 2);
    ctx.arc(0, crestH / 2, 1.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else if (style === 'imperial') {
    // Hai đường chỉ thêu song song cổ điển kèm chấm kim cương hai bên
    const lineHalf = Math.min(25, effectiveHalfW + 4);
    ctx.save();
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(-lineHalf, -6.8);
    ctx.lineTo(lineHalf, -6.8);
    ctx.moveTo(-lineHalf * 0.75, 6.8);
    ctx.lineTo(lineHalf * 0.75, 6.8);
    ctx.stroke();

    // Hạt kim cương 2 đầu
    ctx.fillStyle = palette.stops[0];
    ctx.beginPath();
    ctx.arc(-lineHalf - 2, 0, 1, 0, Math.PI * 2);
    ctx.arc(lineHalf + 2, 0, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else {
    // Đường lượn chữ ký nghệ thuật (Calligraphic Swash) mềm mại dưới chân chữ
    const swashHalf = Math.min(25, effectiveHalfW + 5);
    ctx.save();
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 0.85;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-swashHalf, 5.8);
    ctx.bezierCurveTo(
      -swashHalf * 0.35,
      8.6,
      swashHalf * 0.35,
      4.2,
      swashHalf,
      6.4
    );
    ctx.stroke();

    // Hạt thêu lấp lánh ở tâm đường lượn
    ctx.fillStyle = palette.stops[0];
    ctx.beginPath();
    ctx.arc(0, 6.4, 1.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Vẽ chữ thêu 3D (Đổ bóng chìm xuống thớ vải + Lớp chỉ thêu ánh kim nổi khối)
  ctx.save();
  ctx.scale(horizScale, 1);

  // Lớp 1: Bóng chân chỉ thêu trên mặt vải (Embroidery Depth Shadow)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.68)';
  ctx.fillText(displayText, 0.7, 1.05);

  // Lớp 2: Viền chỉ thêu tạo độ dày sợi chỉ (Satin Stitch Relief)
  const threadGrad = ctx.createLinearGradient(-26, -6, 26, 6);
  threadGrad.addColorStop(0, palette.stops[0]);
  threadGrad.addColorStop(0.38, palette.stops[1]);
  threadGrad.addColorStop(0.72, palette.stops[2]);
  threadGrad.addColorStop(1, palette.stops[3]);

  ctx.strokeStyle = palette.glow;
  ctx.lineWidth = 0.65;
  ctx.strokeText(displayText, 0, 0);

  // Lớp 3: Mặt chỉ thêu lụa / kim tuyến chính
  ctx.fillStyle = threadGrad;
  ctx.fillText(displayText, 0, 0);

  // Lớp 4: Ánh sáng phản chiếu đỉnh sợi chỉ (Top Thread Specular Highlight)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
  ctx.fillText(displayText, -0.25, -0.3);

  ctx.restore();
  ctx.restore();
}

/**
 * Lớp phủ lưới mờ (Grid Overlay) hiển thị trên #suitCanvas khi ở chế độ Phóng To
 * Hỗ trợ người dùng quan sát tỷ lệ & căn chỉnh họa tiết thêu Monogram trên túi ngực áo
 */
function drawZoomMonogramAlignmentGrid(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  config: SuitConfigState,
  options: RenderOptions
) {
  // Độ đậm mờ dần mượt theo tỷ lệ phóng to (bắt đầu hiện từ 106% và rõ hoàn toàn từ 145%)
  const alpha = Math.min(1, Math.max(0, (options.zoom - 1.05) / 0.4));
  if (alpha <= 0.01) return;

  const invScale = 1 / Math.max(1, options.zoom);

  ctx.save();

  // 1. Lưới tọa độ kỹ thuật toàn vùng Canvas 2D (Subtle Sartorial Grid Overlay)
  const majorStep = 24;
  const minorStep = 8;

  // Lưới phụ siêu mảnh (khi zoom >= 1.35x)
  if (options.zoom >= 1.3) {
    const subAlpha = Math.min(1, (options.zoom - 1.3) / 0.35) * alpha;
    ctx.strokeStyle = `rgba(255, 255, 255, ${(0.055 * subAlpha).toFixed(3)})`;
    ctx.lineWidth = 0.6 * invScale;
    ctx.beginPath();
    for (let x = 0; x <= W; x += minorStep) {
      if (x % majorStep === 0) continue;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
    }
    for (let y = 0; y <= H; y += minorStep) {
      if (y % majorStep === 0) continue;
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
    }
    ctx.stroke();
  }

  // Lưới chính mờ màu vàng đồng / trắng ngà giúp nổi bật trên cả nền vải tối và sáng
  ctx.strokeStyle = `rgba(212, 175, 55, ${(0.14 * alpha).toFixed(3)})`;
  ctx.lineWidth = 0.85 * invScale;
  ctx.beginPath();
  for (let x = 0; x <= W; x += majorStep) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
  }
  for (let y = 0; y <= H; y += majorStep) {
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
  }
  ctx.stroke();

  // 2. Khung Lưới Căn Chỉnh Chuyên Biệt Tại Vị Trí Túi Ngực & Monogram (Breast Pocket Alignment Reticle)
  const pocketCenterX = 310.5;
  const pocketCenterY = 244.5;
  const pocketAngleRad = -0.122;
  const offsetX = Math.max(-14, Math.min(14, config.monogramOffsetX ?? 0));
  const offsetY = Math.max(-8, Math.min(8, config.monogramOffsetY ?? 0));

  ctx.translate(pocketCenterX, pocketCenterY);
  ctx.rotate(pocketAngleRad);

  const halfW = 30;
  const halfH = 14;
  const cell = 6;

  // Lưới vi mô (6px = 1 ô căn chỉnh) bên trong vùng thêu túi ngực
  ctx.strokeStyle = `rgba(247, 226, 139, ${(0.24 * alpha).toFixed(3)})`;
  ctx.lineWidth = 0.75 * invScale;
  ctx.beginPath();
  for (let gx = -halfW; gx <= halfW; gx += cell) {
    ctx.moveTo(gx, -halfH);
    ctx.lineTo(gx, halfH);
  }
  for (let gy = -halfH; gy <= halfH; gy += cell) {
    ctx.moveTo(-halfW, gy);
    ctx.lineTo(halfW, gy);
  }
  ctx.stroke();

  // Trục đối xứng tâm ngang & tâm dọc (Center Alignment Crosshair) của túi ngực
  ctx.save();
  ctx.strokeStyle = `rgba(212, 175, 55, ${(0.52 * alpha).toFixed(3)})`;
  ctx.lineWidth = 0.95 * invScale;
  ctx.setLineDash([2.5 * invScale, 2 * invScale]);
  ctx.beginPath();
  ctx.moveTo(-halfW - 5, offsetY);
  ctx.lineTo(halfW + 5, offsetY);
  ctx.moveTo(offsetX, -halfH - 5);
  ctx.lineTo(offsetX, halfH + 5);
  ctx.stroke();
  ctx.restore();

  // 4 dấu ngoặc vuông định vị góc vùng thêu (Corner Alignment Brackets)
  const brk = 4.5;
  ctx.strokeStyle = `rgba(255, 246, 183, ${(0.72 * alpha).toFixed(3)})`;
  ctx.lineWidth = 1.2 * invScale;
  ctx.beginPath();
  // Góc trên trái
  ctx.moveTo(-halfW, -halfH + brk);
  ctx.lineTo(-halfW, -halfH);
  ctx.lineTo(-halfW + brk, -halfH);
  // Góc trên phải
  ctx.moveTo(halfW - brk, -halfH);
  ctx.lineTo(halfW, -halfH);
  ctx.lineTo(halfW, -halfH + brk);
  // Góc dưới trái
  ctx.moveTo(-halfW, halfH - brk);
  ctx.lineTo(-halfW, halfH);
  ctx.lineTo(-halfW + brk, halfH);
  // Góc dưới phải
  ctx.moveTo(halfW - brk, halfH);
  ctx.lineTo(halfW, halfH);
  ctx.lineTo(halfW, halfH - brk);
  ctx.stroke();

  // Vạch thước đo milimet dọc cạnh trên vùng túi ngực
  ctx.strokeStyle = `rgba(255, 255, 255, ${(0.4 * alpha).toFixed(3)})`;
  ctx.lineWidth = 0.7 * invScale;
  ctx.beginPath();
  for (let tx = -halfW; tx <= halfW; tx += 3) {
    const tickH = tx % 6 === 0 ? 2.6 : 1.4;
    ctx.moveTo(tx, -halfH);
    ctx.lineTo(tx, -halfH - tickH);
  }
  ctx.stroke();

  ctx.restore();
}

/**
 * Vẽ Túi Hông 2 bên: Túi Nắp (Flap Pocket) hoặc Túi Ẩn (Jetted Pocket)
 */
function drawHipPockets(ctx: CanvasRenderingContext2D, config: SuitConfigState) {
  ctx.save();
  const pockets = [
    { x: 156, y: 416, tilt: 3 },  // Túi bên trái
    { x: 278, y: 419, tilt: -3 }, // Túi bên phải
  ];

  pockets.forEach((p) => {
    const w = 66;
    if (config.pocketId === 'flap') {
      // TÚI NẮP (Flap Pocket): Có nắp túi dày dặn đổ bóng
      const h = 24;
      // Bóng đổ dưới nắp túi
      ctx.fillStyle = 'rgba(0, 0, 0, 0.38)';
      ctx.beginPath();
      ctx.roundRect(p.x, p.y + 3, w, h, 3);
      ctx.fill();

      // Thân nắp túi
      const pattern = createWeavePattern(config.weavePattern, config.colorHex);
      ctx.fillStyle = pattern || config.colorHex;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.roundRect(p.x, p.y, w, h, 3);
      ctx.fill();
      ctx.stroke();

      // Đường viền cơi trên nắp túi
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.beginPath();
      ctx.moveTo(p.x + 2, p.y);
      ctx.lineTo(p.x + w - 2, p.y);
      ctx.stroke();
    } else if (config.pocketId === 'patched') {
      // TÚI ỐP NGOÀI (Patched Pocket): Dáng túi đắp chữ U may nổi bên ngoài thân áo
      const patchW = 64;
      const patchH = 68;
      const py = p.y - 4;

      // Bóng đổ quanh viền túi đắp nổi
      ctx.fillStyle = 'rgba(0, 0, 0, 0.34)';
      ctx.beginPath();
      ctx.roundRect(p.x + 1, py + 2.5, patchW, patchH, [2, 2, 12, 12]);
      ctx.fill();

      // Thân túi ốp ngoài cùng chất liệu vải & họa tiết dệt
      const pattern = createWeavePattern(config.weavePattern, config.colorHex);
      ctx.fillStyle = pattern || config.colorHex;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.48)';
      ctx.lineWidth = 1.15;
      ctx.beginPath();
      ctx.roundRect(p.x, py, patchW, patchH, [2, 2, 12, 12]);
      ctx.fill();
      ctx.stroke();

      // Đường may diễu viền trong (Pick-stitching) quanh túi ốp
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.24)';
      ctx.lineWidth = 0.95;
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.roundRect(p.x + 3, py + 3, patchW - 6, patchH - 6, [1, 1, 9, 9]);
      ctx.stroke();
      ctx.restore();
    } else {
      // TÚI VIỀN KÉP / TÚI ẨN (Double-welted / Jetted Pocket): Hai đường viền cơi mảnh tinh tế
      ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
      ctx.fillRect(p.x, p.y + 4, w, 3);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(p.x, p.y + 1, w, 8);
    }
  });

  ctx.restore();
}

/**
 * Vẽ Cúc Áo (Buttons) theo 5 kiểu Jacket Style + Cúc Tay Áo
 */
function drawSuitButtons(ctx: CanvasRenderingContext2D, config: SuitConfigState) {
  ctx.save();

  const customBtn =
    config.customButtonId ||
    (config.buttonId === 'gold_brass' ? 'shiny_gold_brass' : 'default');
  const jacketStyle = getEffectiveJacketStyle(config);

  const metalPalettes: Record<
    string,
    { c0: string; c1: string; c2: string; c3: string; rim: string }
  > = {
    shiny_gold_brass: {
      c0: '#FFF8C2',
      c1: '#E5BC46',
      c2: '#A97818',
      c3: '#5C3A08',
      rim: '#FFF2A1',
    },
    gold_brass: {
      c0: '#E2CF8E',
      c1: '#A88C3D',
      c2: '#6B561E',
      c3: '#3A2E0D',
      rim: '#D1BC76',
    },
    silver_brass: {
      c0: '#FFFFFF',
      c1: '#CBD5E1',
      c2: '#64748B',
      c3: '#334155',
      rim: '#F1F5F9',
    },
    antique_silver_brass: {
      c0: '#D6D3CD',
      c1: '#8C8881',
      c2: '#524F4A',
      c3: '#262523',
      rim: '#B8B3AA',
    },
  };

  const hornPalettes: Record<
    string,
    { c0: string; c1: string; c2: string; rim: string; thread: string }
  > = {
    default: {
      c0: '#4A4744',
      c1: '#1E1D1B',
      c2: '#0A0A09',
      rim: 'rgba(255, 255, 255, 0.25)',
      thread: '#D0CCC4',
    },
    brown: {
      c0: '#7D5A3C',
      c1: '#4A321F',
      c2: '#291A0E',
      rim: 'rgba(235, 200, 160, 0.35)',
      thread: '#E6D7C3',
    },
    dark_grey: {
      c0: '#8A8E91',
      c1: '#525659',
      c2: '#2C2F31',
      rim: 'rgba(255, 255, 255, 0.32)',
      thread: '#E2E8F0',
    },
    navy_blue: {
      c0: '#3B5978',
      c1: '#1B2D42',
      c2: '#0D1724',
      rim: 'rgba(147, 197, 253, 0.35)',
      thread: '#DBEAFE',
    },
    khaki: {
      c0: '#D4BE98',
      c1: '#9C8259',
      c2: '#5E4B2E',
      rim: 'rgba(255, 248, 231, 0.45)',
      thread: '#FAF5E8',
    },
    off_white: {
      c0: '#FCFBF7',
      c1: '#E6E1D3',
      c2: '#BFB8A6',
      rim: 'rgba(255, 255, 255, 0.7)',
      thread: '#8C8577',
    },
    anthrazit: {
      c0: '#575B5E',
      c1: '#282A2C',
      c2: '#111213',
      rim: 'rgba(255, 255, 255, 0.28)',
      thread: '#CBD5E1',
    },
  };

  const drawSingleButton = (cx: number, cy: number, radius: number) => {
    // Bóng đổ dưới cúc áo
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.arc(cx + 1.5, cy + 2, radius, 0, Math.PI * 2);
    ctx.fill();

    const metal = metalPalettes[customBtn];
    if (metal) {
      // Cúc Đồng Chạm Nổi Hoàng Gia (Embossed Metal Shank Button)
      const metalGrad = ctx.createRadialGradient(
        cx - 2,
        cy - 2,
        1,
        cx,
        cy,
        radius
      );
      metalGrad.addColorStop(0, metal.c0);
      metalGrad.addColorStop(0.45, metal.c1);
      metalGrad.addColorStop(0.85, metal.c2);
      metalGrad.addColorStop(1, metal.c3);
      ctx.fillStyle = metalGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Viền chạm khắc nổi trên cúc kim loại
      ctx.strokeStyle = metal.rim;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 2, 0, Math.PI * 2);
      ctx.stroke();

      // Họa tiết huy hiệu chạm nổi ở tâm cúc kim loại
      ctx.fillStyle = metal.rim;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.28, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Cúc Sừng / Ngọc Trai 4 Lỗ (4-Hole Horn / Mother-of-Pearl Button)
      const horn = hornPalettes[customBtn] || hornPalettes.default;
      const hornGrad = ctx.createRadialGradient(
        cx - 2,
        cy - 2,
        1,
        cx,
        cy,
        radius
      );
      hornGrad.addColorStop(0, horn.c0);
      hornGrad.addColorStop(0.6, horn.c1);
      hornGrad.addColorStop(1, horn.c2);
      ctx.fillStyle = hornGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = horn.rim;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.arc(cx, cy, radius - 1.8, 0, Math.PI * 2);
      ctx.stroke();

      // 4 lỗ khâu chỉ chính giữa cúc
      ctx.fillStyle = horn.thread;
      const holeOffset = 2.1;
      [
        [-holeOffset, -holeOffset],
        [holeOffset, -holeOffset],
        [-holeOffset, holeOffset],
        [holeOffset, holeOffset],
      ].forEach(([dx, dy]) => {
        ctx.beginPath();
        ctx.arc(cx + dx, cy + dy, 0.9, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  };

  if (jacketStyle === 'mandarin') {
    // Kiểu Mandarin: 5 cúc dọc từ ngực trên xuống eo dưới
    const mandarinY = [148, 214, 280, 346, 412];
    mandarinY.forEach((y) => {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(235, y);
      ctx.lineTo(250, y);
      ctx.stroke();
      drawSingleButton(256, y, 6.8);
    });
  } else if (jacketStyle === 'db_4_buttons') {
    // Kiểu Double-breasted 4 buttons (2x2)
    const rowsY = [344, 404];
    rowsY.forEach((y, idx) => {
      // Khuyết áo ngang bên phải và gạch khuyết trang trí bên trái dưới
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.32)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(264, y);
      ctx.lineTo(278, y);
      if (idx === 1) {
        ctx.moveTo(202, y);
        ctx.lineTo(214, y);
      }
      ctx.stroke();

      drawSingleButton(222, y, 7.2);
      drawSingleButton(278, y, 7.2);
    });
  } else if (jacketStyle === 'db_6_buttons') {
    // Kiểu Double-breasted 6 buttons (6x2 Savile Row)
    // Hàng trên cùng mở rộng nhẹ sang hai bên ngực
    drawSingleButton(208, 286, 7.2);
    drawSingleButton(286, 286, 7.2);

    const lowerRowsY = [344, 404];
    lowerRowsY.forEach((y) => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.32)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(264, y);
      ctx.lineTo(278, y);
      ctx.stroke();

      drawSingleButton(222, y, 7.2);
      drawSingleButton(278, y, 7.2);
    });
  } else {
    // Kiểu Single-breasted 1 button hoặc 2 buttons
    const buttonYPositions =
      jacketStyle === 'sb_1_button' ? [344] : [334, 396];
    buttonYPositions.forEach((y) => {
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(234, y);
      ctx.lineTo(250, y);
      ctx.stroke();

      drawSingleButton(250, y, 7.5);
    });
  }

  // Vẽ 4 cúc tay áo xếp chồng (Kissing Surgeon Cuffs) ở 2 bên cổ tay (chỉ vẽ khi có tay áo - Vest 2 mảnh)
  if (config.suitPieceId !== '3_piece' || jacketStyle === 'mandarin') {
    for (let i = 0; i < 4; i++) {
      drawSingleButton(88, 438 + i * 11, 3.8);
      drawSingleButton(412, 438 + i * 11, 3.8);
    }
  }

  ctx.restore();
}

/**
 * Vẽ đường ráp vạt áo và chỉ đột thủ công (Pick-Stitching)
 */
function drawTailoringSeams(ctx: CanvasRenderingContext2D, config: SuitConfigState) {
  ctx.save();
  const jacketStyle = getEffectiveJacketStyle(config);
  const sleeveless =
    config.suitPieceId === '3_piece' && jacketStyle !== 'mandarin';
  const widthDelta =
    config.lapelWidthId === 'slim'
      ? -11
      : config.lapelWidthId === 'wide'
      ? 13
      : 0;
  const isDoubleBreasted =
    jacketStyle === 'db_4_buttons' || jacketStyle === 'db_6_buttons';

  // Đường giao vạt chính theo từng kiểu áo Vest
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.58)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  if (jacketStyle === 'mandarin') {
    ctx.moveTo(250, 108);
    ctx.lineTo(250, 524);
  } else if (isDoubleBreasted) {
    ctx.moveTo(288, 336);
    ctx.lineTo(288, 552);
  } else {
    const startY = jacketStyle === 'sb_1_button' ? 340 : 318;
    ctx.moveTo(250, startY);
    ctx.lineTo(250, 522);
  }
  ctx.stroke();

  // Đường chiết ngực (Front Dart Seams) giúp ôm dáng Bespoke
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.26)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(188, 285);
  ctx.quadraticCurveTo(184, 355, 188, 416);
  ctx.moveTo(312, 285);
  ctx.quadraticCurveTo(316, 355, 312, 419);
  ctx.stroke();

  // Đường viền ngoài cùng sắc nét cho toàn bộ thân áo Suit
  traceJacketSilhouette(ctx, sleeveless);
  ctx.strokeStyle = 'rgba(20, 20, 19, 0.65)';
  ctx.lineWidth = 1.4;
  ctx.stroke();

  // Đường chỉ đột thủ công (AMF Pick-Stitching) dọc theo mép ve áo hoặc nẹp cổ Tàu
  ctx.strokeStyle =
    config.buttonId === 'gold_brass'
      ? 'rgba(212, 175, 55, 0.35)'
      : 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 1;
  ctx.setLineDash([2, 4]);
  ctx.beginPath();
  if (jacketStyle === 'mandarin') {
    ctx.moveTo(246, 112);
    ctx.lineTo(246, 520);
  } else if (isDoubleBreasted) {
    if (config.lapelId === 'notch') {
      ctx.moveTo(170 - widthDelta, 160);
      ctx.quadraticCurveTo(198 - widthDelta * 0.85, 250, 285, 336);
      ctx.lineTo(285, 548);
      ctx.moveTo(330 + widthDelta, 160);
      ctx.quadraticCurveTo(310 + widthDelta * 0.85, 226, 254, 284);
    } else {
      ctx.moveTo(153 - widthDelta, 128);
      ctx.quadraticCurveTo(188 - widthDelta * 0.85, 236, 285, 336);
      ctx.lineTo(285, 548);
      ctx.moveTo(347 + widthDelta, 128);
      ctx.quadraticCurveTo(322 + widthDelta * 0.85, 224, 254, 284);
    }
  } else if (config.lapelId === 'notch') {
    const rollY = jacketStyle === 'sb_1_button' ? 340 : 318;
    ctx.moveTo(170 - widthDelta, 160);
    ctx.quadraticCurveTo(192 - widthDelta * 0.85, 242, 246, rollY);
    ctx.moveTo(330 + widthDelta, 160);
    ctx.quadraticCurveTo(308 + widthDelta * 0.85, 242, 254, rollY);
  } else {
    const rollY = jacketStyle === 'sb_1_button' ? 340 : 318;
    ctx.moveTo(153 - widthDelta, 128);
    ctx.quadraticCurveTo(178 - widthDelta * 0.85, 226, 246, rollY);
    ctx.moveTo(347 + widthDelta, 128);
    ctx.quadraticCurveTo(322 + widthDelta * 0.85, 226, 254, rollY);
  }
  ctx.stroke();

  ctx.restore();
}

/**
 * ============================================================================
 * BỘ VẼ MÔ HÌNH QUẦN ÂU 2D BESPOKE (TROUSERS 2D ENGINE)
 * Đồng bộ màu vải, họa tiết dệt, bóng đổ 3D Multiply và các tùy chọn:
 * - Phom ống quần (Slim / Regular / Relaxed)
 * - Ly quần trước (Không ly / 1 ly / 2 ly)
 * - Cạp quần (Cạp tiêu chuẩn / Cạp chéo dài Sartorial / Cạp trơn ẩn cúc)
 * - Túi trước (Túi chéo / Túi dọc / Túi ngang Frogmouth)
 * - Gấu quần (Gấu trơn / Gấu lơ-vê 4cm)
 * ============================================================================
 */
function traceTrousersSilhouette(
  ctx: CanvasRenderingContext2D,
  fitId: NonNullable<SuitConfigState['trouserFitId']>,
  isHighWaisted = false
) {
  const legSpread = fitId === 'slim' ? -7 : fitId === 'relaxed' ? 9 : 0;
  const ankleHalfW = fitId === 'slim' ? 36 : fitId === 'relaxed' ? 50 : 42;
  const waistTopY = isHighWaisted ? 56 : 72;

  ctx.beginPath();
  // Đỉnh cạp quần trái sang phải
  ctx.moveTo(154, waistTopY);
  ctx.quadraticCurveTo(250, waistTopY + 4, 346, waistTopY);

  // Hông phải & đùi ngoài bên phải đi xuống gấu quần phải
  ctx.bezierCurveTo(
    362 + legSpread * 0.6,
    135,
    358 + legSpread,
    260,
    344 + legSpread,
    365
  );
  ctx.bezierCurveTo(
    336 + legSpread,
    440,
    296 + ankleHalfW,
    505,
    294 + ankleHalfW,
    556
  );

  // Gấu ống quần phải
  ctx.quadraticCurveTo(294, 561, 294 - ankleHalfW, 556);

  // Ống trong bên phải đi lên đũng quần (Crotch)
  ctx.bezierCurveTo(
    292 - ankleHalfW * 0.88,
    460,
    264,
    330,
    250,
    226
  );

  // Ống trong bên trái đi từ đũng quần xuống gấu trái
  ctx.bezierCurveTo(
    236,
    330,
    208 + ankleHalfW * 0.88,
    460,
    206 + ankleHalfW,
    556
  );

  // Gấu ống quần trái
  ctx.quadraticCurveTo(206, 561, 206 - ankleHalfW, 556);

  // Ống ngoài bên trái đi lên hông trái & cạp trái
  ctx.bezierCurveTo(
    204 - ankleHalfW,
    505,
    164 - legSpread,
    440,
    156 - legSpread,
    365
  );
  ctx.bezierCurveTo(
    142 - legSpread,
    260,
    138 - legSpread * 0.6,
    135,
    154,
    waistTopY
  );
  ctx.closePath();
}

function drawBespokeTrousers2D(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  config: SuitConfigState,
  renderMode: RenderOptions['renderMode']
) {
  const fitId = config.trouserFitId ?? 'regular';
  const pleatId = config.trouserPleatId ?? 'flat_front';
  const waistbandId = config.trouserWaistbandId ?? 'standard';
  const pocketId = config.trouserPocketId ?? 'slanted';
  const cuffId = config.trouserCuffId ?? 'no_cuff';
  const isHighWaisted =
    config.trouserRiseId === 'high_waisted' ||
    config.trouserStyleId === 'high_waisted' ||
    config.trouserStyleId === 'gurkha' ||
    waistbandId === 'gurkha';
  const waistTopY = isHighWaisted ? 56 : 72;

  const legSpread = fitId === 'slim' ? -7 : fitId === 'relaxed' ? 9 : 0;
  const ankleHalfW = fitId === 'slim' ? 36 : fitId === 'relaxed' ? 50 : 42;

  // 0. Vẽ Giá Treo Gỗ Óc Chó phía trên & Đôi Giày Tây Oxford Bespoke dưới gấu quần
  ctx.save();
  // Trụ đứng kim loại & lưng quần phía trong
  ctx.fillStyle = '#2A2927';
  ctx.fillRect(246, isHighWaisted ? 26 : 38, 8, 40);
  const brassTop = ctx.createLinearGradient(238, 18, 262, 34);
  brassTop.addColorStop(0, '#B38728');
  brassTop.addColorStop(0.5, '#FBF5B7');
  brassTop.addColorStop(1, '#8A6421');
  ctx.fillStyle = brassTop;
  ctx.beginPath();
  ctx.roundRect(240, isHighWaisted ? 18 : 28, 20, 12, 3);
  ctx.fill();

  // Giày Oxford da bê Ý dưới 2 ống quần
  [206, 294].forEach((shoeX, idx) => {
    const dir = idx === 0 ? -1 : 1;
    const shoeGrad = ctx.createLinearGradient(
      shoeX - 28,
      550,
      shoeX + 28,
      595
    );
    shoeGrad.addColorStop(0, '#3D2516');
    shoeGrad.addColorStop(0.45, '#593822');
    shoeGrad.addColorStop(1, '#1F1209');
    ctx.fillStyle = shoeGrad;
    ctx.strokeStyle = '#140B05';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(shoeX - 24, 552);
    ctx.lineTo(shoeX + 24, 552);
    ctx.bezierCurveTo(
      shoeX + 28 + dir * 8,
      568,
      shoeX + 30 + dir * 12,
      588,
      shoeX + dir * 6,
      594
    );
    ctx.bezierCurveTo(
      shoeX - 26 + dir * 4,
      594,
      shoeX - 28,
      574,
      shoeX - 24,
      552
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Ánh bóng mũi giày (Mirror Shine Toe-Cap)
    ctx.fillStyle = 'rgba(255, 245, 230, 0.16)';
    ctx.beginPath();
    ctx.ellipse(shoeX + dir * 3, 581, 14, 6, dir * 0.15, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  // 1. Lớp Vải Chính & Họa Tiết Dệt + Bóng Đổ 3D Multiply trên 2 ống quần
  ctx.save();
  traceTrousersSilhouette(ctx, fitId, isHighWaisted);
  ctx.clip();

  const pattern = createWeavePattern(config.weavePattern, config.colorHex);
  if (renderMode === 'grayscale_shadow') {
    ctx.fillStyle = '#E5E3DC';
    ctx.fillRect(0, 0, W, H);
  } else {
    ctx.fillStyle = pattern || config.colorHex;
    ctx.fillRect(0, 0, W, H);
  }

  if (renderMode !== 'color_mask') {
    // Đổ bóng khối trụ 3D cho từng ống quần (Cylindrical Leg Shading)
    const leftLegGrad = ctx.createLinearGradient(
      148 - legSpread,
      200,
      250,
      200
    );
    leftLegGrad.addColorStop(0, 'rgba(0, 0, 0, 0.34)');
    leftLegGrad.addColorStop(0.28, 'rgba(0, 0, 0, 0.06)');
    leftLegGrad.addColorStop(0.52, 'rgba(255, 255, 255, 0.12)');
    leftLegGrad.addColorStop(0.75, 'rgba(0, 0, 0, 0.08)');
    leftLegGrad.addColorStop(1, 'rgba(0, 0, 0, 0.36)');
    ctx.fillStyle = leftLegGrad;
    ctx.fillRect(120, 70, 132, 500);

    const rightLegGrad = ctx.createLinearGradient(
      250,
      200,
      352 + legSpread,
      200
    );
    rightLegGrad.addColorStop(0, 'rgba(0, 0, 0, 0.36)');
    rightLegGrad.addColorStop(0.25, 'rgba(0, 0, 0, 0.08)');
    rightLegGrad.addColorStop(0.48, 'rgba(255, 255, 255, 0.12)');
    rightLegGrad.addColorStop(0.72, 'rgba(0, 0, 0, 0.06)');
    rightLegGrad.addColorStop(1, 'rgba(0, 0, 0, 0.34)');
    ctx.fillStyle = rightLegGrad;
    ctx.fillRect(248, 70, 132, 500);

    // Bóng đổ vùng đũng quần (Crotch & Upper Thigh Depth)
    const crotchGrad = ctx.createRadialGradient(250, 224, 4, 250, 224, 52);
    crotchGrad.addColorStop(0, 'rgba(0, 0, 0, 0.38)');
    crotchGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = crotchGrad;
    ctx.beginPath();
    ctx.arc(250, 224, 52, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Đường Ly Ủi Chính Giữa 2 Ống Quần (Sharp Savile Row Center Crease)
  ctx.save();
  // Cạnh sáng bên ngoài đường ly
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.24)';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(201, 130);
  ctx.lineTo(205, 554);
  ctx.moveTo(299, 130);
  ctx.lineTo(295, 554);
  ctx.stroke();

  // Cạnh tối sát đường ly tạo hiệu ứng nổi 3D sắc nét
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.38)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(202.5, 130);
  ctx.lineTo(206.5, 554);
  ctx.moveTo(297.5, 130);
  ctx.lineTo(293.5, 554);
  ctx.stroke();
  ctx.restore();

  // 3. Vẽ Ly Xếp Phía Trước (Pleats: Không ly / 1 ly / 2 ly)
  if (pleatId === 'single_pleat' || pleatId === 'double_pleat') {
    ctx.save();
    // Ly chính nối từ cạp xuống đường ly ủi
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.48)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(201, 102);
    ctx.quadraticCurveTo(198, 145, 201.5, 188);
    ctx.moveTo(299, 102);
    ctx.quadraticCurveTo(302, 145, 298.5, 188);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(199.5, 102);
    ctx.quadraticCurveTo(196.5, 145, 200, 188);
    ctx.moveTo(300.5, 102);
    ctx.quadraticCurveTo(303.5, 145, 300, 188);
    ctx.stroke();

    if (pleatId === 'double_pleat') {
      // Ly xếp thứ 2 hướng ra phía túi hông (Double Reverse Pleats)
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.44)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(184, 101);
      ctx.quadraticCurveTo(182, 138, 185, 172);
      ctx.moveTo(316, 101);
      ctx.quadraticCurveTo(318, 138, 315, 172);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(182.5, 101);
      ctx.quadraticCurveTo(180.5, 138, 183.5, 172);
      ctx.moveTo(317.5, 101);
      ctx.quadraticCurveTo(319.5, 138, 316.5, 172);
      ctx.stroke();
    }
    ctx.restore();
  }

  // 4. Vẽ Túi Trước Quần Âu (Slanted / Vertical / Frogmouth)
  ctx.save();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  if (pocketId === 'slanted') {
    // Túi chéo tiêu chuẩn
    ctx.moveTo(164, 102);
    ctx.lineTo(147 - legSpread * 0.35, 176);
    ctx.moveTo(336, 102);
    ctx.lineTo(353 + legSpread * 0.35, 176);
  } else if (pocketId === 'vertical') {
    // Túi dọc sát đường sườn quần
    ctx.moveTo(155 - legSpread * 0.15, 104);
    ctx.lineTo(150 - legSpread * 0.35, 178);
    ctx.moveTo(345 + legSpread * 0.15, 104);
    ctx.lineTo(350 + legSpread * 0.35, 178);
  } else {
    // Túi ngang Frogmouth Sartorial
    ctx.moveTo(152, 120);
    ctx.quadraticCurveTo(172, 128, 192, 118);
    ctx.moveTo(348, 120);
    ctx.quadraticCurveTo(328, 128, 308, 118);
  }
  ctx.stroke();

  // Viền sáng miệng túi
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  if (pocketId === 'slanted') {
    ctx.moveTo(165.5, 102);
    ctx.lineTo(148.5 - legSpread * 0.35, 176);
    ctx.moveTo(334.5, 102);
    ctx.lineTo(351.5 + legSpread * 0.35, 176);
  } else if (pocketId === 'vertical') {
    ctx.moveTo(156.5 - legSpread * 0.15, 104);
    ctx.lineTo(151.5 - legSpread * 0.35, 178);
    ctx.moveTo(343.5 + legSpread * 0.15, 104);
    ctx.lineTo(348.5 + legSpread * 0.35, 178);
  } else {
    ctx.moveTo(152, 121.5);
    ctx.quadraticCurveTo(172, 129.5, 192, 119.5);
    ctx.moveTo(348, 121.5);
    ctx.quadraticCurveTo(328, 129.5, 308, 119.5);
  }
  ctx.stroke();
  ctx.restore();

  // 5. Đường Nẹp Khóa Quần (Fly Front Seam - J-Stitch)
  ctx.save();
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.52)';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(250, 102);
  ctx.lineTo(250, 218);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.32)';
  ctx.lineWidth = 1.1;
  ctx.setLineDash([2, 3]);
  ctx.beginPath();
  ctx.moveTo(263, 102);
  ctx.lineTo(263, 186);
  ctx.quadraticCurveTo(263, 206, 250, 210);
  ctx.stroke();
  ctx.restore();

  // 6. Vẽ Cạp Quần (Waistband: Standard / Extended Tab / Clean)
  ctx.save();
  // Đường chân cạp quần
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(150, 101);
  ctx.quadraticCurveTo(250, 105, 350, 101);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(150, 102.5);
  ctx.quadraticCurveTo(250, 106.5, 350, 102.5);
  ctx.stroke();

  // Hàm phụ vẽ cúc cạp quần đồng bộ màu cúc áo
  const drawWaistButton = (bx: number, by: number, r = 5.6) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.arc(bx + 1, by + 1.5, r, 0, Math.PI * 2);
    ctx.fill();

    const isMetal =
      config.buttonId === 'gold_brass' ||
      (config.customButtonId &&
        [
          'shiny_gold_brass',
          'gold_brass',
          'silver_brass',
          'antique_silver_brass',
        ].includes(config.customButtonId));

    ctx.fillStyle = isMetal ? '#D4AF37' : '#262422';
    ctx.strokeStyle = isMetal ? '#FFF3B0' : 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(bx, by, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  };

  if (waistbandId === 'standard') {
    // Đỉa quần (Belt Loops) + Cúc giữa tiêu chuẩn
    [172, 212, 288, 328].forEach((lx) => {
      ctx.fillStyle = pattern || config.colorHex;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.48)';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.roundRect(lx - 3.5, waistTopY, 7, 104 - waistTopY, 2);
      ctx.fill();
      ctx.stroke();
    });
    ctx.beginPath();
    ctx.moveTo(250, waistTopY + 2);
    ctx.lineTo(250, 102);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.stroke();
    drawWaistButton(256, (waistTopY + 102) / 2, 5.5);
    if (isHighWaisted) {
      drawWaistButton(256, waistTopY + 13, 5.0);
      drawWaistButton(256, 90, 5.0);
    }
  } else if (waistbandId === 'extended_tab') {
    // Cạp chéo dài Sartorial (Extended Pointed Tab) + khóa tăng đơ hông (Side Adjusters)
    const tabMidY = (waistTopY + 101) / 2;
    ctx.fillStyle = pattern || config.colorHex;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.58)';
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(244, waistTopY + 2);
    ctx.lineTo(288, waistTopY + 3);
    ctx.lineTo(298, tabMidY);
    ctx.lineTo(288, 100);
    ctx.lineTo(244, 102);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    drawWaistButton(284, tabMidY, 5.2);
    if (isHighWaisted) {
      drawWaistButton(262, tabMidY, 5.0);
    }

    // Khóa kim loại Side-Tab 2 bên hông cạp
    [164, 336].forEach((sx) => {
      ctx.strokeStyle = '#C9B07A';
      ctx.lineWidth = 1.4;
      ctx.strokeRect(sx - 5, tabMidY - 5, 10, 10);
    });
  } else if (waistbandId === 'gurkha') {
    // Cạp cao Gurkha Bespoke: Đai kép bắt chéo với 2 khóa đồng thau đối xứng 2 bên hông
    ctx.fillStyle = pattern || config.colorHex;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.62)';
    ctx.lineWidth = 1.3;
    // Đai trên kéo sang phải
    ctx.beginPath();
    ctx.moveTo(196, waistTopY + 3);
    ctx.lineTo(316, waistTopY + 5);
    ctx.lineTo(324, waistTopY + 14);
    ctx.lineTo(316, waistTopY + 22);
    ctx.lineTo(196, waistTopY + 21);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Đai dưới kéo sang trái
    ctx.beginPath();
    ctx.moveTo(304, waistTopY + 22);
    ctx.lineTo(184, waistTopY + 24);
    ctx.lineTo(176, waistTopY + 32);
    ctx.lineTo(184, 100);
    ctx.lineTo(304, 100);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // 2 khóa đồng Gurkha
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.6;
    ctx.strokeRect(306, waistTopY + 7, 9, 13);
    ctx.strokeRect(185, waistTopY + 25, 9, 13);
  } else {
    // Cạp trơn tối giản (Clean Hook-and-Bar Waistband, ẩn cúc)
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.48)';
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(258, waistTopY + 2);
    ctx.lineTo(258, 102);
    ctx.stroke();
  }
  ctx.restore();

  // 7. Vẽ Gấu Quần (Cuffs: Gấu trơn vs Gấu lơ-vê 4cm)
  if (cuffId === 'cuffed') {
    ctx.save();
    const cuffTopY = 534;
    // Bóng đổ mép trên gấu lơ-vê
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.55)';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(206 - ankleHalfW, cuffTopY);
    ctx.quadraticCurveTo(206, cuffTopY + 3, 206 + ankleHalfW, cuffTopY);
    ctx.moveTo(294 - ankleHalfW, cuffTopY);
    ctx.quadraticCurveTo(294, cuffTopY + 3, 294 + ankleHalfW, cuffTopY);
    ctx.stroke();

    // Đường sáng mép gập lơ-vê
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(206 - ankleHalfW, cuffTopY + 2);
    ctx.quadraticCurveTo(206, cuffTopY + 5, 206 + ankleHalfW, cuffTopY + 2);
    ctx.moveTo(294 - ankleHalfW, cuffTopY + 2);
    ctx.quadraticCurveTo(294, cuffTopY + 5, 294 + ankleHalfW, cuffTopY + 2);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();

  // Viền ngoài sắc nét cho toàn bộ Quần Âu 2D
  ctx.save();
  traceTrousersSilhouette(ctx, fitId, isHighWaisted);
  ctx.strokeStyle = 'rgba(20, 20, 19, 0.65)';
  ctx.lineWidth = 1.4;
  ctx.stroke();
  ctx.restore();
}

