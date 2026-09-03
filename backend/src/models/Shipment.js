const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
  shipmentId: {
    type: String,
    required: true,
    unique: true
  },
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  distance: {
    type: String,
    required: true
  },
  eta: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: [
      'In Transit',
      'Delivered',
      'Delayed',
      'Pending',
      'At Border - Clearance',
      'Delayed - Road Conditions',
      'Delayed - Weather',
      'Delayed - Border Congestion'
    ],
    default: 'Pending'
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Shipment', ShipmentSchema);