package org.utl.dsm.rest;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.io.StringReader;
import java.sql.SQLException;
import org.utl.dsm.controller.Login;

@Path("login")
public class login {
    @Path("log")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @POST
    public Response login(String requestBody) throws SQLException {
        try {
            // Parse el cuerpo JSON
            JsonObject json = Json.createReader(new StringReader(requestBody)).readObject();

            // Extrae los valores
            String user = json.getString("txtUser");
            String password = json.getString("txtPassword");

            // Realiza la lógica de login
            Login loginController = new Login();
            int userId = loginController.log(user, password);

            return Response.status(Response.Status.OK).entity(userId).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Error en el formato JSON").build();
        }
    }
}
