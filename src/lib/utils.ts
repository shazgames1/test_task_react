// Clamp number between minimum and maximum value
export function clamp(num: number, lower: number, upper: number) {
  return Math.min(Math.max(num, lower), upper)
}

export function formatNumber(number: number) {
  return new Intl.NumberFormat("ru", { style: "decimal" }).format(number)
}
