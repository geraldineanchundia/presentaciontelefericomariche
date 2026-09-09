export interface SlideInfo {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  category: 'overview' | 'engineering' | 'mobility' | 'social' | 'media' | 'services';
  durationSeconds?: number;
}

export interface TelefericoComponent {
  id: string;
  name: string;
  system: string;
  location: string;
  criticality: 'Alta' | 'Extrema' | 'Media';
  description: string;
  specifications: { label: string; value: string }[];
  failureModes: string[];
  maintenanceProtocol: string;
  generalTradeService: string;
  iconName: string;
}

export interface TowerInfo {
  id: number;
  code: string;
  elevationM: number;
  distanceKm: number;
  heightM: number;
  sheaveCount: number;
  type: 'Apoyo' | 'Compresión' | 'Mixto';
  slopeDeg: number;
  status: 'Operativo' | 'Requiere NDT' | 'Intervención Recomendada';
}

export interface HistoricalPhoto {
  id: string;
  title: string;
  year: string;
  category: 'Construcción' | 'Operación' | 'Ingeniería' | 'Comunidad';
  imageUrl: string;
  description: string;
  technicalHighlight: string;
  impactScore: string;
}

export interface CameraFeed {
  id: string;
  title: string;
  location: string;
  fps: number;
  resolution: string;
  status: 'ONLINE' | 'STANDBY';
  description: string;
  simulationType: 'gondola' | 'sheave' | 'engine' | 'terminal';
}

export interface GeneralTradePillar {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  description: string;
  deliverables: string[];
  technologies: string[];
  standards: string[];
}
