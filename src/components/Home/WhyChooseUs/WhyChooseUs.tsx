import { Card } from "@/components/ui/card";
import { 
  Activity, 
  ShieldCheck, 
  Zap, 
  HeartHandshake 
} from "lucide-react";

const features = [
  {
    id: "01",
    title: "Pharmaceutical Integrity",
    description: "Every product undergoes a 3-step verification process to ensure 100% molecular authenticity before it reaches your door.",
    icon: <ShieldCheck className="w-6 h-6" />,
    style: "border-b border-r"
  },
  {
    id: "02",
    title: "Priority Logistics",
    description: "Our temperature-controlled delivery system ensures that sensitive medicines (like insulin) maintain their efficacy during transit.",
    icon: <Zap className="w-6 h-6" />,
    style: "border-b"
  },
  {
    id: "03",
    title: "Clinical Consultation",
    description: "Access a network of certified pharmacists and health experts for personalized dosage guidance and drug interaction safety.",
    icon: <Activity className="w-6 h-6" />,
    style: "border-r"
  },
  {
    id: "04",
    title: "Patient Advocacy",
    description: "We don't just sell medicine; we manage your health with automated refill reminders and chronic care support.",
    icon: <HeartHandshake className="w-6 h-6" />,
    style: ""
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Editorial Content */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-block px-4 py-1.5 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-bold tracking-widest uppercase bg-slate-50 dark:bg-slate-900">
              Reliability Standards
            </div>
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight leading-[1.1]">
              The Gold Standard in <span className="text-slate-400">Modern Pharmacy.</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-md leading-relaxed">
              We have redesigned the pharmaceutical experience by focusing on speed, safety, and scientific precision.
            </p>
            <div className="pt-4">
              <div className="h-1 w-20 bg-primary" />
            </div>
          </div>

          {/* RIGHT: Sophisticated Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-transparent border border-slate-200 dark:border-slate-800 shadow-2xl rounded-sm">
            {features.map((feature) => (
              <div 
                key={feature.id} 
                className={`p-10 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-900/50 group ${feature.style} border-slate-200 dark:border-slate-800`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-black rounded-sm group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <span className="text-4xl font-black text-slate-100 dark:text-slate-800 transition-colors group-hover:text-primary/20">
                    {feature.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight uppercase">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}