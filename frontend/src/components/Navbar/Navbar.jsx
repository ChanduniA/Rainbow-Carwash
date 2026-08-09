import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Menu, X, Bot, Sparkles, UserCheck, LogIn, LogOut } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import Container from '../Container/Container';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user data');
      }
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminToken');
    setUser(null);
    window.location.href = '/login';
  };

  // Hide Navbar on Login, Register, and Admin Login pages (AFTER hooks)
  const authRoutes = ['/login', '/register', '/admin-login', '/admin/login', '/loggin', '/log-in', '/signin', '/sign-in'];
  if (authRoutes.includes(location.pathname)) {
    return null;
  }

  const isScrolled = scrollY > 20;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Inventory', path: '/inventory' },
    { name: 'Trade-In', path: '/trade-in', requireAuth: true },
    { name: 'Inspection', path: '/inspection', requireAuth: true },
    { name: 'AI Assistant', path: '/ai-assistant', badge: 'AI' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ].filter(link => !link.requireAuth || user);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <Container>
        <div className={styles.navInner}>
          {/* Logo */}
          <Link to="/" className={styles.logoLink} onClick={() => setIsMobileMenuOpen(false)}>
            <div className={styles.logoIcon}>
              <Car size={22} className={styles.carSvg} />
            </div>
            <div className={styles.logoText}>
              <span className={styles.brandTitle}>Rainbow</span>
              <span className={styles.brandSubtitle}>Traders</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                    }
                    end={link.path === '/'}
                  >
                    {link.name}
                    {link.badge && (
                      <span className={styles.badgeAI}>
                        <Sparkles size={10} /> {link.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Action Buttons */}
          <div className={styles.authButtons}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link to="/dashboard" className={styles.userProfileBadge}>
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
                    alt="Profile" 
                    className={styles.navAvatar} 
                  />
                  <span className={styles.navUserName}>{user.name.split(' ')[0]}</span>
                </Link>
                <SecondaryButton onClick={handleLogout} variant="outline" icon={LogOut}>
                  Logout
                </SecondaryButton>
              </div>
            ) : (
              <>
                <SecondaryButton to="/login" variant="outline" icon={LogIn}>
                  Login
                </SecondaryButton>
                <PrimaryButton to="/register" icon={UserCheck}>
                  Register
                </PrimaryButton>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className={styles.hamburgerBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.mobileDrawer}
          >
            <Container>
              <ul className={styles.mobileNavList}>
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `${styles.mobileNavLink} ${isActive ? styles.activeMobileLink : ''}`
                      }
                      end={link.path === '/'}
                    >
                      <span>{link.name}</span>
                      {link.badge && <span className={styles.badgeAI}>AI</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className={styles.mobileAuthGrid}>
                {user ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={styles.userProfileBadge} style={{ justifyContent: 'center' }}>
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" 
                        alt="Profile" 
                        className={styles.navAvatar} 
                      />
                      <span className={styles.navUserName}>{user.name.split(' ')[0]}</span>
                    </Link>
                    <SecondaryButton onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }} variant="outline" fullWidth icon={LogOut}>
                      Logout
                    </SecondaryButton>
                  </div>
                ) : (
                  <>
                    <SecondaryButton to="/login" onClick={() => setIsMobileMenuOpen(false)} variant="outline" fullWidth icon={LogIn}>
                      Login
                    </SecondaryButton>
                    <PrimaryButton to="/register" onClick={() => setIsMobileMenuOpen(false)} fullWidth icon={UserCheck}>
                      Register
                    </PrimaryButton>
                  </>
                )}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
