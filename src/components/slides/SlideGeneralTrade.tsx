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
  ArrowRight,
  Globe,
  Briefcase,
  Building2,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  HeartHandshake,
  History,
  Compass,
  Check,
  Zap,
  Ship,
  Plane,
  Coins,
  Instagram,
  QrCode,
  Layers,
  Activity
} from 'lucide-react';
import { GENERAL_TRADE_PILLARS } from '../../data/telefericoData';
import { GeneralTradePillar } from '../../types';
import { playClickSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import technicalInspection from '../../assets/images/technical_inspection_1788660021437.jpg';

interface SlideGeneralTradeProps {}

export function SlideGeneralTrade({}: SlideGeneralTradeProps) {
  const { isLight } = useTheme();
  const [activeTab, setActiveTab] = useState<'pillars' | 'procurement' | 'sectors' | 'info'>('pillars');
  const [selectedPillar, setSelectedPillar] = useState<GeneralTradePillar>(GENERAL_TRADE_PILLARS[0]);
  const [infoRightTab, setInfoRightTab] = useState<'catalog' | 'proposal'>('catalog'); // Default to digital catalog view
  const [selectedCatalogCat, setSelectedCatalogCat] = useState<'aero' | 'teleferico' | 'rail' | 'elec' | 'other'>('teleferico');

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
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-500 border border-red-500/30">
                DOSSIER DE SERVICIOS
              </span>
              <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>GENERAL SD TRADE LIMITED, C.A</span>
            </div>
            <h2 className={`text-xl font-extrabold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Catálogo de Procura, Ingeniería Especializada y Servicios de Soporte
            </h2>
            <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Presentamos de manera interactiva la propuesta de General Trade. Desde el diagnóstico mediante inspecciones especializadas y mantenimiento mayor, hasta la procura nacional e internacional de insumos críticos bajo los más altos estándares.
            </p>
          </div>

          <div className="md:col-span-4 h-32 w-full rounded-2xl overflow-hidden border border-slate-200/20 shadow-md relative group">
            <img 
              src={technicalInspection} 
              srcSet={`${technicalInspection} 1x`}
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

      {/* Main Document Navigation Tabs */}
      <div className={`p-1.5 rounded-2xl border flex flex-wrap gap-1.5 transition-colors ${
        isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950/50 border-slate-800'
      }`}>
        <button
          onClick={() => { playClickSound(); setActiveTab('pillars'); }}
          className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wide transition-all cursor-pointer ${
            activeTab === 'pillars'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
              : isLight ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>PILARES DE INGENIERÍA</span>
        </button>

        <button
          onClick={() => { playClickSound(); setActiveTab('procurement'); }}
          className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wide transition-all cursor-pointer ${
            activeTab === 'procurement'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
              : isLight ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>PROCURA & ALIANZAS</span>
        </button>

        <button
          onClick={() => { playClickSound(); setActiveTab('sectors'); }}
          className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wide transition-all cursor-pointer ${
            activeTab === 'sectors'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
              : isLight ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>SECTORES & CLIENTES</span>
        </button>

        <button
          onClick={() => { playClickSound(); setActiveTab('info'); }}
          className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wide transition-all cursor-pointer ${
            activeTab === 'info'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
              : isLight ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>CONTACTO & FICHA</span>
        </button>
      </div>

      {/* Tab Contents */}
      
      {/* 1. PILARES DE INGENIERÍA */}
      {activeTab === 'pillars' && (
        <div className="space-y-4 animate-fadeIn">
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
                    <span className="text-xs font-mono font-bold text-amber-500">
                      Pilar {pillar.id.includes('inspections') ? '01' : pillar.id.includes('maintenance') ? '02' : pillar.id.includes('procurement') ? '03' : '04'}
                    </span>
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
      )}

      {/* 2. PROCURA & ALIANZAS GLOBALES */}
      {activeTab === 'procurement' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Procurement Policy */}
            <div className={`lg:col-span-7 p-6 rounded-2xl border space-y-4 backdrop-blur-xl ${
              isLight ? 'bg-white/80 border-slate-200 text-slate-900 shadow-md' : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
            }`}>
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold">Procura Nacional & Internacional</h3>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Prestamos servicios a pequeñas, medianas y grandes empresas del sector público y privado en la búsqueda, adquisición, comercialización y distribución de materias primas, maquinarias industriales, repuestos, componentes críticos, partes y consumibles de alta complejidad.
              </p>

              <div className={`p-4 rounded-xl border leading-relaxed text-xs ${
                isLight ? 'bg-blue-50/50 border-blue-100 text-slate-700' : 'bg-slate-950/50 border-slate-800 text-slate-300'
              }`}>
                <strong className="text-amber-500 block mb-1">Estructura Financiera Internacional</strong>
                Constituye un eslabón muy importante en nuestra cadena de valor que General SD Trade forme parte de una estructura financiera internacional sólida, lo cual nos permite de manera ágil y 100% segura importar los bienes de gran envergadura y calidad garantizada que nuestros clientes necesiten.
              </div>

              {/* Scope List */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-amber-500 font-bold block">Optimización de la Cadena de Valor</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Gestión de la Cadena de Suministros',
                    'Optimización de Procesos de Mantenimiento',
                    'Modernización de Sistemas y Componentes',
                    'Homologaciones y Certificaciones Directas',
                    'Soporte Técnico y Servicio Post-venta local',
                    'Documentación de Trazabilidad Técnica Completa'
                  ].map((val, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Global Presence */}
            <div className={`lg:col-span-5 p-6 rounded-2xl border space-y-4 backdrop-blur-xl ${
              isLight ? 'bg-white/80 border-slate-200 text-slate-900 shadow-md' : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
            }`}>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-500" />
                <h3 className="text-base font-bold">Presencia y Alianzas</h3>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Mantenemos enlaces logísticos directos, canales de suministro y operaciones en países clave:
              </p>

              {/* Geographic Grid */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { country: 'Alemania (Berlín)', status: 'Socio de Ingeniería' },
                  { country: 'China / Hong Kong', status: 'Suministro Pesado' },
                  { country: 'Rusia', status: 'Equipamiento Metalúrgico' },
                  { country: 'Turquía', status: 'Componentes Especiales' },
                  { country: 'España', status: 'Consultoría y Normativas' },
                  { country: 'Sudáfrica', status: 'Procura de Acero' },
                  { country: 'Chile / Perú', status: 'Soporte Minero' },
                  { country: 'Colombia / Bogota', status: 'Logística Regional' },
                  { country: 'México / Argentina', status: 'Alianza Distribución' },
                  { country: 'Venezuela', status: 'Sede Operativa Local' }
                ].map((item, idx) => (
                  <div key={idx} className={`p-2 rounded-lg border flex flex-col justify-center text-xs ${
                    isLight ? 'bg-slate-50 border-slate-150' : 'bg-slate-950/40 border-slate-800/80'
                  }`}>
                    <span className="font-bold">{item.country}</span>
                    <span className="text-[9px] text-slate-500 font-mono mt-0.5">{item.status}</span>
                  </div>
                ))}
              </div>

              {/* Commercial Partners */}
              <div className="pt-2 border-t border-slate-800/20">
                <span className="text-xs font-mono font-bold text-cyan-500 block mb-2">Marcas de Equipamiento Integradas</span>
                <div className="flex flex-wrap gap-1.5">
                  {['SKF', 'KOVIS', 'SV (Finland)', 'ISOTEC', 'TZCO', 'LMG', 'IVM', 'TransTec', 'SINOMACH'].map((brand, idx) => (
                    <span key={idx} className={`px-2 py-1 rounded text-[10px] font-mono font-bold border ${
                      isLight ? 'bg-slate-100 border-slate-200 text-slate-700 shadow-sm' : 'bg-slate-950/60 border-slate-800 text-slate-300'
                    }`}>
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 3. SECTORES & CLIENTES */}
      {activeTab === 'sectors' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Sectores Industriales */}
            <div className={`lg:col-span-6 p-6 rounded-2xl border space-y-4 backdrop-blur-xl ${
              isLight ? 'bg-white/80 border-slate-200 text-slate-900 shadow-md' : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
            }`}>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold">Experiencia en Sectores Industriales</h3>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Nuestras operaciones abarcan múltiples áreas con requerimientos altamente críticos:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: 'Área Ferroviaria & Cablevías', desc: 'Metros, ferrocarriles nacionales e internacionales y sistemas de teleféricos urbanos o turísticos.', icon: <Wrench className="w-4 h-4 text-amber-400" /> },
                  { title: 'Área Eléctrica', desc: 'Suministro e intervención técnica de variadores, transformadores de potencia y tableros de control.', icon: <Zap className="w-4 h-4 text-yellow-400" /> },
                  { title: 'Área Petrolera & Gas', desc: 'Procura de repuestos mecánicos pesados y consumibles críticos para refinación y exploración.', icon: <Award className="w-4 h-4 text-orange-400" /> },
                  { title: 'Área Marítima', desc: 'Repuestos de motores marinos, logística y suministros para astilleros y flotas comerciales.', icon: <Ship className="w-4 h-4 text-blue-400" /> },
                  { title: 'Sistemas Teleféricos', desc: 'Ingeniería, diagnóstico electromecánico, procura de cables tractores y repuestos críticos para transporte por cable.', icon: <Compass className="w-4 h-4 text-emerald-400" /> },
                  { title: 'Área Aeronáutica', desc: 'Partes, piezas homologadas de alta resistencia y logística internacional certificada.', icon: <Plane className="w-4 h-4 text-cyan-400" /> }
                ].map((sec, idx) => (
                  <div key={idx} className={`p-3 rounded-xl border flex gap-2.5 items-start ${
                    isLight ? 'bg-slate-50 border-slate-150' : 'bg-slate-950/40 border-slate-800'
                  }`}>
                    <div className="p-1.5 rounded-lg bg-slate-800 text-white mt-0.5">{sec.icon}</div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-slate-200">{sec.title}</h4>
                      <p className={`text-[10px] leading-normal ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{sec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clientes e Instituciones */}
            <div className={`lg:col-span-6 p-6 rounded-2xl border space-y-4 backdrop-blur-xl ${
              isLight ? 'bg-white/80 border-slate-200 text-slate-900 shadow-md' : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
            }`}>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-500" />
                <h3 className="text-base font-bold">Experiencia Institucional en el Estado</h3>
              </div>
              
              <div className={`p-4 rounded-xl text-xs leading-relaxed ${
                isLight ? 'bg-amber-50/50 border-amber-100 text-slate-700' : 'bg-slate-950/50 border-slate-800 text-slate-300'
              }`}>
                <strong className="text-amber-500 block mb-1">Impacto en Sistemas Masivos por Cable</strong>
                "Con el **Metro de Caracas** y **Venezolana de Teleféricos (VENTEL)** se ha logrado un desempeño progresivo de reestructuración, procura especializada y mantenimiento correctivo de las líneas de transporte masivo por cable, logrando una optimización de la operatividad en beneficio de la comunidad."
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-500 font-bold block">Instituciones que confían en nuestro servicio</span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {[
                    { name: 'Metro de Caracas', role: 'Sistemas por cable / tracción' },
                    { name: 'Venezolana de Teleféricos (VENTEL)', role: 'Sistemas electromecánicos' },
                    { name: 'Instituto de Ferrocarriles (IFE)', role: 'Material rodante y catenaria' },
                    { name: 'PDVSA', role: 'Suministros y repuestos industriales' },
                    { name: 'CORPOELEC', role: 'Sistemas eléctricos y control' },
                    { name: 'HIDROCAPITAL', role: 'Bombas y motores de gran caudal' },
                    { name: 'Canalizaciones (INC)', role: 'Repuestos de dragado' },
                    { name: 'VENCEMOS', role: 'Rodamientos y bandas transportadoras' },
                    { name: 'VINCCLER C.A.', role: 'Obras electromecánicas de escala' },
                    { name: 'Data Power', role: 'Sistemas de energía ininterrumpida' }
                  ].map((ent, idx) => (
                    <div key={idx} className={`p-2 rounded-lg border ${
                      isLight ? 'bg-slate-50 border-slate-150' : 'bg-slate-950/40 border-slate-800/80'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>{ent.name}</span>
                      </div>
                      <div className="text-[9px] text-slate-500 font-mono mt-0.5 pl-4.5">{ent.role}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 4. CONTACTO & FICHA */}
      {activeTab === 'info' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Contact Details Card */}
            <div className={`md:col-span-6 p-6 rounded-2xl border space-y-4 backdrop-blur-xl ${
              isLight ? 'bg-white/80 border-slate-200 text-slate-900 shadow-md' : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
            }`}>
              <div className="flex items-center gap-2 border-b border-slate-800/20 pb-3">
                <FileText className="w-5 h-5 text-amber-500" />
                <div>
                  <h3 className="text-base font-bold">Ficha Comercial de Contacto</h3>
                  <p className="text-[10px] text-slate-500 font-mono">GENERAL SD TRADE LIMITED, C.A</p>
                </div>
              </div>

              <div className="space-y-3.5">
                
                {/* Email */}
                <div className="flex gap-3 items-start">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-white mt-0.5">
                    <Mail className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-mono block uppercase">Correo Electrónico Oficial</span>
                    <a 
                      href="mailto:info@generaltradeltd.com" 
                      onClick={playClickSound}
                      className="text-xs sm:text-sm font-bold text-amber-500 hover:underline flex items-center gap-1"
                    >
                      <span>info@generaltradeltd.com</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex gap-3 items-start">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-white mt-0.5">
                    <Phone className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono block uppercase">Teléfonos de Enlace</span>
                    <div className="flex flex-col gap-1">
                      {[
                        { num: '+58 212-2861893', type: 'Sede Principal' },
                        { num: '+58 212-2868212', type: 'Sede Comercial' },
                        { num: '+58 424-1170028', type: 'Móvil Corporativo (WhatsApp)' }
                      ].map((phone, i) => (
                        <a 
                          key={i}
                          href={`tel:${phone.num.replace(/\s+/g, '')}`} 
                          onClick={playClickSound}
                          className={`text-xs font-bold font-mono hover:underline ${isLight ? 'text-slate-850' : 'text-slate-200'}`}
                        >
                          {phone.num} <span className="text-[9px] text-slate-500 font-normal">({phone.type})</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-3 items-start">
                  <div className="p-2.5 rounded-xl bg-slate-800 text-white mt-0.5">
                    <MapPin className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-mono block uppercase">Dirección Física de Oficinas</span>
                    <p className={`text-xs leading-relaxed font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                      Avenida Francisco de Miranda, Edificio Mene Grande, Planta Baja, PB-5, Los Palos Grandes, Caracas, Venezuela.
                    </p>
                  </div>
                </div>

                {/* Platforms: Web & Instagram Stacked */}
                <div className={`p-4 rounded-xl border space-y-3.5 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'
                }`}>
                  <span className="text-[10px] text-slate-500 font-mono block uppercase font-bold tracking-wider">Plataformas Digitales y Canales</span>
                  
                  <div className="space-y-3">
                    {/* Website */}
                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-500 font-mono block uppercase">Sitio Web Oficial</span>
                      <a 
                        href="https://www.generaltradeltd.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={playClickSound}
                        className="text-xs font-bold text-cyan-500 hover:underline flex items-center gap-1.5"
                      >
                        <Globe className="w-4 h-4 shrink-0" />
                        <span>www.generaltradeltd.com</span>
                      </a>
                    </div>

                    {/* Instagram */}
                    <div className="space-y-1">
                      <span className="text-[9px] text-slate-500 font-mono block uppercase">Canal de Instagram</span>
                      <a 
                        href="https://www.instagram.com/generaltrade.ve" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={playClickSound}
                        className="text-xs font-bold text-rose-400 hover:underline flex items-center gap-1.5"
                      >
                        <Instagram className="w-4 h-4 shrink-0" />
                        <span>@generaltrade.ve</span>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Corporate Profile Card */}
            <div className={`md:col-span-6 p-6 rounded-2xl border space-y-4 backdrop-blur-xl ${
              isLight ? 'bg-white/80 border-slate-200 text-slate-900 shadow-md' : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
            }`}>
              <div className="flex items-center gap-2 border-b border-slate-800/20 pb-3">
                <HeartHandshake className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold">Resumen de Propuesta</h3>
              </div>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Nuestra propuesta está diseñada bajo tres pilares fundamentales que integran soporte local, procura internacional y logística de alta confiabilidad:
              </p>

              <div className="space-y-2 text-xs">
                {[
                  { title: 'Logística de Servicios', desc: 'Personal local altamente calificado para inspecciones críticas.' },
                  { title: 'Cadena de Suministro', desc: 'Conexión logística con los principales almacenes mundiales.' },
                  { title: 'Equipos de Taller', desc: 'Overhaul electromecánico avanzado y suministro homologado.' }
                ].map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-xl border ${
                    isLight ? 'bg-slate-50 border-slate-150' : 'bg-slate-950/40 border-slate-800'
                  }`}>
                    <div className="font-bold text-amber-500">{item.title}</div>
                    <div className={`text-[10px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{item.desc}</div>
                  </div>
                ))}
              </div>

              <div className={`p-4 rounded-xl border border-dashed flex flex-col items-center justify-center text-center ${
                isLight ? 'bg-slate-100/50 border-slate-300' : 'bg-slate-950/20 border-slate-800/80'
              }`}>
                <Award className="w-6 h-6 text-amber-500 mb-1" />
                <span className="text-[10px] font-bold block">Garantía de Calidad Certificada</span>
                <span className="text-[9px] text-slate-500 font-mono mt-0.5">Normas EN 12929 / ISO 4309</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
