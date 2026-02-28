import { cookies } from "next/headers"

export const UserServices = {
    getSession: async function () {
        try {
            const cookieStore = await cookies()
            const res = await fetch(`${process.env.AUTH_URL}/get-session`, {
                headers: {
                    Cookie: cookieStore.toString()
                },
                cache: "no-store"
            })
            const session = await res.json()
            if (session === null) {
                return { data: session, error: null }
            }
            return { data: session, error: null }
        } catch (err) {
            console.log(err)
            return { data: null, error: { message: "Something went wrong" } }
        }
    },
    getAllUsers: async function () {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`);
            const data = await res.json()
            return { data: data, error: null }
        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },
    
    UpdateUser: async function (id: string, role?: string, status?: string) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ role, status })
            })
            const data = await res.json()
            return { data: data, error: null }
        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    }
}