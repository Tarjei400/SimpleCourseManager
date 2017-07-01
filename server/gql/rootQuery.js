import { makeExecutableSchema } from "graphql-tools";
import { UserSchema, RootUserResolvers } from "mongo/models/User";
import { CourseSchema, RootCourseResolvers, CourseResolvers } from "mongo/models/Course";

const typeDefs = `
  
  type RootQuery {
    users: [User]
    user(name: String!): User
    courses: [Course]
    course(name: String!): Course
  }
  
  ${UserSchema}
  ${CourseSchema}

`;

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

// Provide resolver functions for your schema fields
export const resolvers = {
    RootQuery: {
        ...RootUserResolvers,
        ...RootCourseResolvers,

    },

    ...CourseResolvers,
};

export const schema = makeExecutableSchema({
    typeDefs: [
        SchemaDefinition, typeDefs,
    ],
    resolvers,
});
