import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listVendors from "./tools/list-vendors";
import listPickups from "./tools/list-pickups";
import createPickupRequest from "./tools/create-pickup-request";
import listInvoices from "./tools/list-invoices";
import collectionSummary from "./tools/collection-summary";

const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset";

export default defineMcp({
  name: "kissan-oil-connect",
  title: "Kissan Oil Connect",
  version: "0.1.0",
  instructions:
    "Tools for the UCOIN App (used cooking oil collection platform by Kissan Energy India). Read vendors, pickup requests and invoices, create pickup requests, and summarise collection volume. All data access runs as the signed-in user's role and permissions.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listVendors, listPickups, createPickupRequest, listInvoices, collectionSummary],
});
