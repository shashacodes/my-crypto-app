"use client";
import Link from "next/link";
import { Home, ShoppingCart, DollarSign } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const path = usePathname();
  const links = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/buy", icon: DollarSign, label: "Buy BTC" },
    { href: "/sell", icon: ShoppingCart, label: "Sell BTC" },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white my-1 border-t shadow px-4 p-6 flex justify-around ">
      {links.map((lk) => {
        const Icon = lk.icon;
        const active = path === lk.href;
        return (
          <Link key={lk.href} href={lk.href} className="flex flex-col items-center text-xs">
            <Icon className={`h-6 w-6 ${active ? "text-blue-600" : "text-gray-500"}`} />
            <span className={`${active ? "text-blue-600" : "text-gray-500"}`}>
              {lk.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
