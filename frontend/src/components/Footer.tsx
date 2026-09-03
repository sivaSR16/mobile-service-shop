import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "../config/site";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-900/85 text-ink-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-bold text-white">
              <img src={logo} alt={siteConfig.shopName} className="h-8 w-8 rounded-lg object-cover" />
              <span className="flex flex-col leading-none">
                <span className="text-lg tracking-tight text-brand-500">{siteConfig.shopName}</span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-ink-300">
                  {siteConfig.brandSubtitle}
                </span>
              </span>
            </div>
            <p className="mt-3 text-sm text-ink-300">
              Professional smartphone repair, genuine-quality parts and
              trusted service.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#services" className="hover:text-brand-400">Services</a></li>
              <li><a href="#gallery" className="hover:text-brand-400">Gallery</a></li>
              <li><a href="#about" className="hover:text-brand-400">About</a></li>
              <li><a href="#contact" className="hover:text-brand-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-400" aria-hidden="true" />
                {siteConfig.phone}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-400" aria-hidden="true" />
                {siteConfig.email}
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden="true" />
                {siteConfig.address}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Hours
            </h3>
            <p className="mt-3 text-sm">{siteConfig.hours}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-ink-800 pt-6 text-center text-xs text-ink-400">
          © {new Date().getFullYear()} {siteConfig.shopName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
