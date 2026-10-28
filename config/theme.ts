/**
 * DESIGN TOKENS & COLOR PALETTE — EXTRACTED DIRECTLY FROM 3D MODEL
 * Source Asset: public/models/Backdrop_Pernikahan_Romantis_Updated.glb
 *
 * Material Inspection Summary (15 PBR Materials across 31 Meshes):
 * - Mat 0  (Stage_Warm_Ivory):          sRGB #F6F2EA | Linear [0.922, 0.888, 0.823] | Roughness 0.55
 * - Mat 1  (Olive_Green_Drape):         sRGB #4C5137 | Linear [0.072, 0.082, 0.038] | Roughness 0.78
 * - Mat 2  (Blush_Pink_Drape):          sRGB #C98CA0 | Linear [0.584, 0.262, 0.352] | Roughness 0.72
 * - Mat 3  (Giant_Flower_Blush):        sRGB #E8B4C2 | Linear [0.807, 0.456, 0.539] | Roughness 0.58
 * - Mat 4  (Giant_Flower_Core_Gold):    sRGB #D9B668 | Linear [0.694, 0.468, 0.138] | Metallic 0.65
 * - Mat 5  (Garden_Foliage_Green):      sRGB #3B492E | Linear [0.044, 0.067, 0.027] | Roughness 0.75
 * - Mat 6  (Floral_Mauve_Rose):         sRGB #B6768B | Linear [0.468, 0.181, 0.258] | Roughness 0.60
 * - Mat 7  (Floral_Dusty_Blush):        sRGB #E5C1C8 | Linear [0.784, 0.533, 0.578] | Roughness 0.55
 * - Mat 8  (Garden_Lavender_Spike):     sRGB #9C7A97 | Linear [0.332, 0.195, 0.309] | Roughness 0.62
 * - Mat 9  (Palette_Warm_Ivory):        sRGB #FDFBF7 | Linear [0.982, 0.965, 0.930] | Roughness 0.45
 * - Mat 10 (Palette_Champagne_Beige):   sRGB #E8DEC8 | Linear [0.807, 0.730, 0.578] | Roughness 0.42
 * - Mat 11 (Palette_Dusty_Blush):       sRGB #DDB8B8 | Linear [0.723, 0.479, 0.479] | Roughness 0.50
 * - Mat 12 (Velvet_Box_Dusty_Blush):    sRGB #B87D87 | Linear [0.479, 0.205, 0.242] | Roughness 0.88
 * - Mat 13 (Palette_Soft_Gold):         sRGB #D4AF37 | Linear [0.658, 0.429, 0.038] | Metallic 0.88
 * - Mat 14 (Chandelier_Crystal_Warm):   sRGB #FFF8E7 | Linear [1.000, 0.939, 0.799] | Roughness 0.12
 *
 * Bounding Box Analysis:
 * - Min: [-0.170, 0.000, -0.070]
 * - Max: [ 0.170, 0.192,  0.280]
 * - Dimensions (W x H x D): 0.340 x 0.192 x 0.350 units
 * - Center: [0.000, 0.096, 0.105]
 */

export const MODEL_PALETTE = {
  stageWarmIvory: '#F6F2EA',
  paletteWarmIvory: '#FDFBF7',
  champagneBeige: '#E8DEC8',
  blushPinkDrape: '#C98CA0',
  giantFlowerBlush: '#E8B4C2',
  floralMauveRose: '#B6768B',
  floralDustyBlush: '#E5C1C8',
  velvetBoxBlush: '#B87D87',
  oliveGreenDrape: '#4C5137',
  gardenFoliageGreen: '#3B492E',
  gardenLavenderSpike: '#9C7A97',
  softGold: '#D4AF37',
  flowerCoreGold: '#D9B668',
  chandelierCrystalWarm: '#FFF8E7',
} as const;

/** Scene-side copies of UI tones (app/globals.css), so the venue dissolves into the page. */
export const SCENE_TONES = {
  ivory: '#F4EDE1', // --color-background
  candle: '#FFD9A8',
  keyLight: '#FFE4C2',
  umber: '#5A4632', // --color-secondary
} as const;

export type SectionId = 'opening' | 'home' | 'story' | 'event' | 'gallery' | 'location' | 'rsvp' | 'closing';

export interface CameraKeyframe {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  mobilePosition: [number, number, number];
  mobileTarget: [number, number, number];
  mobileFov: number;
  label: string;
}

/**
 * Exact 3D Camera Choreography mapped to the model's actual bounding box:
 * Width: 0.34 (-0.17 to 0.17), Height: 0.192 (0.0 to 0.192), Depth: 0.35 (-0.07 to 0.28)
 */
export const CAMERA_KEYFRAMES: Record<SectionId, CameraKeyframe> = {
  opening: {
    position: [0.0, 0.24, 0.62],
    target: [0.0, 0.095, 0.02],
    fov: 38,
    mobilePosition: [0.0, 0.26, 0.76],
    mobileTarget: [0.0, 0.09, 0.02],
    mobileFov: 45,
    label: 'Distant Aerial Approach',
  },
  home: {
    position: [0.0, 0.115, 0.42],
    target: [0.0, 0.092, 0.01],
    fov: 36,
    mobilePosition: [0.0, 0.13, 0.54],
    mobileTarget: [0.0, 0.088, 0.02],
    mobileFov: 44,
    label: 'Full Venue Symmetry & Aisle View',
  },
  story: {
    position: [-0.16, 0.11, 0.31],
    target: [0.04, 0.095, -0.01],
    fov: 35,
    mobilePosition: [-0.12, 0.12, 0.44],
    mobileTarget: [0.0, 0.095, 0.0],
    mobileFov: 42,
    label: 'Editorial Left Framing — Blush Pillars & Floral Arch',
  },
  event: {
    position: [0.08, 0.085, 0.17],
    target: [0.0, 0.058, 0.03],
    fov: 32,
    mobilePosition: [0.06, 0.095, 0.24],
    mobileTarget: [0.0, 0.058, 0.03],
    mobileFov: 38,
    label: 'Intimate Akad Table, Velvet Ring Box & Gold Bands',
  },
  gallery: {
    position: [0.17, 0.125, 0.30],
    target: [-0.02, 0.115, -0.02],
    fov: 35,
    mobilePosition: [0.13, 0.135, 0.42],
    mobileTarget: [0.0, 0.11, -0.02],
    mobileFov: 42,
    label: 'Chandelier Crystals, Olive Drapes & Giant Central Flower',
  },
  location: {
    position: [0.0, 0.15, 0.36],
    target: [0.0, 0.08, 0.04],
    fov: 36,
    mobilePosition: [0.0, 0.16, 0.48],
    mobileTarget: [0.0, 0.08, 0.04],
    mobileFov: 44,
    label: 'Stage Overview & Garden Aisle',
  },
  rsvp: {
    position: [-0.09, 0.095, 0.25],
    target: [0.0, 0.075, 0.01],
    fov: 34,
    mobilePosition: [-0.06, 0.105, 0.36],
    mobileTarget: [0.0, 0.075, 0.01],
    mobileFov: 40,
    label: 'Serene Candlelight & Front Garden Roses',
  },
  closing: {
    position: [0.0, 0.105, 0.38],
    target: [0.0, 0.098, -0.01],
    fov: 35,
    mobilePosition: [0.0, 0.12, 0.50],
    mobileTarget: [0.0, 0.095, 0.0],
    mobileFov: 43,
    label: 'Grand Romantic Finale View',
  },
};
