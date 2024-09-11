INSERT INTO categories (category_name) VALUES ('Notebooks');
INSERT INTO categories (category_name) VALUES ('Celulares');
INSERT INTO categories (category_name) VALUES ('Audio');
INSERT INTO categories (category_name) VALUES ('Camara');
INSERT INTO categories (category_name) VALUES ('Television');



-- Insertar productos en la tabla products
INSERT INTO products (name, description, price, stock, image_url, brand, id_category) VALUES
('Apple MacBook Air 15,3', 'Apple MacBook Air 15,3 M2 (8GB RAM, 256 GB SSD, 8n CPU, 10n GPU) Azul medianoche', 1790990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/16874259_01/w=1500,h=1500,fit=pad', 'Apple', 1),
('Apple MacBook Pro 16', 'Apple MacBook Pro 16 M2 Pro (16GB RAM, 512GB SSD, 12n CPU, 19n GPU)', 2590990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/16725090_01/w=1500,h=1500,fit=pad', 'Apple', 1),
('Apple MacBook Air 13', 'Apple MacBook Air (13 con Chip M1 CPU 8 núcleos y GPU 7 núcleos, 8GB RAM, 256 GB SSD)', 1319990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/15028801_01/w=1500,h=1500,fit=pad', 'Apple', 1),
('Notebook Inspiron 15.6', 'Notebook INSPIRON 15.6 Intel Core i7 16GB RAM 512GB SSD Dell', 899990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/17152732_1/w=1500,h=1500,fit=pad', 'Dell', 1),
('Notebook Vivobook 14', 'Notebook Vivobook 14 X1404 Intel Core i5 8GB RAM 512GB SSD 14 FHD 60Hz Asus', 689990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/16874581_01/w=1500,h=1500,fit=pad', 'Asus', 1),
('Notebook Vivobook 16', 'Notebook Vivobook 16 X1605 Intel Core i7 10 Núcleos 12GB RAM 512GB SSD 16 WUXGA 60Hz Asus', 1049990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/16882526_01/w=1500,h=1500,fit=pad', 'Asus', 1),
('Notebook Acer Aspire', 'Notebook Acer Aspire Lite AL14-31P-31TH-1 Intel Core i3 8 Nucleos 16GB RAM 512GB SSD WUXGA', 629990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/17070601_1/w=1500,h=1500,fit=pad', 'Acer', 1),
('Notebook HP I7', 'Notebook Intel Core I7 16Gb 1Tb Ssd Rtx 3050 15,6 Fhd Táctil Oled + Lápiz Hp', 1590990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/17031111_1/w=1500,h=1500,fit=pad', 'HP', 1),
('iPhone 15 Pro', 'Apple iPhone 15 Pro Max 256Gb', 1469990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/16907167_01/w=1500,h=1500,fit=pad', 'Apple', 2),
('iPhone 14', 'Apple iPhone 14 256Gb', 1099990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/16563276_01/w=1500,h=1500,fit=pad', 'Apple', 2),
('iPhone 13', 'Apple iPhone 13 128Gb', 869990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/15643401_01/w=1500,h=1500,fit=pad', 'Apple', 2),
('Smartphone Samsung A55', 'Celular Smartphone Samsung A55 256GB', 499990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/17088204_1/w=1500,h=1500,fit=pad', 'Samsung', 2),
('Smartphone Samsung S24', 'Celular Smartphone Samsung S24 Ultra 5G 256GB', 1469990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/17007784_01/w=1500,h=1500,fit=pad', 'Samsung', 2),
('Parlante Bluetooth', 'Parlante Bluetooth Soundlink Revolve Ii Gray Bose', 449990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/16753893_1/w=1500,h=1500,fit=pad', 'Bose', 3),
('Audífono Inalambrico', 'Audífono Inalambrico QCHW Bose', 459990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/17036963_1/w=1500,h=1500,fit=pad', 'Bose', 3),
('Smart TV 4K', 'LED 43 Smart TV 4K HDR Google TV KD-43X77L Sony', 589990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/123152644_01/w=1500,h=1500,fit=pad', 'Sony', 4),
('Smart TV 55 4K', 'LED Smart TV 55 4K Full Array Google TV KD-55X90L', 1129990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/123326026_01/w=1500,h=1500,fit=pad', 'Sony', 4),
('Canon 90D', 'Cámara Profesional 90D 18-135 Canon', 1599990, 10, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaCL/15171325_1/w=1500,h=1500,fit=pad', 'Canon', 5);


-- Insertar especificaciones para el producto "Apple MacBook Air 15,3"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(1, 'Tamaño de pantalla', '15 pulgadas'),
(1, 'Tarjeta gráfica', 'GPU de 10 nucleos'),
(1, 'Capacidad de almacenamiento', '256 GB'),
(1, 'Procesador', 'Chip M2'),
(1, 'Características de pantalla', 'Retina');

-- Insertar especificaciones para el producto "Apple MacBook Pro 16"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(2, 'Tamaño de pantalla', '16 pulgadas'),
(2, 'Cantidad de puertos', '3'),
(2, 'Capacidad de almacenamiento', '512 GB'),
(2, 'Procesador', 'Chip M2 Pro'),
(2, 'Memoria RAM', '16 GB');

-- Insertar especificaciones para el producto "Apple MacBook Air 13"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(3, 'Tamaño de pantalla', '13,3 pulgadas'),
(3, 'Cantidad de puertos', '2'),
(3, 'Capacidad de almacenamiento', '256 GB'),
(3, 'Procesador', 'Chip M1 de Apple'),
(3, 'Memoria RAM', '8 GB');

-- Insertar especificaciones para el producto "Notebook Inspiron 15.6"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(4, 'Tamaño de pantalla', '15,6 pulgadas'),
(4, 'Tarjeta gráfica', 'Intel Iris Xe Graphics'),
(4, 'Capacidad de almacenamiento', '512 GB'),
(4, 'Procesador', 'i7-1255U'),
(4, 'Memoria RAM', '16 GB');

-- Insertar especificaciones para el producto "Notebook Vivobook 14"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(5, 'Tamaño de pantalla', '14 pulgadas'),
(5, 'Cantidad de puertos', '4'),
(5, 'Capacidad de almacenamiento', '512 GB'),
(5, 'Procesador', 'Intel Core i5'),
(5, 'Memoria RAM', '8 GB');

-- Insertar especificaciones para el producto "Notebook Vivobook 16"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(6, 'Tamaño de pantalla', '16 pulgadas'),
(6, 'Cantidad de puertos', '4'),
(6, 'Capacidad de almacenamiento', '512 GB'),
(6, 'Procesador', 'Intel Core i7'),
(6, 'Memoria RAM', '12 GB');

-- Insertar especificaciones para el producto "Notebook Acer Aspire"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(7, 'Tamaño de pantalla', '14 pulgadas'),
(7, 'Cantidad de puertos', '4'),
(7, 'Capacidad de almacenamiento', '512 GB'),
(7, 'Memoria RAM', '16 GB'),
(7, 'Procesador', 'Intel Core i3');

-- Insertar especificaciones para el producto "Notebook HP I7"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(8, 'Tamaño de pantalla', '15,6 pulgadas'),
(8, 'Cantidad de puertos', '4'),
(8, 'Capacidad de almacenamiento', '1 TB'),
(8, 'Memoria RAM', '16 GB'),
(8, 'Procesador', 'Intel Core i7');

-- Insertar especificaciones para el producto "iPhone 15 Pro"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(9, 'Cámara frontal', '40 MP'),
(9, 'Cámara posterior', '16 MP'),
(9, 'Tamaño de pantalla', '6,7 pulgadas'),
(9, 'Memoria', '256 GB'),
(9, 'Sistema operativo', 'iOS');

-- Insertar especificaciones para el producto "iPhone 14"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(10, 'Cámara frontal', '12 MP'),
(10, 'Cámara posterior', '12 MP'),
(10, 'Tamaño de pantalla', '6,7 pulgadas'),
(10, 'Memoria', '256 GB'),
(10, 'Resistente al agua', 'IP68 (Protegido contra inmersión)');

-- Insertar especificaciones para el producto "iPhone 13"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(11, 'Cámara frontal', '12 MP'),
(11, 'Cámara posterior', '12 MP'),
(11, 'Tamaño de pantalla', '6,1 pulgadas'),
(11, 'Memoria', '128 GB'),
(11, 'Resistente al agua', 'IP68 (Protegido contra inmersión)');

-- Insertar especificaciones para el producto "Smartphone Samsung A55"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(12, 'Cámara frontal', '32 MP'),
(12, 'Cámara posterior', '16 MP'),
(12, 'Tamaño de pantalla', '6,6 pulgadas'),
(12, 'Memoria', '256 GB'),
(12, 'Generacion', '5G');

-- Insertar especificaciones para el producto "Smartphone Samsung S24"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(13, 'Cámara frontal', '12 MP'),
(13, 'Cámara posterior', '16 MP'),
(13, 'Tamaño de pantalla', '6,8 pulgadas'),
(13, 'Memoria', '256 GB'),
(13, 'Resistente al agua', 'IP68 (Protegido contra inmersión)');

-- Insertar especificaciones para el producto "Parlante Bluetooth"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(14, 'Conexión bluetooth', 'Si'),
(14, 'Duracion de la batería', '17 horas'),
(14, 'Entradas USB', 'Sin entradas'),
(14, 'Modelo', 'REVOLVEPLUSIIG'),
(14, 'Fuente de energia', 'Baterías');

-- Insertar especificaciones para el producto "Audífono Inalambrico"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(15, 'Aislador de sonido', 'Si'),
(15, 'Conexión bluetooth', 'Si'),
(15, 'Audio', 'Audio HQ'),
(15, 'Modelo', 'QCHW'),
(15, 'Resistente al agua', 'No');

-- Insertar especificaciones para el producto "Smart TV 4K"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(16, 'Tamaño de pantalla', '43 pulgadas'),
(16, 'Conectividad/conexión', 'HDMI,USB,Wifi'),
(16, 'Dimensiones', '168 x 96 x 7 cm'),
(16, 'Modelo', 'KD-43X77L'),
(16, 'Sistema operativo', 'Android Tv');

-- Insertar especificaciones para el producto "Smart TV 55 4K"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(17, 'Tamaño de pantalla', '55 pulgadas'),
(17, 'Conectividad/conexión', 'Bluetooth,HDMI,USB,Wifi'),
(17, 'Contraste', 'Super contrast'),
(17, 'Modelo', 'XR-55X90L'),
(17, 'Sistema operativo', 'Android go');

-- Insertar especificaciones para el producto "Canon 90D"
INSERT INTO product_specifications (id_product, spec_name, spec_value) VALUES
(18, 'Calidad de grabación', '4K Ultra HD'),
(18, 'Modelo', '90D 18-135'),
(18, 'Velocidad del obturador', '1/2000 a 1 s'),
(18, 'Megapixeles', '32.5 MP'),
(18, 'Tamaño de la pantalla', '3 pulgadas');
