// ============================================
// ZIMBABWE SHIPMENTS DATA - 50 SHIPMENTS
// With detailed current location tracking
// ============================================

// Demo-only ETA generator; not a live prediction.
const getDemoEta = (status, distance) => {
  const now = new Date();
  const km = Number.parseInt(distance, 10) || 100;
  const hours = Math.max(3, Math.ceil(km / 55));
  const delivered = String(status).toLowerCase() === 'delivered';
  now.setHours(now.getHours() + (delivered ? -Math.min(hours, 48) : hours));
  const pad = n => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
};
const zimbabweRoutes = {
  // ============================================
  // HARARE to BULAWAYO (5 shipments - popular route)
  // ============================================
  'SHIP-001': {
    origin: 'Harare, Zimbabwe',
    destination: 'Bulawayo, Zimbabwe',
    route: 'Harare to Bulawayo',
    distance: '440 km',
    eta: getDemoEta('In Transit', '440 km'),
    status: 'In Transit',
    currentArea: 'CMED KWEKWE Fuel Station',
    currentRoad: 'A5 Highway',
    currentLandmark: 'CMED KWEKWE',
    distanceToNextStop: '90 km',
    location: { lat: -18.9156392, lng: 29.8176033 },
    // NEW: Route Waypoints
    waypoints: [
      { name: 'Harare', lat: -17.8252, lng: 31.0335 },
      { name: 'Chegutu', lat: -18.1333, lng: 30.1500 },
      { name: 'Kadoma', lat: -18.3333, lng: 29.9167 },
      { name: 'Kwekwe', lat: -18.9286, lng: 29.8149 },
      { name: 'Gweru', lat: -19.4550, lng: 29.8100 },
      { name: 'Bulawayo', lat: -20.1486, lng: 28.5877 }
    ]
  },
  'SHIP-002': {
    origin: 'Harare, Zimbabwe',
    destination: 'Bulawayo, Zimbabwe',
    route: 'Harare to Bulawayo',
    distance: '440 km',
    eta: getDemoEta('In Transit', '440 km'),
    status: 'In Transit',
    currentArea: 'Gweru Terminus Bus Station',
    currentRoad: 'A5 Highway',
    currentLandmark: 'Terminus Bus Station',
    nextStop: 'Bulawayo, Zimbabwe',
    distanceToNextStop: '165 km',
    location: { lat: -19.45506, lng: 29.81279 },
    waypoints: [
      { name: 'Harare', lat: -17.8252, lng: 31.0335 },
      { name: 'Chegutu', lat: -18.1333, lng: 30.1500 },
      { name: 'Kadoma', lat: -18.3333, lng: 29.9167 },
      { name: 'Kwekwe', lat: -18.9286, lng: 29.8149 },
      { name: 'Gweru', lat: -19.4550, lng: 29.8100 },
      { name: 'Bulawayo', lat: -20.1486, lng: 28.5877 }
    ]
  },
  'SHIP-003': {
    origin: 'Harare, Zimbabwe',
    destination: 'Bulawayo, Zimbabwe',
    route: 'Harare to Bulawayo',
    distance: '440 km',
    eta: getDemoEta('Delivered', '440 km'),
    status: 'Delivered',
    currentRoad: 'Joshua Mqabuko Nkomo Street',
    nextStop: 'Delivered',
    distanceToNextStop: '0 km',
    currentArea: 'Bulawayo CBD',
    currentLandmark: 'BCC Tower Block (mapped town hall)',
    location: { lat: -20.15504, lng: 28.58802 },

  },
 'SHIP-004': {
  origin: 'Harare, Zimbabwe',
  destination: 'Bulawayo, Zimbabwe',
  route: 'Harare to Bulawayo',
  distance: '440 km',
  eta: getDemoEta('Delayed - Road Conditions', '440 km'),
  status: 'Delayed - Road Conditions',
  currentArea: 'Harare Depot',
  currentRoad: 'Willowvale Industrial Park',
  currentLandmark: 'Harare Loading Bay 3',
  nextStop: 'Kwekwe, Zimbabwe',
  distanceToNextStop: '210 km',
  location: { lat: -17.8252, lng: 31.0335 }
},

  'SHIP-005': {
    origin: 'Harare, Zimbabwe',
    destination: 'Bulawayo, Zimbabwe',
    route: 'Harare to Bulawayo',
    distance: '440 km',
    eta: getDemoEta('In Transit', '440 km'),
    status: 'In Transit',
    currentArea: 'Chegutu Tollgate',
    currentRoad: 'A5 Highway',
    currentLandmark: 'Chegutu Toll Plaza',
    nextStop: 'Kadoma, Zimbabwe',
    distanceToNextStop: '45 km',
    location: { lat: -18.1333, lng: 30.1500 },
    waypoints: [
      { name: 'Harare', lat: -17.8252, lng: 31.0335 },
      { name: 'Chegutu', lat: -18.1333, lng: 30.1500 },
      { name: 'Kadoma', lat: -18.3333, lng: 29.9167 },
      { name: 'Kwekwe', lat: -18.9286, lng: 29.8149 },
      { name: 'Gweru', lat: -19.4550, lng: 29.8100 },
      { name: 'Bulawayo', lat: -20.1486, lng: 28.5877 }
    ]
  },

  // ============================================
  // HARARE to MUTARE (4 shipments)
  // ============================================
  'SHIP-006': {
    origin: 'Harare, Zimbabwe',
    destination: 'Mutare, Zimbabwe',
    route: 'Harare to Mutare',
    distance: '263 km',
    eta: getDemoEta('Delivered', '263 km'),
    status: 'Delivered',
    currentRoad: 'Herbert Chitepo Street',
    nextStop: 'Delivered',
    distanceToNextStop: '0 km',
    currentArea: 'Mutare CBD',
    currentLandmark: 'Zimpost Mutare',
    location: { lat: -18.9734, lng: 32.6665 },

  },
  'SHIP-007': {
    origin: 'Harare, Zimbabwe',
    destination: 'Mutare, Zimbabwe',
    route: 'Harare to Mutare',
    distance: '263 km',
    eta: getDemoEta('In Transit', '263 km'),
    status: 'In Transit',
    currentArea: 'Rusape',
    currentRoad: 'A3 Highway',
    currentLandmark: 'Rusape Flamboyant Hotel',
    nextStop: 'Mutare, Zimbabwe',
    distanceToNextStop: '85 km',
    location: { lat: -18.5333, lng: 32.1333 }
  },

'SHIP-008': {
  origin: 'Harare, Zimbabwe',
  destination: 'Mutare, Zimbabwe',
  route: 'Harare to Mutare',
  distance: '263 km',
  eta: getDemoEta('In Transit', '263 km'),
  status: 'In Transit',
  currentArea: 'Rusape',
  currentRoad: 'A3 Highway',
  currentLandmark: 'A3 / A14 Junction',
  nextStop: 'Mutare, Zimbabwe',
  distanceToNextStop: '95 km',
  location: { lat: -18.5336, lng: 32.1240 }
},

  'SHIP-009': {
    origin: 'Harare, Zimbabwe',
    destination: 'Mutare, Zimbabwe',
    route: 'Harare to Mutare',
    distance: '263 km',
    eta: getDemoEta('Delivered', '263 km'),
    status: 'Delivered',
    currentArea: 'Mutare Industrial Area',
    currentRoad: 'Manchester Road',
    currentLandmark: 'Mutare Warehouse',
    nextStop: 'Delivered',
    distanceToNextStop: '0 km',
    location: { lat: -18.9700, lng: 32.6600 }
  },

  // ============================================
  // HARARE to BEITBRIDGE (4 shipments - border route)
  // ============================================
   'SHIP-010': {
    origin: 'Harare, Zimbabwe',
    destination: 'Beitbridge, Zimbabwe',
    route: 'Harare to Beitbridge (Border)',
    distance: '580 km',
    eta: getDemoEta('In Transit', '580 km'),
    status: 'In Transit',
    currentArea: 'Chivhu',
    currentRoad: 'A4 Highway',
    currentLandmark: 'Chivhu Service Station',
    nextStop: 'Masvingo, Zimbabwe',
    distanceToNextStop: '150 km',
    location: { lat: -19.0000, lng: 30.8833 },
    // NEW: Route Waypoints
    waypoints: [
      { name: 'Harare', lat: -17.8252, lng: 31.0335 },
      { name: 'Chivhu', lat: -19.0000, lng: 30.8833 },
      { name: 'Masvingo', lat: -20.0625, lng: 30.8300 },
      { name: 'Ngundu', lat: -20.7500, lng: 30.9667 },
      { name: 'Beitbridge', lat: -22.2150, lng: 30.0000 }
    ]
  },
    'SHIP-011': {
    origin: 'Harare, Zimbabwe',
    destination: 'Beitbridge, Zimbabwe',
    route: 'Harare to Beitbridge (Border)',
    distance: '580 km',
    eta: getDemoEta('At Border - Clearance', '580 km'),
    status: 'At Border - Clearance',
    currentArea: 'Beitbridge Border Post',
    currentRoad: 'A6 Highway',
    currentLandmark: 'Beitbridge Customs Office - Lane 3',
    nextStop: 'Crossing to South Africa',
    distanceToNextStop: '2 km',
    location: { lat: -22.2150, lng: 30.0000 }
  },
  'SHIP-012': {
    origin: 'Harare, Zimbabwe',
    destination: 'Beitbridge, Zimbabwe',
    route: 'Harare to Beitbridge (Border)',
    distance: '580 km',
    eta: getDemoEta('In Transit', '580 km'),
    status: 'In Transit',
    currentArea: 'Masvingo CBD',
    currentRoad: 'Robert Mugabe Street',
    currentLandmark: 'Masvingo Great Zimbabwe Hotel',
    nextStop: 'Beitbridge, Zimbabwe',
    distanceToNextStop: '285 km',
    location: { lat: -20.0625, lng: 30.8300 }
  },
  'SHIP-013': {
    origin: 'Harare, Zimbabwe',
    destination: 'Beitbridge, Zimbabwe',
    route: 'Harare to Beitbridge (Border)',
    distance: '580 km',
    eta: getDemoEta('Delivered', '580 km'),
    status: 'Delivered',
    currentArea: 'Beitbridge Town',
    currentRoad: 'Border Road',
    currentLandmark: 'Beitbridge Warehouse 5',
    nextStop: 'Delivered',
    distanceToNextStop: '0 km',
    location: { lat: -22.2150, lng: 30.0000 }
  },

  // ============================================
  // HARARE to VICTORIA FALLS (3 shipments)
  // ============================================
  'SHIP-014': {
    origin: 'Harare, Zimbabwe',
    destination: 'Victoria Falls, Zimbabwe',
    route: 'Harare to Victoria Falls',
    distance: '750 km',
    eta: getDemoEta('In Transit', '750 km'),
    status: 'In Transit',
    currentArea: 'Chinhoyi',
    currentRoad: 'A1 Highway',
    currentLandmark: 'Chinhoyi Caves Turn-off',
    nextStop: 'Karoi, Zimbabwe',
    distanceToNextStop: '95 km',
    location: { lat: -17.3500, lng: 30.2000 }
  },
  'SHIP-015': {
    origin: 'Harare, Zimbabwe',
    destination: 'Victoria Falls, Zimbabwe',
    route: 'Harare to Victoria Falls',
    distance: '750 km',
    eta: getDemoEta('In Transit', '750 km'),
    status: 'In Transit',
    currentArea: 'Hwange',
    currentRoad: 'A8 Highway',
    currentLandmark: 'Hwange Coal Mine Turn-off',
    nextStop: 'Victoria Falls, Zimbabwe',
    distanceToNextStop: '180 km',
    location: { lat: -18.3667, lng: 26.5000 }
  },
  'SHIP-016': {
    origin: 'Harare, Zimbabwe',
    destination: 'Victoria Falls, Zimbabwe',
    route: 'Harare to Victoria Falls',
    distance: '750 km',
    eta: getDemoEta('Delivered', '750 km'),
    status: 'Delivered',
    currentArea: 'Victoria Falls Town',
    currentRoad: 'Livingstone Way',
    currentLandmark: 'Victoria Falls Mall',
    nextStop: 'Delivered',
    distanceToNextStop: '0 km',
    location: { lat: -17.9328, lng: 25.8307 }
  },

  // ============================================
  // HARARE to GWERU (3 shipments)
  // ============================================
    'SHIP-017': {
    origin: 'Bulawayo, Zimbabwe',
    destination: 'Victoria Falls, Zimbabwe',
    route: 'Bulawayo to Victoria Falls',
    distance: '440 km',
    eta: getDemoEta('In Transit', '440 km'),
    status: 'In Transit',
    currentArea: 'Hwange Truck Stop',
    currentRoad: 'A8 Highway',
    currentLandmark: 'Hwange National Park Gate',
    nextStop: 'Victoria Falls, Zimbabwe',
    distanceToNextStop: '180 km',
    location: { lat: -18.3667, lng: 26.5000 }
  },
  'SHIP-018': {
    origin: 'Harare, Zimbabwe',
    destination: 'Gweru, Zimbabwe',
    route: 'Harare to Gweru',
    distance: '275 km',
    eta: getDemoEta('Delivered', '275 km'),
    status: 'Delivered',
    currentRoad: 'Robert Mugabe Way',
    nextStop: 'Delivered',
    distanceToNextStop: '0 km',
    currentArea: 'Gweru CBD',
    currentLandmark: 'Gweru Post Office',
    location: { lat: -19.45687, lng: 29.81392 },
  },
  'SHIP-019': {
    origin: 'Harare, Zimbabwe',
    destination: 'Gweru, Zimbabwe',
    route: 'Harare to Gweru',
    distance: '275 km',
    eta: getDemoEta('In Transit', '275 km'),
    status: 'In Transit',
    currentArea: 'Kwekwe',
    currentRoad: 'A5 Highway',
    currentLandmark: 'Kwekwe Globe & Phoenix',
    nextStop: 'Gweru, Zimbabwe',
    distanceToNextStop: '90 km',
    location: { lat: -18.9200, lng: 29.8100 }
  },

  // ============================================
  // HARARE to MASVINGO (3 shipments)
  // ============================================
  'SHIP-020': {
    origin: 'Harare, Zimbabwe',
    destination: 'Masvingo, Zimbabwe',
    route: 'Harare to Masvingo',
    distance: '295 km',
    eta: getDemoEta('Pending', '295 km'),
    status: 'Pending',
    currentArea: 'Harare Depot',
    currentRoad: 'Simon Mazorodze Road',
    currentLandmark: 'Harare Loading Bay 1',
    nextStop: 'Chivhu, Zimbabwe',
    distanceToNextStop: '140 km',
    location: { lat: -17.8252, lng: 31.0335 }
  },
  'SHIP-021': {
    origin: 'Harare, Zimbabwe',
    destination: 'Masvingo, Zimbabwe',
    route: 'Harare to Masvingo',
    distance: '295 km',
    eta: getDemoEta('In Transit', '295 km'),
    status: 'In Transit',
    currentArea: 'Chivhu',
    currentRoad: 'A4 Highway',
    currentLandmark: 'Chivhu Tollgate',
    nextStop: 'Masvingo, Zimbabwe',
    distanceToNextStop: '155 km',
    location: { lat: -19.0000, lng: 30.8833 }
  },
  'SHIP-022': {
    origin: 'Harare, Zimbabwe',
    destination: 'Masvingo, Zimbabwe',
    route: 'Harare to Masvingo',
    distance: '295 km',
    eta: getDemoEta('Delivered', '295 km'),
    status: 'Delivered',
    currentArea: 'Masvingo CBD',
    currentRoad: 'Hughes Street',
    currentLandmark: 'Masvingo Civic Centre',
    nextStop: 'Delivered',
    distanceToNextStop: '0 km',
    location: { lat: -20.0625, lng: 30.8300 }
  },

  // ============================================
  // BULAWAYO to HARARE (3 shipments)
  // ============================================
  'SHIP-023': {
    origin: 'Bulawayo, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Bulawayo to Harare',
    distance: '440 km',
    eta: getDemoEta('In Transit', '440 km'),
    status: 'In Transit',
    currentArea: 'Gweru',
    currentRoad: 'A5 Highway',
    currentLandmark: 'Gweru Midlands Hotel',
    nextStop: 'Kwekwe, Zimbabwe',
    distanceToNextStop: '90 km',
   location: { lat: -19.45292, lng: 29.81551 }
  },
     'SHIP-024': {
    origin: 'Bulawayo, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Bulawayo to Harare',
    distance: '440 km',
    eta: getDemoEta('Delivered', '440 km'),
    status: 'Delivered',
    currentArea: 'Harare CBD',
    currentRoad: 'Samora Machel Avenue',
    currentLandmark: 'Harare Central Police Station',
    nextStop: 'Delivered',
    distanceToNextStop: '0 km',
    location: { lat: -17.83497, lng: 31.04802 }
  },
  'SHIP-025': {
    origin: 'Bulawayo, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Bulawayo to Harare',
    distance: '440 km',
    eta: getDemoEta('Pending', '440 km'),
    status: 'Pending',
    currentArea: 'Bulawayo Depot',
    currentRoad: 'Doncaster Road',
    currentLandmark: 'Bulawayo Loading Bay 2',
    nextStop: 'Gweru, Zimbabwe',
    distanceToNextStop: '165 km',
    location: { lat: -20.1486, lng: 28.5877 }
  },

  // ============================================
  // BULAWAYO to VICTORIA FALLS (3 shipments)
  // ============================================
  'SHIP-026': {
    origin: 'Bulawayo, Zimbabwe',
    destination: 'Victoria Falls, Zimbabwe',
    route: 'Bulawayo to Victoria Falls',
    distance: '440 km',
    eta: getDemoEta('Delayed - Weather', '440 km'),
    status: 'Delayed - Weather',
    currentArea: 'Hwange',
    currentRoad: 'A8 Highway',
    currentLandmark: 'Hwange National Park Gate',
    nextStop: 'Victoria Falls, Zimbabwe',
    distanceToNextStop: '180 km',
    location: { lat: -18.3667, lng: 26.5000 }
  },
  'SHIP-027': {
    origin: 'Bulawayo, Zimbabwe',
    destination: 'Victoria Falls, Zimbabwe',
    route: 'Bulawayo to Victoria Falls',
    distance: '440 km',
    eta: getDemoEta('In Transit', '440 km'),
    status: 'In Transit',
    currentArea: 'Lupane',
    currentRoad: 'A8 Highway',
    currentLandmark: 'Lupane State University',
    nextStop: 'Hwange, Zimbabwe',
    distanceToNextStop: '200 km',
    location: { lat: -18.95091, lng: 27.75909 }
  },
  'SHIP-028': {
    origin: 'Bulawayo, Zimbabwe',
    destination: 'Victoria Falls, Zimbabwe',
    route: 'Bulawayo to Victoria Falls',
    distance: '440 km',
    eta: getDemoEta('Delivered', '440 km'),
    status: 'Delivered',
    currentArea: 'Victoria Falls Town',
    currentRoad: 'Park Way',
    currentLandmark: 'Victoria Falls Hotel',
    nextStop: 'Delivered',
    distanceToNextStop: '0 km',
   location: { lat: -17.9351, lng: 25.8375 }
  },

  // ============================================
  // BEITBRIDGE to HARARE (3 shipments)
  // ============================================
  'SHIP-029': {
    origin: 'Beitbridge, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Beitbridge to Harare',
    distance: '580 km',
    eta: getDemoEta('At Border - Clearance', '580 km'),
    status: 'At Border - Clearance',
    currentArea: 'Beitbridge Border Post',
    currentRoad: 'A6 Highway',
    currentLandmark: 'Beitbridge Customs - Lane 1',
    nextStop: 'Bubi, Zimbabwe',
    distanceToNextStop: '50 km',
    location: { lat: -22.2150, lng: 30.0000 }
  },
  'SHIP-030': {
    origin: 'Beitbridge, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Beitbridge to Harare',
    distance: '580 km',
    eta: getDemoEta('In Transit', '580 km'),
    status: 'In Transit',
    currentArea: 'Bubi',
    currentRoad: 'A6 Highway',
    currentLandmark: 'Bubi River Bridge',
    nextStop: 'Masvingo, Zimbabwe',
    distanceToNextStop: '185 km',
    location: { lat: -20.9500, lng: 30.0500 }
  },
  'SHIP-031': {
    origin: 'Beitbridge, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Beitbridge to Harare',
    distance: '580 km',
    eta: getDemoEta('Pending', '580 km'),
    status: 'Pending',
    currentArea: 'Beitbridge Depot',
    currentRoad: 'Impala Road',
    currentLandmark: 'Beitbridge Loading Area',
    nextStop: 'Masvingo, Zimbabwe',
    distanceToNextStop: '285 km',
    location: { lat: -22.2150, lng: 30.0000 }
  },

  // ============================================
  // MUTARE to HARARE (2 shipments)
  // ============================================
  'SHIP-032': {
    origin: 'Mutare, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Mutare to Harare',
    distance: '263 km',
    eta: getDemoEta('Delivered', '263 km'),
    status: 'Delivered',
    currentArea: 'Harare CBD',
    currentRoad: 'Leopold Takawira Street',
    currentLandmark: 'Harare Main Post Office',
    nextStop: 'Delivered',
    distanceToNextStop: '0 km',
    location: { lat: -17.83055, lng: 31.04719 }
  },
  'SHIP-033': {
    origin: 'Mutare, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Mutare to Harare',
    distance: '263 km',
    eta: getDemoEta('In Transit', '263 km'),
    status: 'In Transit',
    currentArea: 'Rusape',
    currentRoad: 'A3 Highway',
    currentLandmark: 'Rusape Showgrounds',
    nextStop: 'Harare, Zimbabwe',
    distanceToNextStop: '120 km',
    location: { lat: -18.5333, lng: 32.1333 }
  },

  // ============================================
  // HARARE to KARIBA (2 shipments)
  // ============================================
  'SHIP-034': {
    origin: 'Harare, Zimbabwe',
    destination: 'Kariba, Zimbabwe',
    route: 'Harare to Kariba',
    distance: '370 km',
    eta: getDemoEta('In Transit', '370 km'),
    status: 'In Transit',
    currentArea: 'Karoi',
    currentRoad: 'A1 Highway',
    currentLandmark: 'Karoi Service Station',
    nextStop: 'Kariba, Zimbabwe',
    distanceToNextStop: '130 km',
    location: { lat: -16.8167, lng: 29.6833 }
  },
  'SHIP-035': {
    origin: 'Harare, Zimbabwe',
    destination: 'Kariba, Zimbabwe',
    route: 'Harare to Kariba',
    distance: '370 km',
    eta: getDemoEta('Pending', '370 km'),
    status: 'Pending',
    currentArea: 'Harare Depot',
    currentRoad: 'Lytton Road',
    currentLandmark: 'Harare Loading Bay 4',
    nextStop: 'Karoi, Zimbabwe',
    distanceToNextStop: '240 km',
    location: { lat: -17.8252, lng: 31.0335 }
  },

  // ============================================
  // HARARE to CHIRUNDU (2 shipments - border)
  // ============================================
    'SHIP-036': {
    origin: 'Harare, Zimbabwe',
    destination: 'Chirundu, Zimbabwe',
    route: 'Harare to Chirundu (Zambia Border)',
    distance: '370 km',
    eta: getDemoEta('At Border - Clearance', '370 km'),
    status: 'At Border - Clearance',
    currentArea: 'Chirundu Border Post',
    currentRoad: 'A1 Highway',
    currentLandmark: 'Chirundu Customs - Lane 2',
    nextStop: 'Crossing to Zambia',
    distanceToNextStop: '1 km',
    location: { lat: -16.0283, lng: 28.8550 }
  },
  'SHIP-037': {
    origin: 'Harare, Zimbabwe',
    destination: 'Chirundu, Zimbabwe',
    route: 'Harare to Chirundu (Zambia Border)',
    distance: '370 km',
    eta: getDemoEta('In Transit', '370 km'),
    status: 'In Transit',
    currentArea: 'Makuti',
    currentRoad: 'A1 Highway',
    currentLandmark: 'Makuti Hotel',
    nextStop: 'Chirundu, Zimbabwe',
    distanceToNextStop: '85 km',
    location: { lat: -16.3167, lng: 29.1833 }
  },

  // ============================================
  // HARARE to PLUMTREE (2 shipments - border)
  // ============================================
  'SHIP-038': {
    origin: 'Harare, Zimbabwe',
    destination: 'Plumtree, Zimbabwe',
    route: 'Harare to Plumtree (Botswana Border)',
    distance: '480 km',
    eta: getDemoEta('At Border - Clearance', '480 km'),
    status: 'At Border - Clearance',
    currentArea: 'Plumtree Border Post',
    currentRoad: 'A7 Highway',
    currentLandmark: 'Plumtree Customs Office',
    nextStop: 'Crossing to Botswana',
    distanceToNextStop: '2 km',
    location: { lat: -20.4800, lng: 27.8200 }
  },
  'SHIP-039': {
    origin: 'Harare, Zimbabwe',
    destination: 'Plumtree, Zimbabwe',
    route: 'Harare to Plumtree (Botswana Border)',
    distance: '480 km',
    eta: getDemoEta('In Transit', '480 km'),
    status: 'In Transit',
    currentArea: 'Esigodini',
    currentRoad: 'A7 Highway',
    currentLandmark: 'Esigodini Business Centre',
    nextStop: 'Plumtree, Zimbabwe',
    distanceToNextStop: '90 km',
    location: { lat: -20.2833, lng: 28.7500 }
  },

  // ============================================
  // HARARE to NYAMAPANDA (2 shipments - border)
  // ============================================
  'SHIP-040': {
    origin: 'Harare, Zimbabwe',
    destination: 'Nyamapanda, Zimbabwe',
    route: 'Harare to Nyamapanda (Mozambique Border)',
    distance: '320 km',
    eta: getDemoEta('In Transit', '320 km'),
    status: 'In Transit',
    currentArea: 'Mudzi',
    currentRoad: 'A2 Highway',
    currentLandmark: 'Mudzi Business Centre',
    nextStop: 'Nyamapanda, Zimbabwe',
    distanceToNextStop: '65 km',
    location: { lat: -17.1000, lng: 32.2000 }
  },
  'SHIP-041': {
    origin: 'Harare, Zimbabwe',
    destination: 'Nyamapanda, Zimbabwe',
    route: 'Harare to Nyamapanda (Mozambique Border)',
    distance: '320 km',
    eta: getDemoEta('Delivered', '320 km'),
    status: 'Delivered',
    currentArea: 'Nyamapanda Border',
    currentRoad: 'A2 Highway',
    currentLandmark: 'Nyamapanda Customs Office',
    nextStop: 'Delivered',
    distanceToNextStop: '0 km',
    location: { lat: -16.9300, lng: 32.5000 }
  },

  // ============================================
  // ADDITIONAL ROUTES (SHIP-042 to SHIP-050)
  // ============================================
  'SHIP-042': {
    origin: 'Harare, Zimbabwe',
    destination: 'Chinhoyi, Zimbabwe',
    route: 'Harare to Chinhoyi',
    distance: '130 km',
    eta: getDemoEta('Delivered', '130 km'),
    status: 'Delivered',
    currentArea: 'Chinhoyi CBD',
    currentRoad: 'Independence Way',
    currentLandmark: 'Chinhoyi Main Post Office',
    nextStop: 'Delivered',
    distanceToNextStop: '0 km',
    location: { lat: -17.3500, lng: 30.2000 }
  },
  'SHIP-043': {
    origin: 'Harare, Zimbabwe',
    destination: 'Kadoma, Zimbabwe',
    route: 'Harare to Kadoma',
    distance: '140 km',
    eta: getDemoEta('In Transit', '140 km'),
    status: 'In Transit',
    currentArea: 'Banket',
    currentRoad: 'A5 Highway',
    currentLandmark: 'Banket Tollgate',
    nextStop: 'Kadoma, Zimbabwe',
    distanceToNextStop: '55 km',
    location: { lat: -17.9333, lng: 30.2333 }
  },
  'SHIP-044': {
    origin: 'Harare, Zimbabwe',
    destination: 'Chegutu, Zimbabwe',
    route: 'Harare to Chegutu',
    distance: '110 km',
    eta: getDemoEta('Delivered', '110 km'),
    status: 'Delivered',
    currentArea: 'Chegutu Town',
    currentRoad: 'Robert Mugabe Street',
    currentLandmark: 'Chegutu Main Post Office',
    nextStop: 'Delivered',
    distanceToNextStop: '0 km',
    location: { lat: -18.1333, lng: 30.1500 }
  },
  'SHIP-045': {
    origin: 'Gweru, Zimbabwe',
    destination: 'Kwekwe, Zimbabwe',
    route: 'Gweru to Kwekwe',
    distance: '90 km',
    eta: getDemoEta('Delivered', '90 km'),
    status: 'Delivered',
    currentArea: 'Kwekwe CBD',
    currentRoad: 'Robert Mugabe Way',
    currentLandmark: 'Kwekwe Civic Centre',
    nextStop: 'Delivered',
    distanceToNextStop: '0 km',
    location: { lat: -18.9200, lng: 29.8100 }
  },
  'SHIP-046': {
    origin: 'Kwekwe, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Kwekwe to Harare',
    distance: '220 km',
    eta: getDemoEta('Delivered', '220 km'),
    status: 'Delivered',
    currentArea: 'Harare CBD',
    currentRoad: 'Jason Moyo Avenue',
    currentLandmark: 'Harare Central Police Station',
    nextStop: 'Delivered',
    distanceToNextStop: '0 km',
    location: { lat: -17.83497, lng: 31.04802 }
  },
  'SHIP-047': {
    origin: 'Masvingo, Zimbabwe',
    destination: 'Chiredzi, Zimbabwe',
    route: 'Masvingo to Chiredzi',
    distance: '160 km',
    eta: getDemoEta('In Transit', '160 km'),
    status: 'In Transit',
    currentArea: 'Ngundu',
    currentRoad: 'A4 Highway',
    currentLandmark: 'Ngundu Growth Point',
    nextStop: 'Chiredzi, Zimbabwe',
    distanceToNextStop: '80 km',
    location: { lat: -20.7500, lng: 30.9667 }
  },
  'SHIP-048': {
    origin: 'Chiredzi, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Chiredzi to Harare',
    distance: '400 km',
    eta: getDemoEta('Pending', '400 km'),
    status: 'Pending',
    currentArea: 'Chiredzi Depot',
    currentRoad: 'Mkwasini Way',
    currentLandmark: 'Chiredzi Loading Bay 1',
    nextStop: 'Masvingo, Zimbabwe',
    distanceToNextStop: '160 km',
    location: { lat: -21.0500, lng: 31.6700 }
  },
  'SHIP-049': {
    origin: 'Kariba, Zimbabwe',
    destination: 'Chirundu, Zimbabwe',
    route: 'Kariba to Chirundu (Zambia Border)',
    distance: '90 km',
    eta: getDemoEta('At Border - Clearance', '90 km'),
    status: 'At Border - Clearance',
    currentArea: 'Chirundu Border Post',
    currentRoad: 'A1 Highway',
    currentLandmark: 'Chirundu Customs - Lane 4',
    nextStop: 'Crossing to Zambia',
    distanceToNextStop: '1 km',
    location: { lat: -16.0283, lng: 28.8550 }
  },
  'SHIP-050': {
    origin: 'Plumtree, Zimbabwe',
    destination: 'Bulawayo, Zimbabwe',
    route: 'Plumtree to Bulawayo',
    distance: '110 km',
    eta: getDemoEta('At Border - Clearance', '110 km'),
    status: 'At Border - Clearance',
    currentArea: 'Plumtree Border Post',
    currentRoad: 'A7 Highway',
    currentLandmark: 'Plumtree Customs Office',
    nextStop: 'Bulawayo, Zimbabwe',
    distanceToNextStop: '110 km',
    location: { lat: -20.4800, lng: 27.8200 }
  }
};

export default zimbabweRoutes;

