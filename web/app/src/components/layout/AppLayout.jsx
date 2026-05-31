import React, { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  LayoutDashboard,
  Heart,
  Menu,
  X,
  ChevronRight,
  Moon,
  Sun,
  Home,
  Users,
  Target,
  MessageSquare,
} from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

const navItems = [
  {
    path: "/matching",
    icon: Heart,
    label: "Find a Match",
    desc: "Swipe & discover",
  },
  {
    path: "/dashboard",
    icon: LayoutDashboard,
    label: "My Dashboard",
    desc: "Progress & goals",
  },
  {
    path: "/sessions",
    icon: Target,
    label: "Sessions",
    desc: "Upcoming & past",
  },
  {
    path: "/mentors",
    icon: Users,
    label: "Browse Mentors",
    desc: "Explore profiles",
  },
  {
    path: "/chat",
    icon: MessageSquare,
    label: "Messages",
    desc: "Chat with matches",
  },
];

export default function AppLayout({ children }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const visibleNavItems = navItems.filter((item) => !item.adminOnly || isAdmin);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 border-r border-border bg-card/50 backdrop-blur-sm sticky top-0 h-screen shrink-0">
        {/* Logo */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-sm">
                D
              </span>
            </div>
            <div>
              <p className="font-bold text-sm text-foreground tracking-tight">
                DuoBlySync
              </p>
              <p className="text-[10px] text-muted-foreground">
                Mentorship Platform
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {visibleNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
              >
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium leading-none ${isActive ? "text-primary-foreground" : ""}`}
                    >
                      {item.label}
                    </p>
                    <p
                      className={`text-[10px] mt-0.5 leading-none truncate ${
                        isActive
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                  {isActive && (
                    <ChevronRight className="w-3 h-3 shrink-0 text-primary-foreground/70" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="text-xs">Back to Home</span>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] text-muted-foreground font-mono">
                Backend: Live
              </span>
            </div>
            <button
              onClick={toggle}
              className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">D</span>
          </div>
          <span className="font-bold text-sm text-foreground">DuoBlySync</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-lg hover:bg-secondary"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed top-0 left-0 bottom-0 z-50 w-64 bg-card border-r border-border p-4 space-y-1 pt-16"
            >
              {visibleNavItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                  >
                    <div
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 min-w-0 md:overflow-auto pt-14 md:pt-0">
        {children}
      </main>
    </div>
  );
}
