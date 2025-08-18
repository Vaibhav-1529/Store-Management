"use client";
import { Button, Dialog, Flex, Select, Text, TextField, Box } from "@radix-ui/themes";
import { useState } from "react";

import graphqlClient from "@/services/GraphQlClient/gqlclient";
import BtnLoading from "./Loading/BtnLoading";
import { Product } from "../../generated/prisma";
import { CREATE_PRODUCT } from "@/HelperFunc/qgl/queries";

export default function AddProductBtn() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState<number | undefined>();
  const [price, setPrice] = useState<number | undefined>();
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("electronics");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    setMessage("");
    setLoading(true);
    try {
      const res:{createProduct:Product} = await graphqlClient.request(CREATE_PRODUCT, {
        title,
        description,
        stock,
        price,
        imageUrl,
        category,
      });

      if (!res) {
        setMessage("Product already exists");
      } else {
        setMessage("Product created successfully");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Add Product</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add Product</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Fill in the details to create a new product.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {/* Title */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Title
            </Text>
            <TextField.Root
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter product title"
            />
          </label>

          {/* Description */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Description
            </Text>
            <TextField.Root
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              type="text"
            />
          </label>

          {/* Stock */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Stock
            </Text>
            <TextField.Root
              value={stock ?? ""}
              onChange={(e) => setStock(Number(e.target.value))}
              placeholder="Enter stock"
              type="number"
            />
          </label>

          {/* Price */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Price
            </Text>
            <TextField.Root
              value={price ?? ""}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Enter price"
              type="number"
            />
          </label>

          {/* Image URL */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Image URL
            </Text>
            <TextField.Root
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
            />
          </label>

          {/* Category */}
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Category
            </Text>
            <Select.Root value={category} onValueChange={(value) => setCategory(value)}>
              <Select.Trigger placeholder="Select category" />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Category</Select.Label>
                  <Select.Item value="electronics">Electronics</Select.Item>
                  <Select.Item value="decoration">Decoration</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </label>
        </Flex>

        {/* Message */}
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

        {/* Buttons */}
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={handleAdd} disabled={loading}>
            {loading ? <BtnLoading /> : "Add Product"}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
