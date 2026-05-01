import { NextResponse } from "next/server";
import { programs } from "@/data/programs";

interface Props {
  params: Promise<{ filename: string }>;
}

export async function GET(_req: Request, { params }: Props) {
  const { filename } = await params;
  const program = programs[filename];

  if (!program) {
    return new NextResponse(`/* Program not found: ${filename} */\n`, {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new NextResponse(program.code + "\n", {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `inline; filename="${filename}"`,
    },
  });
}
