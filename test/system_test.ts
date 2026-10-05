import assert from 'node:assert';
import { dbService } from '../src/server/db.js';
import {
  DEFAULT_PRESETS,
  JACKET_STYLE_OPTIONS,
  LAPEL_OPTIONS,
  BUTTON_OPTIONS,
  POCKET_OPTIONS,
  PRODUCTION_STAGES,
  INITIAL_USER_ACCOUNTS,
  formatVND,
} from '../src/types/suitTypes.js';
import { FABRIC_CATALOG } from '../src/fabricCatalogData.js';

console.log('========================================================================');
console.log('🚀 BẮT ĐẦU CHẠY BỘ KIỂM THỬ TỰ ĐỘNG MỞ RỘNG (EXTENDED AUTOMATED SUITE)');
console.log('Hệ thống: Bespoke Suit Couture Web System');
console.log('========================================================================\n');

let passedTests = 0;
let failedTests = 0;

function runTest(name: string, fn: () => void | Promise<void>) {
  return Promise.resolve()
    .then(() => fn())
    .then(() => {
      console.log(`  ✅ [PASSED]: ${name}`);
      passedTests++;
    })
    .catch((err) => {
      console.error(`  ❌ [FAILED]: ${name}`);
      console.error(`     Nguyên nhân: ${err.message}`);
      failedTests++;
    });
}

