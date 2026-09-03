/**
 * Central site configuration.
 *
 * The shop's final brand name/contact details are not finalized yet.
 * Everything here is a placeholder — change these values (or wire them to
 * the WebsiteContent API in Phase 2) instead of hard-coding brand info
 * anywhere else in the app.
 */
export const siteConfig = {
  shopName: "SEYON",
  brandSubtitle: "Smart Mobiles and Services",
  tagline: "Fast & Reliable Mobile Phone Repair",
  phone: "+91 8667013552", // TODO: replace with real shop phone
  whatsappNumber: "918667013552", // TODO: digits only, country code, no symbols
  email: "seyonsmartmobiles@gmail.com", // TODO: replace with real shop email
  address: "No.19, Mariammal Nagar Main Road, Kavagari, Puzhal, Chennai -66.", // TODO: replace with real address
  hours: "Mon–Sat: 10:00 AM – 8:00 PM", // TODO: confirm real hours
  socials: {
    instagram: "",
    facebook: "",
  },
} as const;

export function getWhatsappLink(prefilledMessage?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  if (!prefilledMessage) return base;
  return `${base}?text=${encodeURIComponent(prefilledMessage)}`;
}
