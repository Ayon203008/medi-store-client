"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Search, FlaskConical } from "lucide-react";
import { MedicineServices } from "@/services/medicine.services";
import { IMedicine } from "@/types/medicines.type";


export default function SellerMedicinesPage() {
  const [medicines, setMedicines] = useState<IMedicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Edit state
  const [editOpen, setEditOpen] = useState(false);
  const [editMedicine, setEditMedicine] = useState<IMedicine | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editStock, setEditStock] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    setLoading(true);
    const { data, error } = await MedicineServices.GetAllMedicines();
    if (error) {
      toast.error("Failed to load medicines");
    } else {
      setMedicines(data?.data || []);
    }
    setLoading(false);
  };

  // Open Edit Dialog
  const openEdit = (medicine: IMedicine) => {
    setEditMedicine(medicine);
    setEditName(medicine.name);
    setEditPrice(String(medicine.price));
    setEditStock(String(medicine.stock));
    setEditDescription(medicine.description || "");
    setEditOpen(true);
  };

  // Handle Update
  const handleUpdate = async () => {
    if (!editMedicine) return;
    if (!editName.trim()) {
      toast.error("Medicine name is required");
      return;
    }
    setEditLoading(true);
    const toastId = toast.loading("Updating medicine...");
    const { error } = await MedicineServices.updateMedicine(editMedicine.id, {
      name: editName,
      price: parseFloat(editPrice),
      stock: parseInt(editStock),
      description: editDescription,
    });
    setEditLoading(false);
    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }
    setMedicines((prev) =>
      prev.map((med) =>
        med.id === editMedicine.id
          ? {
              ...med,
              name: editName,
              price: parseFloat(editPrice),
              stock: parseInt(editStock),
              description: editDescription,
            }
          : med
      )
    );
    toast.success("Medicine updated successfully", { id: toastId });
    setEditOpen(false);
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting medicine...");
    const { error } = await MedicineServices.DeleteMedicine(id);
    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }
    setMedicines((prev) => prev.filter((med) => med.id !== id));
    toast.success("Medicine deleted successfully", { id: toastId });
  };

  const filtered = medicines.filter(
    (med) =>
      med.name.toLowerCase().includes(search.toLowerCase()) ||
      med.Category?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const getStockBadge = (stock: number) => {
    if (stock === 0)
      return <Badge variant="destructive">Out of Stock</Badge>;
    if (stock < 10)
      return (
        <Badge variant="outline" className="text-yellow-600 border-yellow-400">
          Low Stock
        </Badge>
      );
    return (
      <Badge variant="secondary" className="text-green-700">
        In Stock
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground animate-pulse">
          Loading medicines...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FlaskConical className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">My Medicines</CardTitle>
              <CardDescription>
                You have added {medicines.length} medicines
              </CardDescription>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-12 text-muted-foreground"
                  >
                    {search
                      ? "No medicines match your search."
                      : "You have not added any medicines yet."}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((med, index) => (
                  <TableRow key={med.id}>
                    <TableCell className="text-muted-foreground text-sm">
                      {index + 1}
                    </TableCell>

                    <TableCell className="font-medium">{med.name}</TableCell>

                    <TableCell>
                      <Badge variant="outline">{med.Category?.name || "N/A"}</Badge>
                    </TableCell>

                    <TableCell className="font-semibold text-primary">
                      ৳{med.price?.toFixed(2)}
                    </TableCell>

                    <TableCell className="text-sm text-muted-foreground">
                      {med.stock} units
                    </TableCell>

                    <TableCell>{getStockBadge(med.stock)}</TableCell>

                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(med.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        {/* Edit Button */}
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => openEdit(med)}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>

                        {/* Delete Button */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="icon"
                              variant="destructive"
                              className="h-8 w-8"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete "{med.name}"?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete this medicine. This
                                action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(med.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Medicine</DialogTitle>
            <DialogDescription>
              Update the details of your medicine.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Medicine Name</Label>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="e.g. Paracetamol"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price (৳)</Label>
                <Input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  placeholder="0.00"
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <Label>Stock (units)</Label>
                <Input
                  type="number"
                  value={editStock}
                  onChange={(e) => setEditStock(e.target.value)}
                  placeholder="0"
                  min={0}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Describe this medicine..."
                rows={3}
                className="resize-none"
              />
            </div>

            <Button
              className="w-full"
              onClick={handleUpdate}
              disabled={editLoading}
            >
              {editLoading ? "Updating..." : "Update Medicine"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
