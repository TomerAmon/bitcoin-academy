export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("he-IL", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

export function formatILS(amount: number): string {
  return new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(amount);
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}
