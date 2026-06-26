import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 min-h-screen app-bg">
        <AdminNavbar />
        <div className="p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
