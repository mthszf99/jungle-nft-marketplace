import { Outlet } from "@tanstack/react-router";

import { Header } from "./Header";
import { MobileNavigation } from "./MobileNavigation";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-kurio-background text-kurio-text">
      <Header />

      <div className="pb-20 md:pb-0">
        <Outlet />
      </div>

      <MobileNavigation />
    </div>
  );
}
