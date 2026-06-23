// app/unauthorized/page.tsx
"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">403 — Unauthorized</h1>
      <p className="text-muted-foreground">
        You don't have access to this page.
      </p>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-primary underline"
      >
        <ArrowLeft className="h-4 w-4" /> Go back
      </button>
    </div>
  );
}
