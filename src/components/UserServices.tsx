"use client";

import {
  Avatar,
  Box,
  Flex,
  Heading,
  Popover,
  Separator,
  Text,
} from "@radix-ui/themes";
import {
  ChevronRight,
  LogOut,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "./contextProvider/UserCtx";
import graphqlClient from "@/services/GraphQlClient/gqlclient";
import { LOG_OUT } from "@/HelperFunc/qgl/queries";
export default function UserServices() {
    const {user,setUser}=useContext(UserContext)
    // async function handleLogOut(){
    //   try {
    //     const res=await graphqlClient.request(LOG_OUT)as {logOut:boolean};
    //     if(res.logOut){
    //       setUser(null)
    //     }
    //   } catch (error) {
        
    //   }
    // }
  return (
    <div>
      <Popover.Root>
        <Popover.Trigger>
          <button>
            <Avatar
                  size="3"
                  src=""
                  radius="full"
                  fallback={
                    typeof user?.name === "string"
                      ? user.name[0].toUpperCase()
                      : "U"
                  }
                />
          </button>
        </Popover.Trigger>

        <Popover.Content
          maxWidth="230px"
          style={{
            backgroundColor: "var(--green-2)",
            border: "1px solid var(--green-5)",
            borderRadius: "8px",
            padding: "12px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Flex gap="4">
            <Avatar
                  size="3"
                  src=""
                  radius="full"
                  fallback={
                    typeof user?.name === "string"
                      ? user.name[0].toUpperCase()
                      : "U"
                  }
                />
            <Box>
              <Heading size="3" as="h3" color="green">
                {user?.name}
              </Heading>
              <Text as="div" size="2" color="gray" mb="2">
               {user?.email}
              </Text>
            </Box>
          </Flex>

          <Separator my="3" size="4" />

          <Box>
            <Link href="/profile">
              <Flex
                className="border border-transparent hover:border-green-5 px-3 py-1.5 rounded-md transition-colors duration-200"
                justify="between"
                align="center"
              >
                <Text as="div" size="2" color="green">
                  <Flex gap="3" align="center">
                    <User />
                    User Profile
                  </Flex>
                </Text>
                <ChevronRight className="text-[#2d9445]" />
              </Flex>
            </Link>

            <Flex
              className="border border-transparent hover:border-green-5 px-3 py-1.5 rounded-md transition-colors duration-200"
              justify="between"
              align="center"
            >
              <Text as="div" size="2" color="green">
                <Flex gap="3" align="center">
                  <Users />
                  Switch Profile
                </Flex>
              </Text>
              <ChevronRight className="text-[#2d9445]" />
            </Flex>

            <Flex
              className="border border-transparent hover:border-green-5 px-3 py-1.5 rounded-md transition-colors duration-200"
              justify="between"
              align="center"
            >
              <Text as="div" size="2" color="green">
                <Flex gap="3" align="center">
                  <UserPlus />
                  Add Account
                </Flex>
              </Text>
              <ChevronRight className="text-[#2d9445]" />
            </Flex>

            <Flex
              className="border border-transparent hover:border-red-5 px-3 py-1.5 rounded-md transition-colors duration-200 cursor-pointer"
              justify="start"
              align="center"
            >
              <Text as="div" size="2" color="red">
                <Flex gap="3" align="center">
                <LogOut />
                  Log out
                </Flex>
              </Text>
            </Flex>
          </Box>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}
