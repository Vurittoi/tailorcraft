import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Database,
  Server,
  Layers,
  Code2,
  Cpu,
  RefreshCw,
  FileCode,
  ExternalLink,
  Copy,
  Check,
  X,
} from 'lucide-react';
import { apiService, StackInfo } from '../services/apiService';

interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TechStackModal({ isOpen, onClose }: TechStackModalProps) {
  const [stackInfo, setStackInfo] = useState<StackInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'mysql' | 'mongodb'>('overview');
  const [copied, setCopied] = useState(false);
  const [schemaContent, setSchemaContent] = useState<string>('');
  const [isSwitching, setIsSwitching] = useState(false);

  const loadInfo = async () => {
    setLoading(true);
    const info = await apiService.getStackInfo();
    setStackInfo(info);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadInfo();
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeTab === 'mysql') {
      apiService.getExportSql().then(setSchemaContent).catch(() => setSchemaContent(''));
    } else if (activeTab === 'mongodb') {
      apiService.getExportMongo().then(setSchemaContent).catch(() => setSchemaContent(''));
    }
  }, [activeTab]);

  const handleSwitchDb = async (type: 'mongodb' | 'mysql') => {
    setIsSwitching(true);
    await apiService.switchDbType(type);
    await loadInfo();
    setIsSwitching(false);
  };

  const handleCopy = () => {
    if (!schemaContent) return;
    navigator.clipboard.writeText(schemaContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF9F6] border border-[#E5E2DC] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EAE7E1] bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#141413] text-[#FAF9F6] flex items-center justify-center shadow-xs">
              <Cpu className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-[#141413]">
                Kiến Trúc Công Nghệ & Cơ Sở Dữ Liệu
              </h2>
              <p className="text-xs text-[#78716C]">
                Chuẩn hóa theo bảng hạng mục: HTML5 Canvas API, React.js, Node.js & Express.js, MongoDB / MySQL
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#78716C] hover:text-[#141413] hover:bg-[#F1EFEA] rounded-lg transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="px-6 py-2 border-b border-[#EAE7E1] bg-[#F9F8F5] flex items-center gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#141413] text-white shadow-xs'
                : 'text-[#65615B] hover:text-[#141413] hover:bg-white'
            }`}
          >
            Tổng Quan Hạng Mục
          </button>
          <button
            onClick={() => setActiveTab('mongodb')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'mongodb'
                ? 'bg-[#141413] text-white shadow-xs'
                : 'text-[#65615B] hover:text-[#141413] hover:bg-white'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-500" />
            MongoDB Collections
          </button>
          <button
            onClick={() => setActiveTab('mysql')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'mysql'
                ? 'bg-[#141413] text-white shadow-xs'
                : 'text-[#65615B] hover:text-[#141413] hover:bg-white'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-blue-500" />
            MySQL Relational Schema
          </button>
          <button
            onClick={loadInfo}
            disabled={loading}
            className="ml-auto p-1.5 text-[#78716C] hover:text-[#141413] hover:bg-white rounded-lg transition-colors cursor-pointer"
            title="Làm mới trạng thái"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {activeTab === 'overview' ? (
            <>
              {/* Bảng so khớp hạng mục yêu cầu */}
              <div className="border border-[#E5E2DC] rounded-xl overflow-hidden bg-white shadow-xs">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#F4F2ED] border-b border-[#E5E2DC] text-[#141413] text-xs font-bold uppercase tracking-wider">
                      <th className="py-3 px-4 w-1/4">Hạng mục</th>
                      <th className="py-3 px-4 w-1/3">Công nghệ / Công cụ</th>
                      <th className="py-3 px-4">Tình trạng tích hợp & Chức năng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE7E1] text-xs">
                    {/* Row 1: HTML5 Canvas API */}
                    <tr className="hover:bg-[#FAF9F6]">
                      <td className="py-3.5 px-4 font-semibold text-[#141413] flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-[#8C6D46]" />
                        Frontend
                      </td>
                      <td className="py-3.5 px-4 font-mono font-medium text-[#141413] bg-[#FAF9F6]/80">
                        HTML5 Canvas API
                      </td>
                      <td className="py-3.5 px-4 text-[#44403C]">
                        <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Đang hoạt động trực tiếp (Realtime Canvas 2D)
                        </div>
                        Mô phỏng 2D Vest (2 mảnh/3 mảnh) & Quần Âu Bespoke, dựng vân dệt vải thời gian thực, cúc áo, ve áo, độ rộng ve, cà vạt, ly quần, cạp cao Gurkha.
                      </td>
                    </tr>

                    {/* Row 2: JavaScript (ES6+) / React.js */}
                    <tr className="hover:bg-[#FAF9F6]">
                      <td className="py-3.5 px-4 font-semibold text-[#141413]">
                        Frontend (tiếp)
                      </td>
                      <td className="py-3.5 px-4 font-mono font-medium text-[#141413] bg-[#FAF9F6]/80">
                        JavaScript (ES6+) / React.js
                      </td>
                      <td className="py-3.5 px-4 text-[#44403C]">
                        <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          React.js 19 SPA + TypeScript ES6+
                        </div>
                        Giao diện tùy biến theo component, quản lý trạng thái đơn hàng, giỏ hàng, bảng số đo 3D/2D, tab chuyển đổi Áo Vest, Chi tiết & Quần Âu.
                      </td>
                    </tr>

                    {/* Row 3: Node.js & Express.js */}
                    <tr className="hover:bg-[#FAF9F6]">
                      <td className="py-3.5 px-4 font-semibold text-[#141413] flex items-center gap-1.5">
                        <Server className="w-4 h-4 text-[#8C6D46]" />
                        Backend
                      </td>
                      <td className="py-3.5 px-4 font-mono font-medium text-[#141413] bg-[#FAF9F6]/80">
                        Node.js & Express.js
                      </td>
                      <td className="py-3.5 px-4 text-[#44403C]">
                        <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Express Server trên Node.js (Port 3000)
                        </div>
                        RESTful API endpoint xử lý đơn đặt may (<code className="text-[#8C6D46]">/api/orders</code>), số đo cá nhân (<code className="text-[#8C6D46]">/api/measurements</code>), cấu hình âu phục (<code className="text-[#8C6D46]">/api/config</code>).
                      </td>
                    </tr>

                    {/* Row 4: MongoDB / MySQL */}
                    <tr className="hover:bg-[#FAF9F6]">
                      <td className="py-3.5 px-4 font-semibold text-[#141413] flex items-center gap-1.5">
                        <Database className="w-4 h-4 text-[#8C6D46]" />
                        Cơ sở dữ liệu
                      </td>
                      <td className="py-3.5 px-4 font-mono font-medium text-[#141413] bg-[#FAF9F6]/80">
                        MongoDB / MySQL
                      </td>
                      <td className="py-3.5 px-4 text-[#44403C]">
                        <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Hỗ trợ kép (Dual MongoDB & MySQL Adapter)
                        </div>
                        Bảng/Collection: <code className="text-[#8C6D46]">users</code>, <code className="text-[#8C6D46]">orders</code>, <code className="text-[#8C6D46]">measurements</code>, <code className="text-[#8C6D46]">fabrics</code>. Hỗ trợ kết nối live MongoDB Atlas hoặc MySQL, đồng thời lưu trữ bền vững tại file JSON.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Điều khiển & Chuyển đổi Cơ sở dữ liệu */}
              <div className="bg-white border border-[#E5E2DC] rounded-xl p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-[#141413] flex items-center gap-2">
                      <Database className="w-4 h-4 text-[#8C6D46]" />
                      Chế độ Cơ sở dữ liệu đang chọn:
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#141413] text-[#FAF9F6]">
                        {stackInfo?.database.preferred.toUpperCase() || 'MONGODB'}
                      </span>
                    </h3>
                    <p className="text-xs text-[#78716C] mt-1">
                      {stackInfo?.database.message || 'Hệ thống đã kích hoạt cơ chế lưu trữ bền vững tương thích MongoDB & MySQL.'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleSwitchDb('mongodb')}
                      disabled={isSwitching}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        stackInfo?.database.preferred === 'mongodb'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                          : 'bg-white text-[#65615B] border-[#E5E2DC] hover:border-emerald-400'
                      }`}
                    >
                      Dùng MongoDB
                    </button>
                    <button
                      onClick={() => handleSwitchDb('mysql')}
                      disabled={isSwitching}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        stackInfo?.database.preferred === 'mysql'
                          ? 'bg-blue-50 text-blue-800 border-blue-300 font-bold'
                          : 'bg-white text-[#65615B] border-[#E5E2DC] hover:border-blue-400'
                      }`}
                    >
                      Dùng MySQL
                    </button>
                  </div>
                </div>

                {/* Thống kê bản ghi hiện tại */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#EAE7E1]">
                  <div className="bg-[#FAF9F6] p-2.5 rounded-lg text-center border border-[#EAE7E1]">
                    <div className="text-xs text-[#78716C]">Đơn hàng (Orders)</div>
                    <div className="text-base font-bold text-[#141413] mt-0.5">
                      {stackInfo?.database.collectionsOrTables.orders ?? 1}
                    </div>
                  </div>
                  <div className="bg-[#FAF9F6] p-2.5 rounded-lg text-center border border-[#EAE7E1]">
                    <div className="text-xs text-[#78716C]">Tài khoản (Users)</div>
                    <div className="text-base font-bold text-[#141413] mt-0.5">
                      {stackInfo?.database.collectionsOrTables.users ?? 3}
                    </div>
                  </div>
                  <div className="bg-[#FAF9F6] p-2.5 rounded-lg text-center border border-[#EAE7E1]">
                    <div className="text-xs text-[#78716C]">Bộ số đo cá nhân</div>
                    <div className="text-base font-bold text-[#141413] mt-0.5">
                      {stackInfo?.database.collectionsOrTables.measurements ?? 1}
                    </div>
                  </div>
                  <div className="bg-[#FAF9F6] p-2.5 rounded-lg text-center border border-[#EAE7E1]">
                    <div className="text-xs text-[#78716C]">Động cơ Backend</div>
                    <div className="text-xs font-semibold text-emerald-700 mt-1">
                      Express v4 / Node
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#141413]">
                  {activeTab === 'mysql' ? 'Tệp schema.sql (DDL cấu trúc bảng MySQL 8.0+)' : 'Tệp schema.mongo.js (Cấu trúc MongoDB Collections & Validation Rules)'}
                </span>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded-md text-xs font-medium border border-[#E5E2DC] bg-white hover:bg-[#FAF9F6] flex items-center gap-1.5 transition-colors cursor-pointer text-[#141413]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Đã sao chép
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#78716C]" />
                      Sao chép mã Schema
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 bg-[#141413] text-[#FAF9F6] rounded-xl text-xs font-mono overflow-x-auto max-h-[50vh] leading-relaxed">
                {schemaContent || 'Đang tải dữ liệu schema...'}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#EAE7E1] bg-white flex items-center justify-between text-xs text-[#78716C]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Hệ thống Backend Express & Canvas API đồng bộ sẵn sàng</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#141413] text-[#FAF9F6] font-medium rounded-lg hover:bg-[#2A2927] transition-colors cursor-pointer"
          >
            Đóng bảng
          </button>
        </div>
      </div>
    </div>
  );
}
