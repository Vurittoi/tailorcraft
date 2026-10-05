import React from 'react';
import { Copy, Download } from 'lucide-react';

interface SpecSheetJsonTabProps {
  specJsonData: Record<string, unknown>;
  copiedJson: boolean;
  onCopySpecJson: () => void;
  onDownloadSpecJson: () => void;
}

export function SpecSheetJsonTab({
  specJsonData,
  copiedJson,
  onCopySpecJson,
  onDownloadSpecJson,
}: SpecSheetJsonTabProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-[#141413]">
          Cấu trúc dữ liệu Spec Sheet (`CustomizationJSON` +
          `BodyMeasurements`):
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCopySpecJson}
            className="px-3 py-1.5 text-xs font-semibold border border-[#D8D4CC] rounded-lg hover:border-[#141413] flex items-center gap-1.5 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedJson ? 'Đã sao chép JSON!' : 'Sao chép JSON'}</span>
          </button>
          <button
            type="button"
            onClick={onDownloadSpecJson}
            className="px-3 py-1.5 text-xs font-semibold bg-[#141413] text-white rounded-lg hover:bg-[#2A2826] flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải file .JSON</span>
          </button>
        </div>
      </div>

      <pre className="p-4 rounded-xl bg-[#141413] text-[#EAE7E1] font-mono-tabular text-xs overflow-x-auto max-h-[420px] leading-relaxed">
        {JSON.stringify(specJsonData, null, 2)}
      </pre>
    </div>
  );
}
