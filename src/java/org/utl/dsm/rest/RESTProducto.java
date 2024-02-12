package org.utl.dsm.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.List;
import org.utl.dsm.controller.ControllerProducto;
import org.utl.dsm.model.Producto;

/**
 *
 * @author PC
 */
@Path("producto")
public class RESTProducto {
    @Path("insert")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @POST
    public Response insert(String datosProducto) throws SQLException{
        System.out.println(datosProducto);
        Producto producto = null;
        ControllerProducto cp = null;
        Gson gson = new Gson();
        int idProducto = -1;
        try{
            // Convertimos los datos JSON del empleado en un objeto Java:
            producto = gson.fromJson(datosProducto, Producto.class);
            System.out.println(producto.getIdProducto());
            // Creamos una instancia del controlador de empleados:
            cp = new ControllerProducto();
            System.out.println(producto.getIdProducto() > 0);
            if(producto.getIdProducto() > 0){
                idProducto = cp.update(producto);            
            } else {
                idProducto = cp.insert(producto);
            }     
        }catch (JsonParseException jpe) {
            jpe.printStackTrace();

        }
        return Response.status(Response.Status.OK).entity(idProducto).build();
    }
    
    @Path("delete")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response delete(String idProducto) {
        ControllerProducto cp = null;
        Gson gson = new Gson();
        int out;
        System.out.println(idProducto);
        try {
            cp = new ControllerProducto();
            cp.delete(Integer.parseInt(idProducto));
            out = 1; 
        } catch (Exception e) {
            e.getStackTrace();
            out = -1;
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAll(){
        String out = null;
        List<Producto> productos = null;
        ControllerProducto ce = new ControllerProducto();
        try {
            // Obtenemos todos los empleados según el filtro especificado:
            productos = ce.getAll();
            out = new Gson().toJson(productos);
        } catch (Exception e) {
            out = "Error";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}

