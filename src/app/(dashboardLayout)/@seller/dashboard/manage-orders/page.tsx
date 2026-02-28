"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PackageSearch } from "lucide-react";
import { OrderServices } from "@/services/orders.services";
import { Order, OrderStatus } from "@/types/orders.type";


const STATUS_OPTIONS: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.PROCESSING,
  OrderStatus.SHIPPED,
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED,
]

const getStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case "PENDING":
      return <Badge variant="outline" className="text-yellow-600 border-yellow-400">Pending</Badge>;
    case "PROCESSING":
      return <Badge variant="outline" className="text-blue-600 border-blue-400">Processing</Badge>;
    case "DELIVERED":
      return <Badge variant="outline" className="text-green-600 border-green-400">Delivered</Badge>;
    case "CANCELLED":
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await OrderServices.GetAllOrdersbySeller();
    if (error) {
      toast.error("Failed to load orders");
    } else {
      setOrders(data?.data || []);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    const toastId = toast.loading("Updating status...");
    const { error } = await OrderServices.updateOrderStatus(orderId, newStatus);
    setUpdatingId(null);
    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus as OrderStatus } : order
      )
    );
    toast.success("Order status updated", { id: toastId });
  };

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
            <PackageSearch className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">My Orders</CardTitle>
            <CardDescription>
              You have {orders.length} total orders
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Medicine</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Shipping Address</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Update Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-12 text-muted-foreground">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order, index) => (
                  <TableRow key={order.id}>

                    <TableCell className="text-muted-foreground text-sm">
                      {index + 1}
                    </TableCell>

                    <TableCell className="font-medium">
                      {order.Medicine?.name || "N/A"}
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{order.Customer?.name}</span>
                        <span className="text-xs text-muted-foreground">{order.Customer?.email}</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-sm">{order.quantity}</TableCell>

                    <TableCell className="font-semibold text-primary">
                      ৳{order.TotalPrice?.toFixed(2)}
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">{order.paymentMethod}</Badge>
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground max-w-[150px] truncate">
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

                    <TableCell>
                      <Select
                        value={order.status}
                        onValueChange={(val) => handleStatusUpdate(order.id, val)}
                        disabled={updatingId === order.id}
                      >
                        <SelectTrigger className="w-36 h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>

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