import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from './LoadingSpinner'

type UserRole = 'supporter' | 'creator' | 'admin'

interface Props {
  /** If true, user must be logged in (any role). Default: true */
  requireAuth?: boolean
  /** If provided, user must have one of these roles */
  allowedRoles?: UserRole[]
  /** If true, redirect to login. If false, show 403 Forbidden page. Default: true */
  redirectToLogin?: boolean
  children: React.ReactNode
}

/**
 * ProtectedRoute — Guards routes based on authentication and role.
 *
 * Behavior:
 *   1. While session is loading → shows a fullscreen spinner
 *   2. If user is NOT logged in:
 *      - redirectToLogin=true (default) → redirects to /login
 *      - redirectToLogin=false → redirects to /unauthorized (401 page)
 *   3. If user IS logged in but role is not in allowedRoles:
 *      - Redirects to /forbidden (403 page)
 *   4. If user IS logged in and role matches → renders children
 *
 * Usage:
 *   <ProtectedRoute>                     → requires any authenticated user
 *   <ProtectedRoute allowedRoles={["admin"]}>       → admin only
 *   <ProtectedRoute allowedRoles={["creator","admin"]}> → creator or admin
 *   <ProtectedRoute requireAuth={false}>             → public route (no auth)
 */
export default function ProtectedRoute({
  requireAuth = true,
  allowedRoles,
  redirectToLogin = true,
  children,
}: Props) {
  const { user, loading } = useAuth()
  const location = useLocation()

  // Still loading the session — show spinner
  if (loading) {
    return <LoadingSpinner fullScreen text="Loading..." />
  }

  // Not logged in → redirect
  if (requireAuth && !user) {
    // Store the attempted URL so we can redirect back after login
    if (redirectToLogin) {
      return <Navigate to="/login" state={{ from: location.pathname }} replace />
    }
    return <Navigate to="/unauthorized" replace />
  }

  // Logged in but wrong role → forbidden
  if (user && allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />
  }

  return <>{children}</>
}
