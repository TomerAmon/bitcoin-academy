import type { BitcoinPrice } from "@/types";

const BASE_URL = "https://api.coingecko.com/api/v3";

export async function getBitcoinPrice(): Promise<BitcoinPrice> {
  const res = await fetch(
    `${BASE_URL}/simple/price?ids=bitcoin&vs_currencies=usd,ils&include_24hr_change=true&include_last_updated_at=true`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Bitcoin price");
  const data = await res.json();
  return {
    usd: data.bitcoin.usd,
    ils: data.bitcoin.ils,
    usd_24h_change: data.bitcoin.usd_24h_change,
    last_updated_at: data.bitcoin.last_updated_at,
  };
}
