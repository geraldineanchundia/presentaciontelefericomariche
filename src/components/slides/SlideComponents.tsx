import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Activity, 
  Layers, 
  Anchor, 
  Gauge, 
  ShieldAlert, 
  CheckCircle2, 
  Wrench, 
  AlertOctagon, 
  ChevronRight, 
  Sparkles,
  Search,
  Image as ImageIcon,
  Upload,
  Trash2,
  Loader2,
  LogIn,
  Plus,
  Maximize2,
  X,
  Camera,
  Box
} from 'lucide-react';
import { TELEFERICO_COMPONENTS } from '../../data/telefericoData';
import { TelefericoComponent } from '../../types';
import { playClickSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { db, auth, loginWithGoogle, handleFirestoreError, OperationType } from '../../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';

export function SlideComponents() {
  const { isLight } = useTheme();
  const [selectedComp, setSelectedComp] = useState<TelefericoComponent>(TELEFERICO_COMPONENTS[0]);
  const [activeTab, setActiveTab] = useState<'specs' | 'diagnostics' | 'gtService'>('specs');
  
  const [user, setUser] = useState<User | null>(null);
  const [componentImages, setComponentImages] = useState<Record<string, { url: string; timestamp: string; technician: string }[]>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Firestore Analysis Listener
  useEffect(() => {
    const path = `componentAnalysis/${selectedComp.id}`;
    const unsubscribe = onSnapshot(doc(db, path), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        // Support both old string array and new object array for backward compatibility
        const rawImages = data.images || [];
        const formattedImages = rawImages.map((img: any) => {
          if (typeof img === 'string') {
            return { url: img, timestamp: new Date().toLocaleDateString(), technician: 'Sistema' };
          }
          return img;
        });
        setComponentImages(prev => ({ ...prev, [selectedComp.id]: formattedImages }));
      } else {
        setComponentImages(prev => ({ ...prev, [selectedComp.id]: [] }));
      }
    }, (error) => {
      // It's okay if it doesn't exist yet, but handle real errors
      if (error.code !== 'permission-denied') {
        handleFirestoreError(error, OperationType.GET, path);
      }
    });

    return () => unsubscribe();
  }, [selectedComp.id]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Basic size validation (limit to 100KB for Firestore base64 storage)
    if (file.size > 150 * 1024) {
      alert("La imagen es muy pesada. Por favor suba una imagen menor a 150KB para este prototipo.");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      const currentImages = componentImages[selectedComp.id] || [];
      const newImageData = {
        url: base64String,
        timestamp: new Date().toLocaleString(),
        technician: user ? (user.displayName || user.email || 'Técnico') : 'Técnico de Campo (Invitado)'
      };
      const updatedImages = [...currentImages, newImageData];

      const path = `componentAnalysis/${selectedComp.id}`;
      try {
        await setDoc(doc(db, path), {
          componentId: selectedComp.id,
          images: updatedImages,
          updatedAt: serverTimestamp(),
          updatedBy: user ? user.uid : 'guest_technician'
        });
        setIsUploading(false);
      } catch (error) {
        setIsUploading(false);
        handleFirestoreError(error, OperationType.WRITE, path);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = async (index: number) => {
    const currentImages = componentImages[selectedComp.id] || [];
    const updatedImages = currentImages.filter((_, i) => i !== index);

    const path = `componentAnalysis/${selectedComp.id}`;
    try {
      await setDoc(doc(db, path), {
        componentId: selectedComp.id,
        images: updatedImages,
        updatedAt: serverTimestamp(),
        updatedBy: user ? user.uid : 'guest_technician'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-amber-500" />;
      case 'Activity': return <Activity className="w-5 h-5 text-cyan-500" />;
      case 'Layers': return <Layers className="w-5 h-5 text-emerald-500" />;
      case 'Anchor': return <Anchor className="w-5 h-5 text-rose-500" />;
      case 'Gauge': return <Gauge className="w-5 h-5 text-purple-500" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-blue-500" />;
      case 'Box': return <Box className="w-5 h-5 text-indigo-500" />;
      default: return <Wrench className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Title Header */}
      <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 backdrop-blur-xl transition-colors ${
        isLight ? 'bg-white/80 border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/20 text-amber-500 border border-amber-500/30">
              INFOGRAFÍA INTERACTIVA DE INGENIERÍA
            </span>
            <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Anatomía y Subsistemas Críticos</span>
          </div>
          <h2 className={`text-lg font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Componentes Electromecánicos del Sistema Palo Verde - Mariche
          </h2>
        </div>
        <div className={`text-xs font-mono ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Normativa Técnica: <strong className={isLight ? 'text-slate-900' : 'text-white'}>EN 12929</strong>
        </div>
      </div>

      {/* Main Interactive Explorer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Component Selector List (Left Column) */}
        <div className="lg:col-span-4 space-y-2">
          <div className={`text-xs font-mono px-1 uppercase tracking-wider ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Seleccione Subsistema para Análisis:
          </div>

          {TELEFERICO_COMPONENTS.map((comp) => {
            const isSelected = selectedComp.id === comp.id;
            return (
              <button
                key={comp.id}
                onClick={() => {
                  playClickSound();
                  setSelectedComp(comp);
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 backdrop-blur-md ${
                  isSelected
                    ? isLight
                      ? 'bg-amber-50/90 border-amber-500 shadow-md ring-1 ring-amber-500/40 text-slate-900'
                      : 'bg-slate-800/80 border-amber-500/70 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40 text-slate-100'
                    : isLight
                    ? 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300 text-slate-800'
                    : 'bg-slate-900/40 border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600 text-slate-200'
                }`}
              >
                <div className={`p-2 rounded-lg border shrink-0 mt-0.5 ${
                  isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                }`}>
                  {getIcon(comp.iconName)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-xs font-mono font-semibold truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{comp.system}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                      comp.criticality === 'Extrema' ? 'bg-rose-500/20 text-rose-500' :
                      comp.criticality === 'Alta' ? 'bg-amber-500/20 text-amber-500' : 'bg-cyan-500/20 text-cyan-500'
                    }`}>
                      {comp.criticality}
                    </span>
                  </div>
                  <h3 className={`text-sm font-bold truncate mt-0.5 ${isSelected ? 'text-amber-500' : isLight ? 'text-slate-900' : 'text-white'}`}>
                    {comp.name}
                  </h3>
                  <div className={`text-[11px] truncate mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{comp.location}</div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 self-center transition-transform ${
                  isSelected ? 'text-amber-500 translate-x-0.5' : isLight ? 'text-slate-400' : 'text-slate-500'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Detailed Inspection Dossier (Right Column) */}
        <div className={`lg:col-span-8 rounded-2xl border p-5 lg:p-6 space-y-5 backdrop-blur-xl transition-colors ${
          isLight ? 'bg-white/85 border-slate-200 shadow-md text-slate-900' : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
        }`}>
          
          {/* Header of selected component */}
          <div className={`flex flex-wrap items-start justify-between gap-4 pb-4 border-b ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}>
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'
                }`}>
                  {selectedComp.system}
                </span>
                <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Ubicación: {selectedComp.location}</span>
              </div>
              <h2 className={`text-xl sm:text-2xl font-extrabold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {selectedComp.name}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Nivel de Criticidad:</span>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                selectedComp.criticality === 'Extrema' ? 'bg-rose-500/20 border border-rose-500/40 text-rose-500' :
                'bg-amber-500/20 border border-amber-500/40 text-amber-500'
              }`}>
                {selectedComp.criticality}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className={`p-4 rounded-xl border-l-4 ${
            isLight ? 'bg-slate-50 border-slate-200 border-l-blue-500' : 'bg-slate-900/40 border-slate-800 border-l-blue-500'
          }`}>
            <p className={`text-sm leading-relaxed whitespace-pre-wrap ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              {selectedComp.description}
            </p>
          </div>

          {/* Sub-tabs for deep diving into the component */}
          <div className={`flex flex-wrap items-center gap-2 border-b pb-2 ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
            <button
              onClick={() => { playClickSound(); setActiveTab('specs'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Especificaciones Técnicas
            </button>
            <button
              onClick={() => { playClickSound(); setActiveTab('diagnostics'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'diagnostics'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : isLight ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Diagnóstico & Mantenimiento
            </button>
            <button
              onClick={() => { playClickSound(); setActiveTab('gtService'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'gtService'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md'
                  : isLight ? 'text-amber-700 bg-amber-50 hover:bg-amber-100' : 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20'
              }`}
            >
              Solución General Trade
            </button>
          </div>

          {/* Tab Content 1: Specs */}
          {activeTab === 'specs' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedComp.specs?.map((spec, i) => (
                  <div key={i} className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800'
                  }`}>
                    <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>{spec.label}:</span>
                    <span className={`font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 2: Diagnostics (Combined Failures and Maintenance) */}
          {activeTab === 'diagnostics' && (
            <div className="space-y-4">
              {/* Failures Section */}
              <div className={`p-4 rounded-xl border space-y-3 ${
                isLight ? 'bg-rose-50/80 border-rose-200' : 'bg-rose-950/20 border-rose-900/30'
              }`}>
                <div className="flex items-center gap-2 text-rose-500 text-xs font-mono font-bold">
                  <AlertOctagon className="w-4 h-4" />
                  <span>Posibles fallas Operativas.</span>
                </div>
                <ul className="space-y-2">
                  {selectedComp.failureModes?.map((failure, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <span className="text-rose-500 mt-0.5">•</span>
                      <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>{failure}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Maintenance Section */}
              <div className={`p-4 rounded-xl border space-y-3 ${
                isLight ? 'bg-cyan-50/80 border-cyan-200' : 'bg-cyan-950/20 border-cyan-900/30'
              }`}>
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold">
                  <Wrench className="w-4 h-4" />
                  <span>Protocolo de Mantenimiento</span>
                </div>
                <p className={`text-xs leading-relaxed whitespace-pre-line ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {selectedComp.maintenanceProtocol}
                </p>
                <div className={`pt-2 border-t flex items-center justify-between text-[11px] font-mono ${
                  isLight ? 'border-cyan-200 text-cyan-700' : 'border-cyan-900/30 text-cyan-300/80'
                }`}>
                  <span>Frecuencia: Rutinaria / Semestral / Parada Mayor Quinquenal</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 4: General Trade Solution */}
          {activeTab === 'gtService' && (
            <div className={`p-4 rounded-xl border space-y-3 ${
              isLight 
                ? 'bg-amber-50/80 border-amber-200' 
                : 'bg-gradient-to-br from-amber-500/15 via-slate-900/40 to-emerald-500/10 border-amber-500/30'
            }`}>
              <div className="flex items-center gap-2 text-amber-500 text-xs font-mono font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Capacidades de Intervención & Suministro de General Trade:</span>
              </div>
              <p className={`text-xs leading-relaxed font-medium ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                {selectedComp.generalTradeService}
              </p>
              <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t text-[11px] font-mono ${
                isLight ? 'border-amber-200 text-slate-700' : 'border-amber-500/20 text-slate-300'
              }`}>
                <div className="flex items-center gap-1 text-emerald-500">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Personal Certificado</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-500">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Repuestos Homologados</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-500">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Garantía</span>
                </div>
              </div>
            </div>
          )}



          {/* Image Lightbox Modal */}
          {selectedImage && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="max-w-5xl w-full h-full flex flex-col items-center justify-center gap-4">
                <img 
                  src={selectedImage} 
                  alt="Vista ampliada" 
                  className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-300" 
                />
                <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-mono">
                  Visualización de Evidencia Técnica de Alta Precisión
                </div>
              </div>
            </div>
          )}

          {/* Persistent Evidence Gallery & Upload */}
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${isLight ? 'bg-blue-100 text-blue-600' : 'bg-blue-500/20 text-blue-400'}`}>
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Evidencia Técnica Detectada
                  </h4>
                  <p className={`text-[9px] mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Visualización persistente de registros de campo</p>
                </div>
              </div>

              {/* Minimalist Upload Button */}
              <div className="flex items-center gap-3">
                {isUploading && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-500 text-[9px] font-bold uppercase tracking-widest animate-pulse">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Transfiriendo...</span>
                  </div>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    isUploading 
                      ? 'opacity-50 cursor-not-allowed'
                      : isLight ? 'bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white shadow-sm' : 'bg-slate-800 text-slate-400 hover:bg-blue-600 hover:text-white shadow-lg'
                  }`}
                >
                  <Plus className="w-3 h-3" />
                  {componentImages[selectedComp.id]?.length > 0 ? 'Añadir Registro' : 'Subir Evidencia'}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-8">
              {componentImages[selectedComp.id] && componentImages[selectedComp.id].length > 0 ? (
                componentImages[selectedComp.id].map((img, idx) => (
                  <div key={idx} className="group relative w-full max-w-2xl aspect-video rounded-3xl overflow-hidden bg-slate-900 shadow-2xl ring-1 ring-white/10 transition-transform hover:scale-[1.01]">
                    <img 
                      src={img.url} 
                      alt={`Evidencia ${idx}`} 
                      className="w-full h-full object-contain bg-black/20" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-6">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(img.url); }}
                        className="p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-blue-600 transition-colors shadow-lg"
                      >
                        <Maximize2 className="w-6 h-6" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                        className="p-4 rounded-full bg-white/10 backdrop-blur-md text-rose-500 hover:bg-rose-600 hover:text-white transition-colors shadow-lg"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                !isUploading && (
                  <div className={`w-full py-12 rounded-3xl border-2 border-dashed flex flex-col items-center gap-3 transition-all ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/20 border-slate-800'
                  }`}>
                    <ImageIcon className="w-12 h-12 opacity-10" />
                    <p className={`text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Sin Registros Técnicos
                    </p>
                    {!user && (
                      <button
                        onClick={loginWithGoogle}
                        className="flex items-center gap-2 px-5 py-2 mt-2 rounded-xl bg-blue-600 text-white text-[10px] font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        Ingresar para Reportar
                      </button>
                    )}
                  </div>
                )
              )}
            </div>
          </div>



        </div>

      </div>

    </div>
  );
}
