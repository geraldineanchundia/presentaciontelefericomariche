import { useTheme } from '../context/ThemeContext';

interface GeneralTradeLogoProps {
  variant?: 'original' | 'white' | 'adaptive' | 'badge' | 'symbol-only';
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  showText?: boolean;
}

export function GeneralTradeLogo({
  variant = 'adaptive',
  className = '',
  size = 'md',
  showText = true
}: GeneralTradeLogoProps) {
  const { isLight } = useTheme();

  // Resolve colors based on variant & theme
  let navyColor = '#0A194F';
  let slateColor = '#8A96AC';
  let isBadge = variant === 'badge';

  if (variant === 'white' || (variant === 'adaptive' && !isLight && !isBadge)) {
    navyColor = '#FFFFFF';
    slateColor = '#94A3B8';
  } else if (variant === 'original' || (variant === 'adaptive' && isLight) || isBadge) {
    navyColor = '#0A194F';
    slateColor = '#8A96AC';
  }

  // Size mapping
  const sizeClasses: Record<string, string> = {
    xs: showText ? 'h-6' : 'h-6 w-6',
    sm: showText ? 'h-7' : 'h-7 w-7',
    md: showText ? 'h-9' : 'h-9 w-9',
    lg: showText ? 'h-12' : 'h-12 w-12',
    xl: showText ? 'h-16' : 'h-16 w-16',
    custom: ''
  };

  const currentSizeClass = sizeClasses[size] || sizeClasses.md;

  const logoSvg = (
    <svg 
      viewBox={showText ? "0 0 310 92" : "158 2 144 88"} 
      className={`${currentSizeClass} ${className} w-auto select-none transition-colors duration-200`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="General Trade Logo"
    >
      {showText && (
        <g id="gt-text">
          {/* "General" */}
          <text 
            x="4" 
            y="40" 
            fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif" 
            fontSize="43" 
            fontWeight="500" 
            letterSpacing="-0.5" 
            fill={navyColor}
          >
            General
          </text>
          
          {/* "Trade" */}
          <text 
            x="44" 
            y="78" 
            fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif" 
            fontSize="41" 
            fontWeight="300" 
            letterSpacing="-0.5" 
            fill={slateColor}
          >
            Trade
          </text>
        </g>
      )}

      {/* Emblem: Orbit Swoosh + Dual-tone Faceted Arrow */}
      <g id="gt-emblem">
        {/* Orbit Swoosh Path */}
        <path 
          d="M 196 10
             C 174 13, 160 26, 160 46
             C 160 66, 178 86, 218 90
             C 252 93, 278 84, 288 72
             C 287 73, 276 80, 248 83
             C 208 87, 168 74, 166 46
             C 164 28, 178 16, 198 10 Z" 
          fill={navyColor}
        />

        {/* Dual-tone Directional Arrow */}
        {/* Top/Right Facet (Navy/White) */}
        <polygon 
          points="296,18 248,42 242,52" 
          fill={navyColor} 
        />
        
        {/* Bottom/Left Facet (Slate Blue) */}
        <polygon 
          points="296,18 242,52 225,66" 
          fill={slateColor} 
        />
      </g>
    </svg>
  );

  if (isBadge) {
    return (
      <div className={`inline-flex items-center px-3 py-1.5 rounded-xl bg-white shadow-md border border-slate-200/90 backdrop-blur-md ${className}`}>
        {logoSvg}
      </div>
    );
  }

  return logoSvg;
}
