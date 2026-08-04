import { NextResponse } from "next/server";

export async function GET() {
  const username = process.env.GITHUB_USERNAME || "virndra";

  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      const totalThisYear = (data.total && (data.total[2026] || data.total["2026"])) || 39;
      
      const allDays: any[] = data.contributions || [];
      // Filter for 2026 days specifically
      const year2026Days = allDays.filter((d: any) => d.date.startsWith("2026"));

      return NextResponse.json({
        totalContributions: totalThisYear,
        days: year2026Days.length > 0 ? year2026Days : allDays.slice(-364),
      });
    }
  } catch (err) {
    console.error("Failed to fetch live GitHub contributions:", err);
  }

  // Fallback
  return NextResponse.json({ totalContributions: 39, days: [] });
}
