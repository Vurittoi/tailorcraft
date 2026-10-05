import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LogOut, ShoppingBag, User, X } from 'lucide-react';
import {
  FABRIC_CATALOG,
  FabricOption,
  getSmallPreviewSwatchUrl,
} from './fabricCatalogData';
import {
  renderSuitCanvas,
  RenderOptions,
  SuitConfigState,
} from './suitCanvasEngine';
import {
  BodyMeasurements,
  BUTTON_OPTIONS,
  DEFAULT_PRESETS,
  formatVND,
  INITIAL_TEXTURE_MASK_ASSETS,
  INITIAL_USER_ACCOUNTS,
  LAPEL_OPTIONS,
  NAV_ORDER,
  NavPage,
  POCKET_OPTIONS,
  PRODUCTION_STAGES,
  ProductionStage,
  StyleOptionItem,
  TailoringOrderRecord,
  TextureMaskAsset,
  UserAccount,
} from './types/suitTypes';
import { HomePage } from './trang-chu/HomePage';
import { ConfiguratorPage } from './thiet-ke/ConfiguratorPage';
import { ProfileMeasurementsPage } from './bo-so-do-ca-nhan/ProfileMeasurementsPage';
import {
  OrderTrackingPage,
  OrderSummaryModal,
} from './theo-doi-don-hang/OrderTrackingPage';
import { AuthPage } from './xac-thuc/AuthPage';
import { AccountSettingsPage } from './tai-khoan/AccountSettingsPage';
import { TailorDashboardPage } from './xuong-may/TailorDashboardPage';
import { AdminDashboardPage } from './quan-tri/AdminDashboardPage';
import { TailorManagementPage } from './quan-ly-tho-may/TailorManagementPage';

