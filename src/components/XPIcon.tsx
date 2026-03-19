import React from 'react';

interface XPIconProps {
  className?: string;
}

export function XPIcon({ className = "w-5 h-5 text-[8px]" }: XPIconProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img 
        src="/level-frame.bd176f30.svg" 
        alt="XP Frame" 
        className="absolute inset-0 w-full h-full" 
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} 
      />
      <span className="relative z-10 font-bold text-white leading-none text-[1em]">XP</span>
    </div>
  );
}
