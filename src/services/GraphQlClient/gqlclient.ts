import { GraphQLClient } from "graphql-request";
const graphqlClient=new GraphQLClient(process.env.NEXTAUTH_URL+"/api/graphql")
export default graphqlClient;
