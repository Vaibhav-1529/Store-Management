"use client";
import { Button, Dialog, Flex, Select, Text, TextField, Box } from "@radix-ui/themes";
import { useState } from "react";
import { CREATE_USER } from "@/HelperFunc/qgl/queries";
import graphqlClient from "@/services/GraphQlClient/gqlclient";
import { user } from "../../generated/prisma";
import BtnLoading from "./Loading/BtnLoading";

export default function AddUserBtn() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusernamer] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setrole] = useState("staff");

  async function handleadd() {
    setMessage("");
    setLoading(true);
    try {
      const res: { createUser: user | null } = await graphqlClient.request(CREATE_USER, {
        name,
        email,
        password,
        username,
        role,
      });

      if (!res?.createUser) {
        setMessage("User already exists");
      } else {
        setMessage("User created successfully");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root >
      <Dialog.Trigger>
        <Button>ADD USER</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add User</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Fill in the details to create a new user.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Name
            </Text>
            <TextField.Root
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter full name"
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Root
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter email"
              type="email"
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField.Root
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter password"
              type="password"
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Username
            </Text>
            <TextField.Root
              value={username}
              onChange={(e) => setusernamer(e.target.value)}
              placeholder="Enter username"
            />
          </label>

          <Select.Root value={role} onValueChange={(value) => setrole(value)}>
            <Select.Trigger placeholder="Select role" />
            <Select.Content>
              <Select.Group>
                <Select.Label>Roles</Select.Label>
                <Select.Item value="manager">Manager</Select.Item>
                <Select.Item value="staff">Staff</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>

        <Box mt="3">
          {message && (
            <Text
              mt="2"
              color={message.includes("success") ? "green" : "red"}
              className="mt-4"
            >
              {message}
            </Text>
          )}
        </Box>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={handleadd} disabled={loading}>
            {loading ? <BtnLoading /> : "Add User"}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
