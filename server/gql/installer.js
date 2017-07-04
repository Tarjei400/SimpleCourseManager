import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import bodyParser from "body-parser";
import { server } from "../app";
import { schema } from "./main";
import Config from "config";

const { UseGraphiql } = Config;


/***
 *  Initialize graphQL api
 */
server.use("/graphql", bodyParser.json(), graphqlExpress(
    (req) => {
      return { schema, context: req }
    })
);

/***
 * Initialize graphiQL, UI for making graphQL queries.
 */
if (UseGraphiql) {
    server.use("/graphiql", bodyParser.json(), graphiqlExpress({endpointURL: "/graphql"}));
}
