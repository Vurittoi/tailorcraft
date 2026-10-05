import React from 'react';
import { Download, Minus, Plus, RotateCcw } from 'lucide-react';
import { RenderOptions, SuitConfigState } from '../suitCanvasEngine';

interface Canvas2DViewportProps {
  config: SuitConfigState;
  setConfig?: React.Dispatch<React.SetStateAction<SuitConfigState>>;
  renderOpts: RenderOptions;
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
  sectionRef?: React.Ref<HTMLElement>;
}

export function Canvas2DViewport({
  config,
  setConfig,
  renderOpts,
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
  sectionRef,
}: Canvas2DViewportProps) {
  const isTrousersView = config.garmentView === 'trousers';

  return (
    <section
      ref={sectionRef}
      className="lg:col-span-6 h-fit bg-[#F1EFEA] border border-[#E2DFD7] rounded-xl p-4 sm:p-6 flex flex-col items-center"
    >
      <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b border-[#E2DFD7] text-xs text-[#65615B]">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-[#141413]">
            {config.fabricName}
          </span>
          <span aria-hidden="true">·</span>
          {isTrousersView ? (
            <>
              <span>{config.trouserStyleName ?? 'Quần không xếp ly (Flat Front)'}</span>
              <span aria-hidden="true">·</span>
              <span>{config.trouserRiseName ?? 'Cạp tiêu chuẩn'}</span>
              <span aria-hidden="true">·</span>
              <span>{config.trouserFitName ?? 'Ống đứng chuẩn'}</span>
              <span aria-hidden="true">·</span>
              <span>{config.trouserPleatName ?? 'Không xếp ly'}</span>
              <span aria-hidden="true">·</span>
              <span>{config.trouserCuffName ?? 'Gấu trơn'}</span>
            </>
          ) : (
            <>
              <span>{config.lapelName}</span>
              <span aria-hidden="true">·</span>
              <span>{config.buttonName}</span>
              <span aria-hidden="true">·</span>
              <span>{config.pocketName}</span>
              {config.monogramText.trim() && (
                <>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={handleFocusBreastPocket}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#FAF5EB] border border-[#D4AF37]/50 text-[#8C6D46] font-semibold hover:bg-[#F3E9D2] transition-colors cursor-pointer"
                    title="Nhấn để phóng to vị trí thêu túi ngực trên Canvas 2D"
                  >
                    <span>Thêu túi ngực: "{config.monogramText.trim()}"</span>
                  </button>
                </>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {setConfig && (
            <div className="inline-flex items-center bg-[#E5E2DC] p-0.5 rounded-lg border border-[#D5D0C5]">
              <button
                type="button"
                onClick={() =>
                  setConfig((prev) => ({ ...prev, garmentView: 'jacket' }))
                }
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  !isTrousersView
                    ? 'bg-[#141413] text-white shadow-2xs'
                    : 'text-[#65615B] hover:text-[#141413]'
                }`}
              >
                Áo Vest
              </button>
              <button
                type="button"
                onClick={() =>
                  setConfig((prev) => ({ ...prev, garmentView: 'trousers' }))
                }
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  isTrousersView
                    ? 'bg-[#141413] text-white shadow-2xs'
                    : 'text-[#65615B] hover:text-[#141413]'
                }`}
              >
                Quần Âu
              </button>
            </div>
          )}
          <span className="font-mono-tabular text-[11px] text-[#8C6D46]">
            {Math.round(renderOpts.zoom * 100)}%
          </span>
        </div>
      </div>

      <div
        ref={handleCanvasViewportRef}
        onMouseEnter={() => setIsHoveringCanvas(true)}
        onMouseLeave={() => {
          setIsHoveringCanvas(false);
          handleCanvasMouseUp();
        }}
        className={`relative w-full flex justify-center items-center bg-[#E8E4DC] rounded-lg py-3 px-2 overflow-hidden border transition-all duration-300 select-none ${
          isHoveringCanvas
            ? 'border-[#8C6D46] shadow-md ring-2 ring-[#8C6D46]/15'
            : 'border-[#DCD7CD]'
        }`}
      >
        <canvas
          id="suitCanvas"
          ref={handleCanvasRef}
          width={500}
          height={650}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onDoubleClick={handleCanvasDoubleClick}
          className={`max-w-full h-auto rounded shadow-xs transition-shadow duration-300 ${
            isDraggingCanvas ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        />
      </div>

      <div className="w-full mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 bg-[#F9F8F6] border border-[#DCD7CD] p-1.5 rounded-lg">
          <button
            type="button"
            onClick={() => handleZoom(-0.18)}
            className="px-2.5 py-1.5 text-xs font-medium text-[#141413] hover:bg-[#EAE6DF] rounded transition-all duration-200 active:scale-95 flex items-center gap-1 whitespace-nowrap cursor-pointer"
            title="Thu nhỏ bản thiết kế"
          >
            <Minus className="w-3.5 h-3.5" />
            <span>Thu nhỏ</span>
          </button>

          <input
            type="range"
            min={0.75}
            max={2.25}
            step={0.02}
            value={renderOpts.zoom}
            onChange={(e) => handleSetZoomSmooth(Number(e.target.value))}
            aria-label="Thanh trượt phóng to thu nhỏ"
            className="w-24 sm:w-28 accent-[#141413] cursor-pointer h-1.5 bg-[#DCD7CD] rounded-lg mx-1"
          />

          <button
            type="button"
            onClick={() => handleZoom(0.18)}
            className="px-2.5 py-1.5 text-xs font-medium text-[#141413] hover:bg-[#EAE6DF] rounded transition-all duration-200 active:scale-95 flex items-center gap-1 whitespace-nowrap cursor-pointer"
            title="Phóng to bản thiết kế"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Phóng to</span>
          </button>
          <button
            type="button"
            onClick={handleResetView}
            className="px-2.5 py-1.5 text-xs font-medium text-[#141413] hover:bg-[#EAE6DF] rounded transition-all duration-200 active:scale-95 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            title="Đưa về góc nhìn mặc định"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset góc nhìn</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleDownloadPNG}
          className="px-4 py-2 text-xs font-semibold bg-white border border-[#141413] text-[#141413] hover:bg-[#141413] hover:text-white rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Tải ảnh bản thiết kế (.PNG)</span>
        </button>
      </div>
    </section>
  );
}
