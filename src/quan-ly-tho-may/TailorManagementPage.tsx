import React, { useState } from 'react';
import { Check } from 'lucide-react';
import {
  NavPage,
  TailoringOrderRecord,
  UserAccount,
} from '../types/suitTypes';
import { CreateTailorForm } from './CreateTailorForm';
import { TailorAccountList } from './TailorAccountList';

interface TailorManagementPageProps {
  accounts: UserAccount[];
  orders: TailoringOrderRecord[];
  onCreateTailorAccount: (newTailor: UserAccount) => void;
  onToggleAccountStatus: (accountId: string) => void;
  onDeleteAccount: (accountId: string) => void;
  navigateToPage: (targetPage: NavPage) => void;
}

export function TailorManagementPage({
  accounts,
  orders,
  onCreateTailorAccount,
  onToggleAccountStatus,
  onDeleteAccount,
  navigateToPage,
}: TailorManagementPageProps) {
  const [toastMsg, setToastMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const tailorList = accounts.filter((a) => a.role === 'THOMAY');

  const handleSuccessToast = (msg: string) => {
    setErrorMsg('');
    setToastMsg(msg);
    window.setTimeout(() => setToastMsg(''), 3200);
  };

  return (
    <section className="max-w-[1380px] w-full mx-auto px-4 sm:px-8 py-8 flex-1 space-y-6">
      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-semibold text-emerald-900 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{toastMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 1. Form nhập liệu tạo tài khoản thợ may mới */}
        <CreateTailorForm
          accounts={accounts}
          onCreateTailorAccount={onCreateTailorAccount}
          onSuccessToast={handleSuccessToast}
          onErrorToast={setErrorMsg}
        />

        {/* 3. Danh sách chứa tập hợp các TailorAccountCard */}
        <TailorAccountList
          tailorList={tailorList}
          orders={orders}
          onToggleAccountStatus={onToggleAccountStatus}
          onDeleteAccount={onDeleteAccount}
          navigateToPage={navigateToPage}
        />
      </div>
    </section>
  );
}
