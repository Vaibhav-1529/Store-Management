"use client";

import { Button, Card, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import gql from "graphql-tag";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Login_USER } from "@/HelperFunc/qgl/queries";
import graphqlClient from "@/services/GraphQlClient/gqlclient";
import BtnLoading from "@/components/Loading/BtnLoading";
import { UserContext } from "@/components/contextProvider/UserCtx";
import { user } from "../../../generated/prisma";
export default function LoginPage() {
  const router = useRouter();
  const [cred, setCred] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {setUser}=useContext(UserContext)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data:{loginUser:user}=await graphqlClient.request(Login_USER,{
        userCred:cred,
        password
      })
      if(data.loginUser){
        setUser(data?.loginUser)
        window.location.href="/"
      }
      else{
        setMessage("Invalid user")
      }
     
    } catch (err) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <Card size="4" style={{ maxWidth: 400, width: "100%" }}>
        <Flex className="justify-start items-center gap-6">

        <img width={50} height={50} alt="logo" src={"/logo.png"}/>
        <Heading size="6"  className="h-fit">
          Login
        </Heading>
        </Flex>
        <Text size="2" mb="4" color="gray">
          Enter your credentials below
        </Text>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <label>
              <Text>cred</Text>
              <TextField.Root
                placeholder="xyz@gmail.com"
                value={cred}
                onChange={(e) => setCred(e.target.value)}
              />
            </label>
            <label>
              <Text>Password</Text>
              <TextField.Root
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </Flex>

          <Flex mt="4" justify="between" gap="2">
            <div className="w-[70%]">

          {message && (
            <Text
            mt="2"
            color={message.includes("success") ? "green" : "red"}
            className="mt-4"
            >
              {message}
            </Text>
          )}
          </div>
          <div className="w-[30%] flex justify-end">

            <Button type="submit" disabled={loading}>
              {!loading ? "Login" :<BtnLoading/>}
            </Button>
          </div>
          </Flex>
        </form>

        <Text
          mt="3"
          color="green"
          onClick={() => router.push("/signup")}
          className="cursor-pointer hover:underline block text-center"
        >
          Create a new account
        </Text>
      </Card>
    </main>
  );
}
