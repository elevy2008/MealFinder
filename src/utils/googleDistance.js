// Utility functions for Google Maps Distance Matrix Service
const PLACEHOLDER_API_KEY = 'YOUR_API_KEY'; // Will be replaced with actual key

/**
 * Calculate walking distance and duration between two points using Google Maps Distance Matrix Service
 * @param {Object} origin - Origin coordinates {lat: number, lng: number}
 * @param {Object} destination - Destination coordinates {lat: number, lng: number}
 * @returns {Promise<{distance: string, duration: string}>} Distance in miles and duration in minutes
 */
export const calculateGoogleDistance = async (origin, destination) => {
  try {
    // First try Google Maps Distance Matrix Service
    if (window.google && window.google.maps) {
      const service = new google.maps.DistanceMatrixService();
      
      const response = await new Promise((resolve, reject) => {
        service.getDistanceMatrix({
          origins: [origin],
          destinations: [destination],
          travelMode: 'WALKING',
          unitSystem: google.maps.UnitSystem.IMPERIAL,
        }, (response, status) => {
          if (status === 'OK') {
            resolve(response);
          } else {
            reject(status);
          }
        });
      });

      const result = response.rows[0].elements[0];
      
      if (result.status === 'OK') {
        return {
          distance: result.distance.text,
          duration: result.duration.text,
        };
      }
    }
    
    // Fallback to Haversine formula if Google Maps is not available
    return calculateHaversineDistance(origin, destination);
  } catch (error) {
    console.error('Google Maps distance calculation failed:', error);
    // Fallback to Haversine formula
    return calculateHaversineDistance(origin, destination);
  }
};

/**
 * Calculate direct-line distance using Haversine formula (fallback method)
 * @param {Object} origin - Origin coordinates {lat: number, lng: number}
 * @param {Object} destination - Destination coordinates {lat: number, lng: number}
 * @returns {{distance: string, duration: string}} Distance in miles and estimated duration
 */
const calculateHaversineDistance = (origin, destination) => {
  const R = 6371; // Earth's radius in km
  const dLat = (destination.lat - origin.lat) * Math.PI / 180;
  const dLon = (destination.lng - origin.lng) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(origin.lat * Math.PI / 180) * Math.cos(destination.lat * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distanceKm = R * c;
  const distanceMiles = (distanceKm * 0.621371).toFixed(2);
  
  // Estimate duration using 3.1 mph walking speed plus 8-minute buffer
  const hours = distanceMiles / 3.1;
  const minutes = Math.round(hours * 60) + 8;
  
  return {
    distance: `${distanceMiles} mi`,
    duration: `${minutes} mins`,
  };
};
