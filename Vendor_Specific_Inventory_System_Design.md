# Vendor-Specific Inventory Management System
## Complete Design for Wedding Industry

**Author:** V Anant AI  
**For:** Veecap Wedding ERP  
**Version:** 1.0  
**Date:** November 2025

---

## 🎯 System Overview

This document extends MODULE_10 (Inventory & Warehouse Management) to handle vendor-specific inventory requirements across different wedding service categories.

### Key Objectives

1. **Unified System** - One platform for all vendor types
2. **Category-Specific Fields** - Unique attributes per vendor type
3. **Smart Workflows** - Automated processes per category
4. **Cross-Vendor Tracking** - When multiple vendors share items
5. **Integration Ready** - Connects with existing modules

---

## 📊 Vendor Type Configurations

### 1. ELECTRICAL VENDORS

**Typical Inventory:**
- LED lights (moving heads, par cans, wash lights)
- Traditional lighting (halogens, spots)
- Generators (various KVA ratings)
- Power distribution (cables, distro boxes, MCBs)
- Control equipment (DMX controllers, dimmers)

**Special Fields Required:**

```prisma
model ElectricalEquipment {
  // Extends InventoryItem
  
  // ========== ELECTRICAL SPECS ==========
  voltage           Int?            // 220V, 110V, etc
  wattage           Decimal?        @db.Decimal(8, 2)
  amperage          Decimal?        @db.Decimal(8, 2)
  
  // For generators
  kvaRating         Decimal?        @db.Decimal(8, 2)
  fuelType          String?         // Diesel, Petrol, Gas
  fuelCapacity      Decimal?        @db.Decimal(8, 2)  // Liters
  runTime           Decimal?        @db.Decimal(8, 2)  // Hours on full tank
  
  // For lights
  beamAngle         Int?            // Degrees
  colorTemperature  Int?            // Kelvin (2700K, 3000K, 5600K, etc)
  lumens            Int?
  controlType       String?         // DMX, Manual, WiFi
  dmxChannels       Int?
  
  // For cables
  cableLength       Decimal?        @db.Decimal(8, 2)  // Meters
  cableGauge        String?         // AWG rating
  connectorType     String?         // XLR, PowerCon, etc
  
  // Safety & Compliance
  ipRating          String?         // IP65, IP20, etc (water resistance)
  certifications    String[]        // CE, UL, ISI, etc
  lastSafetyTest    DateTime?
  nextSafetyTest    DateTime?
  
  // Usage Tracking
  totalHours        Decimal?        @db.Decimal(10, 2)
  lastServiceHours  Decimal?        @db.Decimal(10, 2)
  serviceInterval   Decimal?        @db.Decimal(10, 2)  // Every X hours
  
  // Temperature Management (critical for generators)
  operatingTemp     String?         // "-10°C to 45°C"
  
  // ========== RELATIONSHIPS ==========
  compatibleWith    String[]        // IDs of compatible equipment
  requiresAccessories String[]      // "DMX Cable", "Power Cable", etc
}
```

**Workflow Automations:**

1. **Pre-Event Check:**
   - Verify generator fuel levels
   - Check bulb life remaining
   - Test electrical connections
   - Confirm voltage compatibility

2. **Usage Tracking:**
   - Log generator running hours
   - Track bulb hours for replacement
   - Monitor power consumption

3. **Maintenance Alerts:**
   - "Generator service due at 500 hours" (currently 480 hours)
   - "Moving head bulb at 80% life - order replacement"
   - "Safety certification expires in 30 days"

---

### 2. STRUCTURES & FABRICATION VENDORS

**Typical Inventory:**
- Mandap structures (traditional, modern, themed)
- Stage platforms (modular, custom)
- Trusses and rigging equipment
- Backdrop frames
- Entrance arches

**Special Fields Required:**

