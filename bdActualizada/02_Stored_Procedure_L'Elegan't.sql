use prueba;
DELIMITER //

CREATE PROCEDURE InsertarProducto(
    IN nombre_producto_param VARCHAR(40),
    IN descripcion_param VARCHAR(40),
    IN año_lanzamiento_param DATE,
    IN marca_param VARCHAR(40),
    IN genero_param VARCHAR(2),
    IN departamento_param VARCHAR(40),
    IN precio_inventario_param DOUBLE,
    IN cantidad_param INT,
    IN precio_sugerido_param DOUBLE,
    IN foto_param LONGTEXT,
    IN ruta_foto_param VARCHAR(250),
    IN codigo_barras_param VARCHAR(200)
)
BEGIN
    INSERT INTO producto (
        nombre_producto, descripcion, año_lazamiento, marca, descripcion, genero,
        departamento, precio_inventario, cantidad, precio_sugerido, foto, ruta_foto,
        codigo_barras
    ) VALUES (
        nombre_producto_param, descripcion_param, año_lanzamiento_param, marca_param,
        descripcion_param, genero_param, departamento_param, precio_inventario_param,
        cantidad_param, precio_sugerido_param, foto_param, ruta_foto_param,
        codigo_barras_param
    );
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE EliminarProducto(IN id_producto_param INT)
BEGIN
    DELETE FROM producto WHERE id_producto = id_producto_param;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE ModificarProducto(
    IN id_producto_param INT,
    IN nombre_producto_param VARCHAR(40),
    IN descripcion_param VARCHAR(40),
    IN año_lanzamiento_param DATE,
    IN marca_param VARCHAR(40),
    IN genero_param VARCHAR(2),
    IN departamento_param VARCHAR(40),
    IN precio_inventario_param DOUBLE,
    IN cantidad_param INT,
    IN precio_sugerido_param DOUBLE,
    IN foto_param LONGTEXT,
    IN ruta_foto_param VARCHAR(250),
    IN codigo_barras_param VARCHAR(200)
)
BEGIN
    UPDATE producto
    SET
        nombre_producto = nombre_producto_param,
        descripcion = descripcion_param,
        año_lazamiento = año_lanzamiento_param,
        marca = marca_param,
        descripcion = descripcion_param,
        genero = genero_param,
        departamento = departamento_param,
        precio_inventario = precio_inventario_param,
        cantidad = cantidad_param,
        precio_sugerido = precio_sugerido_param,
        foto = foto_param,
        ruta_foto = ruta_foto_param,
        codigo_barras = codigo_barras_param
    WHERE id_producto = id_producto_param;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_InsertarEmpleado(
    IN p_numeroUnico VARCHAR(65),
    IN p_apellidoP VARCHAR(40),
    IN p_apellidoM VARCHAR(40),
    IN p_genero VARCHAR(2),
    IN p_fechaDeNacimiento DATE,
    IN p_estatus INT,
    IN p_calle VARCHAR(129),
    IN p_numero VARCHAR(20),
    IN p_colonia VARCHAR(40),
    IN p_codigoPostal VARCHAR(25),
    IN p_idUsuario INT,
    IN p_idPersona INT
)
BEGIN
    INSERT INTO empleado (
        numeroUnico,
        apellidoP,
        apellidoM,
        genero,
        fechaDeNacimiento,
        estatus,
        calle,
        numero,
        colonia,
        codigoPostal,
        idUsuario,
        idPersona
    ) VALUES (
        p_numeroUnico,
        p_apellidoP,
        p_apellidoM,
        p_genero,
        p_fechaDeNacimiento,
        p_estatus,
        p_calle,
        p_numero,
        p_colonia,
        p_codigoPostal,
        p_idUsuario,
        p_idPersona
    );
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE sp_ModificarEmpleado(
    IN p_idEmpleado INT,
    IN p_numeroUnico VARCHAR(65),
    IN p_apellidoP VARCHAR(40),
    IN p_apellidoM VARCHAR(40),
    IN p_genero VARCHAR(2),
    IN p_fechaDeNacimiento DATE,
    IN p_estatus INT,
    IN p_calle VARCHAR(129),
    IN p_numero VARCHAR(20),
    IN p_colonia VARCHAR(40),
    IN p_codigoPostal VARCHAR(25),
    IN p_idUsuario INT,
    IN p_idPersona INT
)
BEGIN
    UPDATE empleado
    SET
        numeroUnico = p_numeroUnico,
        apellidoP = p_apellidoP,
        apellidoM = p_apellidoM,
        genero = p_genero,
        fechaDeNacimiento = p_fechaDeNacimiento,
        estatus = p_estatus,
        calle = p_calle,
        numero = p_numero,
        colonia = p_colonia,
        codigoPostal = p_codigoPostal,
        idUsuario = p_idUsuario,
        idPersona = p_idPersona
    WHERE idEmpleado = p_idEmpleado;
END //

DELIMITER ;

