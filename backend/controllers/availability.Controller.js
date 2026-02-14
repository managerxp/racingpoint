/**
 * Availability Controller
 *
 * Handles request validation + response formatting
 */

import { getAvailabilityForDate } from '../services/availability.service.js';

export const getAvailability = async (req, res) => {
  try {
    const { date, interval } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        error: 'date query param is required'
      });
    }

    const intervalMinutes = interval ? parseInt(interval) : 30;

    const availability = await getAvailabilityForDate(date, intervalMinutes);

    return res.status(200).json({
      success: true,
      date,
      interval: intervalMinutes,
      pods: availability
    });

  } catch (error) {
    console.error('Availability error:', error);

    return res.status(500).json({
      success: false,
      error: 'Failed to fetch availability'
    });
  }
};
