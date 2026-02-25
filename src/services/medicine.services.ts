export const MedicineServices = {
    GetAllMedicines:async function(){
        try{    
            const res= await fetch(`${process.env.API_URL}/api/medicine`)
            const data = await res.json()
            return {data:data,error:null}

        }catch(err){
            return {data:null,error:{message:"Something went wrong"}}
        }
    }
,
    GetMedicineById: async function(id:string){
        try{
            const res= await fetch(`${process.env.API_URL}/api/medicine/${id}`)
            const data = await res.json()
            return {data:data?.data,error:null}
        }catch(err){
            return {data:null,error:{message:"Something went wrong"}}
        }
    }
}

