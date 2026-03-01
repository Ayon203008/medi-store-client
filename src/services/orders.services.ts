
export const OrderServices = {
    GetAllOrdersbySeller: async function () {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/seller`, {
                credentials: "include"
            })
            const data = await res.json()
            return { data: data, error: null }

        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },
    GelAllOrdersForCustomer: async function () {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/customer`, {
                credentials: "include"
            })
            const data = await res.json()
            return { data: data, error: null }
        }
        catch (err) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },
    updateOrderStatus: async function (id: string, status: string) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status })
            }
            )
            const data = await res.json()
            return { data: data, error: null }
        } catch (err: any) {
            return { data: null, error: { message: "Something went wrong" } }

        }
    },
    GetallOrders: async function () {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/admin`, {
                credentials: "include"
            })
            const data = await res.json()
            return { data: data, error: null }
        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },
    CreateOrders: async function (orderData: any) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            })
            const data = await res.json()
            return { data: data, error: null }
        } catch (err) {
            return { data: null, message: "Something went wrong" }
        }
    }
}