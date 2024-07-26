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

public class ControllerCompra {
    public static int insertEP(Compra datosCompra) throws SQLException{
        int idCompra;
        final String sql = "{CALL almacenarCompra(?, ?, ?, ?, ?)}";
        
        // Con este objeto nos vamos a conectar a la Base de Datos:
        conexionBD connMySQL = new conexionBD();
        // Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        
        try (CallableStatement stmt = conn.prepareCall(sql)) {
            stmt.setInt(1, datosCompra.getUsuario().getIdUsuario());
            stmt.setInt(2, datosCompra.getIdProducto());
            stmt.setInt(3, datosCompra.getCantidadComprada());
            stmt.setInt(4, datosCompra.getPrecioUnitarioCompra());
            
            conn.setAutoCommit(false);
            
            stmt.registerOutParameter(5, Types.INTEGER);
            
            stmt.executeUpdate();
            
            conn.commit();
            
            idCompra = stmt.getInt(5);
            System.out.println(stmt);
            stmt.close();
            conn.close();
            System.out.println(idCompra);
            return idCompra;
        } catch (Exception e){
            conn.rollback();
            return -1;
        }
    }
    
    public static int insertNP(Compra datosCompra) throws SQLException{
        int idCompra;
        final String sql = "{CALL almacenarCompraNP(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
        
        // Con este objeto nos vamos a conectar a la Base de Datos:
        conexionBD connMySQL = new conexionBD();
        // Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        
        try(CallableStatement stmt = conn.prepareCall(sql)){
            stmt.setInt(1, datosCompra.getUsuario().getIdUsuario());
            stmt.setString(2, datosCompra.getNombreProducto());
            stmt.setString(3, datosCompra.getAnioLanzamiento());
            stmt.setString(4, datosCompra.getMarca());
            stmt.setString(5, datosCompra.getDescripcion());
            stmt.setString(6, datosCompra.getGenero());
            stmt.setString(7, datosCompra.getDepartamento());
            stmt.setDouble(8, datosCompra.getPrecioUnitarioCompra());
            stmt.setInt(9, datosCompra.getCantidadComprada());
            stmt.setDouble(10, datosCompra.getPrecioSugerido());
            stmt.setString(11, datosCompra.getFoto());
            stmt.setBoolean(12, datosCompra.getEstatus());
            stmt.setString(13, datosCompra.getDescripcion());
            
            conn.setAutoCommit(false);
            
            stmt.registerOutParameter(14, Types.INTEGER);
            
            stmt.executeUpdate();
            
            conn.commit();
            
            idCompra = stmt.getInt(14);
            System.out.println(stmt);
            stmt.close();
            conn.close();
            System.out.println(idCompra);
            return idCompra;
        } catch (Exception e){
            conn.rollback();
            return -1;
        }
        
    }
    
    public static List<Compra> getAll() throws SQLException, Exception {
        String sql =    "SELECT * FROM detallecompra A \n" +
                        "JOIN compras B\n" +
                        "ON A.idCompra = B.idCompra;";
        
        System.out.println(sql);
        
        // Con este objeto nos vamos a conectar a la Base de Datos:
        conexionBD connMySQL = new conexionBD();
        // Abrimos la conexión con la Base de Datos:
        Connection conn = connMySQL.open();
        // Seteamos el ejecutable de sql
        PreparedStatement pstmt = conn.prepareStatement(sql);
        // Aquí guardaremos los resultados de la consulta:
        ResultSet rs = pstmt.executeQuery();
        
        List<Compra> compras = new ArrayList<>();
        
        while(rs.next()){
            compras.add(fill(rs));
        }
        
        
        System.out.println( "que es esto?" + compras);
        rs.close();
        pstmt.close();
        connMySQL.close();
        return compras;
    }
    
    private static Compra fill(ResultSet rs) throws SQLException, Exception{
        ControllerProducto cp = new ControllerProducto();
        Producto p = cp.getOne(rs.getInt("idProducto"));
        System.out.println("Product: " + p.toString());
        Compra c = new Compra(rs.getInt("idCompra"),rs.getDate("fechaCompra"),rs.getInt("cantidad"),rs.getInt("precioUnitario"), p.getNombreProducto(), p.getEstatus() );
        
        c.setEstatusCompra((rs.getBoolean("estatus")));
        System.out.println("a ver " + c.toString());
        return c;
    }
}
