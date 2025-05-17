import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Footer } from '../components/layout/Footer';
import { styles } from '../styles/globalStyles';
import { distractionIcons } from '../components/svg/DistractionSvgs';

export const LandingPage = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate opacity for decorative elements based on scroll
  const decorationOpacity = Math.max(0, 1 - scrollY / 500);

  // Generate random positions for distraction icons
  const generateRandomPositions = () => {
    return distractionIcons.map((icon, index) => {
      // Create a spiral-like pattern around the hero section
      const angle = (index / distractionIcons.length) * Math.PI * 2;
      const radius = 300 + Math.random() * 100;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      return {
        icon,
        position: { x, y },
        size: 24 + Math.floor(Math.random() * 16), // Random size between 24-40
        delay: index * 0.1,
        opacity: Math.random() * 0.3 + 0.2, // Random opacity between 0.2-0.5
      };
    });
  };

  const distractionElements = generateRandomPositions();

  return (
    <div style={{ backgroundColor: styles.colors.background, color: styles.colors.textPrimary, minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        ...styles.layout.section,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative SVG Elements */}
        <motion.div
          style={{
            position: 'absolute',
            left: 0,
            top: '20%',
            opacity: decorationOpacity,
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: decorationOpacity, x: 0 }}
          transition={{ duration: 1 }}
        >
          <svg width="300" height="500" viewBox="0 0 300 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="0" cy="250" r="150" fill={`${styles.colors.primary}10`} />
            <circle cx="50" cy="200" r="100" fill={`${styles.colors.primary}15`} />
            <circle cx="100" cy="300" r="50" fill={`${styles.colors.primary}20`} />
            <path d="M50,100 Q150,200 100,300 T150,400" stroke={styles.colors.primary} strokeWidth="2" strokeDasharray="5,5" fill="none" />
          </svg>
        </motion.div>

        <motion.div
          style={{
            position: 'absolute',
            right: 0,
            top: '30%',
            opacity: decorationOpacity,
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: decorationOpacity, x: 0 }}
          transition={{ duration: 1 }}
        >
          <svg width="300" height="500" viewBox="0 0 300 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="300" cy="250" r="150" fill={`${styles.colors.secondary}10`} />
            <circle cx="250" cy="200" r="100" fill={`${styles.colors.secondary}15`} />
            <circle cx="200" cy="300" r="50" fill={`${styles.colors.secondary}20`} />
            <path d="M250,100 Q150,200 200,300 T150,400" stroke={styles.colors.secondary} strokeWidth="2" strokeDasharray="5,5" fill="none" />
          </svg>
        </motion.div>

        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: decorationOpacity,
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: decorationOpacity, y: 0 }}
          transition={{ duration: 1 }}
        >
          <svg width="600" height="300" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="300" cy="300" r="150" fill={`${styles.colors.primary}05`} />
            <circle cx="300" cy="300" r="100" fill={`${styles.colors.primary}10`} />
            <circle cx="300" cy="300" r="50" fill={`${styles.colors.primary}15`} />
            <path d="M150,250 Q300,150 450,250" stroke={styles.colors.primary} strokeWidth="2" strokeDasharray="5,5" fill="none" />
            <path d="M200,280 Q300,200 400,280" stroke={styles.colors.secondary} strokeWidth="2" strokeDasharray="5,5" fill="none" />
          </svg>
        </motion.div>

        {/* Distraction SVGs */}
        {distractionElements.map((element, index) => {
          const { icon, position, size, delay, opacity } = element;
          const { Icon, color, name } = icon;

          return (
            <motion.div
              key={`distraction-${index}`}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                opacity: decorationOpacity * opacity,
                pointerEvents: 'none',
                zIndex: 5,
              }}
              initial={{
                opacity: 0,
                x: 0,
                y: 0,
                rotate: Math.random() * 360
              }}
              animate={{
                opacity: decorationOpacity * opacity,
                x: position.x,
                y: position.y,
                rotate: Math.random() * 360
              }}
              transition={{
                duration: 1.5,
                delay: delay,
                ease: "easeOut"
              }}
            >
              <div style={{ transform: 'translate(-50%, -50%)' }}>
                <Icon size={size} color={color} />
              </div>
            </motion.div>
          );
        })}

        <div style={{ ...styles.layout.container, ...styles.layout.textCenter, zIndex: 10 }}>
          <motion.h1
            style={styles.typography.h1}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            MindIt
          </motion.h1>

          <motion.h2
            style={{ ...styles.typography.h2, marginBottom: styles.spacing.md }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Keep your habits in mind.
          </motion.h2>

          <motion.p
            style={{ ...styles.typography.bodyLarge, maxWidth: '600px', margin: `0 auto ${styles.spacing.md}` }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform tiny daily actions into life-changing routines.
          </motion.p>

          <motion.p
            style={{
              ...styles.typography.body,
              maxWidth: '600px',
              margin: `0 auto ${styles.spacing.xl}`,
              color: styles.colors.primary,
              fontStyle: 'italic'
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Break free from distractions. Build habits that matter.
          </motion.p>

          <motion.button
            style={{ ...styles.components.button.base, ...styles.components.button.primary }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ y: -5, boxShadow: styles.shadows.lg }}
            whileTap={{ y: 0, boxShadow: styles.shadows.sm }}
            onClick={onGetStarted}
          >
            Get Started
          </motion.button>
        </div>

        <motion.div
          style={{
            position: 'absolute',
            bottom: styles.spacing.xl,
            left: '50%',
            transform: 'translateX(-50%)',
            color: styles.colors.primary,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5"></path>
            <path d="M7 6l5 5 5-5"></path>
          </svg>
        </motion.div>
      </section>

      {/* How MindIt Works Section */}
      <section style={{ ...styles.layout.section, backgroundColor: styles.colors.surface }}>
        <div style={styles.layout.container}>
          <motion.h2
            style={{ ...styles.typography.h2, ...styles.layout.textCenter }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How MindIt Works
          </motion.h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: styles.spacing.xl,
            marginTop: styles.spacing.xxl
          }}>
            {/* Step 1 */}
            <motion.div
              style={styles.components.card.base}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={styles.components.card.hover}
            >
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: `${styles.colors.primary}10`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: styles.spacing.lg
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={styles.colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <h3 style={styles.typography.h3}>Define Your Intentions</h3>
              <p style={styles.typography.body}>Choose habits that matter—hydration, reading, mindful breaths.</p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              style={styles.components.card.base}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={styles.components.card.hover}
            >
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: `${styles.colors.primary}10`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: styles.spacing.lg
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={styles.colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 style={styles.typography.h3}>Track Each Day</h3>
              <p style={styles.typography.body}>Tap your HabitCard; watch the progress strip fill with a gentle animation.</p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              style={styles.components.card.base}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={styles.components.card.hover}
            >
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: `${styles.colors.primary}10`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: styles.spacing.lg
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={styles.colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 style={styles.typography.h3}>See Your Growth</h3>
              <p style={styles.typography.body}>Explore your 'Memory Map' heatmap and unlock 🔥 streak badges.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Butterfly Effect Section */}
      <section style={styles.layout.section}>
        <div style={styles.layout.container}>
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={styles.typography.h2}>The Butterfly Effect</h2>
            <p style={styles.typography.body}>
              Just as a butterfly's wingbeat can spark a distant storm, a single checkmark in MindIt can cascade into profound change.
            </p>
            <motion.div
              style={{
                ...styles.components.card.base,
                width: '100%',
                marginTop: styles.spacing.lg,
                padding: styles.spacing.xl
              }}
              whileHover={styles.components.card.hover}
            >
              <p style={{ ...styles.typography.body, marginBottom: 0 }}>
                You 'MindIt' an extra glass of water. Better hydration → more energy → sharper focus at work → calmer evenings → deeper sleep.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{
        ...styles.layout.section,
        backgroundColor: `${styles.colors.primary}10`,
        textAlign: 'center'
      }}>
        <div style={styles.layout.container}>
          <motion.h2
            style={styles.typography.h2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to let your daily choices take flight?
          </motion.h2>

          <motion.p
            style={styles.typography.body}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Watch the ripple effects transform your life.
          </motion.p>

          <motion.button
            style={{ ...styles.components.button.base, ...styles.components.button.primary }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5, boxShadow: styles.shadows.lg }}
            whileTap={{ y: 0, boxShadow: styles.shadows.sm }}
            onClick={onGetStarted}
          >
            Get Started with MindIt
          </motion.button>
        </div>
      </section>

      <Footer />
    </div>
  );
};
