/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.utl.dsm.rest;

import com.google.gson.Gson;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.sql.SQLException;
import org.utl.dsm.controller.Auth;
import org.utl.dsm.model.Usuario;

@Path("auth")
public class RESTAuth {
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @POST
    public Response auth(String lastToken) throws SQLException{
        Auth controller = new Auth();
        Usuario userFinal = null;
        
        try{
            System.out.println(lastToken);
            userFinal = controller.autentificar(lastToken);
            Gson gson = new Gson();
            System.out.println(userFinal);
            String json = gson.toJson(userFinal);
            System.out.println(json);
            return Response.status(Response.Status.OK).entity(json).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Error en el formato JSON").build();
        }
    }
}