```prisma
model StructureEquipment {
  // Extends InventoryItem
  
  // ========== STRUCTURAL SPECS ==========
  
  // Dimensions (assembled)
  assembledLength   Decimal?        @db.Decimal(10, 2)  // Meters
  assembledWidth    Decimal?        @db.Decimal(10, 2)
  assembledHeight   Decimal?        @db.Decimal(10, 2)
  
  // Weight
  totalWeight       Decimal?        @db.Decimal(10, 2)  // Kg
  
  // Load Capacity
  maxLoadCapacity   Decimal?        @db.Decimal(10, 2)  // Kg
  safeWorkingLoad   Decimal?        @db.Decimal(10, 2)  // Kg
  
  // Material
  primaryMaterial   String?         // Steel, Aluminum, Wood, Acrylic
  finish            String?         // Powder coated, Chrome, Natural
  
  // Assembly
  assemblyType      String          @default("MODULAR")  
  // MODULAR, FIXED, CUSTOM, PRE_ASSEMBLED
  
  assemblyTime      Decimal?        @db.Decimal(8, 2)  // Hours
  disassemblyTime   Decimal?        @db.Decimal(8, 2)  // Hours
  laborRequired     Int?            // Number of people needed
  
  requiresTools     String[]        // "Allen Keys", "Spanners", "Electric Drill"
  requiresEquipment String[]        // "Forklift", "Scissor Lift", "Crane"
  
  // Components
  totalComponents   Int?            // Number of pieces
  componentsList    Json?           // Detailed component breakdown
  
  // Storage
  packagedLength    Decimal?        @db.Decimal(10, 2)  // Meters (when disassembled)
  packagedWidth     Decimal?        @db.Decimal(10, 2)
  packagedHeight    Decimal?        @db.Decimal(10, 2)
  packagedWeight    Decimal?        @db.Decimal(10, 2)  // Kg
  
  storageSpace      Decimal?        @db.Decimal(10, 2)  // Cubic meters
  stackable         Boolean         @default(false)
  maxStack          Int?            // How many can be stacked
  
  // Transportation
  truckSizeRequired String?         // "Tata Ace", "20ft Container", "Canter"
  loadsPerTruck     Int?            // How many units fit in one truck
  
  // Safety
  structuralCert    String?         // Structural engineer certificate
  lastInspection    DateTime?
  inspectionInterval Int?           // Days
  
  // Weather Resistance
  weatherProof      Boolean         @default(false)
  windRating        String?         // "Up to 40 km/h"
  
  // ========== DESIGN INFO ==========
  style             String?         // "Traditional", "Modern", "Minimalist"
  theme             String?         // "Royal", "Floral", "Crystal"
  colorScheme       String[]
  
  // ========== DOCUMENTATION ==========
  assemblyManual    String?         // PDF URL
  assemblyVideo     String?         // Video URL
  structuralDrawing String?         // CAD file URL
  
  // ========== RELATIONSHIPS ==========
  requiredParts     String[]        // IDs of mandatory components
  optionalParts     String[]        // IDs of optional add-ons
  compatibleDecor   String[]        // IDs of compatible decor items
}
```

**Workflow Automations:**

1. **Pre-Event Planning:**
   - Calculate required assembly time
   - Generate component checklist
   - Verify all parts present
   - Schedule labor (based on labor required)

2. **Transportation Planning:**
   - Auto-calculate truck requirements
   - Optimize loading sequence
   - Generate transportation cost

3. **Safety Checks:**
   - Verify structural certification current
   - Check weather forecast vs wind rating
   - Confirm load capacity for planned usage

---

### 3. EVENT PRODUCTION & AV VENDORS

**Typical Inventory:**
- Audio systems (speakers, mixers, microphones)
- Visual equipment (projectors, LED walls, screens)
- Recording equipment (cameras, switchers)
- Streaming equipment
- DJ equipment

**Special Fields Required:**

```prisma
model AVEquipment {
  // Extends InventoryItem
  
  // ========== AUDIO SPECS ==========
  // For speakers
  powerRating       Decimal?        @db.Decimal(8, 2)  // Watts RMS
  impedance         Decimal?        @db.Decimal(8, 2)  // Ohms
  frequencyRange    String?         // "20Hz - 20kHz"
  spl               Int?            // Sound pressure level (dB)
  coverage          String?         // "90° x 50°"
  
  // For microphones
  micType           String?         // "Condenser", "Dynamic", "Ribbon"
  polarPattern      String?         // "Cardioid", "Omnidirectional"
  
  // For mixers
  channels          Int?            // Number of channels
  inputTypes        String[]        // ["XLR", "TRS", "RCA"]
  outputTypes       String[]
  builtInEffects    String[]        // ["Reverb", "Compression", "EQ"]
  
  // ========== VIDEO SPECS ==========
  // For projectors/displays
  resolution        String?         // "1920x1080", "4K"
  brightness        Int?            // Lumens
  contrastRatio     String?         // "10000:1"
  throwDistance     String?         // "1.5m - 10m"
  screenSize        String?         // "100 inch"
  
  // For LED walls
  pixelPitch        Decimal?        @db.Decimal(8, 2)  // mm
  panelSize         String?         // "500mm x 500mm"
  refreshRate       Int?            // Hz
  
  // For cameras
  sensorSize        String?         // "Full Frame", "APS-C"
  recordingFormats  String[]        // ["4K 60fps", "1080p 120fps"]
  lensMount         String?         // "EF", "PL", "E-mount"
  
  // ========== CONNECTIVITY ==========
  inputPorts        Json?           // Detailed port configuration
  outputPorts       Json?
  wirelessCapable   Boolean         @default(false)
  wirelessProtocol  String?         // "WiFi 6", "Bluetooth 5.0"
  controlProtocol   String?         // "ArtNet", "sACN", "MIDI"
  
  // ========== POWER REQUIREMENTS ==========
  powerConsumption  Decimal?        @db.Decimal(8, 2)  // Watts
  powerInput        String?         // "220V AC" or "12V DC"
  batteryPowered    Boolean         @default(false)
  batteryLife       Decimal?        @db.Decimal(8, 2)  // Hours
  
  // ========== CALIBRATION ==========
  requiresCalibration Boolean       @default(false)
  lastCalibration   DateTime?
  calibrationInterval Int?          // Days
  calibrationNotes  String?         @db.Text
  
  // ========== COMPATIBILITY ==========
  compatibleSoftware String[]       // "Pro Tools", "Logic Pro X"
  firmwareVersion   String?
  lastFirmwareUpdate DateTime?
  
  // ========== ACCESSORIES ==========
  includedCables    String[]
  requiredAdapters  String[]
  compatibleAccessories String[]    // IDs
  
  // ========== USAGE TRACKING ==========
  totalOperatingHours Decimal?     @db.Decimal(10, 2)
  lampHours         Decimal?        @db.Decimal(10, 2)  // For projectors
  lampLifeRemaining Decimal?        @db.Decimal(5, 2)   // Percentage
  
  // ========== ENVIRONMENTAL ==========
  operatingTempRange String?        // "0°C to 40°C"
  storageTemp Range  String?
  humidity          String?         // "20% - 80% non-condensing"
  
  // ========== TRANSPORTATION ==========
  flightCaseRequired Boolean        @default(false)
  flightCaseId      String?
  fragile           Boolean         @default(true)
  
  // ========== DOCUMENTATION ==========
  userManual        String?         // PDF URL
  quickStartGuide   String?
  troubleshootingGuide String?
  wireDiagram       String?         // PDF URL
}
```

