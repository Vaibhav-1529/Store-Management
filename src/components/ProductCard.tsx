"use client";

import { Card, Flex, Heading, Text, Button } from "@radix-ui/themes";
import Image from "next/image";
import { Product } from "../../generated/prisma";
import Link from "next/link";

export default function ProductCard({product}:{product:Product}) {
  return (
    <Card
      className="w-72 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all"
      variant="surface"
    >
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>

      <Flex direction="column" gap="2" className="p-4">
        <Link href={`/product/${product.id}`}>
        <Heading size="4" truncate>
          {product.title}
        </Heading>
        </Link>
        <Text size="2" color="gray" truncate>
          {product.description}
        </Text>
        <Text size="2" color="gray" weight="medium">
          Category: {product.category}
        </Text>
        <Text size="3" weight="bold" color="green">
          ₹{product.price.toFixed(2)}
        </Text>
        <Text size="2" color={product.stock > 0 ? "green" : "red"}>
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </Text>

        <Button
          disabled={product.stock <= 0}
          variant="solid"
          className="mt-2"
        >
          Add to Cart
        </Button>
      </Flex>
    </Card>
  );
}
