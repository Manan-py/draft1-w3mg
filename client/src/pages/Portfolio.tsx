import { PageLayout } from "@/components/layout/PageLayout";
import { Reveal, staggerContainer, staggerItem } from "@/components/animations/Reveal";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Evolution",
    category: "Responsive E-commerce",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    cols: "col-span-1 md:col-span-2 lg:col-span-2"
  },
  {
    title: "Finance Portal",
    category: "Custom WordPress",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    cols: "col-span-1"
  },
  {
    title: "Healthcare Dashboard",
    category: "Laravel Web App",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop",
    cols: "col-span-1"
  },
  {
    title: "SaaS Platform",
    category: "Full-Stack React",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
    cols: "col-span-1 md:col-span-2"
  },
  {
    title: "Creator Network",
    category: "Membership Portal",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop",
    cols: "col-span-1 md:col-span-2"
  },
  {
    title: "Travel App UI",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=2000&auto=format&fit=crop",
    cols: "col-span-1"
  }
];

export default function Portfolio() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="pt-32 pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-foreground">
              Crafting Websites That <br />
              <span className="text-primary">Captivate and Convert</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our recent work. We blend beautiful design with robust engineering to create memorable digital experiences.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]"
          >
            {projects.map((project, idx) => (
              <motion.div 
                key={idx} 
                variants={staggerItem} 
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${project.cols}`}
              >
                {/* Background Image */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-primary font-medium mb-2 tracking-wide text-sm">{project.category}</p>
                    <div className="flex justify-between items-end">
                      <h3 className="text-white text-3xl font-display font-bold">{project.title}</h3>
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                        <ArrowUpRight size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
