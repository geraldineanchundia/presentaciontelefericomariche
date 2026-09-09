import { useState, useEffect } from 'react';
import { 
  Images, 
  Eye, 
  ZoomIn, 
  X, 
  Calendar, 
  Tag, 
  Maximize2, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Edit2
} from 'lucide-react';
import { HISTORICAL_PHOTOS } from '../../data/telefericoData';
import { HistoricalPhoto } from '../../types';
import { playClickSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import { ImageEditor } from './ImageEditor';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { collection, onSnapshot, setDoc, doc, serverTimestamp } from 'firebase/firestore';

export function SlideGallery() {
  const { isLight } = useTheme();
  const [activePhoto, setActivePhoto] = useState<HistoricalPhoto | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<HistoricalPhoto | null>(null);
  const [photos, setPhotos] = useState<HistoricalPhoto[]>(HISTORICAL_PHOTOS);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'galleryPhotos'), (snapshot) => {
      const customPhotos: { [id: string]: string } = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.id && data.imageUrl) {
          customPhotos[data.id] = data.imageUrl;
        }
      });
      
      setPhotos(HISTORICAL_PHOTOS.map(p => {
        if (customPhotos[p.id]) {
          return { ...p, imageUrl: customPhotos[p.id] };
        }
        return p;
      }));
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'galleryPhotos');
    });

    return () => unsub();
  }, []);

  const handleNextPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = photos.findIndex(p => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    playClickSound();
    setActivePhoto(photos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!activePhoto) return;
    const currentIndex = photos.findIndex(p => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    playClickSound();
    setActivePhoto(photos[prevIndex]);
  };

  const handleUpdatePhoto = async (newImageUrl: string) => {
    if (!editingPhoto) return;
    
    // Local optimistic update
    setPhotos(prev => prev.map(p => p.id === editingPhoto.id ? { ...p, imageUrl: newImageUrl } : p));
    
    try {
      await setDoc(doc(db, 'galleryPhotos', editingPhoto.id), {
        id: editingPhoto.id,
        imageUrl: newImageUrl,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `galleryPhotos/${editingPhoto.id}`);
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 backdrop-blur-xl transition-colors ${
        isLight ? 'bg-white/80 border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
      }`}>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-500 border border-cyan-500/30">
              REGISTRO FOTOGRÁFICO HISTÓRICO & TÉCNICO
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/30">
              🔒 ALMACENAMIENTO PERMANENTE ACTIVO
            </span>
            <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Memoria de Infraestructura & Comunidad</span>
          </div>
          <h2 className={`text-lg font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Galería Documental: Hitos de Construcción, Maquinaria e Impacto Social
          </h2>
        </div>
      </div>

      {/* Photo Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => {
              playClickSound();
              setActivePhoto(photo);
            }}
            className={`group relative rounded-2xl border overflow-hidden cursor-pointer shadow-lg transition-all flex flex-col justify-between backdrop-blur-xl ${
              isLight
                ? 'bg-white/85 border-slate-200 hover:border-amber-500/80 hover:shadow-xl text-slate-900'
                : 'bg-slate-900/60 border-slate-700/60 hover:border-amber-500/60 hover:shadow-amber-500/10 text-slate-100'
            }`}
          >
            {/* Image Banner */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              {/* Year & Category tags on top of image */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-950/80 backdrop-blur-md text-amber-400 border border-slate-700">
                  {photo.year}
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-slate-950/80 backdrop-blur-md text-slate-200 border border-slate-700">
                  {photo.category}
                </span>
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono font-bold backdrop-blur-[2px]">
                <ZoomIn className="w-5 h-5 text-amber-400" />
                <span>Ampliar Archivo Técnico</span>
              </div>
              
              {/* Edit button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingPhoto(photo);
                }}
                className="absolute top-3 right-3 p-1.5 rounded-md bg-slate-950/70 text-white hover:bg-amber-500 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            {/* Content Details */}
            <div className="p-4 space-y-2">
              <h3 className={`text-base font-bold transition-colors ${
                isLight ? 'text-slate-900 group-hover:text-amber-600' : 'text-white group-hover:text-amber-400'
              }`}>
                {photo.title}
              </h3>
              
              <p className={`text-xs line-clamp-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {photo.description}
              </p>

              <div className={`pt-2 border-t flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono ${
                isLight ? 'border-slate-200' : 'border-slate-800/80'
              }`}>
                <span className="text-cyan-500 font-semibold truncate max-w-[260px]">
                  ⚙️ {photo.technicalHighlight}
                </span>
                <span className="text-emerald-500 font-bold">
                  ✓ {photo.impactScore}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal for High Res Photo Technical Inspection */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className={`relative max-w-4xl w-full rounded-2xl border overflow-hidden shadow-2xl space-y-0 ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-700 text-slate-100'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`p-4 border-b flex items-center justify-between gap-3 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}>
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-500 border border-amber-500/30">
                  {activePhoto.category}
                </span>
                <span className={`text-xs font-mono ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Año de Registro: {activePhoto.year}</span>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isLight ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative aspect-video w-full bg-slate-950">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              
              {/* Prev / Next controls */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 border border-slate-700 text-white cursor-pointer transition-transform hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-slate-950 border border-slate-700 text-white cursor-pointer transition-transform hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer Description */}
            <div className="p-5 space-y-3">
              <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {activePhoto.title}
              </h3>
              <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                {activePhoto.description}
              </p>
              
              <div className={`p-3 rounded-xl border flex flex-wrap items-center justify-between gap-3 text-xs font-mono ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
              }`}>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-500" />
                  <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>Detalle de Ingeniería:</span>
                  <span className={isLight ? 'text-slate-900 font-bold' : 'text-white font-bold'}>{activePhoto.technicalHighlight}</span>
                </div>
                <div className="text-emerald-500 font-bold">
                  Evaluación de Impacto: {activePhoto.impactScore}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Image Editor */}
      {editingPhoto && (
        <ImageEditor
          currentImageUrl={editingPhoto.imageUrl}
          onClose={() => setEditingPhoto(null)}
          onUpdate={handleUpdatePhoto}
        />
      )}

    </div>
  );
}
