export const ReviewServices = {
    CreateReviews: async function (reviewData: any) {

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                credentials: "include",
                body: JSON.stringify(reviewData)
            });
            const data = await res.json()
            return { data: data, error: null }
        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } }
        }

    },
    getReviews:async function (id:string) {
        try {
            const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/${id}`,{
                credentials:"include"
            })
            const data = await res.json()
            return {data:data,error:null}
        }catch(err){
            return {data:null,error:{message:"Something went wrong"}}
        }
    },
}