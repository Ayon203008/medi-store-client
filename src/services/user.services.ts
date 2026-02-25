import { cookies } from "next/headers"

export const UserServices={
    getSession:async function (){
        try{
            const cookieStore = await cookies()
            const res= await fetch(`${process.env.AUTH_URL}/get-session`,{
                headers:{
                    Cookie: cookieStore.toString()
                },
                cache:"no-store"
            })
            const session = await res.json()
            if(session===null){
                return {data:session,error:null}
            }
            return {data:session,error:null}
        }catch(err){
            console.log(err)
            return {data:null,error:{message:"Something went wrong"}}
        }
    }
}