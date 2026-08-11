import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, notAuthenticated, errorResult, jsonResult } from "../supabase";

export default defineTool({
  name: "list_pickups",
  title: "List pickup requests",
  description: "List UCO pickup requests visible to the signed-in user, optionally filtered by status, vendor or date range.",
  inputSchema: {
    status: z.string().optional().describe("Filter by pickup status, e.g. requested, scheduled, completed."),
    vendor_id: z.string().uuid().optional().describe("Only pickups for this vendor id."),
    from_date: z.string().optional().describe("Earliest pickup date, ISO format YYYY-MM-DD."),
    to_date: z.string().optional().describe("Latest pickup date, ISO format YYYY-MM-DD."),
    limit: z.number().int().min(1).max(100).optional().describe("Max rows to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, vendor_id, from_date, to_date, limit }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated();
    let query = supabaseForUser(ctx)
      .from("pickups")
      .select("id, vendor_id, driver_id, pickup_date, status, quantity_kg, drum_count, is_emergency, notes, created_at")
      .order("pickup_date", { ascending: false })
      .limit(limit ?? 20);
    if (status) query = query.eq("status", status);
    if (vendor_id) query = query.eq("vendor_id", vendor_id);
    if (from_date) query = query.gte("pickup_date", from_date);
    if (to_date) query = query.lte("pickup_date", to_date);
    const { data, error } = await query;
    return error ? errorResult(error.message) : jsonResult(data ?? []);
  },
});
