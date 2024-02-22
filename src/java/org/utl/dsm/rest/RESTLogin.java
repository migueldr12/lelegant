package org.utl.dsm.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.io.StringReader;
import java.sql.SQLException;
import org.utl.dsm.controller.Login;
import org.utl.dsm.model.Usuario;

@Path("login")
public class RESTLogin {
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @POST
    public Response login(Usuario usuario) throws SQLException {
        Login loginController = new Login();
        Usuario user = null;
        System.out.println(usuario);
        try {
            user = loginController.log(usuario);
            Gson gson = new Gson();
            System.out.println(user);
            String json = gson.toJson(user);
            System.out.println(json);
            return Response.status(Response.Status.OK).entity(json).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Error en el formato JSON").build();
        }
    }
}
