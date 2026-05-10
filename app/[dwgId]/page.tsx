import Link from "next/link";
import { dwgs } from "@/data/dwgs";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ dwgId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { dwgId } = await params;
  const decodedId = decodeURIComponent(dwgId);
  const dwg = dwgs[decodedId];
  if (!dwg) {
    return { title: "Drawing Not Found" };
  }
  return {
    title: `${decodedId} — ${dwg.title} | Student Toolkit`,
    description: dwg.description,
  };
}

export default async function DWGPage({ params }: Props) {
  const { dwgId } = await params;
  const decodedId = decodeURIComponent(dwgId);
  const dwg = dwgs[decodedId];

  if (!dwg) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center min-h-screen text-center">
        <p className="text-4xl font-bold mb-4">404</p>
        <p className="text-muted-foreground mb-8">
          <span className="font-medium text-foreground">
            {decodedId}
          </span>{" "}
          — drawing not found.
        </p>
        <Link href="/pages" className="text-primary hover:underline">
          ← Back to library
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-screen px-4 text-center">
      <main className="w-full max-w-xl p-8 border border-border rounded-2xl bg-card shadow-sm">
        <h1 className="text-2xl font-bold mb-8 text-foreground">{dwg.filename}</h1>
        
        <div className="flex flex-col items-center justify-center gap-4">
          <a
            href={`/api/download/${encodeURIComponent(decodedId)}`}
            download
            className="w-full px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium"
          >
            Download DWG
          </a>
        </div>
        
        <div className="mt-8">
          <Link href="/pages" className="text-muted-foreground text-sm hover:underline">
            ← Back to library
          </Link>
        </div>
      </main>
    </div>
  );
}
