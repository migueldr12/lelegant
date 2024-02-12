/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.utl.dsm.conexion.conexionBD;
import org.utl.dsm.model.Producto;

/**
 *
 * @author PC
 */
public class ControllerProducto {
    
    public static int insert(Producto p) throws SQLException{
        int idGenerado = -1;
        final String sql = "INSERT INTO productos (nombreProducto, anioLanzamiento, marca, descripcion, genero, departamento, precioInventario, cantidad, precioSugerido, foto, codigoBarras, estatus, presentacion)"
                    + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        
        // Con este objeto nos vamos a conectar a la Base de Datos:
        conexionBD connMySQL = new conexionBD();
        // Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        // Seteamos el ejecutable de sql
        PreparedStatement pstmt = conn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
        
        pstmt.setString(1, p.getNombreProducto());
        pstmt.setString(2, p.getAnioLanzamiento());
        pstmt.setString(3, p.getMarca());
        pstmt.setString(4, p.getDescripcion());
        pstmt.setString(5, p.getGenero());
        pstmt.setString(6, p.getDepartamento());
        pstmt.setDouble(7, p.getPrecioInventario());
        pstmt.setInt(8, p.getCantidad());
        pstmt.setDouble(9, p.getPrecioSugerido());
        pstmt.setString(10, p.getFoto());
        pstmt.setString(11, p.getCodigoBarras());
        pstmt.setInt(12, p.getEstatus());
        pstmt.setString(13, p.getDescripcion());
      
        pstmt.executeUpdate();
        
        // Obtener las claves generadas (en este caso, solo debería ser una clave)
        ResultSet generatedKeys = pstmt.getGeneratedKeys();
        if (generatedKeys.next()) {
            idGenerado = generatedKeys.getInt(1);
            System.out.println("Se ha insertado el registro con ID: " + idGenerado);
        } else {
            // No se generaron claves, manejar la situación según sea necesario
            throw new SQLException("No se pudo obtener el ID del registro insertado.");
        }
        return idGenerado;
    };
    
    public static int update(Producto p) throws SQLException {
        final String sql = "UPDATE productos SET nombreProducto=?, anioLanzamiento=?, marca=?, descripcion=?, genero=?, departamento=?, precioInventario=?, cantidad=?, precioSugerido=?, foto=?, codigoBarras=?, estatus=?, presentacion=? WHERE idProducto=?";
        
        int rowsAffected = -1;
        
        // Con este objeto nos vamos a conectar a la Base de Datos:
        conexionBD connMySQL = new conexionBD();
        // Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        // Seteamos el ejecutable de sql
        PreparedStatement pstmt = conn.prepareStatement(sql);

        pstmt.setString(1, p.getNombreProducto());
        pstmt.setString(2, p.getAnioLanzamiento());
        pstmt.setString(3, p.getMarca());
        pstmt.setString(4, p.getDescripcion());
        pstmt.setString(5, p.getGenero());
        pstmt.setString(6, p.getDepartamento());
        pstmt.setDouble(7, p.getPrecioInventario());
        pstmt.setInt(8, p.getCantidad());
        pstmt.setDouble(9, p.getPrecioSugerido());
        pstmt.setString(10, p.getFoto());
        pstmt.setString(11, p.getCodigoBarras());
        pstmt.setInt(12, p.getEstatus());
        pstmt.setString(13, p.getDescripcion());
        pstmt.setInt(14, p.getIdProducto());

        rowsAffected = pstmt.executeUpdate();
        if (rowsAffected == 0) {
            throw new SQLException("No se actualizó ningún registro.");
        } else {
            System.out.println("Se ha actualizado el registro con ID: " + p.getIdProducto());
        }
        
        return rowsAffected;
    }

    
    public static void delete(int id) throws SQLException{
        String sql = "UPDATE productos SET estatus = 0 WHERE idProducto = ?";
        
        
        conexionBD connMySQL = new conexionBD();
        // Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        // Seteamos el ejecutable de sql
        PreparedStatement pstmt = conn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
        
        pstmt.setString(1, String.valueOf(id));
        
        System.out.println(pstmt.toString());
        
        pstmt.executeUpdate();
        
    };
    
    public static List<Producto> getAll() throws SQLException, Exception {
        String sql = "SELECT * FROM productos";
        
        System.out.println(sql);
        
        // Con este objeto nos vamos a conectar a la Base de Datos:
        conexionBD connMySQL = new conexionBD();
        // Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        // Seteamos el ejecutable de sql
        PreparedStatement pstmt = conn.prepareStatement(sql);
        // Aquí guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();
        
        List<Producto> productos = new ArrayList<>();
        
        while(rs.next()){
            productos.add(fill(rs));
        }
        
        System.out.println(productos);
        rs.close();
        pstmt.close();
        connMySQL.close();
        return productos;
    }
    
    private static Producto fill(ResultSet rs) throws Exception {
        Producto p = new Producto();
        p.setIdProducto(rs.getInt("idProducto"));
        p.setNombreProducto(rs.getString("nombreProducto"));
        p.setDescripcion(rs.getString("descripcion"));
        p.setAnioLanzamiento(rs.getString("anioLanzamiento"));
        p.setMarca(rs.getString("marca"));
        p.setGenero(rs.getString("genero"));
        p.setDepartamento(rs.getString("departamento"));
        p.setPrecioInventario(rs.getDouble("precioInventario"));
        p.setCantidad(rs.getInt("cantidad"));
        p.setPrecioSugerido(rs.getDouble("precioSugerido"));
        p.setFoto(rs.getString("foto"));
        p.setCodigoBarras(rs.getString("codigoBarras"));
        p.setEstatus(rs.getInt("estatus"));
        p.setPresentacion(rs.getString("presentacion"));
        return p;
    }
} 
