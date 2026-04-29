"use client";

import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function UserMenu({ user }: { user: { name: string | null; email: string; role: string } }) {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center gap-3 text-sm">
      <ThemeToggle />
      <div className="text-right hidden sm:block">
        <div className="font-medium" style={{ color: "var(--text-primary)" }}>{user.name || user.email}</div>
        <div className="text-xs" style={{ color: "var(--text-muted)" }}>{user.role.toLowerCase()}</div>
      </div>
      <button
        onClick={handleLogout}
        className="transition-colors"
        style={{ color: "var(--text-secondary)" }}
      >
        Logout
      </button>
    </div>
  );
}
