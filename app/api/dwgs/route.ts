import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "dwgs.zip");
  
  if (!fs.existsSync(filePath)) {
    return new NextResponse("Zip file not found\n", { status: 404 });
  }

  const stat = fs.statSync(filePath);
  const stream = fs.createReadStream(filePath);

  return new NextResponse(stream as any, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="dwgs.zip"`,
      "Content-Length": stat.size.toString(),
    },
  });
}
