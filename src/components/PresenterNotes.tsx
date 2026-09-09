import { BookOpen, X, CheckCircle2, AlertCircle, Quote } from 'lucide-react';
import { SlideInfo } from '../types';
import { useTheme } from '../context/ThemeContext';

interface PresenterNotesProps {
  slide: SlideInfo;
  onClose: () => void;
}

export function PresenterNotes({ slide, onClose }: PresenterNotesProps) {
  const { isLight } = useTheme();
  const getNotesForSlide = (id: string) => {
    switch (id) {
      case 'hero':
        return {
          objective: 'Establecer la magnitud estratégica del sistema Palo Verde - Mariche y posicionar a General Trade como aliado técnico indispensable.',
          cues: [
            'Enfatizar que es uno de los teleféricos monocables urbanos más largos de Sudamérica (4.79 km).',
            'Contrastar el tiempo: 17.5 minutos en cable frente a más de 2.5 horas por la colapsada vía Petare Filas de Mariche - La Dolorita.',
            'Destacar la capacidad instalada para movilizar 3,000 PPHPD y beneficiar a 125,000 personas.',
          ],
          qna: '¿Por qué General Trade? Porque integra diagnóstico NDT, overhaul electromecánico y procura directa sin intermediarios.',
        };
      case 'map3d':
        return {
          objective: 'Demostrar el conocimiento topográfico riguroso y la distribución de esfuerzos en las 32 torres de la línea.',
          cues: [
            'Mostrar la interacción de velocidad (slider) y la simulación del freno de emergencia E-Stop para evidenciar la seguridad intrínseca.',
            'Explicar el efecto del viento en vanos críticos (como P08-P09 de 620m) y la lógica de reducción preventiva a 2.5 m/s.',
            'Hacer clic en P04 y P08 para mostrar la transición de balancines de apoyo a mixtos y de compresión.',
          ],
          qna: 'Las torres de celosía absorben cargas laterales de viento hasta 120 km/h sin deformación permanente.',
        };
      case 'components':
        return {
          objective: 'Describir los 6 subsistemas críticos y los estándares normativos de inspección y desgaste.',
          cues: [
            'Cable portador-tractor: Norma EN 12927. Explicar el empalme largo de 62 metros y la necesidad de inspección electromagnética MRT.',
            'Pinza de embrague y desembrague: Es el elemento con mayor exigencia cíclica; requiere verificación por partículas magnéticas (MT) y ultrasonido.',
            'Estación motriz: Mencionar el reductor helicoidal de 950 kW y la alineación láser requerida para evitar fallas en rodamientos.',
          ],
          qna: 'General Trade dispone de instrumental calibrado para ensayos no destructivos sin desmontar la infraestructura.',
        };
      case 'restoration':
        return {
          objective: 'Evidenciar el colapso de la movilidad vial y sustentar el retorno socioeconómico inmediato de la inversión en restauración.',
          cues: [
            'Utilizar la calculadora interactiva para demostrar que se devuelven más de 30 millones de horas-hombre al año a la población.',
            'Subrayar la eliminación de riesgos geotécnicos por fallas de borde en la vía Petare Filas de Mariche - La Dolorita.',
            'Ahorro del 70% en pasajes familiares: dinero que se traduce en mayor capacidad de consumo y alimentación en los hogares.',
          ],
          qna: 'El costo por kilómetro rehabilitado en cable es una fracción del costo de ensanchar o estabilizar la carretera de montaña.',
        };
      case 'social-impact':
        return {
          objective: 'Conectar la técnica con las vidas humanas: inclusión, salud, educación y ODS 11 de Naciones Unidas.',
          cues: [
            'Explicar la accesibilidad total para personas con movilidad reducida (PMR) y coches de niños a ras de andén.',
            'Acceso a hospitales clave (Domingo Luciani) y universidades en Caracas.',
            'Sostenibilidad ambiental: cero emisiones directas y mitigación de huella de carbono.',
          ],
          qna: 'El teleférico actúa como una sutura urbana que integra a los sectores históricamente postergados de Mariche.',
        };
      case 'gallery':
        return {
          objective: 'Validar la trayectoria, la escala constructiva original y la experiencia de campo.',
          cues: [
            'Navegar por las categorías (Construcción, Ingeniería, Operación, Comunidad).',
            'Abrir la imagen del cuarto de máquinas y la maniobra de inspección en altura para enfatizar el rigor técnico.',
          ],
          qna: 'El archivo fotográfico prueba que la infraestructura física es sólida; lo que requiere es mantenimiento y reemplazo de consumibles.',
        };
      case 'video-telemetry':
        return {
          objective: 'Generar una experiencia inmersiva del sistema en régimen continuo y el Sistema de Control de seguridad.',
          cues: [
            'Alternar entre las 4 cámaras (Cabina en Vía, Balancín de Rodillos, Cuarto de Máquinas y Terminal Mariche).',
            'Comentar los parámetros de telemetría: tensión de 285 kN, corriente de motor y estado SIL 3 del lazo de seguridad.',
          ],
          qna: 'El Sistema de Control detecta cualquier anomalía en menos de 250 ms deteniendo la polea motriz antes de un descarrilamiento.',
        };
      case 'general-trade':
        return {
          objective: 'Posicionar la oferta de valor corporativa de General Trade en los sectores público y privado.',
          cues: [
            'Detallar los 4 pilares: Inspecciones NDT, Mantenimiento Overhaul, Suministro Homologado y Gestión Integral de Activos.',
            'Explicar la norma ISO 55001 y el enfoque de Costo del Ciclo de Vida (LCC) para optimizar presupuestos fiscales.',
          ],
          qna: 'General Trade garantiza la trazabilidad con certificados 3.1 EN 10204 de fabricantes europeos líderes.',
        };
      default:
        return {
          objective: 'Presentación ejecutiva del sistema teleférico.',
          cues: ['Mantener el enfoque en seguridad, eficiencia y sostenibilidad.'],
          qna: 'General Trade cuenta con personal y tecnología para la gestión integral.',
        };
    }
  };

  const notes = getNotesForSlide(slide.id);

  return (
    <aside className={`fixed bottom-16 right-4 z-40 max-w-md w-full border rounded-2xl shadow-2xl backdrop-blur-xl p-4 animate-in slide-in-from-bottom-5 duration-200 transition-colors ${
      isLight
        ? 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-900/10'
        : 'bg-slate-900/85 border-slate-700/60 text-slate-100 shadow-2xl'
    }`}>
      <div className={`flex items-center justify-between pb-3 border-b ${
        isLight ? 'border-slate-200' : 'border-slate-800'
      }`}>
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-500">
          <BookOpen className="w-4 h-4" />
          <span>GUÍA DEL EXPOSITOR • DIAPOSITIVA {slide.number}</span>
        </div>
        <button
          onClick={onClose}
          className={`p-1 rounded-lg transition-colors cursor-pointer ${
            isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className={`py-3 space-y-3 max-h-72 overflow-y-auto text-xs ${
        isLight ? 'text-slate-700' : 'text-slate-300'
      }`}>
        <div>
          <div className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider mb-1">
            Objetivo Estratégico:
          </div>
          <p className={`leading-relaxed font-medium ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
            {notes.objective}
          </p>
        </div>

        <div>
          <div className="text-[10px] font-mono text-cyan-500 font-bold uppercase tracking-wider mb-1">
            Puntos Clave de Exposición (Talking Points):
          </div>
          <ul className="space-y-1.5">
            {notes.cues?.map((cue, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{cue}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`p-2.5 rounded-xl border ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'
        }`}>
          <div className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-wider mb-0.5">
            Respuesta a Objeción Frecuente:
          </div>
          <p className={`text-[11px] italic leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            "{notes.qna}"
          </p>
        </div>
      </div>
    </aside>
  );
}
