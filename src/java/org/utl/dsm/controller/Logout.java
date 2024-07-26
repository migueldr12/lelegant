package org.utl.dsm.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import org.utl.dsm.conexion.conexionBD;
import org.utl.dsm.model.Usuario;

/**
 *
 * @author PC
 */
public class Logout {
    public static void logout(Usuario user) throws SQLException{
        String sql = "UPDATE users SET lastToken = NULL WHERE idUser = ?";
        System.out.println(user);
        conexionBD con = new conexionBD();
        // Abrimos la conexión con la Base de Datos:
        Connection conn = con.open();
        try (CallableStatement stmt = conn.prepareCall(sql)) {
            stmt.setInt(1, user.getIdUsuario());
            System.out.println(stmt);
            stmt.execute();
        }
    }
            
}
