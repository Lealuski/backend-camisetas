CREATE DATABASE IF NOT EXISTS policamisetas_db;
CREATE USER IF NOT EXISTS 'nest'@'%' IDENTIFIED WITH mysql_native_password BY 'app';
GRANT ALL PRIVILEGES ON policamisetas_db.* TO 'nest'@'%';
FLUSH PRIVILEGES;