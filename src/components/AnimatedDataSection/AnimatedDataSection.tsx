import React, {FC, SetStateAction, useEffect, useRef, useState} from 'react';
import './AnimatedDataSection.scss';
import {SliderState} from "@type/slider";
import TimePeriodChanger from "@components/TimePeriodChanger/TimePeriodChanger";
import Slider from "@components/Slider/Slider";
import {gsap} from "gsap";
import MainCircle from "@components/MainCircle/MainCircle";

interface AnimatedDataSectionProps {
  sliderState: SliderState,
  setSliderState: React.Dispatch<SetStateAction<SliderState>>;
}

const AnimatedDataSection: FC<AnimatedDataSectionProps> = ({
                                                             sliderState,
                                                             setSliderState
}) => {

  const {label, currentSliderData, currentSliderDataPosition, allPeriodsIndex} = sliderState;

  const blockTitle: string = 'Исторические даты';

  const leftNumberRef = useRef<HTMLSpanElement | null>(null);
  const rightNumberRef = useRef<HTMLSpanElement | null>(null);

  const [leftNumber, setLeftNumber] = useState(currentSliderData[0].header);
  const [rightNumber, setRightNumber] = useState(currentSliderData[currentSliderData.length - 1].header);

  useEffect(() => {
    const newLeft = currentSliderData[0].header;
    const newRight = currentSliderData[currentSliderData.length - 1].header;

    if (leftNumberRef.current) {
      const newNumber = parseInt(newLeft);
      const currentNumber = parseInt(leftNumber);
      const startedNumber = currentNumber < newNumber
        ? newNumber - 3
        : newNumber + 3;
      gsap.to({ val: startedNumber }, {
        val: newNumber,
        duration: 0.5,
        ease: 'power1.out',
        onUpdate: function () {
          const currentVal = Math.round(this.targets()[0].val);
          setLeftNumber(currentVal.toString());
        }
      });
    }

    if (rightNumberRef.current) {
      const newNumber = parseInt(newRight);
      const currentNumber = parseInt(rightNumber);
      const startedNumber = currentNumber < newNumber
        ? newNumber - 3
        : newNumber + 3;
      gsap.to({ val: startedNumber }, {
        val: newNumber,
        duration: 0.5,
        ease: 'power1.out',
        onUpdate: function () {
          const currentVal = Math.round(this.targets()[0].val);
          setRightNumber(currentVal.toString());
        }
      });
    }
  }, [currentSliderData]);

  return (
    <div className='main-container'>
      <div className="main-container__content">
        <div className='main-container__block-title'>{blockTitle}</div>
      </div>
      <div className="main-container__data">
        <MainCircle
          label={label}
          currentSliderDataPosition={currentSliderDataPosition}
          allPeriodsIndex={allPeriodsIndex}
          setSliderState={setSliderState}
        />
        <span ref={leftNumberRef} className="main-container__data__left-number">{leftNumber}</span>
        <span ref={rightNumberRef} className="main-container__data__right-number">{rightNumber}</span>
      </div>
      <div className="main-container__bottom">
        <TimePeriodChanger
          currentSliderDataPosition={currentSliderDataPosition}
          allPeriodsIndex={allPeriodsIndex}
          setSliderState={setSliderState}
        />
        <Slider dataArray={currentSliderData}/>
      </div>
    </div>
  );
};

export default AnimatedDataSection;