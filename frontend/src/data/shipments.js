// ============================================
// ZIMBABWE SHIPMENTS DATA - 50 SHIPMENTS
// Realistic distribution across popular routes
// ============================================

const zimbabweRoutes = {
  // ============================================
  // HARARE → BULAWAYO (5 shipments - popular route)
  // ============================================
  'SHIP-001': {
    origin: 'Harare, Zimbabwe',
    destination: 'Bulawayo, Zimbabwe',
    route: 'Harare → Bulawayo',
    distance: '440 km',
    eta: '2026-08-07 16:30',
    status: 'In Transit',
    location: { lat: -19.0154, lng: 29.1549 }
  },
  'SHIP-002': {
    origin: 'Harare, Zimbabwe',
    destination: 'Bulawayo, Zimbabwe',
    route: 'Harare → Bulawayo',
    distance: '440 km',
    eta: '2026-08-08 10:00',
    status: 'In Transit',
    location: { lat: -19.4550, lng: 29.8100 }
  },
  'SHIP-003': {
    origin: 'Harare, Zimbabwe',
    destination: 'Bulawayo, Zimbabwe',
    route: 'Harare → Bulawayo',
    distance: '440 km',
    eta: '2026-08-06 14:00',
    status: 'Delivered',
    location: { lat: -20.1486, lng: 28.5877 }
  },
  'SHIP-004': {
    origin: 'Harare, Zimbabwe',
    destination: 'Bulawayo, Zimbabwe',
    route: 'Harare → Bulawayo',
    distance: '440 km',
    eta: '2026-08-09 11:30',
    status: 'Pending',
    location: { lat: -17.8252, lng: 31.0335 }
  },
  'SHIP-005': {
    origin: 'Harare, Zimbabwe',
    destination: 'Bulawayo, Zimbabwe',
    route: 'Harare → Bulawayo',
    distance: '440 km',
    eta: '2026-08-08 15:00',
    status: 'In Transit',
    location: { lat: -19.0154, lng: 29.1549 }
  },

  // ============================================
  // HARARE → MUTARE (4 shipments)
  // ============================================
  'SHIP-006': {
    origin: 'Harare, Zimbabwe',
    destination: 'Mutare, Zimbabwe',
    route: 'Harare → Mutare',
    distance: '263 km',
    eta: '2026-08-07 12:00',
    status: 'Delivered',
    location: { lat: -18.9758, lng: 32.6707 }
  },
  'SHIP-007': {
    origin: 'Harare, Zimbabwe',
    destination: 'Mutare, Zimbabwe',
    route: 'Harare → Mutare',
    distance: '263 km',
    eta: '2026-08-08 09:30',
    status: 'In Transit',
    location: { lat: -18.5000, lng: 31.5000 }
  },
  'SHIP-008': {
    origin: 'Harare, Zimbabwe',
    destination: 'Mutare, Zimbabwe',
    route: 'Harare → Mutare',
    distance: '263 km',
    eta: '2026-08-08 14:00',
    status: 'In Transit',
    location: { lat: -18.2000, lng: 32.0000 }
  },
  'SHIP-009': {
    origin: 'Harare, Zimbabwe',
    destination: 'Mutare, Zimbabwe',
    route: 'Harare → Mutare',
    distance: '263 km',
    eta: '2026-08-07 16:00',
    status: 'Delivered',
    location: { lat: -17.8252, lng: 31.0335 }
  },

  // ============================================
  // HARARE → BEITBRIDGE (4 shipments - border route)
  // ============================================
  'SHIP-010': {
    origin: 'Harare, Zimbabwe',
    destination: 'Beitbridge, Zimbabwe',
    route: 'Harare → Beitbridge (Border)',
    distance: '580 km',
    eta: '2026-08-08 09:00',
    status: 'In Transit',
    location: { lat: -20.1325, lng: 28.6265 }
  },
  'SHIP-011': {
    origin: 'Harare, Zimbabwe',
    destination: 'Beitbridge, Zimbabwe',
    route: 'Harare → Beitbridge (Border)',
    distance: '580 km',
    eta: '2026-08-09 11:00',
    status: 'At Border - Clearance',
    location: { lat: -22.2150, lng: 30.0000 }
  },
  'SHIP-012': {
    origin: 'Harare, Zimbabwe',
    destination: 'Beitbridge, Zimbabwe',
    route: 'Harare → Beitbridge (Border)',
    distance: '580 km',
    eta: '2026-08-08 16:30',
    status: 'In Transit',
    location: { lat: -21.0200, lng: 30.0000 }
  },
  'SHIP-013': {
    origin: 'Harare, Zimbabwe',
    destination: 'Beitbridge, Zimbabwe',
    route: 'Harare → Beitbridge (Border)',
    distance: '580 km',
    eta: '2026-08-07 18:00',
    status: 'Delivered',
    location: { lat: -22.2150, lng: 30.0000 }
  },

  // ============================================
  // HARARE → VICTORIA FALLS (3 shipments)
  // ============================================
  'SHIP-014': {
    origin: 'Harare, Zimbabwe',
    destination: 'Victoria Falls, Zimbabwe',
    route: 'Harare → Victoria Falls',
    distance: '750 km',
    eta: '2026-08-09 14:00',
    status: 'In Transit',
    location: { lat: -17.9328, lng: 25.8307 }
  },
  'SHIP-015': {
    origin: 'Harare, Zimbabwe',
    destination: 'Victoria Falls, Zimbabwe',
    route: 'Harare → Victoria Falls',
    distance: '750 km',
    eta: '2026-08-10 10:00',
    status: 'In Transit',
    location: { lat: -18.5000, lng: 27.5000 }
  },
  'SHIP-016': {
    origin: 'Harare, Zimbabwe',
    destination: 'Victoria Falls, Zimbabwe',
    route: 'Harare → Victoria Falls',
    distance: '750 km',
    eta: '2026-08-08 12:00',
    status: 'Delivered',
    location: { lat: -17.9328, lng: 25.8307 }
  },

  // ============================================
  // HARARE → GWERU (3 shipments)
  // ============================================
  'SHIP-017': {
    origin: 'Harare, Zimbabwe',
    destination: 'Gweru, Zimbabwe',
    route: 'Harare → Gweru',
    distance: '275 km',
    eta: '2026-08-07 11:30',
    status: 'In Transit',
    location: { lat: -19.4550, lng: 29.8100 }
  },
  'SHIP-018': {
    origin: 'Harare, Zimbabwe',
    destination: 'Gweru, Zimbabwe',
    route: 'Harare → Gweru',
    distance: '275 km',
    eta: '2026-08-07 14:00',
    status: 'Delivered',
    location: { lat: -19.4550, lng: 29.8100 }
  },
  'SHIP-019': {
    origin: 'Harare, Zimbabwe',
    destination: 'Gweru, Zimbabwe',
    route: 'Harare → Gweru',
    distance: '275 km',
    eta: '2026-08-08 10:00',
    status: 'In Transit',
    location: { lat: -18.5000, lng: 30.0000 }
  },

  // ============================================
  // HARARE → MASVINGO (3 shipments)
  // ============================================
  'SHIP-020': {
    origin: 'Harare, Zimbabwe',
    destination: 'Masvingo, Zimbabwe',
    route: 'Harare → Masvingo',
    distance: '295 km',
    eta: '2026-08-08 08:00',
    status: 'Pending',
    location: { lat: -20.0625, lng: 30.8300 }
  },
  'SHIP-021': {
    origin: 'Harare, Zimbabwe',
    destination: 'Masvingo, Zimbabwe',
    route: 'Harare → Masvingo',
    distance: '295 km',
    eta: '2026-08-08 14:00',
    status: 'In Transit',
    location: { lat: -19.5000, lng: 30.5000 }
  },
  'SHIP-022': {
    origin: 'Harare, Zimbabwe',
    destination: 'Masvingo, Zimbabwe',
    route: 'Harare → Masvingo',
    distance: '295 km',
    eta: '2026-08-07 12:00',
    status: 'Delivered',
    location: { lat: -20.0625, lng: 30.8300 }
  },

  // ============================================
  // BULAWAYO → HARARE (3 shipments)
  // ============================================
  'SHIP-023': {
    origin: 'Bulawayo, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Bulawayo → Harare',
    distance: '440 km',
    eta: '2026-08-08 10:00',
    status: 'In Transit',
    location: { lat: -19.0154, lng: 29.1549 }
  },
  'SHIP-024': {
    origin: 'Bulawayo, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Bulawayo → Harare',
    distance: '440 km',
    eta: '2026-08-07 15:00',
    status: 'Delivered',
    location: { lat: -18.5000, lng: 30.0000 }
  },
  'SHIP-025': {
    origin: 'Bulawayo, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Bulawayo → Harare',
    distance: '440 km',
    eta: '2026-08-09 14:00',
    status: 'Pending',
    location: { lat: -20.1486, lng: 28.5877 }
  },

  // ============================================
  // BULAWAYO → VICTORIA FALLS (3 shipments)
  // ============================================
  'SHIP-026': {
    origin: 'Bulawayo, Zimbabwe',
    destination: 'Victoria Falls, Zimbabwe',
    route: 'Bulawayo → Victoria Falls',
    distance: '440 km',
    eta: '2026-08-08 16:30',
    status: 'Delayed - Weather',
    location: { lat: -18.9104, lng: 27.4850 }
  },
  'SHIP-027': {
    origin: 'Bulawayo, Zimbabwe',
    destination: 'Victoria Falls, Zimbabwe',
    route: 'Bulawayo → Victoria Falls',
    distance: '440 km',
    eta: '2026-08-09 12:00',
    status: 'In Transit',
    location: { lat: -18.5000, lng: 27.5000 }
  },
  'SHIP-028': {
    origin: 'Bulawayo, Zimbabwe',
    destination: 'Victoria Falls, Zimbabwe',
    route: 'Bulawayo → Victoria Falls',
    distance: '440 km',
    eta: '2026-08-07 14:00',
    status: 'Delivered',
    location: { lat: -17.9328, lng: 25.8307 }
  },

  // ============================================
  // BEITBRIDGE → HARARE (3 shipments)
  // ============================================
  'SHIP-029': {
    origin: 'Beitbridge, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Beitbridge → Harare',
    distance: '580 km',
    eta: '2026-08-09 12:00',
    status: 'At Border - Clearance',
    location: { lat: -22.2150, lng: 30.0000 }
  },
  'SHIP-030': {
    origin: 'Beitbridge, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Beitbridge → Harare',
    distance: '580 km',
    eta: '2026-08-08 14:00',
    status: 'In Transit',
    location: { lat: -21.0200, lng: 30.0000 }
  },
  'SHIP-031': {
    origin: 'Beitbridge, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Beitbridge → Harare',
    distance: '580 km',
    eta: '2026-08-10 10:00',
    status: 'Pending',
    location: { lat: -22.2150, lng: 30.0000 }
  },

  // ============================================
  // MUTARE → HARARE (2 shipments)
  // ============================================
  'SHIP-032': {
    origin: 'Mutare, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Mutare → Harare',
    distance: '263 km',
    eta: '2026-08-07 15:00',
    status: 'Delivered',
    location: { lat: -17.8252, lng: 31.0335 }
  },
  'SHIP-033': {
    origin: 'Mutare, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Mutare → Harare',
    distance: '263 km',
    eta: '2026-08-08 11:00',
    status: 'In Transit',
    location: { lat: -18.5000, lng: 31.5000 }
  },

  // ============================================
  // HARARE → KARIBA (2 shipments)
  // ============================================
  'SHIP-034': {
    origin: 'Harare, Zimbabwe',
    destination: 'Kariba, Zimbabwe',
    route: 'Harare → Kariba',
    distance: '370 km',
    eta: '2026-08-08 14:00',
    status: 'In Transit',
    location: { lat: -16.5167, lng: 28.8000 }
  },
  'SHIP-035': {
    origin: 'Harare, Zimbabwe',
    destination: 'Kariba, Zimbabwe',
    route: 'Harare → Kariba',
    distance: '370 km',
    eta: '2026-08-09 10:00',
    status: 'Pending',
    location: { lat: -17.0000, lng: 29.5000 }
  },

  // ============================================
  // HARARE → CHIRUNDU (2 shipments - border)
  // ============================================
  'SHIP-036': {
    origin: 'Harare, Zimbabwe',
    destination: 'Chirundu, Zimbabwe',
    route: 'Harare → Chirundu (Zambia Border)',
    distance: '370 km',
    eta: '2026-08-07 14:00',
    status: 'At Border - Clearance',
    location: { lat: -16.0283, lng: 28.8550 }
  },
  'SHIP-037': {
    origin: 'Harare, Zimbabwe',
    destination: 'Chirundu, Zimbabwe',
    route: 'Harare → Chirundu (Zambia Border)',
    distance: '370 km',
    eta: '2026-08-08 12:00',
    status: 'In Transit',
    location: { lat: -16.5000, lng: 29.0000 }
  },

  // ============================================
  // HARARE → PLUMTREE (2 shipments - border)
  // ============================================
  'SHIP-038': {
    origin: 'Harare, Zimbabwe',
    destination: 'Plumtree, Zimbabwe',
    route: 'Harare → Plumtree (Botswana Border)',
    distance: '480 km',
    eta: '2026-08-08 13:00',
    status: 'At Border - Clearance',
    location: { lat: -20.4800, lng: 27.8200 }
  },
  'SHIP-039': {
    origin: 'Harare, Zimbabwe',
    destination: 'Plumtree, Zimbabwe',
    route: 'Harare → Plumtree (Botswana Border)',
    distance: '480 km',
    eta: '2026-08-09 15:00',
    status: 'In Transit',
    location: { lat: -19.5000, lng: 28.5000 }
  },

  // ============================================
  // HARARE → NYAMAPANDA (2 shipments - border)
  // ============================================
  'SHIP-040': {
    origin: 'Harare, Zimbabwe',
    destination: 'Nyamapanda, Zimbabwe',
    route: 'Harare → Nyamapanda (Mozambique Border)',
    distance: '320 km',
    eta: '2026-08-08 09:00',
    status: 'In Transit',
    location: { lat: -16.9300, lng: 32.5000 }
  },
  'SHIP-041': {
    origin: 'Harare, Zimbabwe',
    destination: 'Nyamapanda, Zimbabwe',
    route: 'Harare → Nyamapanda (Mozambique Border)',
    distance: '320 km',
    eta: '2026-08-07 16:00',
    status: 'Delivered',
    location: { lat: -17.5000, lng: 32.0000 }
  },

  // ============================================
  // ADDITIONAL ROUTES (SHIP-042 to SHIP-050)
  // ============================================
  'SHIP-042': {
    origin: 'Harare, Zimbabwe',
    destination: 'Chinhoyi, Zimbabwe',
    route: 'Harare → Chinhoyi',
    distance: '130 km',
    eta: '2026-08-07 08:30',
    status: 'Delivered',
    location: { lat: -17.3500, lng: 30.2000 }
  },
  'SHIP-043': {
    origin: 'Harare, Zimbabwe',
    destination: 'Kadoma, Zimbabwe',
    route: 'Harare → Kadoma',
    distance: '140 km',
    eta: '2026-08-07 09:00',
    status: 'In Transit',
    location: { lat: -18.3333, lng: 29.9167 }
  },
  'SHIP-044': {
    origin: 'Harare, Zimbabwe',
    destination: 'Chegutu, Zimbabwe',
    route: 'Harare → Chegutu',
    distance: '110 km',
    eta: '2026-08-07 08:00',
    status: 'Delivered',
    location: { lat: -18.1333, lng: 30.1500 }
  },
  'SHIP-045': {
    origin: 'Gweru, Zimbabwe',
    destination: 'Kwekwe, Zimbabwe',
    route: 'Gweru → Kwekwe',
    distance: '90 km',
    eta: '2026-08-07 10:00',
    status: 'Delivered',
    location: { lat: -18.9200, lng: 29.8100 }
  },
  'SHIP-046': {
    origin: 'Kwekwe, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Kwekwe → Harare',
    distance: '220 km',
    eta: '2026-08-07 10:00',
    status: 'Delivered',
    location: { lat: -18.9200, lng: 29.8100 }
  },
  'SHIP-047': {
    origin: 'Masvingo, Zimbabwe',
    destination: 'Chiredzi, Zimbabwe',
    route: 'Masvingo → Chiredzi',
    distance: '160 km',
    eta: '2026-08-08 12:00',
    status: 'In Transit',
    location: { lat: -20.5000, lng: 31.5000 }
  },
  'SHIP-048': {
    origin: 'Chiredzi, Zimbabwe',
    destination: 'Harare, Zimbabwe',
    route: 'Chiredzi → Harare',
    distance: '400 km',
    eta: '2026-08-09 11:00',
    status: 'Pending',
    location: { lat: -21.0500, lng: 31.6700 }
  },
  'SHIP-049': {
    origin: 'Kariba, Zimbabwe',
    destination: 'Chirundu, Zimbabwe',
    route: 'Kariba → Chirundu (Zambia Border)',
    distance: '90 km',
    eta: '2026-08-07 16:00',
    status: 'At Border - Clearance',
    location: { lat: -16.0283, lng: 28.8550 }
  },
  'SHIP-050': {
    origin: 'Plumtree, Zimbabwe',
    destination: 'Bulawayo, Zimbabwe',
    route: 'Plumtree → Bulawayo',
    distance: '110 km',
    eta: '2026-08-07 10:30',
    status: 'At Border - Clearance',
    location: { lat: -20.4800, lng: 27.8200 }
  }
};

export default zimbabweRoutes;