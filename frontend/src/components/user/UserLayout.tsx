import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <UserSidebar />
      <div className="flex-1 min-h-screen app-bg">
        <UserNavbar />
        <div className="p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
