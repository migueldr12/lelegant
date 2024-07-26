DELIMITER //

CREATE PROCEDURE ingresarEmpleado(
    IN p_nombre VARCHAR(65),
    IN p_apellidoP VARCHAR(40),
    IN p_apellidoM VARCHAR(40),
    IN p_genero VARCHAR(2),
    IN p_fechaDeNacimiento VARCHAR(100),
    IN p_RFC VARCHAR(13),
    IN p_CURP VARCHAR(19),
    IN p_foto LONGTEXT,
    IN p_calle VARCHAR(129),
    IN p_numero VARCHAR(20),
    IN p_colonia VARCHAR(40),
    IN p_ciudad VARCHAR(100),
    IN p_estado VARCHAR(100),
    IN p_codigoPostal VARCHAR(25),
    IN p_telefono VARCHAR(11),
    IN p_fechaIngreso VARCHAR(100),
    IN p_puesto VARCHAR(100),
    IN p_salarioBruto INT,
    IN p_email VARCHAR(100),
    IN p_codigoUnico VARCHAR(100),
    IN p_password VARCHAR(45),
    IN p_permiso BOOLEAN,
    OUT p_idPersona INT,
    OUT p_idUsuario INT,
    OUT p_idEmpleado INT
)
BEGIN
    -- Insertar datos en la tabla persona
    INSERT INTO persona (nombre, apellidoP, apellidoM, genero, fechaDeNacimiento, RFC, CURP, foto, calle, numero, colonia, ciudad, estado, codigoPostal, telefono)
    VALUES (p_nombre, p_apellidoP, p_apellidoM, p_genero, p_fechaDeNacimiento, p_RFC, p_CURP, p_foto, p_calle, p_numero, p_colonia, p_ciudad, p_estado, p_codigoPostal, p_telefono);

    -- Obtener el ID del último registro insertado en la tabla persona
    SET p_idPersona = LAST_INSERT_ID();
	
    -- Insertar datos en la tabla users
    INSERT INTO users (user, password, permiso)
    VALUES (p_codigoUnico, p_password, p_permiso);
    
    -- Obtener el ID del último registro insertado en la tabla users
    SET p_idUsuario = LAST_INSERT_ID();
    
    -- Insertar datos en la tabla empleado
    INSERT INTO empleado (fechaIngreso, puesto, salarioBruto, email, codigoUnico, idPersona, idUser, idSucursal)
    VALUES (p_fechaIngreso, p_puesto, p_salarioBruto, p_email, p_codigoUnico, p_idPersona, p_idUsuario, 1);

    -- Obtener el ID del último registro insertado en la tabla empleado
    SET p_idEmpleado = LAST_INSERT_ID();

END //

DELIMITER ;

SET @persona_id := 0;
SET @usuario_id := 0;
SET @empleado_id := 0;

CALL ingresarEmpleado('Juan', 'González', 'López', 'M', '1990-05-15', 'GOLJ900515', 'GOLJ900515HMCNPN01', 'ruta/a/la/foto.jpg', 'Calle Principal', '123', 'Centro', 'Ciudad de México', 'Ciudad de México', '12345', '5551234567', '2023-01-15', 'Gerente de Ventas', 50, 'juan@example.com', 'JGLopez', 'password123', TRUE, @persona_id, @usuario_id, @empleado_id);

SELECT @persona_id AS idPersona, @usuario_id AS idUsuario, @empleado_id AS idEmpleado;

DELIMITER //

