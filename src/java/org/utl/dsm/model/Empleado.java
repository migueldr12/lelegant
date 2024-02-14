package org.utl.dsm.model;

public class Empleado extends Persona{
    private int idEmpleado;
    private String fechaIngreso;
    private String puesto;
    private int salarioBruto;
    private String email;
    private String codigoUnico = "";
    private int estatus = 1;
    private Usuario usuario;


    // Método para generar un código único
    public void generarCodigoUnico() {
         codigoUnico = String.valueOf(this.getNombre().charAt(0)) + String.valueOf(this.getApellidoP().charAt(0)) + String.valueOf(this.getApellidoM().charAt(0)) + "chatNoir";
    }
    
    public int getIdEmpleado() {
        return idEmpleado;
    }

    public void setIdEmpleado(int idEmpleado) {
        this.idEmpleado = idEmpleado;
    }

    public String getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(String fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public String getPuesto() {
        return puesto;
    }

    public void setPuesto(String puesto) {
        this.puesto = puesto;
    }

    public int getSalarioBruto() {
        return salarioBruto;
    }

    public void setSalarioBruto(int salarioBruto) {
        this.salarioBruto = salarioBruto;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCodigoUnico() {
        return codigoUnico;
    }

    public void setCodigoUnico(String codigoUnico) {
        this.codigoUnico = codigoUnico;
    }

    public int getEstatus() {
        return estatus;
    }

    public void setEstatus(int estatus) {
        this.estatus = estatus;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public String toString() {
        return "Empleado{" + "idEmpleado=" + idEmpleado + ", fechaIngreso=" + fechaIngreso + ", puesto=" + puesto + ", salarioBruto=" + salarioBruto + ", email=" + email + ", codigoUnico=" + codigoUnico + ", estatus=" + estatus + "usuario=" + usuario + '}';
    }
     
}
