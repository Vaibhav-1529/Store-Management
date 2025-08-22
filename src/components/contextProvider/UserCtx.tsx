"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { RoleType } from "../../../generated/prisma";
import { getuserFromcookies } from "@/HelperFunc/helperFun";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  username: string;
  avatar: string | null;
  role: RoleType;
};

type UserContextType = {
  user: User | null;
  setUser: (value: User | null) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export default function UserCtx({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await getuserFromcookies() as User | null;
      if (!res) {
      } else {
        setUser(res);
      }
    }
    fetchUser();
  }, [router]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
