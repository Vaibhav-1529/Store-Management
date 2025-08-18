"use client";
import { useState, useContext } from "react";
import {
  Box,
  Card,
  Flex,
  Text,
  Avatar,
  Button,
  Separator,
} from "@radix-ui/themes";
import { UserContext } from "./contextProvider/UserCtx";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import UserServices from "./UserServices";

export default function Header() {
  const { user } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ];

  return (
    <header className="sticky top-0 w-full z-50 backdrop-blur-lg bg-[var(--color-panel-solid)]/90 border-b border-[var(--gray-a4)] shadow-sm">
      <div className="max-w-7xl m-auto">
        <Flex justify="between" align="center" className="px-4 py-3">
          {/* Brand / Logo */}
          <Text
            weight="bold"
            size="4"
            className="cursor-pointer select-none hover:text-[var(--accent-9)] transition-colors"
          >
            MyApp
          </Text>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex">
            <Flex gap="5" align="center" className="flex-grow justify-center">
              {navLinks.map((link) => (
                <Text
                  key={link.name}
                  size="3"
                  className={`cursor-pointer relative transition-colors hover:text-[var(--accent-9)] ${
                    pathname === link.path
                      ? "text-[var(--accent-9)]"
                      : "text-gray-500"
                  }`}
                  onClick={() => (window.location.href = link.path)}
                >
                  {link.name}
                  {pathname === link.path && (
                    <motion.div
                      layoutId="activeLink"
                      className="absolute left-0 -bottom-1 h-[2px] w-full bg-[var(--accent-9)] rounded"
                    />
                  )}
                </Text>
              ))}
            </Flex>
          </div>

          <div className="flex gap-6  justify-start items-center">
            <div className="hidden md:block">
              {user ? (
                <Box
                  className="cursor-pointer"
                >
                  <Flex gap="3" align="center">
                    <Box className="hidden sm:block">
                      <Text as="div" size="2" weight="bold">
                        {user?.name}
                      </Text>
                      <Text as="div" size="2" color="gray">
                        {user?.email}
                      </Text>
                    </Box>
                    <UserServices />
                  </Flex>
                </Box>
              ) : (
                <Flex gap="2">
                  <Button
                    size="2"
                    variant="outline"
                    className="hover:bg-[var(--accent-3)] hover:text-[var(--accent-11)] transition-colors"
                  >
                    Login
                  </Button>
                  <Button
                    size="2"
                    className="hover:opacity-90 transition-opacity"
                  >
                    Register
                  </Button>
                </Flex>
              )}
            </div>
            <div className="block md:hidden">
              <Button
                variant="ghost"
                className="md:hidden hover:bg-[var(--accent-3)] transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Menu />
              </Button>
            </div>
          </div>
        </Flex>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden px-4 pb-3"
            >
              <Separator my="2" size="4" />
              <Flex direction="column" gap="2">

                {navLinks.map((link) => (
                  <Text
                    key={link.name}
                    size="3"
                    className="cursor-pointer py-1 hover:text-[var(--accent-9)] transition-colors"
                    onClick={() => {
                      setMenuOpen(false);
                      window.location.href = link.path;
                    }}
                  >
                    {link.name}
                  </Text>
                ))}
                {!user && (
                  <>
                    <Separator my="2" />
                    <Button
                      variant="outline"
                      className="hover:bg-[var(--accent-3)] transition-colors"
                    >
                      Login
                    </Button>
                    <Button className="hover:opacity-90 transition-opacity">
                      Register
                    </Button>
                  </>
                )}
                <div
                  className=" w-full flex justify-between gap-6 cursor-pointer py-1  transition-colors"
                >
                    <Box className="hidden sm:block">
                      <Text as="div" size="2" weight="bold">
                        {user?.name}
                      </Text>
                      <Text as="div" size="2" color="gray">
                        {user?.email}
                      </Text>
                    </Box>
                    <UserServices />                </div>
              </Flex>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
