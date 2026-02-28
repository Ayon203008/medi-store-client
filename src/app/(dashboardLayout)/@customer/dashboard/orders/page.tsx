"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingBag } from "lucide-react";
import { OrderServices } from "@/services/orders.services";
import { Order, OrderStatus } from "@/types/orders.type";

const getStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return <Badge variant="outline" className="text-yellow-600 border-yellow-400">Pending</Badge>;
    case OrderStatus.PROCESSING:
      return <Badge variant="outline" className="text-blue-600 border-blue-400">Processing</Badge>;
    case OrderStatus.SHIPPED:
      return <Badge variant="outline" className="text-purple-600 border-purple-400">Shipped</Badge>;
    case OrderStatus.DELIVERED:
      return <Badge variant="outline" className="text-green-600 border-green-400">Delivered</Badge>;
    case OrderStatus.CANCELLED:
      return <Badge variant="destructive">Cancelled</Badge>;
  }
};

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await OrderServices.GelAllOrdersForCustomer();
      console.log(data);
      if (error) toast.error("Failed to load orders");
      else setOrders(data?.data || []);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground animate-pulse">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <ShoppingBag className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">My Orders</CardTitle>
            <CardDescription>You have {orders.length} total orders</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Medicine</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                    You have no orders yet.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order, index) => (
                  <TableRow key={order.id}>

                    <TableCell className="text-muted-foreground text-sm">{index + 1}</TableCell>

                    <TableCell className="font-medium">{order.Medicine?.name || "N/A"}</TableCell>

                    <TableCell className="text-sm">{order.quantity}</TableCell>

                    <TableCell className="font-semibold text-primary">
                      ৳{order.TotalPrice?.toFixed(2)}
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">{order.paymentMethod}</Badge>
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground max-w-[130px] truncate">
                      {order.shippingAddress}
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>

                    <TableCell>{getStatusBadge(order.status)}</TableCell>

                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}