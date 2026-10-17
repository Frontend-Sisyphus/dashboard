import { NextResponse } from "next/server";
import { getCrmOverview } from "@/lib/crm/overview";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const overview = await getCrmOverview();
    return NextResponse.json(overview, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Не удалось получить сводку";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
