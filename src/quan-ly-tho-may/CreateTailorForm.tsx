import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { UserAccount } from '../types/suitTypes';

interface CreateTailorFormProps {
  accounts: UserAccount[];
  onCreateTailorAccount: (newTailor: UserAccount) => void;
  onSuccessToast: (msg: string) => void;
  onErrorToast: (msg: string) => void;
}

export function CreateTailorForm({
  accounts,
  onCreateTailorAccount,
  onSuccessToast,
  onErrorToast,
}: CreateTailorFormProps) {
  const [tailorFullName, setTailorFullName] = useState<string>('');
  const [tailorUsername, setTailorUsername] = useState<string>('');
  const [tailorPassword, setTailorPassword] = useState<string>('123');
  const [tailorEmail, setTailorEmail] = useState<string>('');
  const [tailorPhone, setTailorPhone] = useState<string>('');
  const [tailorWorkshop, setTailorWorkshop] = useState<string>(
    'Xưởng Chế Tác Bespoke Savile — Quận 1'
  );
  const [tailorSpecialty, setTailorSpecialty] = useState<string>(
    'Cắt rập thủ công & Ráp phom Canvas'
  );

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onErrorToast('');

    const cleanUsername = tailorUsername.trim().replace(/^@/, '');
    if (!tailorFullName.trim() || !cleanUsername) {
      onErrorToast('Vui lòng nhập đầy đủ Họ và tên thợ may và Tên đăng nhập.');
      return;
    }

    const exists = accounts.some(
      (a) => a.username.toLowerCase() === cleanUsername.toLowerCase()
    );
    if (exists) {
      onErrorToast(`Tên đăng nhập "${cleanUsername}" đã tồn tại trên hệ thống.`);
      return;
    }

    const newTailor: UserAccount = {
      id: `USR-TAI-${Date.now().toString().slice(-4)}`,
      username: cleanUsername,
      password: tailorPassword.trim() || '123',
      email:
        tailorEmail.trim() || `${cleanUsername.toLowerCase()}@tailorcraft.vn`,
      fullName: tailorFullName.trim(),
      phone: tailorPhone.trim() || '0918 222 333',
      role: 'THOMAY',
      roleLabel: 'Thợ may / Xưởng (THOMAY / Tailor)',
      workshopName: tailorWorkshop.trim(),
      specialty: tailorSpecialty.trim(),
      status: 'ACTIVE',
      createdAt: new Date().toLocaleDateString('vi-VN'),
    };

    onCreateTailorAccount(newTailor);
    setTailorFullName('');
    setTailorUsername('');
    setTailorEmail('');
    setTailorPhone('');
    onSuccessToast(
      `Đã tạo tài khoản thợ may @${newTailor.username} (${newTailor.fullName}) thành công!`
    );
  };

  return (
    <div className="lg:col-span-5 bg-white border border-[#E5E2DC] rounded-2xl p-6 space-y-5">
      <div className="flex items-center gap-2.5 border-b border-[#EAE7E1] pb-4">
        <UserPlus className="w-5 h-5 text-[#8C6D46]" />
        <div>
          <h2 className="font-display text-2xl font-bold text-[#141413]">
            Tạo Tài Khoản Cho Thợ May
          </h2>
          <p className="text-xs text-[#65615B]">
            Cấp tài khoản mới để thợ may đăng nhập và nhận việc tại xưởng
          </p>
        </div>
      </div>

      <form onSubmit={handleCreateSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1">
            Họ và tên thợ may
          </label>
          <input
            type="text"
            required
            value={tailorFullName}
            onChange={(e) => setTailorFullName(e.target.value)}
            placeholder="VD: Nghệ nhân Vũ Quốc Khánh"
            className="w-full px-3.5 py-2.5 text-xs bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#141413] mb-1">
              Tên đăng nhập (Username)
            </label>
            <input
              type="text"
              required
              value={tailorUsername}
              onChange={(e) => setTailorUsername(e.target.value)}
              placeholder="VD: thomay03"
              className="w-full px-3.5 py-2.5 text-xs font-mono-tabular bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#141413] mb-1">
              Mật khẩu khởi tạo
            </label>
            <input
              type="text"
              required
              value={tailorPassword}
              onChange={(e) => setTailorPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-mono-tabular bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-[#141413] mb-1">
              Email liên hệ
            </label>
            <input
              type="email"
              value={tailorEmail}
              onChange={(e) => setTailorEmail(e.target.value)}
              placeholder="khanh.atelier@tailorcraft.vn"
              className="w-full px-3.5 py-2.5 text-xs bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#141413] mb-1">
              Số điện thoại
            </label>
            <input
              type="text"
              value={tailorPhone}
              onChange={(e) => setTailorPhone(e.target.value)}
              placeholder="0919 888 777"
              className="w-full px-3.5 py-2.5 text-xs bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1">
            Phân xưởng làm việc
          </label>
          <input
            type="text"
            value={tailorWorkshop}
            onChange={(e) => setTailorWorkshop(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#141413] mb-1">
            Chuyên môn kỹ thuật chính
          </label>
          <select
            value={tailorSpecialty}
            onChange={(e) => setTailorSpecialty(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs bg-[#F9F8F6] border border-[#D8D4CC] rounded-lg focus:outline-none focus:border-[#141413]"
          >
            <option value="Cắt rập thủ công & Ráp phom Canvas">
              Khâu Cắt — Cắt rập thủ công & Phá vải chính
            </option>
            <option value="Khâu đột ve áo & Ráp thân Suit Bespoke">
              Khâu May — Ráp thân Suit, Tra tay & Thêu Monogram
            </option>
            <option value="Kiểm định QC & Ép phom hơi nước hoàn thiện">
              Khâu Kiểm định — Đo kiểm thông số QC & Hoàn thiện
            </option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#141413] text-white text-xs font-semibold rounded-lg hover:bg-[#2A2826] transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Tạo Tài Khoản Thợ May</span>
        </button>
      </form>
    </div>
  );
}
