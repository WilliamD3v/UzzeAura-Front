"use client";

/* import { useAuth } from "@/context/authContext"; */
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function AuthPage() {
  /* const { signIn, alert, loading, user } = useAuth(); */
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const pageTitle = "Entrar na sua conta";
  const pageSubtitle =
    "Faça login para acessar sua área administrativa com segurança.";

/*   useEffect(() => {
    if (user?._id) {
      router.push(`/dashboard/${user._id}`);
    }
  }, [user, router]); */

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLocalError("");

    if (!email.trim() || !password.trim()) {
      setLocalError("Preencha email e senha.");
      return;
    }

    try {
/*       await signIn({
        email: email.trim(),
        password: password.trim(),
      }); */
    } catch {
      setLocalError("Não foi possível entrar no sistema.");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.14),_transparent_30%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          {/* Lado esquerdo */}
          <section className="hidden min-h-full flex-col justify-between bg-gradient-to-br from-cyan-500/20 via-slate-900 to-slate-950 p-10 lg:flex">
            <div>
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
                <ShieldCheck className="h-4 w-4" />
                Área protegida
              </div>

              <h1 className="max-w-md text-4xl font-black leading-tight text-white xl:text-5xl">
                Acesse o painel do seu sistema com segurança
              </h1>

              <p className="mt-5 max-w-lg text-base leading-7 text-slate-300 xl:text-lg">
                Página de login moderna, elegante e pronta para integrar com seu
                back-end, mantendo uma experiência limpa no celular e no desktop.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-white">
                  Interface responsiva
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Funciona muito bem em telas pequenas, médias e grandes.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-white">
                  Integração simples
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Já preparada para usar com seu AuthContext e redirecionamento
                  após login.
                </p>
              </div>
            </div>
          </section>

          {/* Lado direito */}
          <section className="flex items-center justify-center px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center lg:text-left">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 lg:mx-0">
                  <ShieldCheck className="h-8 w-8 text-cyan-300" />
                </div>

                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  {pageTitle}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                  {pageSubtitle}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="rounded-[28px] border border-white/10 bg-slate-950/60 p-5 shadow-xl sm:p-6"
              >
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200">
                      Email
                    </label>

                    <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 px-4 transition focus-within:border-cyan-400/60">
                      <Mail className="h-5 w-5 text-slate-400" />
                      <input
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-200">
                      Senha
                    </label>

                    <div className="flex h-14 items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 px-4 transition focus-within:border-cyan-400/60">
                      <Lock className="h-5 w-5 text-slate-400" />

                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="text-slate-400 transition hover:text-cyan-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

{/*                   {(localError ||
                    alert?.type === "error" ||
                    alert?.type === "success") && (
                    <div
                      className={`rounded-2xl border px-4 py-3 text-sm ${
                        alert?.type === "success"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                          : "border-red-500/30 bg-red-500/10 text-red-300"
                      }`}
                    >
                      {localError || alert?.message}
                    </div>
                  )} */}

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <label className="flex items-center gap-2 text-sm text-slate-300">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-white/10 bg-slate-900"
                      />
                      Lembrar acesso
                    </label>

                    <button
                      type="button"
                      className="text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
                    >
                      Esqueci minha senha
                    </button>
                  </div>

{/*                   <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 flex h-14 w-full items-center justify-center rounded-2xl bg-cyan-400 px-4 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "Entrando..." : "Entrar"}
                  </button> */}
                </div>
              </form>

              <div className="mt-5 text-center text-sm text-slate-400 lg:text-left">
                Acesso restrito ao sistema
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}