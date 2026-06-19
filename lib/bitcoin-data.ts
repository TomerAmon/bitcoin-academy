import type { BitcoinPrice, BitcoinHistoryPoint, MempoolData } from "@/types";

const COINGECKO = "https://api.coingecko.com/api/v3";
const MEMPOOL = "https://mempool.space/api";

export async function getBitcoinPrice(): Promise<BitcoinPrice> {
  const res = await fetch(
    `${COINGECKO}/simple/price?ids=bitcoin&vs_currencies=usd,ils&include_24hr_change=true&include_last_updated_at=true`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("CoinGecko price fetch failed");
  const data = await res.json();
  return {
    usd: data.bitcoin.usd,
    ils: data.bitcoin.ils,
    usd_24h_change: data.bitcoin.usd_24h_change,
    last_updated_at: data.bitcoin.last_updated_at,
  };
}

export async function getBitcoinHistory(days: 7 | 30 | 365 = 30): Promise<BitcoinHistoryPoint[]> {
  const [usdRes, ilsRes] = await Promise.all([
    fetch(`${COINGECKO}/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`, { next: { revalidate: 300 } }),
    fetch(`${COINGECKO}/coins/bitcoin/market_chart?vs_currency=ils&days=${days}`, { next: { revalidate: 300 } }),
  ]);
  if (!usdRes.ok || !ilsRes.ok) throw new Error("CoinGecko history fetch failed");
  const [usdData, ilsData] = await Promise.all([usdRes.json(), ilsRes.json()]);

  return usdData.prices.map(([ts, price_usd]: [number, number], i: number) => ({
    timestamp: ts,
    price_usd,
    price_ils: ilsData.prices[i]?.[1] ?? 0,
  }));
}

export async function getMempoolData(): Promise<MempoolData> {
  const [feesRes, heightRes, hashrateRes] = await Promise.all([
    fetch(`${MEMPOOL}/v1/fees/recommended`, { next: { revalidate: 30 } }),
    fetch(`${MEMPOOL}/blocks/tip/height`, { next: { revalidate: 30 } }),
    fetch(`${MEMPOOL}/v1/mining/hashrate/pools/1w`, { next: { revalidate: 300 } }),
  ]);
  if (!feesRes.ok || !heightRes.ok || !hashrateRes.ok) throw new Error("Mempool.space fetch failed");

  const [fees, height, hashrateData] = await Promise.all([
    feesRes.json(),
    heightRes.json(),
    hashrateRes.json(),
  ]);

  const totalHashrate: number = hashrateData.pools
    ? (hashrateData.pools as { share: number }[]).reduce((sum, p) => sum + p.share, 0)
    : hashrateData.currentHashrate ?? 0;

  return {
    block_height: height,
    fee_fast: fees.fastestFee,
    fee_medium: fees.halfHourFee,
    fee_slow: fees.hourFee,
    hashrate_1w: totalHashrate,
  };
}
