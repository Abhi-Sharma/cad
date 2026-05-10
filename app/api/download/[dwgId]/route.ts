import { NextRequest, NextResponse } from "next/server";
import { dwgs } from "@/data/dwgs";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

interface Props {
  params: Promise<{ dwgId: string }>;
}

export async function GET(_req: NextRequest, { params }: Props) {
  const { dwgId } = await params;
  const decodedDwgId = decodeURIComponent(dwgId);
  const dwgEntry = dwgs[decodedDwgId];

  if (!dwgEntry) {
    return new NextResponse("File not found\n", { status: 404 });
  }

  const filePath = path.join(process.cwd(), "public", "dwgs", dwgEntry.filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Physical file not found\n", { status: 404 });
  }

  try {
    const nodeStream = fs.createReadStream(filePath);
    // Convert Node.js stream to Web ReadableStream for NextResponse
    const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

    return new NextResponse(webStream, {
      status: 200,
      headers: {
        "Content-Type": "application/x-autocad",
        "Content-Disposition": `attachment; filename="${dwgEntry.filename}"`,
      },
    });
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return new NextResponse("Internal server error while reading the file\n", { status: 500 });
  }
}
