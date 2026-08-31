import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/adminAuth";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");
  if (!isAdminEmail(user.email)) redirect("/");

  return <AdminShell userEmail={user.email!}>{children}</AdminShell>;
}
