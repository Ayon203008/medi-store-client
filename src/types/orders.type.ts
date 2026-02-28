export enum OrderStatus {
  PENDING="PENDING",
  PROCESSING="PROCESSING",
  SHIPPED="SHIPPED",
  CANCELLED="CANCELLED",
  DELIVERED="DELIVERED",
}
export interface Order  {
  id: string;
  status: OrderStatus;
  paymentMethod: string;
  TotalPrice: number;
  quantity: number;
  shippingAddress: string;
  createdAt: string;
  Medicine: {
    name: string;
  };
  Customer: {
    name: string;
    email: string;
  };
  Seller: {
    name: string;
    email: string;
  };
};