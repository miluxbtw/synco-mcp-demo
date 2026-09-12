import type { ReactNode } from "react";
import { ConvexClientProvider } from "@/components/convex-provider";

export default function DeskLayout({ children }: { children: ReactNode }) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
}
