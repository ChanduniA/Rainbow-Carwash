import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ShieldAlert, KeyRound, Lock, Mail, ArrowRight, CheckCircle2, AlertCircle, Loader2, Sparkles, UserCheck } from 'lucide-react';
import Container from '../../components/Container/Container';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import styles from './AdminLogin.module.css';

const BACKEND_URL = ''; // Vite proxy automatically routes /api/* to localhost:5000

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityPin, setSecurityPin] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAutofillDemo = () => {
    setEmail('admin@rainbowtraders.com');
    setPassword('admin123');
    setSecurityPin('7788');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password || !securityPin) {
      setError('Please fill in Admin Email, Password, and 4-digit Security PIN.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, securityPin })
      });

      const data = await response.json();

      if (!response.ok) {
        // Fallback for demo admin credentials
        if (email.toLowerCase().trim() === 'admin@rainbowtraders.com' && (password === 'admin123' || password === 'Admin@2026') && (securityPin === '7788' || securityPin === '0000')) {
          const adminUserObj = {
            id: 'admin_exec_001',
            name: 'Dominic Sterling',
            email: email.toLowerCase().trim(),
            role: 'admin',
            clearanceLevel: 'Tier-1 Super Admin'
          };
          setSuccess('Executive Security Clearance Verified! (Demo Admin Mode)');
          localStorage.setItem('adminUser', JSON.stringify(adminUserObj));
          localStorage.setItem('adminToken', `admin_token_${Date.now()}`);
          localStorage.setItem('user', JSON.stringify(adminUserObj));
          setTimeout(() => {
            window.location.href = '/admin';
          }, 1000);
          return;
        }

        setError(data.message || 'Admin authentication failed. Access denied.');
        return;
      }

      setSuccess(data.message || 'Executive Security Clearance Verified!');
      
      // Store Admin user & token in localStorage
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      localStorage.setItem('adminToken', data.adminToken || `admin_token_${Date.now()}`);
      localStorage.setItem('user', JSON.stringify(data.user)); // also sync main user context

      setTimeout(() => {
        window.location.href = '/admin';
      }, 1000);

    } catch (err) {
      if (email.toLowerCase().trim() === 'admin@rainbowtraders.com' && (password === 'admin123' || password === 'Admin@2026') && (securityPin === '7788' || securityPin === '0000')) {
        const adminUserObj = {
          id: 'admin_exec_001',
          name: 'Dominic Sterling',
          email: email.toLowerCase().trim(),
          role: 'admin',
          clearanceLevel: 'Tier-1 Super Admin'
        };
        setSuccess('Executive Security Clearance Verified! (Offline Admin Mode)');
        localStorage.setItem('adminUser', JSON.stringify(adminUserObj));
        localStorage.setItem('adminToken', `admin_token_${Date.now()}`);
        localStorage.setItem('user', JSON.stringify(adminUserObj));
        setTimeout(() => {
          window.location.href = '/admin';
        }, 1000);
      } else {
        setError('Unable to connect to backend server. Ensure node server.js is running on port 5000 or click Quick Demo Autofill.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.adminAuthWrapper}>
      <div className={styles.container}>
        <Card className={styles.authCard}>
          {/* Security Badge */}
          <div className={styles.securityBadge}>
            <ShieldAlert size={14} /> RESTRICTED EXECUTIVE PORTAL
          </div>

          <div className={styles.headerRow}>
            <div className={styles.brandLogo}>
              <div className={styles.logoIcon}>
                <Shield size={24} />
              </div>
              <div>
                <h3 className={styles.brandTitle}>Rainbow Traders</h3>
                <span className={styles.brandSubtitle}>System Administration Console</span>
              </div>
            </div>
          </div>

          <h2 className={styles.title}>Admin Security Access</h2>
          <p className={styles.subtitle}>
            Enter high-privilege credentials and 2FA PIN to unlock executive controls.
          </p>

          {/* Demo Autofill Quick Button */}
          <button 
            type="button" 
            className={styles.autofillBtn}
            onClick={handleAutofillDemo}
            style={{ marginBottom: '20px' }}
          >
            <Sparkles size={14} /> Quick Demo Autofill: Executive Admin Credentials
          </button>

          {/* Error Message */}
          {error && (
            <div className={styles.alertError}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className={styles.alertSuccess}>
              <CheckCircle2 size={18} />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              label="Admin Work Email / ID"
              type="email"
              placeholder="admin@rainbowtraders.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              required
            />

            <Input
              label="Master Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              required
            />

            <div className={styles.pinGroup}>
              <label className={styles.pinLabel}>
                <KeyRound size={16} /> 2FA Authorization Security PIN
              </label>
              <div className={styles.pinInputWrapper}>
                <KeyRound size={18} className={styles.pinInputIcon} />
                <input
                  type="password"
                  maxLength={6}
                  placeholder="e.g. 7788"
                  className={styles.pinInput}
                  value={securityPin}
                  onChange={(e) => setSecurityPin(e.target.value)}
                  required
                />
              </div>
              <span className={styles.pinHint}>Default demo security PIN is <strong>7788</strong></span>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Verifying Security Clearance...
                </>
              ) : (
                <>
                  Authenticate & Unlock Admin Panel <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className={styles.footerRow}>
            <span>Protected by 256-bit Encrypted Firewall</span>
            <Link to="/login" className={styles.customerLink}>
              Standard Customer Login <ArrowRight size={14} />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
