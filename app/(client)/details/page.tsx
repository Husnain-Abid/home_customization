import { Suspense } from "react"
import DetailsClient from "./DetailsClient"

export const dynamic = "force-dynamic"

export default function DetailsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading details...</div>}>
      <DetailsClient />
    </Suspense>
  )
}