**Workflow Automations:**

1. **Pre-Event Setup:**
   - Generate signal flow diagram
   - Create cable list
   - Verify firmware up to date
   - Check battery levels

2. **Calibration Management:**
   - Alert when calibration due
   - Track calibration history
   - Document calibration settings

3. **Compatibility Checks:**
   - Verify all components compatible
   - Flag version mismatches
   - Suggest adapter requirements

---

### 4. DECOR & PROPS VENDORS

**Typical Inventory:**
- Centerpieces
- Vases and vessels
- Artificial flowers & plants
- Drapes and fabrics
- Themed props
- Signage

**Special Fields Required:**

```prisma
model DecorItem {
  // Extends InventoryItem
  
  // ========== AESTHETIC SPECS ==========
  style             String?         // "Traditional", "Modern", "Rustic", "Minimalist"
  theme             String[]        // ["Royal", "Floral", "Vintage", "Beach"]
  occasion          String[]        // ["Sangeet", "Mehendi", "Wedding", "Reception"]
  
  // Color
  primaryColor      String?
  secondaryColor    String?
  colorPalette      String[]        // Hex codes or names
  metallic          Boolean         @default(false)
  metallicFinish    String?         // "Gold", "Silver", "Rose Gold", "Copper"
  
  // Material
  primaryMaterial   String?         // "Glass", "Acrylic", "Metal", "Wood", "Fabric"
  secondaryMaterial String?
  sustainableMaterial Boolean       @default(false)
  
  // Texture & Finish
  texture           String?         // "Glossy", "Matte", "Textured", "Brushed"
  finish            String?         // "Polished", "Distressed", "Natural"
  
  // ========== SIZE & PLACEMENT ==========
  heightVariants    Json?           // Different height options
  arrangementType   String?         // "Centerpiece", "Corner", "Hanging", "Floor"
  tableCompatibility String[]       // ["Round 5ft", "Rectangular 8ft", "Cocktail"]
  
  // Space Requirements
  minimumSpacing    Decimal?        @db.Decimal(8, 2)  // Meters between items
  idealPlacement    String?         @db.Text  // Placement suggestions
  
  // ========== COMPOSITION ==========
  pieceType         String?         // "Single", "Set", "Arrangement"
  piecesInSet       Int?            // If sold/rented as set
  setComponents     Json?           // Detailed breakdown
  
  // For floral/plant items
  realFlowers       Boolean         @default(false)
  artificialType    String?         // "Silk", "Foam", "Plastic"
  plantType         String?         // "Succulent", "Orchid", "Roses"
  
  // ========== DURABILITY ==========
  fragile           Boolean         @default(false)
  breakageRate      Decimal?        @db.Decimal(5, 2)  // Percentage
  
  waterproof        Boolean         @default(false)
  outdoorSafe       Boolean         @default(false)
  sunFastness       String?         // "High", "Medium", "Low"
  
  // ========== CLEANING & CARE ==========
  cleaningMethod    String?         // "Wipe", "Wash", "Dry Clean", "Special"
  cleaningInstructions String?      @db.Text
  cleaningTime      Decimal?        @db.Decimal(8, 2)  // Minutes per item
  
  requiresAssembly  Boolean         @default(false)
  assemblyTime      Decimal?        @db.Decimal(8, 2)  // Minutes
  
  // ========== VERSATILITY ==========
  customizable      Boolean         @default(false)
  customizationOptions String[]     // ["Color change", "Size adjust", "Add flowers"]
  
  seasonal          Boolean         @default(false)
  bestSeasons       String[]        // ["Summer", "Winter", "Monsoon"]
  
  culturalStyle     String[]        // ["North Indian", "South Indian", "Punjabi", "Bengali"]
  
  // ========== PHOTOGRAPHY ==========
  photogenic        Boolean         @default(true)
  instagrammable    Boolean         @default(false)
  lightingRequirement String?       // "Natural", "Spotlight", "Ambient", "Any"
  
  // ========== TRENDS ==========
  trendStatus       String?         // "Trending", "Classic", "Vintage", "Seasonal"
  popularityScore   Int?            // 1-10 based on booking frequency
  
  // ========== USAGE HISTORY ==========
  totalBookings     Int             @default(0)
  averageRating     Decimal?        @db.Decimal(3, 2)
  clientFeedback    Json?           // Array of feedback
  
  // ========== COORDINATION ==========
  pairsWellWith     String[]        // IDs of complementary items
  visuallyClashesWith String[]      // IDs to avoid pairing
  
  // ========== STORAGE ==========
  storageType       String?         // "Flat", "Hanging", "Stacked", "Special Box"
  storageProtection String?         // "Bubble Wrap", "Foam", "Box", "Cover"
}
```

