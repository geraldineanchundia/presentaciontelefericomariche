import React, { useState } from 'react';
import { 
  Scan, 
  Wrench, 
  PackageCheck, 
  TrendingUp, 
  CheckCircle2, 
  Shield, 
  Award, 
  FileText,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { GENERAL_TRADE_PILLARS } from '../../data/telefericoData';
import { GeneralTradePillar } from '../../types';
import { playClickSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';

interface SlideGeneralTradeProps {}

export function SlideGeneralTrade({}: SlideGeneralTradeProps) {
  const { isLight } = useTheme();
  const [selectedPillar, setSelectedPillar] = useState<GeneralTradePillar>(GENERAL_TRADE_PILLARS[0]);

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scan': return <Scan className="w-5 h-5 text-cyan-500" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-amber-500" />;
      case 'PackageCheck': return <PackageCheck className="w-5 h-5 text-emerald-500" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-purple-500" />;
      default: return <Shield className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className={`p-5 rounded-2xl border backdrop-blur-xl transition-colors ${
        isLight ? 'bg-white/80 border-slate-200 text-slate-900 shadow-md' : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-500 border border-red-500/30">
                  GENERAL TRADE
                </span>
                <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Aliado Estratégico en Confiabilidad</span>
              </div>
              <h2 className={`text-xl font-extrabold mt-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Servicios Especializados, Suministros y Gestión
              </h2>
              <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                <strong>Compromiso con la eficiencia operativa en el sector público y privado</strong>
                <br />
                General Trade ofrece desde el diagnóstico, inspecciones especializadas por ultrasonido, flujo magnético, mantenimiento hasta la provisión de cables certificados.
              </p>
            </div>
            
            <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-850/40 border-slate-800'}`}>
              <h3 className={`text-xs font-bold uppercase tracking-wider text-amber-500 font-mono`}>Restauración y Sostenibilidad</h3>
              <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                General Trade pone a disposición su capacidad técnica multidisciplinaria para liderar la rehabilitación operativa del Teleférico Palo Verde - Mariche. Con un enfoque de gestión integral de los recursos, garantizamos eficiencia, seguridad absoluta bajo normativas internacionales (EN 12929 / ISO 4309) y máxima disponibilidad.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 h-56 w-full rounded-2xl overflow-hidden border border-slate-200/20 shadow-md relative group">
            <img 
              src="/src/assets/images/technical_inspection_1788660021437.jpg" 
              alt="Ingeniería General Trade" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex items-end p-3">
              <div className="text-left">
                <span className="text-[9px] text-amber-400 font-mono font-bold block uppercase tracking-widest">Ensayos NDT y Overhaul</span>
                <span className="text-xs text-white font-bold block">Garantía de Confiabilidad</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* 4 Pillars Interactive Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {GENERAL_TRADE_PILLARS.map((pillar) => {
          const isSelected = selectedPillar.id === pillar.id;
          return (
            <button
              key={pillar.id}
              onClick={() => {
                playClickSound();
                setSelectedPillar(pillar);
              }}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 backdrop-blur-xl ${
                isSelected
                  ? isLight
                    ? 'bg-amber-50/90 border-amber-500 shadow-md ring-1 ring-amber-500/40 text-slate-950'
                    : 'bg-slate-800/80 border-amber-500 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40 text-slate-100'
                  : isLight
                  ? 'bg-white/75 border-slate-200 hover:border-slate-300 text-slate-800'
                  : 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/40 text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg border ${
                  isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900/80 border-slate-800'
                }`}>
                  {getPillarIcon(pillar.icon)}
                </div>
                <span className="text-xs font-mono font-bold text-amber-500">Pilar {pillar.id.includes('inspections') ? '01' : pillar.id.includes('maintenance') ? '02' : pillar.id.includes('procurement') ? '03' : '04'}</span>
              </div>
              <div>
                <h4 className={`text-sm font-bold ${
                  isSelected ? (isLight ? 'text-amber-700' : 'text-amber-300') : (isLight ? 'text-slate-900' : 'text-white')
                }`}>
                  {pillar.title}
                </h4>
                <p className={`text-[11px] mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {pillar.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Pillar Deep Dive Card */}
      <div className={`p-6 rounded-2xl border space-y-5 backdrop-blur-xl transition-colors ${
        isLight ? 'bg-white/85 border-slate-200 text-slate-900 shadow-md' : 'bg-slate-900/60 border-slate-700/60 text-slate-100'
      }`}>
        
        <div className={`flex flex-wrap items-start justify-between gap-4 pb-4 border-b ${
          isLight ? 'border-slate-200' : 'border-slate-800'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-500">
                CAPACIDAD TÉCNICA GENERAL TRADE
              </span>
              <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Alcance Integral de Ingeniería</span>
            </div>
            <h3 className={`text-xl font-extrabold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {selectedPillar.title}
            </h3>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{selectedPillar.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className={`text-xs font-mono font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Certificaciones Homologadas</span>
          </div>
        </div>

        <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          {selectedPillar.description}
        </p>

        {/* Deliverables checklist */}
        <div className="space-y-2">
          <div className={`text-xs font-mono uppercase tracking-wider ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Procedimientos Ejecutables:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {selectedPillar.deliverables?.map((item, idx) => (
              <div key={idx} className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950/50 border-slate-800 text-slate-200'
              }`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies and Standards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t ${
          isLight ? 'border-slate-200' : 'border-slate-800'
        }`}>
          
          <div className={`p-3.5 rounded-xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'
          }`}>
            <div className="text-[11px] font-mono text-cyan-500 font-bold uppercase mb-2">Equipamiento Tecnológico Utilizado</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedPillar.technologies?.map((tech, i) => (
                <span key={i} className={`px-2 py-1 rounded border text-[11px] font-mono ${
                  isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'
          }`}>
            <div className="text-[11px] font-mono text-amber-500 font-bold uppercase mb-2">Normativa Internacional Aplicable</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedPillar.standards?.map((std, i) => (
                <span key={i} className={`px-2 py-1 rounded border text-[11px] font-mono ${
                  isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}>
                  {std}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
