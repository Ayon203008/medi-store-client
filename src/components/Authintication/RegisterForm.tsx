"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z, { file } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  // * for continue with google
  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };

  const router = useRouter();

const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Minimum 8 characters required"),
  role: z.enum(["CUSTOMER", "SELLER"]).refine(value => value !== null, {
    message: "Please select a role",
  }),
});

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating User");
      try {
        const { data, error } = await authClient.signUp.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("User created successfully", { id: toastId });

        router.push("/");
      } catch (err) {
        toast.error("Something went wrong , Please try again later", {
          id: toastId,
        });
      }
    },
    validators: {
      onSubmit: formSchema,
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your email"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="role"
              children={(field) => (
                <Field>
                  <FieldLabel>Role</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(val) =>
                      field.handleChange(val as "CUSTOMER" | "SELLER")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CUSTOMER">🛒 Customer</SelectItem>
                      <SelectItem value="SELLER">🏪 Seller</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 justify-end">
        <Button form="login-form" className="w-full" type="submit">
          Register
        </Button>
        <Button className="w-full" onClick={() => handleGoogleLogin()}>
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
