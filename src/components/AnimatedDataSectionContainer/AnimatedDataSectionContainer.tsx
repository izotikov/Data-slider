import React, {FC, useState} from 'react';
import {sliderPeriodsArray} from "@mock/mock";
import AnimatedDataSection from "@components/AnimatedDataSection/AnimatedDataSection";
import {SliderState} from "@type/slider";

const AnimatedDataSectionContainer: FC = () => {

  const [sliderState, setSliderState] = useState<SliderState>({
    label: sliderPeriodsArray[0].label,
    currentSliderData: sliderPeriodsArray[0].dataArray,
    currentSliderDataPosition: 1,
    allPeriodsIndex: sliderPeriodsArray.length
  });

  return (
    <AnimatedDataSection
      sliderState={sliderState} setSliderState={setSliderState}
    />
  );
};

export default AnimatedDataSectionContainer;