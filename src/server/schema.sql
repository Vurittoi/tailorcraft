-- =========================================================================
-- HỆ THỐNG CƠ SỞ DỮ LIỆU MYSQL - BESPOKE SUIT COUTURE
-- Bảng và Cấu trúc quan hệ (Relational Database Schema)
-- Phù hợp cho: MySQL 8.0+ / MariaDB 10.5+
-- =========================================================================

CREATE DATABASE IF NOT EXISTS `bespoke_couture` 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `bespoke_couture`;

-- 1. Bảng Người dùng (Khách hàng, Thợ may, Quản trị viên)
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `phone` VARCHAR(25) NULL,
  `avatar_url` VARCHAR(255) NULL,
  `role` ENUM('KHACHHANG', 'THOMAY', 'ADMIN') NOT NULL DEFAULT 'KHACHHANG',
  `status` ENUM('ACTIVE', 'LOCKED') NOT NULL DEFAULT 'ACTIVE',
  `experience_years` INT NULL,
  `specialty` VARCHAR(255) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_role` (`role`),
  INDEX `idx_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Bảng Bộ số đo cá nhân (Bespoke Body Measurements)
CREATE TABLE IF NOT EXISTS `body_measurements` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` VARCHAR(50) NOT NULL,
  `height` DECIMAL(5,1) NOT NULL DEFAULT 175.0,
  `weight` DECIMAL(5,1) NOT NULL DEFAULT 68.0,
  `chest` DECIMAL(5,1) NOT NULL,
  `waist` DECIMAL(5,1) NOT NULL,
  `shoulder` DECIMAL(5,1) NOT NULL,
  `arm_length` DECIMAL(5,1) NOT NULL,
  `suit_length` DECIMAL(5,1) NOT NULL,
  `trouser_waist` DECIMAL(5,1) NOT NULL,
  `trouser_hip` DECIMAL(5,1) NOT NULL,
  `trouser_outseam` DECIMAL(5,1) NOT NULL,
  `trouser_crotch` DECIMAL(5,1) NOT NULL,
  `thigh` DECIMAL(5,1) NOT NULL,
  `ankle` DECIMAL(5,1) NOT NULL,
  `posture_notes` TEXT NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_measurements_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  INDEX `idx_measurements_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Bảng Danh mục vải cao cấp (Fabrics Catalog)
CREATE TABLE IF NOT EXISTS `fabrics` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `origin` VARCHAR(100) NOT NULL,
  `mill_name` VARCHAR(100) NULL,
  `composition` VARCHAR(100) NOT NULL,
  `color_hex` VARCHAR(10) NOT NULL,
  `weave_pattern` VARCHAR(50) NOT NULL,
  `weight_gsm` INT NOT NULL DEFAULT 280,
  `price_vnd` DECIMAL(12,2) NOT NULL DEFAULT 12000000.00,
  `in_stock` BOOLEAN NOT NULL DEFAULT TRUE,
  `swatch_url` VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Bảng Đơn đặt may Bespoke (Tailoring Orders)
CREATE TABLE IF NOT EXISTS `orders` (
  `id` VARCHAR(50) NOT NULL PRIMARY KEY,
  `customer_id` VARCHAR(50) NOT NULL,
  `customer_name` VARCHAR(150) NOT NULL,
  `customer_phone` VARCHAR(25) NOT NULL,
  `customer_email` VARCHAR(150) NOT NULL,
  `shipping_address` TEXT NOT NULL,
  `tailor_id` VARCHAR(50) NULL,
  `tailor_name` VARCHAR(150) NULL,
  `suit_item_name` VARCHAR(255) NOT NULL,
  `fabric_id` VARCHAR(50) NOT NULL,
  `fabric_name` VARCHAR(150) NOT NULL,
  `color_hex` VARCHAR(10) NOT NULL,
  `total_price` DECIMAL(12,2) NOT NULL,
  `paid_amount` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `status` ENUM('CHO_XAC_NHAN', 'DANG_MAY', 'HOAN_THANH', 'DA_GIAO', 'DA_HUY') NOT NULL DEFAULT 'DANG_MAY',
  `stage` ENUM('TIEP_NHAN', 'LAY_SO_DO', 'CAT_RAP', 'MAY_MOC_THO', 'THU_FORM', 'HOAN_THIEN', 'SAN_SANG') NOT NULL DEFAULT 'MAY_MOC_THO',
  `estimated_delivery_date` DATE NULL,
  `suit_config_json` JSON NOT NULL,
  `measurements_json` JSON NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_orders_customer` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_orders_tailor` FOREIGN KEY (`tailor_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  INDEX `idx_orders_status` (`status`),
  INDEX `idx_orders_stage` (`stage`),
  INDEX `idx_orders_customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
