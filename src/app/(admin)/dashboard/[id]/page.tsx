'use client'

import { DashboardHeader } from '@/components/dashboard/DashboardHeader'

import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Package,
  PackageCheck,
  Plus,
  ReceiptText,
  ShoppingBag,
  Truck,
  WalletCards,
} from 'lucide-react'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { useOrders } from '@/data/orders'
import type { OrderStatus } from '@/hooks/orders'

const statusConfig: Record<
  OrderStatus,
  {
    label: string
    className: string
  }
> = {
  received: {
    label: 'Recebido',
    className: 'border-blue-100 bg-blue-50 text-blue-700',
  },

  payment_confirmed: {
    label: 'Pagamento confirmado',
    className: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  },

  processing: {
    label: 'Em preparação',
    className: 'border-amber-100 bg-amber-50 text-amber-700',
  },

  shipped: {
    label: 'Enviado',
    className: 'border-violet-100 bg-violet-50 text-violet-700',
  },

  delivered: {
    label: 'Entregue',
    className: 'border-green-100 bg-green-50 text-green-700',
  },

  cancelled: {
    label: 'Cancelado',
    className: 'border-red-100 bg-red-50 text-red-700',
  },
}

function formatMoney(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

function getPaymentLabel(status: 'pending' | 'paid' | 'failed' | 'refunded') {
  switch (status) {
    case 'paid':
      return 'Pago'

    case 'failed':
      return 'Falhou'

    case 'refunded':
      return 'Reembolsado'

    default:
      return 'Pendente'
  }
}

export default function DashboardPage() {
  const params = useParams<{
    id: string
  }>()

  const id = params.id

  const { data: orders = [], isLoading, isError } = useOrders()

  /*
  |--------------------------------------------------------------------------
  | INDICADORES
  |--------------------------------------------------------------------------
  */

  const totalOrders = orders.length

  const paidOrders = orders.filter(
    (order) => order.payment.status === 'paid' && order.status !== 'cancelled',
  )

  const totalSales = paidOrders.reduce((acc, order) => acc + order.total, 0)

  const averageTicket =
    paidOrders.length > 0 ? totalSales / paidOrders.length : 0

  const awaitingPayment = orders.filter(
    (order) =>
      order.payment.status === 'pending' && order.status !== 'cancelled',
  ).length

  const processingOrders = orders.filter(
    (order) => order.status === 'processing',
  ).length

  const shippedOrders = orders.filter(
    (order) => order.status === 'shipped',
  ).length

  /*
  |--------------------------------------------------------------------------
  | PEDIDOS QUE PRECISAM DE ATENÇÃO
  |--------------------------------------------------------------------------
  */

  const attentionOrders = orders.filter(
    (order) =>
      order.status === 'received' || order.status === 'payment_confirmed',
  )

  /*
  |--------------------------------------------------------------------------
  | PEDIDOS RECENTES
  |--------------------------------------------------------------------------
  */

  const recentOrders = orders.slice(0, 8)

  return (
    <main className="min-h-screen bg-[#F7F5F0] px-4 py-6 sm:px-6 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <DashboardHeader />

        {/* ====================================================== */}
        {/* CABEÇALHO */}
        {/* ====================================================== */}

        <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A18135]">
              Administração
            </p>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
              Visão geral
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
              Acompanhe vendas, pedidos e operações da UZZE AURA em um único
              lugar.
            </p>
          </div>

          <Link
            href={`/dashboard/${id}/products/new`}
            className="
              inline-flex h-11 items-center justify-center gap-2
              rounded-xl bg-neutral-950 px-5
              text-xs font-medium uppercase tracking-[0.12em]
              text-white transition
              hover:bg-[#A18135]
            "
          >
            <Plus size={16} />
            Novo produto
          </Link>
        </section>

        {/* ====================================================== */}
        {/* INDICADORES PRINCIPAIS */}
        {/* ====================================================== */}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            icon={<CircleDollarSign size={19} />}
            label="Faturamento"
            value={formatMoney(totalSales)}
            description="Somente pagamentos confirmados"
          />

          <DashboardCard
            icon={<ShoppingBag size={19} />}
            label="Pedidos"
            value={String(totalOrders)}
            description="Total de pedidos registrados"
          />

          <DashboardCard
            icon={<ReceiptText size={19} />}
            label="Ticket médio"
            value={formatMoney(averageTicket)}
            description="Média dos pedidos pagos"
          />

          <DashboardCard
            icon={<WalletCards size={19} />}
            label="Aguardando pagamento"
            value={String(awaitingPayment)}
            description="Pedidos ainda não pagos"
          />
        </section>

        {/* ====================================================== */}
        {/* OPERAÇÃO */}
        {/* ====================================================== */}

        <section className="grid gap-4 md:grid-cols-3">
          <OperationCard
            icon={<Package size={19} />}
            label="Em preparação"
            value={processingOrders}
            description="Pedidos sendo preparados"
          />

          <OperationCard
            icon={<Truck size={19} />}
            label="Enviados"
            value={shippedOrders}
            description="Pedidos a caminho"
          />

          <OperationCard
            icon={<Clock3 size={19} />}
            label="Precisam de atenção"
            value={attentionOrders.length}
            description="Pedidos novos ou aguardando ação"
          />
        </section>

        {/* ====================================================== */}
        {/* PEDIDOS QUE PRECISAM DE ATENÇÃO */}
        {/* ====================================================== */}

        {!isLoading && !isError && attentionOrders.length > 0 && (
          <section className="overflow-hidden rounded-2xl border border-[#D6B85A]/30 bg-white">
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-5 sm:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <Clock3 size={16} className="text-[#A18135]" />

                  <h2 className="font-semibold text-neutral-950">
                    Pedidos que precisam de atenção
                  </h2>
                </div>

                <p className="mt-1 text-xs text-neutral-500">
                  Pedidos novos ou aguardando andamento.
                </p>
              </div>

              <span className="rounded-full bg-[#F7F5F0] px-3 py-1 text-xs font-semibold text-[#A18135]">
                {attentionOrders.length}
              </span>
            </div>

            <div className="grid divide-y divide-neutral-100 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
              {attentionOrders.slice(0, 4).map((order) => {
                const status = statusConfig[order.status]

                return (
                  <Link
                    key={order._id}
                    href={`/dashboard/${id}/orders/${order._id}`}
                    className="
                          group flex items-center justify-between
                          gap-4 p-5 transition
                          hover:bg-[#FAF9F7]
                          sm:p-6
                        "
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs font-semibold text-neutral-950">
                          {order.orderNumber}
                        </p>

                        <span
                          className={`
                                inline-flex rounded-full border
                                px-2 py-0.5
                                text-[9px] font-semibold
                                ${status.className}
                              `}
                        >
                          {status.label}
                        </span>
                      </div>

                      <p className="mt-2 truncate text-sm font-medium text-neutral-700">
                        {order.customer.name}
                      </p>

                      <p className="mt-1 text-[10px] text-neutral-400">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <strong className="text-sm font-semibold text-neutral-950">
                        {formatMoney(order.total)}
                      </strong>

                      <div
                        className="
                              flex h-9 w-9 items-center
                              justify-center rounded-lg
                              border border-neutral-200
                              text-neutral-400 transition
                              group-hover:border-[#B8963E]
                              group-hover:text-[#A18135]
                            "
                      >
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* ====================================================== */}
        {/* PEDIDOS RECENTES */}
        {/* ====================================================== */}

        <section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-5 sm:px-6">
            <div>
              <h2 className="font-semibold text-neutral-950">
                Pedidos recentes
              </h2>

              <p className="mt-1 text-xs text-neutral-500">
                Acompanhe as últimas compras realizadas.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-[#D6B85A]">
              <PackageCheck size={18} />
            </div>
          </div>

          {/* LOADING */}

          {isLoading && (
            <div className="p-12 text-center">
              <Package
                size={26}
                className="mx-auto animate-pulse text-neutral-400"
              />

              <p className="mt-3 text-sm text-neutral-500">
                Carregando pedidos...
              </p>
            </div>
          )}

          {/* ERRO */}

          {isError && (
            <div className="p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                <Package size={20} className="text-red-500" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-neutral-800">
                Não foi possível carregar os pedidos
              </h3>

              <p className="mt-1 text-xs text-neutral-500">
                Verifique a conexão com o servidor e tente novamente.
              </p>
            </div>
          )}

          {/* VAZIO */}

          {!isLoading && !isError && recentOrders.length === 0 && (
            <div className="p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F7F5F0]">
                <ShoppingBag size={22} className="text-neutral-400" />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-neutral-800">
                Nenhum pedido ainda
              </h3>

              <p className="mt-1 text-xs text-neutral-500">
                Os novos pedidos aparecerão aqui.
              </p>
            </div>
          )}

          {/* ================================================== */}
          {/* DESKTOP */}
          {/* ================================================== */}

          {!isLoading && !isError && recentOrders.length > 0 && (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-100 bg-[#FAF9F7]">
                      <TableHeader>Pedido</TableHeader>

                      <TableHeader>Cliente</TableHeader>

                      <TableHeader>Data</TableHeader>

                      <TableHeader>Total</TableHeader>

                      <TableHeader>Pagamento</TableHeader>

                      <TableHeader>Status</TableHeader>

                      <TableHeader>
                        <span className="sr-only">Ações</span>
                      </TableHeader>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.map((order) => {
                      const status = statusConfig[order.status]

                      return (
                        <tr
                          key={order._id}
                          className="
                                border-b border-neutral-100
                                transition last:border-0
                                hover:bg-[#FAF9F7]
                              "
                        >
                          <TableCell>
                            <div>
                              <p className="text-xs font-semibold text-neutral-900">
                                {order.orderNumber}
                              </p>

                              <p className="mt-1 text-[10px] tracking-wide text-neutral-400">
                                {order.trackingCode}
                              </p>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div>
                              <p className="text-sm font-medium text-neutral-800">
                                {order.customer.name}
                              </p>

                              <p className="mt-1 max-w-[180px] truncate text-xs text-neutral-400">
                                {order.customer.email}
                              </p>
                            </div>
                          </TableCell>

                          <TableCell>
                            <span className="whitespace-nowrap text-xs text-neutral-500">
                              {formatDate(order.createdAt)}
                            </span>
                          </TableCell>

                          <TableCell>
                            <strong className="whitespace-nowrap text-sm font-semibold text-neutral-900">
                              {formatMoney(order.total)}
                            </strong>
                          </TableCell>

                          <TableCell>
                            <PaymentBadge status={order.payment.status} />
                          </TableCell>

                          <TableCell>
                            <span
                              className={`
                                    inline-flex whitespace-nowrap
                                    rounded-full border
                                    px-2.5 py-1
                                    text-[10px] font-semibold
                                    ${status.className}
                                  `}
                            >
                              {status.label}
                            </span>
                          </TableCell>

                          <TableCell>
                            <Link
                              href={`/dashboard/${id}/orders/${order._id}`}
                              aria-label={`Visualizar pedido ${order.orderNumber}`}
                              className="
                                    ml-auto flex h-9 w-9
                                    items-center justify-center
                                    rounded-lg border
                                    border-neutral-200
                                    text-neutral-500
                                    transition
                                    hover:border-[#B8963E]
                                    hover:text-[#A18135]
                                  "
                            >
                              <ArrowRight size={15} />
                            </Link>
                          </TableCell>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* ============================================== */}
              {/* MOBILE */}
              {/* ============================================== */}

              <div className="divide-y divide-neutral-100 md:hidden">
                {recentOrders.map((order) => {
                  const status = statusConfig[order.status]

                  return (
                    <Link
                      key={order._id}
                      href={`/dashboard/${id}/orders/${order._id}`}
                      className="block p-5 transition hover:bg-[#FAF9F7]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-neutral-900">
                            {order.orderNumber}
                          </p>

                          <p className="mt-1 truncate text-xs text-neutral-500">
                            {order.customer.name}
                          </p>
                        </div>

                        <span
                          className={`
                                shrink-0 rounded-full
                                border px-2.5 py-1
                                text-[9px] font-semibold
                                ${status.className}
                              `}
                        >
                          {status.label}
                        </span>
                      </div>

                      <div className="mt-4 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-[10px] text-neutral-400">
                            {formatDate(order.createdAt)}
                          </p>

                          <p className="mt-1 text-[10px] text-neutral-400">
                            {order.trackingCode}
                          </p>
                        </div>

                        <div className="text-right">
                          <strong className="text-sm text-neutral-950">
                            {formatMoney(order.total)}
                          </strong>

                          <div className="mt-1">
                            <PaymentBadge status={order.payment.status} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </>
          )}

          {/* RODAPÉ DA TABELA */}

          {!isLoading && !isError && orders.length > 8 && (
            <div className="flex items-center justify-between border-t border-neutral-100 bg-[#FAF9F7] px-5 py-4 sm:px-6">
              <p className="text-[11px] text-neutral-400">
                Mostrando 8 de {orders.length} pedidos
              </p>

              <span className="text-[11px] font-medium text-neutral-500">
                Últimos pedidos
              </span>
            </div>
          )}
        </section>

        {/* ====================================================== */}
        {/* PRODUTOS */}
        {/* ====================================================== */}

        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="font-semibold text-neutral-950">Produtos</h2>

              <p className="mt-1 text-sm text-neutral-500">
                Gerencie o catálogo da UZZE AURA.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href={`/dashboard/${id}/products/new`}
              className="
                group flex items-center gap-4
                rounded-2xl border border-neutral-200
                bg-white p-6 transition
                hover:border-[#B8963E]/50
                hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]
              "
            >
              <div
                className="
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl bg-neutral-950
                  text-[#D6B85A]
                  transition
                  group-hover:bg-[#A18135]
                  group-hover:text-white
                "
              >
                <Plus size={19} />
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold text-neutral-900">
                  Cadastrar produto
                </h3>

                <p className="mt-1 text-sm text-neutral-500">
                  Adicionar um novo produto ao catálogo.
                </p>
              </div>

              <ArrowRight
                size={16}
                className="
                  ml-auto shrink-0 text-neutral-300
                  transition
                  group-hover:translate-x-1
                  group-hover:text-[#A18135]
                "
              />
            </Link>

            <Link
              href={`/dashboard/${id}/products`}
              className="
                group flex items-center gap-4
                rounded-2xl border border-neutral-200
                bg-white p-6 transition
                hover:border-[#B8963E]/50
                hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]
              "
            >
              <div
                className="
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl bg-neutral-950
                  text-[#D6B85A]
                  transition
                  group-hover:bg-[#A18135]
                  group-hover:text-white
                "
              >
                <Boxes size={19} />
              </div>

              <div className="min-w-0">
                <h3 className="font-semibold text-neutral-900">
                  Gerenciar produtos
                </h3>

                <p className="mt-1 text-sm text-neutral-500">
                  Visualizar e editar o catálogo.
                </p>
              </div>

              <ArrowRight
                size={16}
                className="
                  ml-auto shrink-0 text-neutral-300
                  transition
                  group-hover:translate-x-1
                  group-hover:text-[#A18135]
                "
              />
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

/*
|--------------------------------------------------------------------------
| DASHBOARD CARD
|--------------------------------------------------------------------------
*/

function DashboardCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode
  label: string
  value: string
  description: string
}) {
  return (
    <div
      className="
        rounded-2xl border border-neutral-200
        bg-white p-5 transition
        hover:border-[#B8963E]/30
        hover:shadow-[0_8px_25px_rgba(0,0,0,0.035)]
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium text-neutral-500">{label}</p>

          <p className="mt-3 truncate text-xl font-semibold tracking-tight text-neutral-950">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-[#D6B85A]">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-[11px] text-neutral-400">{description}</p>
    </div>
  )
}

/*
|--------------------------------------------------------------------------
| OPERATION CARD
|--------------------------------------------------------------------------
*/

function OperationCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode
  label: string
  value: number
  description: string
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F7F5F0] text-[#A18135]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-neutral-500">{label}</p>

          <strong className="text-lg font-semibold text-neutral-950">
            {value}
          </strong>
        </div>

        <p className="mt-1 text-[11px] text-neutral-400">{description}</p>
      </div>
    </div>
  )
}

/*
|--------------------------------------------------------------------------
| PAYMENT BADGE
|--------------------------------------------------------------------------
*/

function PaymentBadge({
  status,
}: {
  status: 'pending' | 'paid' | 'failed' | 'refunded'
}) {
  if (status === 'paid') {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-emerald-700">
        <CheckCircle2 size={14} />
        Pago
      </span>
    )
  }

  if (status === 'failed') {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-red-600">
        <Clock3 size={14} />

        {getPaymentLabel(status)}
      </span>
    )
  }

  if (status === 'refunded') {
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-violet-600">
        <CircleDollarSign size={14} />

        {getPaymentLabel(status)}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-amber-700">
      <Clock3 size={14} />
      Pendente
    </span>
  )
}

/*
|--------------------------------------------------------------------------
| TABLE
|--------------------------------------------------------------------------
*/

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
      {children}
    </th>
  )
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="px-5 py-4">{children}</td>
}
