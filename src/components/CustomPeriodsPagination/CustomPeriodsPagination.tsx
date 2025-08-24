import React, {FC, SetStateAction} from 'react';
import './CustomPeriodsPagination.scss';
import {sliderPeriodsArray} from "@mock/mock";
import {SliderState} from "@type/slider";

interface CustomPeriodsPaginationProps {
  currentSliderDataPosition: number;
  allPeriodsIndex: number;
  setSliderState: React.Dispatch<SetStateAction<SliderState>>;
}

const CustomPeriodsPagination: FC<CustomPeriodsPaginationProps> = ({currentSliderDataPosition, allPeriodsIndex, setSliderState}) => {

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

  return (
    <div className='pagination-container'>
      {Array.from({length: allPeriodsIndex}).map((_, index) => {
        const isActive = index === currentSliderDataPosition - 1;
        return (
          <div onClick={() => handleDotClick(index)} className={`pagination-container__dot ${isActive ? 'active' : ''}` }></div>
        )
      })}
    </div>
  );
};

export default CustomPeriodsPagination;