'use client'

import { Clock3, Ticket } from 'lucide-react'
import { useState } from 'react'
import { GiConfirmed } from 'react-icons/gi'
import { MdDoNotDisturbOn } from 'react-icons/md'

type ScheduleProps = {
  _id: string
  ticketNumber: string
  name: string
  phone: string
  notes?: string
  service: string
  status?: string
  createdAt: string
}

type Props = {
  schedule: ScheduleProps
  onDelete?: (id: string, description: string) => void
  onStatus?: (id: string) => void
  refetch: () => void
}

export default function ScheduleCard({
  schedule,
  onDelete,
  onStatus,
  refetch,
}: Props) {
  const [openCancel, setOpenCancel] = useState(false)
  const [description, setDescription] = useState('')

  function formatDateTime(dateString: string) {
    const date = new Date(dateString)

    if (isNaN(date.getTime())) return 'Data inválida'

    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleApproved = async () => {
    onStatus?.(schedule._id)
  }

  const handleComplete = async () => {
    onDelete?.(schedule._id, 'CONCLUÍDO')

    refetch()
  }

  const handleCancel = () => {
    if (!description.trim()) return

    onDelete?.(schedule._id, description.trim())

    refetch()

    setDescription('')
    setOpenCancel(false)
  }

  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-[11px] uppercase text-slate-400">Ticket</p>
          <div className="mt-2 flex items-center gap-2 text-white font-bold">
            <Ticket size={16} />
            {schedule.ticketNumber}
          </div>
        </div>

        <div className="text-xs text-slate-300 flex items-center gap-2">
          <Clock3 size={14} />
          {formatDateTime(schedule.createdAt)}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {schedule.status === 'pending' ? (
          <button
            onClick={handleApproved}
            className="text-green-400 p-2 rounded-xl border border-white/10 bg-slate-950/60"
          >
            <GiConfirmed size={18} />
          </button>
        ) : (
          <button
            onClick={handleComplete}
            className="text-green-400 p-2 rounded-xl border border-white/10 bg-slate-950/60"
          >
            <GiConfirmed size={18} />
          </button>
        )}
        <button
          onClick={() => setOpenCancel(true)}
          className="text-red-500 p-2 rounded-xl border border-white/10 bg-slate-950/60"
        >
          <MdDoNotDisturbOn size={18} />
        </button>
      </div>
      {openCancel && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Motivo do cancelamento"
            className="w-full h-11 rounded-xl bg-slate-950/60 border border-white/10 px-3 text-white outline-none"
          />

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                setOpenCancel(false)
                setDescription('')
              }}
              className="px-3 py-2 rounded-xl border border-white/10 text-slate-300"
            >
              Voltar
            </button>

            <button
              onClick={handleCancel}
              disabled={!description.trim()}
              className={`px-3 py-2 rounded-xl font-semibold transition ${
                description.trim()
                  ? 'bg-red-500 text-white'
                  : 'bg-red-500/30 text-white/40 cursor-not-allowed'
              }`}
            >
              Confirmar cancelamento
            </button>
          </div>
        </div>
      )}
      <div className="mt-5 space-y-3 text-white">
        <div>
          <p className="text-xs text-slate-400">Cliente</p>
          <p className="font-semibold">{schedule.name}</p>
        </div>

        <div>
          <p className="text-xs text-slate-400">WhatsApp</p>
          <p className="font-semibold">{schedule.phone}</p>
        </div>

        <div>
          <p className="text-xs text-slate-400">Serviço</p>
          <p className="font-semibold">{schedule.service}</p>
        </div>

        <div>
          <p className="text-xs text-slate-400">Observações</p>
          <p className="text-sm text-slate-300">
            {schedule.notes?.trim() || 'Nenhuma observação'}
          </p>
        </div>
      </div>
    </article>
  )
}
