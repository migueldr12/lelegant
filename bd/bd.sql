CREATE DATABASE  IF NOT EXISTS `lelegant` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `lelegant`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: lelegant
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `idEmpleado` int NOT NULL AUTO_INCREMENT,
  `fechaIngreso` varchar(100) NOT NULL DEFAULT '',
  `puesto` varchar(100) NOT NULL DEFAULT '',
  `salarioBruto` int NOT NULL,
  `email` varchar(100) NOT NULL DEFAULT '',
  `codigoUnico` varchar(100) NOT NULL DEFAULT '',
  `estatus` int NOT NULL DEFAULT '1',
  `idPersona` int NOT NULL,
  `idUsuario` int NOT NULL,
  PRIMARY KEY (`idEmpleado`),
  KEY `fk_empledo_persona` (`idPersona`),
  KEY `fk_empledo_usuario` (`idUsuario`),
  CONSTRAINT `fk_empledo_persona` FOREIGN KEY (`idPersona`) REFERENCES `persona` (`idPersona`),
  CONSTRAINT `fk_empledo_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `users` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (1,'2024-02-11','Desarrollador',50000,'john.doe@example.com','igueloemithchatNoir',0,1,7),(2,'2023-01-15','Gerente de Ventas',50,'juan@example.com','JGLopez',1,2,8),(3,'2024-02-11','Desarrollador',50000,'john.doe@example.com','ohnoemithchatNoir',1,3,9);
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `idPersona` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(65) NOT NULL DEFAULT '',
  `apellidoP` varchar(40) NOT NULL DEFAULT '',
  `apellidoM` varchar(40) NOT NULL DEFAULT '',
  `genero` varchar(2) NOT NULL DEFAULT 'O',
  `fechaDeNacimiento` varchar(100) NOT NULL,
  `RFC` varchar(13) NOT NULL,
  `CURP` varchar(19) NOT NULL,
  `foto` longtext,
  `calle` varchar(129) NOT NULL DEFAULT '',
  `numero` varchar(20) NOT NULL DEFAULT '',
  `colonia` varchar(40) NOT NULL DEFAULT '',
  `ciudad` varchar(100) NOT NULL DEFAULT '',
  `estado` varchar(100) NOT NULL DEFAULT '',
  `codigoPostal` varchar(25) NOT NULL DEFAULT '',
  `telefono` varchar(11) NOT NULL DEFAULT '',
  PRIMARY KEY (`idPersona`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (1,'Miguel','Doe','Smith','M','1990-01-01','DOEJ900101','DOES900101HDFSMH05','ruta/a/la/foto.jpg','Calle Principal','123','Centro','Ciudad de México','CDMX','12345','5551234567'),(2,'Juan','González','López','M','1990-05-15','GOLJ900515','GOLJ900515HMCNPN01','ruta/a/la/foto.jpg','Calle Principal','123','Centro','Ciudad de México','Ciudad de México','12345','5551234567'),(3,'John','Doe','Smith','M','1990-01-01','DOEJ900101','DOES900101HDFSMH05','ruta/a/la/foto.jpg','Calle Principal','123','Centro','Ciudad de México','CDMX','12345','5551234567');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'dsa','2023','asd','asd','m','dsad',20,20,20,'C:\\fakepath\\2.png','asdasd',0,NULL),(2,'dasd','2022','dasd','dasd','m','asd',20,20,20,'C:\\fakepath\\10.3916_C61-2019-07.pdf','dasda',0,NULL),(3,'Diego Fernando','2022','das','da','m','dasd',20,20,20,'C:\\fakepath\\japon.png','dasdas',0,NULL),(4,'sad','2024','ads','das','m','das',20,20,20,'C:\\fakepath\\10.3916_C61-2019-07.pdf','asd',0,NULL),(5,'sad','2025','dasd','ads','m','das',20,20,20,'C:\\fakepath\\10.3916_C61-2019-07.pdf','dasd',0,NULL),(6,'sdas','2020','dadsa','dasd','m','sad',2,15,20,'C:\\fakepath\\2.png','das',0,NULL),(7,'dasd','2025','dasd','dasda','m','dasd',20,20,20,'C:\\fakepath\\Flag_of_Europe.svg.png','adsd',1,NULL),(8,'adsda','2025','20','dasd','m','dasdasda',20,20,20,'C:\\fakepath\\10.3916_C61-2019-07.pdf','dasdsadasd',1,NULL),(9,'Reloj de arena','2022','dasd','reloj perron','m','relojes',2500,25,200,'C:\\fakepath\\Infografia.pdf','dasda',0,NULL),(10,'Camisa ','2021','C&A','Camisa roja','f','Ropa',250,15,300,'C:\\fakepath\\2.png','48913',0,NULL),(11,'Gatos de color blanco','2025','dasd','ads','f','das',20,20,20,'','574119620',1,NULL),(12,'Mouse de color rosa','2025','20','dasd','m','dasdasda',20,20,20,'','dasdsadasd',1,NULL),(13,'Mouse de color negro','2025','20','dasd','m','dasdasda',20,20,20,'','dasdsadasd',1,NULL),(14,'Zapatos azules','2025','dasd','ads','m','das',20,20,20,'','dasd',0,NULL),(15,'Vaso azul','2025','dasd','ads','m','das',20,20,20,'','dasd',0,NULL),(16,'aaaaaaaaaaaaaaaa prueba','2025','dasd','ads','m','das',20,20,20,'','dasd',0,NULL),(17,'wqe','202','dasda','eqweqw','m','eqweqw',20,20,25,'','202457',1,NULL);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `user` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `permiso` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'igueloemithchatNoir','contraseña',1),(7,'igueloemithchatNoir','contraseña',1),(8,'igueloemithchatNoir','contraseña',1),(9,'igueloemithchatNoir','contraseña',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-11 18:45:39
