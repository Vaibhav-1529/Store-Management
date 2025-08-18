"use client";

import { useState } from "react";
import { Button, TextField, Flex, Text, Heading, Card } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      
    } catch (err) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <Card size="4" style={{ maxWidth: 400, width: "100%" }}>
        <Heading size="6" mb="4">
          Login
        </Heading>
        <Text size="2" mb="4" color="gray">
          Enter your credentials below
        </Text>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <label>
              <Text>Email</Text>
              <TextField.Root
                placeholder="xyz@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

          {message && (
            <Text
              mt="2"
              color={message.includes("success") ? "green" : "red"}
            >
              {message}
            </Text>
          )}

          <Flex mt="4" justify="end" gap="2">
            <Button type="submit" disabled={loading}>
              {!loading ? "Login" : "Loading..."}
            </Button>
          </Flex>
        </form>
      </Card>
    </main>
  );
}
