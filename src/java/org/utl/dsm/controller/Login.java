package org.utl.dsm.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.utl.dsm.conexion.conexionBD;
import org.utl.dsm.model.Usuario;

public class Login {
    public Usuario log(Usuario user) throws SQLException{
        String sql = "SELECT * FROM users WHERE user = ? AND password = ?";
        
        Usuario usuarioResultante = null;
        
        conexionBD con = new conexionBD();
        // Abrimos la conexión con la Base de Datos:
        Connection conn = con.open();
        
        try (CallableStatement stmt = conn.prepareCall(sql)) {
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getPassword());
        
            System.out.println(stmt);
        
            ResultSet rs = stmt.executeQuery();
            // Verificar si se encontró un usuario
            if (rs.next()) {
                usuarioResultante = fill(rs);
            }
        }
        System.out.println(usuarioResultante);
        return usuarioResultante;
    }
    private static Usuario fill(ResultSet rs) throws SQLException{
        Usuario user = new Usuario(rs.getInt("idUser"), rs.getString("user"), rs.getString("password"), rs.getBoolean("permiso"));
        return user;
    }
}
