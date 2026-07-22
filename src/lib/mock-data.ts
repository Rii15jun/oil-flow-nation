export type Role =
  | "super_admin"
  | "state_manager"
  | "executive"
  | "driver"
  | "vendor";

export const ROLES: { value: Role; label: string; description: string }[] = [
  { value: "super_admin", label: "Super Admin", description: "Nationwide control, KYC approvals, reports" },
  { value: "state_manager", label: "State Manager", description: "Manage your assigned state and teams" },
  { value: "executive", label: "Collection Executive", description: "Onboard vendors, run pickups in the field" },
  { value: "driver", label: "Driver", description: "View trips, navigate, capture proofs" },
  { value: "vendor", label: "Restaurant / Vendor", description: "Request pickups, view history & receipts" },
];

export const STATES = [
  "Maharashtra", "Karnataka", "Tamil Nadu", "Delhi", "Gujarat",
  "Uttar Pradesh", "Telangana", "West Bengal", "Rajasthan", "Kerala",
];

export const vendors = Array.from({ length: 24 }).map((_, i) => ({
  id: `VND-${(1000 + i).toString()}`,
  name: [
    "Spice Garden", "Royal Tandoor", "Coastal Curry", "Punjab Grill",
    "Green Leaf Cafe", "Marina Biryani", "Chettinad House", "The Copper Pot",
    "Sri Krishna Sweets", "Blue Elephant", "Oh! Calcutta", "Saravana Bhavan",
  ][i % 12] + ` ${i + 1}`,
  owner: ["Rajesh Kumar", "Priya Sharma", "Arun Menon", "Neha Gupta", "Vikas Patel"][i % 5],
  phone: `+91 9${(800000000 + i * 1234).toString().slice(0, 9)}`,
  city: ["Mumbai", "Bengaluru", "Chennai", "Delhi", "Ahmedabad", "Pune", "Hyderabad"][i % 7],
  state: STATES[i % STATES.length],
  monthlyUCO: 80 + ((i * 37) % 400),
  status: (["Active", "KYC Pending", "KYC Approved", "Inactive", "Lead"] as const)[i % 5],
  category: (["Restaurant", "Hotel", "Cloud Kitchen", "Sweet Shop", "Caterer"] as const)[i % 5],
  joined: `2025-${((i % 12) + 1).toString().padStart(2, "0")}-${((i % 27) + 1).toString().padStart(2, "0")}`,
}));

export const pickups = Array.from({ length: 18 }).map((_, i) => ({
  id: `PKP-2026-${(125 + i).toString().padStart(6, "0")}`,
  vendor: vendors[i % vendors.length].name,
  city: vendors[i % vendors.length].city,
  date: `2026-07-${((i % 22) + 1).toString().padStart(2, "0")}`,
  drums: 2 + (i % 6),
  qty: 40 + ((i * 17) % 220),
  status: (["Pending", "Assigned", "In Transit", "Completed", "Cancelled"] as const)[i % 5],
  driver: ["Suresh", "Ramesh", "Manoj", "Kiran", "Aslam"][i % 5],
  vehicle: `MH${(12 + (i % 30)).toString()}-AB-${(1000 + i).toString()}`,
  emergency: i % 7 === 0,
}));

export const drivers = Array.from({ length: 10 }).map((_, i) => ({
  id: `DRV-${(200 + i).toString()}`,
  name: ["Suresh", "Ramesh", "Manoj", "Kiran", "Aslam", "Prakash", "Deepak", "Anil", "Rohit", "Sunil"][i],
  phone: `+91 98${(1000000 + i * 7654).toString().slice(0, 8)}`,
  vehicle: `MH${(12 + i).toString()}-AB-${(1000 + i).toString()}`,
  capacity: 500 + (i % 3) * 200,
  city: ["Mumbai", "Pune", "Bengaluru", "Chennai", "Delhi"][i % 5],
  activeTrips: i % 4,
  status: (["On Trip", "Available", "Off Duty"] as const)[i % 3],
}));

export const drums = Array.from({ length: 20 }).map((_, i) => ({
  id: `DRM-${(5000 + i).toString()}`,
  status: (["Filled", "Empty", "Damaged", "In Transit"] as const)[i % 4],
  location: ["Warehouse - Mumbai", "In Vehicle MH12-AB-1002", "Warehouse - Delhi", "Vendor Site"][i % 4],
  updated: `2026-07-${((i % 22) + 1).toString().padStart(2, "0")}`,
}));

export const kycQueue = vendors
  .filter((v) => v.status === "KYC Pending")
  .map((v, i) => ({
    ...v,
    submitted: `2026-07-${((i % 22) + 1).toString().padStart(2, "0")}`,
    docs: ["GST", "PAN", "Aadhaar", "FSSAI", "Cheque"],
  }));

export const monthlyCollection = [
  { month: "Feb", kg: 42000 },
  { month: "Mar", kg: 51000 },
  { month: "Apr", kg: 48000 },
  { month: "May", kg: 62000 },
  { month: "Jun", kg: 71000 },
  { month: "Jul", kg: 83000 },
];

export const stateCollection = STATES.slice(0, 6).map((s, i) => ({
  state: s,
  kg: 12000 + ((i * 4231) % 25000),
}));

export const dailyCollection = Array.from({ length: 14 }).map((_, i) => ({
  day: `${i + 1}`,
  kg: 1800 + ((i * 421) % 1600),
}));
