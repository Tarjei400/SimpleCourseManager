import RootQuery from "./rootQuery";
import { UserSchema } from "mongo/models/User";

import { makeExecutableSchema } from "graphql-tools";

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

export default makeExecutableSchema({
    typeDefs: [
        SchemaDefinition, RootQuery, UserSchema,
    ],
});
