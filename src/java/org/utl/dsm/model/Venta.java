package org.utl.dsm.model;

import java.sql.Date;
import java.time.Instant;

public class Venta extends Producto{
    private int idVenta;
    private int cantidadVendida;
    private double precio;
    private String cliente;
    private Date fechaVenta;
    private Instant horaVenta;

    public Venta() {
    }

    public Venta(int idVenta, int cantidadVendida, double precio, String nombreProducto, boolean estatus, String cliente, int idProducto) {
        super(nombreProducto, estatus, idProducto);
        this.idVenta = idVenta;
        this.cantidadVendida = cantidadVendida;
        this.precio = precio;
        this.cliente = cliente;
    }

    public Date getFechaVenta() {
        return fechaVenta;
    }

    public void setFechaVenta(Date fechaVenta) {
        this.fechaVenta = fechaVenta;
    }

    public Instant getHoraVenta() {
        return horaVenta;
    }

    public void setHoraVenta(Instant horaVenta) {
        this.horaVenta = horaVenta;
    }

    public int getIdVenta() {
        return idVenta;
    }

    public void setIdVenta(int idVenta) {
        this.idVenta = idVenta;
    }

    public int getCantidadVendida() {
        return cantidadVendida;
    }

    public void setCantidadVendida(int cantidadVendida) {
        this.cantidadVendida = cantidadVendida;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public boolean isEstatus() {
        return estatus;
    }

    public void setEstatus(boolean estatus) {
        this.estatus = estatus;
    }
    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }
    
    @Override
    public String toString() {
        return "Venta{" + "idVenta=" + idVenta + ", cantidad=" + cantidadVendida + ", precio=" + precio + '}';
    }

    
    
    
}
