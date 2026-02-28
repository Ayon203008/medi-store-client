export const CategoryServices = {
    GetAllCategories: async function () {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
            const data = await res.json()
            return { data: data, error: null }
        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    CreateCategories: async function (categroryData: any) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(categroryData)
            });
            const data = await res.json()
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    }
    , DeleteCategories: async function (id: string) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            const data = await res.json()
            return { data: data, error: null }
        } catch (err: any) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    updateCategories: async function (id: string, UpdateCategoryData: any) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(UpdateCategoryData)
            });

            const data = await res.json()
            return { data: data, error: null }
        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    }

}