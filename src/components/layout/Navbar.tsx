import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../../styles/globalStyles';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll position to add shadow and background opacity
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
    )},
    { id: 'weekly', label: 'Weekly', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    )},
    { id: 'monthly', label: 'Monthly', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"></path>
        <path d="M16 2v4"></path>
        <path d="M8 2v4"></path>
        <path d="M3 10h18"></path>
      </svg>
    )},
    { id: 'manage', label: 'Manage', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
      </svg>
    )},
    { id: 'analytics', label: 'Analytics', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    )},
    { id: 'settings', label: 'Settings', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    )},
  ];

  const navbarStyle = {
    position: 'fixed' as const,
    top: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '95%',
    maxWidth: '1200px',
    backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    padding: `${styles.spacing.md} ${styles.spacing.lg}`,
    zIndex: styles.zIndices.sticky,
    boxShadow: scrolled ? '0 10px 25px rgba(0, 0, 0, 0.1)' : '0 8px 15px rgba(0, 0, 0, 0.05)',
    borderRadius: '50px',
    transition: styles.transitions.medium,
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: styles.spacing.sm,
    fontWeight: styles.fontWeights.bold,
    fontSize: styles.fontSizes.xl,
    color: styles.colors.primary,
    cursor: 'pointer',
  };

  const navItemStyle = (isActive: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: styles.spacing.sm,
    padding: `${styles.spacing.sm} ${styles.spacing.md}`,
    borderRadius: styles.borderRadius.md,
    fontWeight: styles.fontWeights.medium,
    cursor: 'pointer',
    transition: styles.transitions.fast,
    backgroundColor: isActive ? `${styles.colors.primary}10` : 'transparent',
    color: isActive ? styles.colors.primary : styles.colors.textPrimary,
  });

  const mobileMenuButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: styles.borderRadius.md,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: styles.colors.textPrimary,
  };

  const mobileMenuStyle = {
    position: 'fixed' as const,
    top: '60px',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    boxShadow: styles.shadows.lg,
    padding: styles.spacing.md,
    zIndex: styles.zIndices.dropdown,
  };

  return (
    <motion.nav
      style={navbarStyle}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ ...styles.layout.container, ...styles.layout.flexRow, ...styles.layout.justifyBetween, ...styles.layout.alignCenter }}>
        {/* Logo */}
        <div style={logoStyle} onClick={() => onNavigate('dashboard')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill={styles.colors.primary} />
            <path d="M2 17L12 22L22 17" stroke={styles.colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke={styles.colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>MindIt</span>
        </div>

        {/* Desktop Navigation */}
        <div style={{ display: 'flex', gap: styles.spacing.md, '@media (max-width: 768px)': { display: 'none' } }}>
          {navItems.map((item) => (
            <motion.div
              key={item.id}
              style={navItemStyle(currentPage === item.id)}
              onClick={() => onNavigate(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div style={{ display: 'none', '@media (max-width: 768px)': { display: 'block' } }}>
          <button
            style={mobileMenuButtonStyle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          style={mobileMenuStyle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: styles.spacing.md }}>
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                style={navItemStyle(currentPage === item.id)}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
