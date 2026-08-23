'use client'

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  CreditCard,
  Home,
  LockKeyhole,
  Mail,
  MapPin,
  PackageCheck,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import axios from '@/lib/axios'

import { useCart } from '@/components/cart/CartProvider'

type PaymentMethod = 'pix' | 'credit_card'

type CheckoutForm = {
  name: string
  email: string
  phone: string
  cpf: string

  cep: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string

  paymentMethod: PaymentMethod
}

type CreatedOrder = {
  id: string
  orderNumber: string
  trackingCode: string
  status: string
  paymentStatus: string
  subtotal: number
  shipping: number
  total: number
}

type CreateOrderResponse = {
  success: boolean
  message: string
  emailSent?: boolean
  order: CreatedOrder
}

const initialForm: CheckoutForm = {
  name: '',
  email: '',
  phone: '',
  cpf: '',

  cep: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',

  paymentMethod: 'pix',
}

function formatMoney(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()

  const [form, setForm] = useState<CheckoutForm>(initialForm)

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

  const [createdOrder, setCreatedOrder] = useState<CreatedOrder | null>(null)

  const [emailSent, setEmailSent] = useState(false)

  const [copied, setCopied] = useState(false)

  const shipping = 0

  const finalTotal = total + shipping

  function updateField<K extends keyof CheckoutForm>(
    field: K,
    value: CheckoutForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (loading) {
      return
    }

    if (items.length === 0) {
      setError('Seu carrinho está vazio.')

      return
    }

    try {
      setLoading(true)
      setError('')

      /*
       * Não enviamos preço, subtotal ou total
       * como valores confiáveis.
       *
       * O backend consulta cada produto no
       * MongoDB e calcula os valores reais.
       */

      const orderData = {
        customer: {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          cpf: form.cpf.trim(),
        },

        address: {
          cep: form.cep.trim(),
          street: form.street.trim(),
          number: form.number.trim(),
          complement: form.complement.trim(),
          neighborhood: form.neighborhood.trim(),
          city: form.city.trim(),
          state: form.state.trim().toUpperCase(),
        },

        items: items.map((item) => ({
          productId: item.productId,
          size: item.size,
          color: item.color,

          // quantidade escolhida pelo cliente
          quantity: item.quantity,
        })),

        paymentMethod: form.paymentMethod,

        shipping,
      }

      console.log('PEDIDO ENVIADO:', orderData)

      const response = await axios.post<CreateOrderResponse>(
        '/order',
        orderData,
      )

      if (!response.data.success || !response.data.order) {
        throw new Error(
          response.data.message || 'Não foi possível finalizar o pedido.',
        )
      }

      setCreatedOrder(response.data.order)

      setEmailSent(Boolean(response.data.emailSent))

      /*
       * Limpa o carrinho somente DEPOIS
       * que o backend confirmar que salvou.
       */

      if (clearCart) {
        clearCart()
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } catch (err: unknown) {
      console.error('Erro ao finalizar pedido:', err)

      let message = 'Não foi possível finalizar o pedido. Tente novamente.'

      if (typeof err === 'object' && err !== null && 'response' in err) {
        const axiosError = err as {
          response?: {
            data?: {
              message?: string
            }
          }
        }

        if (axiosError.response?.data?.message) {
          message = axiosError.response.data.message
        }
      } else if (err instanceof Error && err.message) {
        message = err.message
      }

      setError(message)
    } finally {
      setLoading(false)
    }
  }

  async function copyTrackingCode() {
    if (!createdOrder) {
      return
    }

    try {
      await navigator.clipboard.writeText(createdOrder.trackingCode)

      setCopied(true)

      window.setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      setCopied(false)
    }
  }

  /*
   * IMPORTANTE:
   *
   * O sucesso vem ANTES da verificação
   * do carrinho vazio.
   *
   * Isso porque limpamos o carrinho após
   * criar o pedido.
   */

  if (createdOrder) {
    return (
      <OrderSuccess
        order={createdOrder}
        email={form.email}
        emailSent={emailSent}
        copied={copied}
        onCopy={copyTrackingCode}
      />
    )
  }

  if (items.length === 0) {
    return <EmptyCheckout />
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-neutral-950">
      {/* HEADER */}

      <header className="border-b border-black/[0.08] bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="
              flex items-center gap-2
              text-xs font-medium uppercase
              tracking-[0.14em]
              text-neutral-500
              transition hover:text-black
            "
          >
            <ArrowLeft size={16} />

            <span className="hidden sm:inline">Continuar comprando</span>
          </Link>

          <Link href="/" className="text-center">
            <p className="text-xl font-semibold tracking-[0.28em]">UZZE AURA</p>

            <p className="mt-1 text-[8px] uppercase tracking-[0.3em] text-neutral-400">
              Sua essência. Sua aura.
            </p>
          </Link>

          <div className="flex items-center gap-2 text-neutral-500">
            <LockKeyhole size={15} />

            <span className="hidden text-[10px] uppercase tracking-[0.15em] sm:inline">
              Compra segura
            </span>
          </div>
        </div>
      </header>

      {/* CHECKOUT */}

      <form onSubmit={handleSubmit}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px]">
          {/* FORMULÁRIO */}

          <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
            <div className="mx-auto max-w-2xl">
              <div className="mb-10">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#a47d3b]">
                  Checkout
                </p>

                <h1 className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">
                  Finalizar pedido
                </h1>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Preencha seus dados para concluir sua compra.
                </p>
              </div>

              {/* ERRO */}

              {error && (
                <div
                  className="
                    mb-6 rounded-2xl
                    border border-red-200
                    bg-red-50 px-5 py-4
                  "
                >
                  <p className="text-sm font-medium text-red-700">
                    Não foi possível finalizar o pedido
                  </p>

                  <p className="mt-1 text-xs leading-5 text-red-600">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                {/* IDENTIFICAÇÃO */}

                <CheckoutSection
                  number="01"
                  title="Identificação"
                  description="Informe seus dados para contato e identificação."
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Input
                        label="Nome completo"
                        placeholder="Digite seu nome completo"
                        value={form.name}
                        onChange={(value) => updateField('name', value)}
                        required
                      />
                    </div>

                    <Input
                      label="E-mail"
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={form.email}
                      onChange={(value) => updateField('email', value)}
                      required
                    />

                    <Input
                      label="Telefone / WhatsApp"
                      type="tel"
                      placeholder="(83) 99999-9999"
                      value={form.phone}
                      onChange={(value) => updateField('phone', value)}
                      required
                    />

                    <div className="sm:col-span-2">
                      <Input
                        label="CPF"
                        placeholder="000.000.000-00"
                        value={form.cpf}
                        onChange={(value) => updateField('cpf', value)}
                        required
                      />
                    </div>
                  </div>
                </CheckoutSection>

                {/* ENDEREÇO */}

                <CheckoutSection
                  number="02"
                  title="Endereço de entrega"
                  description="Informe onde seu pedido deverá ser entregue."
                >
                  <div className="grid gap-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <Input
                        label="CEP"
                        placeholder="00000-000"
                        value={form.cep}
                        onChange={(value) => updateField('cep', value)}
                        required
                      />
                    </div>

                    <div className="hidden sm:col-span-3 sm:flex sm:items-end">
                      <div className="flex h-12 items-center gap-2 text-xs text-neutral-500">
                        <MapPin size={15} />
                        Informe seu CEP para calcular a entrega.
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <Input
                        label="Rua / Avenida"
                        placeholder="Nome da rua"
                        value={form.street}
                        onChange={(value) => updateField('street', value)}
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Input
                        label="Número"
                        placeholder="123"
                        value={form.number}
                        onChange={(value) => updateField('number', value)}
                        required
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <Input
                        label="Bairro"
                        placeholder="Seu bairro"
                        value={form.neighborhood}
                        onChange={(value) => updateField('neighborhood', value)}
                        required
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <Input
                        label="Complemento"
                        placeholder="Apto, bloco, referência..."
                        value={form.complement}
                        onChange={(value) => updateField('complement', value)}
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <Input
                        label="Cidade"
                        placeholder="Sua cidade"
                        value={form.city}
                        onChange={(value) => updateField('city', value)}
                        required
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Input
                        label="Estado"
                        placeholder="PB"
                        maxLength={2}
                        value={form.state}
                        onChange={(value) =>
                          updateField('state', value.toUpperCase())
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-black/10 bg-[#faf9f7] p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                        <Truck size={18} strokeWidth={1.6} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium">Entrega</p>

                            <p className="mt-1 text-xs leading-5 text-neutral-500">
                              O valor e prazo serão calculados de acordo com o
                              endereço informado.
                            </p>
                          </div>

                          <Check
                            size={18}
                            className="shrink-0 text-[#a47d3b]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CheckoutSection>

                {/* PAGAMENTO */}

                <CheckoutSection
                  number="03"
                  title="Pagamento"
                  description="Escolha como deseja pagar seu pedido."
                >
                  <div className="space-y-3">
                    <PaymentOption
                      active={form.paymentMethod === 'pix'}
                      icon={<QrCode size={20} />}
                      title="PIX"
                      description="Pagamento rápido e seguro."
                      onClick={() => updateField('paymentMethod', 'pix')}
                    />

                    <PaymentOption
                      active={form.paymentMethod === 'credit_card'}
                      icon={<CreditCard size={20} />}
                      title="Cartão de crédito"
                      description="Pague com seu cartão de crédito."
                      onClick={() =>
                        updateField('paymentMethod', 'credit_card')
                      }
                    />
                  </div>

                  {form.paymentMethod === 'pix' && (
                    <div className="mt-4 rounded-xl bg-[#f8f7f4] p-4">
                      <div className="flex gap-3">
                        <QrCode
                          size={20}
                          className="mt-0.5 shrink-0 text-[#a47d3b]"
                        />

                        <div>
                          <p className="text-xs font-medium">
                            Pagamento via PIX
                          </p>

                          <p className="mt-1 text-xs leading-5 text-neutral-500">
                            Após confirmar o pedido, você receberá as
                            informações necessárias para realizar o pagamento.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {form.paymentMethod === 'credit_card' && (
                    <div className="mt-4 rounded-xl bg-[#f8f7f4] p-4">
                      <div className="flex gap-3">
                        <LockKeyhole
                          size={19}
                          className="mt-0.5 shrink-0 text-[#a47d3b]"
                        />

                        <div>
                          <p className="text-xs font-medium">
                            Pagamento seguro
                          </p>

                          <p className="mt-1 text-xs leading-5 text-neutral-500">
                            Os dados do cartão serão solicitados pelo ambiente
                            seguro do provedor de pagamento.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CheckoutSection>

                <div className="grid grid-cols-3 gap-2 lg:hidden">
                  <Benefit icon={<ShieldCheck size={17} />} title="Seguro" />

                  <Benefit
                    icon={<PackageCheck size={17} />}
                    title="Protegido"
                  />

                  <Benefit icon={<Truck size={17} />} title="Entrega" />
                </div>
              </div>
            </div>
          </div>

          {/* RESUMO */}

          <aside className="border-t border-black/[0.08] bg-white lg:border-l lg:border-t-0">
            <div className="lg:sticky lg:top-0">
              <div className="p-5 sm:p-8 lg:p-10">
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                      Sua compra
                    </p>

                    <h2 className="mt-1 text-lg font-medium">
                      Resumo do pedido
                    </h2>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7f6f3]">
                    <ShoppingBag size={18} />
                  </div>
                </div>

                {/* PRODUTOS */}

                <div className="max-h-[390px] space-y-5 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      className="flex gap-4"
                    >
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                        <Image
                          src={item.image.url}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />

                        <div className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[9px] font-medium text-white">
                          {item.quantity}
                        </div>
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <p className="truncate text-sm font-medium">
                          {item.name}
                        </p>

                        <div className="mt-1 flex items-center gap-2 text-[11px] text-neutral-500">
                          <span>{item.size}</span>

                          <span>•</span>

                          {item.hex && (
                            <span
                              className="h-2.5 w-2.5 rounded-full border border-black/10"
                              style={{
                                backgroundColor: item.hex,
                              }}
                            />
                          )}

                          <span>{item.color}</span>
                        </div>

                        <p className="mt-2 text-sm">
                          {formatMoney(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* VALORES */}

                <div className="mt-8 border-t border-black/[0.08] pt-6">
                  <div className="space-y-3">
                    <PriceRow label="Subtotal" value={formatMoney(total)} />

                    <PriceRow
                      label="Frete"
                      value={
                        shipping > 0 ? formatMoney(shipping) : 'A calcular'
                      }
                    />
                  </div>

                  <div className="my-5 border-t border-dashed border-black/10" />

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-neutral-500">Total</p>

                      <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-neutral-400">
                        BRL
                      </p>
                    </div>

                    <strong className="text-2xl font-medium tracking-tight">
                      {formatMoney(finalTotal)}
                    </strong>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      mt-7 flex h-14 w-full
                      items-center justify-center
                      gap-3 rounded-full
                      bg-neutral-950 px-6
                      text-xs font-medium
                      uppercase tracking-[0.18em]
                      text-white
                      transition-all duration-300
                      hover:bg-[#a47d3b]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Processando...
                      </>
                    ) : (
                      <>
                        Finalizar pedido
                        <ChevronRight size={16} />
                      </>
                    )}
                  </button>

                  <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-neutral-400">
                    <LockKeyhole size={12} />
                    Ambiente seguro e protegido
                  </div>
                </div>

                {/* BENEFÍCIOS */}

                <div className="mt-8 hidden grid-cols-3 gap-2 border-t border-black/[0.08] pt-6 lg:grid">
                  <Benefit
                    icon={<ShieldCheck size={16} />}
                    title="Compra segura"
                  />

                  <Benefit
                    icon={<PackageCheck size={16} />}
                    title="Pedido protegido"
                  />

                  <Benefit icon={<Truck size={16} />} title="Entrega segura" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </main>
  )
}

/* ======================================== */
/* SUCESSO */
/* ======================================== */

function OrderSuccess({
  order,
  email,
  emailSent,
  copied,
  onCopy,
}: {
  order: CreatedOrder
  email: string
  emailSent: boolean
  copied: boolean
  onCopy: () => void
}) {
  return (
    <main className="min-h-screen bg-[#f8f7f4] px-4 py-10 text-neutral-950 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <Link href="/">
            <p className="text-xl font-semibold tracking-[0.28em]">UZZE AURA</p>

            <p className="mt-1 text-[8px] uppercase tracking-[0.3em] text-neutral-400">
              Sua essência. Sua aura.
            </p>
          </Link>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-black/[0.08] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          {/* TOPO */}

          <div className="px-6 pb-8 pt-9 text-center sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={30} strokeWidth={1.7} />
            </div>

            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a47d3b]">
              Pedido confirmado
            </p>

            <h1 className="mt-2 text-2xl font-medium sm:text-3xl">
              Obrigada pela sua compra!
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500">
              Seu pedido foi registrado com sucesso. Guarde o código abaixo para
              acompanhar todas as atualizações.
            </p>
          </div>

          {/* RASTREIO */}

          <div className="border-y border-black/[0.08] bg-[#faf9f7] px-6 py-7 sm:px-10">
            <p className="text-center text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400">
              Código de acompanhamento
            </p>

            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <div className="rounded-xl border border-[#a47d3b]/20 bg-white px-6 py-4">
                <strong className="text-lg tracking-[0.16em] text-neutral-950 sm:text-xl">
                  {order.trackingCode}
                </strong>
              </div>

              <button
                type="button"
                onClick={onCopy}
                className="
                  flex h-12 items-center
                  justify-center gap-2
                  rounded-xl border
                  border-black/10
                  bg-white px-5
                  text-xs font-medium
                  transition
                  hover:border-[#a47d3b]
                  hover:text-[#a47d3b]
                "
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

            <p className="mt-4 text-center text-xs text-neutral-500">
              Você poderá usar este código para rastrear seu pedido.
            </p>
          </div>

          {/* INFORMAÇÕES */}

          <div className="p-6 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <OrderInfo label="Número do pedido" value={order.orderNumber} />

              <OrderInfo label="Total" value={formatMoney(order.total)} />

              <OrderInfo label="Status" value="Pedido recebido" />

              <OrderInfo
                label="Pagamento"
                value={
                  order.paymentStatus === 'paid'
                    ? 'Pago'
                    : 'Aguardando pagamento'
                }
              />
            </div>

            {/* EMAIL */}

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#f8f7f4] p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#a47d3b]">
                <Mail size={17} />
              </div>

              <div>
                <p className="text-xs font-medium">
                  {emailSent
                    ? 'Confirmação enviada por e-mail'
                    : 'Pedido registrado'}
                </p>

                <p className="mt-1 text-xs leading-5 text-neutral-500">
                  {emailSent
                    ? `Enviamos os dados do pedido e o código de acompanhamento para ${email}.`
                    : `O pedido foi criado, mas não conseguimos confirmar o envio do e-mail para ${email}. Guarde o código de acompanhamento exibido acima.`}
                </p>
              </div>
            </div>

            {/* AVISO */}

            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#a47d3b]/15 bg-[#a47d3b]/[0.04] p-4">
              <PackageCheck
                size={18}
                className="mt-0.5 shrink-0 text-[#a47d3b]"
              />

              <p className="text-xs leading-5 text-neutral-600">
                Assim que seu pedido avançar para preparação, envio ou entrega,
                o acompanhamento será atualizado.
              </p>
            </div>

            {/* AÇÕES */}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link
                href={`/rastrear?codigo=${encodeURIComponent(
                  order.trackingCode,
                )}`}
                className="
                  flex h-13 items-center
                  justify-center gap-2
                  rounded-full
                  bg-neutral-950 px-6
                  py-4 text-xs
                  font-medium uppercase
                  tracking-[0.14em]
                  text-white transition
                  hover:bg-[#a47d3b]
                "
              >
                <PackageCheck size={16} />
                Rastrear pedido
              </Link>

              <Link
                href="/"
                className="
                  flex h-13 items-center
                  justify-center gap-2
                  rounded-full border
                  border-black/10
                  bg-white px-6 py-4
                  text-xs font-medium
                  uppercase
                  tracking-[0.14em]
                  transition
                  hover:border-black/30
                "
              >
                <Home size={15} />
                Voltar à loja
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.16em] text-neutral-400">
          UZZE AURA • Sua essência. Sua aura.
        </p>
      </div>
    </main>
  )
}

/* ======================================== */
/* COMPONENTES */
/* ======================================== */

type CheckoutSectionProps = {
  number: string
  title: string
  description: string
  children: React.ReactNode
}

function CheckoutSection({
  number,
  title,
  description,
  children,
}: CheckoutSectionProps) {
  return (
    <section className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] sm:p-7">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#b89555]/30 bg-[#b89555]/[0.06] text-[10px] font-semibold text-[#9a7438]">
          {number}
        </div>

        <div>
          <h2 className="text-base font-medium">{title}</h2>

          <p className="mt-1 text-xs leading-5 text-neutral-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  )
}

type InputProps = {
  label: string
  value: string
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
  required?: boolean
  maxLength?: number
  onChange: (value: string) => void
}

function Input({
  label,
  value,
  placeholder,
  type = 'text',
  required,
  maxLength,
  onChange,
}: InputProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.1em] text-neutral-600">
        {label}

        {required && <span className="ml-1 text-[#a47d3b]">*</span>}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        className="
          h-12 w-full rounded-xl
          border border-black/10
          bg-white px-4
          text-sm text-neutral-950
          outline-none transition
          placeholder:text-neutral-300
          hover:border-black/20
          focus:border-[#a47d3b]
          focus:ring-2
          focus:ring-[#a47d3b]/10
        "
      />
    </label>
  )
}

type PaymentOptionProps = {
  active: boolean
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
}

function PaymentOption({
  active,
  icon,
  title,
  description,
  onClick,
}: PaymentOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex w-full items-center
        gap-4 rounded-xl border
        p-4 text-left
        transition-all
        ${
          active
            ? 'border-[#a47d3b] bg-[#a47d3b]/[0.04]'
            : 'border-black/10 bg-white hover:border-black/20'
        }
      `}
    >
      <div
        className={`
          flex h-10 w-10
          shrink-0 items-center
          justify-center rounded-full
          ${
            active
              ? 'bg-[#a47d3b] text-white'
              : 'bg-neutral-100 text-neutral-600'
          }
        `}
      >
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>

        <p className="mt-1 text-xs text-neutral-500">{description}</p>
      </div>

      <div
        className={`
          flex h-5 w-5
          items-center justify-center
          rounded-full border
          ${active ? 'border-[#a47d3b] bg-[#a47d3b]' : 'border-neutral-300'}
        `}
      >
        {active && <Check size={12} strokeWidth={3} className="text-white" />}
      </div>
    </button>
  )
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-500">{label}</span>

      <span className="font-medium">{value}</span>
    </div>
  )
}

function Benefit({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-[#f8f7f4] px-2 py-3 text-center">
      <span className="text-[#9a7438]">{icon}</span>

      <span className="text-[9px] leading-3 text-neutral-500">{title}</span>
    </div>
  )
}

function OrderInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/[0.08] p-4">
      <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-neutral-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-neutral-900">{value}</p>
    </div>
  )
}

function EmptyCheckout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f7f4] px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
          <ShoppingBag
            size={28}
            strokeWidth={1.4}
            className="text-neutral-500"
          />
        </div>

        <p className="mt-7 text-[10px] uppercase tracking-[0.25em] text-[#a47d3b]">
          UZZE AURA
        </p>

        <h1 className="mt-2 text-2xl font-medium">Seu carrinho está vazio</h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-neutral-500">
          Você precisa adicionar pelo menos uma peça ao carrinho antes de
          finalizar sua compra.
        </p>

        <Link
          href="/"
          className="
            mx-auto mt-7 flex h-13
            w-full max-w-xs
            items-center justify-center
            rounded-full
            bg-neutral-950 px-6 py-4
            text-xs font-medium
            uppercase tracking-[0.16em]
            text-white transition
            hover:bg-[#a47d3b]
          "
        >
          Ver produtos
        </Link>
      </div>
    </main>
  )
}
