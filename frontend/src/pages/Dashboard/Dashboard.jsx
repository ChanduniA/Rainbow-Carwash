import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  RefreshCw,
  Calendar,
  MessageSquare,
  Car,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Container from '../../components/Container/Container';
import DashboardSidebar from '../../components/DashboardSidebar/DashboardSidebar';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import StatCard from '../../components/StatCard/StatCard';
import BookingTable from '../../components/BookingTable/BookingTable';
import TradeInCard from '../../components/TradeInCard/TradeInCard';
import SavedVehicleCard from '../../components/SavedVehicleCard/SavedVehicleCard';
import NotificationCard from '../../components/NotificationCard/NotificationCard';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { vehiclesData } from '../../data/vehicles';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchValue, setSearchValue] = useState('');
  const [savedVehicles, setSavedVehicles] = useState(vehiclesData.slice(0, 3));
  const [tradeInRequests, setTradeInRequests] = useState([]);
  const [inspectionBookings, setInspectionBookings] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // Fetch trade-in requests for this user
        const fetchTradeIns = async () => {
          try {
            const userId = parsedUser.email || 'guest';
            const res = await fetch(`/api/trade-in/user/${userId}`);
            const json = await res.json();
            
            if (json.success && json.data) {
              // Map backend data to TradeInCard format
              const formattedTrades = json.data.map(item => ({
                id: item.id,
                vehicle: `${item.year || ''} ${item.brand || ''} ${item.model || ''}`.trim(),
                image: (item.images && item.images.length > 0) ? item.images[0].url : 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=400&q=80',
                expectedPrice: parseInt(item.expectedPrice || 0),
                offeredPrice: null, // Since it's pending, no offer yet
                submittedDate: new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                status: item.status === 'pending' ? 'In Desk Review' : 'Valuation Complete',
                progress: item.status === 'pending' ? 45 : 100
              }));
              setTradeInRequests(formattedTrades);
            }
          } catch (error) {
            console.error('Failed to fetch trade-in requests', error);
          }
        };

        const fetchInspections = async () => {
          try {
            const userId = parsedUser.email || 'guest';
            const res = await fetch(`/api/inspection/user/${userId}`);
            const json = await res.json();

            if (json.success && json.data) {
              const formattedInspections = json.data.map(item => ({
                id: item.id,
                vehicle: `${item.vehicle?.year || ''} ${item.vehicle?.brand || ''} ${item.vehicle?.model || ''}`.trim(),
                image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=400&q=80',
                date: `${new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at ${item.time}`,
                branch: item.branchId === 'b1' ? 'Miami Flagship Center' : 'Orlando Luxury Lounge',
                status: item.status === 'confirmed' ? 'Confirmed' : 'Pending',
                statusType: item.status === 'confirmed' ? 'success' : 'warning'
              }));
              setInspectionBookings(formattedInspections);
            }
          } catch (error) {
            console.error('Failed to fetch inspection bookings', error);
          }
        };

        fetchTradeIns();
        fetchInspections();
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRemoveSavedVehicle = (id) => {
    setSavedVehicles((prev) => prev.filter((v) => v.id !== id));
    showToast('Vehicle removed from saved collection.');
  };

  const handleLogout = () => {
    showToast('Logging out of Rainbow Traders Account...');
    localStorage.removeItem('user');
    setTimeout(() => {
      window.location.href = '/login';
    }, 1500);
  };

  return (
    <div className={styles.dashboardPage}>
      <Container className={styles.containerPadding}>
        {/* Notification Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              className={styles.toast}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CheckCircle2 size={18} />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={styles.dashboardLayout}>
          {/* Left Navigation Sidebar */}
          <div className={styles.sidebarCol}>
            <DashboardSidebar
              activeTab={activeTab}
              onSelectTab={(tabId) => setActiveTab(tabId)}
              onLogout={handleLogout}
            />
          </div>

          {/* Main Dashboard Workspace */}
          <div className={styles.mainContentCol}>
            {/* Header Component */}
            <DashboardHeader
              customerName={user ? user.name : "Guest"}
              searchValue={searchValue}
              onSearchChange={(val) => setSearchValue(val)}
              onNotificationClick={() => setActiveTab('notifications')}
            />

            {/* TAB CONTENT: Overview Dashboard */}
            {(activeTab === 'dashboard' || activeTab === 'overview') && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.tabSection}
              >
                {/* Overview Stat Cards Grid (6 Cards) */}
                <div className={styles.statsGrid}>
                  <StatCard
                    title="Saved Vehicles"
                    value={savedVehicles.length}
                    subtext="3 Price drop alerts pending"
                    icon={Heart}
                    color="#EF4444"
                    trend="+2 this week"
                  />
                  <StatCard
                    title="Trade-In Requests"
                    value={`${tradeInRequests.length} Active`}
                    subtext="Processing valuations"
                    icon={RefreshCw}
                    color="#F59E0B"
                    trend={tradeInRequests.length > 0 ? 'Valuation Ready' : 'No requests'}
                  />
                  <StatCard
                    title="Upcoming Inspections"
                    value={`${inspectionBookings.length} Confirmed`}
                    subtext="Service center bookings"
                    icon={Calendar}
                    color="#2563EB"
                    trend={inspectionBookings.length > 0 ? 'Pass Issued' : 'No bookings'}
                  />
                  <StatCard
                    title="Unread Messages"
                    value="4 Messages"
                    subtext="From Concierge & Valuations"
                    icon={MessageSquare}
                    color="#8B5CF6"
                  />
                  <StatCard
                    title="Owned Garage"
                    value="2 Cars"
                    subtext="2023 Porsche, 2024 BMW"
                    icon={Car}
                    color="#22C55E"
                  />
                  <StatCard
                    title="Recent Activity"
                    value="12 Actions"
                    subtext="Last login 2 hours ago"
                    icon={Activity}
                    color="#0F172A"
                  />
                </div>

                {/* Main Middle Row: Recent Bookings Table & Trade-In Requests */}
                <div className={styles.middleGrid}>
                  <div className={styles.tableBlock}>
                    <BookingTable
                      bookings={inspectionBookings}
                      onViewPass={() => showToast('Displaying digital inspection pass...')}
                      onCancel={() => showToast('Inspection cancelled.')}
                    />
                  </div>

                  <div className={styles.tradeBlock}>
                    <TradeInCard
                      tradeIns={tradeInRequests}
                      onViewDetails={() => showToast('Opening valuation certificate...')}
                    />
                  </div>
                </div>

                {/* Bottom Row: Saved Vehicles & Notifications */}
                <div className={styles.bottomGrid}>
                  <div className={styles.savedSection}>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.sectionTitle}>Saved Vehicles</h3>
                      <button
                        type="button"
                        className={styles.viewAllBtn}
                        onClick={() => setActiveTab('saved-vehicles')}
                      >
                        View All ({savedVehicles.length}) &rarr;
                      </button>
                    </div>
                    <div className={styles.savedGrid}>
                      {savedVehicles.map((vehicle) => (
                        <SavedVehicleCard
                          key={vehicle.id}
                          vehicle={vehicle}
                          onRemove={handleRemoveSavedVehicle}
                          onViewDetails={() => showToast(`Opening details for ${vehicle.name}`)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB CONTENT: Saved Vehicles Grid */}
            {activeTab === 'saved-vehicles' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Saved Vehicles ({savedVehicles.length})</h3>
                </div>
                <div className={styles.savedGrid}>
                  {savedVehicles.map((vehicle) => (
                    <SavedVehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      onRemove={handleRemoveSavedVehicle}
                      onViewDetails={() => showToast(`Opening details for ${vehicle.name}`)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB CONTENT: Inspection Bookings */}
            {activeTab === 'inspections' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <BookingTable
                  bookings={inspectionBookings}
                  onViewPass={() => showToast('Displaying digital inspection pass...')}
                  onCancel={() => showToast('Inspection cancelled.')}
                />
              </motion.div>
            )}

            {/* TAB CONTENT: Trade-In Requests */}
            {activeTab === 'trade-ins' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <TradeInCard 
                  tradeIns={tradeInRequests} 
                  onViewDetails={() => showToast('Opening valuation certificate...')} 
                />
              </motion.div>
            )}

            {/* TAB CONTENT: Notifications */}
            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <NotificationCard onMarkAllRead={() => showToast('All notifications marked as read.')} />
              </motion.div>
            )}

            {/* TAB CONTENT: Profile & Settings */}
            {(activeTab === 'profile' || activeTab === 'settings') && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <ProfileCard onEdit={() => showToast('Profile editor modal launched.')} />
              </motion.div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
