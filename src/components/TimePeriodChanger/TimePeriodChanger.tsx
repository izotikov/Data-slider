import React, {FC, SetStateAction} from 'react';
import './TimePeriodChanger.scss';
import {SliderState} from "@type/slider";
import CurrentPeriod from "@components/TimePeriodChanger/CurrentPeriod/CurrentPeriod";
import ChangerPeriodButtons from "@components/TimePeriodChanger/ChangerPeriodButtons/ChangerPeriodButtons";
import CustomPeriodsPagination from "@components/CustomPeriodsPagination/CustomPeriodsPagination";

interface TimePeriodProps {
  currentSliderDataPosition: number;
  allPeriodsIndex: number;
  setSliderState: React.Dispatch<SetStateAction<SliderState>>;
}

const TimePeriodChanger: FC<TimePeriodProps> = ({
                                                  currentSliderDataPosition,
                                                  allPeriodsIndex,
                                                  setSliderState
}) => {

  return (
    <div className="time-period-changer__container">
      <CurrentPeriod currentSliderDataPosition={currentSliderDataPosition} allPeriodsIndex={allPeriodsIndex}/>
      <div className='time-period-changer__container__wrapper-buttons-and-pagination'>
        <ChangerPeriodButtons currentSliderDataPosition={currentSliderDataPosition} allPeriodsIndex={allPeriodsIndex} setSliderState={setSliderState}/>
        <CustomPeriodsPagination currentSliderDataPosition={currentSliderDataPosition} allPeriodsIndex={allPeriodsIndex} setSliderState={setSliderState}/>
      </div>
    </div>
  );
};

export default TimePeriodChanger;