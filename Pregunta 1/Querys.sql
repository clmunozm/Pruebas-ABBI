
--Cantidad de productos m�s vendidos por a�o.
PRINT 'Cantidad de productos m�s vendidos por a�o';
SELECT
    YEAR(v.fecha) AS A�o,
    p.nombre AS Producto,
    SUM(dp.cantidad) AS Total_Vendido_A�o
FROM Detalle_Productos dp
JOIN Producto p ON dp.id_producto = p.id_producto
JOIN Venta v ON dp.id_venta = v.id_venta
GROUP BY YEAR(v.fecha), p.nombre
ORDER BY A�o, Total_Vendido_A�o DESC;

--Empleado con m�s ventas realizadas por mes.
PRINT 'Empleado con m�s ventas realizadas por mes';
SELECT 
    YEAR(v.fecha) AS A�o,
    MONTH(v.fecha) AS Mes,
    e.nombre_completo AS Empleado,
    COUNT(v.id_venta) AS Ventas_Realizadas_Mes
FROM Venta v
JOIN Empleado e ON v.id_empleado = e.id_empleado
GROUP BY YEAR(v.fecha), MONTH(v.fecha), e.nombre_completo
ORDER BY A�o, Mes, Ventas_Realizadas_Mes DESC;


--Categor�a de producto m�s comprado por clientes de sexo femenino.
PRINT 'Categor�a de producto m�s comprado por clientes de sexo femenino'
SELECT 
    p.categoria AS Categor�a,
    SUM(dp.cantidad) AS Total_Comprado_Mujeres
FROM Detalle_Productos dp
JOIN Producto p ON dp.id_producto = p.id_producto
JOIN Venta v ON dp.id_venta = v.id_venta
JOIN Cliente c ON v.id_cliente = c.id_cliente
WHERE c.sexo = 'F'
GROUP BY p.categoria
ORDER BY Total_Comprado_Mujeres DESC;


--A�o con m�s ventas realizadas por hombres mayores de 18 a�os.
PRINT 'A�o con m�s ventas realizadas por hombres mayores de 18 a�os'
SELECT 
    YEAR(v.fecha) AS A�o,
    COUNT(v.id_venta) AS Ventas_Realizadas_Hombres_Adultos
FROM Venta v
JOIN Cliente c ON v.id_cliente = c.id_cliente
WHERE c.sexo = 'M' AND c.edad > 18
GROUP BY YEAR(v.fecha)
ORDER BY Ventas_Realizadas_Hombres_Adultos DESC;


--Ranking de Tiendas con m�s ventas por a�o.
PRINT 'Ranking de Tiendas con m�s ventas por a�o'
SELECT 
    YEAR(v.fecha) AS A�o,
    t.nombre AS Tienda,
    COUNT(v.id_venta) AS Total_Ventas
FROM Venta v
JOIN Tienda t ON v.id_tienda = t.id_tienda
GROUP BY YEAR(v.fecha), t.nombre
ORDER BY A�o, Total_Ventas DESC;
