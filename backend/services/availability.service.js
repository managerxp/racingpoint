/**
 * Availability Service
 *
 * Pure business logic.
 * No Express or HTTP concerns.
 */

import { pool } from '../config/database.js';
import { getWeekdayKey, generateSlots } from '../utils/timeSlots.js';

export const getAvailabilityForDate = async (date, interval = 30) => {
  const weekday = getWeekdayKey(date);

  // Fetch all pods
  const { rows: pods } = await pool.query(`
    SELECT id, name, status, operating_hours
    FROM cars
    ORDER BY id
  `);

  const result = [];

  for (const pod of pods) {
    if (pod.status !== 'ACTIVE') {
      result.push({
        pod_id: pod.id,
        name: pod.name,
        available: false,
        reason: pod.status,
        slots: []
      });
      continue;
    }

    const hours = pod.operating_hours?.[weekday];

    if (!hours || !hours.open || !hours.close) {
      result.push({
        pod_id: pod.id,
        name: pod.name,
        available: false,
        reason: 'CLOSED',
        slots: []
      });
      continue;
    }

    const slots = generateSlots(hours.open, hours.close, interval);

    result.push({
      pod_id: pod.id,
      name: pod.name,
      available: true,
      slots
    });
  }

  return result;
};
