import React from 'react';

// Social Media Icons
export const InstagramIcon = ({ color = '#E1306C', size = 24 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill={color} />
  </svg>
);

export const TikTokIcon = ({ color = '#000000', size = 24 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill={color} />
  </svg>
);

export const FacebookIcon = ({ color = '#1877F2', size = 24 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill={color} />
  </svg>
);

export const TwitterIcon = ({ color = '#1DA1F2', size = 24 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" fill={color} />
  </svg>
);

// Addictive Behaviors Icons
export const SmartphoneIcon = ({ color = '#333333', size = 24 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="2" width="14" height="20" rx="2" stroke={color} strokeWidth="2" />
    <line x1="5" y1="6" x2="19" y2="6" stroke={color} strokeWidth="2" />
    <line x1="5" y1="18" x2="19" y2="18" stroke={color} strokeWidth="2" />
    <circle cx="12" cy="21" r="1" fill={color} />
  </svg>
);

export const AlcoholIcon = ({ color = '#333333', size = 24 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3L8 7.5L12 15V21H6V15L10 7.5V3H8Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 3.5V7.5L19 14V21H13V14L16 7.5V3.5H16Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 3H16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CigaretteIcon = ({ color = '#333333', size = 24 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="8" width="18" height="8" rx="1" stroke={color} strokeWidth="2" />
    <rect x="2" y="10" width="2" height="4" fill={color} />
    <rect x="20" y="10" width="2" height="4" fill={color} />
    <line x1="6" y1="8" x2="6" y2="16" stroke={color} strokeWidth="1" />
  </svg>
);

export const GamingIcon = ({ color = '#333333', size = 24 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12H10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M8 10L8 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M15 13H15.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M18 11H18.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M17.32 5H6.68C4.65 5 3 6.65 3 8.68V15.32C3 17.35 4.65 19 6.68 19H17.32C19.35 19 21 17.35 21 15.32V8.68C21 6.65 19.35 5 17.32 5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FastFoodIcon = ({ color = '#333333', size = 24 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 14H21V15C21 16.1046 20.1046 17 19 17H5C3.89543 17 3 16.1046 3 15V14Z" stroke={color} strokeWidth="2" />
    <path d="M4 14L5.5 7H18.5L20 14" stroke={color} strokeWidth="2" />
    <path d="M8 7L8 4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 7L12 4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M16 7L16 4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M7 20L7 17" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M17 20L17 17" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ShoppingIcon = ({ color = '#333333', size = 24 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H21L19 16H5L3 6Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 20C8.55228 20 9 19.5523 9 19C9 18.4477 8.55228 18 8 18C7.44772 18 7 18.4477 7 19C7 19.5523 7.44772 20 8 20Z" stroke={color} strokeWidth="2" />
    <path d="M16 20C16.5523 20 17 19.5523 17 19C17 18.4477 16.5523 18 16 18C15.4477 18 15 18.4477 15 19C15 19.5523 15.4477 20 16 20Z" stroke={color} strokeWidth="2" />
    <path d="M9 9H15" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 9V13" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const AdultContentIcon = ({ color = '#333333', size = 24 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
    <path d="M15 9L9 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M9 9L15 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Group all distraction icons for easy access
export const distractionIcons = [
  { Icon: InstagramIcon, name: 'Instagram', color: '#E1306C' },
  { Icon: TikTokIcon, name: 'TikTok', color: '#000000' },
  { Icon: FacebookIcon, name: 'Facebook', color: '#1877F2' },
  { Icon: TwitterIcon, name: 'Twitter', color: '#1DA1F2' },
  { Icon: SmartphoneIcon, name: 'Smartphone', color: '#333333' },
  { Icon: AlcoholIcon, name: 'Alcohol', color: '#8B4513' },
  { Icon: CigaretteIcon, name: 'Cigarette', color: '#A52A2A' },
  { Icon: GamingIcon, name: 'Gaming', color: '#6441A4' },
  { Icon: FastFoodIcon, name: 'Fast Food', color: '#FF4500' },
  { Icon: ShoppingIcon, name: 'Shopping', color: '#20B2AA' },
  { Icon: AdultContentIcon, name: 'Adult Content', color: '#FF69B4' },
];
