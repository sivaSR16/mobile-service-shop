export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[^\d]/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function isValidEmail(email: string): boolean {
  if (!email) return true; // email is optional in the enquiry form
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
