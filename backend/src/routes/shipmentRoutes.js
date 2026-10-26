
const express = require('express');
const mongoose = require('mongoose');
const Shipment = require('../models/Shipment');

const router = express.Router();

const allowedStatuses = [
  'Pending',
  'In Transit',
  'Delivered',
  'At Border - Clearance',
  'Delayed - Road Conditions',
  'Delayed - Weather',
  'Delayed - Border Congestion'
];


 // GET /api/shipments
router.get('/', async (req, res) => {
  try {
    const shipments = await Shipment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: shipments.length,
      data: shipments
    });
  } catch (error) {
    console.error('Error retrieving shipments:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve shipments',
      error: error.message
    });
  }
});

// GET /api/shipments/:id
router.get('/:id', async (req, res) => {
  try {
    const shipment = await Shipment.findOne({
      shipmentId: req.params.id
    });

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: shipment
    });
 
  } catch (error) {
    console.error('Error retrieving shipment by ID:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve shipment',
      error: error.message
    });
  }
});

// POST /api/shipments
router.post('/', async (req, res) => {
  try {
    const shipment = await Shipment.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Shipment created successfully',
      data: shipment
    });
  } catch (error) {
    if (error.name === 'ValidationError' || error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Invalid shipment data or duplicate shipment ID',
        errors: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create shipment'
    });
  }
});

// PUT /api/shipments/:id/status
router.put('/:id/status', async (req, res) => {
  try {
    const { status, location } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid shipment status'
      });
    }

    const update = { status };

    if (location !== undefined) {
      if (
        !location ||
        typeof location.lat !== 'number' ||
        typeof location.lng !== 'number' ||
        !Number.isFinite(location.lat) ||
        !Number.isFinite(location.lng) ||
        location.lat < -90 ||
        location.lat > 90 ||
        location.lng < -180 ||
        location.lng > 180
      ) {
        return res.status(400).json({
          success: false,
          message: 'Location must contain valid numeric lat and lng coordinates'
        });
      }

      update.location = location;
    }

    const shipment = await Shipment.findOneAndUpdate(
      { shipmentId: req.params.id },
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Shipment updated successfully',
      data: shipment
    });
  } catch (error) {
    console.error('Error updating shipment:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to update shipment',
      error: error.message
    });
  }
});

module.exports = router;