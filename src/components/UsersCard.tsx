import { Avatar, Badge, Box, Card, Flex, Text } from "@radix-ui/themes";
import { user } from "../../generated/prisma";

export default function UsersCard({user}:{user:user}) {
  return (
    <>
      <Box>
              <Card className="realtive w-[240px]">
                <div className="absolute top-1 right-1 "><Badge color="green">{user.role}</Badge></div>
                <Flex gap="3" align="center">
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
                    <Text as="div" size="2" weight="bold">
                      {user?.name}
                    </Text>
                    <Text as="div" size="2" color="gray">
                      {user?.email}
                    </Text>
                  </Box>
                </Flex>
              </Card>
      </Box>
    </>
  );
}
