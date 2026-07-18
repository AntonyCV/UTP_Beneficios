import type { ReactNode } from 'react'
import { BottomNav } from './BottomNav'
import { LocationPermissionModal } from './LocationPermissionModal'
import { SpeechReader } from './SpeechReader'
import { useMapAccessGate } from '../lib/useMapAccessGate'

export function AppLayout({ children }: { children: ReactNode }) {
  const mapGate = useMapAccessGate()

  return (
    <div className="flex min-h-dvh w-full pb-24 lg:pb-0 lg:pl-60">
      <BottomNav onRequestMap={mapGate.request} />
      <LocationPermissionModal open={mapGate.modalOpen} onDecide={mapGate.decide} />
      <SpeechReader />
      {children}
    </div>
  )
}
