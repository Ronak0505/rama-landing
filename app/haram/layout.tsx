import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "بین‌الحرمین | بازسازی سه‌بعدی — RAMA Studio",
  description: "پروژه بازسازی سه‌بعدی حرم مطهر امام حسین (ع) — استودیو رما",
};

export default function HaramLayout({ children }: { children: React.ReactNode }) {
  return children;
}
