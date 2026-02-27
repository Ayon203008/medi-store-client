"use client";

import { Menu, HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "./ModeToggler";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    alt: "Medistore",
    title: "Medistore",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Medicines", url: "/medicines" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/register" },
  },
  className,
}: Navbar1Props) => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const filteredMenu = menu.filter((item) => {
    if (item.url === "/dashboard") return !!session;
    return true;
  });

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md", className)}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Desktop */}
        <nav className="hidden lg:flex items-center justify-between h-16">

          {/* Logo */}
          <Link href={logo.url} className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <HeartPulse className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              {logo.title}
            </span>
          </Link>

          {/* Nav Links */}
          <NavigationMenu className="mx-8">
            <NavigationMenuList className="gap-1">
              {filteredMenu.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.url}
                      className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {session ? (
              <Button variant="outline" size="sm" onClick={handleSignOut} className="rounded-full px-5">
                Logout
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="rounded-full px-5">
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="sm" className="rounded-full px-5">
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            )}
            <Separator orientation="vertical" className="h-5 mx-1" />
            <ModeToggle />
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex lg:hidden items-center justify-between h-14">

          {/* Logo */}
          <Link href={logo.url} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <HeartPulse className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="text-base font-bold tracking-tight text-foreground">
              {logo.title}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-72 overflow-y-auto">
                <SheetHeader className="pb-4 border-b border-border">
                  <SheetTitle asChild>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                        <HeartPulse className="w-3.5 h-3.5 text-primary-foreground" />
                      </div>
                      <span className="text-base font-bold">{logo.title}</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 pt-6 px-1">
                  {/* Nav Links */}
                  <div className="flex flex-col gap-1">
                    {filteredMenu.map((item) =>
                      item.items ? (
                        <Accordion key={item.title} type="single" collapsible>
                          <AccordionItem value={item.title} className="border-b-0">
                            <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline hover:text-primary">
                              {item.title}
                            </AccordionTrigger>
                            <AccordionContent className="pb-1">
                              {item.items.map((sub) => (
                                <Link
                                  key={sub.title}
                                  href={sub.url}
                                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                >
                                  {sub.icon && <span>{sub.icon}</span>}
                                  {sub.title}
                                </Link>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ) : (
                        <Link
                          key={item.title}
                          href={item.url}
                          className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                          {item.title}
                        </Link>
                      )
                    )}
                  </div>

                  <Separator />

                  {/* Auth */}
                  <div className="flex flex-col gap-2">
                    {session ? (
                      <Button variant="outline" onClick={handleSignOut} className="w-full rounded-full">
                        Logout
                      </Button>
                    ) : (
                      <>
                        <Button asChild variant="outline" className="w-full rounded-full">
                          <Link href={auth.login.url}>{auth.login.title}</Link>
                        </Button>
                        <Button asChild className="w-full rounded-full">
                          <Link href={auth.signup.url}>{auth.signup.title}</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </header>
  );
};

export { Navbar };