**Workflow Automations:**

1. **Event Styling:**
   - Suggest items based on theme/color
   - Flag color clashes
   - Recommend complementary pieces
   - Generate mood board

2. **Availability Planning:**
   - Check seasonal appropriateness
   - Verify weather compatibility
   - Suggest alternatives if unavailable

3. **Post-Event:**
   - Track cleaning time for billing
   - Document condition changes
   - Update popularity scores

---

### 5. FURNITURE VENDORS

**Typical Inventory:**
- Chairs (Chiavari, Ghost, Napoleon, Folding)
- Tables (Round, Rectangular, Cocktail, Bar)
- Sofas and seating (Lounges, Ottomans, Benches)
- Bars and counters

**Special Fields Required:**

```prisma
model FurnitureItem {
  // Extends InventoryItem
  
  // ========== FURNITURE SPECS ==========
  furnitureType     String          // "Chair", "Table", "Sofa", "Bar", "Bench"
  subType           String?         // "Chiavari", "Ghost", "Napoleon"
  
  // Seating
  seatingCapacity   Int?            // For tables and lounges
  armrests          Boolean         @default(false)
  cushioned         Boolean         @default(false)
  cushionType       String?         // "Removable", "Fixed", "Optional"
  
  // Table specific
  tableShape        String?         // "Round", "Rectangle", "Square", "Oval"
  tableSeating      Int?            // Comfortable seating capacity
  
  // Dimensions
  seatHeight        Decimal?        @db.Decimal(8, 2)  // cm
  seatWidth         Decimal?        @db.Decimal(8, 2)
  seatDepth         Decimal?        @db.Decimal(8, 2)
  
  tableHeight       Decimal?        @db.Decimal(8, 2)  // cm (Standard: 75-76cm)
  tableDiameter     Decimal?        @db.Decimal(8, 2)  // For round tables
  
  // ========== MATERIAL & FINISH ==========
  frameMaterial     String?         // "Wood", "Metal", "Plastic", "Resin"
  surfaceMaterial   String?         // "Wood", "Glass", "Marble", "Laminate"
  
  finish            String?         // "Natural Wood", "White", "Gold", "Chrome"
  upholstery        String?         // "Velvet", "Leather", "Linen"
  upholsteryColor   String?
  
  // ========== WEIGHT & STACKING ==========
  weightCapacity    Decimal?        @db.Decimal(8, 2)  // Kg (per seat/surface)
  itemWeight        Decimal?        @db.Decimal(8, 2)  // Kg (furniture itself)
  
  stackable         Boolean         @default(false)
  maxStackHeight    Int?            // Number of pieces
  stackedHeight     Decimal?        @db.Decimal(8, 2)  // cm when stacked
  
  foldable          Boolean         @default(false)
  foldedDimensions  Json?           // Length x Width x Height when folded
  
  // ========== SETUP & HANDLING ==========
  assemblyRequired  Boolean         @default(false)
  assemblyTime      Decimal?        @db.Decimal(8, 2)  // Minutes per item
  toolsRequired     String[]
  
  // ========== DURABILITY ==========
  weatherResistant  Boolean         @default(false)
  outdoorRating     String?         // "Indoor Only", "Covered Outdoor", "All Weather"
  
  scratchResistant  Boolean         @default(false)
  stainResistant    Boolean         @default(false)
  
  // Typical lifespan
  expectedLifespan  Int?            // Years
  currentAge        Int?            // Years since purchase
  
  // ========== AESTHETICS ==========
  style             String?         // "Modern", "Classic", "Rustic", "Contemporary"
  eleganceLevel     String?         // "Premium", "Standard", "Economy"
  
  eventType         String[]        // ["Wedding", "Corporate", "Birthday", "Reception"]
  
  // ========== LINENS & COVERS ==========
  requiresLinen     Boolean         @default(false)
  standardLinenSize String?         // "120 inch round", "8ft rectangular"
  
  requiresCover     Boolean         @default(false)
  coverStyle        String[]        // ["Spandex", "Satin", "Polyester"]
  
  // ========== COMFORT & QUALITY ==========
  comfortRating     Int?            // 1-5 stars
  qualityGrade      String?         // "Premium", "Standard", "Budget"
  
  // ========== TRANSPORTATION ==========
  piecesPerTruck    Int?            // How many fit in standard truck
  transportProtection String?       // "Blankets", "Straps", "Dollies Required"
  
  // ========== CONFIGURATION ==========
  configurableWith  String[]        // IDs of compatible accessories/additions
  // Example: Tables compatible with certain centerpieces
  
  // ========== POPULAR COMBINATIONS ==========
  frequentlyBooked With String[]   // IDs of items commonly booked together
  
  // ========== MAINTENANCE ==========
  lastReupholstered DateTime?
  lastRefinished    DateTime?
  maintenanceNotes  String?         @db.Text
  
  // Condition tracking
  structuralIntegrity String?       // "Excellent", "Good", "Fair", "Needs Repair"
  aestheticCondition String?        // "Like New", "Good", "Worn", "Damaged"
}
```

