"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Tabs,
  Text,
} from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contextProvider/UserCtx";
import AddUserBtn from "./AddUserBtn";
import { GET_ALL_PRODUCT, GET_ALL_USER } from "@/HelperFunc/qgl/queries";
import { Product, user } from "../../generated/prisma";
import graphqlClient from "@/services/GraphQlClient/gqlclient";
import UsersCard from "./UsersCard";
import AddProductBtn from "./AddProductBtn";
import ProductCard from "./ProductCard";

export default function AdminDashboard() {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState<user[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    async function getusers() {
      try {
        const data: { getAllusers: user[] } =
          await graphqlClient.request(GET_ALL_USER) || [];
        setUsers(data?.getAllusers || []);
      } catch (error) {
        console.log(error);
      }
    }
    getusers();
  }, []);
  useEffect(() => {
    async function getproducts() {
      try {
        const data: { getAllProducts: Product[] } =
          (await graphqlClient.request(GET_ALL_PRODUCT)) || [];
        setProducts(data?.getAllProducts || []);
      } catch (error) {
        console.log(error);
      }
    }
    getproducts();
  }, []);
  return (
    <main className="max-w-7xl mx-auto mt-10 px-4 text-foreground">
      <Flex gap="8" className="flex-col md:flex-row">
        <Box className="flex-1 space-y-6">
          <Card className="p-6">
            <Flex gap="4" align="center">
              <Avatar
                size="7"
                fallback={
                  typeof user?.name === "string"
                    ? user.name[0].toUpperCase()
                    : "U"
                }
                radius="full"
                src={user?.avatar || "https://via.placeholder.com/150"}
              />
              <Box>
                <Heading size="5">{user?.name}</Heading>
                <Text size="2" className="text-muted-foreground">
                  {user?.email}
                </Text>
              </Box>
            </Flex>
          </Card>

          <Card className="p-6 space-y-4">
            <Heading size="4">Store Overview</Heading>
            <Flex gap="4" wrap="wrap">
              <Box className="flex-1 min-w-[120px] text-center bg-accent rounded-lg p-4">
                <Heading size="5">{users.length}</Heading>
                <Text size="2">Total Users</Text>
              </Box>
              <Box className="flex-1 min-w-[120px] text-center bg-accent rounded-lg p-4">
                <Heading size="5">{products.length}</Heading>
                <Text size="2">Total Products</Text>
              </Box>
            </Flex>
          </Card>
        </Box>

        <Box className="flex-[2] space-y-6">
          <Card className="p-6 space-y-3">
            <Flex justify="between" align="center">
              <Heading size="5">Dashboard</Heading>
              <Flex gap="3">
                <AddUserBtn />
                <AddProductBtn />
              </Flex>
            </Flex>
          </Card>

          <Tabs.Root defaultValue="Users">
            <Tabs.List>
              <Tabs.Trigger value="Users">Users</Tabs.Trigger>
              <Tabs.Trigger value="products">Products</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="Users" className="mt-4">
              <Box className="p-6">
                <Flex direction="column" gap="3">
                  {users.map((item) => (
                    <UsersCard user={item} key={item.id} />
                  ))}
                </Flex>
              </Box>
            </Tabs.Content>

            <Tabs.Content value="products" className="mt-4">
              <Box className="p-6">
                <Flex gap="3" wrap="wrap">
                  {products.map((item) => (
                    <ProductCard product={item} key={item.id} />
                  ))}
                </Flex>
              </Box>
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Flex>
    </main>
  );
}
