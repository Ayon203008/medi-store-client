"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import { CategoryServices } from "@/services/category.services";
import { any } from "zod";
import { Category } from "@/types/category.types";



export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Create state
  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  // Edit state
  const [editOpen, setEditOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await CategoryServices.GetAllCategories();
    setCategories(data?.data || []);
    setLoading(false);
  };

  // ✅ Create
  const handleCreate = async () => {
    if (!createName.trim()) {
      toast.error("Category name is required");
      return;
    }
    setCreateLoading(true);
    const toastId = toast.loading("Creating category...");
    const { error } = await CategoryServices.CreateCategories({
  name: createName,
  description: createDescription,
});
    setCreateLoading(false);
    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }
    toast.success("Category created successfully", { id: toastId });
    setCreateName("");
    setCreateDescription("");
    setCreateOpen(false);
    fetchCategories();
  };

  // ✅ Open Edit Dialog
  const openEdit = (category: Category) => {
    setEditCategory(category);
    setEditName(category.name);
    setEditDescription(category.description);
    setEditOpen(true);
  };

  // ✅ Update
  const handleUpdate = async () => {
    if (!editCategory) return;
    setEditLoading(true);
    const toastId = toast.loading("Updating category...");
    const { error } = await CategoryServices.updateCategories(editCategory.id, {
  name: editName,
  description: editDescription,
});
    setEditLoading(false);
    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === editCategory.id
          ? { ...cat, name: editName, description: editDescription }
          : cat
      )
    );
    toast.success("Category updated successfully", { id: toastId });
    setEditOpen(false);
  };

  // ✅ Delete
  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting category...");
    const { error } = await CategoryServices.DeleteCategories(id);
    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    toast.success("Category deleted successfully", { id: toastId });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Category Management</CardTitle>
            <CardDescription>
              Manage all medicine categories — {categories.length} total
            </CardDescription>
          </div>

          {/* Create Dialog */}
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new medicine category.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Category Name</Label>
                  <Input
                    placeholder="e.g. Tablet"
                    value={createName}
                    onChange={(e) => setCreateName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe this category..."
                    value={createDescription}
                    onChange={(e) => setCreateDescription(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                </div>
                <Button className="w-full" onClick={handleCreate} disabled={createLoading}>
                  {createLoading ? "Creating..." : "Create Category"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No categories found
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((cat, index) => (
                  <TableRow key={cat.id}>

                    <TableCell className="text-muted-foreground text-sm">
                      {index + 1}
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary">{cat.name}</Badge>
                    </TableCell>

                    <TableCell className="text-muted-foreground text-sm max-w-xs truncate">
                      {cat.description}
                    </TableCell>

                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(cat.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">

                        {/* Edit */}
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => openEdit(cat)}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>

                        {/* Delete with confirmation */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="destructive" className="h-8 w-8">
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete "{cat.name}"?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete this category. All medicines
                                under this category will also be affected.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(cat.id)}
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
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category name or description.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Category Name</Label>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
            <Button className="w-full" onClick={handleUpdate} disabled={editLoading}>
              {editLoading ? "Updating..." : "Update Category"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}