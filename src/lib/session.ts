import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Role } from "./mock-data";

export type AuthUser = {
  id: string;
  email: string | null;
  name: string;
  phone: string | null;
  role: Role;
};

async function loadUser(userId: string, email: string | null): Promise<AuthUser | null> {
  const [{ data: profile }, { data: roles }] = await Promise.all([
    supabase.from("profiles").select("full_name, phone").eq("id", userId).maybeSingle(),
    supabase.from("user_roles").select("role").eq("user_id", userId),
  ]);

  // Priority order for picking primary role
  const priority: Role[] = ["super_admin", "manager", "accounts", "executive", "driver", "vendor"];
  const owned = (roles ?? []).map((r) => r.role as Role);
  const role: Role = priority.find((r) => owned.includes(r)) ?? "vendor";

  return {
    id: userId,
    email,
    name: profile?.full_name ?? email ?? "User",
    phone: profile?.phone ?? null,
    role,
  };
}

export function useAuthSession() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (!session?.user) {
        setUser(null);
        setLoading(false);
        return;
      }
      // Defer to avoid deadlock with supabase client
      setTimeout(() => {
        loadUser(session.user.id, session.user.email ?? null).then((u) => {
          if (mounted) {
            setUser(u);
            setLoading(false);
          }
        });
      }, 0);
    });

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (!data.session?.user) {
        setLoading(false);
        return;
      }
      loadUser(data.session.user.id, data.session.user.email ?? null).then((u) => {
        if (mounted) {
          setUser(u);
          setLoading(false);
        }
      });
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}

export async function signOut() {
  await supabase.auth.signOut();
}
