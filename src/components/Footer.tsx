"use client";

import { Box, Flex, Text, Separator } from "@radix-ui/themes";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <Box className="bg-gray-50 mt-20 px-6 py-12">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* About */}
        <div>
          <Text weight="bold" size="4" className="mb-4 block">
            StoreHub
          </Text>
          <Text color="gray" size="2">
            StoreHub is your trusted platform for sellers, admins, and
            customers. We make online commerce simple and secure.
          </Text>
        </div>

        {/* For Sellers */}
        <div>
          <Text weight="bold" size="4" className="mb-4 block">
            For Sellers
          </Text>
          <ul className="space-y-2">
            <li><Link href="/auth/register">Become a Seller</Link></li>
            <li><Link href="/seller/dashboard">Seller Dashboard</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <Text weight="bold" size="4" className="mb-4 block">
            Support
          </Text>
          <ul className="space-y-2">
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/help">Help Center</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <Text weight="bold" size="4" className="mb-4 block">
            Legal
          </Text>
          <ul className="space-y-2">
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/cookies">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

      <Separator size="4" className="my-8" />

      {/* Bottom Footer */}
      <Flex
        justify="between"
        align="center"
        wrap="wrap"
        className="max-w-6xl mx-auto gap-4"
      >
        <Text size="2" color="gray">
          © {new Date().getFullYear()} StoreHub. All rights reserved.
        </Text>

        {/* Social Links */}
        <Flex gap="4">
          <Link href="#"><Facebook className="w-5 h-5 text-gray-500 hover:text-gray-800" /></Link>
          <Link href="#"><Twitter className="w-5 h-5 text-gray-500 hover:text-gray-800" /></Link>
          <Link href="#"><Instagram className="w-5 h-5 text-gray-500 hover:text-gray-800" /></Link>
          <Link href="#"><Linkedin className="w-5 h-5 text-gray-500 hover:text-gray-800" /></Link>
        </Flex>
      </Flex>
    </Box>
  );
}
