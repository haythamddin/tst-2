import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { WorkflowBreadcrumb } from "./WorkflowBreadcrumb";
import { 
  LayoutDashboard, 
  FileText, 
  History, 
  Settings, 
  HelpCircle,
  Bell,
  Image as ImageIcon,
  ScanEye,
  Upload as UploadIcon
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

export default function Layout({ children, showNav = true }: LayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Processing", path: "/processing", icon: FileText },
    { name: "Visual Intelligence", path: "/visual-intelligence", icon: ScanEye },
    { name: "Asset Manager", path: "/asset-manager", icon: ImageIcon },
    { name: "Export", path: "/export", icon: UploadIcon },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
      {/* Workflow Breadcrumb */}
      {showNav && <WorkflowBreadcrumb />}

      {/* Top Navigation */}
      {showNav && (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/">
                <span className="flex items-center gap-2 font-heading font-bold text-xl text-primary cursor-pointer">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white">
                    ID
                  </div>
                  Insight DXP
                </span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = item.path === "/" 
                    ? location === "/" 
                    : location === item.path || location.startsWith(item.path + "/");
                  return (
                    <Link key={item.path} href={item.path}>
                      <span className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer",
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}>
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <HelpCircle className="h-5 w-5" />
              </button>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs border border-primary/20">
                JD
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 container py-8 animate-in fade-in duration-500">
        {children}
      </main>
    </div>
  );
}
