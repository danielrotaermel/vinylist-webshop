﻿DROP VIEW IF EXISTS products_consolidated;

DROP TABLE IF EXISTS wishlist_products;
DROP TABLE IF EXISTS orders_products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS product_prices;
DROP TABLE IF EXISTS product_translations;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS product_categories;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS addresses;

DROP TABLE IF EXISTS currencies;
DROP TABLE IF EXISTS languages;

CREATE TABLE languages (
    id			CHAR(5)	PRIMARY KEY
    ,title		TEXT	NOT NULL
    ,is_default BOOLEAN	NOT NULL
);

INSERT INTO languages (id, title, is_default) VALUES ('de_DE', 'German', FALSE);
INSERT INTO languages (id, title, is_default) VALUES ('en_US', 'English (US)', TRUE);

CREATE TABLE currencies (
    id			CHAR(3)		PRIMARY KEY
    ,title		TEXT		NOT NULL
    ,is_default BOOLEAN     NOT NULL
);

INSERT INTO currencies (id, title, is_default) VALUES ('EUR', 'Euro', FALSE);
INSERT INTO currencies (id, title, is_default) VALUES ('USD', 'US Dollars', TRUE);


CREATE TABLE addresses (
    id          	UUID        PRIMARY KEY
    ,name	        TEXT	    NOT NULL
    ,street     	TEXT    	NOT NULL
    ,street_number	TEXT		NOT NULL
    ,country		TEXT		NOT NULL
);

CREATE TABLE users (
    id         	        UUID            PRIMARY KEY
    ,first_name         TEXT    		NOT NULL
    ,last_name   		TEXT     		NOT NULL
    ,email      		TEXT    		NOT NULL UNIQUE
    ,password   		TEXT  			NOT NULL
    ,is_admin           BOOLEAN         NOT NULL
);

-- Insert default admin user (password: test123)
INSERT INTO users (id, first_name, last_name, email, password, is_admin) VALUES ('7f6bb374-4362-4fef-a072-778a86cb8155', 'Max', 'Mustermann', 'max@mustermann.de', '3/JZB8DNw/I5RXOsrPCyyt2cNo4598GSqpfBg40Qcjc=$/5KvnmvDJsSTU3ZQlaT5TWdxGikt7IoRla9SNuPFf5E=', TRUE);


CREATE TABLE product_categories (
    id      UUID        PRIMARY KEY
    ,title  TEXT        NOT NULL
);

CREATE TABLE product_images (
    id          	UUID            PRIMARY KEY
    ,description	TEXT			NOT NULL
    ,base_64_string TEXT            NOT NULL
    ,image_type     TEXT            NOT NULL
);

CREATE TABLE products (
    id              UUID        PRIMARY KEY
    ,artist			TEXT		NOT NULL
    ,label			TEXT		NOT NULL
    ,release_date	DATE		NOT NULL
    ,image_id       UUID        REFERENCES product_images(id)
    ,category_id    UUID    	NOT NULL REFERENCES product_categories(id)
);

CREATE TABLE product_prices (
    id				UUID			PRIMARY KEY
    ,currency_id	CHAR(3)			NOT NULL REFERENCES currencies(id)
    ,price			NUMERIC(5,2)	NOT NULL
    ,product_id		UUID			NOT NULL REFERENCES products(id)
);

CREATE TABLE product_translations (
    id					UUID		PRIMARY KEY
    ,description		TEXT		NOT NULL
    ,description_short	TEXT		NOT NULL
    ,language_id		CHAR(5)		NOT NULL REFERENCES languages(id)
    ,product_id			UUID		NOT NULL REFERENCES products(id)
    ,title				TEXT		NOT NULL
);

CREATE TABLE orders (
    id          	UUID            PRIMARY KEY
    ,total_price	DECIMAL		NOT NULL
    ,user_id        UUID            NOT NULL REFERENCES users(id),
    currency_id    CHAR(3)      NOT NULL REFERENCES currencies(id)
);

CREATE TABLE orders_products (
    order_id        UUID            NOT NULL REFERENCES orders(id)
    ,product_id     UUID            NOT NULL REFERENCES products(id)
    ,amount         INT             NOT NULL
    ,PRIMARY KEY (order_id, product_id)
);

CREATE TABLE wishlist_products (
    product_id      UUID        NOT NULL REFERENCES products(id)
    ,user_id        UUID        NOT NULL REFERENCES users(id)
    ,PRIMARY KEY(product_id, user_id)
);

CREATE OR REPLACE VIEW products_consolidated AS
SELECT p.id, p.artist, p.category_id, p.label, p.release_date, p.image_id, pp.price, pt.description, pt.description_short, pt.title, pp.currency_id as currency, pt.language_id as language
FROM products p, product_prices pp, product_translations pt
WHERE pp.product_id = p.id AND pt.product_id = p.id;