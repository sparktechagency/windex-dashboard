"use client";

import Logo from "@/assets/logos/Logo";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({ children }) {
  const pathName = usePathname();

  return (
    <main className="flex-center h-screen w-full bg-gradient-to-b from-[#7D19F0] via-[#A06CF2] to-[#E6EAF9]">
      {/* gradient-to-br from-[#e8eaeb] to-[#907a69]/30 */}
      <div className="mx-auto lg:w-1/3 2xl:w-[28%]">
        <Link href="/admin/dashboard" className="mx-auto mb-3 block w-max">
          <Logo size={180} />
        </Link>

        <div className="border-gradient-to-b w-full rounded-xl border bg-white from-[#7D19F0] via-[#A06CF2] to-[#E6EAF9]">
          {children}
        </div>

        {!pathName?.includes("login") && (
          <Link
            href="/login"
            className="flex-center-start group mt-5 gap-x-2 text-sm text-foundation-brown-darker hover:text-primary"
          >
            <ArrowLeft
              size={17}
              className="transition-all duration-300 ease-in-out group-hover:-translate-x-1"
            />{" "}
            Back to login
          </Link>
        )}
      </div>
    </main>
  );
}
