"use client";

import { useState } from "react";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      title="Copy to clipboard"
      style={{
        background: copied ? "var(--copied-bg)" : "var(--foreground)",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        padding: "6px 14px",
        fontSize: "12px",
        fontFamily: "inherit",
        cursor: "pointer",
        transition: "background 0.2s ease",
        whiteSpace: "nowrap",
      }}
    >
      {copied ? "✓ Copied!" : "Copy"}
    </button>
  );
}
