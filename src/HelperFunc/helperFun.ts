'use server'
import { verify } from "@/services/jwt";
import prismaclient from "@/services/prisma/prisma";
import { cookies } from "next/headers";

export async function getuserFromcookies() {
    try{
        const cookiesStore=await cookies();
        const ActiveUser=cookiesStore.get("Active_User")?.value||"";
        if(!ActiveUser){
            return null;
        }
        const data=verify(ActiveUser)
        if(!data?.id)
            return null
        const user=await prismaclient.user.findUnique({
            where:{
                id:data?.id,
            }
        })
        if(!user)
            return null;
        return user
    }
    catch(err){
        return null
    }
    
}