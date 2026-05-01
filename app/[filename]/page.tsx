import Link from "next/link";
import { programs } from "@/data/programs";
import CopyButton from "./CopyButton";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ filename: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { filename } = await params;
  const program = programs[filename];
  if (!program) {
    return { title: "Program Not Found | Lab Programs" };
  }
  return {
    title: `${filename} — ${program.title} | Lab Programs`,
    description: `View and copy source code for ${program.title}.`,
  };
}

export default async function ProgramPage({ params }: Props) {
  const { filename } = await params;
  const program = programs[filename];

  if (!program) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-4xl font-bold mb-4">404</p>
        <p className="text-muted mb-8">
          <span className="font-medium" style={{ color: "var(--foreground)" }}>
            {filename}
          </span>{" "}
          — program not found.
        </p>
        <Link
          href="/"
          style={{
            color: "var(--accent)",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ← Back to all programs
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center px-4 py-10 sm:px-6 sm:py-16">
      <main className="w-full max-w-3xl">
        {/* Back link */}
        <Link
          href="/"
          style={{
            color: "var(--muted)",
            textDecoration: "none",
            fontSize: "13px",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            marginBottom: "24px",
          }}
        >
          ← Lab Programs
        </Link>

        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "18px",
                fontWeight: 700,
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {program.title}
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--muted)" }}>
              {filename}
            </p>
          </div>
          <CopyButton code={program.code} />
        </div>

        {/* Code block */}
        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              background: "var(--code-bg)",
              borderBottom: "1px solid var(--border)",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }}
            />
            <span
              style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }}
            />
            <span
              style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }}
            />
            <span style={{ marginLeft: "8px", fontSize: "12px", color: "var(--muted)" }}>
              {filename}
            </span>
          </div>

          {/* Code content */}
          <pre
            style={{
              margin: 0,
              padding: "24px",
              overflowX: "auto",
              background: "#fff",
              fontSize: "13.5px",
              lineHeight: "1.75",
              tabSize: 4,
            }}
          >
            <code>{program.code}</code>
          </pre>
        </div>

        {/* Footer */}
        <p
          style={{
            marginTop: "16px",
            fontSize: "12px",
            color: "var(--muted)",
          }}
        >
          Compile with:{" "}
          <span style={{ color: "var(--foreground)" }}>
            gcc {filename} -o out && ./out
          </span>
        </p>
      </main>
    </div>
  );
}
