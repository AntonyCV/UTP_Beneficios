import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOCATION_PROMPT_KEY } from '../components/BottomNav'

/**
 * Controla el modal de permiso de ubicación simulado que se muestra la
 * primera vez que el usuario intenta ir a "Mapa" en cualquier pantalla.
 */
export function useMapAccessGate() {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)

  function request() {
    setModalOpen(true)
  }

  function decide(_granted: boolean) {
    localStorage.setItem(LOCATION_PROMPT_KEY, 'true')
    setModalOpen(false)
    navigate('/mapa')
  }

  return { modalOpen, request, decide }
}
