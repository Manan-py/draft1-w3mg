import { PageLayout } from "@/components/layout/PageLayout";
import { Reveal, staggerContainer, staggerItem } from "@/components/animations/Reveal";
import { motion } from "framer-motion";

const stats = [
  { value: "150+", label: "Projects Completed" },
  { value: "25+", label: "Team Members" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "10+", label: "Years in Business" },
];

const team = [
  { name: "Mayuresh Goyal", role: "Founder", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop" },
  { name: "Stuti Singh", role: "MD", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop" },
  { name: "Abhishek Singh", role: "QA Engineer", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2000&auto=format&fit=crop" },
  { name: "Deepak Kumar", role: "WP / React Dev", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop" },
  { name: "Omkar Gadkar", role: "MERN Stack", img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=2000&auto=format&fit=crop" },
  { name: "Aniket Joshi", role: "DevOps Engineer", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2000&auto=format&fit=crop" },
];

export default function About() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="pt-32 pb-20 bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
                Innovation through <span className="text-primary">Dedication</span>.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-balance">
                At W3MG, we believe in the power of technology to transform businesses. 
                Our journey started with a simple goal: to provide world-class development 
                services that bridge the gap between creative concepts and robust code.
              </p>
            </Reveal>
            <Reveal direction="left">
              {/* team collaboration working together */}
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="W3MG Team Collaboration" 
                className="rounded-2xl shadow-2xl"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x border-white/20"
          >
            {stats.map((stat, idx) => (
              <motion.div key={idx} variants={staggerItem} className={`text-center ${idx !== 0 ? 'border-white/20 border-l' : ''}`}>
                <h3 className="text-5xl md:text-6xl font-display font-bold mb-2">{stat.value}</h3>
                <p className="text-white/80 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold text-foreground mb-4">Meet the Experts</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The brilliant minds behind W3MG who make the magic happen every single day.
              </p>
            </div>
          </Reveal>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {team.map((member, idx) => (
              <motion.div key={idx} variants={staggerItem} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5] bg-secondary/50">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-sm">Passionate about delivering excellence.</p>
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
