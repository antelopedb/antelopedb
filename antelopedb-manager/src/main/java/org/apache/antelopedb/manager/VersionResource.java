package org.apache.antelopedb.manager;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/version")
public class VersionResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "AntelopeDB v0.0.1";
    }
}
