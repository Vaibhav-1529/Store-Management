import prismaclient from "@/services/prisma/prisma";
import { ProductCategory } from "../../../../../generated/prisma";

export async function addProduct(_: any, args: {
  title: string;
  description: string;
  imageUrl: string;
  category: ProductCategory;
  price: number;
  stock: number;
}) {
  try {
    const createdProduct = await prismaclient.product.create({
      data: {
        title: args.title,
        description: args.description,
        imageUrl: args.imageUrl,
        category: args.category, 
        price: args.price,
        stock: args.stock,
      }
    });
    if(createdProduct)
    return createdProduct;
    else return null
  } catch (error: any) {
    console.log("Error creating product:", error.message);
    return null;
  }
}

export async function getAllProducts() {
  try {
    const products = await prismaclient.product.findMany();
    if(products)
    return products;
    else return []
  } catch (error: any) {
    console.log("Error creating product:", error.message);
    return [];
  }
}

export async function getProductsById(_:any,args:{
    id:string;
}) {
  try {
    const product = await prismaclient.product.findUnique({
        where:{
            id:args.id,
        },   
        include:{
            sales:{
                orderBy:{
                    createdAt:"desc"
                }
            }
        }
    });
if (product) return product;
else return null;

  } catch (error: any) {
    console.log("Error creating product:", error.message);
    return [];
  }
}
export async function createSale(_:any,args:{
    productId:string,
    quantity:number,
}) {
  try {
const sale = await prismaclient.sale.create({
  data: {
    productId: args.productId,
    quantity: args.quantity,
  },
});

    if(sale){
        await prismaclient.product.update({
            where:{
                id:args.productId
            },
            data:{
                stock:{
                    decrement:args.quantity,
                }
            }
        })
    }

    return true;
  } catch (error: any) {
    console.log("Error creating product:", error.message);
    return false;
  }
} 


