"use client";

import { GET_PRODUCT_BY_ID } from "@/HelperFunc/qgl/queries";
import graphqlClient from "@/services/GraphQlClient/gqlclient";
import { useEffect, useState } from "react";
import { Product, Sale } from "../../../../../generated/prisma";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import { useParams } from "next/navigation";
import AddSaleBtn from "@/components/AddSaleBtn";
import ProductSaleChart from "@/components/ProductsSaleChart";

export default function Page() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product&{sales:[Sale]} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      try {
        const data: { getProductsById: Product&{sales:[Sale]} } =
          await graphqlClient.request(GET_PRODUCT_BY_ID, { id });
          setProduct(data?.getProductsById || null);
        } catch (error) {
          console.error("Error fetching product:", error);
          setProduct(null);
        } finally {
          setLoading(false);
        }
      }
      
      if (id) getProduct();
    }, [id]);
    console.log(product)
const chartData=product?.sales.map((sale:Sale)=>{
const data=new Date(Number.parseInt(JSON.stringify(sale?.createdAt)))
const formate=data.getFullYear()+"-"+data.getMonth()+"-"+data.getDate();

const quantity=sale?.quantity
return {
  date:formate,
  quantity
}
})||[]
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Not a valid product
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="relative w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden shadow-lg">
        <Image
          src={product.imageUrl || "/placeholder.png"}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 500px"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-gray-500 text-sm">Category: {product.category}</p>
        <p className="text-2xl font-semibold text-green-600">
          ₹{product.price.toFixed(2)}
        </p>
        <p
          className={`text-sm font-medium ${
            product.stock > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {product.stock > 0
            ? `${product.stock} in stock`
            : "Out of stock"}
        </p>

        <Button
          disabled={product.stock <= 0}
          variant="solid"
          size="3"
          className="w-40 mt-4"
        >    
          Add to Cart
        </Button>
        <AddSaleBtn product={product}/>
        <div className="h-[200px]">

        <ProductSaleChart chartData={chartData}/>
        </div>
      </div>
    </div>
  );
}
