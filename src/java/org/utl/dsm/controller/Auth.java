package org.utl.dsm.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.apache.commons.codec.digest.DigestUtils;
import org.utl.dsm.conexion.conexionBD;
import org.utl.dsm.model.Usuario;

public class Auth {
    public Usuario autentificar(String lastToken) throws SQLException{
        String sql = "SELECT * FROM users WHERE lastToken = ?";
        Usuario usuarioResultante = null;
        
        conexionBD con = new conexionBD();
        // Abrimos la conexión con la Base de Datos:
        Connection conn = con.open();
        
        try(CallableStatement stmt = conn.prepareCall(sql)){
            stmt.setString(1, lastToken);
            
            ResultSet rs = stmt.executeQuery();
            
            // Verificar si se encontró un usuario
            if (rs.next()) {            
                usuarioResultante = fill(rs);
            }
        }
        return usuarioResultante;
    }
    private static Usuario fill(ResultSet rs) throws SQLException{
        Usuario user = new Usuario(rs.getInt("idUser"), rs.getString("user"), rs.getString("password"), rs.getBoolean("permiso"), rs.getString("lastToken"));
        return user;
    }
}
