
export const UserServices = {
 
    getAllUsers: async function () {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`,{
                credentials:"include"
            });
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
                credentials:"include",
                body: JSON.stringify({ role, status })
            })
            const data = await res.json()
            return { data: data, error: null }
        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    }
}