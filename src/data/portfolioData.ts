import { Project, GearItem, SoftwareTool, TimelineClip, LutPreset } from '../types';

export const DIRECTOR_PROFILE = {
  name: 'Kaizen Vane',
  japaneseTitle: 'カイゼン・ヴェイン',
  title: 'Director of Photography & Colorist',
  pronouns: 'He/Him',
  basedIn: 'Los Angeles & Tokyo',
  experienceYears: 8,
  bio: "I'm a Director of Photography and Senior NLE Editor with over 8 years of experience crafting story-driven cinema, commercials, and high-impact music videos. Specializing in anamorphic optics, dynamic camera movement, and ACES color science, I blend tactile analog emotion with cutting-edge digital cinematography.",
  email: 'kaizen@cinecraft.studio',
  phone: '+1 (310) 844-9210',
  instagram: '@kaizencine',
  vimeo: 'vimeo.com/kaizencine',
  youtube: 'youtube.com/@kaizenfilms',
  linkedin: 'linkedin.com/in/kaizenvane',
  behance: 'behance.net/kaizencine',
  status: 'Available for Commercial & Feature Bookings Worldwide',
  nextAvailableQuarter: 'Q1 / Q2 2026',
  stats: [
    { label: 'Festival Laurels', value: '14+' },
    { label: 'Commercial Campaigns', value: '48+' },
    { label: 'Total Showreel Views', value: '12M+' },
    { label: 'Native 8K Deliveries', value: '100%' }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'neon-eclipse',
    title: 'NEON ECLIPSE',
    category: 'Commercial',
    client: 'Porsche Taycan GT',
    year: '2025',
    role: 'Director of Photography & Lead Colorist',
    camera: 'RED V-Raptor 8K VV',
    lens: 'Cooke Anamorphic /i Full Frame Plus 40mm & 75mm',
    duration: '01:45',
    aspectRatio: '2.39:1',
    awards: ['Cannes Lions Bronze Craft 2025', 'Ciclope Festival Finalist'],
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'A nocturnal high-speed visual poem shot through the rain-soaked alleys of Shinjuku and winding coastal expressways, capturing the silent electric acceleration of the Porsche Taycan GT.',
    btsStory: 'Shot entirely at night using only practical neon signs, rain machines, and a custom pursuit vehicle rig with gyro-stabilized carbon fiber crane. We utilized custom spherical-to-anamorphic adapters to generate rich cyan streak flares.',
    colorPalette: ['#0f172a', '#06b6d4', '#f43f5e', '#3b82f6', '#f8fafc'],
    lightingSetup: 'Low-key high-contrast. 4x Astera Titan Tubes rigged to vehicle undercarriage, 2x Aputure 1200d Pro bounced off wet asphalt for rim backlight.',
    techSpecs: {
      resolution: '8192 × 3456 (8K DCI)',
      codec: 'REDCODE RAW HQ (5:1)',
      sensor: 'VistaVision 35.4 Megapixel',
      fps: '48 fps & 120 fps',
      colorSpace: 'REDWideGamutRGB / Log3G10 to Rec.709',
      iso: 'Native ISO 800 & 1600'
    }
  },
  {
    id: 'chronos-fjords',
    title: 'THE SILENT GLACIER',
    category: 'Documentary',
    client: 'National Geographic Expeditions',
    year: '2025',
    role: 'Cinematographer & Drone DP',
    camera: 'ARRI Alexa Mini LF',
    lens: 'Atlas Orion Anamorphic 32mm & 65mm',
    duration: '03:12',
    aspectRatio: '2.39:1',
    awards: ['Sundance Official Selection 2025', 'Vimeo Staff Pick Best Cinematography'],
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'An intimate 8K meditation on vanishing glacial tongues in Western Norway. Contrasting majestic wide topographical vistas with microscopic macro ice crystal textures.',
    btsStory: 'We spent 18 days in sub-zero Arctic conditions sleeping in expedition tents. Batteries had to be heated inside down jackets. Every panoramic aerial shot was flown manually using heavy-lift FPV rigs in 35-knot winds.',
    colorPalette: ['#1e293b', '#38bdf8', '#e0f2fe', '#0284c7', '#f1f5f9'],
    lightingSetup: 'Natural Arctic golden hour sun diffused through polar sea fog, augmented with gold reflector boards on subject eyes.',
    techSpecs: {
      resolution: '4448 × 3096 (4.5K Open Gate)',
      codec: 'Apple ProRes 4444 XQ',
      sensor: 'Large Format ARRI A2X',
      fps: '24.00 fps',
      colorSpace: 'ARRI LogC4 (ACES 1.3)',
      iso: 'Native ISO 800'
    }
  },
  {
    id: 'vortex-rhythm',
    title: 'KINETIC ECHOES',
    category: 'Music Video',
    client: 'Sony Music / ODESZA Collab',
    year: '2025',
    role: 'Director & Lead Editor',
    camera: 'Sony FX3 & Phantom Flex 4K',
    lens: 'Leica Summicron-C T2.0 Primes',
    duration: '02:50',
    aspectRatio: '16:9',
    awards: ['UK Music Video Awards Nominee', 'Berlin Music Video Festival Winner'],
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    description: 'A kinetic sensory journey exploring rhythmic bodily movement, strobe choreography, and liquid water droplets suspended at 1000 frames per second.',
    btsStory: 'Engineered a synced robotic motion control arm that completed repeatable rotational arcs within 0.2 millimeters while triggering synchronized DMX strobe sequences.',
    colorPalette: ['#18181b', '#8b5cf6', '#ec4899', '#f59e0b', '#ffffff'],
    lightingSetup: '360° circular LED wash with computer-sequenced strobe pulses and smoke hazel machines.',
    techSpecs: {
      resolution: '4096 × 2160 (4K DCI)',
      codec: 'ProRes RAW 12-bit',
      sensor: 'Super 35 High Speed',
      fps: '1000 fps & 24 fps',
      colorSpace: 'S-Gamut3.Cine / S-Log3',
      iso: 'ISO 640'
    }
  },
  {
    id: 'tokyo-drift-fpv',
    title: 'METROPOLIS OVERDRIVE',
    category: 'FPV Drone',
    client: 'Red Bull Motorsports',
    year: '2024',
    role: 'Lead FPV Pilot & DP',
    camera: 'Custom Cinelifter RED Komodo 6K',
    lens: 'Laowa 9mm Zero-D Cine',
    duration: '01:15',
    aspectRatio: '16:9',
    awards: ['Red Bull Illume Semifinalist', 'Flying Robot Film Festival'],
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: 'High-speed 120km/h chase drone cinematography diving through Shibuya crossing, skimming over skyscraper glass canopies and threading underground drift tunnels.',
    btsStory: 'Constructed an X8 9-inch cinelifter frame carrying a stripped-down RED Komodo with custom ND filters and titanium crash cage.',
    colorPalette: ['#09090b', '#f97316', '#22c55e', '#a855f7', '#fafafa'],
    lightingSetup: 'Ambient architectural illumination and Tokyo city neon glow.',
    techSpecs: {
      resolution: '6144 × 3240 (6K 17:9)',
      codec: 'REDCODE RAW MQ',
      sensor: 'Super 35 Global Shutter',
      fps: '60 fps',
      colorSpace: 'REDWideGamutRGB',
      iso: 'ISO 1250'
    }
  },
  {
    id: 'solstice-fashion',
    title: 'AURA: SOLSTICE',
    category: 'Commercial',
    client: 'Vogue Italia & Saint Laurent',
    year: '2024',
    role: 'Director of Photography',
    camera: 'ARRI Alexa 35',
    lens: 'Canon K-35 Vintage Cine Primes',
    duration: '01:30',
    aspectRatio: '4:3',
    awards: ['Aesthetica Short Film Festival Best Fashion'],
    thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'A study in textile textures, golden desert twilight, and slow 1970s zoom pulls captured in the iconic 4:3 vintage editorial framing.',
    btsStory: 'We paired the ultra-modern ARRI 35 sensor with authentic 1978 Canon K-35 prime lenses to achieve gentle blooming highlights and creamy skin tones without digital sharpness.',
    colorPalette: ['#292524', '#d97706', '#fbbf24', '#fef3c7', '#78350f'],
    lightingSetup: 'Single 12-foot Sunbounce butterfly diffusion frame catching sunset desert bounce.',
    techSpecs: {
      resolution: '4608 × 3164 (4.6K)',
      codec: 'ARRIRAW',
      sensor: 'Super 35 4.6K REVEAL',
      fps: '24.00 fps',
      colorSpace: 'ARRI LogC4',
      iso: 'ISO 400 Native'
    }
  },
  {
    id: 'shadows-whisper',
    title: 'BEFORE THE ECHOES DIE',
    category: 'Narrative',
    client: 'A24 / Independent Feature Short',
    year: '2024',
    role: 'Cinematographer & Colorist',
    camera: 'ARRI Alexa Mini LF',
    lens: 'Master Anamorphic 50mm T1.9',
    duration: '04:10',
    aspectRatio: '2.39:1',
    awards: ['Tribeca Film Festival Official Selection', 'Camerimage Golden Frog Nominee'],
    thumbnail: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    description: 'A claustrophobic psychological drama set within a brutalist concrete lighthouse in the North Sea during a 72-hour storm surge.',
    btsStory: 'Lighting was strictly constrained to single-source practical oil lanterns and lightning flashes. We pushed the sensor to ISO 3200 with bespoke analog film grain emulation.',
    colorPalette: ['#0f172a', '#334155', '#64748b', '#94a3b8', '#e2e8f0'],
    lightingSetup: 'Low-key motivated tungsten practicals with subtle blue moonlight fill through sea spray windows.',
    techSpecs: {
      resolution: '4448 × 3096 (4.5K)',
      codec: 'ProRes 4444 XQ',
      sensor: 'Large Format ARRI LF',
      fps: '24.00 fps',
      colorSpace: 'ACEScc',
      iso: 'ISO 1600 & 3200'
    }
  }
];

