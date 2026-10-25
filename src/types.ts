export interface Project {
  id: string;
  title: string;
  category: 'Commercial' | 'Music Video' | 'Documentary' | 'Narrative' | 'FPV Drone';
  client: string;
  year: string;
  role: string;
  camera: string;
  lens: string;
  duration: string;
  aspectRatio: string;
  awards?: string[];
  thumbnail: string;
  videoUrl: string;
  logComparisonUrl?: string;
  description: string;
  btsStory: string;
  colorPalette: string[];
  lightingSetup: string;
  techSpecs: {
    resolution: string;
    codec: string;
    sensor: string;
    fps: string;
    colorSpace: string;
    iso: string;
  };
}

export interface GearItem {
  id: string;
  category: 'Camera' | 'Optics' | 'Grip & Drone' | 'Lighting' | 'Audio & Monitoring';
  name: string;
  model: string;
  specs: string;
  image: string;
  tags: string[];
  highlight: string;
}

export interface SoftwareTool {
  id: string;
  name: string;
  acronym: string;
  iconBg: string;
  accentColor: string;
  mastery: number; // 0 - 100
  yearsExp: number;
  roleInWorkflow: string;
  topFeatures: string[];
}

export interface TimelineClip {
  id: string;
  name: string;
  track: 'V3' | 'V2' | 'V1' | 'A1' | 'A2' | 'A3';
  startPercent: number; // 0 to 100%
  widthPercent: number;
  color: string;
  type: 'video' | 'audio' | 'title';
  source: string;
  timecode: string;
}

export interface LutPreset {
  id: string;
  name: string;
  description: string;
  filter: string; // CSS filter equivalent for instant preview
  contrast: number;
  saturation: number;
  brightness: number;
  sepia: number;
  hueRotate: number;
  filmGrain: number;
  gradePreviewColor: string;
}
