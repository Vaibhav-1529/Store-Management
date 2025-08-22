import { gql } from "graphql-request";

export const Login_USER = gql`
query Query($userCred: String!, $password: String!) {
  loginUser(userCred: $userCred, password: $password) {
    email
    id
    avatar
    name
    role
    username
  }
}
`;
export const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $username: String!
    $password: String!
    $role: String!
  ) {
    createUser(
      name: $name
      email: $email
      username: $username
      password: $password
      role: $role
    ) {
      avatar
      email
      name
      role
      username
    }
  }
`;

export const GET_ALL_USER = gql`
  query GetAllusers {
    getAllusers {
      avatar
      email
      name
      role
      username
      id
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation Mutation(
    $title: String!
    $description: String!
    $category: String!
    $price: Float!
    $stock: Int!
    $imageUrl: String!
  ) {
    addProduct(
      title: $title
      description: $description
      category: $category
      price: $price
      stock: $stock
      imageUrl: $imageUrl
    ) {
      category
      description
      imageUrl
      price
      stock
      title
    }
  }
`;
export const GET_ALL_PRODUCT = gql`
  query Query {
    getAllProducts {
      category
      description
      id
      imageUrl
      price
      stock
      title
    }
  }
`;
export const GET_PRODUCT_BY_ID = gql`
  query getProductsById($id: String!) {
    getProductsById(id: $id) {
      category
      description
      id
      imageUrl
      price
      stock
      title
      sales {
        quantity
        id
        productId
        createdAt
      }
    }
  }
`;

export const CREATE_SALE = gql`mutation Mutation($productId: String!, $quantity: Int!) {
  createSale(productId: $productId, quantity: $quantity)
}`;
export const LOG_OUT = gql`query Query {
  logOutUser
}`;
