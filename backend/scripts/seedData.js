const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env from parent directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Use absolute path to models
const Shipment = require(path.join(__dirname, '..', 'src', 'models', 'Shipment'));

const zimbabweShipments = [
  {
    shipmentId: 'SHIP-001',
    origin: 'Harare, Zimbabwe',
    destination: 'Bulawayo, Zimbabwe',
    route: 'Harare → Bulawayo',
    distance: '440 km',
    eta: '2026-08-07 16:30',
    status: 'In Transit',
    location: { lat: -19.0154, lng: 29.1549 }
  },
  {
    shipmentId: 'SHIP-002',
    origin: 'Harare, Zimbabwe',
    destination: 'Mutare, Zimbabwe',
    route: 'Harare → Mutare',
    distance: '263 km',
    eta: '2026-08-07 12:00',
    status: 'Delivered',
    location: { lat: -18.9758, lng: 32.6707 }
  },
  {
    shipmentId: 'SHIP-003',
    origin: 'Harare, Zimbabwe',
    destination: 'Beitbridge, Zimbabwe',
    route: 'Harare → Beitbridge (Border)',
    distance: '580 km',
    eta: '2026-08-08 09:00',
    status: 'In Transit',
    location: { lat: -20.1325, lng: 28.6265 }
  },
  {
    shipmentId: 'SHIP-004',
    origin: 'Bulawayo, Zimbabwe',
    destination: 'Victoria Falls, Zimbabwe',
    route: 'Bulawayo → Victoria Falls',
    distance: '440 km',
    eta: '2026-08-07 18:00',
    status: 'Delayed - Road Conditions',
    location: { lat: -18.9104, lng: 27.4850 }
  },
  {
    shipmentId: 'SHIP-005',
    origin: 'Harare, Zimbabwe',
    destination: 'Chirundu Border, Zimbabwe',
    route: 'Harare → Chirundu (Zambia Border)',
    distance: '370 km',
    eta: '2026-08-07 14:00',
    status: 'At Border - Clearance',
    location: { lat: -16.0283, lng: 28.8550 }
  },
  {
    shipmentId: 'SHIP-006',
    origin: 'Harare, Zimbabwe',
    destination: 'Gweru, Zimbabwe',
    route: 'Harare → Gweru',
    distance: '275 km',
    eta: '2026-08-07 11:30',
    status: 'In Transit',
    location: { lat: -19.4550, lng: 29.8100 }
  },
  {
    shipmentId: 'SHIP-007',
    origin: 'Harare, Zimbabwe',
    destination: 'Masvingo, Zimbabwe',
    route: 'Harare → Masvingo',
    distance: '295 km',
    eta: '2026-08-08 08:00',
    status: 'Pending',
    location: { lat: -20.0625, lng: 30.8300 }
  },
  {
    shipmentId: 'SHIP-008',
    origin: 'Bulawayo, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Bulawayo → Harare',
    distance: '440 km',
    eta: '2026-08-08 10:00',
    status: 'In Transit',
    location: { lat: -19.0154, lng: 29.1549 }
  },
  {
    shipmentId: 'SHIP-009',
    origin: 'Mutare, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Mutare → Harare',
    distance: '263 km',
    eta: '2026-08-07 15:00',
    status: 'Delivered',
    location: { lat: -17.8252, lng: 31.0335 }
  },
  {
    shipmentId: 'SHIP-010',
    origin: 'Beitbridge, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Beitbridge → Harare',
    distance: '580 km',
    eta: '2026-08-09 12:00',
    status: 'At Border - Clearance',
    location: { lat: -22.2150, lng: 30.0000 }
  },
  {
    shipmentId: 'SHIP-011',
    origin: 'Harare, Zimbabwe',
    destination: 'Kariba, Zimbabwe',
    route: 'Harare → Kariba',
    distance: '370 km',
    eta: '2026-08-08 14:00',
    status: 'In Transit',
    location: { lat: -16.5167, lng: 28.8000 }
  },
  {
    shipmentId: 'SHIP-012',
    origin: 'Victoria Falls, Zimbabwe',
    destination: 'Bulawayo, Zimbabwe',
    route: 'Victoria Falls → Bulawayo',
    distance: '440 km',
    eta: '2026-08-08 16:30',
    status: 'Delayed - Weather',
    location: { lat: -18.9104, lng: 27.4850 }
  },
  {
    shipmentId: 'SHIP-013',
    origin: 'Harare, Zimbabwe',
    destination: 'Nyamapanda Border, Zimbabwe',
    route: 'Harare → Nyamapanda (Mozambique Border)',
    distance: '320 km',
    eta: '2026-08-08 09:00',
    status: 'In Transit',
    location: { lat: -16.9300, lng: 32.5000 }
  },
  {
    shipmentId: 'SHIP-014',
    origin: 'Gweru, Zimbabwe',
    destination: 'Bulawayo, Zimbabwe',
    route: 'Gweru → Bulawayo',
    distance: '165 km',
    eta: '2026-08-07 13:00',
    status: 'Delivered',
    location: { lat: -20.1500, lng: 28.5800 }
  },
  {
    shipmentId: 'SHIP-015',
    origin: 'Chiredzi, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Chiredzi → Harare',
    distance: '400 km',
    eta: '2026-08-09 11:00',
    status: 'Pending',
    location: { lat: -21.0500, lng: 31.6700 }
  },
  {
    shipmentId: 'SHIP-016',
    origin: 'Harare, Zimbabwe',
    destination: 'Plumtree, Zimbabwe',
    route: 'Harare → Plumtree (Botswana Border)',
    distance: '480 km',
    eta: '2026-08-08 13:00',
    status: 'In Transit',
    location: { lat: -20.4800, lng: 27.8200 }
  },
  {
    shipmentId: 'SHIP-017',
    origin: 'Kwekwe, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Kwekwe → Harare',
    distance: '220 km',
    eta: '2026-08-07 10:00',
    status: 'Delivered',
    location: { lat: -18.9200, lng: 29.8100 }
  },
  {
    shipmentId: 'SHIP-018',
    origin: 'Harare, Zimbabwe',
    destination: 'Gokwe, Zimbabwe',
    route: 'Harare → Gokwe',
    distance: '380 km',
    eta: '2026-08-09 15:00',
    status: 'In Transit',
    location: { lat: -18.2100, lng: 28.9300 }
  },
  {
    shipmentId: 'SHIP-019',
    origin: 'Masvingo, Zimbabwe',
    destination: 'Beitbridge, Zimbabwe',
    route: 'Masvingo → Beitbridge',
    distance: '285 km',
    eta: '2026-08-07 17:00',
    status: 'Delayed - Border Congestion',
    location: { lat: -21.0200, lng: 30.0000 }
  },
  {
    shipmentId: 'SHIP-020',
    origin: 'Harare, Zimbabwe',
    destination: 'Mvuma, Zimbabwe',
    route: 'Harare → Mvuma',
    distance: '190 km',
    eta: '2026-08-07 09:30',
    status: 'Delivered',
    location: { lat: -19.2800, lng: 30.5300 }
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing data
    await Shipment.deleteMany({});
    console.log('🗑️  Cleared existing shipments');
    
    // Insert new data
    await Shipment.insertMany(zimbabweShipments);
    console.log(`✅ Inserted ${zimbabweShipments.length} shipments`);
    
    console.log('\n📦 Zimbabwe Shipments Imported Successfully!');
    console.log('📋 Try searching for: SHIP-001, SHIP-003, SHIP-010');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();