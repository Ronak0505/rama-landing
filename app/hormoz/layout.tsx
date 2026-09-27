import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "نبرد هرمز | Battle of Hormuz — RAMA Studio",
  description: "معرفی بازی موبایلی نبرد هرمز — پروژه پرچمدار استودیو رما",
};

export default function HormozLayout({ children }: { children: React.ReactNode }) {
  return children;
}
