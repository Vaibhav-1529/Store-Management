import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { NextRequest } from "next/server";
import {
  createUser,
  getAllusers,
  loginUser,
  logOutUser,
  updateUserProfile,
  updateUserRole,
} from "./resolvers/user";
import {
  addProduct,
  createSale,
  getAllProducts,
  getProductsById,
} from "./resolvers/products";
const typeDefs = gql`
  type Query {
    loginUser(userCred: String!, password: String!): User
    logOutUser: Boolean
    getAllusers: [User]
    getAllProducts: [Product]
    getProductsById(id: String!): Product
  }

  type Mutation {
    createSale(productId: String!, quantity: Int!): Boolean
    createUser(
      name: String!
      email: String!
      username: String!
      password: String!
      role: String!
    ): User
    updateUserRole(userId: String!, role: String!): Boolean
    updateUserProfile(
      userId: String!
      name: String
      email: String
      password: String
      username: String
      avatar: String
    ): Boolean
    addProduct(
      title: String!
      description: String!
      category: ProductCategory!
      price: Float!
      stock: Int!
      imageUrl: String!
    ): Product
  }
  enum ProductCategory {
    electronics
    beauty
    food
    decoration
    accessories
    clothing
    furniture
    other
  }
  type User {
    id: String!
    name: String!
    email: String!
    username: String!
    avatar: String
    role: String
  }

  type Product {
    id: String
    title: String
    description: String
    category: String
    price: Float
    stock: Int
    imageUrl: String
    sales: [Sale]
  }
  type Sale {
    id: String
    productId: String
    quantity: Int
    createdAt: String
  }
`;

const resolvers = {
  Query: {
    loginUser,
    getAllusers,
    getAllProducts,
    getProductsById,
    logOutUser,
  },
  Mutation: {
    createUser,
    updateUserRole,
    updateUserProfile,
    addProduct,
    createSale,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Typescript: req has the type NextRequest
const handler = startServerAndCreateNextHandler(server, {
  context: async req => ({ req }),
});


export async function GET(request: Request) {
  return handler(request);
}

export async function POST(request: Request) {
  return handler(request);
}
