"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, FileText, Home, LayoutDashboard, MessageSquare, Settings, Users } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Negotiations",
    icon: MessageSquare,
    href: "/dashboard/negotiations",
  },
  {
    title: "Reports",
    icon: FileText,
    href: "/dashboard/reports",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    title: "Users",
    icon: Users,
    href: "/dashboard/users",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="h-full flex flex-col">
        <div className="h-14 border-b flex items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-5 w-5 text-blue-600" />
            <span className="font-semibold">BPC</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                pathname === item.href ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <div className="bg-blue-50 p-3 rounded-md">
            <p className="text-sm font-medium text-blue-700">Need Help?</p>
            <p className="text-xs text-blue-600 mt-1">Contact system administrator for assistance</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
