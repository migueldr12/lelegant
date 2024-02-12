package org.utl.dsm.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import org.utl.dsm.conexion.conexionBD;
import org.utl.dsm.model.Empleado;

public class ControllerEmpleado {
    
    public static int insert(Empleado empleado) throws SQLException {
        final String sql = "{CALL ingresarEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";

        
        empleado.generarCodigoUnico();
        
        // Con este objeto nos vamos a conectar a la Base de Datos:
        conexionBD connMySQL = new conexionBD();
        // Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        // Seteamos el ejecutable de sql
        try (CallableStatement stmt = conn.prepareCall(sql)) {
            stmt.setString(1, empleado.getNombre());
            stmt.setString(2, empleado.getApellidoP());
            stmt.setString(3, empleado.getApellidoM());
            stmt.setString(4, empleado.getGenero());
            stmt.setString(5, empleado.getFechaDeNacimiento());
            stmt.setString(6, empleado.getRFC());
            stmt.setString(7, empleado.getCURP());
            stmt.setString(8, empleado.getFoto());
            stmt.setString(9, empleado.getCalle());
            stmt.setString(10, empleado.getNumero());
            stmt.setString(11, empleado.getColonia());
            stmt.setString(12, empleado.getCiudad());
            stmt.setString(13, empleado.getEstado());
            stmt.setString(14, empleado.getCodigoPostal());
            stmt.setString(15, empleado.getTelefono());
            stmt.setString(16, empleado.getFechaIngreso());
            stmt.setString(17, empleado.getPuesto());
            stmt.setInt(18, empleado.getSalarioBruto());
            stmt.setString(19, empleado.getEmail());
            stmt.setString(20, empleado.getCodigoUnico());
            stmt.setString(21, empleado.getPassword());
            stmt.setBoolean(22, empleado.isPermiso());
            stmt.registerOutParameter(23, Types.INTEGER); // idPersona
            stmt.registerOutParameter(24, Types.INTEGER); // idUsuario
            stmt.registerOutParameter(25, Types.INTEGER); // idEmpleado
            
            stmt.executeUpdate();
            
            int idPersona = stmt.getInt(23);
            int idUsuario = stmt.getInt(24);
            int idEmpleado = stmt.getInt(25);
            
            System.out.println("ID Persona: " + idPersona);
            System.out.println("ID Usuario: " + idUsuario);
            System.out.println("ID Empleado: " + idEmpleado);
            
            return idEmpleado;
        } catch (SQLException ex) {
            ex.printStackTrace();
            throw ex;
        } finally {
            connMySQL.close();
        }
    }
    public static int update(Empleado empleado) throws SQLException {
        final String sql = "{CALL actualizarEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
        
        int validador = -1;
        
        empleado.generarCodigoUnico();
        
        // Con este objeto nos vamos a conectar a la Base de Datos:
        conexionBD connMySQL = new conexionBD();
        // Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        // Seteamos el ejecutable de sql
        try (CallableStatement stmt = conn.prepareCall(sql)) {
            stmt.setInt(1, empleado.getIdEmpleado());
            stmt.setString(2, empleado.getNombre());
            stmt.setString(3, empleado.getApellidoP());
            stmt.setString(4, empleado.getApellidoM());
            stmt.setString(5, empleado.getGenero());
            stmt.setString(6, empleado.getFechaDeNacimiento());
            stmt.setString(7, empleado.getRFC());
            stmt.setString(8, empleado.getCURP());
            stmt.setString(9, empleado.getFoto());
            stmt.setString(10, empleado.getCalle());
            stmt.setString(11, empleado.getNumero());
            stmt.setString(12, empleado.getColonia());
            stmt.setString(13, empleado.getCiudad());
            stmt.setString(14, empleado.getEstado());
            stmt.setString(15, empleado.getCodigoPostal());
            stmt.setString(16, empleado.getTelefono());
            stmt.setString(17, empleado.getFechaIngreso());
            stmt.setString(18, empleado.getPuesto());
            stmt.setInt(19, empleado.getSalarioBruto());
            stmt.setString(20, empleado.getEmail());
            stmt.setString(21, empleado.getCodigoUnico());
            stmt.setString(22, empleado.getPassword());
            stmt.setBoolean(23, empleado.isPermiso());

            stmt.executeUpdate();

            System.out.println("Empleado actualizado exitosamente.");
            
            validador = 1;
        } catch (SQLException ex) {
            ex.printStackTrace();
            throw ex;
        } finally {
            connMySQL.close();
        }
        
        return validador;
    }    
    public static void delete(int id) throws SQLException{
        String sql = "UPDATE empleado SET estatus = 0 WHERE idEmpleado = ?";
        
        
        conexionBD connMySQL = new conexionBD();
        // Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        // Seteamos el ejecutable de sql
        PreparedStatement pstmt = conn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
        
        pstmt.setString(1, String.valueOf(id));
        
        System.out.println(pstmt.toString());
        
        pstmt.executeUpdate();
        
    };
    
    public static List<Empleado> getAll() throws SQLException, Exception {
        String sql = "SELECT e.idEmpleado, e.fechaIngreso, e.puesto, e.salarioBruto, e.email, e.codigoUnico, e.estatus, " +
                     "p.nombre, p.apellidoP, p.apellidoM, p.genero, p.fechaDeNacimiento, p.RFC, p.CURP, " +
                     "p.foto, p.calle, p.numero, p.colonia, p.ciudad, p.estado, p.codigoPostal, p.telefono, " +
                     "u.user, u.password, u.permiso " +
                     "FROM empleado e " +
                     "INNER JOIN persona p ON e.idPersona = p.idPersona " +
                     "INNER JOIN users u ON e.idUsuario = u.idUser";

        // Conexión a la base de datos
        conexionBD connMySQL = new conexionBD();
        Connection conn = connMySQL.open();

        try (PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            List<Empleado> empleados = new ArrayList<>();

            while (rs.next()) {
                Empleado empleado = new Empleado();
                empleado.setIdEmpleado(rs.getInt("idEmpleado"));
                empleado.setFechaIngreso(rs.getString("fechaIngreso"));
                empleado.setPuesto(rs.getString("puesto"));
                empleado.setSalarioBruto(rs.getInt("salarioBruto"));
                empleado.setEmail(rs.getString("email"));
                empleado.setCodigoUnico(rs.getString("codigoUnico"));
                empleado.setNombre(rs.getString("nombre"));
                empleado.setApellidoP(rs.getString("apellidoP"));
                empleado.setApellidoM(rs.getString("apellidoM"));
                empleado.setGenero(rs.getString("genero"));
                empleado.setFechaDeNacimiento(rs.getString("fechaDeNacimiento"));
                empleado.setRFC(rs.getString("RFC"));
                empleado.setCURP(rs.getString("CURP"));
                empleado.setFoto(rs.getString("foto"));
                empleado.setCalle(rs.getString("calle"));
                empleado.setNumero(rs.getString("numero"));
                empleado.setColonia(rs.getString("colonia"));
                empleado.setCiudad(rs.getString("ciudad"));
                empleado.setEstado(rs.getString("estado"));
                empleado.setCodigoPostal(rs.getString("codigoPostal"));
                empleado.setTelefono(rs.getString("telefono"));
                empleado.setUser(rs.getString("user"));
                empleado.setPassword(rs.getString("password"));
                empleado.setPermiso(rs.getBoolean("permiso"));
                empleado.setEstatus(rs.getInt("estatus"));

                empleados.add(empleado);
            }

            return empleados;
        } finally {
            connMySQL.close();
        }
    }

}
