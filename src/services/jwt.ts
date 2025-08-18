import jwt from "jsonwebtoken";
type Payload={
    id:string
}
export function genrateToken(data:Payload){
    const token=jwt.sign(data,process.env.SECRET as string)
    return token;
}

export function verify(token:string){
    const user=jwt.verify(token,process.env.SECRET as string)
    return user as Payload
}