export const SOFTWARE_TOOLS: SoftwareTool[] = [
  {
    id: 'premiere',
    name: 'Adobe Premiere Pro',
    acronym: 'Pr',
    iconBg: 'from-[#00005b] to-[#14002e]',
    accentColor: '#9999ff',
    mastery: 98,
    yearsExp: 8,
    roleInWorkflow: 'Lead NLE for commercial assemblies, multi-cam pacing, and proxy workflow pipelines.',
    topFeatures: ['Pancake Timeline Editing', 'Dynamic Link to After Effects', 'Automated Speech-to-Text Pacing', 'ProRes Native Scrubber']
  },
  {
    id: 'aftereffects',
    name: 'Adobe After Effects',
    acronym: 'Ae',
    iconBg: 'from-[#2b0042] to-[#19002b]',
    accentColor: '#d670ff',
    mastery: 95,
    yearsExp: 7,
    roleInWorkflow: 'High-end motion graphics, screen replacements, camera tracking, and optical lens flare design.',
    topFeatures: ['3D Camera Tracker', 'Optical Flares & Glow Science', 'Mocha Pro Planar Tracking', 'Bespoke Film Grain Compositing']
  },
  {
    id: 'finalcut',
    name: 'Final Cut Pro',
    acronym: 'Fc',
    iconBg: 'from-[#0a3536] to-[#041a1b]',
    accentColor: '#2dd4bf',
    mastery: 92,
    yearsExp: 6,
    roleInWorkflow: 'High-speed magnetic timeline cutting for fast-turnaround commercials and social 9:16 reels.',
    topFeatures: ['Magnetic Timeline 2', 'Metal Hardware Acceleration', 'Compound Clip Management', 'Instant 120fps Scrubbing']
  },
  {
    id: 'davinci',
    name: 'DaVinci Resolve Studio',
    acronym: 'Dv',
    iconBg: 'from-[#3b120c] to-[#1c0806]',
    accentColor: '#fb923c',
    mastery: 96,
    yearsExp: 7,
    roleInWorkflow: 'Color grading authority, ACES color management, film print emulation, and Fairlight audio mix.',
    topFeatures: ['ACES 1.3 Color Management', 'Bespoke 35mm LUT Design', 'HDR Grading Wheels', 'PowerGrade Node Tree Architectures']
  },
  {
    id: 'blender',
    name: 'Blender 3D',
    acronym: 'Bl',
    iconBg: 'from-[#3b1a04] to-[#1f0d02]',
    accentColor: '#f97316',
    mastery: 88,
    yearsExp: 4,
    roleInWorkflow: 'Pre-visualization, lighting simulations, and 3D camera path engineering for complex shoots.',
    topFeatures: ['Cycles Realistic Raytracing', 'Virtual Camera Rigging', 'Pre-visualization Set Modeling', 'Physics Particle Simulations']
  },
  {
    id: 'cinema4d',
    name: 'Cinema 4D',
    acronym: 'C4',
    iconBg: 'from-[#041e42] to-[#020e21]',
    accentColor: '#38bdf8',
    mastery: 85,
    yearsExp: 4,
    roleInWorkflow: 'Broadcast 3D titling, abstract commercial simulations, and Redshift photorealistic shading.',
    topFeatures: ['Redshift GPU Render Engine', 'MoGraph Procedural Animation', 'ACES OCIO Color Pipeline', 'Cinema Rig Dynamics']
  }
];

