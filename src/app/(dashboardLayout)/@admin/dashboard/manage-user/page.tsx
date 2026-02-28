"use client";

import { useEffect, useState } from "react";
import { UserServices } from "@/services/user.services";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ সব users fetch করুন
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await UserServices.getAllUsers();
      setUsers(data?.data || []);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // ✅ Role update
  const handleRoleChange = async (userId: string, newRole: string) => {
    const toastId = toast.loading("Updating role...");
    const { error } = await UserServices.UpdateUser(userId, newRole, undefined);
    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }
    // ✅ Local state update — re-fetch ছাড়াই UI update হবে
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    toast.success("Role updated successfully", { id: toastId });
  };

  // ✅ Status Block/Unblock
  const handleStatusChange = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    const toastId = toast.loading(
      newStatus === "BLOCKED" ? "Blocking user..." : "Unblocking user..."
    );
    const { error } = await UserServices.UpdateUser(userId, undefined, newStatus);
    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    toast.success(
      newStatus === "BLOCKED" ? "User blocked successfully" : "User unblocked successfully",
      { id: toastId }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">User Management</CardTitle>
          <CardDescription>
            Manage all sellers and customers — {users.length} users total
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user, index) => (
                  <TableRow key={user.id}>

                    {/* Index */}
                    <TableCell className="text-muted-foreground text-sm">
                      {index + 1}
                    </TableCell>

                    {/* Name */}
                    <TableCell className="font-medium">{user.name}</TableCell>

                    {/* Email */}
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>

                    {/* Role */}
                    <TableCell>
                      <Select
                        value={user.role}
                        onValueChange={(value) => handleRoleChange(user.id, value)}
                      >
                        <SelectTrigger className="w-32 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CUSTOMER">Customer</SelectItem>
                          <SelectItem value="SELLER">Seller</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>
                      <Badge
                        variant={user.status === "BLOCKED" ? "destructive" : "outline"}
                        className="text-xs"
                      >
                        {user.status || "ACTIVE"}
                      </Badge>
                    </TableCell>

                    {/* Joined Date */}
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>

                    {/* Block / Unblock Button */}
                    <TableCell>
                      <Button
                        size="sm"
                        variant={user.status === "BLOCKED" ? "outline" : "destructive"}
                        onClick={() => handleStatusChange(user.id, user.status || "ACTIVE")}
                        className="h-8 text-xs"
                      >
                        {user.status === "BLOCKED" ? "Unblock" : "Block"}
                      </Button>
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