**Workflow Automations:**

1. **Event Layout Planning:**
   - Calculate seating capacity
   - Suggest furniture arrangements
   - Generate floor plans
   - Calculate transportation needs

2. **Linen Management:**
   - Auto-add required linens
   - Calculate linen quantities
   - Match colors and sizes

3. **Quality Monitoring:**
   - Track wear and tear
   - Schedule refurbishment
   - Flag items needing repair

---

### 6. CATERING EQUIPMENT VENDORS

**Typical Inventory:**
- Chafing dishes
- Serving platters and bowls
- Beverage dispensers
- Cutlery and serving utensils
- Glassware and crockery

**Special Fields Required:**

```prisma
model CateringEquipment {
  // Extends InventoryItem
  
  // ========== EQUIPMENT TYPE ==========
  equipmentCategory String          // "Serving", "Cooking", "Storage", "Display"
  equipmentType     String          // "Chafing Dish", "Platter", "Glass", "Cutlery"
  
  // ========== CAPACITY ==========
  servingCapacity   Decimal?        @db.Decimal(8, 2)  // Liters or Kg
  guestServing      Int?            // Approximate guests per item
  
  // For glassware/crockery
  volumeCapacity    Decimal?        @db.Decimal(8, 2)  // ml
  
  // ========== MATERIAL ==========
  material          String          // "Stainless Steel", "Silver", "Glass", "Ceramic"
  foodGrade         Boolean         @default(true)
  
  // ========== HEATING & COOLING ==========
  heatingCapable    Boolean         @default(false)
  heatingMethod     String?         // "Fuel", "Electric", "Induction"
  fuelType          String?         // "Gel Fuel", "Chafing Fuel", "Propane"
  heatingDuration   Decimal?        @db.Decimal(8, 2)  // Hours
  
  coolingCapable    Boolean         @default(false)
  requiresIce       Boolean         @default(false)
  iceCapacity       Decimal?        @db.Decimal(8, 2)  // Kg
  
  // ========== INSULATION ==========
  insulated         Boolean         @default(false)
  temperatureRetention Decimal?     @db.Decimal(8, 2)  // Hours
  
  // ========== PRESENTATION ==========
  presentationStyle String?         // "Elegant", "Rustic", "Modern", "Traditional"
  finish            String?         // "Mirror Polish", "Brushed", "Hammered", "Matte"
  decorativeElements String?        // "Handles", "Legs", "Engraving"
  
  // ========== FOOD SAFETY ==========
  lastSanitization  DateTime?
  sanitizationMethod String?        // "Dishwasher", "Manual", "Steam"
  sanitizationCert  Boolean         @default(false)
  
  foodSafeTemp      String?         // "Above 60°C" or "Below 5°C"
  
  // ========== SETUP & OPERATION ==========
  setupTime         Decimal?        @db.Decimal(8, 2)  // Minutes
  requiresPower     Boolean         @default(false)
  powerRequirement  String?         // "220V AC, 1000W"
  
  requiresStand     Boolean         @default(false)
  standIncluded     Boolean         @default(false)
  standId           String?         // Related stand item ID
  
  // ========== QUANTITY & SETS ==========
  soldInSets        Boolean         @default(false)
  piecesPerSet      Int?
  setComposition    Json?           // Detailed set breakdown
  
  minimumBooking    Int?            // Minimum pieces per booking
  
  // ========== CLEANING ==========
  dishwasherSafe    Boolean         @default(false)
  cleaningDifficulty String?        // "Easy", "Moderate", "Intensive"
  cleaningTime      Decimal?        @db.Decimal(8, 2)  // Minutes per item
  
  specialCleaning   Boolean         @default(false)
  cleaningNotes     String?         @db.Text
  
  // ========== DURABILITY ==========
  scratchResistant  Boolean         @default(false)
  breakageRisk      String?         // "Low", "Medium", "High"
  replacementCost   Decimal?        @db.Decimal(10, 2)
  
  // ========== COMPATIBILITY ==========
  compatibleBurners String[]        // For chafing dishes
  compatibleLids    String[]
  compatibleSizes   String[]        // Standard sizes: "Full", "Half", "Third"
  
  // ========== CUISINE TYPE ==========
  cuisineType       String[]        // ["Indian", "Continental", "Chinese", "Italian"]
  servingStyle      String[]        // ["Buffet", "Table Service", "Cocktail"]
  
  // ========== RENTAL CONSIDERATION ==========
  depositRequired   Decimal?        @db.Decimal(10, 2)
  depositReason     String?         // "High value", "Breakable", "Silver plated"
  
  damageCharge      Decimal?        @db.Decimal(10, 2)  // Per piece
  replacementCharge Decimal?        @db.Decimal(10, 2)
  
  // ========== INVENTORY TRACKING ==========
  countingMethod    String?         // "Individual", "By Weight", "By Set"
  checkOutTime      Decimal?        @db.Decimal(8, 2)  // Minutes to verify and pack
  checkInTime       Decimal?        @db.Decimal(8, 2)  // Minutes to verify and clean
  
  // ========== ACCESSORIES ==========
  requiredAccessories String[]      // ["Fuel Canisters", "Serving Spoons", "Tongs"]
  includedAccessories String[]
}
```

