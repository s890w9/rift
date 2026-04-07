import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';

export default function NotFound() {
  const [, setLocation] = useLocation();
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleGoHome = () => {
    setLocation('/');
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = (e.clientX - 20) + 'px';
        cursorRef.current.style.top = (e.clientY - 20) + 'px';
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('contextmenu', handleContextMenu);

    const starField = containerRef.current?.parentElement;
    if (starField) {
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        const duration = Math.random() * 3 + 2;
        star.style.animation = `twinkle ${duration}s infinite ease-in-out`;
        star.style.animationDelay = Math.random() * 5 + 's';
        starField.appendChild(star);
      }
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes wobble {
          0%, 100% { transform: rotate(-5deg) scale(1); }
          50% { transform: rotate(10deg) scale(1.05); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-10px); opacity: 0.5; }
        }
        
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideOut {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(20px); opacity: 0; }
        }
        
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.5;
        }
        
        .cursor-spin {
          animation: spin 2s linear infinite;
        }

        .background-doodle {
          position: absolute;
          opacity: 0.25;
          pointer-events: none;
        }

        .doodle-float {
          animation: float 4s ease-in-out infinite;
        }

        .wobbly-button {
          position: relative;
          display: inline-block;
          padding: 8px 16px;
          font-size: 1rem;
          color: white;
          background: transparent;
          border: 2px solid white;
          cursor: none;
          transition: all 0.3s ease;
          transform: rotate(calc(var(--rotation) * 1deg));
          clip-path: polygon(
            0% 0%,
            calc(100% - 2px) 1%,
            100% calc(100% - 3px),
            calc(100% - 1%) 100%,
            2% calc(100% - 1%),
            1% 3%
          );
        }

        .wobbly-button:hover {
          background: white;
          color: black;
          transform: rotate(calc(var(--rotation) * 1deg)) translateY(-3px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
        }

        .wobbly-button:active {
          transform: rotate(calc(var(--rotation) * 1deg)) translateY(-1px);
        }
        
        .toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          color: black;
          padding: 16px 28px;
          border-radius: 4px;
          border: 2px solid white;
          font-family: inherit;
          font-size: 1.2rem;
          font-weight: 600;
          z-index: 999;
          animation: slideIn 0.3s ease-out;
          pointer-events: none;
        }
        
        .toast.exit {
          animation: slideOut 0.3s ease-out;
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 100 100" className="background-doodle doodle-float" style={{ top: '8%', left: '3%', width: '70px', height: '70px' }}>
          <path d="M10,20 L28,35 L15,42 L32,38 L22,50 L35,45 L25,55" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18,60 L22,68 L20,72 L25,70" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <svg viewBox="0 0 100 100" className="background-doodle doodle-float" style={{ top: '5%', right: '6%', width: '60px', height: '60px', animationDelay: '1.5s' }}>
          <path d="M35,18 Q55,12 62,32 Q58,72 35,75 Q40,55 42,35 Q40,22 35,18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M38,25 L42,28" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40,50 L45,48" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <svg viewBox="0 0 100 100" className="background-doodle" style={{ top: '25%', left: '8%', width: '50px', height: '50px' }}>
          <path d="M12,12 L32,38 L48,58" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M52,15 L32,38 L12,58" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M20,25 L28,32" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <svg viewBox="0 0 100 100" className="background-doodle" style={{ top: '18%', left: '48%', transform: 'translateX(-50%)', width: '45px', height: '45px' }}>
          <path d="M50,15 Q75,20 78,50 Q75,75 48,78 Q22,75 20,48 Q22,18 50,15" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M35,45 L65,45" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" />
          <path d="M45,35 L45,60" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" />
        </svg>

        <svg viewBox="0 0 100 100" className="background-doodle doodle-float" style={{ top: '50%', left: '5%', width: '55px', height: '55px', animationDelay: '2.5s' }}>
          <path d="M35,10 L28,25 L42,28 L32,38 L45,35 L38,48 L50,42 L40,55" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <svg viewBox="0 0 100 100" className="background-doodle doodle-float" style={{ top: '52%', right: '8%', width: '55px', height: '55px', animationDelay: '1.8s' }}>
          <path d="M12,15 Q28,28 18,65" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M15,30 L22,35" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18,50 L25,48" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <svg viewBox="0 0 100 100" className="background-doodle" style={{ bottom: '12%', left: '6%', width: '55px', height: '55px' }}>
          <circle cx="10" cy="12" r="2" fill="white" />
          <circle cx="42" cy="18" r="1.5" fill="white" />
          <circle cx="25" cy="45" r="2.2" fill="white" />
          <circle cx="5" cy="68" r="1.8" fill="white" />
          <circle cx="48" cy="75" r="1.3" fill="white" />
          <circle cx="32" cy="62" r="1.6" fill="white" />
          <path d="M15,35 L18,38" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <svg viewBox="0 0 100 100" className="background-doodle doodle-float" style={{ bottom: '8%', right: '5%', width: '65px', height: '65px', animationDelay: '0.8s' }}>
          <path d="M58,22 Q82,28 85,58 Q78,85 52,88 Q62,68 62,48 Q60,32 58,22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M65,35 L72,38" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M68,65 L75,62" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        <svg viewBox="0 0 100 100" className="background-doodle" style={{ bottom: '18%', left: '50%', transform: 'translateX(-50%)', width: '50px', height: '50px' }}>
          <path d="M12,28 L22,18 L32,26 L28,38 L38,32 L35,45 L42,38 L40,50" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div
        ref={cursorRef}
        className="fixed w-10 h-10 pointer-events-none z-50 cursor-spin"
      >
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <g stroke="white" strokeWidth="2" fill="none">
            <line x1="5" y1="5" x2="15" y2="5" />
            <line x1="5" y1="5" x2="5" y2="15" />
            <line x1="35" y1="5" x2="25" y2="5" />
            <line x1="35" y1="5" x2="35" y2="15" />
            <line x1="5" y1="35" x2="15" y2="35" />
            <line x1="5" y1="35" x2="5" y2="25" />
            <line x1="35" y1="35" x2="25" y2="35" />
            <line x1="35" y1="35" x2="35" y2="25" />
            <circle cx="20" cy="20" r="2" fill="white" />
          </g>
        </svg>
      </div>

      <div ref={containerRef} className="text-center max-w-2xl px-4 z-10 relative">
        <div className="mb-8 flex justify-center" style={{ animation: 'wobble 4s infinite ease-in-out' }}>
          <svg viewBox="0 0 100 100" className="w-32 h-32" xmlns="http://www.w3.org/2000/svg">
            <text x="50" y="70" fontSize="80" fontWeight="bold" textAnchor="middle" fill="none" stroke="white" strokeWidth="2">
              404
            </text>
          </svg>
        </div>

        <h1 className="text-6xl font-bold text-white mb-2">oops</h1>
        <p className="text-2xl text-white opacity-80 mb-8">page not found or something</p>

        <div className="relative h-32 mb-12 flex items-end justify-center">
          <svg viewBox="0 0 60 100" className="w-14 h-20 absolute left-12 bottom-0" xmlns="http://www.w3.org/2000/svg">
            <path d="M32,12 Q38,8 42,10 Q44,14 42,18 Q38,22 32,20 Q28,18 30,12" fill="none" stroke="white" strokeWidth="2.5" />
            <line x1="33" y1="20" x2="31" y2="48" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M33,28 Q20,32 12,28" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M31,26 Q45,30 50,22" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M31,48 Q25,58 20,70" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M32,48 Q38,62 44,75" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="28" cy="14" r="1" fill="white" />
            <circle cx="36" cy="15" r="1.5" fill="white" />
            <path d="M28 18 Q32 20 37 18" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          <svg viewBox="0 0 80 80" className="w-16 h-16 absolute right-16 bottom-2 transform -rotate-12" xmlns="http://www.w3.org/2000/svg">
            <path d="M42,8 Q68,10 72,35 Q75,62 45,72 Q18,70 12,40 Q8,15 42,8" fill="none" stroke="white" strokeWidth="3.5" />
            <circle cx="30" cy="35" r="3" fill="white" />
            <circle cx="58" cy="32" r="4.5" fill="white" />
            <path d="M22 50 Q40 68 62 48" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        <div className="flex justify-center gap-6 flex-wrap">
          <button
            className="wobbly-button"
            style={{ '--rotation': '-2' } as React.CSSProperties}
            onClick={handleGoHome}
          >
            go home
          </button>
        </div>
      </div>

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}
    </div>
  );
}
