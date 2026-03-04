"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Lock, Mail } from "lucide-react";

export default function ManageProfilePage() {
  
  const { data: session, isPending } = authClient.useSession();

 
  const [name, setName] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);


  const handleProfileUpdate = async () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    setProfileLoading(true);
    const toastId = toast.loading("Updating profile...");

    const { error } = await authClient.updateUser({ name });

    setProfileLoading(false);
    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }
    toast.success("Profile updated successfully", { id: toastId });
  };


  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setPasswordLoading(true);
    const toastId = toast.loading("Changing password...");

    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
    });

    setPasswordLoading(false);

    if (error) {
      toast.error(error.message, { id: toastId });
      return;
    }

    toast.success("Password changed successfully", { id: toastId });

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // * session load হওয়ার আগে loading দেখায়
  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
   
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6">


      <Card>
        <CardHeader>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            
        
            <Avatar className="h-20 w-20 shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            {/* * User এর basic info */}
            {/* <div className="text-center sm:text-left space-y-1">
              <CardTitle className="text-xl">{session?.user?.name}</CardTitle>
              <CardDescription>{session?.user?.email}</CardDescription>
         
              <Badge variant="outline" className="text-xs mt-1">
                {session?.user?.role}
              </Badge>
            </div> */}
          </div>
        </CardHeader>
      </Card>

    
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Personal Information</CardTitle>
              <CardDescription className="text-sm">Update your name</CardDescription>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-4 pt-6">
          
          {/* * Name input — onChange এ state update হয় */}
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          {/* * Email disabled — Better Auth এ email change supported না */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              Email Address
            </Label>
            <Input
              value={session?.user?.email || ""}
              disabled
              className="bg-muted cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">
              Email address cannot be changed
            </p>
          </div>

       
          <Button
            className="w-full"
            onClick={handleProfileUpdate}
            disabled={profileLoading}
          >
            {profileLoading ? "Updating..." : "Update Profile"}
          </Button>
        </CardContent>
      </Card>

     
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Lock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Change Password</CardTitle>
              <CardDescription className="text-sm">
                Use a strong password with 8+ characters
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-4 pt-6">

          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />
          </div>

          {/* * grid-cols-1 mobile, grid-cols-2 desktop এ side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters"
              />
            </div>

            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
              />
            </div>
          </div>

          <Button
            className="w-full"
            onClick={handlePasswordChange}
            disabled={passwordLoading}
          >
            {passwordLoading ? "Changing..." : "Change Password"}
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}