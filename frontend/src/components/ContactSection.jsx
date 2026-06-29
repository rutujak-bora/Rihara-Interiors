import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const projectTypes = [
  "Full Home Interior",
  "Single Room Design",
  "Space Planning Only",
  "Material & Finish Curation",
  "Commercial / Hospitality",
  "Other",
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", projectType: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setLoading(true);
    try {
      const r = await axios.post(`${API}/contact`, form);
      if (r.data?.ok) {
        toast.success("Thank you. Our studio will be in touch shortly.");
        setForm({ name: "", email: "", phone: "", projectType: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("Network error. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-rihara-cream py-32 overflow-hidden" data-testid="contact-section">
      {/* Decorative half-image on the right */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-1/2 opacity-25 lg:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-rihara-cream via-rihara-cream/60 to-transparent lg:bg-gradient-to-r lg:from-rihara-cream lg:via-rihara-cream/0 lg:to-transparent z-10" />
        <img src="/interiors/img11.jpeg" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-12 gap-12 z-20">
        <div className="col-span-12 lg:col-span-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-body text-[10px] uppercase tracking-[0.42em] text-rihara-gold-deep">Begin</span>
            <span className="h-px w-12 bg-rihara-walnut/30" />
          </div>
          <h2 className="font-display text-rihara-walnut text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.98] font-light">
            Ready to <em className="text-rihara-gold-deep not-italic font-display italic">transform</em>
            <br />your space?
          </h2>
          <p className="font-body text-rihara-walnut/70 text-base lg:text-lg leading-relaxed mt-8 max-w-md">
            Tell us about your home, your rituals, and the way you want the rooms to feel. We respond personally within two working days.
          </p>

          <div className="mt-10 space-y-3 font-body text-sm text-rihara-walnut/80">
            <p><span className="text-rihara-gold-deep uppercase tracking-[0.32em] text-[10px]">Studio</span><br />RiharaInteriors@gmail.com</p>
          </div>
        </div>

        <form onSubmit={submit} className="col-span-12 lg:col-span-6 lg:pl-6 bg-rihara-ivory/85 backdrop-blur-sm p-8 lg:p-10 border border-rihara-walnut/10 shadow-2xl" data-testid="contact-form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            <div>
              <label className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-gold-deep">Name</label>
              <input data-testid="contact-name" className="editorial-input" value={form.name} onChange={update("name")} placeholder="Your full name" />
            </div>
            <div>
              <label className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-gold-deep">Email</label>
              <input data-testid="contact-email" type="email" className="editorial-input" value={form.email} onChange={update("email")} placeholder="you@email.com" />
            </div>
            <div>
              <label className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-gold-deep">Phone</label>
              <input data-testid="contact-phone" className="editorial-input" value={form.phone} onChange={update("phone")} placeholder="+91" />
            </div>
            <div>
              <label className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-gold-deep">Project Type</label>
              <Select value={form.projectType} onValueChange={(v) => setForm((f) => ({ ...f, projectType: v }))}>
                <SelectTrigger data-testid="contact-project-type" className="bg-transparent border-0 border-b border-rihara-walnut/25 rounded-none px-0 h-[52px] text-rihara-walnut data-[placeholder]:text-rihara-walnut/40 focus:ring-0 focus:border-rihara-gold-deep">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="bg-rihara-cream border-rihara-walnut/20 text-rihara-walnut">
                  {projectTypes.map((p) => (
                    <SelectItem key={p} value={p} className="focus:bg-rihara-linen focus:text-rihara-walnut">
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2 mt-2">
              <label className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-gold-deep">Tell us about your space</label>
              <textarea
                data-testid="contact-message"
                className="editorial-input resize-none"
                rows={4}
                value={form.message}
                onChange={update("message")}
                placeholder="Rooms involved, scope, timeline, dreams…"
              />
            </div>
          </div>

          <button
            type="submit"
            data-testid="contact-submit"
            disabled={loading}
            className="mt-8 group inline-flex items-center gap-3 bg-rihara-walnut text-rihara-ivory px-8 py-4 uppercase tracking-[0.32em] text-xs font-medium hover:bg-rihara-gold-deep transition-colors disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            {loading ? "Sending" : "Send Enquiry"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
