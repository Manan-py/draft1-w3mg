import { PageLayout } from "@/components/layout/PageLayout";
import { Reveal, staggerContainer, staggerItem } from "@/components/animations/Reveal";
import { motion } from "framer-motion";
import { Code, Layout, Blocks, Search, Smartphone, ShoppingCart, Rocket } from "lucide-react";
import { Link } from "wouter";

const services = [
  {
    icon: <Blocks className="w-8 h-8" />,
    title: "Custom WordPress",
    desc: "Tailored themes and plugins built for speed, security, and easy content management.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Laravel Web Apps",
    desc: "Robust, scalable backend architectures for complex web applications and portals.",
    color: "from-red-500 to-orange-400"
  },
  {
    icon: <Layout className="w-8 h-8" />,
    title: "Full Stack Development",
    desc: "End-to-end MERN/Next.js solutions with dynamic interfaces and powerful APIs.",
    color: "from-green-500 to-emerald-400"
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Brand Strategy",
    desc: "Strategic positioning and digital branding to make you stand out in the market.",
    color: "from-purple-500 to-fuchsia-400"
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "SEO Optimization",
    desc: "Technical SEO and performance tuning to improve visibility and organic traffic.",
    color: "from-yellow-500 to-amber-400"
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Responsive Design",
    desc: "Pixel-perfect, mobile-first interfaces that look beautiful on every device.",
    color: "from-pink-500 to-rose-400"
  },
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    title: "E-Commerce Setup",
    desc: "High-converting online stores using WooCommerce, Shopify, or custom solutions.",
    color: "from-indigo-500 to-violet-400"
  }
];

export default function Services() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="pt-32 pb-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] opacity-10 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Creative Solutions for <br />
              <span className="text-primary">Building Your Digital Brand</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              We provide a comprehensive suite of digital services designed to accelerate your growth and dominate your industry.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, idx) => (
              <motion.div key={idx} variants={staggerItem} className="group h-full">
                <div className="bg-card h-full p-8 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden hover:-translate-y-1">
                  
                  {/* Hover Gradient Effect */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500 rounded-full`} />
                  
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                  
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-secondary/50 text-center px-4">
        <Reveal>
          <h2 className="text-3xl font-display font-bold mb-6">Not sure what you need?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book a free consultation with our experts. We'll analyze your requirements and propose the perfect tech stack for your goals.
          </p>
          <Link href="/contact" className="inline-flex px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
            Get Free Consultation
          </Link>
        </Reveal>
      </section>
    </PageLayout>
  );
}
