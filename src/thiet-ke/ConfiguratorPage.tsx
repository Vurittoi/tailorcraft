import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PenTool, Scissors, Sliders, Sparkles } from 'lucide-react';
import { FABRIC_CATALOG, FabricOption } from '../fabricCatalogData';
import {
  buildOffscreenFabricAndTextureLayers,
  OffscreenSuitLayerBundle,
  prewarmOffscreenSuitLayers,
   renderSuitCanvas,
  RenderOptions,
  SuitConfigState,
} from '../suitCanvasEngine';
import {
  BodyMeasurements,
  BUTTON_OPTIONS,
  LAPEL_OPTIONS,
  NavPage,
  POCKET_OPTIONS,
  StyleOptionItem,
} from '../types/suitTypes';
import { Canvas2DViewport } from './Canvas2DViewport';
import { FabricSelectionTab } from './FabricSelectionTab';
import { StyleSelectionTab } from './StyleSelectionTab';
import { ConfiguratorFooter } from './ConfiguratorFooter';

const ALL_WEAVE_PATTERNS: SuitConfigState['weavePattern'][] = [
  'solid',
  'herringbone',
  'pinstripe',
  'glen_check',
  'birdseye',
];

interface ConfiguratorPageProps {
  config: SuitConfigState;
  setConfig: React.Dispatch<React.SetStateAction<SuitConfigState>>;
  measurements: BodyMeasurements;
  renderOpts: RenderOptions;
  editingOrderId: string | null;
  setEditingOrderId: React.Dispatch<React.SetStateAction<string | null>>;
  isDraggingCanvas: boolean;
  isHoveringCanvas: boolean;
  setIsHoveringCanvas: React.Dispatch<React.SetStateAction<boolean>>;
  handleCanvasViewportRef: (node: HTMLDivElement | null) => void;
  handleCanvasRef: (node: HTMLCanvasElement | null) => void;
  handleCanvasMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleCanvasMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleCanvasMouseUp: () => void;
  handleCanvasDoubleClick: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  handleZoom: (delta: number) => void;
  handleSetZoomSmooth: (targetZoom: number) => void;
  handleResetView: () => void;
  handleFocusBreastPocket: () => void;
  handleDownloadPNG: () => void;
  handleSelectFabric: (fabric: FabricOption) => void;
  handleOpenOrderSummary: () => void;
  navigateToPage: (targetPage: NavPage) => void;
  styleAddonPrice: number;
  totalEstimatedPrice: number;
  currentTargetZoom: number;
  fabrics?: FabricOption[];
  lapelOptions?: StyleOptionItem<'notch' | 'peak'>[];
  buttonOptions?: StyleOptionItem<'single' | 'double_two' | 'gold_brass'>[];
  pocketOptions?: StyleOptionItem<'flap' | 'jetted' | 'patched'>[];
}

