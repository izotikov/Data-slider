import React, {FC, SetStateAction, useEffect, useRef} from 'react';
import './MainCircle.scss';
import {gsap} from "gsap";
import {SliderState} from "@type/slider";
import {sliderPeriodsArray} from "@mock/mock";

interface MainCircleProps {
  label: string;
  currentSliderDataPosition: number;
  allPeriodsIndex: number;
  setSliderState: React.Dispatch<SetStateAction<SliderState>>;
}

const MainCircle: FC<MainCircleProps> = ({
                                           label,
                                           currentSliderDataPosition,
                                           allPeriodsIndex,
                                           setSliderState
}) => {

  const circleRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<Array<HTMLDivElement | null>>([]);
  const labelsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const prevSliderPosition = useRef<number>(currentSliderDataPosition);
  const degPerStep = 360 / allPeriodsIndex;
  const startOffset = degPerStep / 2 + 15;

  const handleDotClick = (index: number) => {
    setSliderState(prevState => {
      const newPosition = index + 1;
      return {
        ...prevState,
        label: sliderPeriodsArray[newPosition - 1].label,
        currentSliderDataPosition: newPosition,
        currentSliderData: sliderPeriodsArray[newPosition - 1].dataArray
      };
    });
  };

  useEffect(() => {
    if (!circleRef.current) return;
    const rotation = -degPerStep * currentSliderDataPosition;
    const activeLabel = labelsRef.current[currentSliderDataPosition - 1];

    gsap.to(circleRef.current, {
      rotate: rotation,
      duration: 0.5,
      ease: 'power1.out',
      onComplete: () => {
        if (activeLabel) {
          gsap.fromTo(
            activeLabel,
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: "power1.out" }
          );
        }
      }
    });

    dotsRef.current.forEach((dot, index) => {
      if (!dot) return;
      const isActive = index === currentSliderDataPosition - 1;
      gsap.to(dot, {
        width: isActive ? 56 : 6,
        height: isActive ? 56 : 6,
        backgroundColor: isActive ? 'var(--color-background)' : 'var(--color-black-blue)',
        borderColor: isActive ? 'rgba(var(--color-black-blue-rgb), 0.5)' : 'transparent',
        duration: 0.3,
        ease: 'power1.out'
      });
    });

    prevSliderPosition.current = currentSliderDataPosition;
  }, [currentSliderDataPosition]);

  return (
    <div className='data__circle' ref={circleRef}>
      {Array.from({length: allPeriodsIndex}).map((period, index) => {

        const isActive = index === currentSliderDataPosition - 1;

        const rotationFormula = degPerStep * index + startOffset*2;

        const handleMouseEnter = () => {
          const dot = dotsRef.current[index];
          if (!dot || isActive) return;

          const numberSpan = dot.querySelector<HTMLSpanElement>('.data__circle-dot-number');
          gsap.to(dot, {
            width: 56,
            height: 56,
            backgroundColor: 'var(--color-background)',
            border: '1px solid rgba(var(--color-black-blue-rgb), 0.5)',
            duration: 0.3,
            ease: 'power1.out',
          });
          if (numberSpan) {
            gsap.to(numberSpan, {
              opacity: 1,
              duration: 0.3,
              ease: 'power1.out'
            });
          }
        };

        const handleMouseLeave = () => {
          const dot = dotsRef.current[index];
          if (!dot || isActive) return;

          const numberSpan = dot.querySelector<HTMLSpanElement>('.data__circle-dot-number');
          gsap.to(dot, {
            width: 6,
            height: 6,
            backgroundColor: 'var(--color-black-blue)',
            border: '1px solid rgba(var(--color-black-blue-rgb), 1)',
            duration: 0.3,
            ease: 'power1.out',
          });
          if (numberSpan) {
            gsap.to(numberSpan, {
              opacity: 0,
              duration: 0.3,
              ease: 'power1.out'
            });
          }
        };

        return (
          <div
            key={index}
            ref={el => {dotsRef.current[index] = el}}
            className={`data__circle-dot ${isActive ? 'active' : ''}`}
            style={{
              transform: `rotate(${rotationFormula}deg) translate(0, -265px) rotate(-30deg)`,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleDotClick(index)}
          >
            <span className="data__circle-dot-number" style={
              isActive
                ? {transform: `rotate(${-(rotationFormula)}deg) rotate(30deg) rotate(${degPerStep * currentSliderDataPosition}deg)`, opacity: 1}
                : {transform : `rotate(${-(rotationFormula)}deg) rotate(30deg) rotate(${degPerStep * currentSliderDataPosition}deg)`, opacity: 0}}>{index + 1}
            </span>
            {isActive && (
              <span
                className="data__circle-dot-label"
                ref={el => { labelsRef.current[index] = el }}
              >
                {label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MainCircle;