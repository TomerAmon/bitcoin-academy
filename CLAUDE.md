@AGENTS.md

# הזהב החדש — Claude Workspace Context

## Project Identity
- **Name:** הזהב החדש (The New Gold)
- **Purpose:** An educational platform for Israelis about Bitcoin, economics, and the future of money.
- **Brand Voice:** Professional, empathetic to the Israeli economic reality, educational, and inspiring. Acknowledges the pain of shekel inflation without being alarmist. Simplifies complex concepts without dumbing them down.

## AI Guide: ישראביט (IsraBit)
- **Role:** A persistent, interactive AI guide floating on every page as a chat bubble.
- **Persona:** Wise, helpful, slightly skeptical of traditional finance, eager to simplify complex terms (Hashing, Proof of Work, Mempool, etc.) for Israeli users.
- **Component:** `components/ui/IsraBit.tsx` — a floating chat bubble rendered in the root layout so it appears on every page.
- **Behavior:** Clicking glossary terms anywhere on the site opens IsraBit with a pre-filled explanation request.

## Educational Content Strategy
- **Core Narrative:** Explain the failure of fiat currencies (specifically the Shekel / ₪), inflation erosion of purchasing power, and contrast that with Bitcoin's fixed 21M supply and hard monetary policy. Draw from:
  - Bitcoin.org/he
  - *The Bitcoin Standard* (Saifedean Ammous)
  - *Grokking Bitcoin* (Kalle Rosenbaum)
- **CMS:** All editable content (lesson copy, FAQ answers, glossary definitions) is stored in Supabase and fetched server-side.
- **Features to build:**
  1. **Interactive Glossary** — clicking a term anywhere on the page triggers IsraBit to explain it in simple Hebrew.
  2. **Educational Roadmap** — 4 levels (מתחיל → מתקדם → מומחה → HODLER), each with multiple lessons fetched from Supabase.
  3. **Purchasing Power Widget** — real-time comparison of ₪ vs BTC value over time (uses CoinGecko historical data).

## Design System
- **Theme:** Modern dark UI, premium feel. No light mode.
- **Primary background:** `#0a0a0f`
- **Card surface:** `#111118`
- **Border:** `#1e1e2e`
- **Bitcoin accent:** `#F7931A`
- **Gold highlight:** `#FFD700` (used sparingly for "הזהב החדש" branding)
- **Text primary:** `#f8f8f8`
- **Text muted:** `#6b7280`
- **Animations:** Framer Motion for all transitions, entrance animations, and interactive feedback. No CSS keyframes — use `motion.*` components.
- **Font:** Heebo (Google Fonts, hebrew + latin subsets)

## Tech Stack
- **Framework:** Next.js 16 (App Router) — `app/` directory convention
- **Styling:** Tailwind CSS v4 — RTL-aware utilities, dark-only theme
- **Language:** TypeScript
- **Animations:** Framer Motion

## Backend / CMS
- **Supabase** for all editable content
  - `@supabase/ssr` for server components
  - `@supabase/supabase-js` for client components
  - Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

## Data Services (`lib/bitcoin-data.ts`)
Single unified module for all external Bitcoin data. Never call CoinGecko or Mempool directly from components — always go through this module.

| Source | Data | Revalidation |
|---|---|---|
| CoinGecko `/simple/price` | BTC price in USD + ILS, 24h change | 60s |
| CoinGecko `/coins/bitcoin/market_chart` | Historical price for charts | 5m |
| Mempool.space `/api/v1/fees/recommended` | Fee estimates (fast/medium/slow) | 30s |
| Mempool.space `/api/blocks/tip/height` | Current block height | 30s |
| Mempool.space `/api/v1/mining/hashrate/pools/1w` | Network hashrate | 5m |

## Folder Structure
```
app/
  layout.tsx              # Root layout: dark bg, lang="he" dir="rtl", IsraBit rendered here
  page.tsx                # Homepage
  learn/
    page.tsx              # Roadmap overview (4 levels)
    [slug]/page.tsx       # Individual lesson (content from Supabase)
  price/page.tsx          # Live price + charts + Mempool data
  glossary/page.tsx       # Full glossary (terms from Supabase)
  faq/page.tsx            # FAQ (answers from Supabase)
  api/
    bitcoin-price/route.ts
    bitcoin-history/route.ts
    mempool/route.ts

components/
  ui/
    BitcoinLogo.tsx       # Inline SVG Bitcoin icon
    IsraBit.tsx           # Floating AI chat bubble (persistent, client component)
    GlossaryTerm.tsx      # Inline term that triggers IsraBit on click
  charts/
    PriceChart.tsx        # Recharts line chart for BTC price history
    PowerWidget.tsx       # Purchasing power comparison (₪ vs BTC)
  layout/
    Header.tsx            # Sticky dark nav
    Footer.tsx            # Dark footer

lib/
  bitcoin-data.ts         # Unified CoinGecko + Mempool.space data service
  supabase/
    client.ts             # Browser client (@supabase/ssr)
    server.ts             # Server client (@supabase/ssr + cookies)
  utils/
    format.ts             # formatUSD, formatILS, formatPercent, formatBTC

types/
  index.ts                # BitcoinPrice, MempoolData, Lesson, GlossaryTerm, etc.
```

## Coding Conventions
- Prefer server components; use `"use client"` only when hooks or browser APIs are needed
- All Framer Motion animations must use `"use client"` directive
- No inline styles — Tailwind only
- No comments unless the WHY is genuinely non-obvious
- Prices always shown as both USD and ₪ (ILS)
- Never call external APIs directly from components — always via `lib/bitcoin-data.ts` or a Route Handler

## Environment
- Platform: Windows 11, PowerShell
- Package manager: npm
