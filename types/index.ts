export interface BitcoinPrice {
  usd: number;
  ils: number;
  usd_24h_change: number;
  last_updated_at: number;
}

export interface BitcoinHistoryPoint {
  timestamp: number;
  price_usd: number;
  price_ils: number;
}

export interface MempoolData {
  block_height: number;
  fee_fast: number;
  fee_medium: number;
  fee_slow: number;
  hashrate_1w: number;
}

export interface Lesson {
  id: string;
  slug: string;
  level: 1 | 2 | 3 | 4;
  title: string;
  summary: string;
  body: string;
  order: number;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  short_definition: string;
  full_explanation: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface ContentBlock {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}
