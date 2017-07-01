import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import bodyParser from "body-parser";
import { server } from "../app";
import { schema } from "./rootQuery";
/***
 *  Initialize graphQL api
 */
server.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

//TODO: Disabled this on product.
/***
 * Initialize graphiQL, UI for making gaphQL queries.
 */
server.use("/graphiql", bodyParser.json(), graphiqlExpress({ endpointURL: "/graphql" }));
