package org.utl.dsm.rest;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.SQLException;
import org.utl.dsm.controller.Login;

@Path("login")
public class login {
    @Path("log")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response login(@QueryParam("txtUser") String user, @QueryParam("txtPassword") String password) throws SQLException{
        Login loginController = new Login();
        int userId = loginController.log(user, password);
        
        return Response.status(Response.Status.OK).entity(userId).build();
    };
}