export const GEAR_LOCKER: GearItem[] = [
  {
    id: 'red-raptor',
    category: 'Camera',
    name: 'RED V-Raptor 8K VV',
    model: 'Flagship Cinema Camera',
    specs: '8192 × 4320 VistaVision Sensor, 120fps at 8K, 17+ Stops Dynamic Range, RF Mount',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    tags: ['8K RAW', 'VistaVision', '120fps Slow-Mo'],
    highlight: 'Primary A-Cam for automotive & high-end narrative commercials.'
  },
  {
    id: 'arri-mini-lf',
    category: 'Camera',
    name: 'ARRI Alexa Mini LF',
    model: 'Large Format Industry Gold Standard',
    specs: '4.5K Large Format ALEV 3 Sensor, ProRes 4444 XQ, Iconic ARRI Color Science & Skin Tones',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
    tags: ['ARRI Color', 'Large Format', 'ProRes 4444 XQ'],
    highlight: 'The undisputed benchmark for natural organic cinematic skin tones.'
  },
  {
    id: 'sony-fx3',
    category: 'Camera',
    name: 'Sony FX3 Cinema Line',
    model: 'Compact Full-Frame Workhorse',
    specs: '12.1MP Exmor R CMOS, Dual Native ISO 800/12800, 4K 120fps, Active Fan Cooling',
    image: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80',
    tags: ['Dual Native ISO', 'Run & Gun', 'Gimbal Hero'],
    highlight: 'Unbeatable low-light capability and nimble handheld stabilization.'
  },
  {
    id: 'cooke-anamorphic',
    category: 'Optics',
    name: 'Cooke Anamorphic /i FF+',
    model: '2x Squeeze Anamorphic Prime Set',
    specs: '32mm, 40mm, 50mm, 75mm, 100mm T2.3. The legendary "Cooke Look" with oval bokeh.',
    image: 'https://images.unsplash.com/photo-1617042375876-a13e36732a04?auto=format&fit=crop&w=600&q=80',
    tags: ['2x Anamorphic', 'Oval Bokeh', 'Cooke Look'],
    highlight: 'Creates the timeless widescreen poetry with organic warm highlights.'
  },
  {
    id: 'ronin-4d',
    category: 'Grip & Drone',
    name: 'DJI Ronin 4D 6K',
    model: '4-Axis Active Cinema Rig',
    specs: 'Integrated Full Frame 6K, Z-Axis vertical stabilization, LiDAR autofocus tracking',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80',
    tags: ['4-Axis Gimbal', 'LiDAR Autofocus', 'Steadicam Killer'],
    highlight: 'Effortless continuous one-take moving shots without traditional dolly tracks.'
  },
  {
    id: 'aputure-1200d',
    category: 'Lighting',
    name: 'Aputure Electro Storm CS15',
    model: '1500W Full-Color Cinema COB',
    specs: 'Point-source RGBACL engine, Sidus Link DMX, IP65 weather-resistant, equivalent to 1.8K HMI',
    image: 'https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=600&q=80',
    tags: ['1500W', 'Full Spectrum', 'HMI Output'],
    highlight: 'Pierces through daylight sun and punches massive cinematic shafts of light.'
  }
];

