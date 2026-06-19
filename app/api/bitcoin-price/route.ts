import { NextResponse } from "next/server";
import { getBitcoinPrice } from "@/lib/api/coingecko";

export const revalidate = 60;

export async function GET() {
  const price = await getBitcoinPrice();
  return NextResponse.json(price);
}
