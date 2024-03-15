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
import org.utl.dsm.model.Compra;
import org.utl.dsm.model.Producto;
import org.utl.dsm.model.Venta;
import java.sql.Time;
import java.util.Date;

public class ControllerVenta {
    public static int insert(Venta datosVenta) throws SQLException{
        int idVenta;
        
        System.out.println(datosVenta);
        
        final String sql = "{CALL registrarVenta(?, ?, ?, ?, ?)}";
        
        // Con este objeto nos vamos a conectar a la Base de Datos:
        conexionBD connMySQL = new conexionBD();
        // Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        
        try (CallableStatement stmt = conn.prepareCall(sql)) {
            stmt.setString(1, datosVenta.getCliente());
            stmt.setInt(2, datosVenta.getIdProducto());
            stmt.setInt(3, datosVenta.getCantidadVendida());
            stmt.setDouble(4, datosVenta.getPrecio());
            
            System.out.println(stmt);
            conn.setAutoCommit(false);
            
            stmt.registerOutParameter(5, Types.INTEGER);
            
            stmt.executeUpdate();
            
            conn.commit();
            
            idVenta = stmt.getInt(5);
            System.out.println(stmt);
            stmt.close();
            conn.close();
            System.out.println(idVenta);
            return idVenta;
        } catch (Exception e){
            conn.rollback();
            return -1;
        }
    }
    public static List<Venta> getAll() throws SQLException, Exception {
        String sql =    "SELECT * FROM detalleventas A \n" +
                        "JOIN ventas B\n" +
                        "ON A.idVenta = B.idVenta;";
        
        System.out.println(sql);
        
        // Con este objeto nos vamos a conectar a la Base de Datos:
        conexionBD connMySQL = new conexionBD();
        // Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        // Seteamos el ejecutable de sql
        PreparedStatement pstmt = conn.prepareStatement(sql);
        // Aquí guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();
        
        List<Venta> ventas = new ArrayList<>();
        
        while(rs.next()){
            ventas.add(fill(rs));
        }
        
        System.out.println( "que es esto?" + ventas);
        rs.close();
        pstmt.close();
        connMySQL.close();
        return ventas;
    }
    
    private static Venta fill(ResultSet rs) throws SQLException, Exception{
        ControllerProducto cp = new ControllerProducto();
        Producto p = cp.getOne(rs.getInt("idProducto"));
        System.out.println("Product: " + p.toString());
        Venta v = new Venta(rs.getInt("idVenta"),rs.getInt("cantidad"), rs.getDouble("precioUnitario"), p.getNombreProducto(), rs.getBoolean("estatus"), rs.getString("cliente"), rs.getInt("idProducto"));
        
        v.setFechaVenta(rs.getDate("fechaVenta"));
        Time time = rs.getTime("horaVenta");
        Date date = new java.util.Date(time.getTime());
        v.setHoraVenta(date.toInstant());
        
        System.out.println("a ver " + v.toString());
        return v;
    }
}
