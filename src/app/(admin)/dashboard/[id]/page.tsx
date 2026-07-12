import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { Plus } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function DashboardPage({ params }: Props) {
  const { id } = await params

  return (
    <main
      className="
        min-h-screen
        bg-neutral-50
        p-6
        md:p-10
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          space-y-6
        "
      >
        <DashboardHeader />

        <section
          className="
            flex
            flex-wrap
            gap-4
            rounded-2xl
            bg-white
            p-6
            shadow-sm
          "
        >
          <Link
            href={`/dashboard/${id}/products/new`}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-black
              px-5
              py-3
              text-sm
              font-medium
              text-white
            "
          >
            <Plus size={18} />
            Cadastrar Produto
          </Link>
        </section>
      </div>
    </main>
  )
}