CREATE PROCEDURE actualizarEmpleado(
    IN p_idEmpleado INT,
    IN p_nombre VARCHAR(65),
    IN p_apellidoP VARCHAR(40),
    IN p_apellidoM VARCHAR(40),
    IN p_genero VARCHAR(2),
    IN p_fechaDeNacimiento VARCHAR(100),
    IN p_RFC VARCHAR(13),
    IN p_CURP VARCHAR(19),
    IN p_foto LONGTEXT,
    IN p_calle VARCHAR(129),
    IN p_numero VARCHAR(20),
    IN p_colonia VARCHAR(40),
    IN p_ciudad VARCHAR(100),
    IN p_estado VARCHAR(100),
    IN p_codigoPostal VARCHAR(25),
    IN p_telefono VARCHAR(11),
    IN p_fechaIngreso VARCHAR(100),
    IN p_puesto VARCHAR(100),
    IN p_salarioBruto INT,
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(45),
    IN p_permiso BOOLEAN
)
BEGIN
    -- Actualizar datos en la tabla persona
    UPDATE persona 
    SET nombre = p_nombre,
        apellidoP = p_apellidoP,
        apellidoM = p_apellidoM,
        genero = p_genero,
        fechaDeNacimiento = p_fechaDeNacimiento,
        RFC = p_RFC,
        CURP = p_CURP,
        foto = p_foto,
        calle = p_calle,
        numero = p_numero,
        colonia = p_colonia,
        ciudad = p_ciudad,
        estado = p_estado,
        codigoPostal = p_codigoPostal,
        telefono = p_telefono
    WHERE idPersona = (SELECT idPersona FROM empleado WHERE idEmpleado = p_idEmpleado);

    -- Actualizar datos en la tabla empleado
    UPDATE empleado
    SET fechaIngreso = p_fechaIngreso,
        puesto = p_puesto,
        salarioBruto = p_salarioBruto,
        email = p_email,
        codigoUnico = p_codigoUnico
    WHERE idEmpleado = p_idEmpleado;

    -- Actualizar datos en la tabla users
    UPDATE users
    SET password = p_password,
        permiso = p_permiso
    WHERE idUser = (SELECT idUser FROM empleado WHERE idEmpleado = p_idEmpleado);
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE almacenarCompra(
    IN p_idUser INT,
    IN p_idProducto INT,
    IN p_cantidad INT,
    IN p_precioUnitario INT,
    OUT p_idCompra INT
)
BEGIN
    INSERT INTO compras (fechaCompra, estatus, idUser)
    VALUES (CURDATE(), FALSE, p_idUser);
    
    SET @idCompra = LAST_INSERT_ID();
    
    INSERT INTO detalleCompra (idCompra, idProducto, cantidad, precioUnitario, total)
    VALUES (@idCompra, p_idProducto, p_cantidad, p_precioUnitario, p_cantidad * p_precioUnitario);
    
    SET p_idCompra = @idCompra;
    
    COMMIT;
END//

CALL almacenarCompra(1, 1, 5, 200, @idCompra);
SELECT @idCompra AS 'ID de Compra';



DELIMITER ;

