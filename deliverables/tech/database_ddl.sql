-- 养娃管家核心数据库 DDL（MySQL 8）
-- version: v0.1

CREATE DATABASE IF NOT EXISTS parenting_app DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE parenting_app;

CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  openid VARCHAR(64) NOT NULL UNIQUE,
  unionid VARCHAR(64) NULL,
  nickname VARCHAR(64) NULL,
  avatar_url VARCHAR(255) NULL,
  mobile VARCHAR(32) NULL,
  city VARCHAR(64) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE family_members (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  role ENUM('mother','father','grandparent','other') NOT NULL DEFAULT 'other',
  name VARCHAR(64) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_family_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE children (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  name VARCHAR(64) NOT NULL,
  gender ENUM('male','female','other') DEFAULT 'other',
  birthday DATE NOT NULL,
  stage ENUM('0_6m','6_12m','1_3y','3_6y','6_12y','12y_plus') NOT NULL,
  allergy_profile JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_child_user FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_child_user_stage(user_id, stage)
);

CREATE TABLE weather_snapshots (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  city VARCHAR(64) NOT NULL,
  weather_date DATE NOT NULL,
  condition_text VARCHAR(64) NOT NULL,
  temp_current DECIMAL(5,2) NOT NULL,
  temp_min DECIMAL(5,2) NULL,
  temp_max DECIMAL(5,2) NULL,
  humidity DECIMAL(5,2) NULL,
  wind_speed DECIMAL(6,2) NULL,
  precipitation_prob DECIMAL(5,2) NULL,
  source VARCHAR(64) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_city_date(city, weather_date)
);

CREATE TABLE feeding_recommendations (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  child_id BIGINT NOT NULL,
  recommend_date DATE NOT NULL,
  breakfast JSON NOT NULL,
  lunch JSON NOT NULL,
  dinner JSON NOT NULL,
  snack JSON NULL,
  notes VARCHAR(255) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_feed_child FOREIGN KEY (child_id) REFERENCES children(id),
  UNIQUE KEY uk_feed_child_date(child_id, recommend_date)
);

CREATE TABLE outfit_brands (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  brand_name VARCHAR(64) NOT NULL,
  price_range VARCHAR(64) NULL,
  material_score DECIMAL(5,2) NULL,
  comfort_score DECIMAL(5,2) NULL,
  durability_score DECIMAL(5,2) NULL,
  care_difficulty_score DECIMAL(5,2) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE places (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(128) NOT NULL,
  city VARCHAR(64) NOT NULL,
  district VARCHAR(64) NULL,
  latitude DECIMAL(10,7) NOT NULL,
  longitude DECIMAL(10,7) NOT NULL,
  venue_type ENUM('park','museum','playground','indoor_center','other') NOT NULL,
  age_range VARCHAR(32) NULL,
  avg_cost DECIMAL(10,2) NULL,
  indoor_flag TINYINT(1) NOT NULL DEFAULT 0,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_place_city(city),
  INDEX idx_place_type(venue_type)
);

CREATE TABLE schools (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(128) NOT NULL,
  city VARCHAR(64) NOT NULL,
  district VARCHAR(64) NULL,
  latitude DECIMAL(10,7) NOT NULL,
  longitude DECIMAL(10,7) NOT NULL,
  stage ENUM('nursery_0_3','kindergarten_3_6','primary_6_12','middle_12_plus') NOT NULL,
  ownership ENUM('public','private','inclusive','other') NOT NULL DEFAULT 'other',
  tuition_range VARCHAR(64) NULL,
  teacher_student_ratio VARCHAR(32) NULL,
  features JSON NULL,
  rating DECIMAL(3,2) NULL,
  policy_updated_at DATETIME NULL,
  source_url VARCHAR(255) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_school_city_stage(city, stage)
);

CREATE TABLE schedule_events (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  child_id BIGINT NULL,
  event_type ENUM('vaccine','checkup','school','custom') NOT NULL,
  title VARCHAR(128) NOT NULL,
  event_time DATETIME NOT NULL,
  location VARCHAR(255) NULL,
  note VARCHAR(500) NULL,
  status ENUM('pending','done','overdue','cancelled') NOT NULL DEFAULT 'pending',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_event_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_event_child FOREIGN KEY (child_id) REFERENCES children(id),
  INDEX idx_event_user_time(user_id, event_time)
);

CREATE TABLE reminder_jobs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  event_id BIGINT NOT NULL,
  remind_at DATETIME NOT NULL,
  channel ENUM('wx_subscribe','in_app') NOT NULL,
  status ENUM('pending','sent','failed','cancelled') NOT NULL DEFAULT 'pending',
  fail_reason VARCHAR(255) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_reminder_event FOREIGN KEY (event_id) REFERENCES schedule_events(id),
  INDEX idx_reminder_status_time(status, remind_at)
);

CREATE TABLE health_records (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  child_id BIGINT NOT NULL,
  metric_type ENUM('height','weight','head_circumference','temperature','sleep_hours','stool','medication','allergy','visit') NOT NULL,
  metric_value VARCHAR(128) NOT NULL,
  unit VARCHAR(16) NULL,
  record_time DATETIME NOT NULL,
  note VARCHAR(500) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_health_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_health_child FOREIGN KEY (child_id) REFERENCES children(id),
  INDEX idx_health_child_time(child_id, record_time)
);

CREATE TABLE expense_records (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  child_id BIGINT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category ENUM('food','diaper','clothing','medical','education','toy','travel','other') NOT NULL,
  member_id BIGINT NULL,
  paid_at DATETIME NOT NULL,
  note VARCHAR(500) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_expense_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_expense_child FOREIGN KEY (child_id) REFERENCES children(id),
  CONSTRAINT fk_expense_member FOREIGN KEY (member_id) REFERENCES family_members(id),
  INDEX idx_expense_user_paid(user_id, paid_at),
  INDEX idx_expense_user_category(user_id, category)
);

CREATE TABLE budget_plans (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  period_type ENUM('monthly','quarterly','yearly') NOT NULL DEFAULT 'monthly',
  period_key VARCHAR(16) NOT NULL,
  budget_amount DECIMAL(10,2) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_budget_user FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE KEY uk_user_period(user_id, period_type, period_key)
);

CREATE TABLE voice_intent_logs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  session_id VARCHAR(64) NOT NULL,
  asr_text VARCHAR(500) NOT NULL,
  intent_code VARCHAR(64) NOT NULL,
  slots JSON NULL,
  confidence DECIMAL(5,2) NULL,
  execute_status ENUM('success','failed','confirm_required') NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_voice_user FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_voice_user_time(user_id, created_at)
);
