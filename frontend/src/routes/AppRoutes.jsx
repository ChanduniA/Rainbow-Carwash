import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Loader from '../components/Loader/Loader';
import NotFoundComponent from '../components/NotFoundComponent/NotFoundComponent';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

// Lazy loaded page modules for optimal code splitting & performance
const Home = lazy(() => import('../pages/Home/Home'));
const Inventory = lazy(() => import('../pages/Inventory/Inventory'));
const VehicleDetail = lazy(() => import('../pages/VehicleDetail/VehicleDetail'));
const TradeIn = lazy(() => import('../pages/TradeIn/TradeIn'));
const Inspection = lazy(() => import('../pages/Inspection/Inspection'));
const AIAssistant = lazy(() => import('../pages/AIAssistant/AIAssistant'));
const Login = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Register/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const AdminLogin = lazy(() => import('../pages/AdminLogin/AdminLogin'));
const About = lazy(() => import('../pages/About/About'));
const Contact = lazy(() => import('../pages/Contact/Contact'));

const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader fullPage text="Initializing Rainbow Traders Engine..." />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="vehicle/:id" element={<VehicleDetail />} />
            <Route path="trade-in" element={<TradeIn />} />
            <Route path="inspection" element={<Inspection />} />
            <Route path="ai-assistant" element={<AIAssistant />} />
            <Route path="login" element={<Login />} />
            <Route path="loggin" element={<Login />} />
            <Route path="log-in" element={<Login />} />
            <Route path="signin" element={<Login />} />
            <Route path="sign-in" element={<Login />} />
            <Route path="admin-login" element={<AdminLogin />} />
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin" element={<Admin />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFoundComponent />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
