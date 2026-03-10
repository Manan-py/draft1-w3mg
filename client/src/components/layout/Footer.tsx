import { Link } from "wouter";
import { MapPin, Phone, Mail, ArrowRight, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="font-display font-black text-3xl text-white tracking-tighter block mb-6">
              W3MG<span className="text-primary">.</span>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              We build scalable digital solutions that drive real results. From concept to code, we're your partner in innovation.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary text-white transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-display font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Home</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> Portfolio</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"/> About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-4">
              <li className="hover:text-primary transition-colors cursor-pointer">Custom WordPress</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Laravel Web Apps</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Full Stack React</li>
              <li className="hover:text-primary transition-colors cursor-pointer">E-Commerce Setup</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-display font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary shrink-0 mt-1" size={18} />
                <span>123 Innovation Drive, Tech City, TC 10010</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary shrink-0" size={18} />
                <span>hello@w3mg.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© {new Date().getFullYear()} W3MG Agency. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
