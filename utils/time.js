
import { DateTime } from 'luxon';

/**
 * Check if the current time in the user's timezone matches
 * their preferred time within a tolerance window (default 5 minutes).
 *
 * @param {string} preferred_time - User's preferred time in "HH:mm" 24-hour format
 * @param {string} timezone - User's IANA timezone string (e.g., "Asia/Calcutta")
 * @param {number} toleranceMinutes - Allowed minutes difference (default 5)
 * @returns {boolean} - True if current time matches preferred time within tolerance
 */
export function isUserDue(preferred_time, timezone, toleranceMinutes = 5) {
  try {
    if (!preferred_time || typeof preferred_time !== 'string') {
      console.warn('Invalid preferred_time:', preferred_time);
      return false;
    }
    if (!timezone || typeof timezone !== 'string') {
      console.warn('Invalid timezone:', timezone);
      return false;
    }

    const nowInUserTZ = DateTime.now().setZone(timezone);
    if (!nowInUserTZ.isValid) {
      console.warn('Invalid timezone provided:', timezone);
      return false;
    }

    const preferred = DateTime.fromFormat(preferred_time, 'HH:mm', { zone: timezone });
    if (!preferred.isValid) {
      console.warn('Invalid preferred_time format:', preferred_time);
      return false;
    }

    const diffMinutes = Math.abs(nowInUserTZ.diff(preferred, 'minutes').minutes);
    return diffMinutes < toleranceMinutes;

  } catch (err) {
    console.error('Time check error:', err);
    return false;
  }
}
