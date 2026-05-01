import { NextResponse } from "next/server";
import { programs } from "@/data/programs";

export async function GET() {
  const filenames = Object.keys(programs);
  const content = filenames.join("\n") + "\n";

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
