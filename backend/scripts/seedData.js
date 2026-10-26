const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const vm = require('vm');
const Shipment = require('../src/models/Shipment');

// Load env from parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Use absolute path to models

const frontendShipmentsPath = path.resolve(
  __dirname,
  '../../frontend/src/data/shipments.js'
);

const frontendSource = fs.readFileSync(
  frontendShipmentsPath,
  'utf8'
).replace(
  /export\s+default\s+zimbabweRoutes;\s*$/,
  'globalThis.__zimbabweRoutes = zimbabweRoutes;'
);

const frontendContext = {};

vm.runInNewContext(frontendSource, frontendContext, {
  filename: frontendShipmentsPath
});

const zimbabweRoutes = frontendContext.__zimbabweRoutes;

if (!zimbabweRoutes || Object.keys(zimbabweRoutes).length !== 50) {
  throw new Error(
    `Expected 50 frontend shipments, found ${
      zimbabweRoutes ? Object.keys(zimbabweRoutes).length : 0
    }`
  );
}

const zimbabweShipments = Object.entries(zimbabweRoutes).map(
  ([shipmentId, shipment]) => ({
    shipmentId,
    ...shipment
  })
);



async function seedDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from backend/.env');
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log('Connected to MongoDB');

    let inserted = 0;
    let updated = 0;

    for (const shipment of zimbabweShipments) {
      const result = await Shipment.updateOne(
        { shipmentId: shipment.shipmentId },
        { $set: shipment },
        { upsert: true, runValidators: true }
      );

      if (result.upsertedCount > 0) {
        inserted++;
      } else if (result.modifiedCount > 0) {
        updated++;
      }
    }

    const total = await Shipment.countDocuments();

    console.log(`Inserted: ${inserted}`);
    console.log(`Updated: ${updated}`);
    console.log(`Total shipments in database: ${total}`);
    console.log('Shipment seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

seedDatabase();
