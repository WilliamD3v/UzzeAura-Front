import { ProductsManager } from '@/components/dashboard/products/ProductsManager'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function ProductsPage({ params }: Props) {
  const { id } = await params

  return <ProductsManager dashboardId={id} />
}
