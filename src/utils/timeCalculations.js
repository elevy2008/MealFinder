/**
 * Calculate walking times and distances for a location
 * @param {number} distance - Distance in miles
 * @returns {Object} Calculated times and distances
 */
export const calculateTimes = (distance) => {
  const walkingSpeed = 3.1; // mph
  const bufferMinutes = 8; // minimum buffer time
  const roundedDistance = Math.round(distance * 10) / 10; // round to 1 decimal
  const walkingMinutes = Math.round(roundedDistance / walkingSpeed * 60);
  const totalMinutes = walkingMinutes + bufferMinutes;
  
  const now = new Date();
  const leaveAt = new Date(now.getTime() + totalMinutes * 60000);
  
  return {
    distance: roundedDistance,
    duration: walkingMinutes,
    buffer: bufferMinutes,
    total: totalMinutes,
    leaveAt: leaveAt
  };
};

/**
 * Format a date object to display time in 12-hour format
 * @param {Date} date - Date object to format
 * @returns {string} Formatted time string
 */
export const formatTime = (date) => {
  return date.toLocaleTimeString([], { 
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};
