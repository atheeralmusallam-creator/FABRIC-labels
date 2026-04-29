import type { Metadata } from "next";
import "./globals.css";
import { ThemeApplier } from "@/components/ui/ThemeApplier";

export const metadata: Metadata = {
  title: "FABRIC Label",
  description: "A flexible multi-type data annotation platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script runs before paint — prevents dark flash on light mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('fabric-theme');document.documentElement.classList.add(t==='light'?'light':'dark');}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
      </head>
      <body className="antialiased min-h-screen" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
        {/* Re-applies theme on every client navigation */}
        <ThemeApplier />
        {children}
      </body>
    </html>
  );
}
