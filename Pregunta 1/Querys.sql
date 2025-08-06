
--Cantidad de productos más vendidos por año.
PRINT 'Cantidad de productos más vendidos por año';
SELECT
    YEAR(v.fecha) AS Año,
    p.nombre AS Producto,
    SUM(dp.cantidad) AS Total_Vendido_Año
FROM Detalle_Productos dp
JOIN Producto p ON dp.id_producto = p.id_producto
JOIN Venta v ON dp.id_venta = v.id_venta
GROUP BY YEAR(v.fecha), p.nombre
ORDER BY Año, Total_Vendido_Año DESC;

--Empleado con más ventas realizadas por mes.
PRINT 'Empleado con más ventas realizadas por mes';
SELECT 
    YEAR(v.fecha) AS Año,
    MONTH(v.fecha) AS Mes,
    e.nombre_completo AS Empleado,
    COUNT(v.id_venta) AS Ventas_Realizadas_Mes
FROM Venta v
JOIN Empleado e ON v.id_empleado = e.id_empleado
GROUP BY YEAR(v.fecha), MONTH(v.fecha), e.nombre_completo
ORDER BY Año, Mes, Ventas_Realizadas_Mes DESC;


--Categoría de producto más comprado por clientes de sexo femenino.
PRINT 'Categoría de producto más comprado por clientes de sexo femenino'
SELECT 
    p.categoria AS Categoría,
    SUM(dp.cantidad) AS Total_Comprado_Mujeres
FROM Detalle_Productos dp
JOIN Producto p ON dp.id_producto = p.id_producto
JOIN Venta v ON dp.id_venta = v.id_venta
JOIN Cliente c ON v.id_cliente = c.id_cliente
WHERE c.sexo = 'F'
GROUP BY p.categoria
ORDER BY Total_Comprado_Mujeres DESC;


--Año con más ventas realizadas por hombres mayores de 18 años.
PRINT 'Año con más ventas realizadas por hombres mayores de 18 años'
SELECT 
    YEAR(v.fecha) AS Año,
    COUNT(v.id_venta) AS Ventas_Realizadas_Hombres_Adultos
FROM Venta v
JOIN Cliente c ON v.id_cliente = c.id_cliente
WHERE c.sexo = 'M' AND c.edad > 18
GROUP BY YEAR(v.fecha)
ORDER BY Ventas_Realizadas_Hombres_Adultos DESC;


--Ranking de Tiendas con más ventas por año.
PRINT 'Ranking de Tiendas con más ventas por año'
SELECT 
    YEAR(v.fecha) AS Año,
    t.nombre AS Tienda,
    COUNT(v.id_venta) AS Total_Ventas
FROM Venta v
JOIN Tienda t ON v.id_tienda = t.id_tienda
GROUP BY YEAR(v.fecha), t.nombre
ORDER BY Año, Total_Ventas DESC;
