package org.utl.dsm.model;

import java.sql.Date;

public class Producto {
    public int idProducto;
    public String nombreProducto;
    private String anioLanzamiento;
    private String marca;
    private String descripcion;
    private String genero;
    private String departamento;
    private double precioInventario;
    private int cantidad;
    private double precioSugerido;
    private String foto;
    private String presentacion;
    private String codigoBarras;
    public boolean estatus  = true;

    public Producto(String nombreProducto, boolean estatus, int idProducto) {
        this.nombreProducto = nombreProducto;
        this.estatus = estatus;
        this.idProducto = idProducto;
    }

    public Producto(String nombreProducto, boolean estatus) {
        this.nombreProducto = nombreProducto;
        this.estatus = estatus;
    }
    

    public Producto() {
    }
    

    public int getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }
    
    public String getPresentacion() {
        return presentacion;
    }

    public void setPresentacion(String presentacion) {
        this.presentacion = presentacion;
    }
    
    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public String getAnioLanzamiento() {
        return anioLanzamiento;
    }

    public void setAnioLanzamiento(String anioLanzamiento) {
        this.anioLanzamiento = anioLanzamiento;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public double getPrecioInventario() {
        return precioInventario;
    }

    public void setPrecioInventario(double precioInventario) {
        this.precioInventario = precioInventario;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getPrecioSugerido() {
        return precioSugerido;
    }

    public void setPrecioSugerido(double precioSugerido) {
        this.precioSugerido = precioSugerido;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getCodigoBarras() {
        return codigoBarras;
    }

    public void setCodigoBarras(String codigoBarras) {
        this.codigoBarras = codigoBarras;
    }

    public boolean getEstatus() {
        return estatus;
    }

    public void setEstatus(boolean estatus) {
        this.estatus = estatus;
    }

    @Override
    public String toString() {
        return "Producto{" + "idProducto=" + idProducto + ", nombreProducto=" + nombreProducto + ", anioLanzamiento=" + anioLanzamiento + ", marca=" + marca + ", descripcion=" + descripcion + ", genero=" + genero + ", departamento=" + departamento + ", precioInventario=" + precioInventario + ", cantidad=" + cantidad + ", precioSugerido=" + precioSugerido + ", foto=" + foto + ", codigoBarras=" + codigoBarras + ", estatus=" + estatus + '}';
    }

    
    
}
