

create database prueba;
use prueba;

CREATE TABLE usuario(
	idUsuario           INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombreDeUsuario     VARCHAR(129) UNIQUE NOT NULL,
    contrasenia         VARCHAR(129) NOT NULL,
    rol                 VARCHAR(25) NOT NULL -- Rol: Administrador; Empleado;Cliente;

);

CREATE TABLE  producto(
id_producto        INT PRIMARY KEY NOT NULL,
nombre_producto    	VARCHAR(40) NOT NULL,
descripcion 		VARCHAR(40) NOT NULL,
año_lazamiento 		DATE NOT NULL, 
marca 				VARCHAR(40) NOT NULL,
descripcion 		VARCHAR (40)NOT NULL,
genero			    VARCHAR (2) NOT NULL,
departamento 		VARCHAR(40) NOT NULL,
precio_inventario 	DOUBLE NOT NULL default 0.0,
cantidad 			INT NOT NULL,
precio_sugerido 	DOUBLE NOT NULL DEFAULT 0.0,
foto 				LONGTEXT NOT NULL,
ruta_foto 			VARCHAR(250) NOT NULL,
codigo_barras 		VARCHAR(200) NOT NULL default '',
estatus 			INT NOT NULL DEFAULT 1

);

CREATE TABLE empleado(
    idEmpleado			INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    numeroUnico         VARCHAR(65) NOT NULL DEFAULT '',
	apellidoP VARCHAR(40) NOT NULL DEFAULT '',
    apellidoM VARCHAR(40) NOT NULL DEFAULT '',
    genero              VARCHAR(2) NOT NULL DEFAULT 'O', -- Genero: M; F; O;
    fechaDeNacimiento 	DATE NOT NULL,
    estatus             INT NOT NULL DEFAULT 1,
    calle 				VARCHAR	(129) NOT NULL DEFAULT '',
	numero 				VARCHAR(20)  NOT NULL DEFAULT '',
	colonia 			VARCHAR(40) NOT NULL DEFAULT '',
	codigoPostal 		VARCHAR(25) NOT NULL DEFAULT '',
    idUsuario           INT NOT NULL,
    idPersona			INT NOT NULL,
    CONSTRAINT fk_empleado_usuario FOREIGN KEY (idUsuario) 
                REFERENCES usuario(idUsuario)
	
);

CREATE TABLE cliente(
    idCliente			INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    idUsuario           INT NOT NULL,
    
	CONSTRAINT fk_cliente_usuario FOREIGN KEY (idUsuario) 
                REFERENCES usuario(idUsuario)
);

CREATE TABLE compras(
 id_compra INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
 estatus             INT NOT NULL DEFAULT 1,
 fechac varchar(40),
 
 id_producto INT NOT NULL,
 idEmpleado int not null,
 constraint fk_producto_compras FOREIGN KEY (id_producto)
 references producto(id_producto),
 
 CONSTRAINT fk_empleado_compra FOREIGN KEY (idEmpleado) 
                REFERENCES empleado(idEmpleado)
 
 
 
);
CREATE TABLE ventas (
idVenta INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
fechac varchar(20)
);


