import { PageLayout } from "@/components/layout/PageLayout";
import { Reveal } from "@/components/animations/Reveal";
import { useCreateContactMessage } from "@/hooks/use-contact";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@shared/routes";
import { z } from "zod";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";

type FormValues = z.infer<typeof api.contact.create.input>;

export default function Contact() {
  const { mutate: sendMessage, isPending } = useCreateContactMessage();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(api.contact.create.input),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: FormValues) => {
    sendMessage(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <PageLayout>
      <section className="pt-32 pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
                Let's Build Something <span className="text-primary">Great</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Whether you have a specific project in mind or just want to explore possibilities, our team is ready to listen.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <Reveal delay={0.2} direction="right">
                <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-8">Contact Info</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="text-primary" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Our Office</p>
                        <p className="text-muted-foreground text-sm">123 Innovation Drive, <br/>Tech City, TC 10010</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="text-primary" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Phone</p>
                        <p className="text-muted-foreground text-sm">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="text-primary" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-1">Email</p>
                        <p className="text-muted-foreground text-sm">hello@w3mg.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Reveal delay={0.4} direction="left">
                <div className="bg-card border border-border p-8 md:p-12 rounded-2xl shadow-lg">
                  <h3 className="text-3xl font-display font-bold text-foreground mb-8">Send us a message</h3>
                  
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Your Name</label>
                        <input 
                          {...form.register("name")}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                          placeholder="John Doe"
                        />
                        {form.formState.errors.name && (
                          <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Email Address</label>
                        <input 
                          {...form.register("email")}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                          placeholder="john@example.com"
                        />
                        {form.formState.errors.email && (
                          <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Message</label>
                      <textarea 
                        {...form.register("message")}
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                        placeholder="Tell us about your project requirements..."
                      />
                      {form.formState.errors.message && (
                        <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
                      )}
                    </div>

                    <button 
                      type="submit"
                      disabled={isPending}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:-translate-y-1 transition-all shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none w-full md:w-auto"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={20} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
}
