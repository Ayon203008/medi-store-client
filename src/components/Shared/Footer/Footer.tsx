import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Shield,
  Truck,
  HeartPulse,
  Clock,
} from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  medicines: [
    { label: "All Medicines", href: "/medicines" },
    { label: "Categories", href: "/categories" },
    { label: "New Arrivals", href: "/medicines?sort=new" },
    { label: "Best Sellers", href: "/medicines?sort=popular" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Track Order", href: "/orders" },
    { label: "Returns", href: "/returns" },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

const features = [
  { icon: Truck, label: "Free Delivery", sub: "On orders over ৳500" },
  { icon: Shield, label: "Authentic Products", sub: "100% genuine medicines" },
  { icon: Clock, label: "24/7 Support", sub: "Always here for you" },
  { icon: HeartPulse, label: "Licensed Pharmacy", sub: "Govt. approved" },
];

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">

      {/* Features Strip */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <HeartPulse className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground">
                  Medistore
                </span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">BD</Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bangladesh's trusted online pharmacy. We deliver authentic, affordable medicines right to your doorstep — fast, safe, and reliable.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2.5">
              <a
                href="mailto:support@medistore.com.bd"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <Mail className="w-4 h-4 group-hover:text-primary transition-colors shrink-0" />
                support@medistore.com.bd
              </a>
              <a
                href="tel:+8801700000000"
                className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <Phone className="w-4 h-4 group-hover:text-primary transition-colors shrink-0" />
                +880 1700-000000
              </a>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0" />
                Dhaka, Bangladesh
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Company */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.company.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Medicines */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Medicines
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.medicines.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Support
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.support.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.legal.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Subscribe to our newsletter</p>
              <p className="text-xs text-muted-foreground">Get health tips, offers and updates.</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 h-9 px-3 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="h-9 px-4 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Medistore Bangladesh. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Made with</span>
              <HeartPulse className="w-3.5 h-3.5 text-red-500" />
              <span>for better healthcare in Bangladesh</span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}