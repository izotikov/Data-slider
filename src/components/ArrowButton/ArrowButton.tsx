import React, {FC, memo} from 'react';
import './ArrowButton.scss';
import {LazySvg} from "@components/LazySvg/LazySvg";

interface ArrowButtonProps {
  onClick?: () => void;
  variant: 'left' | 'right';
  className ?: string;
  width?: number;
  height?: number;
  color?: string;
}

const variantsMap = {
  left: "arrow-button__left",
  right: "arrow-button__right"
}


const ArrowButton: FC<ArrowButtonProps> = memo(({
                                             onClick,
                                             variant,
                                             className,
                                             width = 40,
                                             height = 40,
                                             color,
}) => {
  return (
    <button
      onClick={onClick}
      className={`arrow-button ${variantsMap[variant]} ${className}`}
      style={{width: width, height: height }} >
      <LazySvg name={'Arrow'} width={12} height={16} style={{color: color}} />
    </button>
  );
});

export default ArrowButton;