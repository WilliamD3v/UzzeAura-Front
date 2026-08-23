'use client'

import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { useOrder, useUpdateOrderStatus } from '@/data/orders'
import type { OrderStatus, PaymentStatus } from '@/hooks/orders'

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  CreditCard,
  Loader2,
  Mail,
  MapPin,
  Package,
  PackageCheck,
  Phone,
  ReceiptText,
  Save,
  Truck,
  User,
  XCircle,
} from 'lucide-react'

import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

/*
|--------------------------------------------------------------------------
| STATUS
|--------------------------------------------------------------------------
*/

const statusConfig: Record<
  OrderStatus,
  {
    label: string
    description: string
    className: string
  }
> = {
  received: {
    label: 'Pedido recebido',
    description: 'Pedido recebido pela loja.',
    className: 'border-blue-200 bg-blue-50 text-blue-700',
  },

  payment_confirmed: {
    label: 'Pagamento confirmado',
    description: 'Pagamento confirmado.',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },

  processing: {
    label: 'Em preparação',
    description: 'Pedido sendo preparado para envio.',
    className: 'border-amber-200 bg-amber-50 text-amber-700',
  },

  shipped: {
    label: 'Enviado',
    description: 'Pedido entregue à transportadora.',
    className: 'border-violet-200 bg-violet-50 text-violet-700',
  },

  delivered: {
    label: 'Entregue',
    description: 'Pedido entregue ao cliente.',
    className: 'border-green-200 bg-green-50 text-green-700',
  },

  cancelled: {
    label: 'Cancelado',
    description: 'Pedido cancelado.',
    className: 'border-red-200 bg-red-50 text-red-700',
  },
}

const orderStatusOptions: OrderStatus[] = [
  'received',
  'payment_confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
]

/*
|--------------------------------------------------------------------------
| FORMATADORES
|--------------------------------------------------------------------------
*/

