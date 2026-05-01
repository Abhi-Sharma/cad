import Link from "next/link";
import { programs } from "@/data/programs";

export default function Home() {
  const entries = Object.entries(programs);

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-16 sm:py-24">
      <main className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Lab Programs
          </h1>
          <p className="mt-2 text-sm text-muted">
            Click a program to view its source code.
          </p>
        </div>

        {/* Program List */}
        <div className="flex flex-col gap-1">
          {entries.map(([filename, program]) => (
            <Link
              key={filename}
              href={`/${filename}`}
              className="group flex items-center justify-between rounded-lg border border-transparent px-4 py-3 transition-all duration-150 hover:border-border hover:bg-code-bg"
            >
              <div className="flex items-center gap-3">
                <span className="text-muted text-xs opacity-60">$</span>
                <span className="font-medium">{filename}</span>
              </div>
              <span className="text-xs text-muted opacity-0 transition-opacity group-hover:opacity-100">
                {program.title.replace(/^Program \d+:\s*/, "")}
              </span>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-border pt-6">
          <p className="text-xs text-muted">
            {entries.length} programs available &middot; Click to view &middot;
            Copy with one click
          </p>
        </div>
      </main>
    </div>
  );
}
