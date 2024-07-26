package org.utl.dsm.rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParseException;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.List;
import org.utl.dsm.controller.ControllerCompra;
import org.utl.dsm.model.Compra;
import org.utl.dsm.model.Producto;

@Path("compras")
public class RESTCompras {
    @Path("insert")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @POST
    public Response save(String datosCompras) throws SQLException{
        System.out.println(datosCompras);
        Compra compra = null;
        ControllerCompra cc = new ControllerCompra();
        Gson gson = new GsonBuilder()
            .setDateFormat("yyyy-MM-dd")
            .create();
        int idCompra = 0;
        
        try{
            compra = gson.fromJson(datosCompras, Compra.class);
            if(compra.getIdProducto() > 0){
                idCompra = cc.insertEP(compra);
            } else {
                idCompra = cc.insertNP(compra);
            }
            
        }catch (JsonParseException jpe) {
            jpe.printStackTrace();
        }
        return Response.status(Response.Status.OK).entity(idCompra).build();
    }
    
    @Path("atender")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @POST
    public Response atender(String datosCompras) throws SQLException{
        System.out.println(datosCompras);
        ControllerCompra cc = new ControllerCompra();
        Gson gson = new GsonBuilder()
            .setDateFormat("yyyy-MM-dd")
            .create();
        Compra compra = null;
        int idCompra = 0;
        
        
        return Response.status(Response.Status.OK).entity(idCompra).build();
        
    }
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @GET
    public Response getAll(){
        List<Compra> compras = null;
        ControllerCompra cc = new ControllerCompra();
        try {
            compras = cc.getAll();
            System.out.println( " prueba" + compras);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Response.status(Response.Status.OK).entity(compras).build();
    }
    
}
