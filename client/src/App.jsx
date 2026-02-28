import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminResponses from './pages/admin/AdminResponses'
import AdminDatabase from './pages/admin/AdminDatabase'
import EmployeeSchedule from './pages/employee/EmployeeSchedule'
import EmployeePreferences from './pages/employee/EmployeePreferences'
import Navbar from './components/Navbar'

export default function App() {
  const { view, userRole } = useContext(AppContext)

  if (view === 'login' || !userRole) {
    return <LoginPage />
  }

  return (
    <div className="min-h-screen bg-bvg-dark">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        {userRole === 'admin' && view === 'admin-dashboard' && <AdminDashboard />}
        {userRole === 'admin' && view === 'admin-responses' && <AdminResponses />}
        {userRole === 'admin' && view === 'admin-database' && <AdminDatabase />}
        {userRole === 'employee' && view === 'employee-schedule' && <EmployeeSchedule />}
        {userRole === 'employee' && view === 'employee-preferences' && <EmployeePreferences />}
      </main>
    </div>
  )
}
