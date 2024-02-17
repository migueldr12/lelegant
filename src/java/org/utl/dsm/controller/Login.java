package org.utl.dsm.controller;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.apache.commons.codec.digest.DigestUtils;
import org.utl.dsm.conexion.conexionBD;
import org.utl.dsm.model.Usuario;

public class Login {
    private conexionBD con;

    public Login() {
        this.con = new conexionBD();
    }

    public Usuario log(Usuario user) throws SQLException {
        Usuario usuarioResultante = getUser(user);
        if (usuarioResultante != null) {
            updateToken(usuarioResultante);
        }
        return usuarioResultante;
    }

    private Usuario getUser(Usuario user) throws SQLException {
        String sql = "SELECT * FROM users WHERE user = ? AND password = ?";
        try (Connection conn = con.open();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, user.getUsername());
            stmt.setString(2, user.getPassword());
            ResultSet rs = stmt.executeQuery();
            return rs.next() ? fill(rs) : null;
        }
    }

    private void updateToken(Usuario user) throws SQLException {
        String token = generateToken(user);
        String sql = "UPDATE users SET lastToken = ? WHERE idUser = ?";
        try (Connection conn = con.open();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, token);
            stmt.setInt(2, user.getIdUsuario());
            stmt.execute();
        }
    }

    private String generateToken(Usuario user) {
        String fecha = new SimpleDateFormat("dd-MM-yyyy").format(new Date());
        String token = user.getUsername() + "." + "SICEFA" + "." + fecha;
        return DigestUtils.sha512_256Hex(token);
    }

    private static Usuario fill(ResultSet rs) throws SQLException {
        return new Usuario(rs.getInt("idUser"), rs.getString("user"), rs.getString("password"), rs.getBoolean("permiso"));
    }
}
