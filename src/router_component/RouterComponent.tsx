import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TimeSheetLandingPage from '../component/TimeSheetAndVacation/TimeSheetLandingPage'
import VacationTimeSheet from '../component/TimeSheetAndVacation/VacationTimeSheet'
import DashboardHeader from '../dashboard_header/DashboardHeader'
import Footer from '../footer/Footer'
import Head from '../header/Head'
import { useAuth } from '../login_dashboard/AuthProvider'
import LoginDashboard from '../login_dashboard/LoginDashboard'
import LoginPage from '../login_page/LoginPage'
import MenuItem from '../navbar/MenuItem'
import { ProtectedRoute } from './ProtectedRoute'

const RouterComponent = () => {
  const { user }: any = useAuth();

  return (
    <div>
      {user !== null ? <DashboardHeader /> : <Head />}
      <section style={{ marginTop: '6em' }}>
        <Routes>
          <Route path='/' index element={<Head />} />
          <Route path='/labelComp' element={<MenuItem />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route element={<ProtectedRoute />} > */}
          <Route path="/loginDashboard" element={<ProtectedRoute><LoginDashboard /></ProtectedRoute>} />
          <Route path="/employeedatabase" element={<ProtectedRoute><MenuItem /></ProtectedRoute>} />
          <Route path="/timeSheet" element={<ProtectedRoute><TimeSheetLandingPage /></ProtectedRoute>} />
          <Route path="/VacationTimeSheet" element={<ProtectedRoute> <VacationTimeSheet /></ProtectedRoute>} />
          {/* </Route> */}
        </Routes>
      </section>
      <Footer />
    </div>
  )
}

export default RouterComponent