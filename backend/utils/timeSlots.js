/**
 * Time Slot Utilities
 *
 * Handles:
 * - Slot normalization
 * - Interval generation
 * - Weekday mapping
 */

export const getWeekdayKey = (date) => {
  const days = [
    'sunday','monday','tuesday','wednesday',
    'thursday','friday','saturday'
  ];
  return days[new Date(date).getDay()];
};

/**
 * Convert HH:mm → minutes
 */
export const timeToMinutes = (time) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

/**
 * Convert minutes → HH:mm
 */
export const minutesToTime = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
};

/**
 * Generate normalized slots
 */
export const generateSlots = (open, close, interval) => {
  const start = timeToMinutes(open);
  const end = timeToMinutes(close);

  const slots = [];

  for (let t = start; t + interval <= end; t += interval) {
    slots.push({
      start: minutesToTime(t),
      end: minutesToTime(t + interval),
      available: true
    });
  }

  return slots;
};
