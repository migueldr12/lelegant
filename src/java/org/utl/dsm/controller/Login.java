package org.utl.dsm.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.utl.dsm.conexion.conexionBD;

public class Login {
    public int log(String user, String password) throws SQLException{
        String sql = "SELECT idUser FROM users WHERE user = ? AND password = ?";
        
        int idUser = -1;
        
        conexionBD con = new conexionBD();
        // Abrimos la conexión con la Base de Datos:
        Connection conn = con.open();
        // Con este objeto invocaremos al la consulta:
        CallableStatement cstmt = conn.prepareCall(sql);
        
        cstmt.setString(1, user);
        cstmt.setString(2, password);
        
        System.out.println(cstmt);
        
        cstmt.execute();
        
        try (ResultSet resultSet = cstmt.executeQuery()) {
            // Verificar si se encontró un usuario
            if (resultSet.next()) {
                idUser = resultSet.getInt("idUser");
            }
        }
        return idUser;
    }
}
