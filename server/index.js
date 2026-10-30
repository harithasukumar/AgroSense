CREATE DATABASE IF NOT EXISTS agrosense;
USE agrosense;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(30) DEFAULT 'farmer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS farm_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  farm_name VARCHAR(120) NOT NULL,
  location VARCHAR(120) NOT NULL,
  soil_type VARCHAR(80),
  crop VARCHAR(80),
  season VARCHAR(30),
  farm_area DECIMAL(10,2) NOT NULL,
  water_availability DECIMAL(10,2) DEFAULT 0,
  fertilizer_budget DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS crops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  crop_name VARCHAR(100) NOT NULL,
  suitable_season VARCHAR(30),
  soil_requirement VARCHAR(120),
  water_need VARCHAR(50),
  duration_days INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS soil_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farm_id INT NOT NULL,
  nitrogen DECIMAL(6,2),
  phosphorus DECIMAL(6,2),
  potassium DECIMAL(6,2),
  ph_value DECIMAL(4,2),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farm_id) REFERENCES farm_profiles(id)
);

CREATE TABLE IF NOT EXISTS water_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farm_id INT NOT NULL,
  water_used DECIMAL(10,2),
  rainfall_mm DECIMAL(8,2),
  groundwater_level DECIMAL(8,2),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farm_id) REFERENCES farm_profiles(id)
);

CREATE TABLE IF NOT EXISTS fertilizer_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farm_id INT NOT NULL,
  nitrogen_kg DECIMAL(10,2),
  phosphorus_kg DECIMAL(10,2),
  potassium_kg DECIMAL(10,2),
  total_cost DECIMAL(12,2),
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farm_id) REFERENCES farm_profiles(id)
);

CREATE TABLE IF NOT EXISTS pesticide_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farm_id INT NOT NULL,
  crop VARCHAR(80),
  product_name VARCHAR(120),
  dose VARCHAR(80),
  safety_reminder TEXT,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farm_id) REFERENCES farm_profiles(id)
);

CREATE TABLE IF NOT EXISTS energy_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farm_id INT NOT NULL,
  electricity_kwh DECIMAL(10,2),
  diesel_liters DECIMAL(10,2),
  pump_hours DECIMAL(8,2),
  total_cost DECIMAL(12,2),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farm_id) REFERENCES farm_profiles(id)
);

CREATE TABLE IF NOT EXISTS labor_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farm_id INT NOT NULL,
  activity VARCHAR(120),
  workers_required INT,
  workdays INT,
  cost DECIMAL(12,2),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farm_id) REFERENCES farm_profiles(id)
);

CREATE TABLE IF NOT EXISTS weather_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farm_id INT NOT NULL,
  temperature DECIMAL(5,2),
  humidity DECIMAL(5,2),
  rainfall_mm DECIMAL(8,2),
  wind_speed DECIMAL(5,2),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farm_id) REFERENCES farm_profiles(id)
);

CREATE TABLE IF NOT EXISTS recommendations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farm_id INT NOT NULL,
  title VARCHAR(150),
  domain VARCHAR(50),
  reasoning TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farm_id) REFERENCES farm_profiles(id)
);

CREATE TABLE IF NOT EXISTS irrigation_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farm_id INT NOT NULL,
  stage VARCHAR(80),
  water_mm DECIMAL(8,2),
  schedule_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farm_id) REFERENCES farm_profiles(id)
);

CREATE TABLE IF NOT EXISTS simulation_scenarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farm_id INT NOT NULL,
  name VARCHAR(100),
  water_availability DECIMAL(10,2),
  electricity_price DECIMAL(8,2),
  diesel_price DECIMAL(8,2),
  fertilizer_budget DECIMAL(12,2),
  labor_availability INT,
  rainfall_forecast DECIMAL(8,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farm_id) REFERENCES farm_profiles(id)
);

CREATE TABLE IF NOT EXISTS budget_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farm_id INT NOT NULL,
  seed_cost DECIMAL(12,2),
  water_cost DECIMAL(12,2),
  fertilizer_cost DECIMAL(12,2),
  pesticide_cost DECIMAL(12,2),
  energy_cost DECIMAL(12,2),
  labor_cost DECIMAL(12,2),
  equipment_cost DECIMAL(12,2),
  total_cost DECIMAL(12,2),
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farm_id) REFERENCES farm_profiles(id)
);
