package org.utl.dsm.model;

public class Usuario {
    private int idUsuario;
    private String username;
    private String password;
    private boolean permiso;

    public Usuario(String username, String password, boolean permiso) {
        this.username = username;
        this.password = password;
        this.permiso = permiso;
    }

    
    public Usuario(int idUsuario, String username, String password, boolean permiso) {
        this.idUsuario = idUsuario;
        this.username = username;
        this.password = password;
        this.permiso = permiso;
    }
    
    public Usuario(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public Usuario() {
    }
    
    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean getPermiso() {
        return permiso;
    }

    public void setPermiso(boolean permiso) {
        this.permiso = permiso;
    }

    @Override
    public String toString() {
        return "Usuario{" + "idUsuario=" + idUsuario + ", username=" + username + ", password=" + password + ", permiso=" + permiso + '}';
    }
    
    
}
