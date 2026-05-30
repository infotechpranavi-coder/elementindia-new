/** Normalize Indian mobile numbers to 10 digits for lookup/storage. */
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length >= 10) {
    return digits.slice(-10);
  }
  return digits;
}

export function isValidPhone(raw: string): boolean {
  return normalizePhone(raw).length === 10;
}

export function formatPhoneDisplay(normalized: string): string {
  const d = normalizePhone(normalized);
  if (d.length !== 10) return normalized;
  return `+91 ${d.slice(0, 5)} ${d.slice(5)}`;
}