function formatMoney(value: number) {
  return Number(value || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function formatDate(date: string) {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return '-'
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parsedDate)
}

function getPaymentMethodLabel(method: 'pix' | 'credit_card') {
  if (method === 'pix') {
    return 'PIX'
  }

  return 'Cartão de crédito'
}

function getPaymentStatusLabel(status: PaymentStatus) {
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

/*
|--------------------------------------------------------------------------
| ERRO AXIOS
|--------------------------------------------------------------------------
*/

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message

    if (typeof message === 'string') {
      return message
    }

    if (error.response?.status === 404) {
      return 'Pedido não encontrado no banco de dados.'
    }

    if (error.response?.status === 400) {
      return 'O ID do pedido enviado é inválido.'
    }

    if (!error.response) {
      return 'Não foi possível conectar ao servidor.'
    }

    return `Erro ${error.response.status} ao buscar o pedido.`
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Erro desconhecido ao buscar o pedido.'
}

/*
|--------------------------------------------------------------------------
| PAGE
|--------------------------------------------------------------------------
*/

export default function OrderPage() {
  const params = useParams()

  const dashboardId = typeof params.id === 'string' ? params.id : ''

  const orderId = typeof params.orderId === 'string' ? params.orderId : ''

  /*
  |--------------------------------------------------------------------------
  | QUERY
  |--------------------------------------------------------------------------
  */

  const {
    data: order,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useOrder(orderId)

  const updateStatus = useUpdateOrderStatus(orderId)

  /*
  |--------------------------------------------------------------------------
  | ESTADOS
  |--------------------------------------------------------------------------
  */

  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(null)

  const [shippingTrackingCode, setShippingTrackingCode] = useState('')

  const [copied, setCopied] = useState(false)

  /*
  |--------------------------------------------------------------------------
  | PARAMETRO INVÁLIDO
  |--------------------------------------------------------------------------
  */

  if (!orderId) {
    return (
      <main className="min-h-screen bg-[#F7F5F0] p-6 md:p-10">
        <div className="mx-auto max-w-7xl">
          <DashboardHeader />

          <div className="mt-8 rounded-2xl border border-red-100 bg-white p-10 text-center">
            <XCircle size={30} className="mx-auto text-red-500" />

            <h1 className="mt-5 text-lg font-semibold text-neutral-900">
              ID do pedido não encontrado
            </h1>

            <p className="mt-2 text-sm text-neutral-500">
              A URL não contém o ID do pedido.
            </p>
          </div>
        </div>
      </main>
    )
  }

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F7F5F0]">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <Loader2
              size={30}
              className="mx-auto animate-spin text-[#A18135]"
            />

            <p className="mt-4 text-sm text-neutral-500">
              Carregando pedido...
            </p>

            <p className="mt-2 text-xs text-neutral-400">ID: {orderId}</p>
          </div>
        </div>
      </main>
    )
  }

  /*
  |--------------------------------------------------------------------------
  | ERRO
  |--------------------------------------------------------------------------
  */

  if (isError || !order) {
    const message = getErrorMessage(error)

    return (
      <main className="min-h-screen bg-[#F7F5F0] p-6 md:p-10">
        <div className="mx-auto max-w-7xl">
          <DashboardHeader />

          <div className="mt-8 rounded-2xl border border-red-100 bg-white p-8 text-center md:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
              <XCircle size={25} />
            </div>

            <h1 className="mt-5 text-xl font-semibold text-neutral-950">
              Não foi possível carregar o pedido
            </h1>

            <p className="mx-auto mt-2 max-w-lg text-sm text-red-600">
              {message}
            </p>

            <div className="mx-auto mt-5 max-w-md rounded-xl bg-neutral-50 p-4 text-left">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                ID enviado para API
              </p>

              <p className="mt-1 break-all font-mono text-xs text-neutral-700">
                {orderId}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => refetch()}
                disabled={isFetching}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-neutral-950 px-5 text-xs font-medium text-white"
              >
                {isFetching && <Loader2 size={14} className="animate-spin" />}
                Tentar novamente
              </button>

              <Link
                href={`/dashboard/${dashboardId}`}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 text-xs font-medium text-neutral-700"
              >
                <ArrowLeft size={14} />
                Voltar
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  /*
  |--------------------------------------------------------------------------
  | DAQUI PARA BAIXO ORDER EXISTE
  |--------------------------------------------------------------------------
  */

  const currentStatus: OrderStatus = selectedStatus ?? order.status

  const trackingCode = order.trackingCode

  /*
  |--------------------------------------------------------------------------
  | UPDATE
  |--------------------------------------------------------------------------
  */

  async function handleUpdateStatus() {
    try {
      await updateStatus.mutateAsync({
        status: currentStatus,

        ...(shippingTrackingCode.trim()
          ? {
              shippingTrackingCode: shippingTrackingCode.trim().toUpperCase(),
            }
          : {}),
      })

      setSelectedStatus(null)

      setShippingTrackingCode('')
    } catch (updateError) {
      console.error('Erro ao atualizar pedido:', updateError)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | COPY
  |--------------------------------------------------------------------------
  */

  async function copyTrackingCode() {
    try {
      await navigator.clipboard.writeText(trackingCode)

      setCopied(true)

      window.setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (copyError) {
      console.error('Erro ao copiar:', copyError)
    }
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen bg-[#F7F5F0] px-4 py-6 sm:px-6 md:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <DashboardHeader />

        {/* VOLTAR */}

        <Link
          href={`/dashboard/${dashboardId}`}
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 transition hover:text-neutral-950"
        >
          <ArrowLeft size={15} />
          Voltar ao dashboard
        </Link>

        {/* HEADER */}

        <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#A18135]">
                Pedido
              </p>

              <StatusBadge status={order.status} />
            </div>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
              {order.orderNumber}
            </h1>

            <p className="mt-2 text-sm text-neutral-500">
              Realizado em {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white px-5 py-3">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-neutral-400">
              Total
            </p>

            <p className="mt-1 text-xl font-semibold text-neutral-950">
              {formatMoney(order.total)}
            </p>
          </div>
        </section>

        {/* TRACKING CODE */}

        <section className="overflow-hidden rounded-2xl bg-neutral-950 text-white">
          <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <div className="flex items-center gap-2 text-[#D6B85A]">
                <Package size={18} />

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Código de acompanhamento
                </p>
              </div>

              <h2 className="mt-4 break-all text-xl font-semibold tracking-[0.08em] sm:text-2xl">
                {trackingCode}
              </h2>

              <p className="mt-2 text-xs text-neutral-400">
                Código exclusivo para o cliente acompanhar este pedido.
              </p>
            </div>

            <button
              type="button"
              onClick={copyTrackingCode}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 text-xs transition hover:bg-white/10"
            >
              {copied ? (
                <>
                  <Check size={15} />
                  Copiado
                </>
              ) : (
                <>
                  <Copy size={15} />
                  Copiar
                </>
              )}
            </button>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
          {/* ==================================================== */}
          {/* ESQUERDA */}
          {/* ==================================================== */}

          <div className="space-y-6">
            {/* PRODUTOS */}

            <Section title="Itens do pedido" icon={<PackageCheck size={17} />}>
              <div className="divide-y divide-neutral-100">
                {order.items.map((item, index) => (
                  <div
                    key={`${item.productId}-${item.size}-${item.color}-${index}`}
                    className="flex gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-neutral-300">
                          <Package size={22} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col justify-between gap-3 sm:flex-row">
                        <div>
                          <h3 className="text-sm font-semibold text-neutral-900">
                            {item.name}
                          </h3>

                          <div className="mt-2 flex flex-wrap gap-2">
                            <ProductAttribute>
                              Tamanho {item.size}
                            </ProductAttribute>

                            <ProductAttribute>
                              <span
                                className="h-2.5 w-2.5 rounded-full border"
                                style={{
                                  backgroundColor: item.colorHex || '#ddd',
                                }}
                              />

                              {item.color}
                            </ProductAttribute>
                          </div>
                        </div>

                        <div className="sm:text-right">
                          <p className="text-sm font-semibold">
                            {formatMoney(item.totalPrice)}
                          </p>

                          <p className="mt-1 text-[10px] text-neutral-400">
                            {item.quantity} x {formatMoney(item.unitPrice)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* CLIENTE */}

            <Section title="Cliente" icon={<User size={17} />}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Information label="Nome" value={order.customer.name} />

                <Information label="CPF" value={order.customer.cpf} />

                <Information
                  label="E-mail"
                  value={order.customer.email}
                  icon={<Mail size={14} />}
                />

                <Information
                  label="Telefone"
                  value={order.customer.phone}
                  icon={<Phone size={14} />}
                />
              </div>
            </Section>

            {/* ENDEREÇO */}

            <Section title="Endereço de entrega" icon={<MapPin size={17} />}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Information label="CEP" value={order.address.cep} />

                <Information
                  label="Cidade / Estado"
                  value={`${order.address.city} - ${order.address.state}`}
                />

                <Information
                  label="Endereço"
                  value={`${order.address.street}, ${order.address.number}`}
                />

                <Information
                  label="Bairro"
                  value={order.address.neighborhood}
                />

                {order.address.complement && (
                  <Information
                    label="Complemento"
                    value={order.address.complement}
                  />
                )}
              </div>
            </Section>

            {/* HISTÓRICO */}

            <Section title="Histórico do pedido" icon={<Clock3 size={17} />}>
              {order.trackingHistory.length === 0 ? (
                <p className="text-sm text-neutral-500">
                  Nenhum histórico disponível.
                </p>
              ) : (
                <div>
                  {order.trackingHistory.map((history, index) => {
                    const isLast = index === order.trackingHistory.length - 1

                    return (
                      <div
                        key={`${history.status}-${history.date}-${index}`}
                        className="relative flex gap-4 pb-7 last:pb-0"
                      >
                        {!isLast && (
                          <div className="absolute left-[15px] top-8 h-[calc(100%-18px)] w-px bg-neutral-200" />
                        )}

                        <div
                          className={`
                              relative z-10 flex h-8 w-8
                              shrink-0 items-center justify-center
                              rounded-full
                              ${
                                isLast
                                  ? 'bg-neutral-950 text-[#D6B85A]'
                                  : 'bg-[#F7F5F0] text-neutral-400'
                              }
                            `}
                        >
                          <Check size={13} />
                        </div>

                        <div className="pt-1">
                          <p className="text-sm font-semibold">
                            {history.title}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-neutral-500">
                            {history.description}
                          </p>

                          <p className="mt-2 text-[10px] text-neutral-400">
                            {formatDate(history.date)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </Section>
          </div>

          {/* ==================================================== */}
          {/* DIREITA */}
          {/* ==================================================== */}

          <div className="space-y-6">
            {/* GERENCIAR */}

            <section className="rounded-2xl border border-neutral-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-950 text-[#D6B85A]">
                  <Truck size={16} />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">Gerenciar pedido</h2>

                  <p className="text-[10px] text-neutral-400">
                    Atualize o andamento da compra.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                {orderStatusOptions.map((status) => {
                  const active = currentStatus === status

                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setSelectedStatus(status)}
                      className={`
                          flex w-full items-center
                          justify-between rounded-xl border
                          px-4 py-3 text-left transition
                          ${
                            active
                              ? 'border-[#B8963E] bg-[#F7F5F0]'
                              : 'border-neutral-200 hover:border-neutral-300'
                          }
                        `}
                    >
                      <div>
                        <p className="text-xs font-semibold">
                          {statusConfig[status].label}
                        </p>

                        <p className="mt-1 text-[9px] text-neutral-400">
                          {statusConfig[status].description}
                        </p>
                      </div>

                      {active && (
                        <CheckCircle2 size={16} className="text-[#A18135]" />
                      )}
                    </button>
                  )
                })}
              </div>

              {(currentStatus === 'shipped' || order.shippingTrackingCode) && (
                <div className="mt-5">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Código da transportadora
                  </label>

                  <input
                    value={shippingTrackingCode}
                    onChange={(event) =>
                      setShippingTrackingCode(event.target.value)
                    }
                    placeholder={
                      order.shippingTrackingCode || 'Ex: AA123456789BR'
                    }
                    className="mt-2 h-11 w-full rounded-xl border border-neutral-200 px-4 text-sm uppercase outline-none focus:border-[#B8963E]"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={handleUpdateStatus}
                disabled={updateStatus.isPending}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 text-xs font-medium uppercase tracking-wider text-white disabled:opacity-50"
              >
                {updateStatus.isPending ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save size={15} />
                    Salvar alterações
                  </>
                )}
              </button>

              {updateStatus.isSuccess && (
                <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-700">
                  Pedido atualizado com sucesso.
                </p>
              )}

              {updateStatus.isError && (
                <p className="mt-4 rounded-xl bg-red-50 p-3 text-xs text-red-600">
                  {getErrorMessage(updateStatus.error)}
                </p>
              )}
            </section>

            {/* PAGAMENTO */}

            <Section title="Pagamento" icon={<CreditCard size={17} />}>
              <SummaryRow
                label="Forma"
                value={getPaymentMethodLabel(order.payment.method)}
              />

              <div className="mt-4">
                <SummaryRow
                  label="Situação"
                  value={getPaymentStatusLabel(order.payment.status)}
                />
              </div>
            </Section>

            {/* VALORES */}

            <Section title="Resumo financeiro" icon={<ReceiptText size={17} />}>
              <div className="space-y-4">
                <SummaryRow
                  label="Subtotal"
                  value={formatMoney(order.subtotal)}
                />

                <SummaryRow
                  label="Frete"
                  value={
                    order.shipping > 0 ? formatMoney(order.shipping) : 'Grátis'
                  }
                />

                <div className="border-t pt-4">
                  <SummaryRow label="Total" value={formatMoney(order.total)} />
                </div>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </main>
  )
}

/*
|--------------------------------------------------------------------------
| COMPONENTES
|--------------------------------------------------------------------------
*/

function Section({
  title,
  icon,
  children,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
      <div className="mb-6 flex items-center gap-2">
        <span className="text-[#A18135]">{icon}</span>

        <h2 className="text-sm font-semibold text-neutral-950">{title}</h2>
      </div>

      {children}
    </section>
  )
}

function Information({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon?: React.ReactNode
}) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-wider text-neutral-400">
        {label}
      </p>

      <div className="mt-1.5 flex items-center gap-2 text-sm text-neutral-800">
        {icon && <span className="text-neutral-400">{icon}</span>}

        <span className="break-all">{value}</span>
      </div>
    </div>
  )
}

function ProductAttribute({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-[#F7F5F0] px-2 py-1 text-[10px] font-medium text-neutral-600">
      {children}
    </span>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-neutral-500">{label}</span>

      <span className="text-xs font-semibold text-neutral-900">{value}</span>
    </div>
  )
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status]

  return (
    <span
      className={`
        inline-flex rounded-full border
        px-2.5 py-1 text-[10px] font-semibold
        ${config.className}
      `}
    >
      {config.label}
    </span>
  )
}
