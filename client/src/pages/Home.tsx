import { Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Globe, Rocket, Zap } from "lucide-react";
import { Reveal, staggerContainer, staggerItem } from "@/components/animations/Reveal";

export default function Home() {
  return (
    <PageLayout>
      {/* Hero Section - Split Layout */}
      <section className="min-h-screen flex flex-col lg:flex-row relative bg-background">
        {/* Left Side - Solid Blue */}
        <div className="w-full lg:w-[55%] bg-primary flex items-center justify-center pt-32 pb-20 px-6 lg:px-16 xl:px-24">
          <div className="max-w-xl w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-8">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for new projects
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6">
                From Concept to Code <br className="hidden sm:block" />
                <span className="text-white/70">Solutions That Drive Real Results.</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-lg text-balance">
                Websites, platforms, and custom solutions designed for performance, scalability, and real-world impact. We turn complex problems into elegant digital experiences.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/services" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold text-lg hover:bg-slate-50 transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
                >
                  Explore Our Services
                  <ArrowRight size={20} />
                </Link>
                <Link 
                  href="/portfolio" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-transparent text-white border-2 border-white/30 font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  View Work
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Tech Abstract */}
        <div className="w-full lg:w-[45%] relative min-h-[50vh] lg:min-h-screen bg-slate-900 overflow-hidden">
          {/* Abstract background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-slate-900 z-10mix-blend-overlay" />
          
          {/* abstract tech connection nodes image */}
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Digital Network abstract" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          
          {/* Floating Elements for "Tech" feel */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl max-w-sm hidden md:block"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/40">
                  <Code2 size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold font-display text-lg">Clean Architecture</h3>
                  <p className="text-white/60 text-sm">Built for scale</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-3/4" />
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 w-5/6" />
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400 w-1/2" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats / Logos Section */}
      <section className="py-20 bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">TRUSTED BY INNOVATIVE COMPANIES</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Dummy logos using Lucide icons for now to look professional */}
              {[Globe, Rocket, Zap, Code2].map((Icon, i) => (
                <div key={i} className="flex items-center gap-2 text-foreground font-display font-bold text-xl hover:text-primary transition-colors">
                  <Icon size={32} />
                  <span>Brand {i + 1}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Intro Feature Section */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="right">
              <div className="relative">
                {/* modern workspace coding */}
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" 
                  alt="Our Workspace" 
                  className="rounded-2xl shadow-2xl object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-8 -right-8 bg-card p-6 rounded-xl shadow-xl border border-border hidden md:block">
                  <p className="font-display font-bold text-4xl text-primary mb-1">10+</p>
                  <p className="text-sm text-muted-foreground font-medium">Years of Excellence</p>
                </div>
              </div>
            </Reveal>
            
            <Reveal direction="left">
              <h2 className="text-primary font-bold tracking-wider text-sm uppercase mb-3">Who We Are</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight mb-6">
                We Build Digital Excellence That <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Scales</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-8 text-balance">
                At W3MG, we don't just write code; we engineer solutions. Our team of expert developers and designers collaborate to bring your vision to life using the latest technologies and industry best practices.
              </p>
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {[
                  "Award-winning web development",
                  "Scalable cloud architecture",
                  "User-centric design thinking"
                ].map((item, i) => (
                  <motion.div key={i} variants={staggerItem} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Zap size={14} />
                    </div>
                    <span className="font-medium text-foreground">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
              
              <div className="mt-10">
                <Link 
                  href="/about" 
                  className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors gap-2 group"
                >
                  More About Us 
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden text-center px-4">
        {/* modern abstract liquid gradient */}
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop" alt="bg" className="w-full h-full object-cover"/>
        </div>
        <Reveal className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Ready to start your project?</h2>
          <p className="text-xl text-white/80 mb-10">Let's build something extraordinary together.</p>
          <Link 
            href="/contact" 
            className="inline-flex px-10 py-5 rounded-full bg-white text-primary font-bold text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all"
          >
            Get in Touch Today
          </Link>
        </Reveal>
      </section>
    </PageLayout>
  );
}
