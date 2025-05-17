import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../../styles/globalStyles';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerStyle = {
    ...styles.components.footer.base,
  };

  const containerStyle = {
    ...styles.layout.container,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: styles.spacing.xxl,
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: styles.spacing.sm,
    fontWeight: styles.fontWeights.bold,
    fontSize: styles.fontSizes.xl,
    color: styles.colors.primary,
    marginBottom: styles.spacing.lg,
  };

  const headingStyle = {
    fontSize: styles.fontSizes.lg,
    fontWeight: styles.fontWeights.semibold,
    color: 'white',
    marginBottom: styles.spacing.lg,
  };

  const linkStyle = {
    color: styles.colors.textSecondaryDark,
    textDecoration: 'none',
    marginBottom: styles.spacing.md,
    display: 'block',
    transition: styles.transitions.fast,
  };

  const socialIconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: styles.borderRadius.round,
    backgroundColor: `${styles.colors.primary}30`,
    color: styles.colors.primary,
    transition: styles.transitions.fast,
  };

  const copyrightStyle = {
    borderTop: `1px solid ${styles.colors.textSecondaryDark}30`,
    marginTop: styles.spacing.xl,
    paddingTop: styles.spacing.xl,
    color: styles.colors.textSecondaryDark,
    textAlign: 'center' as const,
    fontSize: styles.fontSizes.sm,
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* Logo and Description */}
        <div>
          <div style={logoStyle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill={styles.colors.primary} />
              <path d="M2 17L12 22L22 17" stroke={styles.colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke={styles.colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>MindIt</span>
          </div>
          <p style={{ color: styles.colors.textSecondaryDark, marginBottom: styles.spacing.lg }}>
            Transform tiny daily actions into life-changing routines with our habit tracking app.
          </p>
          <div style={{ display: 'flex', gap: styles.spacing.md }}>
            <motion.a 
              href="#" 
              style={socialIconStyle}
              whileHover={{ scale: 1.1, backgroundColor: `${styles.colors.primary}50` }}
              whileTap={{ scale: 0.9 }}
              aria-label="Twitter"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </motion.a>
            <motion.a 
              href="#" 
              style={socialIconStyle}
              whileHover={{ scale: 1.1, backgroundColor: `${styles.colors.primary}50` }}
              whileTap={{ scale: 0.9 }}
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </motion.a>
            <motion.a 
              href="#" 
              style={socialIconStyle}
              whileHover={{ scale: 1.1, backgroundColor: `${styles.colors.primary}50` }}
              whileTap={{ scale: 0.9 }}
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 style={headingStyle}>Features</h3>
          <motion.a 
            href="#" 
            style={linkStyle}
            whileHover={{ color: styles.colors.primary, x: 5 }}
          >
            Daily Tracking
          </motion.a>
          <motion.a 
            href="#" 
            style={linkStyle}
            whileHover={{ color: styles.colors.primary, x: 5 }}
          >
            Weekly Overview
          </motion.a>
          <motion.a 
            href="#" 
            style={linkStyle}
            whileHover={{ color: styles.colors.primary, x: 5 }}
          >
            Monthly Calendar
          </motion.a>
          <motion.a 
            href="#" 
            style={linkStyle}
            whileHover={{ color: styles.colors.primary, x: 5 }}
          >
            Analytics Dashboard
          </motion.a>
        </div>

        {/* Resources */}
        <div>
          <h3 style={headingStyle}>Resources</h3>
          <motion.a 
            href="#" 
            style={linkStyle}
            whileHover={{ color: styles.colors.primary, x: 5 }}
          >
            Blog
          </motion.a>
          <motion.a 
            href="#" 
            style={linkStyle}
            whileHover={{ color: styles.colors.primary, x: 5 }}
          >
            Help Center
          </motion.a>
          <motion.a 
            href="#" 
            style={linkStyle}
            whileHover={{ color: styles.colors.primary, x: 5 }}
          >
            Contact Us
          </motion.a>
          <motion.a 
            href="#" 
            style={linkStyle}
            whileHover={{ color: styles.colors.primary, x: 5 }}
          >
            FAQ
          </motion.a>
        </div>

        {/* Legal */}
        <div>
          <h3 style={headingStyle}>Legal</h3>
          <motion.a 
            href="#" 
            style={linkStyle}
            whileHover={{ color: styles.colors.primary, x: 5 }}
          >
            Terms of Service
          </motion.a>
          <motion.a 
            href="#" 
            style={linkStyle}
            whileHover={{ color: styles.colors.primary, x: 5 }}
          >
            Privacy Policy
          </motion.a>
          <motion.a 
            href="#" 
            style={linkStyle}
            whileHover={{ color: styles.colors.primary, x: 5 }}
          >
            Cookie Policy
          </motion.a>
        </div>
      </div>

      {/* Copyright */}
      <div style={copyrightStyle}>
        <p>© {currentYear} MindIt. All rights reserved.</p>
      </div>
    </footer>
  );
};
