import React from 'react';
import { motion } from 'framer-motion';

// Define styles
const styles = {
  // Layout
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  section: {
    padding: '80px 0',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  textCenter: {
    textAlign: 'center' as const,
  },
  
  // Colors
  primary: '#3AA17E',
  achievement: '#FFC868',
  background: '#F0FAF9',
  surface: '#FFFFFF',
  textPrimary: '#2D3748',
  textSecondary: '#A0AEC0',
  
  // Typography
  h1: {
    fontSize: '4rem',
    fontWeight: 800,
    marginBottom: '1rem',
    background: 'linear-gradient(90deg, #3AA17E 0%, #FFC868 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
  },
  h2: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '1.5rem',
    color: '#2D3748',
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#2D3748',
  },
  body: {
    fontSize: '1.125rem',
    lineHeight: 1.6,
    color: '#A0AEC0',
    marginBottom: '1.5rem',
  },
  
  // Components
  button: {
    display: 'inline-block',
    padding: '14px 28px',
    backgroundColor: '#3AA17E',
    color: 'white',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 6px rgba(58, 161, 126, 0.2)',
    transition: 'all 0.2s ease',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    marginBottom: '20px',
  },
  iconContainer: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'rgba(58, 161, 126, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
};

export const NewLandingPage = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <div style={{ backgroundColor: styles.background, color: styles.textPrimary, minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ 
        ...styles.section, 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
      }}>
        <div style={{ ...styles.container, ...styles.textCenter }}>
          <motion.h1 
            style={styles.h1}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            MindIt
          </motion.h1>
          
          <motion.h2 
            style={{ ...styles.h2, marginBottom: '1rem' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Keep your habits in mind.
          </motion.h2>
          
          <motion.p 
            style={{ ...styles.body, maxWidth: '600px', margin: '0 auto 2rem' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform tiny daily actions into life-changing routines.
          </motion.p>
          
          <motion.button
            style={styles.button}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ y: -5, boxShadow: '0 6px 10px rgba(58, 161, 126, 0.3)' }}
            whileTap={{ y: 0, boxShadow: '0 2px 3px rgba(58, 161, 126, 0.2)' }}
            onClick={onGetStarted}
          >
            Get Started
          </motion.button>
        </div>
      </section>
      
      {/* How MindIt Works Section */}
      <section style={{ ...styles.section, backgroundColor: styles.surface }}>
        <div style={styles.container}>
          <motion.h2 
            style={{ ...styles.h2, ...styles.textCenter }}
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
            gap: '30px',
            marginTop: '40px'
          }}>
            {/* Step 1 */}
            <motion.div 
              style={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
            >
              <div style={styles.iconContainer}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={styles.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <h3 style={styles.h3}>Define Your Intentions</h3>
              <p style={styles.body}>Choose habits that matter—hydration, reading, mindful breaths.</p>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div 
              style={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
            >
              <div style={styles.iconContainer}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={styles.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 style={styles.h3}>Track Each Day</h3>
              <p style={styles.body}>Tap your HabitCard; watch the progress strip fill with a gentle animation.</p>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div 
              style={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
            >
              <div style={styles.iconContainer}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={styles.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 style={styles.h3}>See Your Growth</h3>
              <p style={styles.body}>Explore your 'Memory Map' heatmap and unlock 🔥 streak badges.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* The Butterfly Effect Section */}
      <section style={styles.section}>
        <div style={styles.container}>
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
            <h2 style={styles.h2}>The Butterfly Effect</h2>
            <p style={styles.body}>
              Just as a butterfly's wingbeat can spark a distant storm, a single checkmark in MindIt can cascade into profound change.
            </p>
            <motion.div 
              style={{ 
                ...styles.card, 
                width: '100%', 
                marginTop: '20px',
                padding: '30px'
              }}
              whileHover={{ y: -5, boxShadow: '0 8px 15px rgba(0, 0, 0, 0.1)' }}
            >
              <p style={{ ...styles.body, marginBottom: 0 }}>
                You 'MindIt' an extra glass of water. Better hydration → more energy → sharper focus at work → calmer evenings → deeper sleep.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section style={{ 
        ...styles.section, 
        backgroundColor: 'rgba(58, 161, 126, 0.1)',
        textAlign: 'center'
      }}>
        <div style={styles.container}>
          <motion.h2 
            style={styles.h2}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to let your daily choices take flight?
          </motion.h2>
          
          <motion.p 
            style={styles.body}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Watch the ripple effects transform your life.
          </motion.p>
          
          <motion.button
            style={styles.button}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5, boxShadow: '0 6px 10px rgba(58, 161, 126, 0.3)' }}
            whileTap={{ y: 0, boxShadow: '0 2px 3px rgba(58, 161, 126, 0.2)' }}
            onClick={onGetStarted}
          >
            Get Started with MindIt
          </motion.button>
        </div>
      </section>
    </div>
  );
};
