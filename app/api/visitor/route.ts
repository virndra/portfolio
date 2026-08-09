import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Initialize base visitor counter
let visitorCount = 142;

// Persistent storage path
const dataDir = path.join(process.cwd(), ".data");
const countFilePath = path.join(dataDir, "visitor-count.json");

// Read existing count from disk if available
try {
  if (fs.existsSync(countFilePath)) {
    const rawData = fs.readFileSync(countFilePath, "utf8");
    const parsed = JSON.parse(rawData);
    if (typeof parsed.count === "number" && parsed.count > 0) {
      visitorCount = parsed.count;
    }
  }
} catch {
  // Use default visitorCount fallback
}

export async function GET() {
  visitorCount += 1;

  // Save updated count to disk asynchronously
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(countFilePath, JSON.stringify({ count: visitorCount }), "utf8");
  } catch {
    // Ignore file write errors in read-only environments
  }

  return NextResponse.json({ count: visitorCount });
}
