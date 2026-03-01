

export const MedicineServices = {
    // * get all medicines
    GetAllMedicines: async function (query?: {
        name?: string;
        manufacturer?: string;
        minPrice?: string;
        maxPrice?: string;
    }) {
        try {
            const params = new URLSearchParams();
            if (query?.name) params.set("name", query.name);
            if (query?.manufacturer) params.set("manufacturer", query.manufacturer);
            if (query?.minPrice) params.set("minPrice", query.minPrice);
            if (query?.maxPrice) params.set("maxPrice", query.maxPrice);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/medicine?${params.toString()}`)
            const data = await res.json()
            return { data: data, error: null }

        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },
    // * Get all medicines by id
    GetMedicineById: async function (id: string) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/medicine/${id}`)
            const data = await res.json()
            return { data: data?.data, error: null }
        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },
    // * create medicine by seller
    createMedicine: async function (medicine: any) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/medicine`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(medicine),
                credentials: "include"
            })
            const data = await res.json()
            return { data: data, error: null }

        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },
    // * Delete medicine
    DeleteMedicine: async function (id: string) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/medicine/${id}`, {
                method: "DELETE",
                credentials: "include"
            })
            const data = await res.json()
            return { data: data, error: null }

        } catch (err) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },
    // * Update medicine data 
    updateMedicine: async function (id: string, MedicineData: any) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/medicine/${id}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(MedicineData)
            })
            const data = await res.json()
            return { data: data, error: null }

        } catch (err) {
            return { data: null, error: { "message": "Something went wrong" } }
        }
    }
}

