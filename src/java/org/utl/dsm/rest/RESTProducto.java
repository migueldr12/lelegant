package org.utl.dsm.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.utl.dsm.controller.ControllerProducto;
import org.utl.dsm.model.Producto;

/**
 *
 * @author PC
 */
@Path("producto")
public class RESTProducto {
    @Path("log")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @POST
    public Response insert(@FormParam ("datosProducto") String datosProducto){
        Producto producto = null;
        ControllerProducto cp = null;
        Gson gson = null;
        int idProducto = -1;
        try{
            // Convertimos los datos JSON del empleado en un objeto Java:
            producto = gson.fromJson(datosProducto, Producto.class);

            // Creamos una instancia del controlador de empleados:
            cp = new ControllerProducto();
            
            idProducto = cp.insert(producto);
        }catch (JsonParseException jpe) {
            jpe.printStackTrace();
        }
        return Response.status(Response.Status.OK).entity(idProducto).build();
    }
}