export default function App() {
  // Danh sách toàn bộ tài khoản & Trạng thái bắt buộc đăng nhập trước khi vào Trang chủ
  const [accounts, setAccounts] = useState<UserAccount[]>(
    INITIAL_USER_ACCOUNTS
  );
  const [currentUser, setCurrentUser] = useState<UserAccount>(
    INITIAL_USER_ACCOUNTS[0]
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Danh sách mẫu vải yêu thích theo từng tài khoản độc lập
  const [favoritesByUserId, setFavoritesByUserId] = useState<
    Record<string, string[]>
  >({
    'USR-CUS-01': [
      FABRIC_CATALOG[0].id,
      FABRIC_CATALOG[1].id,
      FABRIC_CATALOG[2].id,
    ],
  });
  const currentUserFavoriteFabricIds =
    favoritesByUserId[currentUser.id] || [];

  // Danh mục Vải, Đơn giá phụ kiện & Thư viện Texture/Mask (Admin có thể thêm/sửa/xóa trực tiếp)
  const [fabrics, setFabrics] = useState<FabricOption[]>(FABRIC_CATALOG);
  const [lapelOptions, setLapelOptions] =
    useState<StyleOptionItem<'notch' | 'peak'>[]>(LAPEL_OPTIONS);
  const [buttonOptions, setButtonOptions] =
    useState<StyleOptionItem<'single' | 'double_two' | 'gold_brass'>[]>(
      BUTTON_OPTIONS
    );
  const [pocketOptions, setPocketOptions] =
    useState<StyleOptionItem<'flap' | 'jetted' | 'patched'>[]>(POCKET_OPTIONS);
  const [textureMaskAssets, setTextureMaskAssets] = useState<
    TextureMaskAsset[]
  >(INITIAL_TEXTURE_MASK_ASSETS);

  // Điều hướng các trang chính kèm theo hướng chuyển động mượt
  const [activeNav, setActiveNav] = useState<NavPage>('home');
  const [navDirection, setNavDirection] = useState<number>(1);

  const navigateToPage = (targetPage: NavPage) => {
    if (targetPage === activeNav) return;
    const dir = NAV_ORDER[targetPage] >= NAV_ORDER[activeNav] ? 1 : -1;
    setNavDirection(dir);
    setActiveNav(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Xử lý đăng nhập từ trang Register/Login (AuthPage.tsx)
  const handleLoginSuccess = (
    account: UserAccount,
    redirectPage?: NavPage
  ) => {
    setCurrentUser(account);
    setIsAuthenticated(true);
    if (redirectPage) {
      setActiveNav(redirectPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (account.role === 'KHACHHANG') {
      setActiveNav('home');
    } else if (account.role === 'THOMAY') {
      setActiveNav('tailor_dashboard');
    } else if (account.role === 'ADMIN') {
      setActiveNav('admin_dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsCartOpen(false);
    setIsOrderSummaryModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateAccountProfile = (updated: UserAccount) => {
    setCurrentUser(updated);
    setAccounts((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const handleRegisterCustomer = (newCustomer: UserAccount) => {
    setAccounts((prev) => [newCustomer, ...prev]);
    setFavoritesByUserId((prev) => ({ ...prev, [newCustomer.id]: [] }));
    setMeasurementsByUserId((prev) => ({
      ...prev,
      [newCustomer.id]: {
        mode: 'default',
        ...DEFAULT_PRESETS.size_l,
      },
    }));
  };

  const handleCreateTailorAccount = (newTailor: UserAccount) => {
    setAccounts((prev) => [newTailor, ...prev]);
  };

  const handleToggleAccountStatus = (accountId: string) => {
    setAccounts((prev) =>
      prev.map((item) =>
        item.id === accountId
          ? {
              ...item,
              status: item.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE',
            }
          : item
      )
    );
  };

  const handleDeleteAccount = (accountId: string) => {
    setAccounts((prev) => prev.filter((item) => item.id !== accountId));
  };

  const handleToggleFavoriteFabric = (fabricId: string) => {
    setFavoritesByUserId((prev) => {
      const currentList = prev[currentUser.id] || [];
      const nextList = currentList.includes(fabricId)
        ? currentList.filter((id) => id !== fabricId)
        : [fabricId, ...currentList];
      return {
        ...prev,
        [currentUser.id]: nextList,
      };
    });
  };

  // Nén trước (Pre-warm) bản Preview nhỏ 36x36px cho 50 mẫu vải trong thời gian rảnh của trình duyệt
  useEffect(() => {
    let idx = 0;
    const warmNextBatch = () => {
      const end = Math.min(idx + 8, FABRIC_CATALOG.length);
      for (; idx < end; idx++) {
        getSmallPreviewSwatchUrl(FABRIC_CATALOG[idx]);
      }
      if (idx < FABRIC_CATALOG.length) {
        window.setTimeout(warmNextBatch, 40);
      }
    };
    const timerId = window.setTimeout(warmNextBatch, 120);
    return () => window.clearTimeout(timerId);
  }, []);

  // Trạng thái cấu hình áo Suit 2D hiện tại
  const [config, setConfig] = useState<SuitConfigState>({
    fabricId: FABRIC_CATALOG[0].id,
    fabricName: FABRIC_CATALOG[0].name,
    fabricCode: FABRIC_CATALOG[0].code,
    fabricOrigin: FABRIC_CATALOG[0].origin,
    colorHex: FABRIC_CATALOG[0].colorHex,
    fabricPrice: FABRIC_CATALOG[0].price,
    weavePattern: 'solid',
    jacketStyleId: 'sb_2_buttons',
    jacketStyleName: 'Vạt đơn 2 cúc',
    jacketStylePrice: 0,
    lapelId: LAPEL_OPTIONS[0].id,
    lapelName: LAPEL_OPTIONS[0].name,
    lapelPrice: LAPEL_OPTIONS[0].price,
    buttonId: BUTTON_OPTIONS[0].id,
    buttonName: BUTTON_OPTIONS[0].name,
    buttonPrice: BUTTON_OPTIONS[0].price,
    pocketId: POCKET_OPTIONS[0].id,
    pocketName: POCKET_OPTIONS[0].name,
    pocketPrice: POCKET_OPTIONS[0].price,
    monogramText: '',
    monogramColor: 'gold',
    monogramStyle: 'script',
    monogramOffsetX: 0,
    monogramOffsetY: 0,
  });

  // Trạng thái góc nhìn Canvas 2D (Zoom & Pan) kèm bộ nội suy chuyển động mượt 60fps
  const [renderOpts, setRenderOpts] = useState<RenderOptions>({
    zoom: 1,
    panX: 0,
    panY: 0,
    renderMode: 'composite',
  });
  const targetViewRef = useRef<RenderOptions>({
    zoom: 1,
    panX: 0,
    panY: 0,
    renderMode: 'composite',
  });
  const animatedViewRef = useRef<RenderOptions>({
    zoom: 1,
    panX: 0,
    panY: 0,
    renderMode: 'composite',
  });
  const viewAnimRafRef = useRef<number | null>(null);
  const configRef = useRef<SuitConfigState>(config);
  configRef.current = config;

  // Kéo chuột & Hover trên Canvas
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const isDraggingCanvasRef = useRef(false);
  const [isHoveringCanvas, setIsHoveringCanvas] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasViewportRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trạng thái bộ số đo cá nhân độc lập theo từng tài khoản
  const [selectedPresetKey, setSelectedPresetKey] = useState<string>('size_l');
  const [measurementsByUserId, setMeasurementsByUserId] = useState<
    Record<string, BodyMeasurements>
  >({
    'USR-CUS-01': {
      mode: 'default',
      ...DEFAULT_PRESETS.size_l,
    },
  });

  const measurements: BodyMeasurements = measurementsByUserId[
    currentUser.id
  ] || {
    mode: 'default',
    ...DEFAULT_PRESETS.size_l,
  };

  const setMeasurements: React.Dispatch<
    React.SetStateAction<BodyMeasurements>
  > = useCallback(
    (updater) => {
      setMeasurementsByUserId((prev) => {
        const currentVal = prev[currentUser.id] || {
          mode: 'default',
          ...DEFAULT_PRESETS.size_l,
        };
        const nextVal =
          typeof updater === 'function' ? updater(currentVal) : updater;
        return {
          ...prev,
          [currentUser.id]: nextVal,
        };
      });
    },
    [currentUser.id]
  );

  // Trạng thái đóng/mở các Modal & Đơn hàng đang xem/chỉnh sửa
  const [isOrderSummaryModalOpen, setIsOrderSummaryModalOpen] = useState(false);
  const [selectedOrderForDetail, setSelectedOrderForDetail] =
    useState<TailoringOrderRecord | null>(null);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Ảnh chụp từ Canvas khi xem trước Phiếu Đặt May
  const [canvasSnapshotUrl, setCanvasSnapshotUrl] = useState<string>('');

  // Danh sách đơn đặt may (đồng bộ giữa Khách hàng, Thợ may và Admin)
  const [orders, setOrders] = useState<TailoringOrderRecord[]>([
    {
      orderId: 'TC-892401',
      customerId: 'USR-CUS-01',
      createdAt: '26/09/2026 09:30',
      stage: 'CAT',
      status: 'Khâu Cắt — Nghệ nhân đang cắt rập thủ công theo số đo',
      estimatedDelivery: '10/10/2026',
      previewDataUrl: '',
      customerName: 'Nguyễn Văn An',
      customerPhone: '0908 246 810',
      assignedTailorId: 'USR-TAI-01',
      assignedTailorName: 'Nghệ nhân Trần Minh Đức',
      tailorNotes:
        'Đã dựng xong rập giấy cá nhân hóa, chuẩn bị cắt vải Loro Piana.',
      updatedAt: '26/09/2026 10:15',
      config: {
        fabricId: FABRIC_CATALOG[1].id,
        fabricName: FABRIC_CATALOG[1].name,
        fabricCode: FABRIC_CATALOG[1].code,
        fabricOrigin: FABRIC_CATALOG[1].origin,
        colorHex: FABRIC_CATALOG[1].colorHex,
        fabricPrice: FABRIC_CATALOG[1].price,
        weavePattern: 'herringbone',
        lapelId: 'peak',
        lapelName: 'Cổ Nhọn',
        lapelPrice: 120000,
        buttonId: 'gold_brass',
        buttonName: 'Cúc mạ vàng',
        buttonPrice: 200000,
        pocketId: 'flap',
        pocketName: 'Túi nắp',
        pocketPrice: 0,
        monogramText: 'N.V.A',
        monogramColor: 'gold',
        monogramStyle: 'script',
        monogramOffsetX: 0,
        monogramOffsetY: 0,
      },
      measurements: {
        mode: 'default',
        ...DEFAULT_PRESETS.size_l,
      },
      totalPrice: FABRIC_CATALOG[1].price + 120000 + 200000,
    },
    {
      orderId: 'TC-892388',
      customerId: 'USR-CUS-01',
      createdAt: '24/09/2026 15:10',
      stage: 'MAY',
      status: 'Khâu May — Đang ráp thân áo, tra tay & thêu Monogram',
      estimatedDelivery: '08/10/2026',
      previewDataUrl: '',
      customerName: 'Nguyễn Văn An',
      customerPhone: '0908 246 810',
      assignedTailorId: 'USR-TAI-02',
      assignedTailorName: 'Nghệ nhân Lê Hoàng Nam',
      tailorNotes:
        'Đã hoàn tất ráp dựng ngực Horsehair Canvas, đang thêu chữ túi ngực.',
      updatedAt: '26/09/2026 16:40',
      config: {
        fabricId: FABRIC_CATALOG[0].id,
        fabricName: FABRIC_CATALOG[0].name,
        fabricCode: FABRIC_CATALOG[0].code,
        fabricOrigin: FABRIC_CATALOG[0].origin,
        colorHex: FABRIC_CATALOG[0].colorHex,
        fabricPrice: FABRIC_CATALOG[0].price,
        weavePattern: 'solid',
        lapelId: 'notch',
        lapelName: 'Cổ Xếch',
        lapelPrice: 0,
        buttonId: 'double_two',
        buttonName: '2 Cúc',
        buttonPrice: 50000,
        pocketId: 'jetted',
        pocketName: 'Túi ẩn',
        pocketPrice: 80000,
        monogramText: 'A.NGUYEN',
        monogramColor: 'silver',
        monogramStyle: 'serif',
        monogramOffsetX: 0,
        monogramOffsetY: 0,
      },
      measurements: {
        mode: 'default',
        ...DEFAULT_PRESETS.size_m,
      },
      totalPrice: FABRIC_CATALOG[0].price + 50000 + 80000,
    },
  ]);

  // Hàm cho Thợ may (THOMAY) và Admin cập nhật mốc chế tác (Cắt -> May -> Kiểm định -> Hoàn tất)
  // Chỉ Nghệ nhân được phân công phụ trách đơn hàng (hoặc Admin) mới có quyền điều chỉnh mốc chế tác
  const handleUpdateOrderStage = (
    orderId: string,
    nextStage: ProductionStage,
    tailorNote?: string
  ) => {
    const stageInfo = PRODUCTION_STAGES.find((s) => s.key === nextStage);
    const nextStatusText =
      stageInfo?.customerStatusText ||
      'Đang chế tác tại xưởng Bespoke Tailor Craft';

    setOrders((prev) =>
      prev.map((item) => {
        if (item.orderId !== orderId) return item;
        if (
          currentUser.role === 'THOMAY' &&
          item.assignedTailorId &&
          item.assignedTailorId !== currentUser.id
        ) {
          return item;
        }
        return {
          ...item,
          stage: nextStage,
          status: nextStatusText,
          tailorNotes:
            tailorNote !== undefined ? tailorNote : item.tailorNotes,
          updatedAt: new Date().toLocaleString('vi-VN'),
        };
      })
    );
  };

  const handleAssignTailorToOrder = (orderId: string, tailor: UserAccount) => {
    setOrders((prev) =>
      prev.map((item) =>
        item.orderId === orderId
          ? {
              ...item,
              assignedTailorId: tailor.id,
              assignedTailorName: tailor.fullName,
              updatedAt: new Date().toLocaleString('vi-VN'),
            }
          : item
      )
    );
  };

  // Tính toán tổng chi phí tự động theo thời gian thực
  const styleAddonPrice =
    (config.jacketStylePrice ?? 0) +
    config.lapelPrice +
    config.buttonPrice +
    config.pocketPrice +
    (config.necktiePrice ?? 0);
  const totalEstimatedPrice = config.fabricPrice + styleAddonPrice;

  // Vòng lặp nội suy chuyển động mượt 60fps (Spring/Lerp Interpolation)
  const startSmoothViewLoop = useCallback(() => {
    if (viewAnimRafRef.current !== null) return;

    const animateStep = () => {
      const cur = animatedViewRef.current;
      const tgt = targetViewRef.current;
      const ease = isDraggingCanvasRef.current ? 0.34 : 0.16;

      const dZoom = tgt.zoom - cur.zoom;
      const dPanX = tgt.panX - cur.panX;
      const dPanY = tgt.panY - cur.panY;

      if (
        Math.abs(dZoom) < 0.0008 &&
        Math.abs(dPanX) < 0.08 &&
        Math.abs(dPanY) < 0.08
      ) {
        animatedViewRef.current = { ...tgt };
        if (canvasRef.current) {
          renderSuitCanvas(
            canvasRef.current,
            configRef.current,
            animatedViewRef.current
          );
        }
        setRenderOpts({ ...tgt });
        viewAnimRafRef.current = null;
        return;
      }

      const nextView: RenderOptions = {
        zoom: cur.zoom + dZoom * ease,
        panX: cur.panX + dPanX * ease,
        panY: cur.panY + dPanY * ease,
        renderMode: tgt.renderMode,
      };
      animatedViewRef.current = nextView;

      if (canvasRef.current) {
        renderSuitCanvas(canvasRef.current, configRef.current, nextView);
      }
      setRenderOpts({ ...nextView });
      viewAnimRafRef.current = window.requestAnimationFrame(animateStep);
    };

    viewAnimRafRef.current = window.requestAnimationFrame(animateStep);
  }, []);

  useEffect(() => {
    return () => {
      if (viewAnimRafRef.current !== null) {
        window.cancelAnimationFrame(viewAnimRafRef.current);
        viewAnimRafRef.current = null;
      }
    };
  }, []);

  // Lắng nghe sự kiện lăn chuột (Wheel) trực tiếp khi Hover vào khung hình Suit 2D
  const wheelListenerCleanupRef = useRef<(() => void) | null>(null);
  const handleCanvasViewportRef = useCallback(
    (viewportEl: HTMLDivElement | null) => {
      if (wheelListenerCleanupRef.current) {
        wheelListenerCleanupRef.current();
        wheelListenerCleanupRef.current = null;
      }
      canvasViewportRef.current = viewportEl;
      if (!viewportEl) return;

      const handleNativeWheel = (e: WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const prevZoom = targetViewRef.current.zoom;
        const rawDelta = -e.deltaY * 0.0014;
        const zoomDelta = Math.max(-0.22, Math.min(0.22, rawDelta));
        const nextZoom = Number(
          Math.min(2.25, Math.max(0.75, prevZoom + zoomDelta)).toFixed(3)
        );

        if (nextZoom === prevZoom) return;

        let nextPanX = targetViewRef.current.panX;
        let nextPanY = targetViewRef.current.panY;
        const canvasEl = canvasRef.current;

        if (canvasEl) {
          const rect = canvasEl.getBoundingClientRect();
          const relX =
            ((e.clientX - rect.left) / rect.width - 0.5) * canvasEl.width;
          const relY =
            ((e.clientY - rect.top) / rect.height - 0.5) * canvasEl.height;
          const ratio = nextZoom / prevZoom;
          nextPanX = targetViewRef.current.panX * ratio - relX * (ratio - 1);
          nextPanY = targetViewRef.current.panY * ratio - relY * (ratio - 1);
        }

        if (nextZoom <= 1.02) {
          nextPanX *= 0.4;
          nextPanY *= 0.4;
        }

        const maxPan = Math.max(35, (nextZoom - 0.7) * 185);
        nextPanX = Math.max(-maxPan, Math.min(maxPan, nextPanX));
        nextPanY = Math.max(-maxPan, Math.min(maxPan, nextPanY));

        targetViewRef.current = {
          ...targetViewRef.current,
          zoom: nextZoom,
          panX: nextPanX,
          panY: nextPanY,
        };
        startSmoothViewLoop();
      };

      viewportEl.addEventListener('wheel', handleNativeWheel, {
        passive: false,
      });
      wheelListenerCleanupRef.current = () => {
        viewportEl.removeEventListener('wheel', handleNativeWheel);
      };
    },
    [startSmoothViewLoop]
  );

  const handleCanvasRef = useCallback((node: HTMLCanvasElement | null) => {
    canvasRef.current = node;
    if (node) {
      renderSuitCanvas(node, configRef.current, animatedViewRef.current);
    }
  }, []);

  useEffect(() => {
    animatedViewRef.current = {
      ...animatedViewRef.current,
      zoom: targetViewRef.current.zoom * 0.982,
    };
    startSmoothViewLoop();
  }, [
    config.fabricId,
    config.weavePattern,
    config.jacketStyleId,
    config.lapelId,
    config.buttonId,
    config.pocketId,
    config.monogramStyle,
    config.monogramColor,
    startSmoothViewLoop,
  ]);

  useEffect(() => {
    if (canvasRef.current) {
      renderSuitCanvas(canvasRef.current, config, animatedViewRef.current);
    }
    const rafId = window.requestAnimationFrame(() => {
      if (canvasRef.current) {
        renderSuitCanvas(canvasRef.current, config, animatedViewRef.current);
      }
    });
    return () => window.cancelAnimationFrame(rafId);
  }, [config, activeNav, isAuthenticated]);

  const handleSelectFabric = useCallback((fabric: FabricOption) => {
    setConfig((prev) => ({
      ...prev,
      fabricId: fabric.id,
      fabricName: fabric.name,
      fabricCode: fabric.code,
      fabricOrigin: fabric.origin,
      colorHex: fabric.colorHex,
      fabricPrice: fabric.price,
      weavePattern: fabric.defaultWeave,
    }));
  }, []);

  const handleZoom = (delta: number) => {
    const prevZoom = targetViewRef.current.zoom;
    const nextZoom = Number(
      Math.min(2.25, Math.max(0.75, prevZoom + delta)).toFixed(3)
    );
    const ratio = nextZoom / prevZoom;
    const maxPan = Math.max(35, (nextZoom - 0.7) * 185);
    const nextPanX =
      nextZoom <= 1.02
        ? 0
        : Math.max(
            -maxPan,
            Math.min(maxPan, targetViewRef.current.panX * ratio)
          );
    const nextPanY =
      nextZoom <= 1.02
        ? 0
        : Math.max(
            -maxPan,
            Math.min(maxPan, targetViewRef.current.panY * ratio)
          );

    targetViewRef.current = {
      ...targetViewRef.current,
      zoom: nextZoom,
      panX: nextPanX,
      panY: nextPanY,
    };
    startSmoothViewLoop();
  };

  const handleSetZoomSmooth = (targetZoom: number) => {
    const clampedZoom = Number(
      Math.min(2.25, Math.max(0.75, targetZoom)).toFixed(3)
    );
    const maxPan = Math.max(35, (clampedZoom - 0.7) * 185);
    targetViewRef.current = {
      ...targetViewRef.current,
      zoom: clampedZoom,
      panX:
        clampedZoom <= 1.02
          ? 0
          : Math.max(-maxPan, Math.min(maxPan, targetViewRef.current.panX)),
      panY:
        clampedZoom <= 1.02
          ? 0
          : Math.max(-maxPan, Math.min(maxPan, targetViewRef.current.panY)),
    };
    startSmoothViewLoop();
  };

  const handleResetView = () => {
    targetViewRef.current = {
      zoom: 1,
      panX: 0,
      panY: 0,
      renderMode: 'composite',
    };
    startSmoothViewLoop();
  };

  const handleFocusBreastPocket = () => {
    targetViewRef.current = {
      ...targetViewRef.current,
      zoom: 1.85,
      panX: -112,
      panY: 162,
    };
    startSmoothViewLoop();
  };

  const handleCanvasDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    if (targetViewRef.current.zoom < 1.35) {
      const rect = canvasEl.getBoundingClientRect();
      const relX =
        ((e.clientX - rect.left) / rect.width - 0.5) * canvasEl.width;
      const relY =
        ((e.clientY - rect.top) / rect.height - 0.5) * canvasEl.height;
      const nextZoom = 1.65;
      const ratio = nextZoom / targetViewRef.current.zoom;
      const maxPan = Math.max(35, (nextZoom - 0.7) * 185);
      targetViewRef.current = {
        ...targetViewRef.current,
        zoom: nextZoom,
        panX: Math.max(
          -maxPan,
          Math.min(
            maxPan,
            targetViewRef.current.panX * ratio - relX * (ratio - 1)
          )
        ),
        panY: Math.max(
          -maxPan,
          Math.min(
            maxPan,
            targetViewRef.current.panY * ratio - relY * (ratio - 1)
          )
        ),
      };
    } else {
      targetViewRef.current = {
        zoom: 1,
        panX: 0,
        panY: 0,
        renderMode: 'composite',
      };
    }
    startSmoothViewLoop();
  };

  const handleDownloadPNG = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `tailor-craft-${config.fabricCode.toLowerCase()}.png`;
    link.href = dataUrl;
    link.click();
  };

  const generateSuitPreviewUrl = (
    targetConfig: SuitConfigState,
    _targetMeasurements?: BodyMeasurements
  ): string => {
    const offscreen = document.createElement('canvas');
    offscreen.width = 500;
    offscreen.height = 650;
    renderSuitCanvas(offscreen, targetConfig, {
      zoom: 1,
      panX: 0,
      panY: 0,
      renderMode: 'composite',
    });
    return offscreen.toDataURL('image/png');
  };

  const handleOpenOrderSummary = () => {
    setSelectedOrderForDetail(null);
    const snapshot =
      canvasRef.current?.toDataURL('image/png') ||
      generateSuitPreviewUrl(config, measurements);
    setCanvasSnapshotUrl(snapshot);
    setIsOrderSummaryModalOpen(true);
  };

  const handleInspectExistingOrder = (order: TailoringOrderRecord) => {
    const snapshot =
      order.previewDataUrl ||
      generateSuitPreviewUrl(order.config, order.measurements);
    setCanvasSnapshotUrl(snapshot);
    setSelectedOrderForDetail(order);
    setIsOrderSummaryModalOpen(true);
  };

  const handleStartEditingOrder = (order: TailoringOrderRecord) => {
    setConfig(order.config);
    setMeasurements(order.measurements);
    setEditingOrderId(order.orderId);
    setSelectedOrderForDetail(null);
    setIsOrderSummaryModalOpen(false);
    navigateToPage('configurator');
  };

  const handleConfirmCreateOrder = () => {
    const snapshot =
      canvasRef.current?.toDataURL('image/png') ||
      canvasSnapshotUrl ||
      generateSuitPreviewUrl(config, measurements);

    if (editingOrderId) {
      setOrders((prev) =>
        prev.map((item) =>
          item.orderId === editingOrderId
            ? {
                ...item,
                previewDataUrl: snapshot,
                config: { ...config },
                measurements: { ...measurements },
                totalPrice: totalEstimatedPrice,
                status:
                  'Đã cập nhật thông số — Nghệ nhân đang hiệu chỉnh rập',
                updatedAt: new Date().toLocaleString('vi-VN'),
              }
            : item
        )
      );
      setEditingOrderId(null);
      setSelectedOrderForDetail(null);
      setIsOrderSummaryModalOpen(false);
      navigateToPage('orders');
      return;
    }

    const orderId = `TC-${Date.now().toString().slice(-6)}`;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 14);

    const newOrder: TailoringOrderRecord = {
      orderId,
      customerId: currentUser.id,
      createdAt: new Date().toLocaleString('vi-VN'),
      stage: 'CAT',
      status: 'Khâu Cắt — Nghệ nhân đang cắt rập thủ công theo số đo',
      estimatedDelivery: deliveryDate.toLocaleDateString('vi-VN'),
      previewDataUrl: snapshot,
      customerName: currentUser.fullName,
      customerPhone: currentUser.phone,
      assignedTailorId: 'USR-TAI-01',
      assignedTailorName: 'Nghệ nhân Trần Minh Đức',
      tailorNotes: 'Đơn đặt may mới tiếp nhận từ trình thiết kế 2D.',
      updatedAt: new Date().toLocaleString('vi-VN'),
      config: { ...config },
      measurements: { ...measurements },
      totalPrice: totalEstimatedPrice,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setSelectedOrderForDetail(null);
    setIsOrderSummaryModalOpen(false);
    setIsCartOpen(true);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDraggingCanvas(true);
    isDraggingCanvasRef.current = true;
    dragStartRef.current = {
      x: e.clientX - targetViewRef.current.panX,
      y: e.clientY - targetViewRef.current.panY,
    };
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingCanvasRef.current) return;
    const maxPan = Math.max(45, (targetViewRef.current.zoom - 0.7) * 185);
    targetViewRef.current = {
      ...targetViewRef.current,
      panX: Math.max(
        -maxPan,
        Math.min(maxPan, e.clientX - dragStartRef.current.x)
      ),
      panY: Math.max(
        -maxPan,
        Math.min(maxPan, e.clientY - dragStartRef.current.y)
      ),
    };
    startSmoothViewLoop();
  };

  const handleCanvasMouseUp = () => {
    setIsDraggingCanvas(false);
    isDraggingCanvasRef.current = false;
  };

  // CỔNG XÁC THỰC BẮT BUỘC: Muốn vào Trang chủ (hoặc hệ thống) phải Đăng ký / Đăng nhập ở AuthPage.tsx trước
  if (!isAuthenticated) {
    return (
      <AuthPage
        accounts={accounts}
        onLoginSuccess={handleLoginSuccess}
        onRegisterCustomer={handleRegisterCustomer}
      />
    );
  }

  // Xác định danh sách menu điều hướng trên Header dựa theo loại tài khoản đang đăng nhập
  const headerNavItems: { id: NavPage; label: string }[] =
    currentUser.role === 'KHACHHANG'
      ? [
          { id: 'home', label: 'Trang chủ' },
          { id: 'configurator', label: 'Thiết kế 2D' },
          { id: 'measurements', label: 'Bộ số đo cá nhân' },
          { id: 'orders', label: 'Theo dõi đơn hàng' },
        ]
      : currentUser.role === 'THOMAY'
      ? [
          {
            id: 'tailor_dashboard',
            label: 'Xưởng Chế Tác & Spec Sheet',
          },
        ]
      : [
          {
            id: 'admin_dashboard',
            label: 'Quản Trị Hệ Thống',
          },
          {
            id: 'tailor_dashboard',
            label: 'Giám Sát Xưởng May',
          },
          {
            id: 'tailor_management',
            label: 'Quản Lý Thợ May',
          },
        ];

  const tailorAccounts = accounts.filter((a) => a.role === 'THOMAY');
  const customerOrders = orders.filter(
    (ord) => ord.customerId === currentUser.id
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#141413]">
      {/* 1. HEADER & NAVIGATION */}
      <header className="sticky top-0 z-30 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#E5E2DC] px-4 sm:px-8 py-4">
        <div className="max-w-[1380px] mx-auto flex items-center justify-between gap-4">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              if (currentUser.role === 'THOMAY') {
                navigateToPage('tailor_dashboard');
              } else if (currentUser.role === 'ADMIN') {
                navigateToPage('admin_dashboard');
              } else {
                navigateToPage('home');
              }
            }}
            className="font-display text-2xl sm:text-[26px] font-bold tracking-tight text-[#141413] whitespace-nowrap shrink-0"
          >
            Tailor Craft
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#65615B]">
            {headerNavItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateToPage(item.id)}
                  className={`relative py-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#141413] font-semibold'
                      : 'hover:text-[#141413]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#9E7B4F] rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Nút Tài khoản dẫn trực tiếp vào trang Cài đặt tài khoản (AccountSettingsPage.tsx) */}
            <button
              type="button"
              onClick={() => navigateToPage('account_settings')}
              className={`px-3.5 py-2 text-xs font-medium border rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeNav === 'account_settings'
                  ? 'border-[#141413] bg-[#EFECE6] text-[#141413] font-semibold'
                  : 'text-[#141413] border-[#D8D4CC] hover:border-[#141413]'
              }`}
            >
              {currentUser.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.fullName}
                  className="w-4 h-4 rounded-full object-cover"
                />
              ) : (
                <User className="w-3.5 h-3.5" />
              )}
              <span>Tài khoản</span>
            </button>

            {currentUser.role === 'KHACHHANG' && (
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="px-4 py-2 text-xs font-semibold bg-[#141413] text-[#F9F8F6] rounded-lg hover:bg-[#2A2826] transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Giỏ hàng</span>
                <span className="font-mono-tabular">
                  ({customerOrders.length})
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-2 text-xs font-medium text-[#65615B] border border-[#D8D4CC] rounded-lg hover:text-red-700 hover:border-red-300 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              title="Đăng xuất ra trang Login / Register"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Thanh điều hướng Mobile */}
        <div className="flex md:hidden items-center justify-between gap-2 pt-3 mt-3 border-t border-[#EAE7E1] overflow-x-auto text-xs font-medium text-[#65615B]">
          {headerNavItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigateToPage(item.id)}
              className={`px-2 py-1 whitespace-nowrap ${
                activeNav === item.id
                  ? 'text-[#141413] font-semibold underline'
                  : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* 2. CÁC TRANG CHÍNH */}
      <AnimatePresence initial={false} custom={navDirection}>
        <motion.div
          key={activeNav}
          custom={navDirection}
          initial={{ opacity: 0, x: navDirection * 28, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            if (canvasRef.current) {
              renderSuitCanvas(canvasRef.current, config, renderOpts);
            }
          }}
          className="flex-1 flex flex-col"
        >
          {/* Trang 1 (KHACHHANG): src/trang-chu/HomePage.tsx */}
          {activeNav === 'home' && (
            <HomePage
              config={config}
              setConfig={setConfig}
              navigateToPage={navigateToPage}
              handleSelectFabric={handleSelectFabric}
            />
          )}

          {/* Trang 2 (KHACHHANG): src/thiet-ke/ConfiguratorPage.tsx */}
          {activeNav === 'configurator' && (
            <ConfiguratorPage
              config={config}
              setConfig={setConfig}
              measurements={measurements}
              renderOpts={renderOpts}
              editingOrderId={editingOrderId}
              setEditingOrderId={setEditingOrderId}
              isDraggingCanvas={isDraggingCanvas}
              isHoveringCanvas={isHoveringCanvas}
              setIsHoveringCanvas={setIsHoveringCanvas}
              handleCanvasViewportRef={handleCanvasViewportRef}
              handleCanvasRef={handleCanvasRef}
              handleCanvasMouseDown={handleCanvasMouseDown}
              handleCanvasMouseMove={handleCanvasMouseMove}
              handleCanvasMouseUp={handleCanvasMouseUp}
              handleCanvasDoubleClick={handleCanvasDoubleClick}
              handleZoom={handleZoom}
              handleSetZoomSmooth={handleSetZoomSmooth}
              handleResetView={handleResetView}
              handleFocusBreastPocket={handleFocusBreastPocket}
              handleDownloadPNG={handleDownloadPNG}
              handleSelectFabric={handleSelectFabric}
              handleOpenOrderSummary={handleOpenOrderSummary}
              navigateToPage={navigateToPage}
              styleAddonPrice={styleAddonPrice}
              totalEstimatedPrice={totalEstimatedPrice}
              currentTargetZoom={targetViewRef.current.zoom}
              fabrics={fabrics}
              lapelOptions={lapelOptions}
              buttonOptions={buttonOptions}
              pocketOptions={pocketOptions}
            />
          )}

          {/* Trang 3 (KHACHHANG): src/bo-so-do-ca-nhan/ProfileMeasurementsPage.tsx */}
          {activeNav === 'measurements' && (
            <ProfileMeasurementsPage
              measurements={measurements}
              setMeasurements={setMeasurements}
              selectedPresetKey={selectedPresetKey}
              setSelectedPresetKey={setSelectedPresetKey}
              navigateToPage={navigateToPage}
              handleOpenOrderSummary={handleOpenOrderSummary}
            />
          )}

          {/* Trang 4 (KHACHHANG): src/theo-doi-don-hang/OrderTrackingPage.tsx */}
          {activeNav === 'orders' && (
            <OrderTrackingPage
              orders={customerOrders}
              navigateToPage={navigateToPage}
              handleStartEditingOrder={handleStartEditingOrder}
              handleInspectExistingOrder={handleInspectExistingOrder}
            />
          )}

          {/* Trang 5 (THOMAY & ADMIN Giám sát): src/xuong-may/TailorDashboardPage.tsx */}
          {activeNav === 'tailor_dashboard' && (
            <TailorDashboardPage
              currentUser={currentUser}
              orders={orders}
              tailorAccounts={tailorAccounts}
              onUpdateOrderStage={handleUpdateOrderStage}
              onAssignTailorToOrder={handleAssignTailorToOrder}
              navigateToPage={navigateToPage}
            />
          )}

          {/* Trang 6 (ADMIN): src/quan-tri/AdminDashboardPage.tsx */}
          {activeNav === 'admin_dashboard' && currentUser.role === 'ADMIN' && (
            <AdminDashboardPage
              currentUser={currentUser}
              fabrics={fabrics}
              setFabrics={setFabrics}
              lapelOptions={lapelOptions}
              setLapelOptions={setLapelOptions}
              buttonOptions={buttonOptions}
              setButtonOptions={setButtonOptions}
              pocketOptions={pocketOptions}
              setPocketOptions={setPocketOptions}
              textureMaskAssets={textureMaskAssets}
              setTextureMaskAssets={setTextureMaskAssets}
              accounts={accounts}
              onCreateTailorAccount={handleCreateTailorAccount}
              onToggleAccountStatus={handleToggleAccountStatus}
              onDeleteAccount={handleDeleteAccount}
              onSwitchAccount={handleLoginSuccess}
              navigateToPage={navigateToPage}
            />
          )}

          {/* Trang 7 (CHỈ TỒN TẠI Ở ADMIN): src/quan-ly-tho-may/TailorManagementPage.tsx */}
          {activeNav === 'tailor_management' && currentUser.role === 'ADMIN' && (
            <TailorManagementPage
              accounts={accounts}
              orders={orders}
              onCreateTailorAccount={handleCreateTailorAccount}
              onToggleAccountStatus={handleToggleAccountStatus}
              onDeleteAccount={handleDeleteAccount}
              navigateToPage={navigateToPage}
            />
          )}

          {/* Trang 7: Trang riêng Cài Đặt Tài Khoản (mở từ button Tài khoản trên Header) */}
          {activeNav === 'account_settings' && (
            <AccountSettingsPage
              currentUser={currentUser}
              orders={customerOrders}
              fabrics={fabrics}
              favoriteFabricIds={currentUserFavoriteFabricIds}
              onToggleFavoriteFabric={handleToggleFavoriteFabric}
              onSelectFabricAndCustomize={(fab) => {
                handleSelectFabric(fab);
                navigateToPage('configurator');
              }}
              onInspectOrder={handleInspectExistingOrder}
              onUpdateAccountProfile={handleUpdateAccountProfile}
              onLogout={handleLogout}
              navigateToPage={navigateToPage}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* 3. POPUP XÁC NHẬN ĐƠN ĐẶT MAY HOẶC XEM CHI TIẾT ĐƠN HÀNG */}
      <OrderSummaryModal
        isOpen={isOrderSummaryModalOpen}
        selectedOrderForDetail={selectedOrderForDetail}
        editingOrderId={editingOrderId}
        config={config}
        measurements={measurements}
        totalEstimatedPrice={totalEstimatedPrice}
        canvasSnapshotUrl={canvasSnapshotUrl}
        onClose={() => {
          setIsOrderSummaryModalOpen(false);
          setSelectedOrderForDetail(null);
        }}
        navigateToPage={navigateToPage}
        handleStartEditingOrder={handleStartEditingOrder}
        handleConfirmCreateOrder={handleConfirmCreateOrder}
      />

      {/* 4. NGĂN GIỎ HÀNG (CART DRAWER) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl">
            <div className="overflow-y-auto pr-1">
              <div className="flex items-center justify-between border-b border-[#EAE7E1] pb-4 mb-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#141413]">
                    Giỏ Hàng Đặt May ({customerOrders.length})
                  </h2>
                  <p className="text-xs text-[#65615B]">
                    Danh sách trang phục Tailor Craft của quý khách
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-[#65615B] hover:text-[#141413] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {customerOrders.map((item) => (
                  <div
                    key={item.orderId}
                    className="p-3.5 rounded-xl border border-[#E5E2DC] bg-[#F9F8F6] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tabular text-[11px] text-[#8C6D46]">
                        Mã đơn: #{item.orderId}
                      </span>
                      <span className="font-mono-tabular text-xs font-bold text-[#141413]">
                        {formatVND(item.totalPrice)}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-[#141413]">
                      Suit Tailor Craft {item.config.fabricName}
                    </div>
                    <div className="text-xs text-[#65615B]">
                      {item.config.lapelName} · {item.config.buttonName} ·{' '}
                      {item.config.pocketName}
                    </div>
                    <div className="text-[11px] font-mono-tabular text-[#57534E]">
                      Số đo: Ngực {item.measurements.chestCm} · Eo{' '}
                      {item.measurements.waistCm} · Vai{' '}
                      {item.measurements.shoulderCm}cm
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E2DC] space-y-3">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Tổng giá trị đơn đặt may:</span>
                <span className="font-mono-tabular text-lg font-bold text-[#8C6D46]">
                  {formatVND(
                    customerOrders.reduce(
                      (sum, item) => sum + item.totalPrice,
                      0
                    )
                  )}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigateToPage('orders');
                }}
                className="w-full py-3 text-xs font-semibold bg-[#141413] text-white rounded-lg hover:bg-[#2A2826] cursor-pointer"
              >
                Theo Dõi Tiến Độ Chế Tác
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. FOOTER */}
      <footer className="mt-12 border-t border-[#E5E2DC] bg-[#F4F2ED] py-6 px-4 sm:px-8 text-xs text-[#65615B]">
        <div className="max-w-[1380px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-display font-bold text-sm text-[#141413]">
              Tailor Craft
            </span>{' '}
            · Nghệ Thuật May Đo Trang Phục Nam Giới Cao Cấp
          </div>
          <div className="flex flex-wrap items-center gap-5">
            {currentUser.role === 'KHACHHANG' && (
              <>
                <button
                  type="button"
                  onClick={() => navigateToPage('home')}
                  className="hover:text-[#141413] cursor-pointer"
                >
                  Trang chủ
                </button>
                <button
                  type="button"
                  onClick={() => navigateToPage('configurator')}
                  className="hover:text-[#141413] cursor-pointer"
                >
                  Thiết kế Suit 2D
                </button>
                <button
                  type="button"
                  onClick={() => navigateToPage('measurements')}
                  className="hover:text-[#141413] cursor-pointer"
                >
                  Hồ sơ số đo
                </button>
                <button
                  type="button"
                  onClick={() => navigateToPage('orders')}
                  className="hover:text-[#141413] cursor-pointer"
                >
                  Theo dõi đơn hàng
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => navigateToPage('account_settings')}
              className="hover:text-[#141413] cursor-pointer"
            >
              Cài đặt tài khoản
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
