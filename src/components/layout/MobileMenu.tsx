"use client";

import Link from "next/link";
import { X } from "lucide-react";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const menuItems = [
  {
    name: "Início",
    href: "/",
  },
  {
    name: "Novidades",
    href: "/novidades",
  },
  {
    name: "Vestidos",
    href: "/vestidos",
  },
  {
    name: "Conjuntos",
    href: "/conjuntos",
  },
  {
    name: "Coleções",
    href: "/colecoes",
  },
  {
    name: "Promoções",
    href: "/promocoes",
  },
  {
    name: "Contato",
    href: "/contato",
  },
];

export function MobileMenu({
  open,
  onClose,
}: MobileMenuProps) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${open
            ? "visible opacity-100"
            : "invisible opacity-0"
          }`}
      />

      {/* Menu lateral */}
      <aside
        className={`fixed left-0 top-0 z-[70] flex h-full w-[85%] max-w-sm flex-col bg-[#F8F6F2] p-6 shadow-2xl transition-transform duration-500 ease-in-out lg:hidden ${open
            ? "translate-x-0"
            : "-translate-x-full"
          }`}
      >
        {/* Cabeçalho menu */}
        <div className="mb-10 flex items-center justify-between">
          <span className="text-xl font-light tracking-[0.35em] text-neutral-900">
            UzzeAura
          </span>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-black/5"
            aria-label="Fechar menu"
          >
            <X size={26} />
          </button>
        </div>

        {/* Navegação */}
        <nav className="flex flex-col gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="
                text-sm
                uppercase
                tracking-[0.2em]
                text-neutral-700
                transition
                hover:text-black
              "
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Rodapé do menu */}
        <div className="mt-auto border-t border-neutral-200 pt-6">
          <p className="text-xs uppercase tracking-widest text-neutral-500">
            Atendimento
          </p>

          <p className="mt-2 text-sm text-neutral-700">
            WhatsApp: (00) 00000-0000
          </p>
        </div>
      </aside>
    </>
  );
}