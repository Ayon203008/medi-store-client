/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IMedicine {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string | null;
  manufacturer: string;
  Category_id: string;
  Category?: { // এই অংশটি যোগ করুন
    id: string;
    name: string;
  };
  Seller?:{
    id:string;
    name:string
  }
  Seller_id: string;
  createdAt: Date;
  updatedAt: Date;
  reviews?: any[]; 
  orders?: any[];
}