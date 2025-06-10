import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { href: string; children: React.ReactNode };

export function NavLink({ href, children }: Props) {
  const path = usePathname();
  const active = path === href;
  return (
    <Link href={href} className={`px-3 py-2 rounded ${active ? "bg-blue-100 text-blue-600" : ""}`}>
      {children}
    </Link>
  );
}
