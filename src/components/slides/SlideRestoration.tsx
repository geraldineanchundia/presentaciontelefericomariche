import { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Coins, 
  Leaf, 
  Bus, 
  Cable, 
  TrendingUp, 
  ShieldCheck, 
  Shield,
  Zap,
  Flame,
  ArrowRight,
  GraduationCap,
  ShoppingBag,
  Users,
  Accessibility,
  Sparkles,
  MapPin,
  Mountain,
  Train
} from 'lucide-react';
import { playClickSound } from '../../utils/audio';
import { useTheme } from '../../context/ThemeContext';
import maricheCablecar from '../../assets/images/mariche_cablecar_1788659996661.jpg';
import cityBusTraffic from '../../assets/images/city_bus_traffic_1788940376030.jpg';
import maricheCablecarRedCabins from '../../assets/images/mariche_cablecar_red_cabins_1788715437510.jpg';

export function SlideRestoration() {
  const { isLight } = useTheme();
  const [selectedPillar, setSelectedPillar] = useState<number>(0);

  const pillars = [
    {
      id: 0,
      title: 'Acceso a Salud, Educación y Empleo',
      icon: GraduationCap,
      color: 'amber',
      metric: '+480 hrs/año',
      metricLabel: 'Tiempo ganado para estudio y familia',
      description: 'Permite a los habitantes de La Dolorita y Filas de Mariche a conectarse en solo 17.5 minutos con las centros de trabajo e instituciones educativas de Caracas, reduciendo la deserción estudiantil y facilitando el acceso a centros hospitalarios de tercer nivel como el Hospital Domingo Luciani.',
      highlights: [
        'Conexión directa con la estación terminal Palo Verde de la Línea 1 del Metro',
        'Facilidad para traslados médicos de emergencia',
        'Acceso ampliado a la oferta laboral metropolitana para los habitantes de Mariche',
      ],
    },
    {
      id: 1,
      title: 'Reactivación Económica & Comercio Local',
      icon: ShoppingBag,
      color: 'cyan',
      metric: '70% Ahorro',
      metricLabel: 'En presupuesto familiar de movilidad',
      description: 'La reducción drástica en el gasto del pasaje permite reorientar los ingresos del hogar hacia alimentación, salud y bienestar. Además, las estaciones terminales funcionan como polos cívicos y centros dinamizadores de pequeños comercios, cooperativas y servicios comunitarios.',
      highlights: [
        'Disminución del gasto de transporte del 35% al 10% del salario mensual',
        'Atracción de micro-emprendimientos en los andenes y áreas adyacentes a las estaciones',
        'Valorización inmobiliaria de las viviendas en los sectores populares consolidados',
      ],
    },
    {
      id: 2,
      title: 'Atención & Accesibilidad',
      icon: Accessibility,
      color: 'emerald',
      metric: '100% Accesible',
      metricLabel: 'Para personas con movilidad reducida',
      description: 'A diferencia de los rústicos y autobuses tradicionales donde subir con silla de ruedas, coches de bebé o bastones es peligroso y sumamente dificultoso, las cabinas del teleférico cuentan con piso nivelado a ras de andén, velocidad lenta de embarque sincronizada y rampas en estaciones. El sistema es impulsado por energía eléctrica centralizada con variadores de frecuencia, al reemplazar disminuir viajes diarios en vehículos de combustión, mitiga la contaminación y  los gases de efecto invernadero.',
      highlights: [
        'Embarque a paso peatonal continuo (0.3 m/s) en andenes protegidos de lluvia',
        'Capacidad para transportar personas en sillas de ruedas y cargas familiares',
        'Iluminación nocturna, señalética táctil y operadores capacitados para asistencia',
        'Menor desgaste de la infraestructura vial de Petare Filas de Mariche - La Dolorita',
      ],
    },
    {
      id: 3,
      title: 'Sostenibilidad Operativa con General Trade',
      icon: TrendingUp,
      color: 'purple',
      metric: '+25 Años',
      metricLabel: 'Vida útil extendida de los activos',
      description: 'La sostenibilidad en la rehabilitación del sistema, es un modelo de gestión integral de un mantenimiento correctivo, basado en la contratación de una inspección para el diagnostico y procura garantizada de repuestos con servicio de calidad y certificado.',
      highlights: [
        'Inspecciones y diagnostico del Sistema',
        'Planificación de la restauración por etapa, con el presupuesto de Costo y tiempo de ejecución.',
        'Formación y transferencia tecnológica continua a los técnicos locales de operación',
        'Trazabilidad digital y certificación periódica de seguridad',
      ],
    },
  ];

  const currentPillar = pillars[selectedPillar];
  const IconComp = currentPillar.icon;

  // Calculator state
  const [dailyUsers, setDailyUsers] = useState<number>(35000);
  const [avgTicketPriceUsd, setAvgTicketPriceUsd] = useState<number>(1.5); // Private bus ticket cost

  // Calculations
  const hoursSavedPerPersonPerYear = (2.04 * 2 * 260); // 260 working days = ~1,060 hours/year!
  const totalAnnualHoursSavedMillions = ((dailyUsers * 2.04 * 2 * 260) / 1000000).toFixed(1);
  const annualCo2TonsSaved = Math.round((dailyUsers * 2.16 * 260) / 1000);
  const annualSavingsMillionsUsd = ((dailyUsers * (avgTicketPriceUsd * 2 * 0.70) * 260) / 1000000).toFixed(2);

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className={`p-5 rounded-2xl border backdrop-blur-xl transition-colors ${
        isLight ? 'bg-white/80 border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-8 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-500 border border-amber-500/30">
                PLAN DE MOVILIDAD
              </span>
              <div className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Eje Conector: <strong className="text-amber-500">Palo Verde ⇋ Filas de Mariche</strong>
              </div>
            </div>
            <h2 className={`text-xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Rehabilitación Operativa: Teleférico de Mariche
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Más de 125.000 ciudadanos habitantes de La Dolorita y Filas de Mariche cuentan con la única vía terrestre conocida como carretera Petare-Fila de Mariche el cual es angosta y de curvas pronunciadas constante congestión de trafico vehicular que devora hasta 3 horas por trayecto.
            </p>
          </div>
          <div className="md:col-span-4 h-32 w-full rounded-xl overflow-hidden border border-slate-200/20 shadow-inner relative">
            <img 
              src={maricheCablecar} 
              alt="Metrocable Mariche" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2">
              <span className="text-[10px] text-white font-mono font-bold uppercase tracking-wider">Metrocable Mariche</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Impact & Quality of Life Box */}
      <div className={`p-5 rounded-2xl border backdrop-blur-xl transition-colors ${
        isLight 
          ? 'bg-blue-50/60 border-blue-200/90 text-slate-900 shadow-sm' 
          : 'bg-slate-900/60 border-blue-900/40 text-slate-100'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-500">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base">Impacto en Movilidad Urbana y Calidad de Vida</h3>
        </div>
        <p className={`text-sm font-semibold mb-2 ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>
          Carretera Petare-Filas de Mariche - La Dolorita vs. Teleférico Palo Verde - Mariche
        </p>
        <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
          Análisis técnico y social entre el colapso vial terrestre y la eficiencia del transporte por cable. 
          Vea cómo la restauración del teleférico transforma vidas en minutos.
        </p>
      </div>

       {/* Comparative Cards: Road Crisis vs Teleferico Restored */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Scenario 1: Mountain Road (Crisis) */}
        <div className={`rounded-2xl border p-5 space-y-4 relative overflow-hidden backdrop-blur-xl transition-colors ${
          isLight 
            ? 'bg-rose-50/60 border-rose-200/90 text-slate-900 shadow-sm' 
            : 'bg-slate-900/60 border-rose-900/50 text-slate-100'
        }`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="h-32 w-full rounded-xl overflow-hidden border border-rose-500/10 relative">
            <img 
              src={cityBusTraffic} 
              alt="Colapso vial autobús en cola" 
              className="w-full h-full object-cover grayscale opacity-85"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-rose-950/20 to-transparent flex items-end p-2.5">
              <span className="text-[10px] text-rose-300 font-mono font-bold uppercase tracking-wider">Colapso Vial Diario (2 a 3 Horas)</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-rose-500/20 text-rose-500">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-rose-500 uppercase tracking-wider">Vía Terrestre Actual</span>
                <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Petare Filas de Mariche - La Dolorita</h3>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30">
              CRÍTICO / COLAPSO
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isLight ? 'bg-white/80 border-rose-100' : 'bg-slate-950/40 border-slate-800'
            }`}>
              <span className={`flex items-center gap-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <Clock className="w-4 h-4 text-rose-500" />
                Tiempo de traslado promedio:
              </span>
              <span className="font-mono font-bold text-rose-500 text-sm">120 – 160 min</span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isLight ? 'bg-white/80 border-rose-100' : 'bg-slate-950/40 border-slate-800'
            }`}>
              <span className={`flex items-center gap-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <Flame className="w-4 h-4 text-rose-500" />
                Vulnerabilidad geotécnica:
              </span>
              <span className={`font-mono font-bold ${isLight ? 'text-rose-700' : 'text-rose-300'}`}>Alta (Fallas de borde y derrumbes)</span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isLight ? 'bg-white/80 border-rose-100' : 'bg-slate-950/40 border-slate-800'
            }`}>
              <span className={`flex items-center gap-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <Coins className="w-4 h-4 text-rose-500" />
                Gasto familiar en pasajes:
              </span>
              <span className={`font-mono font-bold ${isLight ? 'text-rose-700' : 'text-rose-300'}`}>Hasta 35% del ingreso mensual</span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isLight ? 'bg-white/80 border-rose-100' : 'bg-slate-950/40 border-slate-800'
            }`}>
              <span className={`flex items-center gap-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <Leaf className="w-4 h-4 text-rose-500" />
                Emisiones vehiculares:
              </span>
              <span className={`font-mono font-bold ${isLight ? 'text-rose-700' : 'text-rose-300'}`}>Combustión fósil continua en colas</span>
            </div>
          </div>

          <div className={`p-3 rounded-xl border text-xs ${
            isLight ? 'bg-rose-100/60 border-rose-200 text-rose-900' : 'bg-rose-950/30 border-rose-900/50 text-rose-200'
          }`}>
            <strong>Impacto cotidiano:</strong> Desgaste físico, estrés, retrasos laborales escolares y aislamiento ante emergencias médicas nocturnas.
          </div>
        </div>

        {/* Scenario 2: Cable Car Restored */}
        <div className={`rounded-2xl border p-5 space-y-4 relative overflow-hidden backdrop-blur-xl transition-colors ${
          isLight 
            ? 'bg-emerald-50/60 border-emerald-200/90 text-slate-900 shadow-sm' 
            : 'bg-slate-900/60 border-emerald-900/50 text-slate-100'
        }`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="h-32 w-full rounded-xl overflow-hidden border border-emerald-500/10 relative">
            <img 
              src={maricheCablecarRedCabins} 
              alt="Sistema Teleférico Sostenible" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent flex items-end p-2.5">
              <span className="text-[10px] text-emerald-300 font-mono font-bold uppercase tracking-wider">Transporte por Cable (17.5 Min)</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-500">
                <Cable className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-wider">Sistema Rehabilitado</span>
                <h3 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Teleférico Palo Verde – Mariche</h3>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
              ÓPTIMO / SOSTENIBLE
            </span>
          </div>


          <div className="space-y-2.5 text-xs">
            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isLight ? 'bg-white/80 border-emerald-100' : 'bg-slate-950/40 border-slate-800'
            }`}>
              <span className={`flex items-center gap-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <Clock className="w-4 h-4 text-emerald-500" />
                Tiempo de traslado garantizado:
              </span>
              <span className="font-mono font-bold text-emerald-500 text-sm">17.5 min (Punto a punto)</span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isLight ? 'bg-white/80 border-emerald-100' : 'bg-slate-950/40 border-slate-800'
            }`}>
              <span className={`flex items-center gap-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Seguridad & Independencia vial:
              </span>
              <span className={`font-mono font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-300'}`}>Inmune a derrumbes e inundaciones</span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isLight ? 'bg-white/80 border-emerald-100' : 'bg-slate-950/40 border-slate-800'
            }`}>
              <span className={`flex items-center gap-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <Coins className="w-4 h-4 text-emerald-500" />
                Tarifa pública integrada:
              </span>
              <span className={`font-mono font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-300'}`}>Ahorro de hasta 70% en pasaje</span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isLight ? 'bg-white/80 border-emerald-100' : 'bg-slate-950/40 border-slate-800'
            }`}>
              <span className={`flex items-center gap-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <Train className="w-4 h-4 text-emerald-500" />
                Energía limpia:
              </span>
              <span className={`font-mono font-bold ${isLight ? 'text-emerald-700' : 'text-emerald-300'}`}>100% Eléctrico (Cero emisiones directas)</span>
            </div>
          </div>

          <div className={`p-3 rounded-xl border text-xs ${
            isLight ? 'bg-emerald-100/60 border-emerald-200 text-emerald-900' : 'bg-emerald-950/30 border-emerald-900/50 text-emerald-200'
          }`}>
            <strong>Impacto cotidiano:</strong> Recuperación de más de 3.5 horas libres por día para familia, educación, descanso y emprendimiento comunitario.
          </div>
        </div>

      </div>

      {/* Interactive Socioeconomic Impact Calculator */}
      <div className={`rounded-2xl border p-5 lg:p-6 space-y-5 backdrop-blur-xl transition-colors ${
        isLight ? 'bg-white/85 border-slate-200 shadow-md text-slate-900' : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
      }`}>
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
                Simulador Dinámico de Beneficio Comunitario
              </span>
            </div>
            <h3 className={`text-base sm:text-lg font-bold mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Calculadora de Retorno Social por Restauración Operativa
            </h3>
          </div>
          <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Modelado a 260 días laborables/año</span>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className={`p-3.5 rounded-xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800'
          }`}>
            <div className={`flex justify-between text-xs font-mono mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              <span>Volumen de pasajeros diarios proyectados:</span>
              <span className="font-bold text-amber-500 font-mono">{dailyUsers.toLocaleString()} usuarios</span>
            </div>
            <input
              type="range"
              min="5000"
              max="65000"
              step="5000"
              value={dailyUsers}
              onChange={(e) => {
                setDailyUsers(parseInt(e.target.value));
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className={`flex justify-between text-[10px] font-mono mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>5,000 (Mínimo)</span>
              <span>35,000 (Promedio)</span>
              <span>65,000 (Diseño pleno)</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800'
          }`}>
            <div className={`flex justify-between text-xs font-mono mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              <span>Tarifa de autobús publico actual (USD):</span>
              <span className="font-bold text-cyan-500 font-mono">${avgTicketPriceUsd.toFixed(2)} / viaje</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.25"
              value={avgTicketPriceUsd}
              onChange={(e) => {
                setAvgTicketPriceUsd(parseFloat(e.target.value));
              }}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className={`flex justify-between text-[10px] font-mono mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>$0.50</span>
              <span>$1.50</span>
              <span>$3.00</span>
            </div>
          </div>

        </div>

        {/* Calculated Results Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          
          <div className={`p-4 rounded-xl border text-center ${
            isLight ? 'bg-amber-50/50 border-amber-200/70' : 'bg-slate-950/40 border-slate-800'
          }`}>
            <div className={`text-xs font-mono mb-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>HORAS HOMBRE DEVUELTAS AL AÑO</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-500 font-mono">
              +{totalAnnualHoursSavedMillions}M
            </div>
          </div>

          <div className={`p-4 rounded-xl border text-center ${
            isLight ? 'bg-emerald-50/50 border-emerald-200/70' : 'bg-slate-950/40 border-slate-800'
          }`}>
            <div className={`text-xs font-mono mb-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>REDUCCIÓN DE CO2 ANUAL</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-500 font-mono">
              {annualCo2TonsSaved.toLocaleString()} t
            </div>
            <div className={`text-[11px] mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Sustitución de miles de viajes diarios en camiones y autobuses diésel obsoletos
            </div>
          </div>

          <div className={`p-4 rounded-xl border text-center ${
            isLight ? 'bg-cyan-50/50 border-cyan-200/70' : 'bg-slate-950/40 border-slate-800'
          }`}>
            <div className={`text-xs font-mono mb-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>AHORRO ECONÓMICO COLECTIVO</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-500 font-mono">
              ${annualSavingsMillionsUsd}M
            </div>
            <div className={`text-[11px] mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Dinero reinyectado a la economía local
            </div>
          </div>

        </div>

        {/* General Trade Guarantee banner */}
        <div className={`p-3 rounded-xl border flex flex-wrap items-center justify-between gap-2 text-xs ${
          isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-950/40 border-slate-800 text-slate-300'
        }`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>La restauración planificada por <strong className={isLight ? 'text-slate-900' : 'text-white'}>General Trade</strong> asegura disponibilidad continua.</span>
          </div>
          <span className="font-mono text-amber-500 font-bold">Retorno de Inversión Social Inmediato</span>
        </div>

      </div>

      {/* Social Impact Unified Section */}
      <div className="space-y-4 pt-6 border-t border-slate-700/30">
        {/* Header */}
        <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 backdrop-blur-xl transition-colors ${
          isLight ? 'bg-white/80 border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
                IMPACTO SOCIAL & SOSTENIBILIDAD
              </span>
              <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>125.000 Beneficiarios Directos</span>
            </div>
            <h2 className={`text-lg font-bold mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Transformación Socioeconómica y Garantía de Sostenibilidad a Largo Plazo
            </h2>
          </div>
          <div className={`text-xs font-mono ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            ODS ONU: <strong className="text-emerald-500">Ciudades Sostenibles (ODS 11)</strong>
          </div>
        </div>

        {/* Pillars Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {pillars.map((pillar) => {
            const isSelected = selectedPillar === pillar.id;
            const PIcon = pillar.icon;
            return (
              <button
                key={pillar.id}
                onClick={() => {
                  playClickSound();
                  setSelectedPillar(pillar.id);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 backdrop-blur-md ${
                  isSelected
                    ? isLight
                      ? 'bg-amber-50/90 border-amber-500 shadow-md ring-1 ring-amber-500/40 text-slate-900'
                      : 'bg-slate-800/80 border-amber-500/70 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40 text-slate-100'
                    : isLight
                    ? 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300 text-slate-800'
                    : 'bg-slate-900/40 border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-1.5 rounded-lg ${
                    isSelected 
                      ? 'bg-amber-500/20 text-amber-500' 
                      : isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <PIcon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>0{pillar.id + 1}</span>
                </div>
                <div>
                  <div className={`text-xs font-bold line-clamp-2 ${
                    isSelected ? (isLight ? 'text-slate-950' : 'text-white') : (isLight ? 'text-slate-700' : 'text-slate-300')
                  }`}>
                    {pillar.title}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-amber-500 mt-1">
                    {pillar.metric}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Detailed Showcase */}
        <div className={`p-6 rounded-2xl border grid grid-cols-1 lg:grid-cols-12 gap-6 items-center backdrop-blur-xl transition-colors ${
          isLight ? 'bg-white/85 border-slate-200 shadow-md text-slate-900' : 'bg-slate-900/50 border-slate-700/50 text-slate-100'
        }`}>
          
          {/* Left info */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500/20 text-amber-500 border border-amber-500/30">
                EJE ESTRATÉGICO 0{currentPillar.id + 1}
              </span>
              <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Impacto Positivo Medible</span>
            </div>

            <h3 className={`text-2xl font-extrabold flex items-center gap-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <IconComp className="w-7 h-7 text-amber-500" />
              <span>{currentPillar.title}</span>
            </h3>

            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              {currentPillar.description}
            </p>

            {/* Highlights checklist */}
            <div className="space-y-2.5 pt-2">
              <div className={`text-xs font-mono uppercase tracking-wider ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Beneficios Clave Implementados:</div>
              {currentPillar.highlights?.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className={isLight ? 'text-slate-700' : 'text-slate-200'}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right metric card */}
          <div className={`lg:col-span-4 p-6 rounded-2xl border text-center space-y-3 ${
            isLight 
              ? 'bg-gradient-to-br from-amber-50/80 via-white to-amber-50/30 border-amber-200/90 shadow-sm' 
              : 'bg-gradient-to-br from-slate-950/60 to-slate-900/60 border-amber-500/30'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-500 mx-auto flex items-center justify-center">
              <IconComp className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-amber-500 font-mono">
              {currentPillar.metric}
            </div>
            <div className={`text-xs font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              {currentPillar.metricLabel}
            </div>
            <div className={`pt-3 border-t text-[11px] font-mono ${
              isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800 text-slate-400'
            }`}>
              estudio de movilidad de la Población.
            </div>
          </div>

        </div>

        {/* Community Quotation & Public-Private Integration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className={`p-4 rounded-xl border flex items-start gap-3 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800'
          }`}>
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-500 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>Voz de la Comunidad de Mariche</h4>
              <p className={`text-xs mt-1 italic leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                "El teleférico no es un lujo, es la diferencia entre llegar a tiempo al trabajo o perder el empleo, entre que nuestros hijos puedan estudiar una carrera en la universidad o quedarse aislados en la montaña."
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-xl border flex items-start gap-3 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/40 border-slate-800'
          }`}>
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-500 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${isLight ? 'text-slate-900' : 'text-white'}`}>Gestión de General Trade</h4>
              <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Ofrecemos esquemas técnico que aseguran que cada inversión en restauración se traduzca eficiencia operatividad de calidad.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
