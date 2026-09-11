export function parsePrice(text) {
  const digits = String(text ?? "").replace(/[^\d]/g, "");
  const value = Number.parseInt(digits, 10);
  return Number.isFinite(value) ? value : 0;
}

export function formatPrice(value) {
  return Math.round(Number(value) || 0).toLocaleString("es-CO");
}