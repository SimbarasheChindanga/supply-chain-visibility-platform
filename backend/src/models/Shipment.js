
const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema(
  {
    shipmentId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    origin: {
      type: String,
      required: true,
      trim: true
    },
    destination: {
      type: String,
      required: true,
      trim: true
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
      required: true,
      enum: [
        'Pending',
        'In Transit',
        'Delivered',
        'At Border - Clearance',
        'Delayed - Road Conditions',
        'Delayed - Weather',
        'Delayed - Border Congestion'
      ]
    },
    location: {
      lat: {
        type: Number,
        required: true,
        min: -90,
        max: 90
      },
      lng: {
        type: Number,
        required: true,
        min: -180,
        max: 180
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Shipment', shipmentSchema);
