-- Use the database
USE osdb;

-- Create the categories table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Create the products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Create the orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the order_items table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

USE osdb;

-- Insert sample data into the categories table
INSERT INTO categories (name)
VALUES 
    ('Electronics'),
    ('Clothing'),
    ('Books'),
    ('Home Appliances'),
    ('Toys'),
    ('Sports Equipment');

-- Insert sample data into the products table
INSERT INTO products (name, description, price, category_id)
VALUES
    ('Smartphone', 'A high-end smartphone with 128GB storage and 5G connectivity.', 699.99, 1),
    ('Laptop', 'A powerful laptop with 16GB RAM and 512GB SSD.', 999.99, 1),
    ('Bluetooth Speaker', 'Portable speaker with excellent sound quality and Bluetooth 5.0.', 49.99, 1),
    ('Smartwatch', 'Wearable device with health tracking and notifications.', 199.99, 1),
    ('T-Shirt', 'Comfortable cotton T-shirt available in various colors.', 19.99, 2),
    ('Jeans', 'Denim jeans with a slim fit design.', 49.99, 2),
    ('Winter Jacket', 'Warm jacket suitable for cold weather.', 89.99, 2),
    ('Sneakers', 'Lightweight and durable sneakers for everyday use.', 69.99, 2),
    ('Fiction Book', 'A captivating fiction novel by a bestselling author.', 14.99, 3),
    ('Cookbook', 'A collection of recipes from around the world.', 29.99, 3),
    ('Self-Help Book', 'A guide to personal development and productivity.', 24.99, 3),
    ('Microwave', 'Compact microwave with multiple power levels and defrost options.', 89.99, 4),
    ('Vacuum Cleaner', 'High-efficiency vacuum cleaner with HEPA filter.', 129.99, 4),
    ('Air Fryer', 'A versatile air fryer for healthy cooking.', 99.99, 4),
    ('Electric Kettle', 'Stainless steel kettle with fast boiling technology.', 39.99, 4),
    ('Action Figure', 'Collectible action figure with detailed features.', 19.99, 5),
    ('Board Game', 'A fun and engaging board game for all ages.', 34.99, 5),
    ('Basketball', 'Professional-grade basketball for indoor and outdoor use.', 29.99, 6),
    ('Yoga Mat', 'Non-slip yoga mat with comfortable cushioning.', 24.99, 6),
    ('Tennis Racket', 'Lightweight tennis racket with high-quality grip.', 79.99, 6);

-- Insert sample data into the orders table
INSERT INTO orders (user_id, total)
VALUES
    (1, 719.98),
    (2, 64.98);

-- Insert sample data into the order_items table
INSERT INTO order_items (order_id, product_id, quantity)
VALUES
    (1, 1, 1), -- Order 1 includes 1 Smartphone
    (1, 3, 1), -- Order 1 includes 1 T-Shirt
    (2, 5, 2); -- Order 2 includes 2 Fiction Books
