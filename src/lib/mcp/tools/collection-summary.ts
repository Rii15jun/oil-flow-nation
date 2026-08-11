import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, notAuthenticated, errorResult, jsonResult } from "../supabase";

export default defineTool({
  name: "collection_summary",
  title: "Collection summary",
  description: "Summarise UCO collection volume and invoiced value over a date range for the signed-in user's accessible data.",
  inputSchema: {
    from_date: z.string().optional().describe("Start date, ISO format YYYY-MM-DD."),
    to_date: z.string().optional().describe("End date, ISO format YYYY-MM-DD."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ from_date, to_date }, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated();
    const supabase = supabaseForUser(ctx);

    let pickupQuery = supabase.from("pickups").select("status, quantity_kg, pickup_date").limit(1000);
    if (from_date) pickupQuery = pickupQuery.gte("pickup_date", from_date);
    if (to_date) pickupQuery = pickupQuery.lte("pickup_date", to_date);

    let invoiceQuery = supabase.from("invoices").select("status, amount, issue_date").limit(1000);
    if (from_date) invoiceQuery = invoiceQuery.gte("issue_date", from_date);
    if (to_date) invoiceQuery = invoiceQuery.lte("issue_date", to_date);

    const [pickups, invoices] = await Promise.all([pickupQuery, invoiceQuery]);
    if (pickups.error) return errorResult(pickups.error.message);
    if (invoices.error) return errorResult(invoices.error.message);

    const pickupRows = pickups.data ?? [];
    const invoiceRows = invoices.data ?? [];

    return jsonResult({
      range: { from: from_date ?? null, to: to_date ?? null },
      pickups: {
        total: pickupRows.length,
        completed: pickupRows.filter((p) => p.status === "completed").length,
        total_kg: pickupRows.reduce((sum, p) => sum + (p.quantity_kg ?? 0), 0),
      },
      invoices: {
        total: invoiceRows.length,
        total_amount: invoiceRows.reduce((sum, i) => sum + (i.amount ?? 0), 0),
        paid_amount: invoiceRows
          .filter((i) => i.status === "paid")
          .reduce((sum, i) => sum + (i.amount ?? 0), 0),
      },
    });
  },
});
