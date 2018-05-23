DROP TABLE IF EXISTS wishlist_products;
DROP TABLE IF EXISTS orders_products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS product_categories;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS addresses;

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
--    ,billing_address_id UUID		    NOT NULL REFERENCES addresses(id)
--    ,address_id 		UUID    		NOT NULL REFERENCES addresses(id)
    ,email      		TEXT    		NOT NULL UNIQUE
    ,password   		TEXT  			NOT NULL
    ,is_admin       BOOLEAN         NOT NULL
);

CREATE TABLE product_categories (
    id      UUID        PRIMARY KEY
    ,name   TEXT        NOT NULL
);

CREATE TABLE products (
    id              UUID        PRIMARY KEY
    ,name           TEXT    		NOT NULL
    ,category_id    UUID    	    NOT NULL REFERENCES product_categories(id)
    ,price		    NUMERIC(2)	    NOT NULL 			
);

CREATE TABLE product_images (
    id          	UUID            PRIMARY KEY
    ,description	TEXT			NOT NULL
    ,file_name      TEXT            NOT NULL
    ,product_id 	UUID		    NOT NULL REFERENCES products(id)
);

CREATE TABLE orders (
    id          	UUID            PRIMARY KEY
    ,total_price	NUMERIC(2)		NOT NULL
    ,user_id        UUID            NOT NULL REFERENCES users(id)
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