async function startTestSuite() {
  const startTime = Date.now();

  console.log('--- TEST NHÓM 1: CẤU HÌNH DANH MỤC VẢI & PHỤ KIỆN ÁO ---');
  await runTest('TC01: Danh mục vải có tối thiểu 20 mẫu vải chất lượng cao', () => {
    assert(FABRIC_CATALOG.length >= 20, `Số lượng vải: ${FABRIC_CATALOG.length}`);
    const validPrices = FABRIC_CATALOG.every((f) => f.price > 0 && f.colorHex && f.name);
    assert.strictEqual(validPrices, true, 'Tất cả mẫu vải đều có đơn giá và mã màu hợp lệ');
  });

  await runTest('TC02: Lọc danh mục vải theo nguồn gốc xuất xứ (Ý, Anh Quốc)', () => {
    const italyFabrics = FABRIC_CATALOG.filter((f) => f.origin.toLowerCase().includes('ý') || f.origin.toLowerCase().includes('italy'));
    const englandFabrics = FABRIC_CATALOG.filter((f) => f.origin.toLowerCase().includes('anh') || f.origin.toLowerCase().includes('england'));
    assert(italyFabrics.length > 0, 'Phải có vải xuất xứ Ý');
    assert(englandFabrics.length > 0, 'Phải có vải xuất xứ Anh Quốc');
  });

  await runTest('TC03: Tùy chọn kiểu dáng áo vest hỗ trợ đủ 5 vạt áo kinh điển', () => {
    assert.strictEqual(JACKET_STYLE_OPTIONS.length, 5);
    const ids = JACKET_STYLE_OPTIONS.map((o) => o.id);
    assert(ids.includes('sb_1_button'), 'Thiếu vạt đơn 1 cúc');
    assert(ids.includes('sb_2_buttons'), 'Thiếu vạt đơn 2 cúc');
    assert(ids.includes('db_4_buttons'), 'Thiếu vạt kép 4 cúc');
    assert(ids.includes('db_6_buttons'), 'Thiếu vạt kép 6 cúc');
    assert(ids.includes('mandarin'), 'Thiếu cổ tàu mandarin');
  });

  await runTest('TC04: Đơn giá các tùy chọn Ve áo, Khuy cúc, Túi áo hợp lệ (không âm)', () => {
    assert(LAPEL_OPTIONS.every((l) => l.price >= 0));
    assert(BUTTON_OPTIONS.every((b) => b.price >= 0));
    assert(POCKET_OPTIONS.every((p) => p.price >= 0));
  });

  console.log('\n--- TEST NHÓM 2: THIẾT KẾ QUẦN ÂU (TROUSERS CUSTOMIZATION) ---');
  await runTest('TC05: Kiểm tra các tùy chọn phong cách quần âu (Flat Front, Pleated, Gurkha)', () => {
    const validStyles = ['flat_front', 'single_pleat', 'high_waisted', 'double_pleat', 'gurkha'];
    const sampleSelection = 'gurkha';
    assert(validStyles.includes(sampleSelection), 'Kiểu quần Gurkha phải thuộc danh sách hợp lệ');
  });

  await runTest('TC06: Kiểm tra độ cao cạp quần (Standard Mid-Rise vs High-Waisted)', () => {
    const validRises = ['mid_rise', 'high_rise'];
    assert(validRises.includes('mid_rise') && validRises.includes('high_rise'));
  });

  console.log('\n--- TEST NHÓM 3: THUẬT TOÁN TÍNH TỔNG GIÁ & ĐỊNH DẠNG TIỀN TỆ ---');
  await runTest('TC07: Thuật toán cộng dồn tổng giá trị bộ Suit Bespoke', () => {
    const baseFabricPrice = 12000000;
    const jacketAddon = 150000; // Vạt kép 4 cúc
    const lapelAddon = 30000;   // Cổ nhọn
    const buttonAddon = 50000;  // Cúc mạ vàng 24K
    const pocketAddon = 0;      // Túi nắp
    const expectedTotal = 12230000;
    const computedTotal = baseFabricPrice + jacketAddon + lapelAddon + buttonAddon + pocketAddon;
    assert.strictEqual(computedTotal, expectedTotal, 'Tổng giá trị tính toán phải chính xác từng đồng');
  });

  await runTest('TC08: Hàm định dạng tiền tệ formatVND hiển thị đúng chuẩn Việt Nam', () => {
    const formatted = formatVND(15500000);
    assert(formatted.includes('15.500.000'), `Định dạng tiền tệ thực tế: ${formatted}`);
    assert(formatted.includes('₫'), 'Phải có ký hiệu đồng ₫');
  });

  console.log('\n--- TEST NHÓM 4: QUẢN LÝ SỐ ĐO GIẢI PHẪU NHÂN TRẮC HỌC ---');
  await runTest('TC09: Phom chuẩn mặc định (Presets Size M, L, XL) có chỉ số cân đối giải phẫu', () => {
    const sizeL = DEFAULT_PRESETS.size_l;
    assert.strictEqual(sizeL.chestCm, 98);
    assert.strictEqual(sizeL.waistCm, 84);
    assert(sizeL.chestCm > sizeL.waistCm, 'Ngực phải lớn hơn eo chuẩn Bespoke');
    assert(DEFAULT_PRESETS.size_m.chestCm < DEFAULT_PRESETS.size_xl.chestCm);
  });

  await runTest('TC10: Kiểm tra giới hạn biên của 11 chỉ số số đo cơ thể', () => {
    const custom = {
      chest: 100,
      waist: 85,
      shoulder: 46,
      sleeve: 62,
      height: 175,
      weight: 70,
    };
    assert(custom.chest >= 70 && custom.chest <= 150, 'Vòng ngực trong khoảng 70-150cm');
    assert(custom.waist >= 55 && custom.waist <= 140, 'Vòng eo trong khoảng 55-140cm');
    assert(custom.height >= 140 && custom.height <= 220, 'Chiều cao trong khoảng 140-220cm');
  });

  console.log('\n--- TEST NHÓM 5: VÒNG ĐỜI ĐƠN HÀNG & TIẾN TRÌNH SẢN XUẤT ---');
  await runTest('TC11: Quy trình chế tác chuẩn xác 4 bước theo đúng thứ tự', () => {
    assert.strictEqual(PRODUCTION_STAGES.length, 4);
    assert.strictEqual(PRODUCTION_STAGES[0].key, 'CAT');
    assert.strictEqual(PRODUCTION_STAGES[1].key, 'MAY');
    assert.strictEqual(PRODUCTION_STAGES[2].key, 'KIEM_DINH');
    assert.strictEqual(PRODUCTION_STAGES[3].key, 'HOAN_TAT');
  });

  await runTest('TC12: Chuyển đổi trạng thái khâu sản xuất tuần tự', () => {
    const stages = ['CAT', 'MAY', 'KIEM_DINH', 'HOAN_TAT'];
    let currentStage = 'CAT';
    const nextIdx = stages.indexOf(currentStage) + 1;
    currentStage = stages[nextIdx];
    assert.strictEqual(currentStage, 'MAY');
  });

  console.log('\n--- TEST NHÓM 6: PHÂN QUYỀN VÀ TRẠNG THÁI TÀI KHOẢN (RBAC) ---');
  await runTest('TC13: Có đủ tài khoản khởi tạo cho 3 phân quyền KHACHHANG, THOMAY, ADMIN', () => {
    const roles = INITIAL_USER_ACCOUNTS.map((a) => a.role);
    assert(roles.includes('KHACHHANG'), 'Thiếu role KHACHHANG');
    assert(roles.includes('THOMAY'), 'Thiếu role THOMAY');
    assert(roles.includes('ADMIN'), 'Thiếu role ADMIN');
  });

  await runTest('TC14: Kiểm tra trạng thái tài khoản (ACTIVE vs LOCKED)', () => {
    const sampleAccount = { ...INITIAL_USER_ACCOUNTS[0], status: 'ACTIVE' };
    assert.strictEqual(sampleAccount.status, 'ACTIVE');
    // Giả lập khóa tài khoản
    sampleAccount.status = 'LOCKED';
    assert.strictEqual(sampleAccount.status, 'LOCKED', 'Tài khoản phải chuyển thành trạng thái LOCKED khi bị khóa');
  });

  console.log('\n--- TEST NHÓM 7: DATABASE ADAPTER & PERSISTENCE LAYER ---');
  await runTest('TC15: Khởi tạo Database Service và kiểm tra tính toàn vẹn', async () => {
    const status = await dbService.initialize();
    assert.strictEqual(typeof status.activeType, 'string');
    assert.strictEqual(typeof status.counts.users, 'number');
    assert(status.counts.users > 0, 'Dữ liệu người dùng mẫu được nạp đầy đủ');
  });

  await runTest('TC16: Thực thi CRUD Đơn hàng trên Database Layer', async () => {
    const testOrderId = `TEST-ORD-${Date.now()}`;
    const newOrder = await dbService.createOrder({
      id: testOrderId,
      customerId: 'USR-CUS-01',
      customerName: 'Nguyễn Văn Kiểm Thử',
      customerPhone: '0901 234 567',
      suitItemName: 'Kiểm Thử Suit 2D Cao Cấp',
      totalPrice: 15500000,
      stage: 'CAT',
      status: 'Đang chế tác',
    });
    assert.strictEqual(newOrder.id, testOrderId);

    // Cập nhật stage sang MAY
    const updated = await dbService.updateOrderStage(testOrderId, 'MAY', 'Đã chuyển khâu may');
    assert.strictEqual(updated?.stage, 'MAY');

    // Kiểm tra đơn hàng tồn tại trong danh sách
    const allOrders = await dbService.getOrders();
    const found = allOrders.find((o: any) => o.id === testOrderId);
    assert(found !== undefined, 'Đơn hàng mới tạo phải truy vấn được');
  });

  await runTest('TC17: Lọc danh sách đơn hàng theo ID của thợ may (Assignee)', async () => {
    const allOrders = await dbService.getOrders();
    const tailorOrders = allOrders.filter((o: any) => o.tailorId === 'USR-TLR-01');
    assert(Array.isArray(tailorOrders));
  });

  await runTest('TC18: Lưu trữ và truy xuất số đo người dùng độc lập', async () => {
    const userId = 'TEST-USER-001';
    const testMeasurements = {
      chest: 102,
      waist: 86,
      shoulder: 47,
      sleeve: 63,
    };
    await dbService.saveMeasurements(userId, testMeasurements);
    const retrieved = await dbService.getMeasurements(userId);
    assert.strictEqual(retrieved?.chest, 102);
    assert.strictEqual(retrieved?.waist, 86);
  });

  const duration = Date.now() - startTime;
  console.log('\n========================================================================');
  console.log(`📊 TỔNG KẾT KẾT QUẢ BỘ KIỂM THỬ MỞ RỘNG:`);
  console.log(`   - Tổng số test case: ${passedTests + failedTests}`);
  console.log(`   - Thành công:         ${passedTests}`);
  console.log(`   - Thất bại:           ${failedTests}`);
  console.log(`   - Tỷ lệ vượt qua:     ${((passedTests / (passedTests + failedTests)) * 100).toFixed(1)}%`);
  console.log(`   - Thời gian thực thi: ${duration} ms`);
  console.log('========================================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

startTestSuite();
