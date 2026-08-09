import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function fetchFromGraphQL(username: string, token: string) {
  const currentYear = new Date().getFullYear();
  const fromDate = `${currentYear}-01-01T00:00:00Z`;
  const toDate = `${currentYear}-12-31T23:59:59Z`;

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "Nextjs-Portfolio",
    },
    body: JSON.stringify({ query, variables: { username, from: fromDate, to: toDate } }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`GraphQL API returned ${res.status}`);
  const data = await res.json();
  if (data.errors) {
    throw new Error(`GraphQL Errors: ${JSON.stringify(data.errors)}`);
  }

  const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) throw new Error("Invalid GraphQL response structure");

  const levelMap: Record<string, number> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  };

  const days: { date: string; count: number; level: number }[] = [];
  for (const week of calendar.weeks || []) {
    for (const day of week.contributionDays || []) {
      days.push({
        date: day.date,
        count: day.contributionCount,
        level: levelMap[day.contributionLevel] ?? (day.contributionCount > 0 ? 1 : 0),
      });
    }
  }

  return {
    totalContributions: calendar.totalContributions ?? days.reduce((sum, d) => sum + d.count, 0),
    days,
  };
}

async function fetchFromJogruber(username: string) {
  const currentYearStr = new Date().getFullYear().toString();
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Jogruber API returned ${res.status}`);
  const data = await res.json();

  const allDays: any[] = data.contributions || [];
  const yearDays = allDays.filter((d: any) => d.date.startsWith(currentYearStr));
  const days = yearDays.length > 0 ? yearDays : allDays.slice(-364);

  const totalThisYear =
    data.total?.[currentYearStr] ?? days.reduce((acc: number, d: any) => acc + (d.count || 0), 0);

  return {
    totalContributions: totalThisYear,
    days,
  };
}

export async function GET() {
  const username = process.env.GITHUB_USERNAME || "virndra";
  const token = process.env.GITHUB_TOKEN;
  const isPlaceholderToken =
    !token || token.includes("your_github_personal_access_token") || token.trim() === "";

  try {
    if (!isPlaceholderToken) {
      try {
        const graphqlData = await fetchFromGraphQL(username, token!);
        return NextResponse.json(graphqlData, {
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        });
      } catch (err) {
        console.warn("GraphQL GitHub fetch failed, falling back to public API:", err);
      }
    }

    const jogruberData = await fetchFromJogruber(username);
    return NextResponse.json(jogruberData, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err) {
    console.error("Failed to fetch live GitHub contributions:", err);
    return NextResponse.json(
      { totalContributions: 0, days: [] },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}

