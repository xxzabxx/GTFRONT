import React, { useState, useEffect } from 'react'
import { authService } from '../services/authService'

const AdminPage = () => {
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [tierFilter, setTierFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    loadAdminData()
  }, [currentPage, searchTerm, tierFilter, statusFilter])

  const loadAdminData = async () => {
    try {
      setLoading(true)
      
      // Load users with filters
      const usersResponse = await authService.getAdminUsers({
        page: currentPage,
        search: searchTerm,
        tier: tierFilter,
        status: statusFilter
      })
      
      setUsers(usersResponse.users)
      setPagination(usersResponse.pagination)
      
      // Load stats
      const statsResponse = await authService.getAdminStats()
      setStats(statsResponse)
      
    } catch (err) {
      setError('Failed to load admin data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleTierUpdate = async (userId, newTier, expiresInDays = 30) => {
    try {
      await authService.updateUserTier(userId, newTier, expiresInDays)
      loadAdminData() // Refresh data
      setSelectedUser(null)
    } catch (err) {
      setError('Failed to update user tier')
    }
  }

  const handleStatusUpdate = async (userId, isActive) => {
    try {
      await authService.updateUserStatus(userId, isActive)
      loadAdminData() // Refresh data
    } catch (err) {
      setError('Failed to update user status')
    }
  }

  const handleAdminUpdate = async (userId, isAdmin) => {
    try {
      await authService.updateUserAdmin(userId, isAdmin)
      loadAdminData() // Refresh data
    } catch (err) {
      setError('Failed to update admin status')
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString()
  }

  const getTierBadgeColor = (tier) => {
    switch (tier) {
      case 'free': return 'bg-gray-100 text-gray-800'
      case 'premium': return 'bg-blue-100 text-blue-800'
      case 'pro': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading && !users.length) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-xl">Loading admin dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage users and platform settings</p>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-white">{stats.users.total}</p>
              <p className="text-sm text-green-400 mt-1">
                {stats.users.recent_signups} new this week
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Active Users</h3>
              <p className="text-3xl font-bold text-white">{stats.users.active}</p>
              <p className="text-sm text-blue-400 mt-1">
                {stats.users.recent_logins} recent logins
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Premium Users</h3>
              <p className="text-3xl font-bold text-white">
                {stats.tiers.premium + stats.tiers.pro}
              </p>
              <p className="text-sm text-purple-400 mt-1">
                {Math.round(((stats.tiers.premium + stats.tiers.pro) / stats.users.total) * 100)}% conversion
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Content</h3>
              <p className="text-3xl font-bold text-white">{stats.content.watchlists}</p>
              <p className="text-sm text-yellow-400 mt-1">
                {stats.content.active_alerts} active alerts
              </p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Search Users
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Username, email, name..."
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Tier Filter
              </label>
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Tiers</option>
                <option value="free">Free</option>
                <option value="premium">Premium</option>
                <option value="pro">Professional</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Status Filter
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="admin">Admins</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setTierFilter('')
                  setStatusFilter('')
                  setCurrentPage(1)
                }}
                className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Tier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">
                          {user.username}
                          {user.is_admin && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Admin
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                        {user.first_name && (
                          <div className="text-sm text-gray-400">
                            {user.first_name} {user.last_name}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTierBadgeColor(user.subscription_tier)}`}>
                        {user.subscription_tier}
                      </span>
                      {user.subscription_expires && (
                        <div className="text-xs text-gray-400 mt-1">
                          Expires: {formatDate(user.subscription_expires)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {formatDate(user.last_login)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-400 hover:text-blue-300 mr-4"
                      >
                        Manage
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(user.id, !user.is_active)}
                        className={`${
                          user.is_active 
                            ? 'text-red-400 hover:text-red-300' 
                            : 'text-green-400 hover:text-green-300'
                        }`}
                      >
                        {user.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="bg-gray-700 px-6 py-3 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {((pagination.page - 1) * pagination.per_page) + 1} to{' '}
                {Math.min(pagination.page * pagination.per_page, pagination.total)} of{' '}
                {pagination.total} users
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(pagination.page - 1)}
                  disabled={!pagination.has_prev}
                  className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-gray-400">
                  Page {pagination.page} of {pagination.pages}
                </span>
                <button
                  onClick={() => setCurrentPage(pagination.page + 1)}
                  disabled={!pagination.has_next}
                  className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-500"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Management Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium text-white mb-4">
                Manage User: {selectedUser.username}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Subscription Tier
                  </label>
                  <div className="space-y-2">
                    {['free', 'premium', 'pro'].map((tier) => (
                      <button
                        key={tier}
                        onClick={() => handleTierUpdate(selectedUser.id, tier)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedUser.subscription_tier === tier
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {tier.charAt(0).toUpperCase() + tier.slice(1)}
                        {tier !== 'free' && ' (30 days)'}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Admin Status
                  </label>
                  <button
                    onClick={() => handleAdminUpdate(selectedUser.id, !selectedUser.is_admin)}
                    className={`w-full px-3 py-2 rounded-md transition-colors ${
                      selectedUser.is_admin
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {selectedUser.is_admin ? 'Revoke Admin' : 'Grant Admin'}
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage

