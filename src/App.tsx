import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Explore from './pages/Explore'
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
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DefaultDashboard />} />

        {/* Supporter */}
        <Route path="supporter-home" element={<SupporterHome />} />
        <Route path="explore" element={<ExploreCampaigns />} />
        <Route path="campaign/:id" element={<CampaignDetails />} />
        <Route path="my-contributions" element={<MyContributions />} />
        <Route path="purchase-credit" element={<PurchaseCredit />} />
        <Route path="payment-history" element={<PaymentHistory />} />

        {/* Creator */}
        <Route path="creator-home" element={<CreatorHome />} />
        <Route path="add-campaign" element={<AddCampaign />} />
        <Route path="my-campaigns" element={<MyCampaigns />} />
        <Route path="withdrawals" element={<Withdrawals />} />
        <Route path="creator-payment-history" element={<CreatorPaymentHistory />} />

        {/* Admin */}
        <Route path="admin-home" element={<AdminHome />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="manage-campaigns" element={<ManageCampaigns />} />
        <Route path="withdrawal-requests" element={<WithdrawalRequests />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
