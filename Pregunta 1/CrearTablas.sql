--Crear la base de datos
CREATE DATABASE TiendasDB;
GO

USE TiendasDB;
GO

--Tabla Tienda
CREATE TABLE Tienda (
    id_tienda INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    direccion NVARCHAR(100),
    region NVARCHAR(100),
    comuna NVARCHAR(100),
    ciudad NVARCHAR(100)
);

--Tabla Empleado
CREATE TABLE Empleado (
    id_empleado INT IDENTITY(1,1) PRIMARY KEY,
    dni NVARCHAR(50) NOT NULL,
    nombre_completo NVARCHAR(100),
    telefono NVARCHAR(50),
    id_tienda INT NOT NULL,
    FOREIGN KEY (id_tienda) REFERENCES Tienda(id_tienda)
);

--Tabla Cliente
CREATE TABLE Cliente (
    id_cliente INT IDENTITY(1,1) PRIMARY KEY,
    dni NVARCHAR(50) NOT NULL,
    nombre NVARCHAR(100),
    sexo CHAR(1),
    edad INT
);

--Tabla Producto
CREATE TABLE Producto (
    id_producto INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100),
    precio INT,
    stock INT,
    categoria NVARCHAR(50)
);

--Tabla Venta
CREATE TABLE Venta (
    id_venta INT IDENTITY(1,1) PRIMARY KEY,
    fecha DATETIME NOT NULL,
    precio_final INT,
    id_cliente INT NOT NULL,
    id_tienda INT NOT NULL,
    id_empleado INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_tienda) REFERENCES Tienda(id_tienda),
    FOREIGN KEY (id_empleado) REFERENCES Empleado(id_empleado)
);

--Tabla Detalle_Productos
CREATE TABLE Detalle_Productos (
    id_detalle INT IDENTITY(1,1) PRIMARY KEY,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT,
    FOREIGN KEY (id_venta) REFERENCES Venta(id_venta),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);

-- Insertar tiendas
INSERT INTO Tienda (nombre, direccion, region, comuna, ciudad) VALUES
('Tienda 1', 'Calle 1', 'Metropolitana', 'Santiago', 'Santiago'),
('Tienda 2', 'Calle 2', 'Valparaíso', 'Viña del Mar', 'Valparaíso');

-- Insertar empleados
INSERT INTO Empleado (dni, nombre_completo, telefono, id_tienda) VALUES
('11111111-1', 'Juan Pérez', '912345678', 1),
('22222222-2', 'Claudio Muñoz', '921345678', 1),
('33333333-3', 'Sofía González', '912345679', 2);

-- Insertar clientes
INSERT INTO Cliente (dni, nombre, sexo, edad) VALUES
('44444444-4', 'Camila Morales', 'F', 25),
('55555555-5', 'Carlos Figueroa', 'M', 30),
('66666666-6', 'María López', 'F', 39),
('77777777-7', 'José Fuenzalida', 'M', 17);

-- Insertar productos
INSERT INTO Producto (nombre, precio, stock, categoria) VALUES
('Polera', 10000, 100, 'Ropa Casual'),
('Pantalón', 15000, 50, 'Ropa Formal'),
('Chaqueta', 30000, 30, 'Abrigo');


-- Ventas y detalles (2023)
INSERT INTO Venta (fecha, precio_final, id_cliente, id_tienda, id_empleado) VALUES
('2023-02-15', 25000, 1, 1, 1),  -- Camila
('2023-02-12', 30000, 2, 1, 1),  -- Carlos
('2023-03-10', 40000, 2, 1, 2),  -- Carlos
('2023-04-18', 20000, 1, 1, 2),  -- Camila
('2023-07-20', 40000, 3, 2, 3),  -- María
('2023-08-05', 15000, 2, 2, 3);  -- Carlos

-- Detalles de productos (2023)
INSERT INTO Detalle_Productos (id_venta, id_producto, cantidad) VALUES
(1, 1, 1), (1, 2, 1),  -- Camila: Polera + Pantalón
(2, 3, 1),             -- Carlos: Chaqueta
(3, 3, 2),             -- Carlos: 2 Chaquetas
(4, 1, 2),             -- Camila: 2 Poleras
(5, 1, 1), (5, 3, 1),  -- María: Polera + Chaqueta
(6, 2, 1);             -- Carlos: Pantalón

-- Ventas y detalles (2024)
INSERT INTO Venta (fecha, precio_final, id_cliente, id_tienda, id_empleado) VALUES
('2024-02-05', 15000, 4, 2, 3),  -- José
('2024-03-14', 40000, 2, 1, 2),  -- Carlos
('2024-05-18', 40000, 2, 1, 1),  -- Carlos
('2024-06-10', 30000, 2, 1, 1),  -- Carlos
('2024-11-23', 90000, 3, 2, 3);  -- María

-- Detalles de productos (2024)
INSERT INTO Detalle_Productos (id_venta, id_producto, cantidad) VALUES
(7, 2, 1),                      -- José: Pantalón
(8, 3, 1), (8, 1, 1),           -- Carlos: Chaqueta + Polera
(9, 1, 1), (9, 2, 2),           -- Carlos: Polera + 2 Pantalones
(10, 2, 2),                     -- Carlos: 2 Pantalones
(11, 3, 3);                     -- María: 3 Chaquetas

-- Ventas y detalles (2025)
INSERT INTO Venta (fecha, precio_final, id_cliente, id_tienda, id_empleado) VALUES
('2025-01-20', 10000, 2, 2, 3), -- Carlos
('2025-05-08', 30000, 2, 1, 2); -- Carlos

-- Detalles de productos (2025)
INSERT INTO Detalle_Productos (id_venta, id_producto, cantidad) VALUES
(12, 1, 1),                     -- Carlos: Polera
(13, 3, 1);                     -- Carlos: Chaqueta