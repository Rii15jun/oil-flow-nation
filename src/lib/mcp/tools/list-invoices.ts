import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, notAuthenticated, errorResult, jsonResult } from "../supabase";

export default defineTool({
  name: "list_invoices",
  title: "List invoices",
  description: "List invoices visible to the signed-in user, optionally filtered by status or vendor.",
  inputSchema: {
    status: z.string().optional().describe("Filter by invoice status, e.g. draft, sent, paid, overdue."),
    vendor_id: z.string().uuid().optional().describe("Only invoices for this vendor id."),
    limit: z.number().int().min(1).max(100).optional().describe("Max rows to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, vendor_id, limit }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated();
    let query = supabaseForUser(ctx)
      .from("invoices")
      .select("id, invoice_number, vendor_id, issue_date, due_date, quantity_kg, rate_per_kg, amount, status, pdf_url")
      .order("issue_date", { ascending: false })
      .limit(limit ?? 20);
    if (status) query = query.eq("status", status);
    if (vendor_id) query = query.eq("vendor_id", vendor_id);
    const { data, error } = await query;
    return error ? errorResult(error.message) : jsonResult(data ?? []);
  },
});
