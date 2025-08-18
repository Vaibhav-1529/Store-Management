import { getuserFromcookies } from "@/HelperFunc/helperFun"
import { genrateToken } from "@/services/jwt"
import prismaclient from "@/services/prisma/prisma"
import { cookies } from "next/headers"
import { RoleType, user } from "../../../../../generated/prisma"

export async function createUser(_: any, args: {
    name: string,
    email: string,
    username: string,
    password: string,

}) {
    try {
        const user = await getuserFromcookies()
        if (!user) {
            console.log("user is null from cookies ",user)
            return null
        }
        if (user?.role != "admin"){
            console.log("user is  not admin ") 
            return null}
        const CreateUser = await prismaclient.user.create({
            data: args
        })
        return CreateUser

    }
    catch (err) {
        return false
    }

}




export async function loginUser(
    _: any,
    args: {
        userCred: string;
        password: string;
    }
) {
    try {
        console.log(args)
        const user = await prismaclient.user.findFirst({
            where: {
                OR:[
                    {
                        email: args.userCred
                    },
                    {
                        username:args.userCred
                    }
                ]
            }
        })
        console.log(user)
        if (!user) {
            console.log("user not found")
            return null
        }
        if (user.password == args.password) {
            const cookie = await cookies();
            const token = genrateToken({ id: user.id })
            cookie.set("Active_User", token)
            return user;
        }
        else {
            return null
        }
    }
    catch (err) {
        console.log(err)
        return null
    }

}
export async function logOutUser() {
    const UserCookies=await cookies();
    try {
        UserCookies.delete("Active_User");
        return true;
    }
    catch (err) {
        console.log(err)
        return false
    }

}


export async function updateUserRole(_: any, args: {
    userId: string,
    role: RoleType
}) {
    try {
        const user = await getuserFromcookies();

        if (user?.role != "admin") return false

        const updatedUser = await prismaclient.user.update({
            where: {
                id: args.userId
            }
            , data: {
                role: args.role
            }
        })
        return true;
    }
    catch (err) {
        return false
    }
}

export async function updateUserProfile(_: any, args: any) {
  const currentUser = await getuserFromcookies();

  if (currentUser?.role !== "admin" && currentUser?.id !== args.userId) {
    return false;
  }

  const dataToSave: any = {};
  if (args.name) dataToSave.name = args.name;
  if (args.username) dataToSave.username = args.username;
  if (args.email) dataToSave.email = args.email;
  if (args.avatar) dataToSave.avatar = args.avatar;
  if (args.password) dataToSave.password = args.password;

  const res = await prismaclient.user.update({
    where: { id: args.userId },
    data: dataToSave
  });

  return !!res;
}

export async function getAllusers() {
    try {
        const roleToFind=await prismaclient.user.findMany({
            where:{
                role:{
                    not:"admin"
                }
            }
        })
        return roleToFind

    } catch (error) {
        console.log(error)
        return null;
    }
    
}
