import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "About Us", path: "/about" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-nav py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className={`font-display font-black text-3xl tracking-tighter ${
              isScrolled || location !== "/" ? "text-primary" : "text-white"
            } hover:opacity-80 transition-opacity`}
          >
            W3MG<span className="text-accent-foreground/50">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location === link.path;
              // On home page top, links should be white. Else dark/muted.
              const isHomeTop = location === "/" && !isScrolled;
              
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`font-medium text-sm transition-colors relative ${
                    isHomeTop 
                      ? "text-white/80 hover:text-white" 
                      : isActive 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                        isHomeTop ? "bg-white" : "bg-primary"
                      }`}
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
            
            <Link 
              href="/contact"
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                location === "/" && !isScrolled
                  ? "bg-white text-primary hover:bg-white/90 shadow-lg"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
              }`}
            >
              Let's Talk
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled || location !== "/" ? "text-foreground" : "text-white"} />
            ) : (
              <Menu className={isScrolled || location !== "/" ? "text-foreground" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-xl">
          <div className="px-4 py-6 flex flex-col gap-4">
            {[...navLinks, { name: "Contact", path: "/contact" }].map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-lg font-medium p-2 rounded-lg ${
                  location === link.path 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
