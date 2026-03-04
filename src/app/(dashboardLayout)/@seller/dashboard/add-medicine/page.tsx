"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CategoryServices } from "@/services/category.services";
import { MedicineServices } from "@/services/medicine.services";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

type Category = {
  id: string;
  name: string;
};

const medicineSchema = z.object({
  name: z.string().min(1, "Medicine name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(1, "Price must be greater than 0"),
  stock: z.number().min(0, "Stock cannot be negative"),
  image: z.string().url("Must be a valid image URL"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  Category_id: z.string().min(1, "Category is required"),
});

const FormField = ({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <Label htmlFor={htmlFor}>{label}</Label>
    {children}
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

export default function AddMedicineForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
      manufacturer: "",
      Category_id: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Adding medicine...");
      try {
        const { data, error } = await MedicineServices.createMedicine(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Medicine added successfully!", { id: toastId });
      } catch (err) {
        toast.error("Something went wrong. Please try again.", { id: toastId });
      }
    },
    validators: {
      onSubmit: medicineSchema,
    },
  });
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await CategoryServices.GetAllCategories();
     setCategories(data?.data || []); 
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">Add New Medicine</CardTitle>
          <CardDescription>
            Fill in the details below to list a new medicine in the store.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            {/* Medicine Name */}
            <form.Field name="name">
              {(field) => (
                <FormField
                  label="Medicine Name"
                  htmlFor={field.name}
                  error={
                    field.state.meta.isTouched && !field.state.meta.isValid
                      ? field.state.meta.errors[0]?.message
                      : undefined
                  }
                >
                  <Input
                    id={field.name}
                    placeholder="e.g. Napa 500mg"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </FormField>
              )}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
              {(field) => (
                <FormField
                  label="Description"
                  htmlFor={field.name}
                  error={
                    field.state.meta.isTouched && !field.state.meta.isValid
                      ? field.state.meta.errors[0]?.message
                      : undefined
                  }
                >
                  <Textarea
                    id={field.name}
                    placeholder="Describe the medicine, its uses and composition..."
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    rows={3}
                    className="resize-none"
                  />
                </FormField>
              )}
            </form.Field>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <form.Field name="price">
                {(field) => (
                  <FormField
                    label="Price (tk)"
                    htmlFor={field.name}
                    error={
                      field.state.meta.isTouched && !field.state.meta.isValid
                        ? field.state.meta.errors[0]?.message
                        : undefined
                    }
                  >
                    <Input
                      id={field.name}
                      type="number"
                      placeholder="0.00"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.valueAsNumber)
                      }
                      onBlur={field.handleBlur}
                    />
                  </FormField>
                )}
              </form.Field>

              <form.Field name="stock">
                {(field) => (
                  <FormField
                    label="Stock Quantity"
                    htmlFor={field.name}
                    error={
                      field.state.meta.isTouched && !field.state.meta.isValid
                        ? field.state.meta.errors[0]?.message
                        : undefined
                    }
                  >
                    <Input
                      id={field.name}
                      type="number"
                      placeholder="0"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.valueAsNumber)
                      }
                      onBlur={field.handleBlur}
                    />
                  </FormField>
                )}
              </form.Field>
            </div>

            {/* Image URL */}
            <form.Field name="image">
              {(field) => (
                <FormField
                  label="Image URL"
                  htmlFor={field.name}
                  error={
                    field.state.meta.isTouched && !field.state.meta.isValid
                      ? field.state.meta.errors[0]?.message
                      : undefined
                  }
                >
                  <Input
                    id={field.name}
                    placeholder="https://example.com/medicine.png"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </FormField>
              )}
            </form.Field>

            {/* Manufacturer */}
            <form.Field name="manufacturer">
              {(field) => (
                <FormField
                  label="Manufacturer"
                  htmlFor={field.name}
                  error={
                    field.state.meta.isTouched && !field.state.meta.isValid
                      ? field.state.meta.errors[0]?.message
                      : undefined
                  }
                >
                  <Input
                    id={field.name}
                    placeholder="e.g. Beximco Pharmaceuticals Ltd."
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </FormField>
              )}
            </form.Field>

            {/* Category ID */}
            <form.Field name="Category_id">
              {(field) => (
                <FormField
                  label="Category Name"
                  htmlFor={field.name}
                  error={
                    field.state.meta.isTouched && !field.state.meta.isValid
                      ? field.state.meta.errors[0]?.message
                      : undefined
                  }
                >
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                  >
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
              )}
            </form.Field>

            {/* Submit */}
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding Medicine..." : "Add Medicine"}
                </Button>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
