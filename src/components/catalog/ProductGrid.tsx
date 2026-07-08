import { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";


interface Props {
  products: Product[];
}


export function ProductGrid({ products }: Props) {

  return (

    <div
      className="
        grid

        grid-cols-2

        gap-x-4
        gap-y-10

        sm:gap-x-6
        sm:gap-y-12

        md:grid-cols-3

        lg:grid-cols-4

        lg:gap-x-6
        lg:gap-y-14
      "
    >

      {products.map((product) => (

        <ProductCard
          key={product._id}
          product={product}
        />

      ))}

    </div>

  );

}