"use client";

import { useState } from "react";

import { Header } from "@/components/layout/Header";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { FashionBanner } from "@/components/banner/FashionBanner";
import { PremiereProducts } from "@/components/home/PremiereProducts";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      <Header
        onOpenMenu={() => setMenuOpen(true)}
      />

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <section className="flex min-h-screen items-center justify-center">
        <FashionBanner />
      </section>

      <section>
        <PremiereProducts/>
      </section>

      <section>
        <Footer />
      </section>
    </main>
  );
}