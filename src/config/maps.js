// Google Maps configuration
export const GOOGLE_MAPS_CONFIG = {
  apiKey: process.env.GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY',
  libraries: ['places', 'geometry'],
  region: 'US',
};
