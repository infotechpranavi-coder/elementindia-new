export function formatProductPrice(price?: number) {
  if (price == null || !Number.isFinite(price)) return null;
  return `₹${price.toLocaleString("en-IN")}`;
}
