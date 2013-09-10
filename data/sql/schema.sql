CREATE TABLE customer (id BIGINT AUTO_INCREMENT, category_id BIGINT NOT NULL, type VARCHAR(255), name VARCHAR(255) NOT NULL, logo VARCHAR(255), url VARCHAR(255), street VARCHAR(255) NOT NULL, zip VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, description TEXT NOT NULL, token VARCHAR(255) NOT NULL UNIQUE, is_public TINYINT(1) DEFAULT '1' NOT NULL, is_activated TINYINT(1) DEFAULT '0' NOT NULL, email VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX category_id_idx (category_id), PRIMARY KEY(id)) ENGINE = INNODB;
CREATE TABLE customer_category (id BIGINT AUTO_INCREMENT, name VARCHAR(255) NOT NULL UNIQUE, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(id)) ENGINE = INNODB;
ALTER TABLE customer ADD CONSTRAINT customer_category_id_customer_category_id FOREIGN KEY (category_id) REFERENCES customer_category(id) ON DELETE CASCADE;
