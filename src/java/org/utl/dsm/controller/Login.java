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
                String token = null;
                String tokenizer = null;
                // Hacemos una instancia 
                Date myDate = new Date();
                // Ahora le seteamos el formato de la fecha
                String fecha = new SimpleDateFormat("dd-MM-yyyy").format(myDate);
                // Seteamos el formato del token
                token = user.getUsername() + "." + "SICEFA" + "." + fecha;
                // Lo ciframos 
                tokenizer = DigestUtils.sha512_256Hex(token);
                
                String sqlToken = "UPDATE users SET lastToken = ? WHERE idUser = ?";
                CallableStatement stmtT = conn.prepareCall(sqlToken);
                
                System.out.println(tokenizer);
                
                stmtT.setString(1, tokenizer);
                stmtT.setInt(2, rs.getInt("idUser"));
                
                stmtT.execute();
                
                usuarioResultante = fill(rs);
            }
        }
        System.out.println(usuarioResultante);
        return usuarioResultante;
    }
    private static Usuario fill(ResultSet rs) throws SQLException{
        Usuario user = new Usuario(rs.getInt("idUser"), rs.getString("user"), rs.getString("password"), rs.getBoolean("permiso"), rs.getString("lastToken"));
        return user;
    }
}
