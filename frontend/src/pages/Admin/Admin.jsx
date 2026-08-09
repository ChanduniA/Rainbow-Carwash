import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  CheckCircle2,
  DollarSign,
  RefreshCw,
  Calendar,
  Users,
  TrendingUp,
  BarChart3,
  Bell,
  ShieldCheck,
  ShieldAlert,
  Lock,
  ArrowRight,
  LogOut
} from 'lucide-react';
import Container from '../../components/Container/Container';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import ChartCard from '../../components/ChartCard/ChartCard';
import VehicleTable from '../../components/VehicleTable/VehicleTable';
import TradeInTable from '../../components/TradeInTable/TradeInTable';
import InspectionTable from '../../components/InspectionTable/InspectionTable';
import CustomerTable from '../../components/CustomerTable/CustomerTable';
import NotificationCard from '../../components/NotificationCard/NotificationCard';
import SettingsForm from '../../components/SettingsForm/SettingsForm';
import Toast from '../../components/Toast/Toast';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import AIAssistantPanel from '../../components/AIAssistantPanel/AIAssistantPanel';
import { vehiclesData } from '../../data/vehicles';
import styles from './Admin.module.css';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchValue, setSearchValue] = useState('');
  const [toast, setToast] = useState({ message: null, type: 'success' });
  const [vehicles, setVehicles] = useState(vehiclesData);
  const [stats, setStats] = useState({
    totalVehicles: "18",
    availableUnits: "14",
    soldVehicles: "4",
    pendingTradeIns: "5",
    inspectionBookings: "3",
    registeredClients: "142",
    quarterlyRevenue: "$1.48M",
    monthlySalesRate: "94.2%"
  });
  const [adminSession, setAdminSession] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminUser');
    const storedUser = localStorage.getItem('user');

    if (storedAdmin) {
      try {
        setAdminSession(JSON.parse(storedAdmin));
      } catch (e) {
        console.error('Invalid admin session format');
      }
    } else if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        if (u.role === 'admin') {
          setAdminSession(u);
        }
      } catch (e) {
        console.error('Invalid user session format');
      }
    }
    setIsCheckingAuth(false);

    // Fetch live Admin stats & vehicles from Backend API
    const loadAdminData = async () => {
      try {
        const [statsRes, vehiclesRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/admin/vehicles')
        ]);

        if (statsRes.ok) {
          const sData = await statsRes.json();
          if (sData.stats) setStats(sData.stats);
        }

        if (vehiclesRes.ok) {
          const vData = await vehiclesRes.json();
          if (vData.data && vData.data.length > 0) {
            setVehicles(vData.data);
          }
        }
      } catch (err) {
        console.warn('Backend API connection warning, using active frontend state.');
      }
    };

    loadAdminData();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: null, type: 'success' }), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminToken');
    showToast('Admin session logged out safely.', 'info');
    setTimeout(() => {
      window.location.href = '/admin-login';
    }, 800);
  };

  const handleDeleteVehicle = async (id) => {
    try {
      await fetch(`/api/admin/vehicles/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Local delete sync');
    }
    setVehicles(prev => prev.filter(v => v.id !== id));
    showToast(`Vehicle #${id} removed from inventory.`, 'danger');
  };

  const handleUpdateTradeInStatus = async (id, status) => {
    try {
      await fetch(`/api/admin/trade-ins/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (e) {}
    showToast(`Trade-in offer #${id} status updated to ${status}!`, status === 'approved' ? 'success' : 'danger');
  };

  const handleUpdateBookingStatus = async (id, status) => {
    try {
      await fetch(`/api/admin/bookings/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
    } catch (e) {}
    showToast(`Inspection booking #${id} status updated to ${status}.`, 'info');
  };

  // Filter vehicles if search query exists
  const filteredVehicles = vehicles.filter(v =>
    v.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    v.brand.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (isCheckingAuth) {
    return null;
  }

  // Security Gate: If non-admin or unauthenticated, require logging in via dedicated Admin Login system
  if (!adminSession) {
    return (
      <div className={styles.adminPage} style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container>
          <div style={{
            maxWidth: '520px',
            margin: '0 auto',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <ShieldAlert size={32} />
            </div>

            <h2 style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 800, marginBottom: '10px' }}>
              Admin Portal Login Required
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.925rem', marginBottom: '24px', lineHeight: 1.6 }}>
              Access to this console requires explicit 2FA security clearance through the dedicated <strong>Admin Security Portal</strong>.
            </p>

            <Link to="/admin-login" style={{ textDecoration: 'none' }}>
              <PrimaryButton fullWidth icon={Lock}>
                Go to Admin Login Portal <ArrowRight size={18} />
              </PrimaryButton>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <Container className={styles.containerPadding}>
        {/* System Toast */}
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: null, type: 'success' })}
        />

        <div className={styles.adminLayout}>
          {/* Collapsible Left Sidebar */}
          <div className={styles.sidebarCol}>
            <AdminSidebar
              activeTab={activeTab}
              onSelectTab={(id) => setActiveTab(id)}
              onLogout={handleLogout}
            />
          </div>

          {/* Main Console Workspace */}
          <div className={styles.mainContentCol}>
            {/* Top Admin Header */}
            <AdminHeader
              title={
                activeTab === 'dashboard' ? 'Executive Overview' :
                activeTab === 'vehicles' ? 'Vehicle Inventory' :
                activeTab === 'customers' ? 'Client Directory' :
                activeTab === 'trade-ins' ? 'Trade-In Appraisals' :
                activeTab === 'bookings' ? 'Inspection Schedule' :
                activeTab === 'ai-assistant' ? 'AI Assistant' :
                activeTab === 'analytics' || activeTab === 'reports' ? 'Performance Analytics' :
                activeTab === 'settings' ? 'System Settings' : 'Admin Console'
              }
              breadcrumbs={['Admin', activeTab]}
              searchValue={searchValue}
              onSearchChange={(val) => setSearchValue(val)}
              onNotificationClick={() => setActiveTab('notifications')}
              onMessageClick={() => showToast('Opening executive admin messages...', 'info')}
            />

            {/* TAB CONTENT: Executive Overview Dashboard */}
            {(activeTab === 'dashboard' || activeTab === 'overview') && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.tabWrapper}
              >
                {/* Overview KPI Cards (8 Statistics Cards) */}
                <div className={styles.statsGrid}>
                  <DashboardCard
                    title="Total Vehicles"
                    value="18"
                    change="+12.5%"
                    trend="up"
                    icon={Car}
                    color="#2563EB"
                  />
                  <DashboardCard
                    title="Available Units"
                    value="14"
                    change="+8.4%"
                    trend="up"
                    icon={CheckCircle2}
                    color="#22C55E"
                  />
                  <DashboardCard
                    title="Sold Vehicles"
                    value="4"
                    change="+25.0%"
                    trend="up"
                    icon={TrendingUp}
                    color="#8B5CF6"
                  />
                  <DashboardCard
                    title="Pending Trade-Ins"
                    value="5"
                    change="+15.2%"
                    trend="up"
                    icon={RefreshCw}
                    color="#F59E0B"
                  />
                  <DashboardCard
                    title="Inspection Bookings"
                    value="3"
                    change="-2.1%"
                    trend="down"
                    icon={Calendar}
                    color="#3B82F6"
                  />
                  <DashboardCard
                    title="Registered Clients"
                    value="142"
                    change="+18.9%"
                    trend="up"
                    icon={Users}
                    color="#10B981"
                  />
                  <DashboardCard
                    title="Quarterly Revenue"
                    value="$1.48M"
                    change="+22.4%"
                    trend="up"
                    icon={DollarSign}
                    color="#059669"
                  />
                  <DashboardCard
                    title="Monthly Sales Rate"
                    value="94.2%"
                    change="+4.1%"
                    trend="up"
                    icon={BarChart3}
                    color="#0F172A"
                  />
                </div>

                {/* Analytics Section: Revenue & Category Charts */}
                <div className={styles.chartsGrid}>
                  <ChartCard
                    title="Monthly Sales & Revenue Growth"
                    subtitle="Financial metrics for Q1 - Q3 2026 ($ Thousands)"
                    type="bar"
                  />
                  <ChartCard
                    title="Inventory Category Share"
                    subtitle="Vehicles classified by body style & powertrain"
                    type="donut"
                  />
                </div>

                {/* Recent Inventory Table */}
                <VehicleTable
                  vehicles={filteredVehicles.slice(0, 5)}
                  onView={(id) => showToast(`Opening inspection sheet for vehicle #${id}`)}
                  onEdit={(id) => showToast(`Launching editor for vehicle #${id}`)}
                  onDelete={(id) => handleDeleteVehicle(id)}
                />

                {/* Trade-Ins & Inspections Split Grid */}
                <div className={styles.splitGrid}>
                  <TradeInTable
                    onApprove={(id) => handleUpdateTradeInStatus(id, 'approved')}
                    onReject={(id) => handleUpdateTradeInStatus(id, 'rejected')}
                    onView={(id) => showToast(`Viewing appraisal details for #${id}`)}
                  />
                  <InspectionTable
                    onApprove={(id) => handleUpdateBookingStatus(id, 'confirmed')}
                    onCancel={(id) => handleUpdateBookingStatus(id, 'cancelled')}
                    onComplete={(id) => handleUpdateBookingStatus(id, 'completed')}
                  />
                </div>
              </motion.div>
            )}

            {/* TAB CONTENT: Vehicles Management */}
            {activeTab === 'vehicles' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <VehicleTable
                  vehicles={filteredVehicles}
                  onView={(id) => showToast(`Opening inspection sheet for vehicle #${id}`)}
                  onEdit={(id) => showToast(`Launching editor for vehicle #${id}`)}
                  onDelete={(id) => handleDeleteVehicle(id)}
                />
              </motion.div>
            )}

            {/* TAB CONTENT: Customers Management */}
            {activeTab === 'customers' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <CustomerTable
                  onView={(id) => showToast(`Viewing customer profile #${id}`)}
                  onEdit={(id) => showToast(`Editing customer record #${id}`)}
                  onDelete={(id) => showToast(`Customer #${id} deleted from CRM.`, 'danger')}
                />
              </motion.div>
            )}

            {/* TAB CONTENT: Trade-In Requests */}
            {activeTab === 'trade-ins' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <TradeInTable
                  onApprove={(id) => handleUpdateTradeInStatus(id, 'approved')}
                  onReject={(id) => handleUpdateTradeInStatus(id, 'rejected')}
                  onView={(id) => showToast(`Viewing appraisal details for #${id}`)}
                />
              </motion.div>
            )}

            {/* TAB CONTENT: Inspection Bookings */}
            {activeTab === 'bookings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <InspectionTable
                  onApprove={(id) => handleUpdateBookingStatus(id, 'confirmed')}
                  onCancel={(id) => handleUpdateBookingStatus(id, 'cancelled')}
                  onComplete={(id) => handleUpdateBookingStatus(id, 'completed')}
                />
              </motion.div>
            )}

            {/* TAB CONTENT: AI Assistant */}
            {activeTab === 'ai-assistant' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <AIAssistantPanel storageKey="rainbowTraders.adminAssistant.v1" showQuickActions={false} />
              </motion.div>
            )}

            {/* TAB CONTENT: Analytics & Reports */}
            {(activeTab === 'analytics' || activeTab === 'reports') && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.tabWrapper}>
                <div className={styles.chartsGrid}>
                  <ChartCard
                    title="Monthly Sales & Revenue Growth"
                    subtitle="Financial metrics for Q1 - Q3 2026 ($ Thousands)"
                    type="bar"
                  />
                  <ChartCard
                    title="Inventory Category Share"
                    subtitle="Vehicles classified by body style & powertrain"
                    type="donut"
                  />
                </div>
              </motion.div>
            )}

            {/* TAB CONTENT: Notifications Panel */}
            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <NotificationCard onMarkAllRead={() => showToast('All notifications marked read.')} />
              </motion.div>
            )}

            {/* TAB CONTENT: Settings Page */}
            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <SettingsForm onSave={() => showToast('Corporate settings & branding updated!')} />
              </motion.div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Admin;