export const TIMELINE_CLIPS: TimelineClip[] = [
  // Video Tracks
  { id: 'v3-1', name: 'TITLE_KAIZEN_CINEMA.mov', track: 'V3', startPercent: 2, widthPercent: 20, color: 'bg-emerald-600', type: 'title', source: 'After Effects Dynamic Link', timecode: '00:00:02:10' },
  { id: 'v3-2', name: 'GRAIN_35MM_KODAK2383.mov', track: 'V3', startPercent: 0, widthPercent: 98, color: 'bg-yellow-600 opacity-60', type: 'video', source: 'ProRes 4444 Grain Overlay', timecode: '00:00:00:00' },
  
  { id: 'v2-1', name: 'A001_C004_SHINJUKU_NIGHT_8K.R3D', track: 'V2', startPercent: 0, widthPercent: 32, color: 'bg-blue-600', type: 'video', source: 'RED V-Raptor 8K', timecode: '00:00:00:00' },
  { id: 'v2-2', name: 'A002_C012_PORSCHE_DRIFT_SLOW.R3D', track: 'V2', startPercent: 33, widthPercent: 35, color: 'bg-indigo-600', type: 'video', source: 'RED V-Raptor 120fps', timecode: '00:00:32:00' },
  { id: 'v2-3', name: 'A003_C008_CLOSEUP_STREAK_FLARE.R3D', track: 'V2', startPercent: 69, widthPercent: 29, color: 'bg-cyan-600', type: 'video', source: 'Cooke 75mm Anamorphic', timecode: '00:01:08:14' },

  { id: 'v1-1', name: 'B001_DRONE_FJORD_AERIAL_4K.MOV', track: 'V1', startPercent: 12, widthPercent: 24, color: 'bg-teal-600', type: 'video', source: 'ARRI Mini LF Drone', timecode: '00:00:12:00' },
  { id: 'v1-2', name: 'B002_FPV_TUNNEL_DIVE.MP4', track: 'V1', startPercent: 52, widthPercent: 28, color: 'bg-sky-600', type: 'video', source: 'RED Komodo FPV', timecode: '00:00:52:18' },

  // Audio Tracks
  { id: 'a1-1', name: 'SFX_CYBER_WHOOSH_RISER.wav', track: 'A1', startPercent: 28, widthPercent: 6, color: 'bg-amber-600', type: 'audio', source: 'Fairlight Sound Library', timecode: '00:00:28:00' },
  { id: 'a1-2', name: 'SFX_ELECTRIC_MOTOR_SUB_DROP.wav', track: 'A1', startPercent: 66, widthPercent: 5, color: 'bg-orange-600', type: 'audio', source: 'Sound Devices 32-bit float', timecode: '00:01:05:00' },

  { id: 'a2-1', name: 'FOLEY_ASPHALT_RAIN_TIRE_SCREECH.wav', track: 'A2', startPercent: 4, widthPercent: 45, color: 'bg-lime-700', type: 'audio', source: 'Sennheiser MKH 416', timecode: '00:00:04:00' },
  { id: 'a2-2', name: 'FOLEY_NEON_BUZZ_AMB_SHINJUKU.wav', track: 'A2', startPercent: 50, widthPercent: 48, color: 'bg-emerald-700', type: 'audio', source: 'Stereo Ambience Rig', timecode: '00:00:50:00' },

  { id: 'a3-1', name: 'MASTER_SCORE_HANS_ZIMMER_STYLE_96K.wav', track: 'A3', startPercent: 0, widthPercent: 98, color: 'bg-purple-700', type: 'audio', source: 'Orchestral Stems 24-bit', timecode: '00:00:00:00' }
];

