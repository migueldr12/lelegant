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
import org.utl.dsm.controller.ControllerVenta;
import org.utl.dsm.model.Venta;
@Path("ventas")
public class RESTVentas {
    @Path("insert")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @POST
    public Response save(Venta venta) throws SQLException{
        
        ControllerVenta cv = new ControllerVenta();
        Gson gson = new Gson();
        int idVenta = 0;
        
        try{
            System.out.println(venta);
            idVenta = cv.insert(venta);
        }catch (JsonParseException jpe) {
            jpe.printStackTrace();
        }
        return Response.status(Response.Status.OK).entity(idVenta).build();
    }
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @GET
    public Response getAll(){
        List<Venta> ventas = null;
        ControllerVenta cv = new ControllerVenta();
        try {
            ventas = cv.getAll();
            System.out.println( " prueba" + ventas);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Response.status(Response.Status.OK).entity(ventas).build();
    }
}
