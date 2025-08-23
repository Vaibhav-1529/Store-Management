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
    category: ProductCategory
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

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});
const allowedOrigins = [
  process.env.NEXT_PUBLIC_CLIENT_URL || "",
  "http://localhost:3000",
];

async function withCORS(request: Request) {
  const origin = request.headers.get("origin") || "";
  const isAllowed =
    allowedOrigins.includes(origin) || origin.endsWith(".vercel.app");
  const allowedOrigin = isAllowed ? origin : allowedOrigins[0] || "*";

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  const response = await handler(request);
  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

export async function GET(request: Request) {
  return withCORS(request);
}

export async function POST(request: Request) {
  return withCORS(request);
}

export async function OPTIONS(request: Request) {
  return withCORS(request);
}
