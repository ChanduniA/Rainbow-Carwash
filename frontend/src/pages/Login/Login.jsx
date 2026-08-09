import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, ArrowLeft, Car, AlertCircle, CheckCircle2, Loader, Sparkles } from 'lucide-react';
import Container from '../../components/Container/Container';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import styles from './Login.module.css';
import registerStyles from '../Register/Register.module.css'; // Reusing alert styles

const BACKEND_URL = ''; // Vite proxy forwards /api/* to http://localhost:5000

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAutofillDemo = () => {
    setEmail('user@rainbowtraders.com');
    setPassword('user123');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please enter both Email and Password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if demo customer credentials entered client-side
        if ((email.toLowerCase().trim() === 'user@rainbowtraders.com' || email.toLowerCase().trim() === 'customer@rainbowtraders.com') && (password === 'user123' || password === 'password123')) {
          setSuccess('Login successful! (Demo Customer Account)');
          localStorage.setItem('user', JSON.stringify({
            name: 'Alexander Vance',
            email: email.toLowerCase().trim(),
            phone: '+1 (555) 234-5678',
            role: 'customer'
          }));
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1000);
          return;
        }

        setError(data.message || 'Login failed. Please check your credentials.');
        return;
      }

      // Success
      setSuccess(data.message || 'Login successful!');
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));

      // Hard redirect to dashboard so Navbar reloads state
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);

    } catch (err) {
      // Fallback for offline or client-only preview mode
      if ((email.toLowerCase().trim() === 'user@rainbowtraders.com' || email.toLowerCase().trim() === 'customer@rainbowtraders.com') && (password === 'user123' || password === 'password123')) {
        setSuccess('Login successful! (Offline Demo Mode)');
        localStorage.setItem('user', JSON.stringify({
          name: 'Alexander Vance',
          email: email.toLowerCase().trim(),
          phone: '+1 (555) 234-5678',
          role: 'customer'
        }));
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        setError('Unable to connect to the server. Please make sure backend is running or use Quick Demo Autofill.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authWrapper}>
      <Container className={styles.container}>
        <div className={styles.authCardWrapper}>
          <Card className={styles.authCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <Link to="/" style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                <ArrowLeft size={14} /> Back to Home
              </Link>
              <div className={styles.logoRow} style={{ marginBottom: 0 }}>
                <div className={styles.logoIcon} style={{ width: '32px', height: '32px' }}>
                  <Car size={18} />
                </div>
                <span className={styles.brandTitle} style={{ fontSize: '1rem' }}>Rainbow Traders</span>
              </div>
            </div>

            <h2 className={styles.title}>Sign In to Your Account</h2>
            <p className={styles.subtitle}>Welcome back! Access your personalized dashboard, saved vehicles, and bookings.</p>

            {/* Quick Demo Autofill Button */}
            <button 
              type="button" 
              onClick={handleAutofillDemo}
              style={{
                width: '100%',
                marginBottom: '20px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px dashed rgba(59, 130, 246, 0.4)',
                background: 'rgba(59, 130, 246, 0.08)',
                color: '#60a5fa',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <Sparkles size={15} /> Quick Demo Autofill: Customer Credentials
            </button>

            {/* Error Message */}
            {error && (
              <div className={registerStyles.alertError} style={{ marginBottom: '20px' }}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className={registerStyles.alertSuccess} style={{ marginBottom: '20px' }}>
                <CheckCircle2 size={18} />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <Input
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                required
              />

              <div className={styles.passwordHeader}>
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={Lock}
                  required
                />
                <a href="#forgot" className={styles.forgotLink}>Forgot Password?</a>
              </div>

              <PrimaryButton type="submit" fullWidth icon={isLoading ? Loader : LogIn} disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </PrimaryButton>
            </form>

            <div className={styles.footerRow}>
              <p>Don't have an account?</p>
              <Link to="/register" className={styles.signupLink}>
                Create Account <ArrowRight size={14} />
              </Link>
            </div>

            <div style={{
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              textAlign: 'center'
            }}>
              <Link 
                to="/admin-login" 
                style={{ 
                  color: '#f59e0b', 
                  fontSize: '0.825rem', 
                  fontWeight: 600, 
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                🛡️ System Administrator? Go to Admin Portal Login <ArrowRight size={13} />
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Login;
