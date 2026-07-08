"use client";

import { useEffect, useState } from "react";

export function CollectionDivider() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 150);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div
      className="
        mt-10
        md:mt-12

        flex
        items-center
        justify-center

        gap-4
        md:gap-6
      "
    >


      {/* Linha esquerda */}

      <div
        className={`
          relative

          h-px

          w-20
          sm:w-28
          md:w-44

          bg-gradient-to-r
          from-transparent
          via-[#C8A951]
          to-[#F6E27A]

          shadow-[0_0_14px_rgba(212,175,55,0.8)]

          transition-all
          duration-1000
          ease-out

          ${
            loaded
              ? "scale-x-100 opacity-100"
              : "scale-x-0 opacity-0"
          }

          origin-right
        `}
      />



      {/* Estrela */}

      <span
        className={`
          text-3xl
          md:text-4xl

          text-[#D4AF37]

          drop-shadow-[0_0_18px_rgba(212,175,55,0.9)]

          transition-all
          duration-1000
          ease-out

          ${
            loaded
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-0 rotate-180"
          }

          animate-pulse
        `}
      >
        ✦
      </span>



      {/* Linha direita */}

      <div
        className={`
          relative

          h-px

          w-20
          sm:w-28
          md:w-44

          bg-gradient-to-l
          from-transparent
          via-[#C8A951]
          to-[#F6E27A]

          shadow-[0_0_14px_rgba(212,175,55,0.8)]

          transition-all
          duration-1000
          ease-out

          ${
            loaded
              ? "scale-x-100 opacity-100"
              : "scale-x-0 opacity-0"
          }

          origin-left
        `}
      />


    </div>
  );
}