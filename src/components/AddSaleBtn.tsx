'use client'
import { useState } from "react"
import { Product } from "../../generated/prisma"
import { Box, Button } from "@radix-ui/themes"
import graphqlClient from "@/services/GraphQlClient/gqlclient"
import { CREATE_SALE } from "@/HelperFunc/qgl/queries"

export default function AddSaleBtn({product}:{product:Product}) {
    const [quantity,setQuantity]=useState(1)
    async function handleSale() {
        if(product.stock<quantity){
            alert("sale quantity cannot be more than avl stock")
        }
        try {
            const data=await graphqlClient.request(CREATE_SALE,{
                productId:product.id,
                quantity:quantity
            })
        } catch (error:any) {
            console.log(error.message)
        }
    }
  return (
    <Box className="w-full">
        <input type="number"
        onChange={(e)=>{setQuantity(Number.parseInt(e.target.value))}}
        placeholder="Add quantity"/>
        <Button onClick={handleSale}>add to sale</Button>
    </Box>
  )
}
