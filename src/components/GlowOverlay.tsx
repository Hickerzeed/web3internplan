import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface GlowOverlayProps {
  color: string;
}

export function GlowOverlay({ color }: GlowOverlayProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.getElementById('glow-portal-root'));
    
    const main = document.getElementById('main-scroll-container');
    if (!main) return;
    
    const handleScroll = () => {
      setScrollTop(main.scrollTop);
    };
    
    // Initial set
    handleScroll();
    
    main.addEventListener('scroll', handleScroll);
    return () => main.removeEventListener('scroll', handleScroll);
  }, []);

  if (!portalRoot) return null;

  return createPortal(
    <div 
      className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none transition-colors duration-1000 flex justify-center"
      style={{ transform: `translateY(-${scrollTop}px)` }}
    >
      {/* 这里的 max-w-[1400px] 需要和 Discover.tsx 中的宽度保持一致，这样光圈才能对齐内容 */}
      <div className="relative w-full max-w-[1300px] h-full">
        
        {/* --- 亮色模式光晕 (保持原样) --- */}
        <div className="absolute inset-0 dark:hidden">
          {/* Circle 1: Left */}
          <div 
            className="absolute rounded-full pointer-events-none transition-all duration-1000 ease-in-out mix-blend-screen opacity-60 blur-[15px]"
            style={{
              width: '750px',
              height: '750px',
              left: '40%',
              top: '-50px',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${color} 0%, ${color} 45%, transparent 75%)`,
            }}
          />
          {/* Circle 2: Right */}
          <div 
            className="absolute rounded-full pointer-events-none transition-all duration-1000 ease-in-out mix-blend-screen opacity-50 blur-[20px]"
            style={{
              width: '1000px',
              height: '1000px',
              left: '75%',
              top: '80px',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${color} 0%, ${color} 45%, transparent 75%)`,
            }}
          />
        </div>

        {/* --- 暗色模式光晕 (雾蒙蒙、高斯模糊、无黑心) --- */}
        <div className="absolute inset-0 hidden dark:block">
          {/* Circle 1: Left */}
          <div 
            className="absolute rounded-full pointer-events-none transition-all duration-1000 ease-in-out opacity-50 mix-blend-screen blur-[100px]"
            style={{
              width: '1000px',
              height: '1000px',
              left: '40%',
              top: '-50px',
              transform: 'translate(-50%, -50%)',
              // 保持柔和过渡，但稍微扩大一点中心亮区，配合 mix-blend-screen 恢复色彩饱和度
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            }}
          />
          {/* Circle 2: Right */}
          <div 
            className="absolute rounded-full pointer-events-none transition-all duration-1000 ease-in-out opacity-40 mix-blend-screen blur-[120px]"
            style={{
              width: '1200px',
              height: '1200px',
              left: '75%',
              top: '80px',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            }}
          />
        </div>

      </div>
    </div>,
    portalRoot
  );
}
