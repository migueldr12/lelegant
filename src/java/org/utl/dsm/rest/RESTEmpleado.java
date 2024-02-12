package org.utl.dsm.rest;

import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import jakarta.ws.rs.Consumes;
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
import org.utl.dsm.controller.ControllerEmpleado;
import org.utl.dsm.model.Empleado;

/**
 * REST endpoints for Empleado operations.
 */
@Path("empleado")
public class RESTEmpleado {
    
    @Path("insert")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @POST
    public Response insert(String datosEmpleado) throws SQLException {
        Empleado empleado = null;
        ControllerEmpleado ce = null;
        Gson gson = new Gson();
        int idEmpleado = -1;
        try {
            empleado = gson.fromJson(datosEmpleado, Empleado.class);
            if (empleado.getIdEmpleado() > 0) {
                idEmpleado = ControllerEmpleado.update(empleado);
            } else {
                idEmpleado = ControllerEmpleado.insert(empleado);
            }
        } catch (JsonParseException jpe) {
            jpe.printStackTrace();
        }
        return Response.status(Response.Status.OK).entity(idEmpleado).build();
    }
    
    @Path("delete")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response delete(String idEmpleado) {
        int out = -1;
        try {
            ControllerEmpleado.delete(Integer.parseInt(idEmpleado));
            out = 1; 
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response getAll() {
        List<Empleado> empleados = null;
        try {
            empleados = ControllerEmpleado.getAll();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Response.status(Response.Status.OK).entity(empleados).build();
    }
}