**Workflow Automations:**

1. **Menu-Based Planning:**
   - Suggest equipment based on menu
   - Calculate quantities per guest count
   - Auto-add required accessories

2. **Hygiene Tracking:**
   - Schedule sanitization
   - Track cleaning completion
   - Generate hygiene certificates

3. **Loss Prevention:**
   - Count-based check-out/in
   - Flag missing items immediately
   - Calculate loss/breakage costs

---

## 🔄 Cross-Vendor Workflows

### 1. **Unified Inventory Dashboard**

```typescript
// Dashboard shows inventory from all vendor types
interface UnifiedInventoryView {
  totalItems: number;
  totalValue: number;
  
  byVendorType: {
    electrical: InventorySummary;
    structures: InventorySummary;
    av: InventorySummary;
    decor: InventorySummary;
    furniture: InventorySummary;
    catering: InventorySummary;
  };
  
  availabilityStatus: {
    available: number;
    booked: number;
    maintenance: number;
    damaged: number;
  };
  
  alerts: {
    lowStock: Alert[];
    maintenanceDue: Alert[];
    certificationsExpiring: Alert[];
  };
}
```

### 2. **Event-Based Inventory Assignment**

```typescript
// When creating event requirements, system intelligently suggests items

interface EventInventoryPlanner {
  // Input
  eventType: 'Sangeet' | 'Mehendi' | 'Wedding' | 'Reception';
  guestCount: number;
  theme: string;
  venue: string;
  budget: number;
  
  // Output - AI-powered suggestions
  suggestedInventory: {
    electrical: ItemSuggestion[];
    structures: ItemSuggestion[];
    av: ItemSuggestion[];
    decor: ItemSuggestion[];
    furniture: ItemSuggestion[];
    catering: ItemSuggestion[];
  };
  
  // Conflict detection
  conflicts: {
    itemId: string;
    reason: string;
    alternatives: string[];
  }[];
  
  // Cost calculation
  totalCost: number;
  costBreakdown: Record<string, number>;
}
```

### 3. **Smart Compatibility Checker**

```typescript
// Ensures items work together
interface CompatibilityCheck {
  // Example: Generator must support all electrical items
  
  checkElectricalPower(): {
    totalWattage: number;
    generatorCapacity: number;
    sufficient: boolean;
    safetyMargin: number; // Percentage
  };
  
  // Example: Structures must fit in venue
  checkSpatialFit(): {
    venueArea: number;
    totalFootprint: number;
    fits: boolean;
    remainingSpace: number;
  };
  
  // Example: Color coordination
  checkColorHarmony(): {
    colorScheme: string[];
    harmonious: boolean;
    clashes: string[];
    suggestions: string[];
  };
  
  // Example: Audio coverage
  checkAudioCoverage(): {
    venueArea: number;
    speakerCoverage: number;
    adequate: boolean;
    deadZones: string[];
  };
}
```

---

## 📱 Mobile App Features Per Vendor Type

### Universal Features (All Vendors)
- ✅ Barcode/QR scanning
- ✅ Item search
- ✅ Check-out/Check-in
- ✅ Photo documentation
- ✅ Damage reporting
- ✅ Location tracking

