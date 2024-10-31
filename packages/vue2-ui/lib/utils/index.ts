export function addPx(value) {
  return typeof value === "number" ? `${value}px` : value;
}
