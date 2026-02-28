export const cartServices = {
    addToCart: async function (cartData: any) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( cartData )
            })
            const data = await res.json()
            return { data: data, error: null }
        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },
    deleteCart: async function (id: string) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/${id}`, {
                method: "DELETE",
                credentials: "include"
            })
            const data = await res.json()
            return { data: data, error: null }
        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    }
}