### Vendor-Specific Features

**Electrical:**
- Generator fuel level input
- Running hours logger
- Voltage tester integration
- Cable length calculator

**Structures:**
- Assembly checklist
- Component counter
- Load verification
- Safety inspection form

**AV:**
- Signal test mode
- Audio level meter
- Connection diagram viewer
- Quick troubleshoot guide

**Decor:**
- Style matcher (photo search)
- Arrangement examples
- Before/after photos
- Client approval workflow

**Furniture:**
- Layout visualizer
- Stacking calculator
- Condition documenter
- Wear-and-tear tracker

**Catering:**
- Quantity counter
- Cleanliness checklist
- Set completeness verifier
- Sanitization log

---

## 🤖 AI-Powered Features

### 1. **Smart Inventory Suggestions**

```python
# AI analyzes patterns and suggests optimal inventory

def suggest_inventory_for_event(
    event_type: str,
    guest_count: int,
    theme: str,
    budget: float,
    historical_events: List[Event]
) -> InventorySuggestion:
    """
    Uses ML to suggest inventory based on:
    - Similar past events
    - Guest count patterns
    - Theme requirements
    - Budget constraints
    - Seasonal trends
    """
    
    # Find similar events
    similar_events = find_similar_events(
        event_type, guest_count, theme, historical_events
    )
    
    # Extract inventory patterns
    common_items = extract_common_inventory(similar_events)
    
    # Adjust for guest count
    scaled_items = scale_by_guest_count(common_items, guest_count)
    
    # Filter by budget
    budget_fit = filter_by_budget(scaled_items, budget)
    
    # Add optional upgrades
    with_upgrades = add_upgrade_options(budget_fit, budget)
    
    return InventorySuggestion(
        required=budget_fit,
        optional=with_upgrades,
        confidence_score=calculate_confidence(similar_events),
        reasoning=generate_reasoning(similar_events)
    )
```

### 2. **Predictive Maintenance**

```python
# AI predicts when equipment needs maintenance

def predict_maintenance_needs(item: InventoryItem) -> MaintenancePrediction:
    """
    Analyzes:
    - Usage patterns
    - Operating hours
    - Failure history
    - Seasonal factors
    - Age of equipment
    """
    
    # Calculate failure probability
    failure_risk = calculate_failure_risk(
        usage_hours=item.totalOperatingHours,
        age=item.currentAge,
        failure_history=item.maintenanceLogs
    )
    
    # Predict optimal maintenance timing
    optimal_timing = optimize_maintenance_schedule(
        current_bookings=item.upcomingBookings,
        failure_risk=failure_risk,
        maintenance_duration=item.avgMaintenanceDuration
    )
    
    return MaintenancePrediction(
        risk_level=failure_risk,
        recommended_date=optimal_timing,
        estimated_cost=estimate_maintenance_cost(item),
        confidence=calculate_confidence_score()
    )
```

### 3. **Intelligent Stock Alerts**

```python
# AI determines when to reorder/purchase

def generate_stock_recommendations() -> List[StockRecommendation]:
    """
    Considers:
    - Booking trends
    - Seasonal demand
    - Lead times
    - Budget availability
    - ROI potential
    """
    
    recommendations = []
    
    for item in inventory:
        # Analyze booking patterns
        demand_forecast = forecast_demand(
            item=item,
            historical_bookings=item.bookingHistory,
            upcoming_season=get_current_season()
        )
        
        # Current stock vs forecasted demand
        if demand_forecast > item.quantity:
            # Calculate how many to order
            order_quantity = calculate_optimal_order_quantity(
                current_stock=item.quantity,
                forecast=demand_forecast,
                lead_time=item.supplierLeadTime,
                storage_cost=item.storageCost
            )
            
            # Calculate ROI
            roi = calculate_purchase_roi(
                cost=item.purchasePrice * order_quantity,
                expected_rentals=demand_forecast,
                rental_price=item.rentalPrice
            )
            
            if roi > minimum_roi_threshold:
                recommendations.append(
                    StockRecommendation(
                        item=item,
                        action="PURCHASE",
                        quantity=order_quantity,
                        expected_roi=roi,
                        urgency=calculate_urgency(demand_forecast, item.quantity)
                    )
                )
    
    return sorted(recommendations, key=lambda x: x.urgency, reverse=True)
```

---

## 🔌 Integration with Other Modules

### With Wedding Management Module
```typescript
// When wedding is created/updated, inventory is auto-suggested

interface WeddingInventoryIntegration {
  // Automatic suggestions
  onWeddingCreate(wedding: Wedding): void {
    const suggestions = aiInventorySuggestion(
      wedding.type,
      wedding.guestCount,
      wedding.theme,
      wedding.budget
    );
    
    createInventoryAssignments(wedding.id, suggestions);
  }
  
  // Availability check
  onDateChange(wedding: Wedding, newDates: DateRange): void {
    const conflicts = checkInventoryConflicts(
      wedding.assignedInventory,
      newDates
    );
    
    if (conflicts.length > 0) {
      notifyPlannerOfConflicts(conflicts);
      suggestAlternatives(conflicts);
    }
  }
}
```

