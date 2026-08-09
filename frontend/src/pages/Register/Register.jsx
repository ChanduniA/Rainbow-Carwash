import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserCheck, ArrowRight, Car, Phone, AlertCircle, CheckCircle2, Loader } from 'lucide-react';
import Container from '../../components/Container/Container';
import Card from '../../components/Card/Card';
import Input from '../../components/Input/Input';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import styles from '../Login/Login.module.css'; // Reuse auth layout styling
import registerStyles from './Register.module.css';

const BACKEND_URL = ''; // Vite proxy forwards /api/* to http://localhost:5000

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });

      const data = await response.json();

      if (!response.ok) {
        // Server returned an error (400, 409, 500, etc.)
        setError(data.message || 'Registration failed. Please try again.');
        return;
      }

      // Success — show message then redirect
      setSuccess(data.message || 'Account created successfully!');
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);

    } catch (err) {
      // Network error (backend not running, etc.)
      setError('Unable to connect to the server. Please make sure the backend is running on port 5000.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authWrapper}>
      <Container className={styles.container}>
        <div className={styles.authCardWrapper}>
          <Card className={styles.authCard}>
            <div className={styles.logoRow}>
              <div className={styles.logoIcon}>
                <Car size={26} />
              </div>
              <div className={styles.logoText}>
                <span className={styles.brandTitle}>Rainbow</span>
                <span className={styles.brandSubtitle}>Traders</span>
              </div>
            </div>

            <h2 className={styles.title}>Create Your Account</h2>
            <p className={styles.subtitle}>Join Rainbow Traders to experience AI-powered car trading, digital appraisals & instant bookings.</p>

            {/* Error Message */}
            {error && (
              <div className={registerStyles.alertError}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className={registerStyles.alertSuccess}>
                <CheckCircle2 size={18} />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <Input
                label="Full Name"
                type="text"
                placeholder="Alexander Wright"
                value={name}
                onChange={(e) => setName(e.target.value)}
                icon={User}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                icon={Phone}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={Lock}
                required
              />

              <PrimaryButton type="submit" fullWidth icon={isLoading ? Loader : UserCheck} disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Register Account'}
              </PrimaryButton>
            </form>

            <div className={styles.footerRow}>
              <p>Already have an account?</p>
              <Link to="/login" className={styles.signupLink}>
                Sign In <ArrowRight size={14} />
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Register;
