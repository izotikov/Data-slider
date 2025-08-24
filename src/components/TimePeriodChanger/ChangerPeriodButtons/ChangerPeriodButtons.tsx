import React, {FC, memo, SetStateAction} from 'react';
import ArrowButton from "@components/ArrowButton/ArrowButton";
import {SliderState} from "@type/slider";
import './ChangePeriodButtons.scss';
import {sliderPeriodsArray} from "@mock/mock";

interface ChangePeriodButtonsProps {
  currentSliderDataPosition: number;
  allPeriodsIndex: number;
  setSliderState: React.Dispatch<SetStateAction<SliderState>>;

}

const ChangerPeriodButtons: FC<ChangePeriodButtonsProps> = memo(({currentSliderDataPosition, allPeriodsIndex, setSliderState}) => {

  const disabledFirst = (currentSliderDataPosition === 1) ? 'disabled' : '';
  const disabledLast = (currentSliderDataPosition === allPeriodsIndex) ? 'disabled' : '';

  const nextPeriod = () => {
    setSliderState(prevState => {
      const newPosition = Math.min(prevState.currentSliderDataPosition + 1, prevState.allPeriodsIndex);
      return {
        ...prevState,
        label: sliderPeriodsArray[newPosition - 1].label,
        currentSliderDataPosition: newPosition,
        currentSliderData: sliderPeriodsArray[newPosition - 1].dataArray
      };
    })
  }

  const previousPeriod = () => {
    setSliderState(prevState => {
      const newPosition = Math.max(prevState.currentSliderDataPosition - 1, 1);
      return {
        ...prevState,
        label: sliderPeriodsArray[newPosition - 1].label,
        currentSliderDataPosition: newPosition,
        currentSliderData: sliderPeriodsArray[newPosition - 1].dataArray
      };
    })
  }

  return (
    <div className="change-period-buttons__container">
      <ArrowButton className={`change-period-buttons__container__prev ${disabledFirst}`} variant="left" width={50} height={50}
                   color='var(--color-black-blue)' onClick={previousPeriod}/>
      <ArrowButton className={`change-period-buttons__container__next ${disabledLast}`} variant="right" width={50} height={50}
                   color='var(--color-black-blue)' onClick={nextPeriod}/>
    </div>
  );
});

export default ChangerPeriodButtons;