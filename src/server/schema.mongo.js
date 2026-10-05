/**
 * =========================================================================
 * HỆ THỐNG CƠ SỞ DỮ LIỆU MONGODB - BESPOKE SUIT COUTURE
 * Cấu trúc Collection và Quy tắc Schema Validation (MongoDB Document Schema)
 * Phù hợp cho: MongoDB 5.0+ / MongoDB Atlas / Mongoose
 * =========================================================================
 */

export const MongoDBSchemaDefinitions = {
  // 1. Collection 'users'
  users: {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['_id', 'fullName', 'email', 'role', 'status'],
        properties: {
          _id: { bsonType: 'string', description: 'User Unique ID (e.g., USR-CUS-01)' },
          fullName: { bsonType: 'string', description: 'Tên đầy đủ của người dùng' },
          email: { bsonType: 'string', pattern: '^.+@.+\\..+$', description: 'Email hợp lệ' },
          phone: { bsonType: ['string', 'null'] },
          avatar: { bsonType: ['string', 'null'] },
          role: { enum: ['KHACHHANG', 'THOMAY', 'ADMIN'] },
          status: { enum: ['ACTIVE', 'LOCKED'] },
          experienceYears: { bsonType: ['int', 'null'] },
          specialty: { bsonType: ['string', 'null'] },
          createdAt: { bsonType: 'date' },
        },
      },
    },
    indexes: [
      { key: { email: 1 }, unique: true },
      { key: { role: 1 } },
    ],
  },

  // 2. Collection 'orders'
  orders: {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['_id', 'customerId', 'customerName', 'totalPrice', 'status', 'stage', 'suitConfig', 'measurements'],
        properties: {
          _id: { bsonType: 'string', description: 'Mã đơn may đo ORD-YYYY-XXXX' },
          customerId: { bsonType: 'string' },
          customerName: { bsonType: 'string' },
          customerPhone: { bsonType: 'string' },
          customerEmail: { bsonType: 'string' },
          shippingAddress: { bsonType: 'string' },
          tailorId: { bsonType: ['string', 'null'] },
          tailorName: { bsonType: ['string', 'null'] },
          suitItemName: { bsonType: 'string' },
          fabricId: { bsonType: 'string' },
          fabricName: { bsonType: 'string' },
          colorHex: { bsonType: 'string' },
          totalPrice: { bsonType: 'number' },
          paidAmount: { bsonType: 'number' },
          status: { enum: ['CHO_XAC_NHAN', 'DANG_MAY', 'HOAN_THANH', 'DA_GIAO', 'DA_HUY'] },
          stage: { enum: ['TIEP_NHAN', 'LAY_SO_DO', 'CAT_RAP', 'MAY_MOC_THO', 'THU_FORM', 'HOAN_THIEN', 'SAN_SANG'] },
          estimatedDeliveryDate: { bsonType: ['string', 'null'] },
          suitConfig: { bsonType: 'object' },
          measurements: { bsonType: 'object' },
          createdAt: { bsonType: 'date' },
          updatedAt: { bsonType: 'date' },
        },
      },
    },
    indexes: [
      { key: { customerId: 1 } },
      { key: { tailorId: 1 } },
      { key: { stage: 1 } },
      { key: { createdAt: -1 } },
    ],
  },

  // 3. Collection 'measurements'
  measurements: {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['userId', 'chest', 'waist', 'shoulder', 'armLength', 'suitLength'],
        properties: {
          userId: { bsonType: 'string' },
          height: { bsonType: 'number' },
          weight: { bsonType: 'number' },
          chest: { bsonType: 'number' },
          waist: { bsonType: 'number' },
          shoulder: { bsonType: 'number' },
          armLength: { bsonType: 'number' },
          suitLength: { bsonType: 'number' },
          trouserWaist: { bsonType: 'number' },
          trouserHip: { bsonType: 'number' },
          trouserOutseam: { bsonType: 'number' },
          trouserCrotch: { bsonType: 'number' },
          thigh: { bsonType: 'number' },
          ankle: { bsonType: 'number' },
          postureNotes: { bsonType: ['string', 'null'] },
        },
      },
    },
    indexes: [
      { key: { userId: 1 }, unique: true },
    ],
  },
};
