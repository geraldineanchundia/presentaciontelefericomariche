import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle, 
  Wind, 
  Gauge, 
  Mountain, 
  Eye, 
  Activity, 
  CheckCircle2, 
  ShieldAlert, 
  Info,
  Layers,
  LogIn,
  LogOut,
  Save,
  Loader2
} from 'lucide-react';
import { TOWERS_DATA, SYSTEM_SPECS } from '../../data/telefericoData';
import { TowerInfo } from '../../types';
import { playClickSound, playAlertSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { db, auth, loginWithGoogle, handleFirestoreError, OperationType } from '../../lib/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';

export function SlideMap3D() {
  const { isLight } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [observations, setObservations] = useState<Record<string, string>>({});
  const [editingObservation, setEditingObservation] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [speed, setSpeed] = useState<number>(5.0); // m/s
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isEmergencyStopped, setIsEmergencyStopped] = useState<boolean>(false);
  const [selectedTower, setSelectedTower] = useState<TowerInfo | null>(null);
  const [windKmh, setWindKmh] = useState<number>(18);
  const [numCabins, setNumCabins] = useState<number>(36);
  const [viewStyle, setViewStyle] = useState<'blueprint' | 'satellite' | 'thermal'>('blueprint');
  const [cabinOffset, setCabinOffset] = useState<number>(0);

  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Firestore Observations Listener
  useEffect(() => {
    if (!user) {
      setObservations({});
      return;
    }

    const path = 'towerObservations';
    const unsubscribe = onSnapshot(doc(db, path, 'ALL_OBSERVATIONS_STUB'), () => {}, (error) => {
       // Just testing, real listener below
    });

    // We'll actually listen to individual tower observations or a collection
    // Since we only have 32, we could listen to the whole collection or just the selected one
    // Let's listen to all for now or the selected one when it changes
  }, [user]);

  useEffect(() => {
    if (!user || !selectedTower) return;

    const path = `towerObservations/${selectedTower.code}`;
    const unsubscribe = onSnapshot(doc(db, path), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setObservations(prev => ({ ...prev, [selectedTower.code]: data.observation }));
        setEditingObservation(data.observation);
      } else {
        setEditingObservation('');
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return () => unsubscribe();
  }, [user, selectedTower]);

  const saveObservation = async () => {
    if (!user || !selectedTower) return;
    setIsSaving(true);
    const path = `towerObservations/${selectedTower.code}`;
    try {
      await setDoc(doc(db, path), {
        observation: editingObservation,
        towerCode: selectedTower.code,
        updatedAt: serverTimestamp(),
        updatedBy: user.uid
      });
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  // Continuous physics animation loop for moving cabins
  useEffect(() => {
    const animate = (time: number) => {
      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (isRunning && !isEmergencyStopped && speed > 0) {
        // Effective speed adjusted by severe wind factor
        const windFactor = windKmh > 55 ? 0.4 : windKmh > 40 ? 0.7 : 1;
        const effectiveSpeed = speed * windFactor;
        setCabinOffset((prev) => (prev + (effectiveSpeed * delta * 12)) % 1000);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning, isEmergencyStopped, speed, windKmh]);

  // Auto-safety logic for wind
  useEffect(() => {
    if (windKmh > 70 && !isEmergencyStopped && isRunning) {
      setIsEmergencyStopped(true);
      setSpeed(0);
      playAlertSound('estop');
    }
  }, [windKmh, isEmergencyStopped, isRunning]);

  // Handle emergency stop
  const handleEmergencyStop = () => {
    if (isEmergencyStopped) {
      // Reset
      playAlertSound('success');
      setIsEmergencyStopped(false);
      setIsRunning(true);
    } else {
      playAlertSound('estop');
      setIsEmergencyStopped(true);
      setIsRunning(false);
    }
  };

  // SVG Coordinates setup for the 4.79 km line
  const svgWidth = 960;
  const svgHeight = 360;
  const paddingX = 60;
  const paddingY = 50;

  const minElev = 800;
  const maxElev = 1200;
  const maxDist = 4.79;

  const getX = (distKm: number) => paddingX + (distKm / maxDist) * (svgWidth - 2 * paddingX);
  const getY = (elevM: number) => svgHeight - paddingY - ((elevM - minElev) / (maxElev - minElev)) * (svgHeight - 2 * paddingY);

  // Path data for terrain
  const terrainPoints = [
    { km: 0, elev: 852 },
    ...TOWERS_DATA.map(t => ({ km: t.distanceKm, elev: t.elevationM })),
    { km: 4.79, elev: 1162 },
  ];

  const terrainPath = `M ${getX(0)},${svgHeight} ` +
    terrainPoints.map(p => `L ${getX(p.km)},${getY(p.elev)}`).join(' ') +
    ` L ${getX(SYSTEM_SPECS.routeLengthKm)},${svgHeight} Z`;

  // Path data for the cable (sagging catenary curves between towers)
  const cablePath = `M ${getX(0)},${getY(852) - 18} ` +
    TOWERS_DATA.map(t => `L ${getX(t.distanceKm)},${getY(t.elevationM) - t.heightM}`).join(' ') +
    ` L ${getX(SYSTEM_SPECS.routeLengthKm)},${getY(1162) - 18}`;

  // Calculate positions for simulated cabins moving along the track
  // Visual limit: only show a maximum of 12 cabins on the map to avoid clutter
  const visualCabinsCount = Math.min(numCabins, 12);
  
  // Define key points of the cable for precise interpolation
  const cablePoints = [
    { km: 0, y: getY(852) - 18 },
    ...TOWERS_DATA.map(t => ({ km: t.distanceKm, y: getY(t.elevationM) - t.heightM })),
    { km: SYSTEM_SPECS.routeLengthKm, y: getY(1162) - 18 }
  ];

  const cabins = Array.from({ length: visualCabinsCount }, (_, i) => {
    const fraction = ((cabinOffset / 1000) + (i / visualCabinsCount)) % 1;
    const km = fraction * maxDist;
    
    // Precise segment-based interpolation for Y coordinate
    let cabinY = cablePoints[0].y;
    for (let j = 0; j < cablePoints.length - 1; j++) {
      if (km >= cablePoints[j].km && km <= cablePoints[j+1].km) {
        const segDist = cablePoints[j+1].km - cablePoints[j].km;
        const segProgress = (km - cablePoints[j].km) / (segDist || 1);
        cabinY = cablePoints[j].y + (cablePoints[j+1].y - cablePoints[j].y) * segProgress;
        break;
      }
    }

    return {
      id: i,
      fraction,
      km,
      x: getX(km),
      y: cabinY + 4, // Hanging slightly below the cable line
    };
  });

  return (
    <div className="space-y-4">
      
      {/* Header Bar of Simulator */}
      <div className={`flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border transition-colors backdrop-blur-xl ${
        isLight ? 'bg-white/80 border-slate-200 shadow-sm text-slate-900' : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-gray-500/20 text-gray-500 border border-gray-500/30">
              SIMULADOR DINÁMICO 3D / PERFIL DE LÍNEA
            </span>
            <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Tramo Palo Verde ➔ Mariche</span>
          </div>
          <h2 className={`text-lg font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Topografía de 4.79 km, Distribución de Torres y Telemetría en Vía
          </h2>
        </div>

        {/* View mode toggle */}
        <div className={`flex items-center gap-1.5 p-1 rounded-lg border text-xs font-mono ${
          isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950/50 border-slate-800'
        }`}>
          <button
            onClick={() => setViewStyle('blueprint')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              viewStyle === 'blueprint' ? 'bg-gray-500 text-slate-950 font-bold' : isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            Blueprint CAD
          </button>
        </div>
      </div>

      {/* Main Simulator Canvas Container */}
      <div className={`relative rounded-2xl border overflow-hidden shadow-2xl transition-colors backdrop-blur-xl ${
        isLight ? 'bg-white/90 border-slate-200' : 'bg-slate-900/60 border-slate-700/50'
      }`}>
        
        {/* Visual Environment Style Overlay */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          viewStyle === 'thermal' ? 'bg-rose-950/20 mix-blend-color-burn' :
          viewStyle === 'satellite' ? 'bg-emerald-950/15' : 'bg-gray-950/10'
        }`} />

        {/* Grid lines for CAD blueprint look */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* SVG Interactive Elevation & Cable Cross Section */}
        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto min-w-[760px] select-none"
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="terrainGradBlueprint" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.05" />
              </linearGradient>

              <linearGradient id="terrainGradSatellite" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#059669" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.05" />
              </linearGradient>

              <linearGradient id="terrainGradThermal" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e11d48" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#9f1239" stopOpacity="0.08" />
              </linearGradient>

              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Elevation grid lines */}
            {[900, 1000, 1100, 1200].map(elev => (
              <g key={elev}>
                <line
                  x1={paddingX}
                  y1={getY(elev)}
                  x2={svgWidth - paddingX}
                  y2={getY(elev)}
                  stroke="#334155"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 10}
                  y={getY(elev) + 4}
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {elev}m
                </text>
              </g>
            ))}

            {/* Terrain Geometry */}
            <path
              d={terrainPath}
              fill={
                viewStyle === 'thermal' ? 'url(#terrainGradThermal)' :
                viewStyle === 'satellite' ? 'url(#terrainGradSatellite)' :
                'url(#terrainGradBlueprint)'
              }
              stroke={
                viewStyle === 'thermal' ? '#f43f5e' :
                viewStyle === 'satellite' ? '#10b981' :
                '#6b7280'
              }
              strokeWidth="2"
            />

            {/* Cable Catenary Path */}
            <path
              d={cablePath}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
              filter="url(#glow)"
            />

            {/* Second cable trace for bicable/double-loop representation */}
            <path
              d={cablePath}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.5"
              strokeDasharray="6 3"
              opacity="0.7"
            />

            {/* Towers (Torres) */}
            {TOWERS_DATA.map((tower) => {
              const tx = getX(tower.distanceKm);
              const baseTy = getY(tower.elevationM);
              const topTy = baseTy - tower.heightM;
              const isSelected = selectedTower?.id === tower.id;
              const towerColor = 
                tower.status === 'Operativo' ? '#10b981' :
                tower.status === 'Requiere NDT' ? '#f59e0b' : '#ef4444';

              return (
                <g
                  key={tower.id}
                  className="cursor-pointer group"
                  onClick={() => {
                    playClickSound();
                    setSelectedTower(tower);
                  }}
                >
                  {/* Foundation line */}
                  <line
                    x1={tx}
                    y1={baseTy}
                    x2={tx}
                    y2={topTy}
                    stroke={isSelected ? '#6b7280' : '#94a3b8'}
                    strokeWidth={isSelected ? '4' : '2.5'}
                  />

                  {/* Tower crosshead (travesaño de balancines) */}
                  <line
                    x1={tx - 10}
                    y1={topTy}
                    x2={tx + 10}
                    y2={topTy}
                    stroke={isSelected ? '#6b7280' : '#cbd5e1'}
                    strokeWidth="3"
                  />

                  {/* Sheave Battery Indicator */}
                  <circle
                    cx={tx}
                    cy={topTy}
                    r={isSelected ? 6 : 4}
                    fill={towerColor}
                    stroke="#0f172a"
                    strokeWidth="1.5"
                  />

                  {/* Tower label */}
                  <text
                    x={tx}
                    y={topTy - 10}
                    fill={isSelected ? '#6b7280' : '#94a3b8'}
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {tower.code}
                  </text>

                  {/* Interactive hit area */}
                  <rect
                    x={tx - 15}
                    y={topTy - 15}
                    width="30"
                    height={tower.heightM + 25}
                    fill="transparent"
                  />
                </g>
              );
            })}

            {/* Animated Gondolas along the line */}
            {cabins.map((c) => (
              <g key={c.id} transform={`translate(${c.x}, ${c.y})`}>
                {/* Hanger arm (tirante) */}
                <line x1="0" y1="0" x2="0" y2="8" stroke="#cbd5e1" strokeWidth="1.5" />
                {/* Grip clamp on wire */}
                <rect x="-3" y="-2" width="6" height="4" rx="1" fill="#ef4444" />
                {/* Gondola Cabin Body */}
                <rect
                  x="-7"
                  y="8"
                  width="14"
                  height="12"
                  rx="3"
                  fill="#ef4444"
                  stroke="#b91c1c"
                  strokeWidth="1"
                />
                {/* Cabin window */}
                <rect x="-5" y="10" width="10" height="5" rx="1" fill="#e0f2fe" opacity="0.8" />
              </g>
            ))}

            {/* Terminals (Palo Verde and Filas de Mariche) */}
            {/* Palo Verde */}
            <g transform={`translate(${getX(0) - 25}, ${getY(852) - 35})`}>
              <rect width="50" height="35" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
              <text x="25" y="14" fill="#6b7280" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                ESTACIÓN
              </text>
              <text x="25" y="25" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                PALO VERDE
              </text>
              <circle cx="25" cy="35" r="3" fill="#10b981" />
            </g>

            {/* Filas de Mariche */}
            <g transform={`translate(${getX(4.79) - 25}, ${getY(1162) - 35})`}>
              <rect width="50" height="35" rx="4" fill="#0f172a" stroke="#6b7280" strokeWidth="2" />
              <text x="25" y="14" fill="#6b7280" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                TERMINAL
              </text>
              <text x="25" y="25" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                MARICHE
              </text>
              <circle cx="25" cy="35" r="3" fill="#10b981" />
            </g>
          </svg>
        </div>

        {/* Emergency Stop Banner Overlay if triggered */}
        {isEmergencyStopped && (
          <div className="absolute inset-0 bg-rose-950/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-pulse z-20">
            <ShieldAlert className="w-14 h-14 text-rose-500 mb-2" />
            <h3 className="text-2xl font-black text-white uppercase tracking-wider font-mono">
              PARADA DE EMERGENCIA ACTIVADA (E-STOP)
            </h3>
            <p className="text-rose-200 text-sm max-w-md mt-1 mb-4">
              Frenos mecánicos directos a polea motriz aplicados. Lazo de seguridad SCADA abierto. Simulación en cero m/s.
            </p>
            <button
              onClick={handleEmergencyStop}
              className="px-6 py-2.5 rounded-xl bg-white text-rose-950 font-extrabold text-sm shadow-xl hover:bg-rose-100 cursor-pointer"
            >
              Reestablecer Lazo & Reanudar Marcha
            </button>
          </div>
        )}

      </div>

      {/* Simulator Telemetry & Control Dashboard Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Dynamic Controls */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Gauge className="w-4 h-4 text-gray-400" />
              <span>Controles de Marcha & Telemetría</span>
            </h3>
            <div className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              isEmergencyStopped ? 'bg-rose-500/20 text-rose-400' :
              isRunning ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
            }`}>
              {isEmergencyStopped ? 'E-STOP ACTIVO' : isRunning ? 'EN OPERACIÓN' : 'DETENIDO'}
            </div>
          </div>

          {/* Speed Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
              <span>Velocidad de cable (m/s)</span>
              <span className="font-bold text-gray-400">{isEmergencyStopped ? '0.0' : speed.toFixed(1)} m/s</span>
            </div>
            <input
              type="range"
              min="0"
              max="5.0"
              step="0.1"
              value={speed}
              disabled={isEmergencyStopped}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-gray-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0 (Parada)</span>
              <span>2.5 (Inspección)</span>
              <span>5.0 (Máxima)</span>
            </div>
          </div>

          {/* Travel Time Estimation (4.79 km) */}
          <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Tiempo de viaje (4.79 km):</span>
              <span className={`font-bold ${!isRunning || isEmergencyStopped || speed === 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {(!isRunning || isEmergencyStopped || speed === 0) 
                  ? '--:--' 
                  : `${Math.floor((4790 / speed) / 60)}m ${Math.round((4790 / speed) % 60)}s`
                }
              </span>
            </div>
            <div className="mt-1 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-500" 
                style={{ width: isRunning && !isEmergencyStopped && speed > 0 ? `${(speed / 6) * 100}%` : '0%' }}
              />
            </div>
          </div>

          {/* Wind Speed Simulator */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-red-200" />
                Viento transversal (Torre P08)
              </span>
              <span className={`font-bold ${windKmh > 45 ? 'text-rose-400 animate-pulse' : 'text-red-200'}`}>
                {windKmh} km/h
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="70"
              step="5"
              value={windKmh}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setWindKmh(val);
                if (val > 50) playAlertSound('warning');
              }}
              className="w-full accent-red-200 cursor-pointer"
            />
            {windKmh > 50 && (
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-rose-500/15 border border-rose-500/30 text-[11px] text-rose-300 font-mono mt-1">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Alerta Anemométrica: Reducción preventiva obligatoria a 2.5 m/s</span>
              </div>
            )}
          </div>

          {/* Number of Cabins Controller */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-purple-300" />
                Cabinas en línea
              </span>
              <span className="font-bold text-purple-300">{numCabins} Unid.</span>
            </div>
            <input
              type="range"
              min="4"
              max="144"
              step="2"
              value={numCabins}
              onChange={(e) => {
                setNumCabins(parseInt(e.target.value));
                playClickSound();
              }}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => {
                playClickSound();
                setIsRunning(!isRunning);
              }}
              disabled={isEmergencyStopped}
              className={`flex-1 py-2 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                isRunning
                  ? 'bg-slate-800 text-slate-300 hover:text-white'
                  : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRunning ? 'Pausar Línea' : 'Reanudar'}</span>
            </button>

            <button
              onClick={handleEmergencyStop}
              className={`flex-1 py-2 rounded-lg font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isEmergencyStopped
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                  : 'bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-600/25'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{isEmergencyStopped ? 'Reset E-Stop' : 'Parada E-Stop'}</span>
            </button>
          </div>

        </div>

        {/* Tower Inspection Card */}
        {selectedTower ? (
          <div className={`p-4 rounded-xl border space-y-3 backdrop-blur-xl transition-colors ${
            isLight ? 'bg-white/80 border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Mountain className="w-4 h-4 text-red-300" />
                <span>Inspección de Pilona Seleccionada</span>
              </h3>
              <span className="text-xs font-mono font-bold text-red-300 bg-red-200/15 px-2 py-0.5 rounded border border-red-200/30">
                {selectedTower.code}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className={`p-2.5 rounded-lg border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800'
              }`}>
                <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>COTA</div>
                <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedTower.elevationM} msnm</div>
              </div>
              <div className={`p-2.5 rounded-lg border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800'
              }`}>
                <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>ALTURA</div>
                <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedTower.heightM} metros</div>
              </div>
              <div className={`p-2.5 rounded-lg border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800'
              }`}>
                <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Cantidad de Poleas</div>
                <div className="text-cyan-500 font-bold">Poleas ({selectedTower.sheaveCount})</div>
              </div>
              <div className={`p-2.5 rounded-lg border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800'
              }`}>
                <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>PENDIENTE</div>
                <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{selectedTower.slopeDeg}°</div>
              </div>
            </div>

            <div className={`p-3 rounded-lg border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800'
            }`}>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Estado Diagnóstico General Trade:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  selectedTower.status === 'Operativo' ? 'bg-emerald-500/20 text-emerald-500' :
                  selectedTower.status === 'Requiere NDT' ? 'bg-red-300/20 text-red-300' : 'bg-rose-500/20 text-rose-500'
                }`}>
                  {selectedTower.status}
                </span>
              </div>
              
              {user ? (
                <div className="space-y-2">
                  <textarea
                    value={editingObservation}
                    onChange={(e) => setEditingObservation(e.target.value)}
                    placeholder="Escriba aquí sus observaciones técnicas..."
                    className={`w-full h-24 p-2 text-[11px] rounded-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none ${
                      isLight 
                        ? 'bg-white border-slate-200 text-slate-700' 
                        : 'bg-slate-900 border-slate-700 text-slate-300 placeholder:text-slate-600'
                    }`}
                  />
                  <button
                    onClick={saveObservation}
                    disabled={isSaving}
                    className={`w-full flex items-center justify-center gap-2 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                      isSaving
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                    }`}
                  >
                    {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                    {isSaving ? 'Guardando...' : 'Guardar Observación'}
                  </button>
                </div>
              ) : (
                <div className={`p-4 rounded-lg border border-dashed flex flex-col items-center gap-2 ${
                  isLight ? 'bg-slate-100/50 border-slate-300' : 'bg-slate-900/30 border-slate-700/50'
                }`}>
                  <p className="text-[10px] text-center text-slate-500">
                    Inicie sesión para editar y guardar observaciones técnicas.
                  </p>
                  <button
                    onClick={loginWithGoogle}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-[10px] font-bold hover:bg-slate-50 transition-all shadow-sm"
                  >
                    <LogIn className="w-3 h-3" />
                    Iniciar Sesión con Google
                  </button>
                </div>
              )}
            </div>

            <div className={`text-[11px] italic flex items-center gap-1.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>Haz clic en cualquiera de las 32 torres en el gráfico.</span>
            </div>
          </div>
        ) : (
          <div className={`p-8 rounded-xl border flex flex-col items-center justify-center text-center space-y-3 transition-colors ${
            isLight ? 'bg-slate-50/50 border-slate-200 text-slate-500' : 'bg-slate-900/30 border-slate-800/50 text-slate-400'
          }`}>
            <Mountain className="w-8 h-8 opacity-20" />
            <p className="text-xs font-medium max-w-[200px]">
              Seleccione una pilona en el simulador para ver su ficha técnica de inspección.
            </p>
          </div>
        )}

        {/* Global Line Specifications Quick Overview */}
        <div className={`p-4 rounded-xl border space-y-3 backdrop-blur-xl transition-colors ${
          isLight ? 'bg-white/80 border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
        }`}>
          <h3 className={`text-sm font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <Activity className="w-4 h-4 text-emerald-500" />
            <span>Parámetros Operativos del Sistema</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className={`flex items-center justify-between p-2 rounded-lg border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800'
            }`}>
              <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Tensión nominal de cable:</span>
              <span className="font-mono font-bold text-amber-500">285 kN (Carro Tensor)</span>
            </div>
            <div className={`flex items-center justify-between p-2 rounded-lg border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800'
            }`}>
              <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Cabinas operativas:</span>
              <span className="font-mono font-bold text-purple-400">{numCabins} Cabinas</span>
            </div>
            <div className={`flex items-center justify-between p-2 rounded-lg border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800'
            }`}>
              <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Intervalo entre cabinas:</span>
              <span className={`font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {speed > 0 ? ((SYSTEM_SPECS.routeLengthKm * 2000 / numCabins) / speed).toFixed(1) : '---'} seg
              </span>
            </div>
            <div className={`flex items-center justify-between p-2 rounded-lg border ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800'
            }`}>
              <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Distancia entre cabinas:</span>
              <span className={`font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {Math.round(SYSTEM_SPECS.routeLengthKm * 2000 / numCabins)} metros
              </span>
            </div>
          </div>


        </div>

      </div>

    </div>
  );
}
