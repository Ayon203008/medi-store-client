import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface Login1Props {
  heading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title?: string;
    className?: string;
  };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
  className?: string;
}

const Register = ({
  heading = "Register",

  buttonText = "Register",
  signupText = "Already have an account?",
  className,
}: Login1Props) => {
  return (
    <section className={cn("h-screen bg-muted", className)}>
      <div className="flex h-full items-center justify-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-6 lg:justify-start">
      
          <div className="flex w-full max-w-sm min-w-sm flex-col items-center gap-y-4 rounded-md border border-muted bg-background px-6 py-8 shadow-md">
            {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
            <Input
              type="email"
              placeholder="Email"
              className="text-sm"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              className="text-sm"
              required
            />
            <Input
              type="text"
              placeholder="Name"
              className="text-sm"
              required
            />
            <Button type="submit" className="w-full">
              {buttonText}
            </Button>
          </div>
          <div className="flex justify-center gap-1 text-sm text-muted-foreground">
            <p>{signupText}</p>
            <Link
              href={'/login'}
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register ;
