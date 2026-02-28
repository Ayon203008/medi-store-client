"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Trash2, Search, FlaskConical } from "lucide-react";
import { MedicineServices } from "@/services/medicine.services";
import { IMedicine } from "@/types/medicines.type";



export default function AllMedicinesPage() {
  const [medicines, setMedicines] = useState<IMedicine[] | IMedicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  const filtered = medicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase()) ||
    med.Category?.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStockBadge = (stock: number) => {
    if (stock === 0)
      return <Badge variant="destructive">Out of Stock</Badge>;
    if (stock < 10)
      return <Badge variant="outline" className="text-yellow-600 border-yellow-400">Low Stock</Badge>;
    return <Badge variant="secondary" className="text-green-700">In Stock</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground animate-pulse">Loading medicines...</p>
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
              <CardTitle className="text-2xl font-bold">All Medicines</CardTitle>
              <CardDescription>
                Total {medicines.length} medicines in the system
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
                    {search ? "No medicines match your search." : "No medicines found."}
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
                      <Badge variant="outline">{med.Category?.name|| "N/A"}</Badge>
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
                              This will permanently delete this medicine from
                              the system. This action cannot be undone.
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