import { anyApi } from "convex/server";

export const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL ?? "";

export const CONVEX_SITE_URL = CONVEX_URL.replace(".convex.cloud", ".convex.site");

export const api = anyApi;