### With Vendor Management Module
```typescript
// Link inventory to vendor suppliers

interface VendorInventoryLink {
  // Track vendor-supplied items
  vendorSuppliedItems: {
    vendorId: string;
    items: InventoryItem[];
    agreementTerms: string;
    costStructure: any;
  }[];
  
  // Auto-reorder from vendors
  autoReorderFromVendor(
    item: InventoryItem,
    quantity: number
  ): PurchaseOrder {
    const preferredVendor = findPreferredVendor(item);
    
    return createPurchaseOrder({
      vendorId: preferredVendor.id,
      items: [{ itemId: item.id, quantity }],
      expectedDelivery: calculateDeliveryDate(preferredVendor)
    });
  }
}
```

### With Financial Module
```typescript
// Track inventory costs and revenue

interface InventoryFinancialTracking {
  // Capital invested in inventory
  inventoryValuation: {
    totalPurchaseValue: number;
    currentMarketValue: number;
    depreciatedValue: number;
    insuranceValue: number;
  };
  
  // Revenue from inventory
  rentalRevenue: {
    totalRevenue: number;
    revenuePerItem: Record<string, number>;
    averageUtilization: number;
    topPerformers: InventoryItem[];
    bottomPerformers: InventoryItem[];
  };
  
  // Cost tracking
  maintenanceCosts: {
    totalSpend: number;
    costPerItem: Record<string, number>;
    preventiveCosts: number;
    repairCosts: number;
  };
}
```

---

## 📊 Reporting & Analytics

### Vendor-Wise Performance Reports

```typescript
interface VendorInventoryReport {
  vendorType: string;
  
  utilization: {
    averageUtilizationRate: number; // Percentage
    mostUsedItems: InventoryItem[];
    leastUsedItems: InventoryItem[];
    idleInventoryValue: number;
  };
  
  financial: {
    totalInvestment: number;
    totalRevenue: number;
    roi: number;
    revenuePerItem: number;
    maintenanceCostRatio: number;
  };
  
  operational: {
    avgCheckOutTime: number;
    avgCheckInTime: number;
    damageRate: number;
    lossRate: number;
    maintenanceFrequency: number;
  };
  
  trends: {
    demandTrend: 'increasing' | 'stable' | 'decreasing';
    seasonalPatterns: any;
    popularityChanges: any;
  };
  
  recommendations: {
    itemsToPurchase: string[];
    itemsToSell: string[];
    itemsToUpgrade: string[];
    optimizations: string[];
  };
}
```

---

## 🎯 Implementation Priorities

### Phase 1: Core Foundation (Month 1-2)
1. ✅ Extend base InventoryItem model
2. ✅ Create vendor-specific tables
3. ✅ Build unified inventory dashboard
4. ✅ Implement basic CRUD operations
5. ✅ Add barcode/QR support

### Phase 2: Vendor Customizations (Month 3-4)
1. ✅ Electrical vendor module
2. ✅ Structures vendor module
3. ✅ AV vendor module
4. ✅ Custom fields per type
5. ✅ Vendor-specific workflows

### Phase 3: Advanced Features (Month 5-6)
1. ✅ Decor & Furniture modules
2. ✅ Catering equipment module
3. ✅ AI suggestions engine
4. ✅ Compatibility checker
5. ✅ Mobile app features

### Phase 4: Intelligence & Optimization (Month 7-8)
1. ✅ Predictive maintenance
2. ✅ Smart reordering
3. ✅ Advanced analytics
4. ✅ Performance optimization
5. ✅ Integration testing

---

## 💡 Pro Tips for Success

### For Development
- Start with most critical vendor type first (probably decor/furniture for you)
- Use TypeScript interfaces for type safety
- Implement caching for frequently accessed data
- Use database views for complex vendor-specific queries

### For Operations
- Begin with smaller inventory subset for testing
- Train team on one vendor type at a time
- Document common workflows per vendor type
- Create quick reference guides

### For Scaling
- Modular architecture allows adding vendor types easily
- Generic fields + specific extensions = flexibility
- AI improves with more data - patience in Phase 1
- Mobile app adoption is key - make it simple

---

## 📚 Next Steps

1. **Review this document** - Understand the scope
2. **Prioritize vendor types** - Which do you handle most?
3. **Customize fields** - Add Veecap-specific requirements
4. **Start development** - Begin with Phase 1
5. **Iterate based on usage** - Real-world testing will reveal improvements

---

**Questions? Let's discuss:**
- Which vendor types are most important for Veecap?
- Any specific inventory challenges you're facing?
- Want to see code examples for any specific part?
- Ready to start implementation?

Let's build this! 🚀
