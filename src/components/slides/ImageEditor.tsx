import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { playClickSound } from '../../utils/audio';

interface ImageEditorProps {
  currentImageUrl: string;
  onClose: () => void;
  onUpdate: (newImageUrl: string) => void;
}

export function ImageEditor({ currentImageUrl, onClose, onUpdate }: ImageEditorProps) {
  const { isLight } = useTheme();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64Url, setBase64Url] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const compressImage = (dataUrl: string, maxWidth = 1000, maxHeight = 750, quality = 0.75): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => {
        resolve(dataUrl);
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      setLoading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const rawBase64 = reader.result as string;
        try {
          const compressed = await compressImage(rawBase64);
          setBase64Url(compressed);
        } catch (err) {
          setBase64Url(rawBase64);
        } finally {
          setLoading(false);
        }
      };
      reader.onerror = () => {
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    if (base64Url) {
      onUpdate(base64Url);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`max-w-md w-full rounded-2xl p-6 space-y-4 ${isLight ? 'bg-white' : 'bg-slate-900'}`}>
        <div className="flex justify-between items-center">
          <h3 className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Editar Imagen</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-slate-500" /></button>
        </div>
        
        <img src={base64Url || currentImageUrl} alt="Actual" className="w-full h-48 object-cover rounded-lg" />
        
        <div className={`border-2 border-dashed rounded-lg p-4 text-center ${isLight ? 'border-slate-300' : 'border-slate-700'}`}>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
            <Upload className="w-8 h-8 text-slate-400" />
            <span className="text-sm mt-2 text-slate-500">
              {loading ? 'Procesando...' : selectedFile ? selectedFile.name : 'Seleccionar nueva imagen'}
            </span>
          </label>
        </div>

        <button 
          onClick={handleUpdate}
          disabled={!base64Url || loading}
          className="w-full py-2 bg-amber-500 text-slate-900 font-bold rounded-lg disabled:opacity-50 cursor-pointer"
        >
          Guardar Cambios
        </button>
        <p className="text-[10px] text-center text-slate-500 font-mono">
          ⚠ Sincronización permanente activa. Las imágenes actualizadas se conservan en la base de datos histórica y no se pueden eliminar.
        </p>
      </div>
    </div>
  );
}
