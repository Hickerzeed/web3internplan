import React from 'react';

// 统一管理 Cuber 图标的大小
// 如果你想全局放大/缩小，只需要在这里修改对应的 Tailwind 宽高类名即可
// 例如：把 sm 的 'w-4 h-4' 改成 'w-5 h-5'，所有使用 sm 尺寸的地方都会变大
export const CUBER_SIZES = {
  sm: 'w-16 h-16',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-12 h-12',
  '2xl': 'w-8 h-8',
  '3xl': 'w-10 h-10',
  '4xl': 'w-14 h-14',
  '5xl': 'w-20 h-20',
};

interface CuberIconProps {
  size?: keyof typeof CUBER_SIZES;
  className?: string;
}

export const CuberIcon: React.FC<CuberIconProps> = ({ size = 'md', className = '' }) => {
  const sizeClass = CUBER_SIZES[size];
  return (
    <img
      src="/cuber.svg"
      alt="Cuber"
      className={`${sizeClass} ${className}`.trim()}
    />
  );
};
