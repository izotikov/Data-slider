import React, {FC} from 'react';
import './SliderElem.scss';
import {SliderDataElementsType} from "@type/slider";


const SliderElem: FC<SliderDataElementsType> = ({header, description}) => {
  return (
    <div className="slider-elem">
      <h2 className="slider-elem__header">{header}</h2>
      <div className="slider-elem__description">{description}</div>
    </div>
  );
};

export default SliderElem;