export const LUT_PRESETS: LutPreset[] = [
  {
    id: 'kodak-2383',
    name: 'Kodak 2383 35mm Print',
    description: 'The golden age Hollywood print film look with rich warm skin, deep filmic blacks, and creamy highlights.',
    filter: 'contrast(1.18) saturate(1.12) sepia(0.08) brightness(0.98)',
    contrast: 18,
    saturation: 12,
    brightness: -2,
    sepia: 8,
    hueRotate: -3,
    filmGrain: 14,
    gradePreviewColor: '#d97706'
  },
  {
    id: 'teal-orange',
    name: 'Teal & Orange Blockbuster',
    description: 'High-contrast modern action cinema. Cyan shadows complement warm saturated skin tones.',
    filter: 'contrast(1.25) saturate(1.28) hue-rotate(-8deg) brightness(1.02)',
    contrast: 25,
    saturation: 28,
    brightness: 2,
    sepia: 0,
    hueRotate: -8,
    filmGrain: 8,
    gradePreviewColor: '#06b6d4'
  },
  {
    id: 'nordic-noir',
    name: 'Nordic Noir Bleach Bypass',
    description: 'Desaturated, gritty, atmospheric crime drama look inspired by Scandinavian thriller cinema.',
    filter: 'contrast(1.35) saturate(0.65) brightness(0.92)',
    contrast: 35,
    saturation: -35,
    brightness: -8,
    sepia: 4,
    hueRotate: 0,
    filmGrain: 20,
    gradePreviewColor: '#475569'
  },
  {
    id: 'neo-tokyo',
    name: 'Cyber Neo-Tokyo',
    description: 'Electric violet and luminous neon greens calibrated for nocturnal rain-soaked cityscapes.',
    filter: 'contrast(1.22) saturate(1.4) hue-rotate(25deg) brightness(1.04)',
    contrast: 22,
    saturation: 40,
    brightness: 4,
    sepia: 0,
    hueRotate: 25,
    filmGrain: 10,
    gradePreviewColor: '#a855f7'
  },
  {
    id: 'flat-log',
    name: 'RAW S-Log3 / LogC Flat',
    description: 'Uncorrected flat sensor data with full 16-stop dynamic range latitude prior to color science conversion.',
    filter: 'contrast(0.72) saturate(0.65) brightness(1.15)',
    contrast: -28,
    saturation: -35,
    brightness: 15,
    sepia: 0,
    hueRotate: 0,
    filmGrain: 0,
    gradePreviewColor: '#94a3b8'
  }
];

