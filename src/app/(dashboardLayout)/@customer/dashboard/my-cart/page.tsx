"use client"
import { useEffect, useState } from "react"
import { cartServices } from "@/services/cart.services"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, ShoppingCart, Package } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { CartItem } from "@/types/cart.types"
import { OrderServices } from "@/services/orders.services"


export default function MyCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null)
  const [shippingAddress, setShippingAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [orderLoading, setOrderLoading] = useState(false)

  const fetchCart = async () => {
    const { data, error } = await cartServices.GetAllCart()
    if (error) { toast.error("Failed to fetch cart"); return }
    setCartItems(data.data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Removing from cart...")
    const { error } = await cartServices.deleteCart(id)
    if (error) { toast.error("Failed to delete", { id: toastId }); return }
    toast.success("Removed from cart", { id: toastId })
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

 
  const handlePlaceOrder = async () => {
    if (!selectedItem) return
    if (!shippingAddress.trim()) { toast.error("Shipping address দাও"); return }
    if (!paymentMethod) { toast.error("Payment method select করো"); return }

    setOrderLoading(true)
    const toastId = toast.loading("Placing order...")

    const { error } = await OrderServices.CreateOrders({
      medicine_id: selectedItem.Medicine.id,
      quantity: selectedItem.quantity,
      paymentMethod,
      shippingAddress,
    })

    setOrderLoading(false)

    if (error) { toast.error("Order failed", { id: toastId }); return }

    toast.success("Order placed successfully!", { id: toastId })
  
    await handleDelete(selectedItem.id)
    setCheckoutOpen(false)
    setSelectedItem(null)
    setShippingAddress("")
    setPaymentMethod("")
  }

  const openCheckout = (item: CartItem) => {
    setSelectedItem(item)
    setCheckoutOpen(true)
  }

  useEffect(() => { fetchCart() }, [])

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.Medicine.price * item.quantity, 0
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground animate-pulse text-sm">Loading cart...</p>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-6">
        <ShoppingCart className="w-14 h-14 text-muted-foreground" />
        <p className="text-lg font-semibold text-muted-foreground">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">

      <div className="flex items-center gap-3">
        <ShoppingCart className="w-6 h-6" />
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">My Cart</h1>
        <Badge className="ml-auto">{cartItems.length} items</Badge>
      </div>

      <Separator />

      {/* Desktop Table */}
      <div className="hidden md:block rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[280px]">Product</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border flex-shrink-0">
                      <Image
                        src={item.Medicine.image || "https://avatar.vercel.sh/medicine"}
                        alt={item.Medicine.name}
                        fill className="object-cover"
                      />
                    </div>
                    <span className="font-semibold text-sm">{item.Medicine.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{item.Medicine.manufacturer}</TableCell>
                <TableCell className="text-sm">{item.Medicine.price} tk</TableCell>
                <TableCell><Badge variant="outline">x{item.quantity}</Badge></TableCell>
                <TableCell className="font-bold text-primary">{item.Medicine.price * item.quantity} tk</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button size="sm" onClick={() => openCheckout(item)}>
                      Order
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {cartItems.map((item) => (
          <Card key={item.id} className="border shadow-sm">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden border flex-shrink-0">
                  <Image
                    src={item.Medicine.image || "https://avatar.vercel.sh/medicine"}
                    alt={item.Medicine.name}
                    fill className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm leading-tight truncate">{item.Medicine.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.Medicine.manufacturer}</p>
                </div>
                <Button variant="destructive" size="icon" className="w-8 h-8 flex-shrink-0"
                  onClick={() => handleDelete(item.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Package className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Unit:</span>
                  <span>{item.Medicine.price} tk</span>
                </div>
                <Badge variant="outline">x{item.quantity}</Badge>
                <span className="font-bold text-primary">{item.Medicine.price * item.quantity} tk</span>
              </div>
              <Button className="w-full" size="sm" onClick={() => openCheckout(item)}>
                Place Order
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center justify-between sm:justify-start sm:gap-6">
          <span className="text-lg font-bold uppercase">Total</span>
          <span className="text-2xl font-black text-primary">{totalPrice} tk</span>
        </div>
      </div>

      {/* ✅ Checkout Modal */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Place Order</DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4 py-2">

              {/* Selected Medicine Info */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden border flex-shrink-0">
                  <Image
                    src={selectedItem.Medicine.image || "https://avatar.vercel.sh/medicine"}
                    alt={selectedItem.Medicine.name}
                    fill className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">{selectedItem.Medicine.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {selectedItem.quantity}</p>
                  <p className="text-sm font-bold text-primary">
                    Total: {selectedItem.Medicine.price * selectedItem.quantity} tk
                  </p>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-1.5">
                <Label>Shipping Address</Label>
                <Input
                  placeholder="House, Road, Area, City..."
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                />
              </div>

              {/* Payment Method */}
              <div className="space-y-1.5">
                <Label>Payment Method</Label>
                <Select onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CASH_ON_DELIVERY">Cash on Delivery</SelectItem>
                    
                  </SelectContent>
                </Select>
              </div>

            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setCheckoutOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePlaceOrder} disabled={orderLoading}>
              {orderLoading ? "Placing..." : "Confirm Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}