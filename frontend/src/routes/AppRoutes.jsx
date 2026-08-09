import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Loader from '../components/Loader/Loader';
import NotFoundComponent from '../components/NotFoundComponent/NotFoundComponent';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

// Lazy loaded page modules for optimal code splitting & performance
const Admin = lazy(() => import('../pages/Admin/Admin'));
const AdminLogin = lazy(() => import('../pages/AdminLogin/AdminLogin'));

const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader fullPage text="Initializing Rainbow Traders Engine..." />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<AdminLogin />} />
            <Route path="admin-login" element={<AdminLogin />} />
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<NotFoundComponent />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
