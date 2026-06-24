// app/page.tsx
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// const features = [
//   "Track tasks across multiple projects",
//   "Role-based access control",
//   "Real-time team collaboration",
//   "Priority and deadline management",
// ];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-8 py-24">
        <div className="max-w-2xl flex flex-col items-center gap-6">
          {/* <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-green-500 shrink-0" />
                {f}
              </li>
            ))}
          </ul> */}

          <Button size="lg" className="gap-2 mt-2" asChild>
            <Link href="/login">
              Get started
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </main>

      <footer className="border-t border-border px-6 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Taskr. All rights reserved.
      </footer>
    </div>
  );
}