DELIMITER //
CREATE PROCEDURE almacenarCompraNP(
    IN p_idUser INT,
    IN p_nombreProducto VARCHAR(256),
    IN p_anioLanzamiento VARCHAR(40),
    IN p_marca VARCHAR(40),
    IN p_descripcion VARCHAR(40),
    IN p_genero VARCHAR(2),
    IN p_departamento VARCHAR(40),
    IN p_precioInventario DOUBLE,
    IN p_cantidad INT,
    IN p_precioSugerido DOUBLE,
    IN p_foto LONGTEXT,
    IN p_codigoBarras VARCHAR(200),
    IN p_presentacion VARCHAR(255),
    OUT p_idCompra INT
)
BEGIN
    INSERT INTO compras (fechaCompra, estatus, idUser)
    VALUES (CURDATE(), FALSE, p_idUser);
    
    SET @idCompra = LAST_INSERT_ID();
    
    INSERT INTO productos(nombreProducto, anioLanzamiento, marca, descripcion, genero, departamento, precioInventario, cantidad, precioSugerido, foto, codigoBarras, estatus,  presentacion)
    VALUES(p_nombreProducto, p_anioLanzamiento, p_marca, p_descripcion, p_genero, p_departamento, p_precioInventario, p_cantidad, p_precioSugerido, p_foto, p_codigoBarras, 0, p_presentacion);
    
    SET @idProducto = LAST_INSERT_ID();
    
    INSERT INTO detalleCompra (idCompra, idProducto, cantidad, precioUnitario, total)
    VALUES (@idCompra, @idProducto, p_cantidad, p_precioSugerido, p_cantidad * p_precioSugerido);
    
    SET p_idCompra = @idCompra;
    
    COMMIT;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE atenderCompraNP(
    IN p_idCompra INT
)
BEGIN
    UPDATE compras SET estatus = TRUE WHERE idCompra = p_idCompra;
    
    IF ROW_COUNT() > 0 THEN
        UPDATE productos p
        JOIN detalleCompra dc ON p.idProducto = dc.idProducto
        SET p.estatus = 1
        WHERE dc.idCompra = p_idCompra;
    END IF;

    COMMIT;
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE atenderCompra(
    IN p_idCompra INT
)
BEGIN
    UPDATE compras SET estatus = TRUE WHERE idCompra = p_idCompra;
    
    -- Incrementar el stock del producto solo si la compra se marca como atendida
    IF ROW_COUNT() > 0 THEN
        UPDATE productos p
        JOIN detalleCompra dc ON p.idProducto = dc.idProducto
        SET p.cantidad = p.cantidad + dc.cantidad
        WHERE dc.idCompra = p_idCompra;
    END IF;

    COMMIT;
END//

DELIMITER ;

DELIMITER $$
CREATE EVENT actualizar_estatus
ON SCHEDULE EVERY 1 SECOND
DO 
BEGIN
	UPDATE productos SET estatus = 0 WHERE cantidad = 0;
END $$
DELIMITER ;

DELIMITER //

CREATE PROCEDURE registrarVenta(
    IN p_cliente VARCHAR(256),
    IN p_idProducto INT,
    IN p_cantidad INT,
    IN p_precioUnitario DOUBLE,
    OUT p_idVenta INT
)
BEGIN
    DECLARE totalVenta DOUBLE;
    
    -- Calcular total de la venta
    SET totalVenta = p_cantidad * p_precioUnitario;
    
    -- Insertar venta en la tabla de ventas
    INSERT INTO ventas (fechaVenta, horaVenta, cliente)
    VALUES (CURDATE(), current_time(), p_cliente);
    
    -- Obtener el ID de la venta insertada
    SET @idVenta = LAST_INSERT_ID();
    
    -- Insertar detalle de la venta en la tabla detalleVentas
    INSERT INTO detalleVentas (idVenta, idProducto, cantidad, precioUnitario, total)
    VALUES (@idVenta, p_idProducto, p_cantidad, p_precioUnitario, totalVenta);
    
    -- Reducir stock del producto en la sucursal
    UPDATE productos
    SET cantidad = cantidad - p_cantidad
    WHERE idProducto = p_idProducto;
    
    SET p_idVenta = @idVenta;
    
    COMMIT;
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE cancelarVenta(
    IN p_idVenta INT
)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE l_idProducto INT;
    DECLARE l_cantidad INT;
    DECLARE cur CURSOR FOR SELECT idProducto, cantidad FROM detalleVentas WHERE idVenta = p_idVenta;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- Actualizar estatus de la venta a cancelada (estatus = 0)
    UPDATE ventas SET estatus = 0 WHERE idVenta = p_idVenta;
    
    OPEN cur;
    read_loop: LOOP
        FETCH cur INTO l_idProducto, l_cantidad;
        IF done THEN
            LEAVE read_loop;
        END IF;
        -- Devolver stock al producto en la sucursal
        UPDATE productos SET cantidad = cantidad + l_cantidad WHERE idProducto = l_idProducto;
    END LOOP;
    CLOSE cur;
    
    COMMIT;
END//

DELIMITER ;


