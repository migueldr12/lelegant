package org.utl.dsm.model;

import java.sql.Date;

public class Compra extends Producto{
    private int idCompra = 0;
    private Date fechaCompra;
    private int cantidadComprada;
    private int precioUnitarioCompra;
    private boolean estatusCompra;
    private Usuario usuario;

    public Compra() {
    }


    public Compra(int idCompra, Date fechaCompra, int cantidadComprada, int precioUnitarioCompra, String nombreProducto, boolean estatus) {
        super(nombreProducto, estatus);
        this.idCompra = idCompra;
        this.fechaCompra = fechaCompra;
        this.cantidadComprada = cantidadComprada;
        this.precioUnitarioCompra = precioUnitarioCompra;
    }
    
    

    public int getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(int idCompra) {
        this.idCompra = idCompra;
    }

    public Date getFechaCompra() {
        return fechaCompra;
    }

    public void setFechaCompra(Date fechaCompra) {
        this.fechaCompra = fechaCompra;
    }

    public int getCantidadComprada() {
        return cantidadComprada;
    }

    public void setCantidadComprada(int cantidadComprada) {
        this.cantidadComprada = cantidadComprada;
    }

    public int getPrecioUnitarioCompra() {
        return precioUnitarioCompra;
    }

    public void setPrecioUnitarioCompra(int precioUnitarioCompra) {
        this.precioUnitarioCompra = precioUnitarioCompra;
    }

    public boolean isEstatusCompra() {
        return estatusCompra;
    }

    public void setEstatusCompra(boolean estatus) {
        this.estatusCompra = estatus;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Compra{");
        sb.append("idCompra=").append(idCompra);
        sb.append(", fechaCompra=").append(fechaCompra);
        sb.append(", cantidadComprada=").append(cantidadComprada);
        sb.append(", precioUnitarioCompra=").append(precioUnitarioCompra);
        sb.append(", estatus=").append(estatusCompra);
        sb.append(", usuario=").append(usuario);
        sb.append('}');
        return sb.toString();
    }

   
    
}
