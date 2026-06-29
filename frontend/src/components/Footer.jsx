import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

const PinterestIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 19c1-3.5 1.5-5 2-7" />
    <path d="M9 11.5a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" />
  </svg>
);

const HouzzIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M5 3v18l7-4V11l7 4V3" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-rihara-walnut border-t border-rihara-gold/15 mt-32" data-testid="site-footer">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <div className="font-display text-rihara-ivory text-5xl tracking-tight leading-none">rihara</div>
          <div className="mt-2 flex items-center gap-3">
            <span className="h-px w-10 bg-rihara-gold/70" />
            <span className="font-body text-[10px] tracking-[0.42em] uppercase text-rihara-gold">
              Architects &amp; Interiors
            </span>
          </div>
          <p className="font-display italic text-rihara-ivory/70 mt-6 text-xl max-w-md">
            Where spaces tell stories — composed in walnut, brass, linen and light.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-gold mb-5">Studio</div>
          <ul className="space-y-3 font-body text-sm text-rihara-ivory/80">
            <li><Link to="/our-work" className="hover:text-rihara-gold transition-colors">Our Work</Link></li>
            <li><Link to="/services" className="hover:text-rihara-gold transition-colors">Services</Link></li>
            <li><Link to="/process" className="hover:text-rihara-gold transition-colors">Process</Link></li>
            <li><Link to="/#contact" className="hover:text-rihara-gold transition-colors">Begin a Project</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="font-body text-[10px] uppercase tracking-[0.32em] text-rihara-gold mb-5">Contact</div>
          <ul className="space-y-4 font-body text-sm text-rihara-ivory/80">
            <li className="flex items-start gap-3"><Mail className="w-4 h-4 mt-1 text-rihara-gold" /> RiharaInteriors@gmail.com</li>
            <li className="flex items-start gap-3"><Phone className="w-4 h-4 mt-1 text-rihara-gold" /> +91 90000 00000</li>
            <li className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-1 text-rihara-gold" /> Studio Rihara, India</li>
          </ul>
          <div className="flex items-center gap-4 mt-7">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" data-testid="footer-instagram" className="w-10 h-10 inline-flex items-center justify-center border border-rihara-gold/40 text-rihara-ivory hover:bg-rihara-gold hover:text-rihara-walnut transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" data-testid="footer-pinterest" className="w-10 h-10 inline-flex items-center justify-center border border-rihara-gold/40 text-rihara-ivory hover:bg-rihara-gold hover:text-rihara-walnut transition-colors">
              <PinterestIcon className="w-4 h-4" />
            </a>
            <a href="https://houzz.com" target="_blank" rel="noreferrer" data-testid="footer-houzz" className="w-10 h-10 inline-flex items-center justify-center border border-rihara-gold/40 text-rihara-ivory hover:bg-rihara-gold hover:text-rihara-walnut transition-colors">
              <HouzzIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-rihara-gold/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-rihara-ivory/50">© 2025 Rihara Architects &amp; Interiors. All rights reserved.</p>
          <p className="font-body text-xs text-rihara-ivory/40 uppercase tracking-[0.3em]">Composed in walnut &amp; brass</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
