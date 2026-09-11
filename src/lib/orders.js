export const ORDER_STATUS = {
  pagado: { label: "Pagado", color: "#4a8c3f" },
  empacado: { label: "Empacado", color: "#d9a03c" },
  en_proceso: { label: "En proceso", color: "#2f6fb0" },
  entregado: { label: "Entregado", color: "#1e7a34" },
  cancelado: { label: "Cancelado", color: "#a5301b" },
};

export const ORDER_STATUS_KEYS = Object.keys(ORDER_STATUS);

export function isOrderStatus(value) {
  return Object.prototype.hasOwnProperty.call(ORDER_STATUS, value);
}