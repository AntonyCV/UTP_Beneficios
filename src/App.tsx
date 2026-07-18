import { Search } from 'lucide-react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { StatusLayer } from './components/StatusLayer'
import { useApp } from './context/AppContext'
import { BrandDetail } from './screens/BrandDetail'
import { DealDetail } from './screens/DealDetail'
import { Empresas } from './screens/Empresas'
import { Favoritos } from './screens/Favoritos'
import { Home } from './screens/Home'
import { Login } from './screens/Login'
import { MapScreen } from './screens/MapScreen'
import { Onboarding } from './screens/Onboarding'
import { Perfil } from './screens/Perfil'
import { PlaceholderScreen } from './screens/PlaceholderScreen'

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useApp()
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <>
      <StatusLayer />
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <AppLayout><Home /></AppLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/favoritos"
          element={
            <RequireAuth>
              <AppLayout><Favoritos /></AppLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/beneficios"
          element={
            <RequireAuth>
              <AppLayout><Empresas /></AppLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/busqueda"
          element={
            <RequireAuth>
              <AppLayout><PlaceholderScreen titleKey="nav.search" icon={<Search className="h-7 w-7" aria-hidden="true" />} /></AppLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/mapa"
          element={
            <RequireAuth>
              <AppLayout><MapScreen /></AppLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/perfil"
          element={
            <RequireAuth>
              <AppLayout><Perfil /></AppLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/marca/:brandId"
          element={
            <RequireAuth>
              <AppLayout><BrandDetail /></AppLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/descuento/:offerId"
          element={
            <RequireAuth>
              <AppLayout><DealDetail /></AppLayout>
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
