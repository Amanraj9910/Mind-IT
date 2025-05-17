// Global styles for consistent UI across the application

export const colors = {
  primary: '#3AA17E',
  primaryDark: '#2D8A6B',
  primaryLight: '#4DB792',
  secondary: '#FFC868',
  secondaryDark: '#E5B45E',
  secondaryLight: '#FFD68A',
  background: '#F0FAF9',
  backgroundDark: '#121A20',
  surface: '#FFFFFF',
  surfaceDark: '#1E2A35',
  error: '#E53E3E',
  errorDark: '#F56565',
  textPrimary: '#2D3748',
  textPrimaryDark: '#F7FAFC',
  textSecondary: '#A0AEC0',
  textSecondaryDark: '#CBD5E0',
  success: '#38A169',
  warning: '#DD6B20',
  info: '#3182CE',
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
  xxxl: '64px',
};

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  xxl: '1.5rem',
  xxxl: '1.875rem',
  display1: '2.25rem',
  display2: '3rem',
  display3: '3.75rem',
  display4: '4.5rem',
};

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
};

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  xxl: '24px',
  round: '50%',
};

export const shadows = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 15px 25px rgba(0, 0, 0, 0.1)',
  xxl: '0 20px 40px rgba(0, 0, 0, 0.1)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  outline: '0 0 0 3px rgba(58, 161, 126, 0.5)',
  none: 'none',
};

export const transitions = {
  fast: 'all 0.2s ease',
  medium: 'all 0.3s ease',
  slow: 'all 0.5s ease',
};

export const zIndices = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// Layout styles
export const layout = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${spacing.lg}`,
  },
  section: {
    padding: `${spacing.xxxl} 0`,
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
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
};

// Typography styles
export const typography = {
  h1: {
    fontSize: fontSizes.display3,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.lg,
    color: colors.textPrimary,
  },
  h2: {
    fontSize: fontSizes.display1,
    fontWeight: fontWeights.bold,
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  h3: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.semibold,
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  h4: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    marginBottom: spacing.sm,
    color: colors.textPrimary,
  },
  body: {
    fontSize: fontSizes.md,
    lineHeight: 1.6,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  bodyLarge: {
    fontSize: fontSizes.lg,
    lineHeight: 1.6,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  bodySmall: {
    fontSize: fontSizes.sm,
    lineHeight: 1.6,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  caption: {
    fontSize: fontSizes.xs,
    lineHeight: 1.4,
    color: colors.textSecondary,
  },
};

// Component styles
export const components = {
  button: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${spacing.md} ${spacing.xl}`,
      borderRadius: borderRadius.md,
      fontWeight: fontWeights.semibold,
      fontSize: fontSizes.md,
      cursor: 'pointer',
      border: 'none',
      transition: transitions.fast,
    },
    primary: {
      backgroundColor: colors.primary,
      color: 'white',
      boxShadow: shadows.md,
    },
    secondary: {
      backgroundColor: colors.secondary,
      color: colors.textPrimary,
      boxShadow: shadows.md,
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.primary,
      border: `1px solid ${colors.primary}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.primary,
    },
    danger: {
      backgroundColor: colors.error,
      color: 'white',
      boxShadow: shadows.md,
    },
  },
  card: {
    base: {
      backgroundColor: colors.surface,
      borderRadius: borderRadius.lg,
      padding: spacing.xl,
      boxShadow: shadows.md,
      transition: transitions.medium,
    },
    hover: {
      transform: 'translateY(-5px)',
      boxShadow: shadows.lg,
    },
  },
  input: {
    base: {
      width: '100%',
      padding: `${spacing.md} ${spacing.lg}`,
      borderRadius: borderRadius.md,
      border: `1px solid ${colors.textSecondary}`,
      fontSize: fontSizes.md,
      transition: transitions.fast,
      outline: 'none',
    },
    focus: {
      borderColor: colors.primary,
      boxShadow: shadows.outline,
    },
  },
  navbar: {
    base: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      padding: `${spacing.md} 0`,
      zIndex: zIndices.sticky,
      boxShadow: shadows.md,
      transition: transitions.medium,
    },
    scrolled: {
      boxShadow: shadows.lg,
    },
  },
  footer: {
    base: {
      backgroundColor: colors.backgroundDark,
      color: colors.textPrimaryDark,
      padding: `${spacing.xxl} 0`,
    },
  },
};

// Export a combined styles object for convenience
export const styles = {
  colors,
  spacing,
  fontSizes,
  fontWeights,
  borderRadius,
  shadows,
  transitions,
  zIndices,
  layout,
  typography,
  components,
};
