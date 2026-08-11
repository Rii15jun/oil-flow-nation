import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, notAuthenticated, errorResult, jsonResult } from "../supabase";

export default defineTool({
  name: "list_vendors",
  title: "List vendors",
  description: "List UCO vendors visible to the signed-in user, optionally filtered by status, state or name.",
  inputSchema: {
    status: z.string().optional().describe("Filter by vendor status, e.g. active, pending, suspended."),
    state: z.string().optional().describe("Filter by Indian state name."),
    search: z.string().optional().describe("Case-insensitive match on vendor name."),
    limit: z.number().int().min(1).max(100).optional().describe("Max rows to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, state, search, limit }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated();
    let query = supabaseForUser(ctx)
      .from("vendors")
      .select("id, name, owner_name, category, city, state, status, phone, email, monthly_uco_kg, created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (status) query = query.eq("status", status);
    if (state) query = query.eq("state", state);
    if (search) query = query.ilike("name", `%${search}%`);
    const { data, error } = await query;
    return error ? errorResult(error.message) : jsonResult(data ?? []);
  },
});
