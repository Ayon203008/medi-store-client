import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Linkedin, Mail, Send, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-background pt-16 pb-8 border-t">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 md:grid-cols-2">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-primary-foreground font-bold text-xl">G</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight">GeminiUI</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Building the next generation of web solutions. Combining modern design with peak performance to bring your vision to life.
            </p>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="rounded-full transition-all hover:bg-primary hover:text-primary-foreground hover:-translate-y-1">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full transition-all hover:bg-primary hover:text-primary-foreground hover:-translate-y-1">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full transition-all hover:bg-primary hover:text-primary-foreground hover:-translate-y-1">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-foreground/70">Resources</h4>
            <nav className="flex flex-col space-y-4 text-sm font-medium">
              <Link href="#" className="group flex items-center text-muted-foreground hover:text-primary transition-colors">
                Documentation <ExternalLink className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Components</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Templates</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">API Reference</Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-foreground/70">Company</h4>
            <nav className="flex flex-col space-y-4 text-sm font-medium">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            </nav>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-muted/40 border-muted focus-visible:ring-primary"
                />
                <Button size="icon" className="shrink-0 hover:scale-105 transition-transform">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground/60 italic">
                By subscribing, you agree to our privacy policy.
              </p>
            </div>
          </div>

        </div>

        <Separator className="my-10 opacity-50" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} GeminiUI Inc. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <Mail className="h-4 w-4 group-hover:text-primary transition-colors" />
              <span className="group-hover:text-foreground transition-colors">support@geminiui.com</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-muted/30 border border-muted/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">System Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;