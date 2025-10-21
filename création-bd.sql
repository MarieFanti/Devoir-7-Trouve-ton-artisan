CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;

CREATE TABLE artisans (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    specialites VARCHAR(255),
    note DECIMAL(3,1),
    ville VARCHAR(255),
    propos TEXT,
    email VARCHAR(255),
    site_web VARCHAR(255),
    categorie ENUM('alimentation', 'batiment', 'fabrication', 'services') DEFAULT NULL,
    top TINYINT(1) DEFAULT 0
) CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE INDEX idx_nom ON artisans(nom);
CREATE INDEX idx_ville ON artisans(ville);
CREATE INDEX idx_categorie ON artisans(categorie);
