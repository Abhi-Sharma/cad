import Link from "next/link";
import { programs } from "@/data/programs";

export default function Pages() {
  const entries = Object.entries(programs);

  return (
    <div className="flex flex-1 flex-col items-center px-6 py-16 sm:py-24">
      <main className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            Lab Programs
          </h1>
          <p className="mt-4 text-muted-foreground">
            Select a program to view and copy the source code.
          </p>
        </div>

        {/* Program List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {entries.map(([filename, program]) => (
            <Link
              key={filename}
              href={`/${filename}`}
              className="group relative flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:shadow-lg hover:border-primary/50 hover:bg-accent/50"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <span className="font-mono text-xs">C</span>
                </div>
                <span className="font-semibold text-lg">{filename}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {program.title.replace(/^Program \d+:\s*/, "")}
              </p>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-muted-foreground">
           {entries.length} premium lab programs ready for use.
        </div>
      </main>
    </div>
  );
}
