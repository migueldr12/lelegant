CREATE TABLE sucursales(
	idSucursal 		INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre			VARCHAR(250)
);
CREATE TABLE users(
	idUser 				INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user				VARCHAR(45),
    password			VARCHAR(45),
    permiso				BOOLEAN,
    lastToken			VARCHAR(256)
);
CREATE TABLE persona (
	idPersona 			INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre 				VARCHAR(65) NOT NULL DEFAULT '',
	apellidoP 			VARCHAR(40) NOT NULL DEFAULT '',
    apellidoM 			VARCHAR(40) NOT NULL DEFAULT '',
    genero              VARCHAR(2) NOT NULL DEFAULT 'O', -- Genero: M; F; O;
    fechaDeNacimiento 	VARCHAR(100) NOT NULL,
    RFC 				VARCHAR(13) NOT NULL,
    CURP 				VARCHAR(19) NOT NULL,
    foto				LONGTEXT,
    calle 				VARCHAR	(129) NOT NULL DEFAULT '',
	numero 				VARCHAR(20)  NOT NULL DEFAULT '',
	colonia 			VARCHAR(40) NOT NULL DEFAULT '',
    ciudad				VARCHAR(100) NOT NULL DEFAULT '',
    estado				VARCHAR(100) NOT NULL DEFAULT '',
	codigoPostal 		VARCHAR(25) NOT NULL DEFAULT '',
    telefono 			VARCHAR(11) NOT NULL DEFAULT ''
);
CREATE TABLE empleado (
	idEmpleado			INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fechaIngreso		VARCHAR(100) NOT NULL DEFAULT '',
    puesto				VARCHAR(100) NOT NULL DEFAULT '',
    salarioBruto 		INT NOT NULL,
    email 				VARCHAR(100) NOT NULL DEFAULT '',
    codigoUnico			VARCHAR(100) NOT NULL DEFAULT '',
    idPersona			INT NOT NULL,
    idUser 				INT NOT NULL,
    idSucursal			INT NOT NULL,
    CONSTRAINT			fk_empledo_persona FOREIGN KEY(idPersona)
		REFERENCES 		persona(idPersona),
    CONSTRAINT			fk_empledo_usuario FOREIGN KEY(idUser)
		REFERENCES 		users(idUser),
	CONSTRAINT			fk_empledo_sucursal FOREIGN KEY(idSucursal)
		REFERENCES 		sucursales(idSucursal)
);
CREATE TABLE `productos` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `nombreProducto` varchar(40) NOT NULL,
  `anioLanzamiento` varchar(40) NOT NULL,
  `marca` varchar(40) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `genero` varchar(2) NOT NULL,
  `departamento` varchar(40) NOT NULL,
  `precioInventario` double NOT NULL DEFAULT '0',
  `cantidad` int NOT NULL,
  `precioSugerido` double NOT NULL DEFAULT '0',
  `foto` longtext NOT NULL,
  `codigoBarras` varchar(200) NOT NULL DEFAULT '',
  `estatus` int NOT NULL DEFAULT '1',
  `presentacion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idProducto`)
);
CREATE TABLE ventas(
	idVenta			INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fechaVenta		DATE NOT NULL,
    horaVenta		TIME NOT NULL,
    estatus 		BOOLEAN DEFAULT 1,
    cliente 		VARCHAR(256),
    idEmpleado 		INT NOT NULL,
    CONSTRAINT   	fk_venta_empleado FOREIGN KEY(idEmpleado)
		REFERENCES 	empleado(idEmpleado)
);
CREATE TABLE detalleVentas(
	idDetalleVenta	INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idProducto		INT NOT NULL,
    idVenta			INT NOT NULL,
    cantidad 		INT NOT NUll,
    precioUnitario 	INT NOT NULL,
    total			DOUBLE NOT NULL,
    CONSTRAINT   	fk_detalleVenta_producto FOREIGN KEY(idProducto)
		REFERENCES 	productos(idProducto),
	CONSTRAINT   	fk_detalleVenta_venta FOREIGN KEY(idVenta)
		REFERENCES 	ventas(idVenta)
);
CREATE TABLE compras(
	idCompra 		INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fechaCompra 	DATE NOT NULL,
    estatus 		BOOLEAN DEFAULT 0,
    idUser 			INT NOT NULL,
    CONSTRAINT   	fk_compra_empleado FOREIGN KEY(idUser)
		REFERENCES  users(idUser)
);
CREATE TABLE detalleCompra(
	idDetalleCompra INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idProducto		INT NOT NULL,
    idCompra		INT NOT NULL,
    cantidad 		INT NOT NUll,
    precioUnitario 	INT NOT NULL,
    total			DOUBLE NOT NULL,
    CONSTRAINT   	fk_detalleCompra_producto FOREIGN KEY(idProducto)
		REFERENCES 	productos(idProducto),
	CONSTRAINT   	fk_detalleCompra_compra FOREIGN KEY(idCompra)
		REFERENCES 	compras(idCompra)
);