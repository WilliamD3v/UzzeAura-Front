'use client'

import { useAuth } from '@/context/authContext'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

export default function AuthPage() {
  const { signIn, alert, loading, user } = useAuth()

  const router = useRouter()

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const [localError, setLocalError] = useState('')

  useEffect(() => {
    if (user?._id) {
      router.push(`/dashboard/${user._id}`)
    }
  }, [user, router])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    setLocalError('')

    if (!email.trim() || !password.trim()) {
      setLocalError('Preencha email e senha.')

      return
    }

    try {
      await signIn({
        email: email.trim(),

        password: password.trim(),
      })
    } catch {
      setLocalError('Não foi possível realizar o acesso.')
    }
  }

  return (
    <main
      className="
        min-h-screen

        bg-[#faf7f2]

        flex

        items-center

        justify-center

        px-5

        py-10

        relative

        overflow-hidden
      "
    >
      {/* detalhes de fundo */}

      <div
        className="
          absolute

          -top-40

          -left-40

          h-96

          w-96

          rounded-full

          bg-[#D4AF37]/10

          blur-3xl
        "
      />

      <div
        className="
          absolute

          -bottom-40

          -right-40

          h-96

          w-96

          rounded-full

          bg-[#D4AF37]/10

          blur-3xl
        "
      />

      <section
        className="
          relative

          w-full

          max-w-md
        "
      >
        {/* Marca */}

        <div
          className="
            mb-10

            text-center
          "
        >
          <p
            className="
              text-xs

              uppercase

              tracking-[0.5em]

              text-[#D4AF37]
            "
          >
            Boutique
          </p>

          <h1
            className="
              mt-4

              text-4xl

              font-serif

              tracking-wide

              text-neutral-900
            "
          >
            Sua Marca
          </h1>

          <p
            className="
              mt-3

              text-sm

              text-neutral-500
            "
          >
            Elegância em cada detalhe.
          </p>
        </div>

        {/* Card */}

        <div
          className="
            rounded-[32px]

            border

            border-neutral-200

            bg-white

            p-8

            shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          "
        >
          <h2
            className="
              text-center

              text-2xl

              font-medium

              text-neutral-900
            "
          >
            Acesso administrativo
          </h2>

          <p
            className="
              mt-2

              text-center

              text-sm

              text-neutral-500
            "
          >
            Gerencie sua coleção e produtos.
          </p>

          <form
            onSubmit={handleSubmit}

            className="
              mt-8

              space-y-5
            "
          >
            {/* Email */}

            <div>
              <label
                className="
                  mb-2

                  block

                  text-sm

                  text-neutral-700
                "
              >
                Email
              </label>

              <div
                className="
                  flex

                  h-14

                  items-center

                  gap-3

                  rounded-2xl

                  border

                  border-neutral-200

                  px-4

                  transition

                  focus-within:border-[#D4AF37]
                "
              >
                <Mail
                  className="
                    h-5

                    w-5

                    text-neutral-400
                  "
                />

                <input
                  type="email"

                  value={email}

                  onChange={(e) => setEmail(e.target.value)}

                  placeholder="Seu email"

                  className="
                    w-full

                    bg-transparent

                    text-sm

                    outline-none
                  "
                />
              </div>
            </div>

            {/* Senha */}

            <div>
              <label
                className="
                  mb-2

                  block

                  text-sm

                  text-neutral-700
                "
              >
                Senha
              </label>

              <div
                className="
                  flex

                  h-14

                  items-center

                  gap-3

                  rounded-2xl

                  border

                  border-neutral-200

                  px-4

                  transition

                  focus-within:border-[#D4AF37]
                "
              >
                <Lock
                  className="
                    h-5

                    w-5

                    text-neutral-400
                  "
                />

                <input
                  type={showPassword ? 'text' : 'password'}

                  value={password}

                  onChange={(e) => setPassword(e.target.value)}

                  placeholder="Sua senha"

                  className="
                    w-full

                    bg-transparent

                    text-sm

                    outline-none
                  "
                />

                <button
                  type="button"

                  onClick={() => setShowPassword(!showPassword)}

                  className="
                    text-neutral-400

                    hover:text-[#D4AF37]
                  "
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {(localError || alert?.message) && (
              <div
                className="
                  rounded-xl

                  bg-red-50

                  px-4

                  py-3

                  text-sm

                  text-red-600
                "
              >
                {localError || alert?.message}
              </div>
            )}

            <button
              disabled={loading}

              className="
                h-14

                w-full

                rounded-2xl

                bg-[#D4AF37]

                text-sm

                font-semibold

                tracking-wide

                text-white

                transition

                hover:bg-[#c19b2f]

                disabled:opacity-60
              "
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <p
          className="
            mt-8

            text-center

            text-xs

            tracking-wide

            text-neutral-400
          "
        >
          Área exclusiva da administração
        </p>
      </section>
    </main>
  )
}
