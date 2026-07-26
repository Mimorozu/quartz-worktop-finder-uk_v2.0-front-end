import { verifySession } from "@/lib/dal";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await verifySession();

  return (
    <div className="min-h-screen bg-slate-dark text-white">
      <AdminNav />
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-10">{children}</div>
    </div>
  );
}
