import { makeExecutableSchema } from "graphql-tools";
import { UserType, RootUserResolvers } from "mongo/models/User";
import { CourseType, RootCourseResolvers, CourseResolvers } from "mongo/models/Course";
import { login, signup, logout } from "auth";


const typeDefs = `
  type RootQuery {
    users: [User]
    user(name: String!): User
    courses: [Course]
    course(name: String!): Course
  }
  
  type RootMutation {
     createUser: User
     deleteUser: User
     updateUser: User
     signupUser(name: String!, email: String!, password: String!): User
     logoutUser: User
     loginUser(email: String!, password: String!): User

  },
  
  ${UserType}
  ${CourseType}

`;

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation : RootMutation
  }
`;

// Provide resolver functions for your schema fields
export const resolvers = {
    RootQuery: {
        ...RootUserResolvers.queries,
        ...RootCourseResolvers.queries,

    },
    RootMutation: {
        ...RootUserResolvers.mutations,
        ...RootCourseResolvers.mutations,
    },

    ...CourseResolvers,
};

export const schema = makeExecutableSchema({
    typeDefs: [
        SchemaDefinition, typeDefs,
    ],
    resolvers,
});
