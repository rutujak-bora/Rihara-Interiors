import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/our-work", label: "Our Work" },
  { to: "/services", label: "Services" },
  { to: "/process", label: "Process" },
  { to: "/about", label: "About Us" },
  { to: "/#contact", label: "Contact" },
];

const Nav = ({ revealed = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [loc.pathname]);

  if (!revealed) return null;

  const solid = scrolled || loc.pathname !== "/";

  return (
    <header
      data-testid="primary-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-rihara-ivory/85 backdrop-blur-xl border-b border-rihara-walnut/10"
          : "bg-gradient-to-b from-rihara-walnut/60 to-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-3 group">
          <span className={`font-display text-3xl tracking-tight leading-none transition-colors ${solid ? "text-rihara-walnut" : "text-rihara-ivory"}`}>
            rihara
          </span>
          <span className={`hidden sm:inline-block h-4 w-px transition-colors ${solid ? "bg-rihara-walnut/30" : "bg-rihara-ivory/40"}`} />
          <span className={`hidden sm:inline-block font-body text-[9px] tracking-[0.42em] uppercase transition-colors ${solid ? "text-rihara-gold-deep" : "text-rihara-gold"}`}>
            Architects &amp; Interiors
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              className={({ isActive }) =>
                `font-body uppercase text-[11px] tracking-[0.32em] transition-colors duration-300 ${
                  isActive
                    ? "text-rihara-gold-deep"
                    : solid
                      ? "text-rihara-walnut/85 hover:text-rihara-gold-deep"
                      : "text-rihara-ivory/90 hover:text-rihara-gold"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          data-testid="nav-mobile-toggle"
          className={`md:hidden ${solid ? "text-rihara-walnut" : "text-rihara-ivory"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-rihara-ivory border-t border-rihara-walnut/10">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-mobile-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                className="font-body uppercase text-xs tracking-[0.32em] text-rihara-walnut hover:text-rihara-gold-deep"
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
