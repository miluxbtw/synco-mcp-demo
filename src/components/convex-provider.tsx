"use client";

import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { useMemo, type ReactNode } from "react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const client = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL ?? "";
    if (!url) {
      return null;
    }
    return new ConvexReactClient(url);
  }, []);

  if (!client) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5 text-sm text-muted-foreground">
        Set NEXT_PUBLIC_CONVEX_URL to the Convex deployment (…convex.cloud).
      </div>
    );
  }

  return <ConvexAuthProvider client={client}>{children}</ConvexAuthProvider>;
}
