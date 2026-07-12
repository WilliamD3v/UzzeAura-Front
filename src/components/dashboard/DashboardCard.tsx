import { ArrowDownRight, ArrowUpRight, LucideIcon } from 'lucide-react'

type Props = {
  title: string
  value: string
  change: number
  subtitle: string
  icon: LucideIcon
}

export function DashboardCard({
  title,
  value,
  change,
  subtitle,
  icon: Icon,
}: Props) {
  const positive = change >= 0

  return (
    <article
      className="
        group

        rounded-3xl

        border

        border-neutral-200

        bg-white

        p-6

        shadow-sm

        transition-all

        duration-300

        hover:-translate-y-1

        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className="
              text-sm

              uppercase

              tracking-[0.18em]

              text-neutral-500
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-3

              text-3xl

              font-semibold

              text-neutral-900
            "
          >
            {value}
          </h2>
        </div>

        <div
          className="
            flex

            h-14

            w-14

            items-center

            justify-center

            rounded-2xl

            bg-[#D4AF37]/10

            text-[#D4AF37]

            transition-transform

            duration-300

            group-hover:scale-110
          "
        >
          <Icon size={28} />
        </div>
      </div>

      <div
        className="
          mt-8

          flex

          items-center

          justify-between
        "
      >
        <div
          className={`
            flex
            items-center
            gap-1
            text-sm
            font-medium

            ${positive ? 'text-emerald-600' : 'text-red-500'}
          `}
        >
          {positive ? <ArrowUpRight size={17} /> : <ArrowDownRight size={17} />}
          {Math.abs(change)}%
        </div>

        <span
          className="
            text-sm

            text-neutral-500
          "
        >
          {subtitle}
        </span>
      </div>
    </article>
  )
}
