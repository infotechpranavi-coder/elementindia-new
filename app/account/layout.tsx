import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account | Elemen India",
  description: "Sign in or create your Elemen India customer account.",
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
