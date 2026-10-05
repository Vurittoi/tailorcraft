import React, { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { NavPage, UserAccount } from '../types/suitTypes';
import { AuthSidebar } from './AuthSidebar';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { AuthToastNotification } from './AuthToastNotification';

interface AuthPageProps {
  accounts: UserAccount[];
  onLoginSuccess: (account: UserAccount, redirectPage?: NavPage) => void;
  onRegisterCustomer: (newCustomer: UserAccount) => void;
}

export function AuthPage({
  accounts,
  onLoginSuccess,
  onRegisterCustomer,
}: AuthPageProps) {
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [slideDirection, setSlideDirection] = useState<number>(1);
  const [isTransitioningTab, setIsTransitioningTab] = useState<boolean>(false);

  const [formHeight, setFormHeight] = useState<number | 'auto'>('auto');
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const measureActiveFormRef = useCallback((node: HTMLFormElement | null) => {
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
      resizeObserverRef.current = null;
    }
    if (node) {
      setFormHeight(node.offsetHeight);
      const observer = new ResizeObserver(() => {
        if (node.offsetHeight > 0) {
          setFormHeight(node.offsetHeight);
        }
      });
      observer.observe(node);
      resizeObserverRef.current = observer;
    }
  }, []);

  const [usernameOrEmail, setUsernameOrEmail] = useState<string>('khachhang');
  const [password, setPassword] = useState<string>('123');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastSuccessMsg, setToastSuccessMsg] = useState<string>('');

  const [regFullName, setRegFullName] = useState<string>('');
  const [regUsername, setRegUsername] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPhone, setRegPhone] = useState<string>('');
  const [regAddress, setRegAddress] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>('');

  const handleSwitchTab = (targetTab: 'login' | 'register') => {
    if (targetTab === authTab || isSubmitting || Boolean(toastSuccessMsg)) {
      return;
    }
    setErrorMsg('');
    setToastSuccessMsg('');
    setSlideDirection(targetTab === 'register' ? 1 : -1);
    setIsTransitioningTab(true);
    setAuthTab(targetTab);
    setTimeout(() => {
      setIsTransitioningTab(false);
    }, 360);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || Boolean(toastSuccessMsg)) return;
    setErrorMsg('');
    setToastSuccessMsg('');

    const trimmed = usernameOrEmail.trim().toLowerCase();
    if (!trimmed) {
      setErrorMsg('Vui lòng nhập Tên đăng nhập hoặc Email của quý khách.');
      return;
    }

    const matched = accounts.find(
      (acc) =>
        acc.username.toLowerCase() === trimmed ||
        acc.email.toLowerCase() === trimmed
    );

    if (!matched) {
      setErrorMsg(
        `Không tìm thấy tài khoản "${usernameOrEmail}". Quý khách vui lòng kiểm tra lại hoặc chuyển sang tab Đăng ký.`
      );
      return;
    }

    if (matched.status === 'LOCKED') {
      setErrorMsg('Tài khoản này hiện đang bị tạm khóa bởi Quản trị viên.');
      return;
    }

    if (matched.password && matched.password !== password) {
      setErrorMsg('Mật khẩu đăng nhập không chính xác.');
      return;
    }

    const defaultNav: NavPage =
      matched.role === 'KHACHHANG'
        ? 'home'
        : matched.role === 'THOMAY'
        ? 'tailor_dashboard'
        : 'admin_dashboard';

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setToastSuccessMsg('Đăng nhập thành công');
      setTimeout(() => {
        onLoginSuccess(matched, defaultNav);
      }, 900);
    }, 1000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || Boolean(toastSuccessMsg)) return;
    setErrorMsg('');
    setToastSuccessMsg('');

    if (
      !regFullName.trim() ||
      !regUsername.trim() ||
      !regEmail.trim() ||
      !regPassword.trim()
    ) {
      setErrorMsg(
        'Vui lòng điền đầy đủ Họ tên, Tên đăng nhập, Email và Mật khẩu.'
      );
      return;
    }

    if (regConfirmPassword && regPassword !== regConfirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp.');
      return;
    }

    const exists = accounts.some(
      (a) =>
        a.username.toLowerCase() === regUsername.trim().toLowerCase() ||
        a.email.toLowerCase() === regEmail.trim().toLowerCase()
    );

    if (exists) {
      setErrorMsg('Tên đăng nhập hoặc Email này đã được đăng ký trước đó.');
      return;
    }

    const newCustomer: UserAccount = {
      id: `USR-CUS-${Date.now().toString().slice(-4)}`,
      username: regUsername.trim(),
      password: regPassword.trim(),
      email: regEmail.trim(),
      fullName: regFullName.trim(),
      phone: regPhone.trim() || '0909 123 456',
      address:
        regAddress.trim() || '88 Đồng Khởi, Quận 1, TP. Hồ Chí Minh',
      role: 'KHACHHANG',
      roleLabel: 'Khách hàng (KHACHHANG / Customer)',
      status: 'ACTIVE',
      createdAt: new Date().toLocaleDateString('vi-VN'),
    };

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setToastSuccessMsg('Đăng ký thành công');
      onRegisterCustomer(newCustomer);
      setTimeout(() => {
        onLoginSuccess(newCustomer, 'home');
      }, 900);
    }, 1000);
  };

  const fillDemoCredentials = (acc: UserAccount) => {
    if (isSubmitting || Boolean(toastSuccessMsg)) return;
    if (authTab !== 'login') {
      setSlideDirection(-1);
      setIsTransitioningTab(true);
      setAuthTab('login');
      setTimeout(() => setIsTransitioningTab(false), 360);
    }
    setErrorMsg('');
    setToastSuccessMsg('');
    setUsernameOrEmail(acc.username);
    setPassword(acc.password || '123');
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.94,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -150 : 150,
      opacity: 0,
      scale: 0.94,
    }),
  };

  return (
    <section className="min-h-screen w-full bg-[#F4F2ED] flex flex-col justify-center items-center px-4 py-10 relative">
      {/* 4. Toast thông báo góc trên bên phải màn hình */}
      <AuthToastNotification toastSuccessMsg={toastSuccessMsg} />

      <motion.div
        layout
        animate={{
          scale: isTransitioningTab ? 0.985 : 1,
        }}
        transition={{
          layout: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 0.28, ease: 'easeOut' },
        }}
        className="w-full max-w-4xl bg-white border border-[#E5E2DC] rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
      >
        {/* 1. Cột trái: Thương hiệu Tailor Craft & Nút chọn Tài khoản mẫu */}
        <AuthSidebar
          accounts={accounts}
          onFillDemoCredentials={fillDemoCredentials}
        />

        {/* Cột phải: Form Đăng Nhập / Đăng Ký */}
        <motion.div
          layout
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 p-6 sm:p-9 flex flex-col justify-center space-y-5 overflow-hidden"
        >
          <div className="flex items-start sm:items-center justify-between gap-4 border-b border-[#EAE7E1] pb-4">
            <div className="overflow-hidden flex-1">
              <AnimatePresence
                mode="wait"
                custom={slideDirection}
                initial={false}
              >
                <motion.div
                  key={authTab}
                  custom={slideDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2 className="font-display text-3xl font-bold text-[#141413]">
                    {authTab === 'login'
                      ? 'Đăng Nhập Hệ Thống'
                      : 'Đăng Ký Tài Khoản Mới'}
                  </h2>
                  <p className="text-xs text-[#65615B] mt-0.5">
                    {authTab === 'login'
                      ? 'Vui lòng đăng nhập để truy cập Trang chủ và không gian may đo của quý khách.'
                      : 'Tạo tài khoản Khách hàng mới để bắt đầu thiết kế Suit 2D và lưu hồ sơ số đo.'}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-1 bg-[#F4F2ED] p-1 rounded-lg text-xs shrink-0 relative">
              <button
                type="button"
                onClick={() => handleSwitchTab('login')}
                className={`relative z-10 px-3.5 py-2 rounded-md font-semibold cursor-pointer transition-colors ${
                  authTab === 'login'
                    ? 'text-white'
                    : 'text-[#65615B] hover:text-[#141413]'
                }`}
              >
                {authTab === 'login' && (
                  <motion.span
                    layoutId="authSwitchIndicator"
                    className="absolute inset-0 bg-[#141413] rounded-md -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span>Đăng nhập</span>
              </button>

              <button
                type="button"
                onClick={() => handleSwitchTab('register')}
                className={`relative z-10 px-3.5 py-2 rounded-md font-semibold cursor-pointer transition-colors ${
                  authTab === 'register'
                    ? 'text-white'
                    : 'text-[#65615B] hover:text-[#141413]'
                }`}
              >
                {authTab === 'register' && (
                  <motion.span
                    layoutId="authSwitchIndicator"
                    className="absolute inset-0 bg-[#141413] rounded-md -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span>Đăng ký</span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  {errorMsg}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            animate={{
              height: formHeight,
              scale: isTransitioningTab ? 0.97 : 1,
            }}
            transition={{
              height: {
                type: 'spring',
                stiffness: 260,
                damping: 28,
              },
              scale: {
                duration: 0.26,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            className="relative overflow-hidden"
          >
            <AnimatePresence
              mode="wait"
              custom={slideDirection}
              initial={false}
            >
              {authTab === 'login' ? (
                <LoginForm
                  measureActiveFormRef={measureActiveFormRef}
                  slideDirection={slideDirection}
                  slideVariants={slideVariants}
                  usernameOrEmail={usernameOrEmail}
                  setUsernameOrEmail={setUsernameOrEmail}
                  password={password}
                  setPassword={setPassword}
                  isSubmitting={isSubmitting}
                  toastSuccessMsg={toastSuccessMsg}
                  onSubmit={handleLoginSubmit}
                />
              ) : (
                <RegisterForm
                  measureActiveFormRef={measureActiveFormRef}
                  slideDirection={slideDirection}
                  slideVariants={slideVariants}
                  regFullName={regFullName}
                  setRegFullName={setRegFullName}
                  regUsername={regUsername}
                  setRegUsername={setRegUsername}
                  regEmail={regEmail}
                  setRegEmail={setRegEmail}
                  regPhone={regPhone}
                  setRegPhone={setRegPhone}
                  regAddress={regAddress}
                  setRegAddress={setRegAddress}
                  regPassword={regPassword}
                  setRegPassword={setRegPassword}
                  regConfirmPassword={regConfirmPassword}
                  setRegConfirmPassword={setRegConfirmPassword}
                  isSubmitting={isSubmitting}
                  toastSuccessMsg={toastSuccessMsg}
                  onSubmit={handleRegisterSubmit}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