export const CAREER_MILESTONES = [
  {
    year: '2025 – Present',
    role: 'Lead Cinematographer & Director',
    organization: 'Kaizen Visuals / Worldwide Freelance',
    description: 'Directing global brand films for Porsche, Red Bull, and Nike. Operating custom cinema packages including RED V-Raptor and Cooke Anamorphics.'
  },
  {
    year: '2023 – 2024',
    role: 'Senior Colorist & NLE Post Supervisor',
    organization: 'Monolith Post Studio, Los Angeles',
    description: 'Supervised ACES color workflows on two Sundance documentary features and 18 commercial spots. Engineered hybrid Premiere / DaVinci conform pipelines.'
  },
  {
    year: '2021 – 2023',
    role: 'Camera Operator & 1st AC',
    organization: 'Aether Creative Cinema, Tokyo',
    description: 'Executed high-speed motion tracking and drone cinematography for J-Rock music videos and architectural documentaries.'
  },
  {
    year: '2019 – 2021',
    role: 'Junior Video Editor & Motion Artist',
    organization: 'Pulse Media Lab, Berlin',
    description: 'Crafted dynamic social trailers, typography motion design, and audio foley suites for international fashion labels.'
  }
];

export const EDUCATION_MILESTONES = [
  {
    year: '2017 – 2021',
    degree: 'B.F.A. in Film & Television Cinematography',
    institution: 'Tokyo Visual Arts Academy (VAA)',
    details: 'Specialization in 35mm optical physics, lighting theory, and color science grading.'
  },
  {
    year: '2022',
    degree: 'Masterclass in ACES Color Management',
    institution: 'International Colorist Academy (ICA)',
    details: 'Certified in DaVinci Resolve Advanced Color Science and Film Print Emulation pipelines.'
  }
];
