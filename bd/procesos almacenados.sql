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
    INSERT INTO empleado (fechaIngreso, puesto, salarioBruto, email, codigoUnico, idPersona, idUsuario)
    VALUES (p_fechaIngreso, p_puesto, p_salarioBruto, p_email, p_codigoUnico, p_idPersona, p_idUsuario);

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
