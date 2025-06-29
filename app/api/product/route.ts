import { fetchProductById } from "@/services/dataoperation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { productId, token } = await req.json();
  fetchProductById(productId, token);
  return NextResponse.json({});
}
