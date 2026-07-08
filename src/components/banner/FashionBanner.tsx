"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


const mobileImages = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=90",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=90",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=90",
];


const leftImages = [
  "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=900&q=80",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900&q=80",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=900&q=80",
];


const rightImages = [
  "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=900&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80",
];


const mainImage =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=90";



export function FashionBanner() {

  const router = useRouter()

  const [mobileIndex, setMobileIndex] = useState(0);

  const [leftIndex, setLeftIndex] = useState(0);

  const [rightIndex, setRightIndex] = useState(0);



  useEffect(() => {
    const timer = setInterval(() => {
      setMobileIndex(prev =>
        prev === mobileImages.length - 1 ? 0 : prev + 1
      );
      setLeftIndex(prev =>
        prev === leftImages.length - 1 ? 0 : prev + 1
      );
      setRightIndex(prev =>
        prev === rightImages.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (

    <section className="w-full h-screen overflow-hidden bg-black">


      {/* ================= MOBILE ================= */}

      <div className="
block
lg:hidden
relative
w-full
h-full
">


        <Image

          src={mobileImages[mobileIndex]}

          alt="Coleção"

          fill

          priority

          className="
object-cover
transition-opacity
duration-700
"

        />



        <div className="
absolute
inset-0
bg-gradient-to-b
from-black/40
via-black/50
to-black/80
"
        />



        <div className="
absolute
inset-0
flex
items-center
justify-center
px-6
"
        >


          <div className="
text-center
text-white
"
          >


            <h1 className="
font-[var(--font-playfair)]
text-4xl
font-semibold
tracking-wide
drop-shadow-xl
">

              Nova Coleção

            </h1>



            <p className="
mt-5
text-sm
uppercase
tracking-[0.3em]
text-white/90
">

              Elegância que transforma

            </p>



            <button onClick={() => router.push("/catalog")} className="
mt-8
border
border-white
px-9
py-3
text-xs
uppercase
tracking-widest
hover:bg-white
hover:text-black
transition
">
              Ver coleção
            </button>
          </div>
        </div>


        {/* Indicadores */}

        <div className="
absolute
bottom-8
left-0
right-0
flex
justify-center
gap-2
">
          {mobileImages.map((_, index) => (
            <span
              key={index}
              className={`
h-1.5
rounded-full
transition-all
${mobileIndex === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50"
                }
`}
            />
          ))}
        </div>
      </div>

      {/* ================= DESKTOP ================= */}

      <div className="
hidden
lg:grid
grid-cols-12
h-full
">
        <div className="
col-span-3
relative
">
          <Image
            src={leftImages[leftIndex]}
            alt="Coleção"
            fill
            className="object-cover"
          />
          <div className="
absolute
inset-0
bg-black/40
"/>
        </div>
        <div className="
col-span-6
relative
flex
items-center
justify-center
">
          <Image
            src={mainImage}
            alt="Nova coleção"
            fill
            priority
            className="
object-cover
"
          />
          <div className="
absolute
inset-0
bg-gradient-to-b
from-black/30
via-black/50
to-black/80
"/>
          <div className="
relative
z-10
text-center
px-6
text-white
">
            <h1 className="
font-[var(--font-playfair)]
text-6xl
font-semibold
tracking-wide
">
              Nova Coleção
            </h1>
            <p className="
mt-5
uppercase
tracking-[0.35em]
">
              Elegância que transforma
            </p>
            <button onClick={() => router.push("/catalog")} className="
mt-10
px-10
py-3
border
border-white
uppercase
tracking-widest
text-sm
hover:bg-white
hover:text-black
transition
">
              Ver coleção
            </button>
          </div>
        </div>
        <div className="
col-span-3
relative
">
          <Image
            src={rightImages[rightIndex]}
            alt="Moda"
            fill
            className="object-cover"
          />
          <div className="
absolute
inset-0
bg-black/40
"/>

        </div>
      </div>
    </section>
  );
}