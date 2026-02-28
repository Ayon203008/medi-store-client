export const CategoryServices = {
    GetAllCategories: async function () {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
            const data = await res.json()
            return { data: data, error: null }
        } catch (err) {
            return {data:null,error:{message:"Something went wrong"}}
        }
    }
}