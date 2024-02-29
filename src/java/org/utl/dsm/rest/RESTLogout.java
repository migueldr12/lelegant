package org.utl.dsm.rest;

import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.SQLException;
import org.utl.dsm.controller.Logout;
import org.utl.dsm.model.Usuario;

@Path("logout")
public class RESTLogout {
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response logout(Usuario usuario) throws SQLException{
        Logout logout = new Logout();
        String out = "0";
        try{
            logout.logout(usuario);
            out = "1";
            System.out.println(out);
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Error en el formato JSON").build();
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
}
