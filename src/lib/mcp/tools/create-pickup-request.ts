import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser, notAuthenticated, errorResult, jsonResult } from "../supabase";

export default defineTool({
  name: "create_pickup_request",
  title: "Create pickup request",
  description: "Create a new UCO pickup request for a vendor on a given date.",
  inputSchema: {
    vendor_id: z.string().uuid().describe("The vendor the pickup is for."),
    pickup_date: z.string().describe("Requested pickup date, ISO format YYYY-MM-DD."),
    drum_count: z.number().int().min(0).optional().describe("Estimated number of drums."),
    quantity_kg: z.number().min(0).optional().describe("Estimated quantity in kilograms."),
    is_emergency: z.boolean().optional().describe("Mark as an emergency pickup."),
    notes: z.string().optional().describe("Free-text notes for the operations team."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) return notAuthenticated();
    const { data, error } = await supabaseForUser(ctx)
      .from("pickups")
      .insert({
        vendor_id: input.vendor_id,
        pickup_date: input.pickup_date,
        drum_count: input.drum_count ?? null,
        quantity_kg: input.quantity_kg ?? null,
        is_emergency: input.is_emergency ?? false,
        notes: input.notes ?? null,
        requested_by: ctx.getUserId(),
      })
      .select()
      .maybeSingle();
    return error ? errorResult(error.message) : jsonResult(data);
  },
});
