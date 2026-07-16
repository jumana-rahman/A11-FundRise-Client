import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Explore from './pages/Explore'
import Unauthorized from './pages/Unauthorized'
import Forbidden from './pages/Forbidden'
import NotFound from './pages/NotFound'
import DashboardLayout from './layouts/DashboardLayout'

// Supporter pages
import SupporterHome from './pages/dashboard/supporter/SupporterHome'
import ExploreCampaigns from './pages/dashboard/supporter/ExploreCampaigns'
import CampaignDetails from './pages/dashboard/supporter/CampaignDetails'
import MyContributions from './pages/dashboard/supporter/MyContributions'
import PurchaseCredit from './pages/dashboard/supporter/PurchaseCredit'
import PaymentHistory from './pages/dashboard/supporter/PaymentHistory'

// Creator pages
import CreatorHome from './pages/dashboard/creator/CreatorHome'
import AddCampaign from './pages/dashboard/creator/AddCampaign'
import MyCampaigns from './pages/dashboard/creator/MyCampaigns'
import Withdrawals from './pages/dashboard/creator/Withdrawals'
import CreatorPaymentHistory from './pages/dashboard/creator/CreatorPaymentHistory'

// Admin pages
import AdminHome from './pages/dashboard/admin/AdminHome'
import ManageUsers from './pages/dashboard/admin/ManageUsers'
import ManageCampaigns from './pages/dashboard/admin/ManageCampaigns'
import WithdrawalRequests from './pages/dashboard/admin/WithdrawalRequests'
import Reports from './pages/dashboard/admin/Reports'

function DefaultDashboard() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.role === 'admin') return <Navigate to="/dashboard/admin-home" replace />
  if (user.role === 'creator') return <Navigate to="/dashboard/creator-home" replace />
  return <Navigate to="/dashboard/supporter-home" replace />
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}>{children}</div>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      {/* ── Public Routes ── */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />

      {/* ── Error Pages ── */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/forbidden" element={<Forbidden />} />

      {/* ── Dashboard (requires login) ── */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DefaultDashboard />} />

        {/* Supporter routes — only supporter role */}
        <Route
          path="supporter-home"
          element={
            <ProtectedRoute allowedRoles={['supporter']}>
              <SupporterHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="explore"
          element={
            <ProtectedRoute allowedRoles={['supporter']}>
              <ExploreCampaigns />
            </ProtectedRoute>
          }
        />
        <Route
          path="campaign/:id"
          element={
            <ProtectedRoute allowedRoles={['supporter']}>
              <CampaignDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-contributions"
          element={
            <ProtectedRoute allowedRoles={['supporter']}>
              <MyContributions />
            </ProtectedRoute>
          }
        />
        <Route
          path="purchase-credit"
          element={
            <ProtectedRoute allowedRoles={['supporter']}>
              <PurchaseCredit />
            </ProtectedRoute>
          }
        />
        <Route
          path="payment-history"
          element={
            <ProtectedRoute allowedRoles={['supporter']}>
              <PaymentHistory />
            </ProtectedRoute>
          }
        />

        {/* Creator routes — only creator role */}
        <Route
          path="creator-home"
          element={
            <ProtectedRoute allowedRoles={['creator']}>
              <CreatorHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="add-campaign"
          element={
            <ProtectedRoute allowedRoles={['creator']}>
              <AddCampaign />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-campaigns"
          element={
            <ProtectedRoute allowedRoles={['creator']}>
              <MyCampaigns />
            </ProtectedRoute>
          }
        />
        <Route
          path="withdrawals"
          element={
            <ProtectedRoute allowedRoles={['creator']}>
              <Withdrawals />
            </ProtectedRoute>
          }
        />
        <Route
          path="creator-payment-history"
          element={
            <ProtectedRoute allowedRoles={['creator']}>
              <CreatorPaymentHistory />
            </ProtectedRoute>
          }
        />

        {/* Admin routes — only admin role */}
        <Route
          path="admin-home"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="manage-users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="manage-campaigns"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ManageCampaigns />
            </ProtectedRoute>
          }
        />
        <Route
          path="withdrawal-requests"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <WithdrawalRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="reports"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Reports />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ── 404 Catch-all ── */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
