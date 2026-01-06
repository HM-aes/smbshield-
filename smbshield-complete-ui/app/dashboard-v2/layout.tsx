import { DashboardLayout } from "@/components/dashboard-v2"

export default function DashboardV2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout>{children}</DashboardLayout>
}
