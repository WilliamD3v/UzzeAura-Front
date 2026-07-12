import { LogoutButton } from '@/components/dashboard/LogoutButton'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header
        className="
          flex
          justify-end
          p-6
        "
      >
        <LogoutButton />
      </header>

      {children}
    </>
  )
}
