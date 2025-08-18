"use client";

import { UserContext } from "@/components/contextProvider/UserCtx";
import Footer from "@/components/Footer";
import { Card, Flex, Box, Heading, Text, Button, Separator } from "@radix-ui/themes";
import Link from "next/link";
import { useContext } from "react";

export default function HomePage() {
  const {user}=useContext(UserContext)
  return (
    <main className="p-6 max-w-6xl mx-auto space-y-7">
      <Box className="text-center py-10 ">
        <Flex align={"center"} gap={"3"} direction={"column"}>

        <Heading size="8" weight="bold" className="mb-6 leading-tight">
          StoreHub - Powering Online Stores
        </Heading>
        <Text size="4" color="gray" className="max-w-2xl mx-auto block leading-relaxed">
          Become a seller and start your journey today.  
          Admins ensure quality. Customers enjoy a trusted marketplace.
        </Text>
        </Flex>
          {
            !user&&
        <Flex justify="center" gap="4" mt="8" wrap="wrap">
          <Link href="/auth/register">
            <Button size="3" radius="large">Become a Seller</Button>
          </Link>
          <Link href="/auth/login">
            <Button size="3" variant="soft" color="green" radius="large">
              Admin Login
            </Button>
          </Link>
        </Flex>
          }
      </Box>

      <Flex gap="8" wrap="wrap" justify="center">
        <Card className="min-w-[200px] p-8 text-center shadow-md">
          <Heading size="6">120+</Heading>
          <Text color="gray">Active Sellers</Text>
        </Card>
        <Card className="min-w-[200px] p-8 text-center shadow-md">
          <Heading size="6">2,500+</Heading>
          <Text color="gray">Products Listed</Text>
        </Card>
        <Card className="min-w-[200px] p-8 text-center shadow-md">
          <Heading size="6">10k+</Heading>
          <Text color="gray">Happy Customers</Text>
        </Card>
      </Flex>

      <Box>
        <Heading size="5" mb={"5"} className="text-center">
          Platform Roles
        </Heading>
        <Flex gap="8" wrap="wrap" justify="center">
          <Card className="w-[300px] p-8 shadow-sm">
            <Heading size="4" mb="4">User</Heading>
            <Text color="gray">Browse and shop from verified sellers in a safe marketplace.</Text>
          </Card>
          <Card className="w-[300px] p-8 shadow-sm">
            <Heading size="4" mb="4">Seller</Heading>
            <Text color="gray">Register, upload products, and manage your own store dashboard.</Text>
          </Card>
          <Card className="w-[300px] p-8 shadow-sm">
            <Heading size="4" mb="4">Admin</Heading>
            <Text color="gray">Oversee sellers, approve accounts, and ensure quality & trust.</Text>
          </Card>
        </Flex>
      </Box>

      {/* How It Works */}
      <Box>
        <Heading size="5" mb={"5"} className="text-center">How It Works</Heading>
        <Flex gap="8" wrap="wrap" justify="center">
          <Card className="w-[300px] p-8 text-center shadow-sm">
            <Heading size="4" mb="3">1. Join</Heading>
            <Text color="gray">Sign up as a seller or buyer in just a few clicks.</Text>
          </Card>
          <Card className="w-[300px] p-8 text-center shadow-sm">
            <Heading size="4" mb="3">2. Add Products</Heading>
            <Text color="gray">Sellers upload products to their personalized dashboard.</Text>
          </Card>
          <Card className="w-[300px] p-8 text-center shadow-sm">
            <Heading size="4" mb="3">3. Start Selling</Heading>
            <Text color="gray">Reach buyers instantly and grow your online business.</Text>
          </Card>
        </Flex>
      </Box>
      <Box>
        <Heading size="5" mb={"5"} className="text-center">What People Say</Heading>
        <Flex gap="8" wrap="wrap" justify="center">
          <Card className="w-[340px] p-8 shadow-sm">
            <Text>
              "StoreHub helped me set up my online store in just a day. Now I’m reaching more customers than ever!"
            </Text>
            <Text mt="4" weight="bold">– Priya Sharma (Seller)</Text>
          </Card>
          <Card className="w-[340px] p-8 shadow-sm">
            <Text>
              "As a customer, I love the variety and trust the sellers because StoreHub verifies them."
            </Text>
            <Text mt="4" weight="bold">– Arjun Mehta (Customer)</Text>
          </Card>
        </Flex>
      </Box>
      <Box>
        <Heading size="5" mb={"5"} className="text-center">Frequently Asked Questions</Heading>
        <Box className="max-w-2xl mx-auto space-y-6">
          <Card className="p-6 shadow-sm">
            <Heading size="3" mb="2">Is StoreHub free?</Heading>
            <Text color="gray">Yes! Signing up as a user or seller is free. Premium features may come later.</Text>
          </Card>
          <Card className="p-6 shadow-sm">
            <Heading size="3" mb="2">Can anyone become a seller?</Heading>
            <Text color="gray">Yes, but admins approve sellers before their store goes live.</Text>
          </Card>
          <Card className="p-6 shadow-sm">
            <Heading size="3" mb="2">What is the role of an admin?</Heading>
            <Text color="gray">Admins monitor sellers, verify products, and keep the platform safe.</Text>
          </Card>
        </Box>
      </Box>

      {/* Footer */}
      
      <Footer/>
    </main>
  );
}