export function ConfiguratorPage({
  config,
  setConfig,
  measurements,
  renderOpts,
  editingOrderId,
  setEditingOrderId,
  isDraggingCanvas,
  isHoveringCanvas,
  setIsHoveringCanvas,
  handleCanvasViewportRef,
  handleCanvasRef,
  handleCanvasMouseDown,
  handleCanvasMouseMove,
  handleCanvasMouseUp,
  handleCanvasDoubleClick,
  handleZoom,
  handleSetZoomSmooth,
  handleResetView,
  handleFocusBreastPocket,
  handleDownloadPNG,
  handleSelectFabric,
  handleOpenOrderSummary,
  navigateToPage,
  styleAddonPrice,
  totalEstimatedPrice,
  currentTargetZoom,
  fabrics = FABRIC_CATALOG,
  lapelOptions = LAPEL_OPTIONS,
  buttonOptions = BUTTON_OPTIONS,
  pocketOptions = POCKET_OPTIONS,
}: ConfiguratorPageProps) {
  const [activeControlTab, setActiveControlTab] = useState<
    'fabric' | 'style' | 'trousers' | 'details'
  >('fabric');

  // ============================================================================
  // OFFSCREEN RENDERING CHO CÁC LAYER VẢI (FABRIC) & HỌA TIẾT DỆT (TEXTURE)
  // Tách biệt hoàn toàn việc kết xuất họa tiết dệt, bóng đổ 3D Multiply và đường may
  // ra Offscreen Buffer / ImageBitmap để khi người dùng Zoom / Pan chỉ thực hiện
  // thao tác Blit (drawImage) tốc độ cao, giảm tải tối đa cho Main Thread.
  // ============================================================================
  const activeCanvasNodeRef = useRef<HTMLCanvasElement | null>(null);
  const offscreenLayerBundleRef = useRef<OffscreenSuitLayerBundle | null>(null);
  const offscreenBitmapCacheRef = useRef<
    Map<
      string,
      {
        fabricBitmap?: ImageBitmap;
        textureBitmap?: ImageBitmap;
        compositeBitmap?: ImageBitmap;
      }
    >
  >(new Map());

  // Khoá định danh cấu hình đồ họa tĩnh (không phụ thuộc vào toạ độ zoom/panX/panY)
  const offscreenStaticLayerKey = useMemo(
    () =>
      [
        config.garmentView ?? 'jacket',
        config.fabricId,
        config.colorHex,
        config.weavePattern,
        config.jacketStyleId ?? 'sb_2_buttons',
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
        renderOpts.renderMode,
      ].join('__'),
    [
      config.garmentView,
      config.fabricId,
      config.colorHex,
      config.weavePattern,
      config.jacketStyleId,
      config.suitPieceId,
      config.lapelId,
      config.lapelWidthId,
      config.buttonId,
      config.customButtonId,
      config.pocketId,
      config.necktieId,
      config.trouserStyleId,
      config.trouserRiseId,
      config.trouserFitId,
      config.trouserPleatId,
      config.trouserWaistbandId,
      config.trouserPocketId,
      config.trouserCuffId,
      config.monogramText,
      config.monogramColor,
      config.monogramStyle,
      config.monogramOffsetX,
      config.monogramOffsetY,
      renderOpts.renderMode,
    ]
  );

  // 1. Dựng & cập nhật các Offscreen Layer (Fabric Base, Weave Texture, Shaded Multiply, Composite 2x)
  // chỉ khi cấu hình trang phục/vải thay đổi — KHÔNG chạy lại khi chỉ thay đổi zoom / panX / panY
  useEffect(() => {
    const canvasWidth = activeCanvasNodeRef.current?.width || 500;
    const canvasHeight = activeCanvasNodeRef.current?.height || 650;

    const bundle = buildOffscreenFabricAndTextureLayers(
      config,
      canvasWidth,
      canvasHeight,
      renderOpts.renderMode
    );
    offscreenLayerBundleRef.current = bundle;

    // Nếu trình duyệt hỗ trợ createImageBitmap & OffscreenCanvas, chuyển đổi sẵn các layer sang GPU ImageBitmap
    let cancelled = false;
    if (typeof window !== 'undefined' && 'createImageBitmap' in window) {
      const existingBitmaps = offscreenBitmapCacheRef.current.get(
        offscreenStaticLayerKey
      );
      if (!existingBitmaps) {
        Promise.all([
          window.createImageBitmap(bundle.fabricBaseBuffer),
          window.createImageBitmap(bundle.weaveTextureBuffer),
          window.createImageBitmap(bundle.compositeGarmentBuffer),
        ])
          .then(([fabricBitmap, textureBitmap, compositeBitmap]) => {
            if (cancelled) {
              fabricBitmap.close();
              textureBitmap.close();
              compositeBitmap.close();
              return;
            }
            // Giữ tối đa 12 bộ ImageBitmap trong bộ nhớ GPU để tránh rò rỉ VRAM
            if (offscreenBitmapCacheRef.current.size >= 12) {
              const oldestKey = offscreenBitmapCacheRef.current
                .keys()
                .next().value;
              if (oldestKey) {
                const oldEntry =
                  offscreenBitmapCacheRef.current.get(oldestKey);
                oldEntry?.fabricBitmap?.close();
                oldEntry?.textureBitmap?.close();
                oldEntry?.compositeBitmap?.close();
                offscreenBitmapCacheRef.current.delete(oldestKey);
              }
            }
            offscreenBitmapCacheRef.current.set(offscreenStaticLayerKey, {
              fabricBitmap,
              textureBitmap,
              compositeBitmap,
            });
          })
          .catch(() => {
            // Fallback an toàn về Offscreen HTMLCanvasElement nếu trình duyệt từ chối ImageBitmap
          });
      }
    }

    return () => {
      cancelled = true;
    };
  }, [config, offscreenStaticLayerKey, renderOpts.renderMode]);

  // 2. Pre-warm (kết xuất ngầm trong thời gian rảnh của trình duyệt) cho 5 kiểu dệt Texture của mẫu vải hiện tại
  // và các mẫu vải lân cận để khi người dùng chuyển đổi hoặc phóng to kiểm tra thớ vải không gây trễ Main Thread
  useEffect(() => {
    let isCancelled = false;
    const scheduleIdle =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (cb: () => void) =>
            (
              window as unknown as {
                requestIdleCallback: (
                  fn: () => void,
                  opts?: { timeout: number }
                ) => number;
              }
            ).requestIdleCallback(cb, { timeout: 600 })
        : (cb: () => void) => window.setTimeout(cb, 80);

    const cancelIdle =
      typeof window !== 'undefined' && 'cancelIdleCallback' in window
        ? (id: number) =>
            (
              window as unknown as {
                cancelIdleCallback: (handle: number) => void;
              }
            ).cancelIdleCallback(id)
        : (id: number) => window.clearTimeout(id);

    let patternIdx = 0;
    let idleHandle: number | null = null;

    const warmNextTextureLayer = () => {
      if (isCancelled || isDraggingCanvas) return;
      if (patternIdx < ALL_WEAVE_PATTERNS.length) {
        const weave = ALL_WEAVE_PATTERNS[patternIdx++];
        if (weave !== config.weavePattern) {
          prewarmOffscreenSuitLayers(
            { ...config, weavePattern: weave },
            500,
            650,
            renderOpts.renderMode
          );
        }
        idleHandle = scheduleIdle(warmNextTextureLayer);
      }
    };

    idleHandle = scheduleIdle(warmNextTextureLayer);

    return () => {
      isCancelled = true;
      if (idleHandle !== null) {
        cancelIdle(idleHandle);
      }
    };
  }, [config, isDraggingCanvas, renderOpts.renderMode]);

  // Giải phóng toàn bộ GPU ImageBitmap khi rời khỏi trang ConfiguratorPage
  useEffect(() => {
    const cacheMap = offscreenBitmapCacheRef.current;
    return () => {
      cacheMap.forEach((entry) => {
        entry.fabricBitmap?.close();
        entry.textureBitmap?.close();
        entry.compositeBitmap?.close();
      });
      cacheMap.clear();
    };
  }, []);

  // Kết nối ref của Canvas chính vừa khởi tạo Offscreen Buffer vừa đồng bộ với App.tsx
  const handleOffscreenAwareCanvasRef = useCallback(
    (node: HTMLCanvasElement | null) => {
      activeCanvasNodeRef.current = node;
      if (node) {
        offscreenLayerBundleRef.current = buildOffscreenFabricAndTextureLayers(
          config,
          node.width || 500,
          node.height || 650,
          renderOpts.renderMode
        );
        renderSuitCanvas(node, config, renderOpts);
      }
      handleCanvasRef(node);
    },
    [config, handleCanvasRef, renderOpts]
  );

  const controlScrollRef = useRef<HTMLDivElement | null>(null);
  const canvasSectionElRef = useRef<HTMLElement | null>(null);
  const [matchedCanvasHeight, setMatchedCanvasHeight] = useState<number | null>(
    null
  );

  // Tự động đồng bộ chiều cao của Form Tùy Chỉnh bằng khít với khung Thiết Kế 2D bên trái
  useEffect(() => {
    const sectionEl = canvasSectionElRef.current;
    if (!sectionEl) return;

    const updateHeight = () => {
      const nextHeight = Math.round(sectionEl.getBoundingClientRect().height);
      if (nextHeight > 300) {
        setMatchedCanvasHeight(nextHeight);
      }
    };

    updateHeight();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateHeight();
      });
      resizeObserver.observe(sectionEl);
    }

    window.addEventListener('resize', updateHeight);
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [config.monogramText, renderOpts.zoom]);

  const controlAsideWheelCleanupRef = useRef<(() => void) | null>(null);
  const handleControlAsideRef = useCallback((asideEl: HTMLElement | null) => {
    if (controlAsideWheelCleanupRef.current) {
      controlAsideWheelCleanupRef.current();
      controlAsideWheelCleanupRef.current = null;
    }
    if (!asideEl) return;

    const handleAsideWheel = (e: WheelEvent) => {
      const scrollEl = controlScrollRef.current;
      if (!scrollEl) return;

      e.preventDefault();
      e.stopPropagation();

      const deltaMultiplier =
        e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? scrollEl.clientHeight : 1;
      scrollEl.scrollTop += e.deltaY * deltaMultiplier;
    };

    asideEl.addEventListener('wheel', handleAsideWheel, { passive: false });
    controlAsideWheelCleanupRef.current = () => {
      asideEl.removeEventListener('wheel', handleAsideWheel);
    };
  }, []);

  return (
    <main
      id="configurator"
      className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
    >
      {/* KHU VỰC MÔ PHỎNG 2D CANVAS (BÊN TRÁI - 6 CỘT) */}
      <Canvas2DViewport
        sectionRef={canvasSectionElRef}
        config={config}
        setConfig={setConfig}
        renderOpts={renderOpts}
        isDraggingCanvas={isDraggingCanvas}
        isHoveringCanvas={isHoveringCanvas}
        setIsHoveringCanvas={setIsHoveringCanvas}
        handleCanvasViewportRef={handleCanvasViewportRef}
        handleCanvasRef={handleOffscreenAwareCanvasRef}
        handleCanvasMouseDown={handleCanvasMouseDown}
        handleCanvasMouseMove={handleCanvasMouseMove}
        handleCanvasMouseUp={handleCanvasMouseUp}
        handleCanvasDoubleClick={handleCanvasDoubleClick}
        handleZoom={handleZoom}
        handleSetZoomSmooth={handleSetZoomSmooth}
        handleResetView={handleResetView}
        handleFocusBreastPocket={handleFocusBreastPocket}
        handleDownloadPNG={handleDownloadPNG}
      />

      {/* KHU VỰC BÊN PHẢI (6 CỘT): FORM TÙY CHỈNH MỞ RỘNG + CỘT TAB Ở NGOÀI BÊN PHẢI */}
      <div className="lg:col-span-6 flex flex-col-reverse lg:flex-row items-stretch lg:items-start gap-2.5">
        {/* FORM TÙY CHỈNH CHÍNH (CHIỀU CAO BẰNG KHÍT VỚI KHUNG THIẾT KẾ 2D BÊN TRÁI) */}
        <aside
          ref={handleControlAsideRef}
          style={{
            height: matchedCanvasHeight ? `${matchedCanvasHeight}px` : '850px',
          }}
          className="flex-1 min-w-0 bg-white border border-[#E5E2DC] rounded-xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden overscroll-contain"
        >
          <div className="shrink-0">
            <div className="border-b border-[#EAE7E1] pb-3 mb-3.5">
              {editingOrderId && (
                <div className="mb-2.5 px-3 py-2 rounded-lg bg-[#FAF6F0] border border-[#D4B07B] flex items-center justify-between gap-2">
                  <div className="text-[11px] font-semibold text-[#8C6D46]">
                    Đang chỉnh sửa đơn{' '}
                    <span className="font-mono-tabular">#{editingOrderId}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingOrderId(null)}
                    className="text-[11px] text-[#65615B] hover:text-[#141413] underline cursor-pointer"
                  >
                    Hủy sửa đơn
                  </button>
                </div>
              )}
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs text-[#8C6D46] font-medium">
                  TAILOR CRAFT STUDIO
                </div>
                <span className="text-[11px] text-[#65615B]">
                  Lăn chuột để cuộn mục tùy chỉnh ↕
                </span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#141413] mt-0.5">
                Tùy Chỉnh Trang Phục Nam
              </h1>
              <p className="text-xs text-[#65615B] mt-1">
                Lựa chọn chất liệu vải và cấu trúc cắt may theo phong cách riêng
                của quý khách.
              </p>
            </div>
          </div>

          {activeControlTab === 'fabric' ? (
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
              <FabricSelectionTab
                config={config}
                setConfig={setConfig}
                fabrics={fabrics}
                handleSelectFabric={handleSelectFabric}
                scrollContainerRef={controlScrollRef}
              />
            </div>
          ) : (
            <div
              ref={controlScrollRef}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1.5 space-y-5"
            >
              <StyleSelectionTab
                config={config}
                setConfig={setConfig}
                renderOpts={renderOpts}
                currentTargetZoom={currentTargetZoom}
                lapelOptions={lapelOptions}
                buttonOptions={buttonOptions}
                pocketOptions={pocketOptions}
                handleResetView={handleResetView}
                handleFocusBreastPocket={handleFocusBreastPocket}
                mode={
                  activeControlTab === 'details'
                    ? 'details'
                    : activeControlTab === 'trousers'
                    ? 'trousers'
                    : 'style'
                }
              />
            </div>
          )}

          <ConfiguratorFooter
            config={config}
            measurements={measurements}
            styleAddonPrice={styleAddonPrice}
            totalEstimatedPrice={totalEstimatedPrice}
            navigateToPage={navigateToPage}
            handleOpenOrderSummary={handleOpenOrderSummary}
          />
        </aside>

        {/* THANH 4 TAB TÙY CHỌN (VẢI & MÀU SẮC / KIỂU DÁNG ÁO / CHI TIẾT / QUẦN ÂU) ĐẶT NGOÀI BÊN PHẢI FORM */}
        <nav
          aria-label="Chuyển đổi mục tùy chỉnh Vải, Kiểu dáng Áo, Chi tiết và Quần Âu"
          className="w-full lg:w-[116px] shrink-0 grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-col gap-2 lg:sticky lg:top-20"
        >
          <button
            type="button"
            onClick={() => {
              setActiveControlTab('fabric');
              if (controlScrollRef.current) {
                controlScrollRef.current.scrollTop = 0;
              }
            }}
            className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex lg:flex-col items-center lg:items-start gap-2 ${
              activeControlTab === 'fabric'
                ? 'bg-[#141413] text-white border-[#141413] shadow-sm'
                : 'bg-white text-[#65615B] border-[#E5E2DC] hover:border-[#8C6D46] hover:text-[#141413]'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                activeControlTab === 'fabric'
                  ? 'bg-[#8C6D46] text-white'
                  : 'bg-[#F1EFEA] text-[#8C6D46]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold leading-snug">
                Vải & Màu Sắc
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveControlTab('style');
              setConfig((prev) => ({ ...prev, garmentView: 'jacket' }));
              if (controlScrollRef.current) {
                controlScrollRef.current.scrollTop = 0;
              }
            }}
            className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex lg:flex-col items-center lg:items-start gap-2 ${
              activeControlTab === 'style'
                ? 'bg-[#141413] text-white border-[#141413] shadow-sm'
                : 'bg-white text-[#65615B] border-[#E5E2DC] hover:border-[#8C6D46] hover:text-[#141413]'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                activeControlTab === 'style'
                  ? 'bg-[#8C6D46] text-white'
                  : 'bg-[#F1EFEA] text-[#8C6D46]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold leading-snug">
                Kiểu Dáng Áo
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveControlTab('details');
              setConfig((prev) => ({ ...prev, garmentView: 'jacket' }));
              if (controlScrollRef.current) {
                controlScrollRef.current.scrollTop = 0;
              }
            }}
            className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex lg:flex-col items-center lg:items-start gap-2 ${
              activeControlTab === 'details'
                ? 'bg-[#141413] text-white border-[#141413] shadow-sm'
                : 'bg-white text-[#65615B] border-[#E5E2DC] hover:border-[#8C6D46] hover:text-[#141413]'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                activeControlTab === 'details'
                  ? 'bg-[#8C6D46] text-white'
                  : 'bg-[#F1EFEA] text-[#8C6D46]'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold leading-snug">
                Chi Tiết
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveControlTab('trousers');
              setConfig((prev) => ({ ...prev, garmentView: 'trousers' }));
              if (controlScrollRef.current) {
                controlScrollRef.current.scrollTop = 0;
              }
            }}
            className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex lg:flex-col items-center lg:items-start gap-2 ${
              activeControlTab === 'trousers'
                ? 'bg-[#141413] text-white border-[#141413] shadow-sm'
                : 'bg-white text-[#65615B] border-[#E5E2DC] hover:border-[#8C6D46] hover:text-[#141413]'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                activeControlTab === 'trousers'
                  ? 'bg-[#8C6D46] text-white'
                  : 'bg-[#F1EFEA] text-[#8C6D46]'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold leading-snug">
                Quần Âu
              </div>
            </div>
          </button>
        </nav>
      </div>
    </main>
  );
}
